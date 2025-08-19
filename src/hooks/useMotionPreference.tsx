import { usePrefersReducedMotion } from '../lib/motion';

/**
 * Hook to access motion preference
 * @returns Object with prefersReducedMotion flag and motionProps utility
 */
export function useMotionPreference() {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  // Function to apply appropriate motion props based on preference
  const motionProps = <T extends object>(animationProps: T, fallbackProps: Partial<T> = {}): T => {
    if (prefersReducedMotion) {
      // When reduced motion is preferred, merge fallback props with animation props
      // with fallbackProps taking precedence
      return { ...animationProps, ...fallbackProps };
    }
    // Otherwise, use the full animation props
    return animationProps;
  };
  
  return { prefersReducedMotion, motionProps };
}

/**
 * Helper utilities for motion-based components
 */

/**
 * Hook to get animation duration based on user preference
 * @param duration - The normal animation duration in milliseconds
 * @returns 0 if user prefers reduced motion, otherwise the provided duration
 */
export function useMotionDuration(duration: number): number {
  const { prefersReducedMotion } = useMotionPreference();
  return prefersReducedMotion ? 0 : duration;
}

/**
 * Hook to generate animation variants for Framer Motion components based on user preference
 * @param variants - The normal animation variants
 * @param reducedVariants - Optional variants for reduced motion
 * @returns Appropriate variants based on user preference
 */
export function useMotionVariants<T extends object>(variants: T, reducedVariants?: Partial<T>): T {
  const { prefersReducedMotion } = useMotionPreference();
  
  if (prefersReducedMotion && reducedVariants) {
    return { ...variants, ...reducedVariants };
  }
  
  return variants;
}

// Re-export the MotionProvider for convenience
// This is just for API compatibility with our motion components
export { MotionProvider } from '../components/layout/MotionProvider';
