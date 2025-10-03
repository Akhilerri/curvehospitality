#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting Curve Hospitality Business Website Preview...');
console.log('📍 Mode: Preview (using mock data)');
console.log('🌐 URL: http://localhost:3000');

// Create a simple preview server that serves the built files
const serverCode = `
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Serve static files from dist/public
app.use(express.static(join(__dirname, 'dist', 'public')));

// Mock API endpoints
app.get('/api/team', (req, res) => {
  res.json({ success: true, data: [] });
});

app.get('/api/services', (req, res) => {
  res.json({ success: true, data: [] });
});

app.get('/api/products', (req, res) => {
  res.json({ success: true, data: [] });
});

app.get('/api/projects', (req, res) => {
  res.json({ success: true, data: [] });
});

app.get('/api/blog', (req, res) => {
  res.json({ success: true, data: [] });
});

app.post('/api/contact', (req, res) => {
  res.json({ success: true, message: 'Message sent successfully!' });
});

// Serve index.html for all other routes (SPA)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log('✅ Preview server running at http://localhost:3000');
  console.log('📱 Open this URL in your browser to view the website');
  console.log('🔄 Using mock data for API endpoints');
});
`;

// Write the preview server
writeFileSync(join(__dirname, 'preview-server.js'), serverCode);

// Build the project first
console.log('🔨 Building project...');
const buildProcess = spawn('npm', ['run', 'build'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

buildProcess.on('close', (code) => {
  if (code === 0) {
    console.log('✅ Build completed successfully');
    console.log('🚀 Starting preview server...');
    
    // Start the preview server
    const server = spawn('node', ['preview-server.js'], {
      cwd: __dirname,
      stdio: 'inherit',
      shell: true
    });

    server.on('error', (error) => {
      console.error('❌ Failed to start preview server:', error);
      process.exit(1);
    });

    server.on('close', (code) => {
      console.log('\\n📴 Preview server stopped with code ' + code);
      process.exit(code);
    });

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\\n🛑 Shutting down preview server...');
      server.kill('SIGINT');
    });

    process.on('SIGTERM', () => {
      console.log('\\n🛑 Shutting down preview server...');
      server.kill('SIGTERM');
    });
  } else {
    console.error('❌ Build failed');
    process.exit(1);
  }
});