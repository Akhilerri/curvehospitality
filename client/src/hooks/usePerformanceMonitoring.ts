import { useEffect, useCallback } from 'react';

interface PerformanceMetrics {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
}

interface PerformanceConfig {
  enableLogging?: boolean;
  enableReporting?: boolean;
  reportingEndpoint?: string;
  sampleRate?: number; // 0-1, percentage of sessions to monitor
}

export function usePerformanceMonitoring(config: PerformanceConfig = {}) {
  const {
    enableLogging = process.env.NODE_ENV === 'development',
    enableReporting = false,
    reportingEndpoint,
    sampleRate = 0.1,
  } = config;

  // Check if we should monitor this session
  const shouldMonitor = Math.random() < sampleRate;

  const reportMetric = useCallback(
    (metric: { name: string; value: number; id?: string }) => {
      if (!shouldMonitor) return;

      if (enableLogging) {
        console.log(`Performance Metric - ${metric.name}:`, metric.value);
      }

      if (enableReporting && reportingEndpoint) {
        // Send to analytics service
        fetch(reportingEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            metric: metric.name,
            value: metric.value,
            id: metric.id,
            timestamp: Date.now(),
            url: window.location.href,
            userAgent: navigator.userAgent,
          }),
        }).catch((error) => {
          console.warn('Failed to report performance metric:', error);
        });
      }
    },
    [shouldMonitor, enableLogging, enableReporting, reportingEndpoint]
  );

  useEffect(() => {
    if (!shouldMonitor) return;

    // Measure Core Web Vitals
    const measureWebVitals = async () => {
      try {
        // Dynamic import to avoid loading the library if not needed
        const { onCLS, onFCP, onLCP, onTTFB } = await import('web-vitals/attribution');

        onCLS(reportMetric);
        onFCP(reportMetric);
        onLCP(reportMetric);
        onTTFB(reportMetric);
      } catch (error) {
        console.warn('Web Vitals library not available:', error);
      }
    };

    // Measure Navigation Timing
    const measureNavigationTiming = () => {
      if ('performance' in window && 'getEntriesByType' in performance) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          const metrics = {
            dns: navigation.domainLookupEnd - navigation.domainLookupStart,
            tcp: navigation.connectEnd - navigation.connectStart,
            ttfb: navigation.responseStart - navigation.requestStart,
            download: navigation.responseEnd - navigation.responseStart,
            domParse: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            domReady: navigation.domContentLoadedEventEnd - (navigation.activationStart || 0),
            loadComplete: navigation.loadEventEnd - (navigation.activationStart || 0),
          };

          Object.entries(metrics).forEach(([name, value]) => {
            if (value > 0) {
              reportMetric({ name: `navigation.${name}`, value });
            }
          });
        }
      }
    };

    // Measure Resource Timing
    const measureResourceTiming = () => {
      if ('performance' in window && 'getEntriesByType' in performance) {
        const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
        
        const resourceMetrics = resources.reduce((acc, resource) => {
          const type = resource.initiatorType;
          if (!acc[type]) {
            acc[type] = { count: 0, totalSize: 0, totalDuration: 0 };
          }
          
          acc[type].count++;
          acc[type].totalSize += resource.transferSize || 0;
          acc[type].totalDuration += resource.duration;
          
          return acc;
        }, {} as Record<string, { count: number; totalSize: number; totalDuration: number }>);

        Object.entries(resourceMetrics).forEach(([type, metrics]) => {
          reportMetric({ name: `resource.${type}.count`, value: metrics.count });
          reportMetric({ name: `resource.${type}.size`, value: metrics.totalSize });
          reportMetric({ name: `resource.${type}.duration`, value: metrics.totalDuration });
        });
      }
    };

    // Measure Memory Usage (if available)
    const measureMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        reportMetric({ name: 'memory.used', value: memory.usedJSHeapSize });
        reportMetric({ name: 'memory.total', value: memory.totalJSHeapSize });
        reportMetric({ name: 'memory.limit', value: memory.jsHeapSizeLimit });
      }
    };

    // Wait for page load to measure timing metrics
    if (document.readyState === 'complete') {
      measureNavigationTiming();
      measureResourceTiming();
      measureMemoryUsage();
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => {
          measureNavigationTiming();
          measureResourceTiming();
          measureMemoryUsage();
        }, 0);
      });
    }

    // Measure Web Vitals
    measureWebVitals();

    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            reportMetric({ name: 'longTask', value: entry.duration });
          });
        });
        longTaskObserver.observe({ entryTypes: ['longtask'] });

        return () => {
          longTaskObserver.disconnect();
        };
      } catch (error) {
        console.warn('Long task observer not supported:', error);
      }
    }
  }, [shouldMonitor, reportMetric]);

  // Manual performance measurement utilities
  const measureFunction = useCallback(
    <T extends (...args: any[]) => any>(fn: T, name: string): T => {
      return ((...args: any[]) => {
        const start = performance.now();
        const result = fn(...args);
        const duration = performance.now() - start;
        
        reportMetric({ name: `function.${name}`, value: duration });
        
        return result;
      }) as T;
    },
    [reportMetric]
  );

  const measureAsync = useCallback(
    async <T>(promise: Promise<T>, name: string): Promise<T> => {
      const start = performance.now();
      try {
        const result = await promise;
        const duration = performance.now() - start;
        reportMetric({ name: `async.${name}`, value: duration });
        return result;
      } catch (error) {
        const duration = performance.now() - start;
        reportMetric({ name: `async.${name}.error`, value: duration });
        throw error;
      }
    },
    [reportMetric]
  );

  const startMeasurement = useCallback(
    (name: string) => {
      const start = performance.now();
      return {
        end: () => {
          const duration = performance.now() - start;
          reportMetric({ name, value: duration });
          return duration;
        },
      };
    },
    [reportMetric]
  );

  return {
    measureFunction,
    measureAsync,
    startMeasurement,
    reportMetric,
  };
}

// Hook for monitoring component render performance
export function useRenderPerformance(componentName: string) {
  const { startMeasurement } = usePerformanceMonitoring();

  useEffect(() => {
    const measurement = startMeasurement(`render.${componentName}`);
    return () => {
      measurement.end();
    };
  });
}