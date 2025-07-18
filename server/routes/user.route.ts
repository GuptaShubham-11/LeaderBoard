import express from 'express';
import { userController } from '../controllers/user.controller';

const router = express.Router();

router.post('/add-user', userController.addUser);
router.post('/get-current-user', userController.getCurrentUser);
router.post('/claim-points', userController.claimPoints);
router.get('/leaderboard', userController.getLeaderboard);
router.post('/get-claim-history', userController.getClaimHistory);

export default router;
