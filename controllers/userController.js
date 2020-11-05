import userService from "../services/userService.js";

const userController = {
    async signIn(req,res) {
        const user = await userService.signInUser(req.body);
        return (user === null)? res.status(400).json("error signing in") : res.json(user); 
    },
    
    async register(req,res) {
        const isRegistered = await userService.registerUser(req.body);

        return isRegistered? res.json("success") : res.status(400).json("failed");
    }
};

export default userController;