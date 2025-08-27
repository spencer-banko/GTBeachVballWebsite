import { Request, Response } from 'express';
import { Sponsor } from '../models/Sponsor';
import { validateSchema, createSponsorSchema, updateSponsorSchema, paginationSchema } from '../utils/validation';
import { CreateSponsorData, UpdateSponsorData, PaginatedResponse, ISponsor } from '../types';

// Get active sponsor (public)
export const getActiveSponsor = async (req: Request, res: Response): Promise<void> => {
  try {
    const sponsor = await Sponsor.getActiveSponsor();

    res.status(200).json({
      success: true,
      data: sponsor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch active sponsor',
    });
  }
};

// Get all sponsors (admin)
export const getAllSponsors = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page, limit } = validateSchema(paginationSchema, req.query);
    const skip = (page - 1) * limit;

    const [sponsors, total] = await Promise.all([
      Sponsor.find()
        .sort({ active: -1, name: 1 })
        .skip(skip)
        .limit(limit)
        .select('-__v'),
      Sponsor.countDocuments(),
    ]);

    const totalPages = Math.ceil(total / limit);

    const response: PaginatedResponse<ISponsor> = {
      data: sponsors,
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
      error: 'Failed to fetch sponsors',
    });
  }
};

// Get single sponsor
export const getSponsor = async (req: Request, res: Response): Promise<void> => {
  try {
    const sponsor = await Sponsor.findById(req.params.id).select('-__v');

    if (!sponsor) {
      res.status(404).json({
        success: false,
        error: 'Sponsor not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: sponsor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch sponsor',
    });
  }
};

// Create sponsor
export const createSponsor = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: CreateSponsorData = validateSchema(createSponsorSchema, req.body);

    const sponsor = await Sponsor.create(data);

    res.status(201).json({
      success: true,
      data: sponsor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create sponsor',
    });
  }
};

// Update sponsor
export const updateSponsor = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: UpdateSponsorData = validateSchema(updateSponsorSchema, req.body);

    const sponsor = await Sponsor.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: true }
    ).select('-__v');

    if (!sponsor) {
      res.status(404).json({
        success: false,
        error: 'Sponsor not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: sponsor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update sponsor',
    });
  }
};

// Delete sponsor
export const deleteSponsor = async (req: Request, res: Response): Promise<void> => {
  try {
    const sponsor = await Sponsor.findByIdAndDelete(req.params.id);

    if (!sponsor) {
      res.status(404).json({
        success: false,
        error: 'Sponsor not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Sponsor deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete sponsor',
    });
  }
};

// Activate sponsor
export const activateSponsor = async (req: Request, res: Response): Promise<void> => {
  try {
    const sponsor = await Sponsor.activateSponsor(req.params.id);

    res.status(200).json({
      success: true,
      data: sponsor,
      message: 'Sponsor activated successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to activate sponsor',
    });
  }
};
