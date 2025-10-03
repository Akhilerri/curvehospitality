import React, { Suspense, lazy, ComponentType } from 'react';
import { Skeleton } from './skeleton';

interface LazyComponentProps {
  fallback?: React.ReactNode;
  className?: string;
}

// Generic lazy loading wrapper
export function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
) {
  const LazyComponent = lazy(importFn);

  return function WrappedLazyComponent(props: React.ComponentProps<T> & LazyComponentProps) {
    const { fallback: customFallback, className, ...componentProps } = props;
    
    const defaultFallback = (
      <div className={className}>
        <Skeleton className="w-full h-64" />
      </div>
    );

    return (
      <Suspense fallback={customFallback || fallback || defaultFallback}>
        <LazyComponent {...componentProps} />
      </Suspense>
    );
  };
}

// Intersection Observer based lazy loading
interface LazyLoadProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
  once?: boolean;
}

export function LazyLoad({
  children,
  fallback,
  rootMargin = '50px',
  threshold = 0.1,
  className,
  once = true,
}: LazyLoadProps) {
  const [isInView, setIsInView] = React.useState(false);
  const [hasBeenInView, setHasBeenInView] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (once) {
              setHasBeenInView(true);
              observer.disconnect();
            }
          } else if (!once) {
            setIsInView(false);
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  const shouldRender = isInView || hasBeenInView;

  return (
    <div ref={ref} className={className}>
      {shouldRender ? children : fallback}
    </div>
  );
}

// Preload component for critical resources
interface PreloadProps {
  href: string;
  as: 'script' | 'style' | 'font' | 'image' | 'fetch';
  type?: string;
  crossOrigin?: 'anonymous' | 'use-credentials';
}

export function Preload({ href, as, type, crossOrigin }: PreloadProps) {
  React.useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    
    if (type) link.type = type;
    if (crossOrigin) link.crossOrigin = crossOrigin;
    
    document.head.appendChild(link);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [href, as, type, crossOrigin]);

  return null;
}

// Resource hints component
interface ResourceHintsProps {
  preconnect?: string[];
  prefetch?: string[];
  preload?: PreloadProps[];
}

export function ResourceHints({ preconnect = [], prefetch = [], preload = [] }: ResourceHintsProps) {
  React.useEffect(() => {
    const links: HTMLLinkElement[] = [];

    // Add preconnect links
    preconnect.forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      document.head.appendChild(link);
      links.push(link);
    });

    // Add prefetch links
    prefetch.forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
      links.push(link);
    });

    // Add preload links
    preload.forEach(({ href, as, type, crossOrigin }) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      if (type) link.type = type;
      if (crossOrigin) link.crossOrigin = crossOrigin;
      document.head.appendChild(link);
      links.push(link);
    });

    return () => {
      links.forEach((link) => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, [preconnect, prefetch, preload]);

  return null;
}