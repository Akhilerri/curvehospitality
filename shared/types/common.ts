// Common types used across the application

export interface BaseEntity {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface PaginationResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchParams {
  query?: string;
}

export interface FilterParams {
  [key: string]: string | number | boolean | string[] | undefined;
}

export interface ImageMetadata {
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  size?: number;
  format?: string;
}

export interface CallToAction {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
  external?: boolean;
}

export interface SEOMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

export type ProjectSegment = 
  | 'residential' 
  | 'commercial' 
  | 'hospitality' 
  | 'retail' 
  | 'healthcare' 
  | 'education' 
  | 'corporate';

export type ContactStatus = 'new' | 'in_progress' | 'completed' | 'closed';

export type ServiceType = 'manufacturing' | 'interior_design' | 'procurement' | 'project_management';

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  address?: Address;
  businessHours?: {
    [key: string]: string; // day: hours (e.g., "monday": "9:00 AM - 5:00 PM")
  };
}

export interface CompanyInfo extends BaseEntity {
  name: string;
  description?: string;
  foundedYear?: number;
  mission?: string;
  values?: string[];
  contactInfo?: ContactInfo;
}