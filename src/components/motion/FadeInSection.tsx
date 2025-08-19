import React, { useEffect, useRef, useState } from 'react';

import { usePrefersReducedMotion, motionConfig } from '../../lib/motion';

interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
}

/**
 * FadeInSection - A component that fades in when it enters the viewport
 * Respects user's motion preferences
 */
export function FadeInSection({
  children,
  delay = 0,
  className = '',
  threshold = 0.1,
}: FadeInSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If user prefers reduced motion, make content visible immediately
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          // Add a small delay if specified
          if (delay > 0) {
            setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          // Only trigger once
          observer.unobserve(currentRef);
        }
      },
      { 
        threshold,
        // Add rootMargin to trigger a bit before the element enters the viewport
        rootMargin: '0px 0px -50px 0px' 
      }
    );

    observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [prefersReducedMotion, delay, threshold]);

  // Generate the style based on visibility state and motion preference
  const style: React.CSSProperties = prefersReducedMotion
    ? {
        // No animation when user prefers reduced motion
        opacity: 1,
      }
    : {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity ${motionConfig.durations.medium}ms ${motionConfig.easings.default}, 
         transform ${motionConfig.durations.medium}ms ${motionConfig.easings.default}`,
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform',
      };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}
