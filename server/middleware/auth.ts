import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Simple JWT secret - in production, use environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
    role: string;
  };
}

// Middleware to verify JWT token
export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Middleware to check if user has admin role
export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Generate JWT token
export const generateToken = (user: { id: string; username: string; role: string }) => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });
};

// Simple login endpoint for admin access
export const loginHandler = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Simple hardcoded admin check - in production, verify against database
  if (username === 'admin' && password === 'admin123') {
    const user = { id: '1', username: 'admin', role: 'admin' };
    const token = generateToken(user);
    
    res.json({
      success: true,
      token,
      user: { id: user.id, username: user.username, role: user.role }
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};