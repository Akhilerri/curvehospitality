import { BaseEntity, ImageMetadata, CallToAction, ServiceType } from './common';

export interface Service extends BaseEntity {
  companyId: string;
  title: string;
  description?: string;
  type: ServiceType;
  capabilities?: string[];
  processSteps?: ProcessStep[];
  images?: ImageMetadata[];
  orderIndex?: number;
  isActive?: boolean;
  pricing?: ServicePricing;
  duration?: ServiceDuration;
  deliverables?: string[];
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  duration?: string;
  deliverables?: string[];
  clientInvolvement?: string;
}

export interface ServicePricing {
  type: 'fixed' | 'hourly' | 'project' | 'consultation';
  startingPrice?: number;
  currency?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  description?: string;
}

export interface ServiceDuration {
  typical: string;
  minimum?: string;
  maximum?: string;
  factors?: string[];
}

export interface ServiceOverview {
  manufacturing: Service;
  interiorDesign: Service;
  procurement: Service;
  projectManagement: Service;
}

// API request/response types
export interface CreateServiceRequest {
  companyId: string;
  title: string;
  description?: string;
  type: ServiceType;
  capabilities?: string[];
  processSteps?: ProcessStep[];
  images?: string[];
  orderIndex?: number;
  pricing?: ServicePricing;
  duration?: ServiceDuration;
  deliverables?: string[];
}

export interface UpdateServiceRequest extends Partial<CreateServiceRequest> {
  id: string;
}

export interface ServiceResponse {
  service: Service;
}

export interface ServiceListResponse {
  services: Service[];
}

export interface ServiceFilters {
  companyId?: string;
  type?: ServiceType;
  isActive?: boolean;
}