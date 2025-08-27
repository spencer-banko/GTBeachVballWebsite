import { Request, Response } from 'express';
import { InterestSubmission } from '../models/InterestSubmission';
import { validateSchema, createInterestSubmissionSchema, paginationSchema } from '../utils/validation';
import { CreateInterestSubmissionData, PaginatedResponse, IInterestSubmission } from '../types';

// Submit interest form (public)
export const submitInterest = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Interest form submission received:', req.body);
    
    const data: CreateInterestSubmissionData = validateSchema(createInterestSubmissionSchema, req.body);
    console.log('Validated data:', data);

    const submission = await InterestSubmission.create(data);
    console.log('Created submission:', submission);

    res.status(201).json({
      success: true,
      data: submission,
      message: 'Interest form submitted successfully!',
    });
  } catch (error) {
    console.error('Interest form submission error:', error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit interest form',
    });
  }
};

// Get all interest submissions (admin)
export const getInterestSubmissions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page, limit } = validateSchema(paginationSchema, req.query);
    const skip = (page - 1) * limit;

    const [submissions, total] = await Promise.all([
      InterestSubmission.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-__v'),
      InterestSubmission.countDocuments(),
    ]);

    const totalPages = Math.ceil(total / limit);

    const response: PaginatedResponse<IInterestSubmission> = {
      data: submissions,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch interest submissions',
    });
  }
};

// Get interest submission statistics (admin)
export const getInterestStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const [totalSubmissions, recentSubmissions, affiliationStats, experienceStats] = await Promise.all([
      InterestSubmission.countDocuments(),
      InterestSubmission.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, // Last 7 days
      }),
      InterestSubmission.aggregate([
        { $group: { _id: '$affiliation', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      InterestSubmission.aggregate([
        { $group: { _id: '$experienceLevel', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalSubmissions,
        recentSubmissions,
        affiliationStats,
        experienceStats,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch interest statistics',
    });
  }
};
