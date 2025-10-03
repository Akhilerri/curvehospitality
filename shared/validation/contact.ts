import { z } from 'zod';
import { 
  uuidSchema, 
  shortTextSchema, 
  longTextSchema, 
  emailSchema,
  phoneSchema,
  contactStatusSchema,
  addressSchema,
  urlSchema,
  dateStringSchema 
} from './common';

export const contactSourceSchema = z.enum([
  'website_form',
  'phone',
  'email',
  'referral',
  'social_media',
  'trade_show',
  'advertisement',
  'other',
]);

export const contactPrioritySchema = z.enum(['low', 'medium', 'high', 'urgent']);

export const projectTypeSchema = z.enum([
  'residential_design',
  'commercial_design',
  'manufacturing',
  'procurement',
  'project_management',
  'consultation',
  'other',
]);

export const budgetRangeSchema = z.enum([
  'under_10k',
  '10k_25k',
  '25k_50k',
  '50k_100k',
  '100k_250k',
  'over_250k',
  'not_sure',
]);

export const timelineRangeSchema = z.enum([
  'asap',
  '1_3_months',
  '3_6_months',
  '6_12_months',
  'over_1_year',
  'flexible',
]);

export const preferredContactMethodSchema = z.enum(['email', 'phone', 'text', 'no_preference']);

export const contactNoteSchema = z.object({
  id: uuidSchema,
  content: longTextSchema,
  createdBy: uuidSchema,
  createdAt: dateStringSchema,
  isInternal: z.boolean().default(false),
});

export const contactAttachmentSchema = z.object({
  id: uuidSchema,
  fileName: shortTextSchema,
  fileUrl: urlSchema,
  fileSize: z.number().positive(),
  mimeType: z.string(),
  uploadedAt: dateStringSchema,
});

export const contactFormSchema = z.object({
  name: shortTextSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  company: shortTextSchema.optional(),
  projectType: projectTypeSchema.optional(),
  budget: budgetRangeSchema.optional(),
  timeline: timelineRangeSchema.optional(),
  message: longTextSchema,
  preferredContact: preferredContactMethodSchema.optional(),
  marketingConsent: z.boolean().default(false),
});

export const businessHoursSchema = z.object({
  monday: z.string().optional(),
  tuesday: z.string().optional(),
  wednesday: z.string().optional(),
  thursday: z.string().optional(),
  friday: z.string().optional(),
  saturday: z.string().optional(),
  sunday: z.string().optional(),
  holidays: z.string().optional(),
});

export const businessLocationSchema = z.object({
  id: uuidSchema,
  name: shortTextSchema,
  type: z.enum(['headquarters', 'showroom', 'warehouse', 'office']),
  address: addressSchema,
  phone: phoneSchema.optional(),
  email: emailSchema.optional(),
  hours: businessHoursSchema.optional(),
  services: z.array(z.string()).optional(),
  isPublic: z.boolean().default(true),
});

export const socialMediaLinksSchema = z.object({
  facebook: urlSchema.optional(),
  instagram: urlSchema.optional(),
  linkedin: urlSchema.optional(),
  twitter: urlSchema.optional(),
  pinterest: urlSchema.optional(),
  houzz: urlSchema.optional(),
  youtube: urlSchema.optional(),
});

export const createContactSubmissionSchema = z.object({
  companyId: uuidSchema,
  name: shortTextSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  projectType: projectTypeSchema.optional(),
  message: longTextSchema,
  source: contactSourceSchema.optional(),
  attachments: z.array(contactAttachmentSchema).optional(),
});

export const updateContactSubmissionSchema = z.object({
  id: uuidSchema,
  status: contactStatusSchema.optional(),
  priority: contactPrioritySchema.optional(),
  assignedTo: uuidSchema.optional(),
  followUpDate: dateStringSchema.optional(),
  notes: z.string().optional(),
});

export const contactFiltersSchema = z.object({
  companyId: uuidSchema.optional(),
  status: contactStatusSchema.optional(),
  priority: contactPrioritySchema.optional(),
  source: contactSourceSchema.optional(),
  projectType: projectTypeSchema.optional(),
  assignedTo: uuidSchema.optional(),
  dateFrom: dateStringSchema.optional(),
  dateTo: dateStringSchema.optional(),
});

export const contactFormSubmissionSchema = contactFormSchema.extend({
  companyId: uuidSchema,
});

export const contactSubmissionResponseSchema = z.object({
  submission: z.object({
    id: uuidSchema,
    companyId: uuidSchema,
    name: z.string(),
    email: z.string(),
    phone: z.string().optional(),
    projectType: z.string().optional(),
    message: z.string(),
    submittedAt: z.string().datetime(),
    status: contactStatusSchema,
    source: contactSourceSchema.optional(),
    priority: contactPrioritySchema.optional(),
    assignedTo: z.string().optional(),
    followUpDate: z.string().optional(),
    notes: z.array(contactNoteSchema).optional(),
    attachments: z.array(contactAttachmentSchema).optional(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
  }),
});

export const contactSubmissionListResponseSchema = z.object({
  submissions: z.array(contactSubmissionResponseSchema.shape.submission),
});

export const contactInformationResponseSchema = z.object({
  contactInfo: z.object({
    companyName: z.string(),
    description: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    address: addressSchema.optional(),
    businessHours: z.record(z.string()).optional(),
    socialMedia: socialMediaLinksSchema.optional(),
    locations: z.array(businessLocationSchema).optional(),
    responseTime: z.string().optional(),
    languages: z.array(z.string()).optional(),
  }),
});