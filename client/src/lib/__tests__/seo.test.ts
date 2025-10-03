import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SEOManager, seoManager } from '../seo';
import { SitemapGenerator } from '../sitemap';
import { CanonicalManager } from '../canonical';
import { generateSlug, truncateDescription, extractKeywords } from '../seo-utils';

// Mock DOM methods
const mockDocument = {
  title: '',
  head: {
    appendChild: vi.fn(),
    insertBefore: vi.fn(),
    querySelector: vi.fn(),
    querySelectorAll: vi.fn()
  },
  createElement: vi.fn(() => ({
    setAttribute: vi.fn(),
    remove: vi.fn(),
    content: '',
    href: '',
    rel: '',
    name: '',
    textContent: ''
  })),
  querySelector: vi.fn(),
  querySelectorAll: vi.fn(() => [])
};

// Mock window object
const mockWindow = {
  location: {
    href: 'https://curvehospitality.com/test',
    pathname: '/test'
  }
};

// Setup global mocks
beforeEach(() => {
  vi.stubGlobal('document', mockDocument);
  vi.stubGlobal('window', mockWindow);
  
  // Reset mocks
  vi.clearAllMocks();
  mockDocument.title = '';
});

describe('SEOManager', () => {
  it('should create singleton instance', () => {
    const instance1 = SEOManager.getInstance();
    const instance2 = SEOManager.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should update document title', () => {
    const metadata = {
      title: 'Test Page - Curve Hospitality',
      description: 'Test description'
    };

    seoManager.updateMetaTags(metadata);
    expect(mockDocument.title).toBe('Test Page - Curve Hospitality');
  });

  it('should generate business structured data', () => {
    const companyData = {
      id: 'test-company',
      name: 'Test Company',
      description: 'Test description',
      foundedYear: 2020
    };

    seoManager.setCompanyData(companyData);
    const structuredData = seoManager.generateBusinessStructuredData();

    expect(structuredData['@context']).toBe('https://schema.org');
    expect(structuredData['@type']).toBe('Organization');
    expect(structuredData.name).toBe('Test Company');
    expect(structuredData.description).toBe('Test description');
  });

  it('should generate product structured data', () => {
    const product = {
      id: 'test-product',
      name: 'Test Chair',
      description: 'A comfortable test chair',
      images: ['/images/chair.jpg'],
      category: { name: 'Seating' },
      materials: ['Wood', 'Fabric'],
      priceRange: '$500-$800'
    };

    const structuredData = seoManager.generateProductStructuredData(product);

    expect(structuredData['@type']).toBe('Product');
    expect(structuredData.name).toBe('Test Chair');
    expect(structuredData.description).toBe('A comfortable test chair');
    expect(structuredData.category).toBe('Seating');
  });

  it('should generate article structured data', () => {
    const article = {
      title: 'Test Article',
      excerpt: 'Test excerpt',
      author: 'John Doe',
      publishedAt: '2024-01-01T00:00:00Z',
      featuredImage: '/images/article.jpg',
      slug: 'test-article'
    };

    const structuredData = seoManager.generateArticleStructuredData(article);

    expect(structuredData['@type']).toBe('Article');
    expect(structuredData.headline).toBe('Test Article');
    expect(structuredData.author.name).toBe('John Doe');
  });
});

describe('SitemapGenerator', () => {
  it('should generate static URLs', () => {
    const generator = new SitemapGenerator({
      baseUrl: 'https://example.com'
    });

    const urls = generator.generateStaticUrls();
    
    expect(urls).toHaveLength(9);
    expect(urls[0].loc).toBe('https://example.com/');
    expect(urls[0].priority).toBe(1.0);
    expect(urls.find(url => url.loc === 'https://example.com/about')).toBeDefined();
  });

  it('should generate product URLs', () => {
    const generator = new SitemapGenerator({
      baseUrl: 'https://example.com'
    });

    const products = [
      { id: 'product-1', updatedAt: '2024-01-01' },
      { id: 'product-2', updatedAt: '2024-01-02' }
    ];

    const urls = generator.generateProductUrls(products);
    
    expect(urls).toHaveLength(2);
    expect(urls[0].loc).toBe('https://example.com/products/product-1');
    expect(urls[0].lastmod).toBe('2024-01-01');
  });

  it('should generate complete sitemap XML', async () => {
    const generator = new SitemapGenerator({
      baseUrl: 'https://example.com'
    });

    const xml = await generator.generateCompleteSitemap();
    
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml).toContain('<loc>https://example.com/</loc>');
    expect(xml).toContain('</urlset>');
  });
});

describe('CanonicalManager', () => {
  it('should generate canonical URL', () => {
    const manager = new CanonicalManager('https://example.com');
    const url = manager.generateCanonicalUrl('/test-page');
    
    expect(url).toBe('https://example.com/test-page');
  });

  it('should clean path correctly', () => {
    const manager = new CanonicalManager('https://example.com');
    const url = manager.generateCanonicalUrl('/test-page?param=value#section');
    
    expect(url).toBe('https://example.com/test-page');
  });

  it('should generate product canonical URL', () => {
    const manager = new CanonicalManager('https://example.com');
    const url = manager.generateProductCanonicalUrl('product-123');
    
    expect(url).toBe('https://example.com/products/product-123');
  });
});

describe('SEO Utils', () => {
  it('should generate slug from title', () => {
    expect(generateSlug('Hello World!')).toBe('hello-world');
    expect(generateSlug('Test & Special Characters')).toBe('test-special-characters');
    expect(generateSlug('  Multiple   Spaces  ')).toBe('multiple-spaces');
  });

  it('should truncate description', () => {
    const longText = 'This is a very long description that exceeds the maximum length limit and should be truncated properly at word boundaries.';
    const truncated = truncateDescription(longText, 50);
    
    expect(truncated.length).toBeLessThanOrEqual(53); // 50 + '...'
    expect(truncated.endsWith('...')).toBe(true);
    expect(truncated.length).toBeLessThan(longText.length);
  });

  it('should extract keywords from text', () => {
    const text = 'This is a sample text about furniture design and interior decoration for hospitality spaces';
    const keywords = extractKeywords(text, 5);
    
    expect(keywords).toHaveLength(5);
    expect(keywords).toContain('furniture');
    expect(keywords).toContain('design');
    // Check that some expected words are in the results
    const hasExpectedWords = keywords.some(word => ['sample', 'text', 'about', 'hospitality', 'spaces'].includes(word));
    expect(hasExpectedWords).toBe(true);
    expect(keywords).not.toContain('the'); // Stop word should be filtered
  });
});