import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  lazy?: boolean;
  quality?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  className?: string;
  containerClassName?: string;
  showSkeleton?: boolean;
  aspectRatio?: number;
}

export function OptimizedImage({
  src,
  alt,
  fallbackSrc,
  lazy = true,
  quality = 85,
  priority = false,
  onLoad,
  onError,
  className,
  containerClassName,
  showSkeleton = true,
  aspectRatio,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before the image comes into view
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority, isInView]);

  // Generate optimized image URL (this would typically integrate with a CDN or image service)
  const getOptimizedSrc = (originalSrc: string, width?: number, height?: number) => {
    // In a real implementation, you would integrate with services like:
    // - Cloudinary: `${originalSrc}?w=${width}&h=${height}&q=${quality}&f=auto`
    // - ImageKit: `${originalSrc}?tr=w-${width},h-${height},q-${quality},f-auto`
    // - Next.js Image Optimization API
    
    // For now, return the original src
    // You can extend this to work with your image optimization service
    return originalSrc;
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const containerStyle = aspectRatio
    ? { aspectRatio: aspectRatio.toString() }
    : undefined;

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden',
        containerClassName
      )}
      style={containerStyle}
    >
      {/* Skeleton/Loading state */}
      {showSkeleton && !isLoaded && !hasError && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}

      {/* Main image */}
      {isInView && !hasError && (
        <img
          ref={imgRef}
          src={getOptimizedSrc(src)}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          loading={lazy && !priority ? 'lazy' : 'eager'}
          decoding="async"
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          {...props}
        />
      )}

      {/* Fallback image */}
      {hasError && fallbackSrc && (
        <img
          src={fallbackSrc}
          alt={alt}
          className={cn('opacity-100', className)}
          {...props}
        />
      )}

      {/* Error state */}
      {hasError && !fallbackSrc && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">Image not available</div>
          </div>
        </div>
      )}
    </div>
  );
}

// Hook for preloading images
export function useImagePreload(src: string) {
  useEffect(() => {
    const img = new Image();
    img.src = src;
  }, [src]);
}

// Component for preloading critical images
export function ImagePreloader({ sources }: { sources: string[] }) {
  useEffect(() => {
    sources.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [sources]);

  return null;
}