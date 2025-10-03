import { Router } from 'express';
import { eq, like, and, inArray } from 'drizzle-orm';
import { getDb } from '../db';
import { products, productCategories, insertProductSchema } from '@shared/schema';
import { authenticateToken, requireAdmin, type AuthRequest } from '../middleware/auth';

const router = Router();
const db = getDb();

// GET /api/products - Get all products with filtering
router.get('/', async (req, res) => {
  try {
    const { 
      companyId, 
      categoryId, 
      search, 
      materials, 
      priceRange, 
      isFeatured,
      limit = '50',
      offset = '0'
    } = req.query;
    
    let query = db
      .select({
        id: products.id,
        companyId: products.companyId,
        categoryId: products.categoryId,
        name: products.name,
        description: products.description,
        specifications: products.specifications,
        images: products.images,
        materials: products.materials,
        priceRange: products.priceRange,
        isFeatured: products.isFeatured,
        category: {
          id: productCategories.id,
          name: productCategories.name,
          description: productCategories.description
        }
      })
      .from(products)
      .leftJoin(productCategories, eq(products.categoryId, productCategories.id));
    
    const conditions = [];
    
    if (companyId) {
      conditions.push(eq(products.companyId, companyId as string));
    }
    
    if (categoryId) {
      conditions.push(eq(products.categoryId, categoryId as string));
    }
    
    if (search) {
      conditions.push(like(products.name, `%${search}%`));
    }
    
    if (materials) {
      const materialArray = Array.isArray(materials) ? materials : [materials];
      // Check if any of the product materials match the filter
      conditions.push(
        // This is a simplified check - in production you might want more sophisticated array matching
        inArray(products.materials, materialArray as string[])
      );
    }
    
    if (priceRange) {
      conditions.push(eq(products.priceRange, priceRange as string));
    }
    
    if (isFeatured !== undefined) {
      conditions.push(eq(products.isFeatured, isFeatured === 'true'));
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    const result = await query
      .limit(parseInt(limit as string))
      .offset(parseInt(offset as string))
      .orderBy(products.name);
    
    res.json({
      success: true,
      data: result,
      pagination: {
        limit: parseInt(limit as string),
        offset: parseInt(offset as string)
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:id - Get single product
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await db
      .select({
        id: products.id,
        companyId: products.companyId,
        categoryId: products.categoryId,
        name: products.name,
        description: products.description,
        specifications: products.specifications,
        images: products.images,
        materials: products.materials,
        priceRange: products.priceRange,
        isFeatured: products.isFeatured,
        category: {
          id: productCategories.id,
          name: productCategories.name,
          description: productCategories.description
        }
      })
      .from(products)
      .leftJoin(productCategories, eq(products.categoryId, productCategories.id))
      .where(eq(products.id, id))
      .limit(1);
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({
      success: true,
      data: result[0]
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST /api/products - Create new product (Admin only)
router.post('/', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const validatedData = insertProductSchema.parse(req.body);
    
    const result = await db
      .insert(products)
      .values(validatedData)
      .returning();
    
    res.status(201).json({
      success: true,
      data: result[0]
    });
  } catch (error) {
    console.error('Error creating product:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return res.status(400).json({ error: 'Invalid data format', details: error.message });
    }
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// PUT /api/products/:id - Update product (Admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const validatedData = insertProductSchema.partial().parse(req.body);
    
    const result = await db
      .update(products)
      .set(validatedData)
      .where(eq(products.id, id))
      .returning();
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({
      success: true,
      data: result[0]
    });
  } catch (error) {
    console.error('Error updating product:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return res.status(400).json({ error: 'Invalid data format', details: error.message });
    }
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE /api/products/:id - Delete product (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    
    const result = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning();
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

export default router;