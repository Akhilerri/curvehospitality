import { ReactNode } from 'react';
import { SEOMetadata, StructuredData } from '@/lib/seo';
import { useSEO } from '@/hooks/useSEO';

interface SEOLayoutProps {
  children: ReactNode;
  metadata: SEOMetadata;
  structuredData?: StructuredData | StructuredData[];
  breadcrumbs?: Array<{ name: string; url: string }>;
}

/**
 * Layout component that handles SEO for a page
 */
export function SEOLayout({ children, metadata, structuredData, breadcrumbs }: SEOLayoutProps) {
  useSEO({ metadata, structuredData, breadcrumbs });
  
  return <>{children}</>;
}

export default SEOLayout;