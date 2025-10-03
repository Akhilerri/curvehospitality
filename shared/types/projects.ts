import { BaseEntity, ImageMetadata, ProjectSegment, PaginationParams, FilterParams } from './common';

export interface Project extends BaseEntity {
  companyId: string;
  title: string;
  client?: string;
  location?: string;
  brand?: string;
  segment?: ProjectSegment;
  description?: string;
  challenges?: string[];
  solutions?: string[];
  results?: string[];
  images?: ProjectImage[];
  completedAt?: Date;
  isFeatured?: boolean;
  status?: ProjectStatus;
  budget?: ProjectBudget;
  timeline?: ProjectTimeline;
  testimonial?: Testimonial;
  tags?: string[];
  services?: string[]; // Service IDs used in this project
}

export interface ProjectImage extends ImageMetadata {
  type: 'before' | 'after' | 'process' | 'final';
  order: number;
  room?: string;
  description?: string;
}

export interface ProjectStatus {
  current: 'planning' | 'in_progress' | 'completed' | 'on_hold';
  progress?: number; // 0-100
  milestones?: ProjectMilestone[];
}

export interface ProjectMilestone {
  title: string;
  description?: string;
  dueDate?: Date;
  completedDate?: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
}

export interface ProjectBudget {
  total?: number;
  currency: string;
  breakdown?: BudgetBreakdown[];
  isPublic?: boolean;
}

export interface BudgetBreakdown {
  category: string;
  amount: number;
  percentage?: number;
}

export interface ProjectTimeline {
  startDate?: Date;
  endDate?: Date;
  duration?: string;
  phases?: ProjectPhase[];
}

export interface ProjectPhase {
  name: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  status: 'pending' | 'in_progress' | 'completed';
  deliverables?: string[];
}

export interface Testimonial {
  clientName: string;
  clientTitle?: string;
  clientCompany?: string;
  quote: string;
  rating?: number;
  date?: Date;
  image?: ImageMetadata;
}

// Portfolio and filtering types
export interface ProjectFilter {
  brand?: string;
  segment?: ProjectSegment;
  location?: string;
  services?: string[];
  completedYear?: number;
  isFeatured?: boolean;
}

export interface PortfolioGallery {
  projects: Project[];
  filters: ProjectFilterOptions;
  totalProjects: number;
}

export interface ProjectFilterOptions {
  brands: { name: string; count: number }[];
  segments: { segment: ProjectSegment; count: number }[];
  locations: { location: string; count: number }[];
  services: { id: string; name: string; count: number }[];
  years: { year: number; count: number }[];
}

// Case study types
export interface CaseStudy extends Project {
  executiveSummary: string;
  problemStatement: string;
  approach: string[];
  keyFeatures: string[];
  lessonsLearned?: string[];
  nextSteps?: string[];
  relatedProjects?: string[]; // Project IDs
}

// API request/response types
export interface CreateProjectRequest {
  companyId: string;
  title: string;
  client?: string;
  location?: string;
  brand?: string;
  segment?: ProjectSegment;
  description?: string;
  challenges?: string[];
  solutions?: string[];
  results?: string[];
  images?: ProjectImage[];
  completedAt?: Date;
  isFeatured?: boolean;
  budget?: ProjectBudget;
  timeline?: ProjectTimeline;
  testimonial?: Testimonial;
  tags?: string[];
  services?: string[];
}

export interface UpdateProjectRequest extends Partial<CreateProjectRequest> {
  id: string;
}

export interface ProjectResponse {
  project: Project;
}

export interface ProjectListResponse {
  projects: Project[];
}

export interface CaseStudyResponse {
  caseStudy: CaseStudy;
}

export interface ProjectSearchRequest extends PaginationParams {
  query?: string;
  brand?: string;
  segment?: ProjectSegment;
  location?: string;
  services?: string[];
  completedYear?: number;
  isFeatured?: boolean;
}

export interface ProjectFilters extends FilterParams {
  companyId?: string;
  brand?: string;
  segment?: ProjectSegment;
  location?: string;
  services?: string[];
  completedYear?: number;
  isFeatured?: boolean;
  status?: string;
}