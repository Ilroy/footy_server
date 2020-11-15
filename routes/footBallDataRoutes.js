import express from 'express';
import footBallDataController from '../controllers/footBallDataController.js';
const router = express.Router();

router.get('/countries', footBallDataController.getCountries);
router.get('/leagues', footBallDataController.getLeagues);
router.get('/teams', footBallDataController.getTeams);

export default router;
