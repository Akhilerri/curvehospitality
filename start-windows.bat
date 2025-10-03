@echo off
echo 🚀 Starting Curve Hospitality Business Website...
echo 📍 Environment: development
echo 🌐 URL: http://localhost:3000

set NODE_ENV=development
set DATABASE_URL=file:./dev.db
set PORT=3000
set VITE_BASE_URL=http://localhost:3000

npx tsx server/index.ts