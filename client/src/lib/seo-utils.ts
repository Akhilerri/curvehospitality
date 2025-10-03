/**
 * SEO utility functions and helpers
 */

import { seoManager } from './seo';
import { canonicalManager } from './canonical';

/**
 * Generate SEO-friendly URL slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Truncate text for meta descriptions
 */
export function truncateDescription(text: string, maxLength: number = 160): string {
  if (text.length <= maxLength) return text;
  
  // Find the last space before the limit to avoid cutting words
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > maxLength * 0.8) {
    return truncated.substring(0, lastSpace) + '...';
  }
  
  return truncated + '...';
}

/**
 * Extract keywords from text content
 */
export function extractKeywords(text: string, maxKeywords: number = 10): string[] {
  // Common stop words to filter out
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
    'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'
  ]);

  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word));

  // Count word frequency
  const wordCount = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Sort by frequency and return top keywords
  return Object.entries(wordCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, maxKeywords)
    .map(([word]) => word);
}

/**
 * Validate and clean meta title
 */
export function cleanMetaTitle(title: string): string {
  // Remove HTML tags
  const cleaned = title.replace(/<[^>]*>/g, '');
  
  // Truncate if too long (Google typically shows 50-60 characters)
  if (cleaned.length > 60) {
    const truncated = cleaned.substring(0, 57);
    const lastSpace = truncated.lastIndexOf(' ');
    return (lastSpace > 40 ? truncated.substring(0, lastSpace) : truncated) + '...';
  }
  
  return cleaned;
}

/**
 * Generate Open Graph image URL
 */
export function generateOGImageUrl(options: {
  title: string;
  subtitle?: string;
  image?: string;
}): string {
  const baseUrl = (typeof window !== 'undefined' && import.meta.env?.VITE_BASE_URL) || process.env.VITE_BASE_URL || 'https://curvehospitality.com';
  
  if (options.image) {
    return options.image.startsWith('http') ? options.image : `${baseUrl}${options.image}`;
  }
  
  // In a real application, you might generate dynamic OG images
  // For now, return a default image
  return `${baseUrl}/images/og-default.jpg`;
}

/**
 * Validate structured data
 */
export function validateStructuredData(data: any): boolean {
  try {
    // Basic validation - check for required @context and @type
    if (!data['@context'] || !data['@type']) {
      console.warn('Structured data missing @context or @type');
      return false;
    }
    
    // Validate JSON structure
    JSON.stringify(data);
    return true;
  } catch (error) {
    console.error('Invalid structured data:', error);
    return false;
  }
}

/**
 * Generate breadcrumb structured data from URL path
 */
export function generateBreadcrumbsFromPath(path: string): Array<{ name: string; url: string }> {
  const baseUrl = (typeof window !== 'undefined' && import.meta.env?.VITE_BASE_URL) || process.env.VITE_BASE_URL || 'https://curvehospitality.com';
  const segments = path.split('/').filter(Boolean);
  
  const breadcrumbs = [{ name: 'Home', url: baseUrl }];
  
  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Convert segment to readable name
    const name = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
    
    breadcrumbs.push({
      name,
      url: `${baseUrl}${currentPath}`
    });
  });
  
  return breadcrumbs;
}

/**
 * Check if current page is indexable
 */
export function isPageIndexable(): boolean {
  // Check for noindex meta tag
  const noindexMeta = document.querySelector('meta[name="robots"][content*="noindex"]');
  if (noindexMeta) return false;
  
  // Check for noindex in robots meta tag
  const robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
  if (robotsMeta && robotsMeta.content.includes('noindex')) return false;
  
  // Check URL patterns that shouldn't be indexed
  const path = window.location.pathname;
  const nonIndexablePaths = ['/admin', '/api', '/temp', '/preview'];
  
  return !nonIndexablePaths.some(nonIndexablePath => path.startsWith(nonIndexablePath));
}

/**
 * Add hreflang tags for internationalization
 */
export function addHreflangTags(languages: Array<{ code: string; url: string }>) {
  // Remove existing hreflang tags
  const existingTags = document.querySelectorAll('link[rel="alternate"][hreflang]');
  existingTags.forEach(tag => tag.remove());
  
  // Add new hreflang tags
  languages.forEach(({ code, url }) => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = code;
    link.href = url;
    document.head.appendChild(link);
  });
}

/**
 * Performance optimization for SEO
 */
export function optimizePageForSEO() {
  // Add preconnect for external resources
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];
  
  preconnectDomains.forEach(domain => {
    if (!document.querySelector(`link[rel="preconnect"][href="${domain}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      if (domain.includes('gstatic')) {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    }
  });
  
  // Add DNS prefetch for other domains
  const prefetchDomains = [
    'https://www.google-analytics.com',
    'https://www.googletagmanager.com'
  ];
  
  prefetchDomains.forEach(domain => {
    if (!document.querySelector(`link[rel="dns-prefetch"][href="${domain}"]`)) {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    }
  });
}

/**
 * Initialize SEO optimizations
 */
export function initializeSEO() {
  // Run performance optimizations
  optimizePageForSEO();
  
  // Set up viewport meta tag if not present
  if (!document.querySelector('meta[name="viewport"]')) {
    const viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1';
    document.head.appendChild(viewport);
  }
  
  // Set up charset if not present
  if (!document.querySelector('meta[charset]')) {
    const charset = document.createElement('meta');
    charset.setAttribute('charset', 'UTF-8');
    document.head.insertBefore(charset, document.head.firstChild);
  }
}

// Auto-initialize SEO optimizations
if (typeof window !== 'undefined') {
  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSEO);
  } else {
    initializeSEO();
  }
}