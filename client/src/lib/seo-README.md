# SEO Implementation

This directory contains a comprehensive SEO implementation for the Curve Hospitality website.

## Features

### 1. Meta Tags and Open Graph Support
- Dynamic meta title and description management
- Open Graph tags for social media sharing
- Twitter Card support
- Article-specific meta tags for blog posts

### 2. Structured Data (JSON-LD)
- Business/Organization structured data
- Product structured data
- Article structured data
- Project/Creative Work structured data
- Breadcrumb structured data

### 3. Sitemap Generation
- Dynamic XML sitemap generation
- Static page URLs
- Dynamic content URLs (products, services, blog posts, projects)
- Proper priority and change frequency settings

### 4. Canonical URLs
- Automatic canonical URL management
- Clean URL generation
- Duplicate content prevention

### 5. SEO Utilities
- URL slug generation
- Meta description truncation
- Keyword extraction
- SEO-friendly URL validation

## Usage

### Basic Page SEO
```tsx
import { usePageSEO } from '@/hooks/useSEO';

function MyPage() {
  usePageSEO(
    'Page Title',
    'Page description for search engines',
    {
      keywords: ['keyword1', 'keyword2'],
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'My Page', url: '/my-page' }
      ]
    }
  );

  return <div>Page content</div>;
}
```

### Product SEO
```tsx
import { useProductSEO } from '@/hooks/useSEO';

function ProductPage({ product }) {
  useProductSEO(product);
  return <div>Product content</div>;
}
```

### Article SEO
```tsx
import { useArticleSEO } from '@/hooks/useSEO';

function BlogPost({ article }) {
  useArticleSEO(article);
  return <div>Article content</div>;
}
```

### Declarative SEO Component
```tsx
import SEO from '@/components/SEO';

function MyPage() {
  return (
    <>
      <SEO 
        metadata={{
          title: "My Page - Curve Hospitality",
          description: "Page description",
          keywords: ["keyword1", "keyword2"]
        }}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "My Page", url: "/my-page" }
        ]}
      />
      <div>Page content</div>
    </>
  );
}
```

## Files

- `seo.ts` - Core SEO manager and metadata handling
- `sitemap.ts` - XML sitemap and robots.txt generation
- `canonical.ts` - Canonical URL management
- `seo-utils.ts` - SEO utility functions
- `../hooks/useSEO.ts` - React hooks for SEO management
- `../components/SEO.tsx` - Declarative SEO component
- `../../server/routes/seo.ts` - Server routes for sitemap.xml and robots.txt

## Server Endpoints

- `GET /sitemap.xml` - Dynamic XML sitemap
- `GET /robots.txt` - Robots.txt file

## Testing

Run the SEO tests with:
```bash
npm run test:run -- seo.test.ts
```

## Configuration

The SEO system is configured with:
- Base URL from `VITE_BASE_URL` environment variable
- Company data from `@/data/company.ts`
- Default meta tags in `seo.ts`

## Best Practices

1. Always set unique titles and descriptions for each page
2. Use structured data for rich snippets
3. Include breadcrumbs for better navigation
4. Set appropriate canonical URLs
5. Use semantic HTML structure
6. Optimize images with alt text
7. Monitor Core Web Vitals performance

## Performance Considerations

- Meta tags are updated efficiently using DOM manipulation
- Structured data is validated before insertion
- Canonical URLs prevent duplicate content issues
- Sitemap is cached on the server side
- SEO utilities are optimized for performance