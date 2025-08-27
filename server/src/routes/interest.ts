import express from 'express';
import {
  submitInterest,
  getInterestSubmissions,
  getInterestStats,
} from '../controllers/interestController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/', submitInterest);

// Protected routes (admin only)
router.use('/admin', protect);
router.get('/admin', getInterestSubmissions);
router.get('/admin/stats', getInterestStats);

export default router;
