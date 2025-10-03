import { z } from 'zod';
import { 
  uuidSchema, 
  shortTextSchema, 
  longTextSchema, 
  serviceTypeSchema,
  priceSchema,
  priceRangeSchema,
  optionalStringArraySchema 
} from './common';

export const processStepSchema = z.object({
  step: z.number().int().positive(),
  title: shortTextSchema,
  description: longTextSchema,
  duration: z.string().optional(),
  deliverables: optionalStringArraySchema,
  clientInvolvement: longTextSchema.optional(),
});

export const servicePricingSchema = z.object({
  type: z.enum(['fixed', 'hourly', 'project', 'consultation']),
  startingPrice: priceSchema.optional(),
  currency: z.string().length(3).default('USD'),
  priceRange: priceRangeSchema.optional(),
  description: longTextSchema.optional(),
});

export const serviceDurationSchema = z.object({
  typical: z.string(),
  minimum: z.string().optional(),
  maximum: z.string().optional(),
  factors: optionalStringArraySchema,
});

export const createServiceSchema = z.object({
  companyId: uuidSchema,
  title: shortTextSchema,
  description: longTextSchema.optional(),
  type: serviceTypeSchema,
  capabilities: optionalStringArraySchema,
  processSteps: z.array(processStepSchema).optional(),
  images: z.array(z.string().url()).optional(),
  orderIndex: z.number().int().min(0).default(0),
  pricing: servicePricingSchema.optional(),
  duration: serviceDurationSchema.optional(),
  deliverables: optionalStringArraySchema,
});

export const updateServiceSchema = createServiceSchema.partial().extend({
  id: uuidSchema,
});

export const serviceFiltersSchema = z.object({
  companyId: uuidSchema.optional(),
  type: serviceTypeSchema.optional(),
  isActive: z.boolean().optional(),
});

export const serviceResponseSchema = z.object({
  service: z.object({
    id: uuidSchema,
    companyId: uuidSchema,
    title: z.string(),
    description: z.string().optional(),
    type: serviceTypeSchema,
    capabilities: z.array(z.string()).optional(),
    processSteps: z.array(processStepSchema).optional(),
    images: z.array(z.string()).optional(),
    orderIndex: z.number().optional(),
    isActive: z.boolean().optional(),
    pricing: servicePricingSchema.optional(),
    duration: serviceDurationSchema.optional(),
    deliverables: z.array(z.string()).optional(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
  }),
});

export const serviceListResponseSchema = z.object({
  services: z.array(serviceResponseSchema.shape.service),
});