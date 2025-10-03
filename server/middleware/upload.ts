import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import { Request } from 'express';

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
const imagesDir = path.join(uploadsDir, 'images');
const documentsDir = path.join(uploadsDir, 'documents');

// Create directories if they don't exist
async function ensureDirectories() {
  try {
    await fs.mkdir(uploadsDir, { recursive: true });
    await fs.mkdir(imagesDir, { recursive: true });
    await fs.mkdir(documentsDir, { recursive: true });
  } catch (error) {
    console.error('Error creating upload directories:', error);
  }
}

ensureDirectories();

// File filter function
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Allow images and documents
  const allowedMimes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/webp',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images and documents are allowed.'));
  }
};

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine destination based on file type
    const isImage = file.mimetype.startsWith('image/');
    const destination = isImage ? imagesDir : documentsDir;
    cb(null, destination);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  }
});

// Multer configuration
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 10 // Maximum 10 files per request
  }
});

// Image optimization function
export async function optimizeImage(filePath: string): Promise<{
  original: string;
  thumbnail: string;
  medium: string;
  optimized: string;
}> {
  const dir = path.dirname(filePath);
  const ext = path.extname(filePath);
  const name = path.basename(filePath, ext);
  
  const thumbnail = path.join(dir, `${name}-thumb.webp`);
  const medium = path.join(dir, `${name}-medium.webp`);
  const optimized = path.join(dir, `${name}-optimized.webp`);

  try {
    // Create thumbnail (150x150)
    await sharp(filePath)
      .resize(150, 150, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(thumbnail);

    // Create medium size (800x600)
    await sharp(filePath)
      .resize(800, 600, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(medium);

    // Create optimized version (1200x900)
    await sharp(filePath)
      .resize(1200, 900, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 90 })
      .toFile(optimized);

    return {
      original: filePath,
      thumbnail,
      medium,
      optimized
    };
  } catch (error) {
    console.error('Error optimizing image:', error);
    throw error;
  }
}

// Get file info
export function getFileInfo(file: Express.Multer.File) {
  const isImage = file.mimetype.startsWith('image/');
  const relativePath = path.relative(process.cwd(), file.path);
  
  return {
    filename: file.filename,
    originalName: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    path: relativePath,
    url: `/uploads/${isImage ? 'images' : 'documents'}/${file.filename}`,
    isImage
  };
}

// Delete file function
export async function deleteFile(filePath: string): Promise<void> {
  try {
    const fullPath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
    await fs.unlink(fullPath);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}

// Delete optimized images
export async function deleteOptimizedImages(originalPath: string): Promise<void> {
  const dir = path.dirname(originalPath);
  const ext = path.extname(originalPath);
  const name = path.basename(originalPath, ext);
  
  const variants = [
    path.join(dir, `${name}-thumb.webp`),
    path.join(dir, `${name}-medium.webp`),
    path.join(dir, `${name}-optimized.webp`)
  ];

  for (const variant of variants) {
    try {
      await fs.unlink(variant);
    } catch (error) {
      // Ignore errors if file doesn't exist
    }
  }
}