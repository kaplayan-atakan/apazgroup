import React, { Children, cloneElement, useEffect, useRef, useState } from 'react';

import { usePrefersReducedMotion, motionConfig } from '../../lib/motion';

interface StaggeredMotionGroupProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  threshold?: number;
  as?: React.ElementType;
}

/**
 * StaggeredMotionGroup - Staggers the animation of child elements
 * Respects user's motion preferences
 */
export function StaggeredMotionGroup({
  children,
  className = '',
  staggerDelay = 100,
  threshold = 0.1,
  as: Component = 'div',
}: StaggeredMotionGroupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // If user prefers reduced motion, show content immediately
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
          setIsVisible(true);
          observer.unobserve(currentRef);
        }
      },
      { 
        threshold,
        rootMargin: '0px 0px -50px 0px' 
      }
    );

    observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [prefersReducedMotion, threshold]);

  // Clone children with animation styles
  const staggeredChildren = Children.map(children, (child, index) => {
    // Skip non-element children
    if (!React.isValidElement(child)) {
      return child;
    }

    // Base style for staggered animation
    const style = prefersReducedMotion
      ? {
          ...child.props.style,
          opacity: 1,
        }
      : {
          ...child.props.style,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
          transition: `opacity ${motionConfig.durations.medium}ms ${motionConfig.easings.default}, 
           transform ${motionConfig.durations.medium}ms ${motionConfig.easings.default}`,
          transitionDelay: `${index * staggerDelay}ms`,
        };

    // Clone with updated style
    return cloneElement(child, {
      ...child.props,
      style,
    });
  });

  return (
    <Component ref={ref} className={className}>
      {staggeredChildren}
    </Component>
  );
}
