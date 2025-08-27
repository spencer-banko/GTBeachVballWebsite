import { Request, Response } from 'express';
import { SponsorInquiry } from '../models/SponsorInquiry';
import { validateSchema, createSponsorInquirySchema } from '../utils/validation';
import { CreateSponsorInquiryData } from '../types';

// Helper function to get pagination parameters
const getPaginationParams = (req: Request) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

// Submit sponsor inquiry (public)
export const submitSponsorInquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: CreateSponsorInquiryData = validateSchema(createSponsorInquirySchema, req.body);

    const inquiry = await SponsorInquiry.create(data);

    res.status(201).json({
      success: true,
      data: inquiry,
      message: 'Sponsor inquiry submitted successfully! We will get back to you soon.',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit sponsor inquiry',
    });
  }
};

// Get sponsor inquiries (admin only)
export const getSponsorInquiries = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page, limit, skip } = getPaginationParams(req);

    const [inquiries, total] = await Promise.all([
      SponsorInquiry.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      SponsorInquiry.countDocuments(),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: {
        data: inquiries,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch sponsor inquiries',
    });
  }
};
