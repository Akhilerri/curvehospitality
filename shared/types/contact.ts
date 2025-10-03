import { BaseEntity, ContactStatus, ContactInfo } from './common';

export interface ContactSubmission extends BaseEntity {
  companyId: string;
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  message: string;
  submittedAt: Date;
  status: ContactStatus;
  source?: ContactSource;
  priority?: ContactPriority;
  assignedTo?: string;
  followUpDate?: Date;
  notes?: ContactNote[];
  attachments?: ContactAttachment[];
}

export interface ContactNote {
  id: string;
  content: string;
  createdBy: string;
  createdAt: Date;
  isInternal?: boolean;
}

export interface ContactAttachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: Date;
}

export type ContactSource = 
  | 'website_form' 
  | 'phone' 
  | 'email' 
  | 'referral' 
  | 'social_media' 
  | 'trade_show' 
  | 'advertisement' 
  | 'other';

export type ContactPriority = 'low' | 'medium' | 'high' | 'urgent';

export type ProjectType = 
  | 'residential_design' 
  | 'commercial_design' 
  | 'manufacturing' 
  | 'procurement' 
  | 'project_management' 
  | 'consultation' 
  | 'other';

// Contact form types
export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: ProjectType;
  budget?: BudgetRange;
  timeline?: TimelineRange;
  message: string;
  preferredContact?: PreferredContactMethod;
  marketingConsent?: boolean;
  attachments?: File[];
}

export type BudgetRange = 
  | 'under_10k' 
  | '10k_25k' 
  | '25k_50k' 
  | '50k_100k' 
  | '100k_250k' 
  | 'over_250k' 
  | 'not_sure';

export type TimelineRange = 
  | 'asap' 
  | '1_3_months' 
  | '3_6_months' 
  | '6_12_months' 
  | 'over_1_year' 
  | 'flexible';

export type PreferredContactMethod = 'email' | 'phone' | 'text' | 'no_preference';

// Contact information display types
export interface ContactInformation extends ContactInfo {
  companyName: string;
  description?: string;
  socialMedia?: SocialMediaLinks;
  locations?: BusinessLocation[];
  responseTime?: string;
  languages?: string[];
}

export interface SocialMediaLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  pinterest?: string;
  houzz?: string;
  youtube?: string;
}

export interface BusinessLocation {
  id: string;
  name: string;
  type: 'headquarters' | 'showroom' | 'warehouse' | 'office';
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  phone?: string;
  email?: string;
  hours?: BusinessHours;
  services?: string[];
  isPublic?: boolean;
}

export interface BusinessHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
  holidays?: string;
}

// API request/response types
export interface CreateContactSubmissionRequest {
  companyId: string;
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  message: string;
  source?: ContactSource;
  attachments?: ContactAttachment[];
}

export interface UpdateContactSubmissionRequest {
  id: string;
  status?: ContactStatus;
  priority?: ContactPriority;
  assignedTo?: string;
  followUpDate?: Date;
  notes?: string;
}

export interface ContactSubmissionResponse {
  submission: ContactSubmission;
}

export interface ContactSubmissionListResponse {
  submissions: ContactSubmission[];
}

export interface ContactInformationResponse {
  contactInfo: ContactInformation;
}

export interface ContactFormSubmissionRequest extends ContactForm {
  companyId: string;
}

export interface ContactFilters {
  companyId?: string;
  status?: ContactStatus;
  priority?: ContactPriority;
  source?: ContactSource;
  projectType?: string;
  assignedTo?: string;
  dateFrom?: Date;
  dateTo?: Date;
}