import express from 'express';
import { protect } from '../middleware/auth';
import { Executive } from '../models/Executive';
import { Sponsor } from '../models/Sponsor';
import { InterestSubmission } from '../models/InterestSubmission';
import { SponsorInquiry } from '../models/SponsorInquiry';

const router = express.Router();

// All admin routes require authentication
router.use(protect);

// GET /api/admin/dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const [
      totalExecutives,
      visibleExecutives,
      totalSponsors,
      activeSponsors,
      totalInterestSubmissions,
      recentInterestSubmissions,
      totalSponsorInquiries,
      recentSponsorInquiries,
    ] = await Promise.all([
      Executive.countDocuments(),
      Executive.countDocuments({ visible: true }),
      Sponsor.countDocuments(),
      Sponsor.countDocuments({ active: true }),
      InterestSubmission.countDocuments(),
      InterestSubmission.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, // Last 7 days
      }),
      SponsorInquiry.countDocuments(),
      SponsorInquiry.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, // Last 7 days
      }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        executives: {
          total: totalExecutives,
          visible: visibleExecutives,
        },
        sponsors: {
          total: totalSponsors,
          active: activeSponsors,
        },
        interestSubmissions: {
          total: totalInterestSubmissions,
          recent: recentInterestSubmissions,
        },
        sponsorInquiries: {
          total: totalSponsorInquiries,
          recent: recentSponsorInquiries,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard data',
    });
  }
});

export default router;
