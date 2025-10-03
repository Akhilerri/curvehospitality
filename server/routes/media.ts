import { Router } from 'express';
import path from 'path';
import fs from 'fs/promises';
import { 
  upload, 
  optimizeImage, 
  getFileInfo, 
  deleteFile, 
  deleteOptimizedImages 
} from '../middleware/upload';
import { authenticateToken, requireAdmin, type AuthRequest } from '../middleware/auth';

const router = Router();

// POST /api/media/upload - Upload single file
router.post('/upload', authenticateToken, requireAdmin, upload.single('file'), async (req: AuthRequest, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileInfo = getFileInfo(req.file);
    let result: any = { ...fileInfo };

    // If it's an image, create optimized versions
    if (fileInfo.isImage) {
      try {
        const optimizedPaths = await optimizeImage(req.file.path);
        result = {
          ...result,
          variants: {
            original: path.relative(process.cwd(), optimizedPaths.original),
            thumbnail: path.relative(process.cwd(), optimizedPaths.thumbnail),
            medium: path.relative(process.cwd(), optimizedPaths.medium),
            optimized: path.relative(process.cwd(), optimizedPaths.optimized)
          },
          urls: {
            original: `/uploads/images/${req.file.filename}`,
            thumbnail: `/uploads/images/${path.basename(optimizedPaths.thumbnail)}`,
            medium: `/uploads/images/${path.basename(optimizedPaths.medium)}`,
            optimized: `/uploads/images/${path.basename(optimizedPaths.optimized)}`
          }
        };
      } catch (error) {
        console.error('Error creating image variants:', error);
        // Continue with original file if optimization fails
      }
    }

    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// POST /api/media/upload-multiple - Upload multiple files
router.post('/upload-multiple', authenticateToken, requireAdmin, upload.array('files', 10), async (req: AuthRequest, res) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const results = [];

    for (const file of req.files) {
      const fileInfo = getFileInfo(file);
      let result: any = { ...fileInfo };

      // If it's an image, create optimized versions
      if (fileInfo.isImage) {
        try {
          const optimizedPaths = await optimizeImage(file.path);
          result = {
            ...result,
            variants: {
              original: path.relative(process.cwd(), optimizedPaths.original),
              thumbnail: path.relative(process.cwd(), optimizedPaths.thumbnail),
              medium: path.relative(process.cwd(), optimizedPaths.medium),
              optimized: path.relative(process.cwd(), optimizedPaths.optimized)
            },
            urls: {
              original: `/uploads/images/${file.filename}`,
              thumbnail: `/uploads/images/${path.basename(optimizedPaths.thumbnail)}`,
              medium: `/uploads/images/${path.basename(optimizedPaths.medium)}`,
              optimized: `/uploads/images/${path.basename(optimizedPaths.optimized)}`
            }
          };
        } catch (error) {
          console.error('Error creating image variants:', error);
          // Continue with original file if optimization fails
        }
      }

      results.push(result);
    }

    res.status(201).json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ error: 'Failed to upload files' });
  }
});

// GET /api/media/list - List uploaded files
router.get('/list', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { type = 'all', limit = '50', offset = '0' } = req.query;
    
    const uploadsDir = path.join(process.cwd(), 'uploads');
    const imagesDir = path.join(uploadsDir, 'images');
    const documentsDir = path.join(uploadsDir, 'documents');

    let files: any[] = [];

    // Get image files
    if (type === 'all' || type === 'images') {
      try {
        const imageFiles = await fs.readdir(imagesDir);
        for (const filename of imageFiles) {
          // Skip optimized variants
          if (filename.includes('-thumb.') || filename.includes('-medium.') || filename.includes('-optimized.')) {
            continue;
          }

          const filePath = path.join(imagesDir, filename);
          const stats = await fs.stat(filePath);
          
          files.push({
            filename,
            type: 'image',
            size: stats.size,
            url: `/uploads/images/${filename}`,
            path: path.relative(process.cwd(), filePath),
            createdAt: stats.birthtime,
            modifiedAt: stats.mtime
          });
        }
      } catch (error) {
        // Directory might not exist
      }
    }

    // Get document files
    if (type === 'all' || type === 'documents') {
      try {
        const documentFiles = await fs.readdir(documentsDir);
        for (const filename of documentFiles) {
          const filePath = path.join(documentsDir, filename);
          const stats = await fs.stat(filePath);
          
          files.push({
            filename,
            type: 'document',
            size: stats.size,
            url: `/uploads/documents/${filename}`,
            path: path.relative(process.cwd(), filePath),
            createdAt: stats.birthtime,
            modifiedAt: stats.mtime
          });
        }
      } catch (error) {
        // Directory might not exist
      }
    }

    // Sort by creation date (newest first)
    files.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Apply pagination
    const startIndex = parseInt(offset as string);
    const endIndex = startIndex + parseInt(limit as string);
    const paginatedFiles = files.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: paginatedFiles,
      pagination: {
        total: files.length,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
        hasMore: endIndex < files.length
      }
    });
  } catch (error) {
    console.error('Error listing files:', error);
    res.status(500).json({ error: 'Failed to list files' });
  }
});

// DELETE /api/media/:filename - Delete file
router.delete('/:filename', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { filename } = req.params;
    const { type } = req.query; // 'images' or 'documents'

    if (!type || (type !== 'images' && type !== 'documents')) {
      return res.status(400).json({ error: 'File type (images or documents) must be specified' });
    }

    const uploadsDir = path.join(process.cwd(), 'uploads');
    const filePath = path.join(uploadsDir, type as string, filename);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch (error) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Delete the main file
    await deleteFile(filePath);

    // If it's an image, also delete optimized versions
    if (type === 'images') {
      await deleteOptimizedImages(filePath);
    }

    res.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

// GET /api/media/info/:filename - Get file information
router.get('/info/:filename', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { filename } = req.params;
    const { type } = req.query;

    if (!type || (type !== 'images' && type !== 'documents')) {
      return res.status(400).json({ error: 'File type (images or documents) must be specified' });
    }

    const uploadsDir = path.join(process.cwd(), 'uploads');
    const filePath = path.join(uploadsDir, type as string, filename);

    try {
      const stats = await fs.stat(filePath);
      
      const fileInfo = {
        filename,
        type,
        size: stats.size,
        url: `/uploads/${type}/${filename}`,
        path: path.relative(process.cwd(), filePath),
        createdAt: stats.birthtime,
        modifiedAt: stats.mtime
      };

      // If it's an image, check for optimized versions
      if (type === 'images') {
        const dir = path.dirname(filePath);
        const ext = path.extname(filename);
        const name = path.basename(filename, ext);
        
        const variants = {
          original: `/uploads/images/${filename}`,
          thumbnail: `/uploads/images/${name}-thumb.webp`,
          medium: `/uploads/images/${name}-medium.webp`,
          optimized: `/uploads/images/${name}-optimized.webp`
        };

        // Check which variants exist
        const existingVariants: any = { original: variants.original };
        
        for (const [variantName, variantUrl] of Object.entries(variants)) {
          if (variantName === 'original') continue;
          
          const variantPath = path.join(dir, path.basename(variantUrl));
          try {
            await fs.access(variantPath);
            existingVariants[variantName] = variantUrl;
          } catch (error) {
            // Variant doesn't exist
          }
        }

        (fileInfo as any).variants = existingVariants;
      }

      res.json({
        success: true,
        data: fileInfo
      });
    } catch (error) {
      return res.status(404).json({ error: 'File not found' });
    }
  } catch (error) {
    console.error('Error getting file info:', error);
    res.status(500).json({ error: 'Failed to get file information' });
  }
});

export default router;