import database from './knex.js';


const dbOperations = {
  async createUser(loginInfo, userInfo) {
    try {
      const value = await database.transaction(async (trx) => {
        try {
          const emailResponse = await trx
            .insert(loginInfo)
            .into("login")
            .returning("email");
            
          const email = emailResponse[0];
          console.log(email);

          const userIdReponse = await trx("users")
            .insert({ ...userInfo, email: email })
            .returning("id");

          console.log(userIdReponse);
          
         
          await trx.commit();  
          console.log("Transaction Success");
          const isRegisteredSuccessfully = (Array.isArray(userIdReponse) && userIdReponse.length)? true:false;
          console.log(`is registed success: ${isRegisteredSuccessfully}`);
          return isRegisteredSuccessfully;
        } catch (err) {
          await trx.rollback();
          console.log("Transaction Failed");

          throw err;
        }
      });
      console.log(`value is ${value}`)
      return value;
    }catch (err){
        console.log("Database access error");
        return false;
    }

  },

  async getUser(email){
    try{
      const dbReponse = await database
      .select('*')
      .from('users')
      .where('email', '=', email);

      return dbReponse[0];

    }catch(err){
      console.log("error getting user");
      return null;
    }



  },
  async getHash(email){
    try{
    const dbResponse = await database
    .select('hash')
    .from('login')
    .where('email', '=', email);

    return dbResponse[0].hash;
    } catch (err){
      console.log("error accessing database")
      return null;
    };
  },

  async getLeagues(userId){
    try{
      const dbLeagues = await database
      .select('league')
      .from('followed_leagues')
      .where('user_id', '=', userId);

      return dbLeagues.map(leagueObj => leagueObj.league);
    }catch(err){
      console.log("error getting leagues");
      return null;
    }
  },

  async getTeams(userId){
    try{
      const dbTeams = await database
      .select('team')
      .from('followed_teams')
      .where('user_id', '=', userId);

      return dbTeams.map(teamObj => teamObj.team);
    }catch(err){
      console.log("error getting teams");
      return null;
    }

  }
};

export default dbOperations;