#!/usr/bin/env node

/**
 * Bundle Analysis Script
 * 
 * This script analyzes the Vite build output to provide insights into:
 * - Bundle sizes
 * - Chunk analysis
 * - Dependency sizes
 * - Performance recommendations
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '../dist');
const ASSETS_DIR = path.join(DIST_DIR, 'assets');

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function analyzeBundle() {
  console.log('🔍 Analyzing bundle...\n');

  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ Dist directory not found. Please run "npm run build" first.');
    process.exit(1);
  }

  const stats = {
    totalSize: 0,
    files: [],
    chunks: {
      js: [],
      css: [],
      assets: []
    }
  };

  // Analyze all files in dist directory
  function analyzeDirectory(dir, relativePath = '') {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const relativeFilePath = path.join(relativePath, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        analyzeDirectory(filePath, relativeFilePath);
      } else {
        const size = stat.size;
        stats.totalSize += size;
        
        const fileInfo = {
          name: relativeFilePath,
          size,
          formattedSize: formatBytes(size)
        };
        
        stats.files.push(fileInfo);
        
        // Categorize files
        if (file.endsWith('.js')) {
          stats.chunks.js.push(fileInfo);
        } else if (file.endsWith('.css')) {
          stats.chunks.css.push(fileInfo);
        } else {
          stats.chunks.assets.push(fileInfo);
        }
      }
    });
  }

  analyzeDirectory(DIST_DIR);

  // Sort files by size (largest first)
  stats.files.sort((a, b) => b.size - a.size);
  stats.chunks.js.sort((a, b) => b.size - a.size);
  stats.chunks.css.sort((a, b) => b.size - a.size);
  stats.chunks.assets.sort((a, b) => b.size - a.size);

  // Display results
  console.log(`📦 Total Bundle Size: ${formatBytes(stats.totalSize)}\n`);

  // JavaScript chunks
  if (stats.chunks.js.length > 0) {
    console.log('📄 JavaScript Files:');
    stats.chunks.js.forEach(file => {
      const sizeWarning = file.size > 500 * 1024 ? ' ⚠️  Large file' : '';
      console.log(`  ${file.name}: ${file.formattedSize}${sizeWarning}`);
    });
    console.log();
  }

  // CSS chunks
  if (stats.chunks.css.length > 0) {
    console.log('🎨 CSS Files:');
    stats.chunks.css.forEach(file => {
      console.log(`  ${file.name}: ${file.formattedSize}`);
    });
    console.log();
  }

  // Asset files
  if (stats.chunks.assets.length > 0) {
    console.log('🖼️  Asset Files:');
    stats.chunks.assets.slice(0, 10).forEach(file => {
      console.log(`  ${file.name}: ${file.formattedSize}`);
    });
    if (stats.chunks.assets.length > 10) {
      console.log(`  ... and ${stats.chunks.assets.length - 10} more files`);
    }
    console.log();
  }

  // Performance recommendations
  console.log('💡 Performance Recommendations:');
  
  const largeJSFiles = stats.chunks.js.filter(file => file.size > 500 * 1024);
  if (largeJSFiles.length > 0) {
    console.log('  ⚠️  Large JavaScript files detected:');
    largeJSFiles.forEach(file => {
      console.log(`     - ${file.name} (${file.formattedSize})`);
    });
    console.log('     Consider code splitting or lazy loading for these files.');
  }

  const totalJSSize = stats.chunks.js.reduce((sum, file) => sum + file.size, 0);
  if (totalJSSize > 1024 * 1024) {
    console.log(`  ⚠️  Total JavaScript size is ${formatBytes(totalJSSize)}. Consider:`);
    console.log('     - Implementing code splitting');
    console.log('     - Using dynamic imports for non-critical code');
    console.log('     - Tree shaking unused dependencies');
  }

  const totalCSSSize = stats.chunks.css.reduce((sum, file) => sum + file.size, 0);
  if (totalCSSSize > 200 * 1024) {
    console.log(`  ⚠️  Total CSS size is ${formatBytes(totalCSSSize)}. Consider:`);
    console.log('     - Purging unused CSS');
    console.log('     - Critical CSS extraction');
  }

  const largeAssets = stats.chunks.assets.filter(file => file.size > 1024 * 1024);
  if (largeAssets.length > 0) {
    console.log('  ⚠️  Large asset files detected:');
    largeAssets.forEach(file => {
      console.log(`     - ${file.name} (${file.formattedSize})`);
    });
    console.log('     Consider optimizing images and using modern formats (WebP, AVIF).');
  }

  if (stats.totalSize < 1024 * 1024) {
    console.log('  ✅ Bundle size looks good!');
  }

  console.log('\n📊 Summary:');
  console.log(`  Total files: ${stats.files.length}`);
  console.log(`  JavaScript: ${stats.chunks.js.length} files, ${formatBytes(totalJSSize)}`);
  console.log(`  CSS: ${stats.chunks.css.length} files, ${formatBytes(totalCSSSize)}`);
  console.log(`  Assets: ${stats.chunks.assets.length} files, ${formatBytes(stats.chunks.assets.reduce((sum, file) => sum + file.size, 0))}`);
  console.log(`  Total: ${formatBytes(stats.totalSize)}`);
}

// Check if running as main module
if (import.meta.url === `file://${process.argv[1]}`) {
  analyzeBundle();
}

export { analyzeBundle };