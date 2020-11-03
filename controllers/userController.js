import userService from "../services/userService";

const userController = {
    signIn(req,res) {
        

        

    },
    async register(req,res) {
        const isRegistered = await userService.registerUser(req.body);

        return isRegistered? res.json("success") : res.status(400).json("failed");
    }
};

export default userController;