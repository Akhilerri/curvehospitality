import { Router } from 'express';
import { sitemapGenerator, robotsGenerator } from '../../client/src/lib/sitemap';

const router = Router();

// Sitemap.xml endpoint
router.get('/sitemap.xml', async (req, res) => {
  try {
    // In a real application, you would fetch this data from your database
    // For now, we'll use mock data or leave it empty to generate static URLs only
    const sitemapData = {
      // services: await getServices(),
      // products: await getProducts(),
      // categories: await getProductCategories(),
      // projects: await getProjects(),
      // blogPosts: await getBlogPosts(),
      // guides: await getGuides(),
    };

    const sitemap = await sitemapGenerator.generateCompleteSitemap(sitemapData);

    res.set({
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
    });

    res.send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
});

// Robots.txt endpoint
router.get('/robots.txt', (req, res) => {
  try {
    const robots = robotsGenerator.generate({
      disallowPaths: [
        '/api/',
        '/admin/',
        '/_next/',
        '/static/',
        '/temp/',
        '/uploads/temp/'
      ],
      allowPaths: [
        '/api/sitemap.xml'
      ],
      crawlDelay: 1,
      customRules: [
        '# Curve Hospitality - Robots.txt',
        '# Generated automatically'
      ]
    });

    res.set({
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
    });

    res.send(robots);
  } catch (error) {
    console.error('Error generating robots.txt:', error);
    res.status(500).send('Error generating robots.txt');
  }
});

export default router;