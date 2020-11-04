import database from './knex';


const dbOperations = {
  async createUser(loginInfo, userInfo) {
    try {
      return await database.transaction(async (trx) => {
        try {
          const email = await trx
            .insert(loginInfo)
            .into("login")
            .returning("email")[0];

          const userId = await trx("users")
            .insert({ ...userInfo, email: email })
            .returning("id")[0];
          
          console.log("Transaction Success");  
          return user !== null;
        } catch (err) {
          console.log("Transaction Failed");
          return false;
        }
      });
    }catch (err){
        console.log("Database access error");
        return false;
    }
  },

  async getUser({email}){
    try{
      return await database
      .select('*')
      .from('users')
      .where('email', '=', email)[0];
    }catch(err){
      console.log("error getting user");
      return null;
    }



  },
  async getHash({email}){
    try{
    const hash = await database
    .select('hash')
    .from('login')
    .where('email', '=', email)[0];

    return hash;
    } catch (err){
      console.log("error accessing database")
      return null;
    };
  },

  async getLeagues({userId}){
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

  async getTeams({userId}){
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