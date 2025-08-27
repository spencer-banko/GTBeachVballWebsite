import { Request, Response } from 'express';
import { SponsorInquiry } from '../models/SponsorInquiry';
import { validateSchema, createSponsorInquirySchema } from '../utils/validation';
import { CreateSponsorInquiryData } from '../types';

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
