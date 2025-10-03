import { PaginationResponse, PaginationParams, SortParams, FilterParams } from './common';

// Generic API response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
  timestamp: string;
  requestId?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  field?: string;
  stack?: string;
}

// HTTP status codes
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}

// Generic CRUD operations
export interface CreateRequest<T> {
  data: T;
}

export interface UpdateRequest<T> {
  id: string;
  data: Partial<T>;
}

export interface DeleteRequest {
  id: string;
}

export interface GetByIdRequest {
  id: string;
}

export interface ListRequest extends PaginationParams, SortParams, FilterParams {
  include?: string[];
  fields?: string[];
}

// File upload types
export interface FileUploadRequest {
  file: File;
  folder?: string;
  public?: boolean;
  metadata?: Record<string, any>;
}

export interface FileUploadResponse {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
  metadata?: Record<string, any>;
}

export interface MultipleFileUploadRequest {
  files: File[];
  folder?: string;
  public?: boolean;
  metadata?: Record<string, any>;
}

export interface MultipleFileUploadResponse {
  files: FileUploadResponse[];
  failed?: { filename: string; error: string }[];
}

// Search and filtering
export interface SearchRequest extends PaginationParams, SortParams {
  query: string;
  filters?: FilterParams;
  facets?: string[];
  highlight?: boolean;
}

export interface SearchResponse<T> extends PaginationResponse<T> {
  query: string;
  facets?: SearchFacet[];
  suggestions?: string[];
  executionTime?: number;
}

export interface SearchFacet {
  field: string;
  values: SearchFacetValue[];
}

export interface SearchFacetValue {
  value: string;
  count: number;
  selected?: boolean;
}

// Batch operations
export interface BatchRequest<T> {
  operations: BatchOperation<T>[];
}

export interface BatchOperation<T> {
  type: 'create' | 'update' | 'delete';
  id?: string;
  data?: T;
}

export interface BatchResponse<T> {
  results: BatchResult<T>[];
  summary: {
    total: number;
    successful: number;
    failed: number;
  };
}

export interface BatchResult<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  operation: BatchOperation<T>;
}

// Authentication and authorization
export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  expiresIn: number;
  user: {
    id: string;
    username: string;
    email?: string;
    roles: string[];
  };
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// Health check and monitoring
export interface HealthCheckResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptime: number;
  version: string;
  services: ServiceHealth[];
}

export interface ServiceHealth {
  name: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  responseTime?: number;
  error?: string;
}

// Rate limiting
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}

// Webhook types
export interface WebhookEvent<T = any> {
  id: string;
  type: string;
  data: T;
  timestamp: string;
  source: string;
  version: string;
}

export interface WebhookDelivery {
  id: string;
  eventId: string;
  url: string;
  status: 'pending' | 'delivered' | 'failed';
  attempts: number;
  lastAttempt?: string;
  nextAttempt?: string;
  response?: {
    status: number;
    headers: Record<string, string>;
    body?: string;
  };
}

// Cache types
export interface CacheInfo {
  key: string;
  ttl?: number;
  tags?: string[];
}

export interface CacheResponse<T> {
  data: T;
  cached: boolean;
  cacheKey?: string;
  expiresAt?: string;
}

// Analytics and metrics
export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  userId?: string;
  sessionId?: string;
  timestamp?: string;
}

export interface MetricsResponse {
  metrics: Metric[];
  period: {
    start: string;
    end: string;
  };
}

export interface Metric {
  name: string;
  value: number;
  unit?: string;
  tags?: Record<string, string>;
  timestamp: string;
}