import express from 'express';
import footBallDataController from '../controllers/footBallDataController';
const router = express.Router();

router.get('/countries', footBallDataController.countries);
router.get('/leagues', footBallDataController.leagues);
router.get('/teams', footBallDataController.teams);

export default router;
