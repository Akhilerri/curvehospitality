import { BaseEntity, ImageMetadata, PaginationParams, SortParams, FilterParams } from './common';

export interface Product extends BaseEntity {
  companyId: string;
  categoryId: string;
  name: string;
  description?: string;
  specifications?: Record<string, string>;
  images?: ImageMetadata[];
  materials?: string[];
  priceRange?: string;
  isFeatured?: boolean;
  sku?: string;
  availability?: ProductAvailability;
  dimensions?: ProductDimensions;
  weight?: number;
  colors?: ProductColor[];
  tags?: string[];
}

export interface ProductCategory extends BaseEntity {
  companyId: string;
  name: string;
  description?: string;
  parentId?: string;
  orderIndex?: number;
  image?: ImageMetadata;
  isActive?: boolean;
  children?: ProductCategory[];
  productCount?: number;
}

export interface ProductAvailability {
  status: 'in_stock' | 'out_of_stock' | 'pre_order' | 'discontinued';
  quantity?: number;
  leadTime?: string;
  restockDate?: Date;
}

export interface ProductDimensions {
  length?: number;
  width?: number;
  height?: number;
  unit: 'inches' | 'cm' | 'feet' | 'meters';
}

export interface ProductColor {
  name: string;
  hex?: string;
  image?: ImageMetadata;
}

export interface PricingInfo {
  basePrice?: number;
  salePrice?: number;
  currency: string;
  priceRange?: {
    min: number;
    max: number;
  };
  priceType: 'fixed' | 'range' | 'quote';
  bulkPricing?: BulkPricing[];
}

export interface BulkPricing {
  minQuantity: number;
  price: number;
  discount?: number;
}

// Product catalog types
export interface ProductCatalog {
  categories: ProductCategory[];
  featuredProducts: Product[];
  totalProducts: number;
}

export interface ProductSearchResult {
  products: Product[];
  categories: ProductCategory[];
  filters: ProductFilterOptions;
  totalResults: number;
}

export interface ProductFilterOptions {
  categories: { id: string; name: string; count: number }[];
  materials: { name: string; count: number }[];
  priceRanges: { label: string; min: number; max: number; count: number }[];
  colors: { name: string; hex?: string; count: number }[];
  availability: { status: string; count: number }[];
}

// API request/response types
export interface CreateProductRequest {
  companyId: string;
  categoryId: string;
  name: string;
  description?: string;
  specifications?: Record<string, string>;
  images?: string[];
  materials?: string[];
  priceRange?: string;
  isFeatured?: boolean;
  sku?: string;
  availability?: ProductAvailability;
  dimensions?: ProductDimensions;
  weight?: number;
  colors?: ProductColor[];
  tags?: string[];
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: string;
}

export interface CreateProductCategoryRequest {
  companyId: string;
  name: string;
  description?: string;
  parentId?: string;
  orderIndex?: number;
  imageUrl?: string;
}

export interface UpdateProductCategoryRequest extends Partial<CreateProductCategoryRequest> {
  id: string;
}

export interface ProductResponse {
  product: Product;
}

export interface ProductListResponse {
  products: Product[];
}

export interface ProductCategoryResponse {
  category: ProductCategory;
}

export interface ProductCategoryListResponse {
  categories: ProductCategory[];
}

export interface ProductSearchRequest extends PaginationParams, SortParams {
  query?: string;
  categoryId?: string;
  materials?: string[];
  priceMin?: number;
  priceMax?: number;
  colors?: string[];
  availability?: string[];
  isFeatured?: boolean;
}

export interface ProductFilters extends FilterParams {
  companyId?: string;
  categoryId?: string;
  materials?: string[];
  priceRange?: string;
  isFeatured?: boolean;
  availability?: string;
}