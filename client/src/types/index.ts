// Executive types
export interface Executive {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  email?: string;
  linkedinUrl?: string;
  visible: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
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
export interface Sponsor {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  blurb: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
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
export interface InterestSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  affiliation: 'GT Student' | 'Other';
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  notes?: string;
  createdAt: string;
  updatedAt: string;
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
export interface SponsorInquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSponsorInquiryData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

// Auth types
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

export interface User {
  id: string;
  username: string;
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

// Dashboard types
export interface DashboardStats {
  executives: {
    total: number;
    visible: number;
  };
  sponsors: {
    total: number;
    active: number;
  };
  interestSubmissions: {
    total: number;
    recent: number;
  };
  sponsorInquiries: {
    total: number;
    recent: number;
  };
}

// Form validation types
export interface FormErrors {
  [key: string]: string;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}
