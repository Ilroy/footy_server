const bcrypt = require('bcrypt');
import dbOperations from '../database/dbOperations';

const userService = {
    async signInUser({email,password}){
        try{
            const hash = await dbOperations.getHash(email);

            if(await bcrypt.compare(password, hash)){
                const user = await dbOperations.getUser(email);

                const leagues = await dbOperations.getLeagues(user.id);
                const teams = await dbOperations.getTeams(user.id);

                return {...user, leagues:leagues, teams:teams};
            }
        }catch (err){
            console.log("error signing in");
            return null;
        }



    },
    async registerUser({email,password, ...rest}){
        try{
            const saltRounds = 10;
            const hash = await bcrypt.hash(password, saltRounds);
            return await dbOperations.createUser({hash:hash, email:email}, rest);
        }catch(err){
            console.log("error registering");
            return null;
        }
    }
}

export default userService;