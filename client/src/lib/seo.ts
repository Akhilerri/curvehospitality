import { CompanyInfo } from '@shared/types/common';

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export class SEOManager {
  private static instance: SEOManager;
  private baseUrl: string;
  private defaultImage: string;
  private company?: CompanyInfo;

  private constructor() {
    this.baseUrl = import.meta.env?.VITE_BASE_URL || 'https://curvehospitality.com';
    this.defaultImage = `${this.baseUrl}/images/og-default.jpg`;
  }

  static getInstance(): SEOManager {
    if (!SEOManager.instance) {
      SEOManager.instance = new SEOManager();
    }
    return SEOManager.instance;
  }

  setCompanyData(company: CompanyInfo) {
    this.company = company;
  }

  updateMetaTags(metadata: SEOMetadata) {
    // Update document title
    document.title = metadata.title;

    // Update or create meta tags
    this.updateMetaTag('description', metadata.description);
    
    if (metadata.keywords) {
      this.updateMetaTag('keywords', metadata.keywords.join(', '));
    }

    // Open Graph tags
    this.updateMetaTag('og:title', metadata.title, 'property');
    this.updateMetaTag('og:description', metadata.description, 'property');
    this.updateMetaTag('og:type', metadata.type || 'website', 'property');
    this.updateMetaTag('og:url', metadata.url || window.location.href, 'property');
    this.updateMetaTag('og:image', metadata.image || this.defaultImage, 'property');
    this.updateMetaTag('og:site_name', this.company?.name || 'Curve Hospitality', 'property');

    // Twitter Card tags
    this.updateMetaTag('twitter:card', 'summary_large_image', 'name');
    this.updateMetaTag('twitter:title', metadata.title, 'name');
    this.updateMetaTag('twitter:description', metadata.description, 'name');
    this.updateMetaTag('twitter:image', metadata.image || this.defaultImage, 'name');

    // Article-specific tags
    if (metadata.type === 'article') {
      if (metadata.author) {
        this.updateMetaTag('article:author', metadata.author, 'property');
      }
      if (metadata.publishedTime) {
        this.updateMetaTag('article:published_time', metadata.publishedTime, 'property');
      }
      if (metadata.modifiedTime) {
        this.updateMetaTag('article:modified_time', metadata.modifiedTime, 'property');
      }
      if (metadata.section) {
        this.updateMetaTag('article:section', metadata.section, 'property');
      }
      if (metadata.tags) {
        // Remove existing article:tag meta tags
        const existingTags = document.querySelectorAll('meta[property="article:tag"]');
        existingTags.forEach(tag => tag.remove());
        
        // Add new tags
        metadata.tags.forEach(tag => {
          this.updateMetaTag('article:tag', tag, 'property');
        });
      }
    }

    // Canonical URL
    this.updateCanonicalUrl(metadata.url || window.location.href);
  }

  private updateMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name') {
    let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
    
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, name);
      document.head.appendChild(meta);
    }
    
    meta.content = content;
  }

  private updateCanonicalUrl(url: string) {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    
    canonical.href = url;
  }

  addStructuredData(data: StructuredData | StructuredData[]) {
    // Remove existing structured data
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => {
      if (script.textContent?.includes('"@context"')) {
        script.remove();
      }
    });

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(Array.isArray(data) ? data : [data], null, 2);
    document.head.appendChild(script);
  }

  generateBusinessStructuredData(): StructuredData {
    if (!this.company) {
      throw new Error('Company data not set. Call setCompanyData() first.');
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: this.company.name,
      description: this.company.description,
      url: this.baseUrl,
      logo: `${this.baseUrl}/images/logo.png`,
      foundingDate: this.company.foundedYear ? `${this.company.foundedYear}-01-01` : undefined,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'US'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'info@curvehospitality.com',
        telephone: '+1-555-0123'
      },
      sameAs: [
        'https://www.linkedin.com/company/curve-hospitality',
        'https://www.instagram.com/curvehospitality'
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Interior Design',
              description: 'Professional interior design services for hospitality spaces'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'FF&E Manufacturing',
              description: 'Custom furniture, fixtures, and equipment manufacturing'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Procurement Services',
              description: 'Professional procurement and sourcing services'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Project Management',
              description: 'End-to-end project management for hospitality projects'
            }
          }
        ]
      }
    };
  }

  generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url
      }))
    };
  }

  generateProductStructuredData(product: any): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: product.images?.[0] ? `${this.baseUrl}${product.images[0]}` : this.defaultImage,
      brand: {
        '@type': 'Brand',
        name: this.company?.name || 'Curve Hospitality'
      },
      manufacturer: {
        '@type': 'Organization',
        name: this.company?.name || 'Curve Hospitality'
      },
      category: product.category?.name,
      material: product.materials?.join(', '),
      offers: product.priceRange ? {
        '@type': 'Offer',
        priceRange: product.priceRange,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: this.company?.name || 'Curve Hospitality'
        }
      } : undefined
    };
  }

  generateArticleStructuredData(article: any): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.excerpt,
      image: article.featuredImage ? `${this.baseUrl}${article.featuredImage}` : this.defaultImage,
      author: {
        '@type': 'Person',
        name: article.author
      },
      publisher: {
        '@type': 'Organization',
        name: this.company?.name || 'Curve Hospitality',
        logo: {
          '@type': 'ImageObject',
          url: `${this.baseUrl}/images/logo.png`
        }
      },
      datePublished: article.publishedAt,
      dateModified: article.updatedAt || article.publishedAt,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${this.baseUrl}/blog/${article.slug}`
      }
    };
  }

  generateProjectStructuredData(project: any): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title,
      description: project.description,
      image: project.images?.[0]?.url ? `${this.baseUrl}${project.images[0].url}` : this.defaultImage,
      creator: {
        '@type': 'Organization',
        name: this.company?.name || 'Curve Hospitality'
      },
      dateCreated: project.completedAt,
      locationCreated: project.location ? {
        '@type': 'Place',
        name: project.location
      } : undefined,
      about: project.segment,
      keywords: [project.brand, project.segment, project.location].filter(Boolean).join(', ')
    };
  }
}

// Export singleton instance
export const seoManager = SEOManager.getInstance();

// Default SEO configurations for different page types
export const defaultSEOConfigs = {
  home: {
    title: 'Curve Hospitality - Premier FF&E Procurement & Interior Design',
    description: 'Distinguished hospitality procurement enterprise specializing in custom FF&E manufacturing, interior design, and quality hospitality furniture for hotels and restaurants.',
    keywords: ['hospitality furniture', 'FF&E procurement', 'interior design', 'hotel furniture', 'restaurant furniture', 'custom manufacturing'],
    type: 'website' as const
  },
  about: {
    title: 'About Us - Curve Hospitality',
    description: 'Learn about Curve Hospitality\'s history, mission, values, and expert team dedicated to delivering exceptional hospitality solutions.',
    keywords: ['about curve hospitality', 'company history', 'hospitality experts', 'interior design team'],
    type: 'website' as const
  },
  services: {
    title: 'Services - Curve Hospitality',
    description: 'Comprehensive hospitality services including interior design, FF&E manufacturing, procurement, and project management for hotels and restaurants.',
    keywords: ['hospitality services', 'interior design services', 'FF&E manufacturing', 'procurement services', 'project management'],
    type: 'website' as const
  },
  products: {
    title: 'Products - Curve Hospitality',
    description: 'Explore our extensive catalog of hospitality furniture, fixtures, and equipment including seating, lighting, case goods, and custom solutions.',
    keywords: ['hospitality products', 'hotel furniture', 'restaurant furniture', 'custom furniture', 'FF&E catalog'],
    type: 'website' as const
  },
  portfolio: {
    title: 'Portfolio - Curve Hospitality',
    description: 'View our portfolio of completed hospitality projects showcasing innovative design solutions and exceptional craftsmanship.',
    keywords: ['hospitality portfolio', 'hotel projects', 'restaurant projects', 'interior design portfolio', 'case studies'],
    type: 'website' as const
  },
  process: {
    title: 'Our Process - Curve Hospitality',
    description: 'Discover our proven project workflow and methodology for delivering successful hospitality design and procurement projects.',
    keywords: ['design process', 'project workflow', 'hospitality methodology', 'project management process'],
    type: 'website' as const
  },
  resources: {
    title: 'Resources - Curve Hospitality',
    description: 'Access valuable insights, industry guides, and expert knowledge to help with your hospitality design and procurement decisions.',
    keywords: ['hospitality resources', 'design guides', 'industry insights', 'hospitality blog', 'design tips'],
    type: 'website' as const
  },
  contact: {
    title: 'Contact Us - Curve Hospitality',
    description: 'Get in touch with Curve Hospitality for your next hospitality project. Contact our expert team for consultations and quotes.',
    keywords: ['contact curve hospitality', 'hospitality consultation', 'project quote', 'get in touch'],
    type: 'website' as const
  }
};