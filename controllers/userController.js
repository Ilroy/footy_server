import userService from "../services/userService.js";

const userController = {
    async signIn(req,res) {
        try{
            const user = await userService.signInUser(req.body);
            return res.json(user); 
        }catch (err){
            res.status(500).json("Error Signing In")
        }
    },
    
    async register(req,res) {
        try{
            await userService.registerUser(req.body);
            return res.json("Success");
        }catch (err){
            return res.status(500).json("Failed");            

        }
    }
};

export default userController;