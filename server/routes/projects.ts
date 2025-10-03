import { Router } from 'express';
import { eq, like, and } from 'drizzle-orm';
import { getDb } from '../db';
import { projects, insertProjectSchema } from '@shared/schema';
import { authenticateToken, requireAdmin, type AuthRequest } from '../middleware/auth';

const router = Router();
const db = getDb();

// GET /api/projects - Get all projects with filtering
router.get('/', async (req, res) => {
  try {
    const { 
      companyId, 
      brand, 
      segment, 
      location, 
      isFeatured,
      limit = '50',
      offset = '0'
    } = req.query;
    
    let query = db.select().from(projects);
    
    const conditions = [];
    
    if (companyId) {
      conditions.push(eq(projects.companyId, companyId as string));
    }
    
    if (brand) {
      conditions.push(like(projects.brand, `%${brand}%`));
    }
    
    if (segment) {
      conditions.push(eq(projects.segment, segment as string));
    }
    
    if (location) {
      conditions.push(like(projects.location, `%${location}%`));
    }
    
    if (isFeatured !== undefined) {
      conditions.push(eq(projects.isFeatured, isFeatured === 'true'));
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    const result = await query
      .limit(parseInt(limit as string))
      .offset(parseInt(offset as string))
      .orderBy(projects.completedAt, projects.title);
    
    res.json({
      success: true,
      data: result,
      pagination: {
        limit: parseInt(limit as string),
        offset: parseInt(offset as string)
      }
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET /api/projects/:id - Get single project
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id))
      .limit(1);
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json({
      success: true,
      data: result[0]
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// POST /api/projects - Create new project (Admin only)
router.post('/', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const validatedData = insertProjectSchema.parse(req.body);
    
    const result = await db
      .insert(projects)
      .values(validatedData)
      .returning();
    
    res.status(201).json({
      success: true,
      data: result[0]
    });
  } catch (error) {
    console.error('Error creating project:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return res.status(400).json({ error: 'Invalid data format', details: error.message });
    }
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// PUT /api/projects/:id - Update project (Admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const validatedData = insertProjectSchema.partial().parse(req.body);
    
    const result = await db
      .update(projects)
      .set(validatedData)
      .where(eq(projects.id, id))
      .returning();
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json({
      success: true,
      data: result[0]
    });
  } catch (error) {
    console.error('Error updating project:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return res.status(400).json({ error: 'Invalid data format', details: error.message });
    }
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// DELETE /api/projects/:id - Delete project (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    
    const result = await db
      .delete(projects)
      .where(eq(projects.id, id))
      .returning();
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

export default router;