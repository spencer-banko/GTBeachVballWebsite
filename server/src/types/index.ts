import { Request } from 'express';

// Executive types
export interface IExecutive {
  _id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  email?: string;
  linkedinUrl?: string;
  visible: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateExecutiveData {
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  email?: string;
  linkedinUrl?: string;
  visible?: boolean;
  order?: number;
}

export interface UpdateExecutiveData extends Partial<CreateExecutiveData> {}

// Sponsor types
export interface ISponsor {
  _id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  blurb: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSponsorData {
  name: string;
  logoUrl: string;
  websiteUrl: string;
  blurb: string;
  active?: boolean;
}

export interface UpdateSponsorData extends Partial<CreateSponsorData> {}

// Interest submission types
export interface IInterestSubmission {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  affiliation: 'GT Student' | 'Other';
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateInterestSubmissionData {
  name: string;
  email: string;
  phone?: string;
  affiliation: 'GT Student' | 'Other';
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  notes?: string;
}

// Sponsor inquiry types
export interface ISponsorInquiry {
  _id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSponsorInquiryData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

// Auth types
export interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
  };
}

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
  };
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Pagination query parameters
export interface PaginationQuery {
  page?: string;
  limit?: string;
}

// Error types
export interface AppError extends Error {
  statusCode: number;
  isOperational: boolean;
}
