import { useState, useEffect } from 'react';

/**
 * Hook that detects if the user prefers reduced motion
 * @returns boolean indicating if the user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  // Default to no-motion for SSR
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);
  
  useEffect(() => {
    // Check if the browser supports matchMedia
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }
    
    // Create media query list
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Define callback for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    
    // Add listener for changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Older browsers
      mediaQuery.addListener(handleChange);
    }
    
    // Clean up
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);
  
  return prefersReducedMotion;
}

/**
 * Calculates animation duration based on user's motion preference
 * @param baseDuration Base duration in milliseconds
 * @returns Adjusted duration (0 if reduced motion is preferred)
 */
export function getMotionSafeDuration(baseDuration: number, prefersReducedMotion: boolean): number {
  return prefersReducedMotion ? 0 : baseDuration;
}

/**
 * Creates CSS transition string with respect to motion preferences
 * @param properties CSS properties to transition (e.g., "opacity, transform")
 * @param duration Base duration in milliseconds
 * @param easing Easing function name (e.g., "ease-out")
 * @param prefersReducedMotion Whether user prefers reduced motion
 * @returns CSS transition string
 */
export function getMotionSafeTransition(
  properties: string,
  duration: number,
  easing: string,
  prefersReducedMotion: boolean
): string {
  const adjustedDuration = getMotionSafeDuration(duration, prefersReducedMotion);
  return adjustedDuration === 0 ? 'none' : `${properties} ${adjustedDuration}ms ${easing}`;
}

/**
 * Default animation settings that respect user preferences
 */
export const motionConfig = {
  // Common durations
  durations: {
    fast: 150,
    medium: 250,
    slow: 350,
  },
  // Common easings
  easings: {
    default: 'ease-out',
    smooth: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
};
