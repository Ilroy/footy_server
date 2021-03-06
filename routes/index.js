import userRoutes from './userRoutes.js';
import footBallDataRoutes from './footBallDataRoutes.js';
import express from 'express';

const router = express.Router();


router.use('/user', userRoutes);
router.use('/football-data', footBallDataRoutes);


export default router;