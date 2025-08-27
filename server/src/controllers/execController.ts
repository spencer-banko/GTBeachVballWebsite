import { Request, Response } from 'express';
import { Executive } from '../models/Executive';
import { validateSchema, createExecutiveSchema, updateExecutiveSchema, paginationSchema } from '../utils/validation';
import { CreateExecutiveData, UpdateExecutiveData, PaginatedResponse, IExecutive } from '../types';

// Get all visible executives (public)
export const getExecutives = async (req: Request, res: Response): Promise<void> => {
  try {
    const executives = await Executive.find({ visible: true })
      .sort({ order: 1, name: 1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      data: executives,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch executives',
    });
  }
};

// Get all executives (admin)
export const getAllExecutives = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page, limit } = validateSchema(paginationSchema, req.query);
    const skip = (page - 1) * limit;

    const [executives, total] = await Promise.all([
      Executive.find()
        .sort({ order: 1, name: 1 })
        .skip(skip)
        .limit(limit)
        .select('-__v'),
      Executive.countDocuments(),
    ]);

    const totalPages = Math.ceil(total / limit);

    const response: PaginatedResponse<IExecutive> = {
      data: executives,
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
      error: 'Failed to fetch executives',
    });
  }
};

// Get single executive
export const getExecutive = async (req: Request, res: Response): Promise<void> => {
  try {
    const executive = await Executive.findById(req.params.id).select('-__v');

    if (!executive) {
      res.status(404).json({
        success: false,
        error: 'Executive not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: executive,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch executive',
    });
  }
};

// Create executive
export const createExecutive = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: CreateExecutiveData = validateSchema(createExecutiveSchema, req.body);

    const executive = await Executive.create(data);

    res.status(201).json({
      success: true,
      data: executive,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create executive',
    });
  }
};

// Update executive
export const updateExecutive = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: UpdateExecutiveData = validateSchema(updateExecutiveSchema, req.body);

    const executive = await Executive.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: true }
    ).select('-__v');

    if (!executive) {
      res.status(404).json({
        success: false,
        error: 'Executive not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: executive,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update executive',
    });
  }
};

// Delete executive
export const deleteExecutive = async (req: Request, res: Response): Promise<void> => {
  try {
    const executive = await Executive.findByIdAndDelete(req.params.id);

    if (!executive) {
      res.status(404).json({
        success: false,
        error: 'Executive not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Executive deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete executive',
    });
  }
};
