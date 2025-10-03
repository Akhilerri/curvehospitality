import { BaseEntity, ImageMetadata } from './common';

export interface Guide extends BaseEntity {
  companyId: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileSize?: string;
  downloadCount?: number;
  requiresLeadCapture?: boolean;
  isActive?: boolean;
  category?: GuideCategory;
  tags?: string[];
  thumbnail?: ImageMetadata;
  previewImages?: ImageMetadata[];
  fileType?: 'pdf' | 'doc' | 'docx' | 'zip' | 'other';
  language?: string;
  lastUpdated?: Date;
}

export interface GuideCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  guideCount?: number;
}

export interface GuideDownload {
  id: string;
  guideId: string;
  userEmail?: string;
  userName?: string;
  userPhone?: string;
  userCompany?: string;
  downloadedAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

export interface LeadCaptureForm {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  interests?: string[];
  marketingConsent?: boolean;
}

// Guide library types
export interface GuideLibrary {
  guides: Guide[];
  categories: GuideCategory[];
  totalGuides: number;
  totalDownloads: number;
}

export interface GuideSearchResult {
  guides: Guide[];
  totalResults: number;
  filters: GuideFilterOptions;
}

export interface GuideFilterOptions {
  categories: { id: string; name: string; count: number }[];
  fileTypes: { type: string; count: number }[];
  languages: { language: string; count: number }[];
}

// API request/response types
export interface CreateGuideRequest {
  companyId: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileSize?: string;
  requiresLeadCapture?: boolean;
  categoryId?: string;
  tags?: string[];
  thumbnailUrl?: string;
  previewImageUrls?: string[];
  fileType?: 'pdf' | 'doc' | 'docx' | 'zip' | 'other';
  language?: string;
}

export interface UpdateGuideRequest extends Partial<CreateGuideRequest> {
  id: string;
}

export interface CreateGuideCategoryRequest {
  name: string;
  description?: string;
  icon?: string;
}

export interface UpdateGuideCategoryRequest extends Partial<CreateGuideCategoryRequest> {
  id: string;
}

export interface GuideDownloadRequest {
  guideId: string;
  leadCapture?: LeadCaptureForm;
}

export interface GuideResponse {
  guide: Guide;
}

export interface GuideListResponse {
  guides: Guide[];
}

export interface GuideCategoryResponse {
  category: GuideCategory;
}

export interface GuideCategoryListResponse {
  categories: GuideCategory[];
}

export interface GuideDownloadResponse {
  downloadUrl: string;
  guide: Guide;
}

export interface GuideSearchRequest {
  query?: string;
  category?: string;
  fileType?: string;
  language?: string;
  requiresLeadCapture?: boolean;
  isActive?: boolean;
}

export interface GuideFilters {
  companyId?: string;
  category?: string;
  fileType?: string;
  language?: string;
  requiresLeadCapture?: boolean;
  isActive?: boolean;
}