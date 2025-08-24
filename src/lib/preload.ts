"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { Route } from 'next';

/**
 * Returns a list of routes to prefetch based on current page
 * @param locale Current locale (tr, en)
 * @param currentPath Current path without locale prefix
 */
function getRelatedRoutes(locale: string, currentPath: string): string[] {
  // Base routes that are good to prefetch on any page
  const baseRoutes = [
    `/${locale}`,
    `/${locale}/hakkimizda`,
    `/${locale}/franchising`,
    `/${locale}/iletisim`,
  ];
  
  // Related routes based on current path
  const relatedMap: Record<string, string[]> = {
    'hakkimizda': [
      `/${locale}/hakkimizda/yonetim`, 
      `/${locale}/insan-kaynaklari-politikamiz`
    ],
    'franchising': [
      `/${locale}/baydoner`,
      `/${locale}/pide-by-pide`,
      `/${locale}/bursa-ishakbey`
    ],
    'iletisim': [
      `/${locale}/basvuru-formu`
    ],
    'hakkimizda/yonetim': [
      `/${locale}/hakkimizda/yonetim/celik-basdemir`,
      `/${locale}/hakkimizda/yonetim/levent-yilmaz`
    ],
  };
  
  // Find the matching pattern
  const matchingPattern = Object.keys(relatedMap).find(pattern => 
    currentPath.includes(pattern)
  );
  
  // Return combined routes, filtering out current path
  const related: string[] = matchingPattern ? relatedMap[matchingPattern] || [] : [];
  return [
    ...baseRoutes,
    ...related
  ].filter(route => route !== `/${locale}${currentPath}`);
}

/**
 * Custom hook to prefetch related routes based on current page
 */
export function usePrefetchRoutes(locale: string) {
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    // Extract path without locale prefix
    const currentPath = pathname.replace(`/${locale}`, '');
    
    // Get routes to prefetch
    const routesToPrefetch = getRelatedRoutes(locale, currentPath);
    
    // Create prefetch function to run during idle time
    const prefetchRelatedRoutes = () => {
      routesToPrefetch.forEach(route => {
        router.prefetch(route as Route);
      });
    };
    
    // Prefetch when browser is idle
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      // Using window.requestIdleCallback with TypeScript
      (window as Window & typeof globalThis & { requestIdleCallback: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number }).requestIdleCallback(prefetchRelatedRoutes);
    } else {
      // Fallback for browsers not supporting requestIdleCallback
      setTimeout(prefetchRelatedRoutes, 1000);
    }
  }, [pathname, locale, router]);
}
