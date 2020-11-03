const bcrypt = require('bcrypt');
import dbOperations from '../database/dbOperations';

const userService = {
    signInUser(email,password){

    },
    async registerUser({email,password, ...rest}){
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        return await dbOperations.createUser({hash:hash, email:email}, rest);
    }
}

export default userService;