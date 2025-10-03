import React, { useEffect } from 'react';
import { usePerformanceMonitoring } from '@/hooks/usePerformanceMonitoring';

interface PerformanceMonitorProps {
  enableInProduction?: boolean;
  sampleRate?: number;
  reportingEndpoint?: string;
}

export function PerformanceMonitor({
  enableInProduction = false,
  sampleRate = 0.1,
  reportingEndpoint,
}: PerformanceMonitorProps) {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const shouldEnable = isDevelopment || enableInProduction;

  usePerformanceMonitoring({
    enableLogging: isDevelopment,
    enableReporting: shouldEnable && !!reportingEndpoint,
    reportingEndpoint,
    sampleRate,
  });

  useEffect(() => {
    if (!shouldEnable) return;

    // Monitor unhandled errors
    const handleError = (event: ErrorEvent) => {
      console.error('Unhandled error:', event.error);
      // You could report this to your error tracking service
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      // You could report this to your error tracking service
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [shouldEnable]);

  // This component doesn't render anything
  return null;
}