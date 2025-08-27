import express from 'express';
import {
  getExecutives,
  getAllExecutives,
  getExecutive,
  createExecutive,
  updateExecutive,
  deleteExecutive,
} from '../controllers/execController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getExecutives);

// Protected routes (admin only)
router.use('/admin', protect);
router.get('/admin', getAllExecutives);
router.get('/admin/:id', getExecutive);
router.post('/admin', createExecutive);
router.put('/admin/:id', updateExecutive);
router.delete('/admin/:id', deleteExecutive);

export default router;
