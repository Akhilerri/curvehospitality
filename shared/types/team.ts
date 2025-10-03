import { BaseEntity, ImageMetadata } from './common';

export interface TeamMember extends BaseEntity {
  companyId: string;
  name: string;
  role: string;
  bio?: string;
  image?: ImageMetadata;
  experience?: string[];
  orderIndex?: number;
  isActive?: boolean;
  socialLinks?: SocialLinks;
  skills?: string[];
  education?: Education[];
  certifications?: string[];
}

export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field?: string;
  year?: number;
}

// API request/response types
export interface CreateTeamMemberRequest {
  companyId: string;
  name: string;
  role: string;
  bio?: string;
  imageUrl?: string;
  experience?: string[];
  orderIndex?: number;
  socialLinks?: SocialLinks;
  skills?: string[];
  education?: Education[];
  certifications?: string[];
}

export interface UpdateTeamMemberRequest extends Partial<CreateTeamMemberRequest> {
  id: string;
}

export interface TeamMemberResponse {
  teamMember: TeamMember;
}

export interface TeamMemberListResponse {
  teamMembers: TeamMember[];
}

export interface TeamMemberFilters {
  companyId?: string;
  role?: string;
  isActive?: boolean;
}