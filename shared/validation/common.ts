import { z } from 'zod';

// Common validation schemas
export const uuidSchema = z.string().uuid();

export const emailSchema = z.string().email();

export const phoneSchema = z.string().regex(/^[\+]?[1-9][\d]{0,15}$/, 'Invalid phone number format');

export const urlSchema = z.string().url();

export const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format');

export const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  offset: z.number().int().min(0).optional(),
});

export const sortSchema = z.object({
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
});

export const searchSchema = z.object({
  query: z.string().min(1).optional(),
});

export const imageMetadataSchema = z.object({
  url: urlSchema,
  alt: z.string().min(1),
  caption: z.string().optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  size: z.number().int().positive().optional(),
  format: z.string().optional(),
});

export const callToActionSchema = z.object({
  text: z.string().min(1),
  href: z.string().min(1),
  variant: z.enum(['primary', 'secondary', 'outline']).default('primary'),
  external: z.boolean().default(false),
});

export const seoMetadataSchema = z.object({
  title: z.string().max(60).optional(),
  description: z.string().max(160).optional(),
  keywords: z.array(z.string()).optional(),
  ogImage: urlSchema.optional(),
  canonicalUrl: urlSchema.optional(),
});

export const projectSegmentSchema = z.enum([
  'residential',
  'commercial',
  'hospitality',
  'retail',
  'healthcare',
  'education',
  'corporate',
]);

export const contactStatusSchema = z.enum(['new', 'in_progress', 'completed', 'closed']);

export const serviceTypeSchema = z.enum(['manufacturing', 'interior_design', 'procurement', 'project_management']);

export const addressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zipCode: z.string().min(1),
  country: z.string().min(1),
});

export const contactInfoSchema = z.object({
  phone: phoneSchema.optional(),
  email: emailSchema.optional(),
  address: addressSchema.optional(),
  businessHours: z.record(z.string()).optional(),
});

// File validation schemas
export const fileTypeSchema = z.enum(['pdf', 'doc', 'docx', 'zip', 'jpg', 'jpeg', 'png', 'webp', 'svg', 'other']);

export const fileSizeSchema = z.string().regex(/^\d+(\.\d+)?\s?(B|KB|MB|GB)$/i, 'Invalid file size format');

// Date validation schemas
export const dateStringSchema = z.string().datetime().or(z.string().date());

export const futureDateSchema = z.string().datetime().refine(
  (date: string) => new Date(date) > new Date(),
  'Date must be in the future'
);

export const pastDateSchema = z.string().datetime().refine(
  (date: string) => new Date(date) < new Date(),
  'Date must be in the past'
);

// Color validation
export const hexColorSchema = z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid hex color format');

// Price validation
export const priceSchema = z.number().positive().multipleOf(0.01);

export const priceRangeSchema = z.object({
  min: priceSchema,
  max: priceSchema,
}).refine((data: { min: number; max: number }) => data.min <= data.max, {
  message: 'Minimum price must be less than or equal to maximum price',
  path: ['min'],
});

// Text validation with length constraints
export const shortTextSchema = z.string().min(1).max(100);
export const mediumTextSchema = z.string().min(1).max(500);
export const longTextSchema = z.string().min(1).max(2000);
export const richTextSchema = z.string().min(1).max(10000);

// Array validation helpers
export const nonEmptyStringArraySchema = z.array(z.string().min(1)).min(1);
export const optionalStringArraySchema = z.array(z.string().min(1)).optional();

// ID validation for relationships
export const optionalUuidSchema = uuidSchema.optional();
export const uuidArraySchema = z.array(uuidSchema);
export const optionalUuidArraySchema = z.array(uuidSchema).optional();