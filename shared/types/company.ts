import { BaseEntity, ContactInfo, ImageMetadata } from './common';

export interface Company extends BaseEntity {
  name: string;
  description?: string;
  foundedYear?: number;
  mission?: string;
  values?: string[];
  logo?: ImageMetadata;
  contactInfo?: ContactInfo;
}

export interface CompanyHistory {
  year: number;
  milestone: string;
  description: string;
  image?: ImageMetadata;
}

export interface CompanyValues {
  title: string;
  description: string;
  icon?: string;
}

export interface CompanyMission {
  statement: string;
  vision?: string;
  description?: string;
}

// API request/response types
export interface CreateCompanyRequest {
  name: string;
  description?: string;
  foundedYear?: number;
  mission?: string;
  values?: string[];
}

export interface UpdateCompanyRequest extends Partial<CreateCompanyRequest> {
  id: string;
}

export interface CompanyResponse {
  company: Company;
}

export interface CompanyListResponse {
  companies: Company[];
}