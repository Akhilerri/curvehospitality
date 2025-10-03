import { z } from 'zod';
import { paginationSchema, sortSchema } from './common';

// Generic API response schemas
export const apiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.record(z.any()).optional(),
  field: z.string().optional(),
  stack: z.string().optional(),
});

export const apiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: apiErrorSchema.optional(),
  message: z.string().optional(),
  timestamp: z.string().datetime(),
  requestId: z.string().optional(),
});

// CRUD operation schemas
export const createRequestSchema = z.object({
  data: z.any(),
});

export const updateRequestSchema = z.object({
  id: z.string(),
  data: z.any(),
});

export const deleteRequestSchema = z.object({
  id: z.string(),
});

export const getByIdRequestSchema = z.object({
  id: z.string(),
});

export const listRequestSchema = paginationSchema.merge(sortSchema).extend({
  include: z.array(z.string()).optional(),
  fields: z.array(z.string()).optional(),
  filters: z.record(z.any()).optional(),
});

// File upload schemas
export const fileUploadRequestSchema = z.object({
  folder: z.string().optional(),
  public: z.boolean().default(true),
  metadata: z.record(z.any()).optional(),
});

export const fileUploadResponseSchema = z.object({
  url: z.string().url(),
  filename: z.string(),
  size: z.number().positive(),
  mimeType: z.string(),
  metadata: z.record(z.any()).optional(),
});

export const multipleFileUploadResponseSchema = z.object({
  files: z.array(fileUploadResponseSchema),
  failed: z.array(z.object({
    filename: z.string(),
    error: z.string(),
  })).optional(),
});

// Search schemas
export const searchRequestSchema = paginationSchema.merge(sortSchema).extend({
  query: z.string().min(1),
  filters: z.record(z.any()).optional(),
  facets: z.array(z.string()).optional(),
  highlight: z.boolean().default(false),
});

export const searchFacetValueSchema = z.object({
  value: z.string(),
  count: z.number().int().min(0),
  selected: z.boolean().optional(),
});

export const searchFacetSchema = z.object({
  field: z.string(),
  values: z.array(searchFacetValueSchema),
});

export const searchResponseSchema = z.object({
  data: z.array(z.any()),
  pagination: z.object({
    page: z.number().int().min(1),
    limit: z.number().int().min(1),
    total: z.number().int().min(0),
    totalPages: z.number().int().min(0),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
  query: z.string(),
  facets: z.array(searchFacetSchema).optional(),
  suggestions: z.array(z.string()).optional(),
  executionTime: z.number().positive().optional(),
});

// Batch operation schemas
export const batchOperationSchema = z.object({
  type: z.enum(['create', 'update', 'delete']),
  id: z.string().optional(),
  data: z.any().optional(),
});

export const batchRequestSchema = z.object({
  operations: z.array(batchOperationSchema),
});

export const batchResultSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: apiErrorSchema.optional(),
  operation: batchOperationSchema,
});

export const batchResponseSchema = z.object({
  results: z.array(batchResultSchema),
  summary: z.object({
    total: z.number().int().min(0),
    successful: z.number().int().min(0),
    failed: z.number().int().min(0),
  }),
});

// Authentication schemas
export const authRequestSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const authResponseSchema = z.object({
  token: z.string(),
  refreshToken: z.string().optional(),
  expiresIn: z.number().positive(),
  user: z.object({
    id: z.string(),
    username: z.string(),
    email: z.string().email().optional(),
    roles: z.array(z.string()),
  }),
});

export const refreshTokenRequestSchema = z.object({
  refreshToken: z.string(),
});

// Health check schemas
export const serviceHealthSchema = z.object({
  name: z.string(),
  status: z.enum(['healthy', 'degraded', 'unhealthy']),
  responseTime: z.number().positive().optional(),
  error: z.string().optional(),
});

export const healthCheckResponseSchema = z.object({
  status: z.enum(['healthy', 'degraded', 'unhealthy']),
  timestamp: z.string().datetime(),
  uptime: z.number().positive(),
  version: z.string(),
  services: z.array(serviceHealthSchema),
});

// Rate limiting schemas
export const rateLimitInfoSchema = z.object({
  limit: z.number().int().positive(),
  remaining: z.number().int().min(0),
  reset: z.number().int().positive(),
  retryAfter: z.number().int().positive().optional(),
});

// Webhook schemas
export const webhookEventSchema = z.object({
  id: z.string(),
  type: z.string(),
  data: z.any(),
  timestamp: z.string().datetime(),
  source: z.string(),
  version: z.string(),
});

export const webhookDeliverySchema = z.object({
  id: z.string(),
  eventId: z.string(),
  url: z.string().url(),
  status: z.enum(['pending', 'delivered', 'failed']),
  attempts: z.number().int().min(0),
  lastAttempt: z.string().datetime().optional(),
  nextAttempt: z.string().datetime().optional(),
  response: z.object({
    status: z.number().int(),
    headers: z.record(z.string()),
    body: z.string().optional(),
  }).optional(),
});

// Analytics schemas
export const analyticsEventSchema = z.object({
  event: z.string().min(1),
  properties: z.record(z.any()).optional(),
  userId: z.string().optional(),
  sessionId: z.string().optional(),
  timestamp: z.string().datetime().optional(),
});

export const metricSchema = z.object({
  name: z.string(),
  value: z.number(),
  unit: z.string().optional(),
  tags: z.record(z.string()).optional(),
  timestamp: z.string().datetime(),
});

export const metricsResponseSchema = z.object({
  metrics: z.array(metricSchema),
  period: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
});