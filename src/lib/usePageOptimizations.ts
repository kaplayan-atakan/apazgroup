"use client";

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { Route } from 'next';

/**
 * Custom hook to optimize image loading for pages
 * Sets priority on hero images and prefetches related routes
 * @param locale Current locale
 * @param currentPage Current page identifier
 */
export function usePageOptimizations(locale: string, currentPage: string) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Automatically prefetch related pages based on current page
  useEffect(() => {
    // Define related routes for each page
    const relatedRoutes: Record<string, string[]> = {
      'home': [
        `/${locale}/hakkimizda`,
        `/${locale}/franchising`,
        `/${locale}/iletisim`
      ],
      'hakkimizda': [
        `/${locale}/hakkimizda/yonetim`,
        `/${locale}/franchising`
      ],
      'yonetim': [
        `/${locale}/hakkimizda/yonetim/celik-basdemir`, 
        `/${locale}/hakkimizda/yonetim/levent-yilmaz`
      ],
      'franchising': [
        `/${locale}/baydoner`,
        `/${locale}/pide-by-pide`, 
        `/${locale}/bursa-ishakbey`
      ],
      'contact': [
        `/${locale}/basvuru-formu`
      ]
    };
    
    // Get routes to prefetch for current page
    const routesToPrefetch = relatedRoutes[currentPage] || [];
    
    // Prefetch related routes when browser is idle
    const prefetchRelated = () => {
      routesToPrefetch.forEach(route => {
        router.prefetch(route as Route);
      });
    };
    
    // Use requestIdleCallback if available, otherwise setTimeout
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        const requestIdleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 1000));
        requestIdleCallback(prefetchRelated);
      } else {
        setTimeout(prefetchRelated, 1000);
      }
    }
  }, [router, locale, currentPage]);
  
  return { 
    currentPath: pathname
  };
}
