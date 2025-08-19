"use client";

import React, { useEffect, useState } from 'react';

/**
 * LazyLoad - Client-side component for deferring render until needed
 * Use this for heavy components that are not immediately visible
 */
export function LazyLoad({ 
  children, 
  placeholder = null,
  threshold = 0,
  delay = 0
}: { 
  children: React.ReactNode;
  placeholder?: React.ReactNode;
  threshold?: number;
  delay?: number;
}) {
  const [isClient, setIsClient] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    
    // Return early if we're on the server
    if (typeof window === 'undefined') return;
    
    // If IntersectionObserver is not supported, render immediately
    if (!('IntersectionObserver' in window)) {
      setShouldRender(true);
      return;
    }
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry && entry.isIntersecting) {
        // Optional delay
        if (delay > 0) {
          setTimeout(() => setShouldRender(true), delay);
        } else {
          setShouldRender(true);
        }
        observer.disconnect();
      }
    };
    
    // Create an observer instance
    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin: '200px', // Load a bit before it comes into view
    });
    
    // Create a dummy element to observe
    const dummyElement = document.createElement('div');
    document.body.appendChild(dummyElement);
    observer.observe(dummyElement);
    
    // Clean up
    return () => {
      if (dummyElement.parentNode) {
        dummyElement.parentNode.removeChild(dummyElement);
      }
      observer.disconnect();
    };
  }, [delay, threshold]);
  
  // Show placeholder when on server or before render condition met
  if (!isClient || !shouldRender) {
    return <>{placeholder}</>;
  }
  
  return <>{children}</>;
}
