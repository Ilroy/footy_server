import express from 'express';
import userController from '../../controllers/userController';
const router = express.Router();

router.post('/signin', userController.signIn);
router.post('/register', userController.register);

export default router;