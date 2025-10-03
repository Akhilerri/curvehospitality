import { Router } from 'express';
import { eq, desc } from 'drizzle-orm';
import { getDb } from '../db';
import { teamMembers, insertTeamMemberSchema } from '@shared/schema';
import { authenticateToken, requireAdmin, type AuthRequest } from '../middleware/auth';

const router = Router();
const db = getDb();

// GET /api/team - Get all team members
router.get('/', async (req, res) => {
  try {
    const { companyId } = req.query;
    
    let query = db.select().from(teamMembers);
    
    if (companyId) {
      query = query.where(eq(teamMembers.companyId, companyId as string));
    }
    
    const result = await query.orderBy(teamMembers.orderIndex, teamMembers.name);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
});

// GET /api/team/:id - Get single team member
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.id, id))
      .limit(1);
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    res.json({
      success: true,
      data: result[0]
    });
  } catch (error) {
    console.error('Error fetching team member:', error);
    res.status(500).json({ error: 'Failed to fetch team member' });
  }
});

// POST /api/team - Create new team member (Admin only)
router.post('/', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const validatedData = insertTeamMemberSchema.parse(req.body);
    
    const result = await db
      .insert(teamMembers)
      .values(validatedData)
      .returning();
    
    res.status(201).json({
      success: true,
      data: result[0]
    });
  } catch (error) {
    console.error('Error creating team member:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return res.status(400).json({ error: 'Invalid data format', details: error.message });
    }
    res.status(500).json({ error: 'Failed to create team member' });
  }
});

// PUT /api/team/:id - Update team member (Admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const validatedData = insertTeamMemberSchema.partial().parse(req.body);
    
    const result = await db
      .update(teamMembers)
      .set(validatedData)
      .where(eq(teamMembers.id, id))
      .returning();
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    res.json({
      success: true,
      data: result[0]
    });
  } catch (error) {
    console.error('Error updating team member:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return res.status(400).json({ error: 'Invalid data format', details: error.message });
    }
    res.status(500).json({ error: 'Failed to update team member' });
  }
});

// DELETE /api/team/:id - Delete team member (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    
    const result = await db
      .delete(teamMembers)
      .where(eq(teamMembers.id, id))
      .returning();
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    res.json({
      success: true,
      message: 'Team member deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({ error: 'Failed to delete team member' });
  }
});

export default router;