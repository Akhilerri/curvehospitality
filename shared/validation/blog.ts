import { z } from 'zod';
import { 
  uuidSchema, 
  shortTextSchema, 
  longTextSchema, 
  richTextSchema,
  slugSchema,
  imageMetadataSchema,
  seoMetadataSchema,
  dateStringSchema,
  urlSchema,
  optionalStringArraySchema,
  paginationSchema 
} from './common';

export const blogCategorySchema = z.object({
  id: uuidSchema,
  name: shortTextSchema,
  description: longTextSchema.optional(),
  slug: slugSchema,
  postCount: z.number().int().min(0).optional(),
  color: z.string().optional(),
});

export const blogAuthorSchema = z.object({
  id: uuidSchema,
  name: shortTextSchema,
  bio: longTextSchema.optional(),
  avatar: imageMetadataSchema.optional(),
  socialLinks: z.object({
    twitter: urlSchema.optional(),
    linkedin: urlSchema.optional(),
    website: urlSchema.optional(),
  }).optional(),
  postCount: z.number().int().min(0).optional(),
});

export const blogTagSchema = z.object({
  name: shortTextSchema,
  slug: slugSchema,
  postCount: z.number().int().min(0).optional(),
});

export const createBlogPostSchema = z.object({
  companyId: uuidSchema,
  title: shortTextSchema,
  slug: slugSchema.optional(),
  excerpt: longTextSchema.optional(),
  content: richTextSchema,
  author: shortTextSchema,
  category: shortTextSchema,
  tags: optionalStringArraySchema,
  featuredImageUrl: urlSchema.optional(),
  publishedAt: dateStringSchema.optional(),
  isPublished: z.boolean().default(false),
  seo: seoMetadataSchema.optional(),
});

export const updateBlogPostSchema = createBlogPostSchema.partial().extend({
  id: uuidSchema,
});

export const createBlogCategorySchema = z.object({
  name: shortTextSchema,
  description: longTextSchema.optional(),
  slug: slugSchema.optional(),
  color: z.string().optional(),
});

export const updateBlogCategorySchema = createBlogCategorySchema.partial().extend({
  id: uuidSchema,
});

export const createBlogAuthorSchema = z.object({
  name: shortTextSchema,
  bio: longTextSchema.optional(),
  avatarUrl: urlSchema.optional(),
  socialLinks: z.object({
    twitter: urlSchema.optional(),
    linkedin: urlSchema.optional(),
    website: urlSchema.optional(),
  }).optional(),
});

export const updateBlogAuthorSchema = createBlogAuthorSchema.partial().extend({
  id: uuidSchema,
});

export const blogSearchSchema = paginationSchema.extend({
  query: z.string().optional(),
  category: z.string().optional(),
  tag: z.string().optional(),
  author: z.string().optional(),
  year: z.number().int().min(2000).max(new Date().getFullYear()).optional(),
  isPublished: z.boolean().optional(),
});

export const blogFiltersSchema = z.object({
  companyId: uuidSchema.optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  author: z.string().optional(),
  isPublished: z.boolean().optional(),
  publishedYear: z.number().int().optional(),
});

export const blogPostResponseSchema = z.object({
  post: z.object({
    id: uuidSchema,
    companyId: uuidSchema,
    title: z.string(),
    slug: z.string(),
    excerpt: z.string().optional(),
    content: z.string(),
    author: z.string(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    featuredImage: imageMetadataSchema.optional(),
    publishedAt: z.string().optional(),
    isPublished: z.boolean().optional(),
    readingTime: z.number().optional(),
    viewCount: z.number().optional(),
    seo: seoMetadataSchema.optional(),
    relatedPosts: z.array(z.string()).optional(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
  }),
});

export const blogPostListResponseSchema = z.object({
  posts: z.array(blogPostResponseSchema.shape.post),
});

export const blogCategoryResponseSchema = z.object({
  category: blogCategorySchema,
});

export const blogCategoryListResponseSchema = z.object({
  categories: z.array(blogCategorySchema),
});

export const blogAuthorResponseSchema = z.object({
  author: blogAuthorSchema,
});

export const blogAuthorListResponseSchema = z.object({
  authors: z.array(blogAuthorSchema),
});