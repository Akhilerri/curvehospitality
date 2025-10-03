import { z } from 'zod';
import { 
  uuidSchema, 
  shortTextSchema, 
  longTextSchema, 
  imageMetadataSchema,
  priceSchema,
  priceRangeSchema,
  hexColorSchema,
  optionalStringArraySchema,
  paginationSchema,
  sortSchema 
} from './common';

export const productDimensionsSchema = z.object({
  length: z.number().positive().optional(),
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
  unit: z.enum(['inches', 'cm', 'feet', 'meters']),
});

export const productColorSchema = z.object({
  name: shortTextSchema,
  hex: hexColorSchema.optional(),
  image: imageMetadataSchema.optional(),
});

export const productAvailabilitySchema = z.object({
  status: z.enum(['in_stock', 'out_of_stock', 'pre_order', 'discontinued']),
  quantity: z.number().int().min(0).optional(),
  leadTime: z.string().optional(),
  restockDate: z.string().datetime().optional(),
});

export const bulkPricingSchema = z.object({
  minQuantity: z.number().int().positive(),
  price: priceSchema,
  discount: z.number().min(0).max(100).optional(),
});

export const pricingInfoSchema = z.object({
  basePrice: priceSchema.optional(),
  salePrice: priceSchema.optional(),
  currency: z.string().length(3).default('USD'),
  priceRange: priceRangeSchema.optional(),
  priceType: z.enum(['fixed', 'range', 'quote']),
  bulkPricing: z.array(bulkPricingSchema).optional(),
});

export const createProductSchema = z.object({
  companyId: uuidSchema,
  categoryId: uuidSchema,
  name: shortTextSchema,
  description: longTextSchema.optional(),
  specifications: z.record(z.string()).optional(),
  images: z.array(z.string().url()).optional(),
  materials: optionalStringArraySchema,
  priceRange: z.string().optional(),
  isFeatured: z.boolean().default(false),
  sku: z.string().optional(),
  availability: productAvailabilitySchema.optional(),
  dimensions: productDimensionsSchema.optional(),
  weight: z.number().positive().optional(),
  colors: z.array(productColorSchema).optional(),
  tags: optionalStringArraySchema,
});

export const updateProductSchema = createProductSchema.partial().extend({
  id: uuidSchema,
});

export const createProductCategorySchema = z.object({
  companyId: uuidSchema,
  name: shortTextSchema,
  description: longTextSchema.optional(),
  parentId: uuidSchema.optional(),
  orderIndex: z.number().int().min(0).default(0),
  imageUrl: z.string().url().optional(),
});

export const updateProductCategorySchema = createProductCategorySchema.partial().extend({
  id: uuidSchema,
});

export const productSearchSchema = paginationSchema.merge(sortSchema).extend({
  query: z.string().optional(),
  categoryId: uuidSchema.optional(),
  materials: z.array(z.string()).optional(),
  priceMin: z.number().positive().optional(),
  priceMax: z.number().positive().optional(),
  colors: z.array(z.string()).optional(),
  availability: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
});

export const productFiltersSchema = z.object({
  companyId: uuidSchema.optional(),
  categoryId: uuidSchema.optional(),
  materials: z.array(z.string()).optional(),
  priceRange: z.string().optional(),
  isFeatured: z.boolean().optional(),
  availability: z.string().optional(),
});

export const productResponseSchema = z.object({
  product: z.object({
    id: uuidSchema,
    companyId: uuidSchema,
    categoryId: uuidSchema,
    name: z.string(),
    description: z.string().optional(),
    specifications: z.record(z.string()).optional(),
    images: z.array(imageMetadataSchema).optional(),
    materials: z.array(z.string()).optional(),
    priceRange: z.string().optional(),
    isFeatured: z.boolean().optional(),
    sku: z.string().optional(),
    availability: productAvailabilitySchema.optional(),
    dimensions: productDimensionsSchema.optional(),
    weight: z.number().optional(),
    colors: z.array(productColorSchema).optional(),
    tags: z.array(z.string()).optional(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
  }),
});

export const productListResponseSchema = z.object({
  products: z.array(productResponseSchema.shape.product),
});

export const productCategoryResponseSchema = z.object({
  category: z.object({
    id: uuidSchema,
    companyId: uuidSchema,
    name: z.string(),
    description: z.string().optional(),
    parentId: uuidSchema.optional(),
    orderIndex: z.number().optional(),
    image: imageMetadataSchema.optional(),
    isActive: z.boolean().optional(),
    children: z.array(z.any()).optional(), // Recursive reference
    productCount: z.number().optional(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
  }),
});

export const productCategoryListResponseSchema = z.object({
  categories: z.array(productCategoryResponseSchema.shape.category),
});