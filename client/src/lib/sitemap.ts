interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

interface SitemapOptions {
  baseUrl: string;
  defaultChangefreq?: SitemapUrl['changefreq'];
  defaultPriority?: number;
}

export class SitemapGenerator {
  private baseUrl: string;
  private defaultChangefreq: SitemapUrl['changefreq'];
  private defaultPriority: number;

  constructor(options: SitemapOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, ''); // Remove trailing slash
    this.defaultChangefreq = options.defaultChangefreq || 'weekly';
    this.defaultPriority = options.defaultPriority || 0.5;
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private createUrl(url: Partial<SitemapUrl>): SitemapUrl {
    return {
      changefreq: this.defaultChangefreq,
      priority: this.defaultPriority,
      ...url,
      loc: `${this.baseUrl}${url.loc}`
    };
  }

  generateStaticUrls(): SitemapUrl[] {
    const now = this.formatDate(new Date());
    
    return [
      this.createUrl({
        loc: '/',
        lastmod: now,
        changefreq: 'daily',
        priority: 1.0
      }),
      this.createUrl({
        loc: '/about',
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.8
      }),
      this.createUrl({
        loc: '/services',
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.9
      }),
      this.createUrl({
        loc: '/products',
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.9
      }),
      this.createUrl({
        loc: '/portfolio',
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.8
      }),
      this.createUrl({
        loc: '/process',
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      }),
      this.createUrl({
        loc: '/resources',
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.7
      }),
      this.createUrl({
        loc: '/blog',
        lastmod: now,
        changefreq: 'daily',
        priority: 0.8
      }),
      this.createUrl({
        loc: '/contact',
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.6
      })
    ];
  }

  generateServiceUrls(services: any[]): SitemapUrl[] {
    return services.map(service => 
      this.createUrl({
        loc: `/services/${service.id}`,
        lastmod: service.updatedAt ? this.formatDate(new Date(service.updatedAt)) : undefined,
        changefreq: 'monthly',
        priority: 0.7
      })
    );
  }

  generateProductUrls(products: any[]): SitemapUrl[] {
    return products.map(product => 
      this.createUrl({
        loc: `/products/${product.id}`,
        lastmod: product.updatedAt ? this.formatDate(new Date(product.updatedAt)) : undefined,
        changefreq: 'weekly',
        priority: 0.6
      })
    );
  }

  generateProductCategoryUrls(categories: any[]): SitemapUrl[] {
    return categories.map(category => 
      this.createUrl({
        loc: `/products?category=${category.id}`,
        lastmod: category.updatedAt ? this.formatDate(new Date(category.updatedAt)) : undefined,
        changefreq: 'weekly',
        priority: 0.7
      })
    );
  }

  generateProjectUrls(projects: any[]): SitemapUrl[] {
    return projects.map(project => 
      this.createUrl({
        loc: `/portfolio/${project.id}`,
        lastmod: project.updatedAt ? this.formatDate(new Date(project.updatedAt)) : undefined,
        changefreq: 'monthly',
        priority: 0.6
      })
    );
  }

  generateBlogUrls(posts: any[]): SitemapUrl[] {
    return posts.map(post => 
      this.createUrl({
        loc: `/blog/${post.slug}`,
        lastmod: post.updatedAt ? this.formatDate(new Date(post.updatedAt)) : undefined,
        changefreq: 'monthly',
        priority: 0.6
      })
    );
  }

  generateGuideUrls(guides: any[]): SitemapUrl[] {
    return guides.map(guide => 
      this.createUrl({
        loc: `/resources/guides/${guide.id}`,
        lastmod: guide.updatedAt ? this.formatDate(new Date(guide.updatedAt)) : undefined,
        changefreq: 'monthly',
        priority: 0.5
      })
    );
  }

  generateXML(urls: SitemapUrl[]): string {
    const urlElements = urls.map(url => {
      let urlXml = `  <url>\n    <loc>${url.loc}</loc>\n`;
      
      if (url.lastmod) {
        urlXml += `    <lastmod>${url.lastmod}</lastmod>\n`;
      }
      
      if (url.changefreq) {
        urlXml += `    <changefreq>${url.changefreq}</changefreq>\n`;
      }
      
      if (url.priority !== undefined) {
        urlXml += `    <priority>${url.priority.toFixed(1)}</priority>\n`;
      }
      
      urlXml += `  </url>`;
      return urlXml;
    }).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
  }

  async generateCompleteSitemap(data?: {
    services?: any[];
    products?: any[];
    categories?: any[];
    projects?: any[];
    blogPosts?: any[];
    guides?: any[];
  }): Promise<string> {
    const allUrls: SitemapUrl[] = [];

    // Add static URLs
    allUrls.push(...this.generateStaticUrls());

    // Add dynamic URLs if data is provided
    if (data?.services) {
      allUrls.push(...this.generateServiceUrls(data.services));
    }

    if (data?.products) {
      allUrls.push(...this.generateProductUrls(data.products));
    }

    if (data?.categories) {
      allUrls.push(...this.generateProductCategoryUrls(data.categories));
    }

    if (data?.projects) {
      allUrls.push(...this.generateProjectUrls(data.projects));
    }

    if (data?.blogPosts) {
      allUrls.push(...this.generateBlogUrls(data.blogPosts));
    }

    if (data?.guides) {
      allUrls.push(...this.generateGuideUrls(data.guides));
    }

    // Sort URLs by priority (descending) and then by URL
    allUrls.sort((a, b) => {
      if (a.priority !== b.priority) {
        return (b.priority || 0) - (a.priority || 0);
      }
      return a.loc.localeCompare(b.loc);
    });

    return this.generateXML(allUrls);
  }
}

// Create singleton instance
export const sitemapGenerator = new SitemapGenerator({
  baseUrl: (typeof window !== 'undefined' && import.meta.env?.VITE_BASE_URL) || process.env.VITE_BASE_URL || 'https://curvehospitality.com',
  defaultChangefreq: 'weekly',
  defaultPriority: 0.5
});

// Robots.txt generator
export class RobotsGenerator {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  generate(options?: {
    disallowPaths?: string[];
    allowPaths?: string[];
    crawlDelay?: number;
    customRules?: string[];
  }): string {
    const { disallowPaths = [], allowPaths = [], crawlDelay, customRules = [] } = options || {};

    let robots = 'User-agent: *\n';

    // Add allow paths first
    allowPaths.forEach(path => {
      robots += `Allow: ${path}\n`;
    });

    // Add disallow paths
    const defaultDisallowPaths = [
      '/api/',
      '/admin/',
      '/_next/',
      '/static/',
      '*.json',
      '*.xml'
    ];
    
    [...defaultDisallowPaths, ...disallowPaths].forEach(path => {
      robots += `Disallow: ${path}\n`;
    });

    // Add crawl delay if specified
    if (crawlDelay) {
      robots += `Crawl-delay: ${crawlDelay}\n`;
    }

    // Add custom rules
    customRules.forEach(rule => {
      robots += `${rule}\n`;
    });

    // Add sitemap reference
    robots += `\nSitemap: ${this.baseUrl}/sitemap.xml\n`;

    return robots;
  }
}

export const robotsGenerator = new RobotsGenerator(
  (typeof window !== 'undefined' && import.meta.env?.VITE_BASE_URL) || process.env.VITE_BASE_URL || 'https://curvehospitality.com'
);