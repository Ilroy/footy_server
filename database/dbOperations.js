import knexFile from '../knexfile.js';
import database from './knex.js';


const dbOperations = {
  async createUser(loginInfo, userInfo) {
    try {
      const trx = await database.transaction();

      const emailResponse = await trx.insert(loginInfo)
      .into('login')
      .returning('email');

      const email = emailResponse[0];

      await trx("users")
      .insert({...userInfo, email:email});

      await trx.commit();
      return;
    }catch(err){
      console.log('transaction failed');
      throw err;
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
      throw err;
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
      throw err;
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
      throw err;
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
      throw err;
    }

  }
};

export default dbOperations;