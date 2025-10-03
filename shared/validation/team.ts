import { z } from 'zod';
import { 
  uuidSchema, 
  shortTextSchema, 
  longTextSchema, 
  imageMetadataSchema,
  urlSchema,
  optionalStringArraySchema 
} from './common';

export const socialLinksSchema = z.object({
  linkedin: urlSchema.optional(),
  twitter: urlSchema.optional(),
  instagram: urlSchema.optional(),
  website: urlSchema.optional(),
});

export const educationSchema = z.object({
  institution: shortTextSchema,
  degree: shortTextSchema,
  field: shortTextSchema.optional(),
  year: z.number().int().min(1950).max(new Date().getFullYear() + 10).optional(),
});

export const createTeamMemberSchema = z.object({
  companyId: uuidSchema,
  name: shortTextSchema,
  role: shortTextSchema,
  bio: longTextSchema.optional(),
  imageUrl: urlSchema.optional(),
  experience: optionalStringArraySchema,
  orderIndex: z.number().int().min(0).default(0),
  socialLinks: socialLinksSchema.optional(),
  skills: optionalStringArraySchema,
  education: z.array(educationSchema).optional(),
  certifications: optionalStringArraySchema,
});

export const updateTeamMemberSchema = createTeamMemberSchema.partial().extend({
  id: uuidSchema,
});

export const teamMemberFiltersSchema = z.object({
  companyId: uuidSchema.optional(),
  role: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const teamMemberResponseSchema = z.object({
  teamMember: z.object({
    id: uuidSchema,
    companyId: uuidSchema,
    name: z.string(),
    role: z.string(),
    bio: z.string().optional(),
    image: imageMetadataSchema.optional(),
    experience: z.array(z.string()).optional(),
    orderIndex: z.number().optional(),
    isActive: z.boolean().optional(),
    socialLinks: socialLinksSchema.optional(),
    skills: z.array(z.string()).optional(),
    education: z.array(educationSchema).optional(),
    certifications: z.array(z.string()).optional(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
  }),
});

export const teamMemberListResponseSchema = z.object({
  teamMembers: z.array(teamMemberResponseSchema.shape.teamMember),
});