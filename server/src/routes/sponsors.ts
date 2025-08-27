import express from 'express';
import {
  getActiveSponsor,
  getAllSponsors,
  getSponsor,
  createSponsor,
  updateSponsor,
  deleteSponsor,
  activateSponsor,
} from '../controllers/sponsorController';
import { submitSponsorInquiry, getSponsorInquiries } from '../controllers/sponsorInquiryController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/active', getActiveSponsor);
router.post('/inquiry', submitSponsorInquiry);

// Protected routes (admin only)
router.use('/admin', protect);
router.get('/admin', getAllSponsors);
router.get('/admin/:id', getSponsor);
router.post('/admin', createSponsor);
router.put('/admin/:id', updateSponsor);
router.delete('/admin/:id', deleteSponsor);
router.post('/admin/:id/activate', activateSponsor);
router.get('/admin/inquiries', getSponsorInquiries);

export default router;
