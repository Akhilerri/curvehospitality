import { Router } from 'express';
import { eq } from 'drizzle-orm';
import { getDb } from '../db';
import { services, insertServiceSchema } from '@shared/schema';
import { authenticateToken, requireAdmin, type AuthRequest } from '../middleware/auth';

const router = Router();
const db = getDb();

// GET /api/services - Get all services
router.get('/', async (req, res) => {
  try {
    const { companyId } = req.query;
    
    let result;
    
    if (companyId) {
      result = await db
        .select()
        .from(services)
        .where(eq(services.companyId, companyId as string))
        .orderBy(services.orderIndex, services.title);
    } else {
      result = await db
        .select()
        .from(services)
        .orderBy(services.orderIndex, services.title);
    }
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// GET /api/services/:id - Get single service
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await db
      .select()
      .from(services)
      .where(eq(services.id, id))
      .limit(1);
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    res.json({
      success: true,
      data: result[0]
    });
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

// POST /api/services - Create new service (Admin only)
router.post('/', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const validatedData = insertServiceSchema.parse(req.body);
    
    const result = await db
      .insert(services)
      .values(validatedData)
      .returning();
    
    res.status(201).json({
      success: true,
      data: result[0]
    });
  } catch (error) {
    console.error('Error creating service:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return res.status(400).json({ error: 'Invalid data format', details: error.message });
    }
    res.status(500).json({ error: 'Failed to create service' });
  }
});

// PUT /api/services/:id - Update service (Admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const validatedData = insertServiceSchema.partial().parse(req.body);
    
    const result = await db
      .update(services)
      .set(validatedData)
      .where(eq(services.id, id))
      .returning();
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    res.json({
      success: true,
      data: result[0]
    });
  } catch (error) {
    console.error('Error updating service:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return res.status(400).json({ error: 'Invalid data format', details: error.message });
    }
    res.status(500).json({ error: 'Failed to update service' });
  }
});

// DELETE /api/services/:id - Delete service (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    
    const result = await db
      .delete(services)
      .where(eq(services.id, id))
      .returning();
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

export default router;