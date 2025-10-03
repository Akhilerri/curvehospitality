import { useEffect } from 'react';
import { seoManager, SEOMetadata, StructuredData } from '@/lib/seo';
import { canonicalManager } from '@/lib/canonical';

export interface UseSEOOptions {
  metadata: SEOMetadata;
  structuredData?: StructuredData | StructuredData[];
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export function useSEO({ metadata, structuredData, breadcrumbs }: UseSEOOptions) {
  useEffect(() => {
    // Update meta tags
    seoManager.updateMetaTags(metadata);

    // Update canonical URL
    canonicalManager.updateCanonicalTag(metadata.url);

    // Prepare structured data array
    const allStructuredData: StructuredData[] = [];

    // Add business structured data
    try {
      allStructuredData.push(seoManager.generateBusinessStructuredData());
    } catch (error) {
      console.warn('Could not generate business structured data:', error);
    }

    // Add breadcrumbs if provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      allStructuredData.push(seoManager.generateBreadcrumbStructuredData(breadcrumbs));
    }

    // Add custom structured data if provided
    if (structuredData) {
      if (Array.isArray(structuredData)) {
        allStructuredData.push(...structuredData);
      } else {
        allStructuredData.push(structuredData);
      }
    }

    // Apply all structured data
    if (allStructuredData.length > 0) {
      seoManager.addStructuredData(allStructuredData);
    }

    // Cleanup function to reset title when component unmounts
    return () => {
      // Reset to default title if needed
      document.title = 'Curve Hospitality - Premier FF&E Procurement & Interior Design';
    };
  }, [metadata, structuredData, breadcrumbs]);
}

// Convenience hooks for specific page types
export function useHomeSEO(customMetadata?: Partial<SEOMetadata>) {
  const metadata: SEOMetadata = {
    title: 'Curve Hospitality - Premier FF&E Procurement & Interior Design',
    description: 'Distinguished hospitality procurement enterprise specializing in custom FF&E manufacturing, interior design, and quality hospitality furniture for hotels and restaurants.',
    keywords: ['hospitality furniture', 'FF&E procurement', 'interior design', 'hotel furniture', 'restaurant furniture', 'custom manufacturing'],
    type: 'website',
    ...customMetadata
  };

  useSEO({ metadata });
}

export function usePageSEO(
  title: string,
  description: string,
  options?: {
    keywords?: string[];
    type?: SEOMetadata['type'];
    image?: string;
    breadcrumbs?: Array<{ name: string; url: string }>;
    structuredData?: StructuredData | StructuredData[];
  }
) {
  const metadata: SEOMetadata = {
    title: `${title} - Curve Hospitality`,
    description,
    keywords: options?.keywords,
    type: options?.type || 'website',
    image: options?.image,
    url: window.location.href
  };

  useSEO({
    metadata,
    breadcrumbs: options?.breadcrumbs,
    structuredData: options?.structuredData
  });
}

export function useProductSEO(product: any) {
  const metadata: SEOMetadata = {
    title: `${product.name} - Products - Curve Hospitality`,
    description: product.description || `High-quality ${product.name} for hospitality spaces. Custom manufacturing and design solutions.`,
    keywords: [product.name, product.category?.name, 'hospitality furniture', 'custom furniture'].filter(Boolean),
    type: 'product',
    image: product.images?.[0] ? `${window.location.origin}${product.images[0]}` : undefined,
    url: window.location.href
  };

  const structuredData = seoManager.generateProductStructuredData(product);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' },
    { name: product.category?.name || 'Category', url: `/products?category=${product.category?.id}` },
    { name: product.name, url: window.location.pathname }
  ];

  useSEO({ metadata, structuredData, breadcrumbs });
}

export function useArticleSEO(article: any) {
  const metadata: SEOMetadata = {
    title: `${article.title} - Blog - Curve Hospitality`,
    description: article.excerpt || article.description,
    keywords: article.tags || [],
    type: 'article',
    image: article.featuredImage ? `${window.location.origin}${article.featuredImage}` : undefined,
    url: window.location.href,
    author: article.author,
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    section: article.category,
    tags: article.tags
  };

  const structuredData = seoManager.generateArticleStructuredData(article);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Resources', url: '/resources' },
    { name: 'Blog', url: '/blog' },
    { name: article.title, url: window.location.pathname }
  ];

  useSEO({ metadata, structuredData, breadcrumbs });
}

export function useProjectSEO(project: any) {
  const metadata: SEOMetadata = {
    title: `${project.title} - Portfolio - Curve Hospitality`,
    description: project.description || `${project.title} project showcasing our expertise in hospitality design and manufacturing.`,
    keywords: [project.title, project.brand, project.segment, project.location, 'hospitality project', 'case study'].filter(Boolean),
    type: 'article',
    image: project.images?.[0]?.url ? `${window.location.origin}${project.images[0].url}` : undefined,
    url: window.location.href
  };

  const structuredData = seoManager.generateProjectStructuredData(project);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Portfolio', url: '/portfolio' },
    { name: project.title, url: window.location.pathname }
  ];

  useSEO({ metadata, structuredData, breadcrumbs });
}