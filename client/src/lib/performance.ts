// Performance optimization utilities

// Debounce function for performance-sensitive operations
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    
    const callNow = immediate && !timeout;
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  };
}

// Throttle function for scroll and resize events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return function executedFunction(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Intersection Observer utility for lazy loading
export function createIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
}

// Image preloader utility
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

// Batch image preloader
export async function preloadImages(sources: string[]): Promise<void[]> {
  return Promise.all(sources.map(preloadImage));
}

// Resource prefetcher
export function prefetchResource(href: string, as: string = 'fetch'): void {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
}

// Critical resource preloader
export function preloadResource(
  href: string,
  as: 'script' | 'style' | 'font' | 'image' | 'fetch',
  type?: string,
  crossOrigin?: 'anonymous' | 'use-credentials'
): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  
  if (type) link.type = type;
  if (crossOrigin) link.crossOrigin = crossOrigin;
  
  document.head.appendChild(link);
}

// Memory usage monitor
export function getMemoryUsage(): {
  used: number;
  total: number;
  limit: number;
} | null {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    return {
      used: memory.usedJSHeapSize,
      total: memory.totalJSHeapSize,
      limit: memory.jsHeapSizeLimit,
    };
  }
  return null;
}

// Performance timing utilities
export function measurePerformance<T>(
  name: string,
  fn: () => T
): T {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  
  console.log(`Performance: ${name} took ${end - start} milliseconds`);
  return result;
}

export async function measureAsyncPerformance<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  
  console.log(`Performance: ${name} took ${end - start} milliseconds`);
  return result;
}

// Bundle splitting utilities
export function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Viewport utilities for responsive optimization
export function getViewportSize(): { width: number; height: number } {
  return {
    width: window.innerWidth || document.documentElement.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight,
  };
}

export function isInViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  const viewport = getViewportSize();
  
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= viewport.height &&
    rect.right <= viewport.width
  );
}

// Device capability detection
export function getDeviceCapabilities(): {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  hasTouch: boolean;
  connectionType: string | null;
  deviceMemory: number | null;
  hardwareConcurrency: number;
} {
  const userAgent = navigator.userAgent;
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  return {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent),
    isTablet: /iPad|Android(?!.*Mobile)/i.test(userAgent),
    isDesktop: !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent),
    hasTouch,
    connectionType: (navigator as any).connection?.effectiveType || null,
    deviceMemory: (navigator as any).deviceMemory || null,
    hardwareConcurrency: navigator.hardwareConcurrency || 1,
  };
}

// Adaptive loading based on device capabilities
export function shouldLoadHighQuality(): boolean {
  const capabilities = getDeviceCapabilities();
  const connection = (navigator as any).connection;
  
  // Don't load high quality on slow connections
  if (connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g') {
    return false;
  }
  
  // Don't load high quality on low-memory devices
  if (capabilities.deviceMemory && capabilities.deviceMemory < 4) {
    return false;
  }
  
  // Don't load high quality on mobile with save-data preference
  if (connection?.saveData) {
    return false;
  }
  
  return true;
}

// Critical CSS inlining utility
export function inlineCriticalCSS(css: string): void {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}

// Service Worker registration utility
export async function registerServiceWorker(scriptURL: string): Promise<ServiceWorkerRegistration | null> {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(scriptURL);
      console.log('Service Worker registered successfully:', registration);
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  }
  return null;
}