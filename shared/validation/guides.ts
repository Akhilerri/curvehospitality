import { z } from 'zod';
import { 
  uuidSchema, 
  shortTextSchema, 
  longTextSchema, 
  urlSchema,
  emailSchema,
  phoneSchema,
  fileTypeSchema,
  fileSizeSchema,
  imageMetadataSchema,
  optionalStringArraySchema 
} from './common';

export const guideCategorySchema = z.object({
  id: uuidSchema,
  name: shortTextSchema,
  description: longTextSchema.optional(),
  icon: z.string().optional(),
  guideCount: z.number().int().min(0).optional(),
});

export const leadCaptureFormSchema = z.object({
  name: shortTextSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  company: shortTextSchema.optional(),
  jobTitle: shortTextSchema.optional(),
  interests: optionalStringArraySchema,
  marketingConsent: z.boolean().default(false),
});

export const createGuideSchema = z.object({
  companyId: uuidSchema,
  title: shortTextSchema,
  description: longTextSchema.optional(),
  fileUrl: urlSchema,
  fileSize: fileSizeSchema.optional(),
  requiresLeadCapture: z.boolean().default(true),
  categoryId: uuidSchema.optional(),
  tags: optionalStringArraySchema,
  thumbnailUrl: urlSchema.optional(),
  previewImageUrls: z.array(urlSchema).optional(),
  fileType: fileTypeSchema.optional(),
  language: z.string().length(2).default('en'),
});

export const updateGuideSchema = createGuideSchema.partial().extend({
  id: uuidSchema,
});

export const createGuideCategorySchema = z.object({
  name: shortTextSchema,
  description: longTextSchema.optional(),
  icon: z.string().optional(),
});

export const updateGuideCategorySchema = createGuideCategorySchema.partial().extend({
  id: uuidSchema,
});

export const guideDownloadSchema = z.object({
  guideId: uuidSchema,
  leadCapture: leadCaptureFormSchema.optional(),
});

export const guideSearchSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  fileType: fileTypeSchema.optional(),
  language: z.string().optional(),
  requiresLeadCapture: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export const guideFiltersSchema = z.object({
  companyId: uuidSchema.optional(),
  category: z.string().optional(),
  fileType: fileTypeSchema.optional(),
  language: z.string().optional(),
  requiresLeadCapture: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export const guideResponseSchema = z.object({
  guide: z.object({
    id: uuidSchema,
    companyId: uuidSchema,
    title: z.string(),
    description: z.string().optional(),
    fileUrl: z.string(),
    fileSize: z.string().optional(),
    downloadCount: z.number().optional(),
    requiresLeadCapture: z.boolean().optional(),
    isActive: z.boolean().optional(),
    category: guideCategorySchema.optional(),
    tags: z.array(z.string()).optional(),
    thumbnail: imageMetadataSchema.optional(),
    previewImages: z.array(imageMetadataSchema).optional(),
    fileType: fileTypeSchema.optional(),
    language: z.string().optional(),
    lastUpdated: z.string().datetime().optional(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
  }),
});

export const guideListResponseSchema = z.object({
  guides: z.array(guideResponseSchema.shape.guide),
});

export const guideCategoryResponseSchema = z.object({
  category: guideCategorySchema,
});

export const guideCategoryListResponseSchema = z.object({
  categories: z.array(guideCategorySchema),
});

export const guideDownloadResponseSchema = z.object({
  downloadUrl: urlSchema,
  guide: guideResponseSchema.shape.guide,
});