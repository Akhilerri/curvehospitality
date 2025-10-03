import { z } from 'zod';
import { 
  uuidSchema, 
  shortTextSchema, 
  longTextSchema, 
  projectSegmentSchema,
  imageMetadataSchema,
  dateStringSchema,
  priceSchema,
  optionalStringArraySchema,
  paginationSchema 
} from './common';

export const projectImageSchema = imageMetadataSchema.extend({
  type: z.enum(['before', 'after', 'process', 'final']),
  order: z.number().int().min(0),
  room: z.string().optional(),
  description: z.string().optional(),
});

export const projectMilestoneSchema = z.object({
  title: shortTextSchema,
  description: longTextSchema.optional(),
  dueDate: dateStringSchema.optional(),
  completedDate: dateStringSchema.optional(),
  status: z.enum(['pending', 'in_progress', 'completed', 'delayed']),
});

export const projectStatusSchema = z.object({
  current: z.enum(['planning', 'in_progress', 'completed', 'on_hold']),
  progress: z.number().min(0).max(100).optional(),
  milestones: z.array(projectMilestoneSchema).optional(),
});

export const budgetBreakdownSchema = z.object({
  category: shortTextSchema,
  amount: priceSchema,
  percentage: z.number().min(0).max(100).optional(),
});

export const projectBudgetSchema = z.object({
  total: priceSchema.optional(),
  currency: z.string().length(3).default('USD'),
  breakdown: z.array(budgetBreakdownSchema).optional(),
  isPublic: z.boolean().default(false),
});

export const projectPhaseSchema = z.object({
  name: shortTextSchema,
  description: longTextSchema.optional(),
  startDate: dateStringSchema.optional(),
  endDate: dateStringSchema.optional(),
  status: z.enum(['pending', 'in_progress', 'completed']),
  deliverables: optionalStringArraySchema,
});

export const projectTimelineSchema = z.object({
  startDate: dateStringSchema.optional(),
  endDate: dateStringSchema.optional(),
  duration: z.string().optional(),
  phases: z.array(projectPhaseSchema).optional(),
});

export const testimonialSchema = z.object({
  clientName: shortTextSchema,
  clientTitle: shortTextSchema.optional(),
  clientCompany: shortTextSchema.optional(),
  quote: longTextSchema,
  rating: z.number().min(1).max(5).optional(),
  date: dateStringSchema.optional(),
  image: imageMetadataSchema.optional(),
});

export const createProjectSchema = z.object({
  companyId: uuidSchema,
  title: shortTextSchema,
  client: shortTextSchema.optional(),
  location: shortTextSchema.optional(),
  brand: shortTextSchema.optional(),
  segment: projectSegmentSchema.optional(),
  description: longTextSchema.optional(),
  challenges: optionalStringArraySchema,
  solutions: optionalStringArraySchema,
  results: optionalStringArraySchema,
  images: z.array(projectImageSchema).optional(),
  completedAt: dateStringSchema.optional(),
  isFeatured: z.boolean().default(false),
  budget: projectBudgetSchema.optional(),
  timeline: projectTimelineSchema.optional(),
  testimonial: testimonialSchema.optional(),
  tags: optionalStringArraySchema,
  services: z.array(uuidSchema).optional(),
});

export const updateProjectSchema = createProjectSchema.partial().extend({
  id: uuidSchema,
});

export const projectFilterSchema = z.object({
  brand: z.string().optional(),
  segment: projectSegmentSchema.optional(),
  location: z.string().optional(),
  services: z.array(z.string()).optional(),
  completedYear: z.number().int().min(1900).max(new Date().getFullYear()).optional(),
  isFeatured: z.boolean().optional(),
});

export const projectSearchSchema = paginationSchema.extend({
  query: z.string().optional(),
  brand: z.string().optional(),
  segment: projectSegmentSchema.optional(),
  location: z.string().optional(),
  services: z.array(z.string()).optional(),
  completedYear: z.number().int().optional(),
  isFeatured: z.boolean().optional(),
});

export const projectFiltersSchema = z.object({
  companyId: uuidSchema.optional(),
  brand: z.string().optional(),
  segment: projectSegmentSchema.optional(),
  location: z.string().optional(),
  services: z.array(z.string()).optional(),
  completedYear: z.number().int().optional(),
  isFeatured: z.boolean().optional(),
  status: z.string().optional(),
});

export const projectResponseSchema = z.object({
  project: z.object({
    id: uuidSchema,
    companyId: uuidSchema,
    title: z.string(),
    client: z.string().optional(),
    location: z.string().optional(),
    brand: z.string().optional(),
    segment: projectSegmentSchema.optional(),
    description: z.string().optional(),
    challenges: z.array(z.string()).optional(),
    solutions: z.array(z.string()).optional(),
    results: z.array(z.string()).optional(),
    images: z.array(projectImageSchema).optional(),
    completedAt: z.string().optional(),
    isFeatured: z.boolean().optional(),
    status: projectStatusSchema.optional(),
    budget: projectBudgetSchema.optional(),
    timeline: projectTimelineSchema.optional(),
    testimonial: testimonialSchema.optional(),
    tags: z.array(z.string()).optional(),
    services: z.array(z.string()).optional(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
  }),
});

export const projectListResponseSchema = z.object({
  projects: z.array(projectResponseSchema.shape.project),
});