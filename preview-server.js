
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
