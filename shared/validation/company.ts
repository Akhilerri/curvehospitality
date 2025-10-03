import { z } from 'zod';
import { 
  uuidSchema, 
  shortTextSchema, 
  longTextSchema, 
  imageMetadataSchema, 
  contactInfoSchema,
  optionalStringArraySchema 
} from './common';

export const createCompanySchema = z.object({
  name: shortTextSchema,
  description: longTextSchema.optional(),
  foundedYear: z.number().int().min(1800).max(new Date().getFullYear()).optional(),
  mission: longTextSchema.optional(),
  values: optionalStringArraySchema,
});

export const updateCompanySchema = createCompanySchema.partial().extend({
  id: uuidSchema,
});

export const companyHistorySchema = z.object({
  year: z.number().int().min(1800).max(new Date().getFullYear()),
  milestone: shortTextSchema,
  description: longTextSchema,
  image: imageMetadataSchema.optional(),
});

export const companyValuesSchema = z.object({
  title: shortTextSchema,
  description: longTextSchema,
  icon: z.string().optional(),
});

export const companyMissionSchema = z.object({
  statement: longTextSchema,
  vision: longTextSchema.optional(),
  description: longTextSchema.optional(),
});

export const companyResponseSchema = z.object({
  company: z.object({
    id: uuidSchema,
    name: z.string(),
    description: z.string().optional(),
    foundedYear: z.number().optional(),
    mission: z.string().optional(),
    values: z.array(z.string()).optional(),
    logo: imageMetadataSchema.optional(),
    contactInfo: contactInfoSchema.optional(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
  }),
});

export const companyListResponseSchema = z.object({
  companies: z.array(companyResponseSchema.shape.company),
});