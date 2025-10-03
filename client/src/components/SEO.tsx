import { useSEO, UseSEOOptions } from '@/hooks/useSEO';

interface SEOProps extends UseSEOOptions {
  children?: never;
}

/**
 * SEO component for declarative SEO management
 * 
 * @example
 * <SEO 
 *   metadata={{
 *     title: "About Us - Curve Hospitality",
 *     description: "Learn about our company...",
 *     keywords: ["about", "company", "hospitality"]
 *   }}
 *   breadcrumbs={[
 *     { name: "Home", url: "/" },
 *     { name: "About", url: "/about" }
 *   ]}
 * />
 */
export function SEO({ metadata, structuredData, breadcrumbs }: SEOProps) {
  useSEO({ metadata, structuredData, breadcrumbs });
  return null;
}

export default SEO;