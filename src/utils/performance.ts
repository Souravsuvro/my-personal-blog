import React, { useEffect, useCallback, useRef, useState, DependencyList } from 'react';

/**
 * Custom hook for debouncing values
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Custom hook for throttling functions
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 300,
  deps: DependencyList = []
) {
  const lastRan = useRef(Date.now());

  return useCallback((...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastRan.current >= delay) {
      callback(...args);
      lastRan.current = now;
    }
  }, deps);
}

/**
 * Custom hook for intersection observer with performance optimizations
 */
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {},
  callback?: (entry: IntersectionObserverEntry) => void
) {
  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (callback) {
        callback(entry);
      }
    }, options);

    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [elementRef, options, callback]);
}

/**
 * Custom hook for lazy loading images
 */
export function useLazyImage(src: string): [string, boolean] {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
    };
  }, [src]);

  return [imageSrc, imageLoaded];
}

export const measurePerformance = (metricName: string) => {
  const startTime = performance.now();
  return () => {
    const duration = performance.now() - startTime;
    console.log(`[Performance] ${metricName}: ${duration.toFixed(2)}ms`);
    
    // Report to analytics if needed
    if ('gtag' in window) {
      (window as any).gtag('event', 'performance_metric', {
        metric_name: metricName,
        value: duration,
      });
    }
  };
};

export const usePerformanceTracking = (componentName: string) => {
  const mountTime = useRef(performance.now());

  useEffect(() => {
    const loadTime = performance.now() - mountTime.current;
    console.log(`[Performance] ${componentName} mounted in ${loadTime.toFixed(2)}ms`);

    return () => {
      const totalLifetime = performance.now() - mountTime.current;
      console.log(`[Performance] ${componentName} total lifetime: ${totalLifetime.toFixed(2)}ms`);
    };
  }, [componentName]);
};

export const withPerformanceTracking = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string
): React.FC<P> => {
  const WithPerformanceTracking: React.FC<P> = (props) => {
    usePerformanceTracking(componentName);
    return React.createElement(WrappedComponent, props);
  };
  
  WithPerformanceTracking.displayName = `WithPerformanceTracking(${componentName})`;
  return WithPerformanceTracking;
};

// Resource loading performance
export const trackResourceTiming = (threshold = 100) => {
  if ('performance' in window && 'getEntriesByType' in performance) {
    const resources = performance.getEntriesByType('resource');
    resources.forEach(resource => {
      const timing = resource as PerformanceResourceTiming;
      // Only log resources that take longer than the threshold
      if (timing.duration > threshold) {
        console.debug(
          `[Performance] Slow resource load: ${timing.name.split('/').pop()} (${timing.duration.toFixed(0)}ms)`
        );
      }
    });
  }
};

// First Paint and First Contentful Paint
export const trackPaintTimings = () => {
  if ('performance' in window && 'getEntriesByType' in performance) {
    const paintMetrics = performance.getEntriesByType('paint');
    paintMetrics.forEach(metric => {
      console.log(`[Paint] ${metric.name}: ${metric.startTime.toFixed(2)}ms`);
    });
  }
};
