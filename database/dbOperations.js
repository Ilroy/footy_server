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

  async getUser({email, hash}){
    

  }
};

export default dbOperations;