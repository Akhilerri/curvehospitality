import { describe, it, expect, beforeEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

// Helper functions for file system checks
function fileExists(filePath: string): boolean {
  try {
    return fs.existsSync(path.resolve(filePath));
  } catch {
    return false;
  }
}

function readFileContent(filePath: string): string | null {
  try {
    return fs.readFileSync(path.resolve(filePath), 'utf8');
  } catch {
    return null;
  }
}

describe('Business Website Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('File Structure Integration', () => {
    it('should have all required page components', () => {
      const requiredPages = [
        'client/src/pages/Home.tsx',
        'client/src/pages/About.tsx',
        'client/src/pages/Services.tsx',
        'client/src/pages/Products.tsx',
        'client/src/pages/Portfolio.tsx',
        'client/src/pages/Process.tsx',
        'client/src/pages/Resources.tsx',
        'client/src/pages/Blog.tsx',
        'client/src/pages/BlogPost.tsx',
        'client/src/pages/Contact.tsx'
      ];

      requiredPages.forEach(page => {
        expect(fileExists(page)).toBe(true);
      });
    });

    it('should have routing configuration', () => {
      const appContent = readFileContent('client/src/App.tsx');
      expect(appContent).toBeTruthy();
      
      const requiredRoutes = [
        'path="/"',
        'path="/about"',
        'path="/services"',
        'path="/products"',
        'path="/portfolio"',
        'path="/process"',
        'path="/resources"',
        'path="/blog"',
        'path="/contact"'
      ];

      requiredRoutes.forEach(route => {
        expect(appContent).toContain(route);
      });
    });

    it('should have navigation integration', () => {
      const navContent = readFileContent('client/src/components/EnhancedNavigation.tsx');
      expect(navContent).toBeTruthy();

      const homeContent = readFileContent('client/src/pages/Home.tsx');
      expect(homeContent).toBeTruthy();
      expect(homeContent).toContain('EnhancedNavigation');
    });

    it('should have section components', () => {
      const requiredSections = [
        'client/src/components/sections/AboutUsSection.tsx',
        'client/src/components/sections/ServicesSection.tsx',
        'client/src/components/sections/ProductGrid.tsx',
        'client/src/components/sections/PortfolioGallery.tsx',
        'client/src/components/sections/ProcessSection.tsx',
        'client/src/components/sections/BlogSection.tsx',
        'client/src/components/sections/ContactSection.tsx'
      ];

      requiredSections.forEach(section => {
        expect(fileExists(section)).toBe(true);
      });
    });

    it('should have API integration', () => {
      const apiRoutes = [
        'server/routes/team.ts',
        'server/routes/services.ts',
        'server/routes/products.ts',
        'server/routes/projects.ts',
        'server/routes/blog.ts',
        'server/routes/contact.ts'
      ];

      apiRoutes.forEach(route => {
        expect(fileExists(route)).toBe(true);
      });
    });

    it('should have form validation', () => {
      const contactFormContent = readFileContent('client/src/components/sections/ContactForm.tsx');
      expect(contactFormContent).toBeTruthy();
      expect(contactFormContent).toContain('validation');
    });

    it('should have responsive design', () => {
      const navContent = readFileContent('client/src/components/EnhancedNavigation.tsx');
      expect(navContent).toBeTruthy();
      expect(navContent).toContain('MobileNavigation');
      expect(navContent).toContain('md:');
    });

    it('should have SEO integration', () => {
      expect(fileExists('client/src/lib/seo.ts')).toBe(true);
      expect(fileExists('client/src/hooks/useSEO.ts')).toBe(true);

      const homeContent = readFileContent('client/src/pages/Home.tsx');
      expect(homeContent).toBeTruthy();
      expect(homeContent).toContain('useSEO');
    });

    it('should have database integration', () => {
      expect(fileExists('server/storage.ts')).toBe(true);
      expect(fileExists('migrations/0000_initial_schema.sql')).toBe(true);
    });
  });

  describe('Component Integration', () => {
    it('should have proper imports in App.tsx', () => {
      const appContent = readFileContent('client/src/App.tsx');
      expect(appContent).toBeTruthy();
      
      const requiredImports = [
        'Home',
        'About',
        'Services',
        'Products',
        'Portfolio',
        'Process',
        'Resources',
        'Blog',
        'BlogPost',
        'Contact'
      ];

      requiredImports.forEach(importName => {
        expect(appContent).toContain(importName);
      });
    });

    it('should have navigation structure', () => {
      const navContent = readFileContent('client/src/components/EnhancedNavigation.tsx');
      expect(navContent).toBeTruthy();

      const navItems = [
        'About Us',
        'Services',
        'Products',
        'Portfolio',
        'Process',
        'Resources',
        'Contact'
      ];

      navItems.forEach(item => {
        expect(navContent).toContain(`"${item}"`);
      });
    });

    it('should have home page integration', () => {
      const homeContent = readFileContent('client/src/pages/Home.tsx');
      expect(homeContent).toBeTruthy();
      expect(homeContent).toContain('EnhancedNavigation');
      expect(homeContent).toContain('sectionCards');
    });
  });

  describe('User Flow Requirements', () => {
    it('should meet navigation requirements (8.1, 8.2)', () => {
      // Check responsive navigation exists
      const navContent = readFileContent('client/src/components/EnhancedNavigation.tsx');
      expect(navContent).toBeTruthy();
      expect(navContent).toContain('MobileNavigation');
      expect(navContent).toContain('DesktopNavigation');
      
      // Check all routes are configured
      const appContent = readFileContent('client/src/App.tsx');
      expect(appContent).toBeTruthy();
      expect(appContent).toContain('Switch');
      expect(appContent).toContain('Route');
    });

    it('should have complete user journey support', () => {
      // All main pages should exist for complete user journeys
      const journeyPages = [
        'client/src/pages/Home.tsx',
        'client/src/pages/About.tsx',
        'client/src/pages/Services.tsx',
        'client/src/pages/Products.tsx',
        'client/src/pages/Portfolio.tsx',
        'client/src/pages/Process.tsx',
        'client/src/pages/Resources.tsx',
        'client/src/pages/Contact.tsx'
      ];

      journeyPages.forEach(page => {
        expect(fileExists(page)).toBe(true);
      });

      // Contact form should support submission journey
      const contactContent = readFileContent('client/src/components/sections/ContactForm.tsx');
      expect(contactContent).toBeTruthy();
      expect(contactContent).toContain('onSubmit');
    });
  });
});