import React, { lazy } from 'react';

interface DynamicImportOptions {
  ssr?: boolean;
  webpackChunkName?: string;
}

export function dynamicImport<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: DynamicImportOptions = {}
): React.LazyExoticComponent<T> {
  const { ssr = false, webpackChunkName } = options;

  if (ssr) {
    return lazy(() =>
      importFn().then((module) => ({
        default: module.default,
      }))
    );
  }

  // Add webpack chunk name for better debugging
  const Component = lazy(() =>
    importFn().then((module) => {
      if (process.env.NODE_ENV === 'development') {
        const name = webpackChunkName || module.default.displayName || module.default.name;
        if (name) {
          // @ts-ignore - Adding displayName for development
          module.default.displayName = `Lazy(${name})`;
        }
      }
      return module;
    })
  );

  return Component;
}

// Preload utility for components
export function preloadComponent(importFn: () => Promise<any>): void {
  void importFn();
}

// Example usage:
// const MyComponent = dynamicImport(() => import('./MyComponent'), {
//   webpackChunkName: 'MyComponent',
//   ssr: false,
// });
