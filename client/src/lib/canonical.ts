/**
 * Canonical URL management utilities
 */

export class CanonicalManager {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || (typeof window !== 'undefined' && import.meta.env?.VITE_BASE_URL) || process.env.VITE_BASE_URL || 'https://curvehospitality.com';
    this.baseUrl = this.baseUrl.replace(/\/$/, ''); // Remove trailing slash
  }

  /**
   * Generate canonical URL for the current page
   */
  generateCanonicalUrl(path?: string): string {
    const currentPath = path || window.location.pathname;
    const cleanPath = this.cleanPath(currentPath);
    return `${this.baseUrl}${cleanPath}`;
  }

  /**
   * Clean and normalize URL path
   */
  private cleanPath(path: string): string {
    // Remove query parameters and fragments for canonical URLs
    const cleanPath = path.split('?')[0].split('#')[0];
    
    // Ensure path starts with /
    return cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  }

  /**
   * Generate canonical URL for product pages
   */
  generateProductCanonicalUrl(productId: string): string {
    return `${this.baseUrl}/products/${productId}`;
  }

  /**
   * Generate canonical URL for service pages
   */
  generateServiceCanonicalUrl(serviceId: string): string {
    return `${this.baseUrl}/services/${serviceId}`;
  }

  /**
   * Generate canonical URL for blog posts
   */
  generateBlogCanonicalUrl(slug: string): string {
    return `${this.baseUrl}/blog/${slug}`;
  }

  /**
   * Generate canonical URL for portfolio projects
   */
  generateProjectCanonicalUrl(projectId: string): string {
    return `${this.baseUrl}/portfolio/${projectId}`;
  }

  /**
   * Generate canonical URL for category pages
   */
  generateCategoryCanonicalUrl(categoryId: string): string {
    return `${this.baseUrl}/products?category=${categoryId}`;
  }

  /**
   * Update the canonical link tag in the document head
   */
  updateCanonicalTag(url?: string): void {
    const canonicalUrl = url || this.generateCanonicalUrl();
    
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    
    canonical.href = canonicalUrl;
  }
}

// Export singleton instance
export const canonicalManager = new CanonicalManager();

/**
 * Hook for managing canonical URLs in React components
 */
export function useCanonical(path?: string) {
  const canonicalUrl = canonicalManager.generateCanonicalUrl(path);
  
  // Update canonical tag when component mounts or path changes
  React.useEffect(() => {
    canonicalManager.updateCanonicalTag(canonicalUrl);
  }, [canonicalUrl]);

  return canonicalUrl;
}

// Import React for the hook
import React from 'react';