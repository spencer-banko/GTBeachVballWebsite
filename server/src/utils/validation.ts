import { z } from 'zod';

// Executive validation schemas
export const createExecutiveSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name cannot exceed 100 characters'),
  role: z.string().min(1, 'Role is required').max(100, 'Role cannot exceed 100 characters'),
  bio: z.string().min(1, 'Bio is required').max(500, 'Bio cannot exceed 500 characters'),
  photoUrl: z.string().url('Photo URL must be a valid URL'),
  email: z.string().email('Invalid email format').optional(),
  linkedinUrl: z.string().url('LinkedIn URL must be a valid URL').optional(),
  visible: z.boolean().default(true),
  order: z.number().int().min(0, 'Order must be a positive number').default(0),
});

export const updateExecutiveSchema = createExecutiveSchema.partial();

// Sponsor validation schemas
export const createSponsorSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name cannot exceed 100 characters'),
  logoUrl: z.string().url('Logo URL must be a valid URL'),
  websiteUrl: z.string().url('Website URL must be a valid URL'),
  blurb: z.string().min(1, 'Blurb is required').max(300, 'Blurb cannot exceed 300 characters'),
  active: z.boolean().default(false),
});

export const updateSponsorSchema = createSponsorSchema.partial();

// Interest submission validation schema
export const createInterestSubmissionSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name cannot exceed 100 characters'),
  email: z.string().email('Invalid email format'),
  phone: z.string().regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number').optional(),
  affiliation: z.enum(['GT Student', 'Other'], {
    errorMap: () => ({ message: 'Affiliation must be either "GT Student" or "Other"' }),
  }),
  experienceLevel: z.enum(['Beginner', 'Intermediate', 'Advanced'], {
    errorMap: () => ({ message: 'Experience level must be Beginner, Intermediate, or Advanced' }),
  }),
  notes: z.string().max(1000, 'Notes cannot exceed 1000 characters').optional(),
});

// Sponsor inquiry validation schema
export const createSponsorInquirySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name cannot exceed 100 characters'),
  email: z.string().email('Invalid email format'),
  company: z.string().max(100, 'Company name cannot exceed 100 characters').optional(),
  message: z.string().min(1, 'Message is required').max(2000, 'Message cannot exceed 2000 characters'),
});

// Auth validation schema
export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

// Pagination validation schema
export const paginationSchema = z.object({
  page: z.string().regex(/^\d+$/, 'Page must be a number').transform(Number).default('1'),
  limit: z.string().regex(/^\d+$/, 'Limit must be a number').transform(Number).default('10'),
});

// ID validation schema
export const idSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format'),
});

// Validation helper function
export const validateSchema = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map(err => err.message).join(', ');
      throw new Error(messages);
    }
    throw error;
  }
};
