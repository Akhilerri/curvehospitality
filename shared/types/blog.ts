import { BaseEntity, ImageMetadata, SEOMetadata, PaginationParams, FilterParams } from './common';

export interface BlogPost extends BaseEntity {
  companyId: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  author: string;
  category: string;
  tags?: string[];
  featuredImage?: ImageMetadata;
  publishedAt?: Date;
  isPublished?: boolean;
  readingTime?: number; // in minutes
  viewCount?: number;
  seo?: SEOMetadata;
  relatedPosts?: string[]; // Blog post IDs
}

export interface BlogCategory {
  id: string;
  name: string;
  description?: string;
  slug: string;
  postCount?: number;
  color?: string;
}

export interface BlogAuthor {
  id: string;
  name: string;
  bio?: string;
  avatar?: ImageMetadata;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  postCount?: number;
}

export interface BlogTag {
  name: string;
  slug: string;
  postCount?: number;
}

// Blog listing and search types
export interface BlogListing {
  posts: BlogPost[];
  categories: BlogCategory[];
  tags: BlogTag[];
  authors: BlogAuthor[];
  totalPosts: number;
}

export interface BlogSearchResult {
  posts: BlogPost[];
  totalResults: number;
  filters: BlogFilterOptions;
}

export interface BlogFilterOptions {
  categories: { name: string; slug: string; count: number }[];
  tags: { name: string; slug: string; count: number }[];
  authors: { name: string; id: string; count: number }[];
  years: { year: number; count: number }[];
}

// API request/response types
export interface CreateBlogPostRequest {
  companyId: string;
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  author: string;
  category: string;
  tags?: string[];
  featuredImageUrl?: string;
  publishedAt?: Date;
  isPublished?: boolean;
  seo?: SEOMetadata;
}

export interface UpdateBlogPostRequest extends Partial<CreateBlogPostRequest> {
  id: string;
}

export interface CreateBlogCategoryRequest {
  name: string;
  description?: string;
  slug?: string;
  color?: string;
}

export interface UpdateBlogCategoryRequest extends Partial<CreateBlogCategoryRequest> {
  id: string;
}

export interface CreateBlogAuthorRequest {
  name: string;
  bio?: string;
  avatarUrl?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface UpdateBlogAuthorRequest extends Partial<CreateBlogAuthorRequest> {
  id: string;
}

export interface BlogPostResponse {
  post: BlogPost;
}

export interface BlogPostListResponse {
  posts: BlogPost[];
}

export interface BlogCategoryResponse {
  category: BlogCategory;
}

export interface BlogCategoryListResponse {
  categories: BlogCategory[];
}

export interface BlogAuthorResponse {
  author: BlogAuthor;
}

export interface BlogAuthorListResponse {
  authors: BlogAuthor[];
}

export interface BlogSearchRequest extends PaginationParams {
  query?: string;
  category?: string;
  tag?: string;
  author?: string;
  year?: number;
  isPublished?: boolean;
}

export interface BlogFilters extends FilterParams {
  companyId?: string;
  category?: string;
  tags?: string[];
  author?: string;
  isPublished?: boolean;
  publishedYear?: number;
}