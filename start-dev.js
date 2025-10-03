#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file
try {
  const envFile = readFileSync(join(__dirname, '.env'), 'utf8');
  const envVars = {};
  envFile.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value && !key.startsWith('#')) {
      envVars[key.trim()] = value.trim().replace(/^["']|["']$/g, '');
    }
  });
  Object.assign(process.env, envVars);
} catch (error) {
  console.log('⚠️  No .env file found, using default values');
}

// Set environment variables
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.VITE_BASE_URL = process.env.VITE_BASE_URL || 'http://localhost:5173';
process.env.DATABASE_URL = process.env.DATABASE_URL || 'file:./dev.db';

console.log('🚀 Starting Curve Hospitality Business Website...');
console.log('📍 Environment: development');
console.log('🌐 Base URL: http://localhost:5173');

// Start the server
const server = spawn('npx', ['tsx', 'server/index.ts'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true,
  env: process.env
});

server.on('error', (error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});

server.on('close', (code) => {
  console.log(`\n📴 Server stopped with code ${code}`);
  process.exit(code);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  server.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down server...');
  server.kill('SIGTERM');
});