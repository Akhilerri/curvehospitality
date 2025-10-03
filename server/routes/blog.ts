import { Router } from 'express';
import { eq, like, and, desc } from 'drizzle-orm';
import { getDb } from '../db';
import { blogPosts, insertBlogPostSchema } from '@shared/schema';
import { authenticateToken, requireAdmin, type AuthRequest } from '../middleware/auth';

const router = Router();
const db = getDb();

// GET /api/blog - Get all blog posts with filtering
router.get('/', async (req, res) => {
  try {
    const { 
      companyId, 
      category, 
      tag, 
      search, 
      isPublished = 'true',
      limit = '20',
      offset = '0'
    } = req.query;
    
    let query = db.select().from(blogPosts);
    
    const conditions = [];
    
    if (companyId) {
      conditions.push(eq(blogPosts.companyId, companyId as string));
    }
    
    if (category) {
      conditions.push(eq(blogPosts.category, category as string));
    }
    
    if (search) {
      conditions.push(
        like(blogPosts.title, `%${search}%`)
      );
    }
    
    // Only show published posts by default for public API
    if (isPublished !== 'all') {
      conditions.push(eq(blogPosts.isPublished, isPublished === 'true'));
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    const result = await query
      .limit(parseInt(limit as string))
      .offset(parseInt(offset as string))
      .orderBy(desc(blogPosts.publishedAt), desc(blogPosts.title));
    
    res.json({
      success: true,
      data: result,
      pagination: {
        limit: parseInt(limit as string),
        offset: parseInt(offset as string)
      }
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// GET /api/blog/slug/:slug - Get blog post by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const result = await db
      .select()
      .from(blogPosts)
      .where(and(
        eq(blogPosts.slug, slug),
        eq(blogPosts.isPublished, true)
      ))
      .limit(1);
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    res.json({
      success: true,
      data: result[0]
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

// GET /api/blog/:id - Get single blog post
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, id))
      .limit(1);
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    res.json({
      success: true,
      data: result[0]
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

// POST /api/blog - Create new blog post (Admin only)
router.post('/', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const validatedData = insertBlogPostSchema.parse(req.body);
    
    // Generate slug from title if not provided
    if (!validatedData.slug) {
      validatedData.slug = validatedData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    
    const result = await db
      .insert(blogPosts)
      .values(validatedData)
      .returning();
    
    res.status(201).json({
      success: true,
      data: result[0]
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return res.status(400).json({ error: 'Invalid data format', details: error.message });
    }
    if (error instanceof Error && error.message.includes('unique')) {
      return res.status(400).json({ error: 'Blog post with this slug already exists' });
    }
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});

// PUT /api/blog/:id - Update blog post (Admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const validatedData = insertBlogPostSchema.partial().parse(req.body);
    
    // Update slug if title changed
    if (validatedData.title && !validatedData.slug) {
      validatedData.slug = validatedData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    
    const result = await db
      .update(blogPosts)
      .set(validatedData)
      .where(eq(blogPosts.id, id))
      .returning();
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    res.json({
      success: true,
      data: result[0]
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return res.status(400).json({ error: 'Invalid data format', details: error.message });
    }
    if (error instanceof Error && error.message.includes('unique')) {
      return res.status(400).json({ error: 'Blog post with this slug already exists' });
    }
    res.status(500).json({ error: 'Failed to update blog post' });
  }
});

// DELETE /api/blog/:id - Delete blog post (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    
    const result = await db
      .delete(blogPosts)
      .where(eq(blogPosts.id, id))
      .returning();
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

// GET /api/blog/categories - Get all blog categories
router.get('/meta/categories', async (req, res) => {
  try {
    const { companyId } = req.query;
    
    let query = db
      .selectDistinct({ category: blogPosts.category })
      .from(blogPosts)
      .where(eq(blogPosts.isPublished, true));
    
    if (companyId) {
      query = query.where(eq(blogPosts.companyId, companyId as string));
    }
    
    const result = await query;
    
    res.json({
      success: true,
      data: result.map(r => r.category).filter(Boolean)
    });
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    res.status(500).json({ error: 'Failed to fetch blog categories' });
  }
});

export default router;