import bcrypt from 'bcrypt';
import dbOperations from '../database/dbOperations.js';

const userService = {
    async signInUser({email,password}){
        try{
            console.log(`in service email: ${email}, password: ${password}`)
            const hash = await dbOperations.getHash(email);
            
            if(await bcrypt.compare(password, hash)){
                const user = await dbOperations.getUser(email);
                const leagues = await dbOperations.getLeagues(user.id);
                const teams = await dbOperations.getTeams(user.id);

                return {...user, leagues:leagues, teams:teams};
            }
        }catch (err){
            console.log("error signing in");
            throw err;
        }



    },
    async registerUser({email,password, ...rest}){
        try{
            const saltRounds = 10;
            const hash = await bcrypt.hash(password, saltRounds);
            await dbOperations.createUser({hash:hash, email:email}, rest);
            return;
        }catch(err){
            console.log("error registering");
            throw err;
        }
    }
}

export default userService;