import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse } from '../types';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Clear invalid token
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Generic API request function
export const apiRequest = async <T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: any
): Promise<T> => {
  try {
    console.log(`Making ${method} request to ${url}`, data);
    const response = await api.request<ApiResponse<T>>({
      method,
      url,
      data,
    });
    
    console.log('API response:', response.data);
    
    if (response.data.success) {
      return response.data.data as T;
    } else {
      throw new Error(response.data.error || 'Request failed');
    }
  } catch (error: any) {
    console.error('API request error:', error);
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error(error.message || 'Network error');
  }
};

// API functions for executives
export const execsApi = {
  getAll: () => apiRequest<Executive[]>('GET', '/execs'),
  getAdmin: (page = 1, limit = 10) => 
    apiRequest<PaginatedResponse<Executive>>('GET', `/execs/admin?page=${page}&limit=${limit}`),
  getById: (id: string) => apiRequest<Executive>('GET', `/execs/admin/${id}`),
  create: (data: CreateExecutiveData) => 
    apiRequest<Executive>('POST', '/execs/admin', data),
  update: (id: string, data: UpdateExecutiveData) => 
    apiRequest<Executive>('PUT', `/execs/admin/${id}`, data),
  delete: (id: string) => apiRequest<void>('DELETE', `/execs/admin/${id}`),
};

// API functions for sponsors
export const sponsorsApi = {
  getActive: () => apiRequest<Sponsor | null>('GET', '/sponsors/active'),
  getAdmin: (page = 1, limit = 10) => 
    apiRequest<PaginatedResponse<Sponsor>>('GET', `/sponsors/admin?page=${page}&limit=${limit}`),
  getById: (id: string) => apiRequest<Sponsor>('GET', `/sponsors/admin/${id}`),
  create: (data: CreateSponsorData) => 
    apiRequest<Sponsor>('POST', '/sponsors/admin', data),
  update: (id: string, data: UpdateSponsorData) => 
    apiRequest<Sponsor>('PUT', `/sponsors/admin/${id}`, data),
  delete: (id: string) => apiRequest<void>('DELETE', `/sponsors/admin/${id}`),
  activate: (id: string) => apiRequest<Sponsor>('POST', `/sponsors/admin/${id}/activate`),
  submitInquiry: (data: CreateSponsorInquiryData) => 
    apiRequest<SponsorInquiry>('POST', '/sponsors/inquiry', data),
};

// API functions for interest submissions
export const interestApi = {
  submit: (data: CreateInterestSubmissionData) => 
    apiRequest<InterestSubmission>('POST', '/interest', data),
  getAdmin: (page = 1, limit = 10) => 
    apiRequest<PaginatedResponse<InterestSubmission>>('GET', `/interest/admin?page=${page}&limit=${limit}`),
  getStats: () => apiRequest<any>('GET', '/interest/admin/stats'),
};

// API functions for authentication
export const authApi = {
  login: (data: LoginData) => apiRequest<AuthResponse>('POST', '/auth/login', data),
};

// API functions for admin dashboard
export const adminApi = {
  getDashboard: () => apiRequest<DashboardStats>('GET', '/admin/dashboard'),
};

// Re-export types for convenience
export type {
  Executive,
  CreateExecutiveData,
  UpdateExecutiveData,
  Sponsor,
  CreateSponsorData,
  UpdateSponsorData,
  InterestSubmission,
  CreateInterestSubmissionData,
  SponsorInquiry,
  CreateSponsorInquiryData,
  LoginData,
  AuthResponse,
  User,
  ApiResponse,
  PaginatedResponse,
  DashboardStats,
} from '../types';
