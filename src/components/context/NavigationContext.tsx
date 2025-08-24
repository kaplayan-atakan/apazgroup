"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface NavigationContextType {
  isNavigating: boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  // Reset navigation state when pathname changes
  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  // Listen for navigation start events
  useEffect(() => {
    const handleNavigationStart = () => {
      setIsNavigating(true);
    };

    // For Next.js App Router navigation events
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', handleNavigationStart);
      document.addEventListener('mouseover', (event) => {
        // Check if hovering over links
        const target = event.target as HTMLElement;
        const linkElement = target.tagName === 'A' ? target : target.closest('a');
        
        if (linkElement && linkElement.hasAttribute('href') && !linkElement.hasAttribute('target')) {
          const href = linkElement.getAttribute('href');
          if (href && href !== '#' && !href.startsWith('http') && !href.startsWith('mailto:')) {
            // Preload internal links on hover (signal intent)
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = href;
            link.as = 'document';
            document.head.appendChild(link);
          }
        }
      });
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('beforeunload', handleNavigationStart);
      }
    };
  }, []);

  return (
    <NavigationContext.Provider value={{ isNavigating }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
