import React from 'react';
import { motion, LazyMotion, domAnimation, Variants } from 'framer-motion';

import { useMotionPreference } from '../../hooks/useMotionPreference';

interface FadeInProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
  once?: boolean;
  distance?: number; // Pixel-based movement (e.g., 20 means move up 20px)
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

/**
 * FadeInSection - A component that fades in its children with optional movement
 * 
 * This component respects user's reduced motion preferences.
 */
export function FadeInSection({
  children,
  duration = 0.5, 
  delay = 0,
  className = '',
  once = true,
  distance = 20,
  direction = 'up',
}: FadeInProps) {
  // Get motion preference from context
  const { prefersReducedMotion } = useMotionPreference();
  
  // Create directional offset based on direction prop
  const getDirectionalOffset = () => {
    if (prefersReducedMotion || direction === 'none') return {};
    
    switch (direction) {
      case 'up': return { y: distance };
      case 'down': return { y: -distance };
      case 'left': return { x: distance };
      case 'right': return { x: -distance };
      default: return {};
    }
  };
  
  // Define animation variants
  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...getDirectionalOffset(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
  duration: prefersReducedMotion ? 0 : duration,
  delay: prefersReducedMotion ? 0 : delay,
        ease: [0.25, 0.1, 0.25, 1], // Smooth easeOutQuart
      },
    },
  };
  
  return (
    <LazyMotion features={domAnimation}>
  <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
        variants={variants}
      >
        {children}
      </motion.div>
    </LazyMotion>
  );
}

interface StaggeredItemProps {
  children: React.ReactNode;
  index?: number;
  staggerDelay?: number;
  className?: string;
}

/**
 * For use within a StaggeredMotionGroup
 */
export function StaggeredItem({
  children,
  index = 0,
  staggerDelay = 0.1,
  className = '',
}: StaggeredItemProps) {
  const { prefersReducedMotion } = useMotionPreference();
  
  const variants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
  duration: prefersReducedMotion ? 0 : 0.5,
  delay: prefersReducedMotion ? 0 : index * staggerDelay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };
  
  return (
  <motion.div
      className={className}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

interface StaggeredMotionGroupProps {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
  staggerDelay?: number;
}

/**
 * StaggeredMotionGroup - A component that staggers animations of its children
 * 
 * This component respects user's reduced motion preferences.
 * Child elements should be wrapped with StaggeredItem.
 */
export function StaggeredMotionGroup({
  children,
  className = '',
  once = true,
  staggerDelay = 0.1,
}: StaggeredMotionGroupProps) {
  const { prefersReducedMotion } = useMotionPreference();
  
  // Pass the staggerDelay to children if they are StaggeredItems
  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child) && child.type === StaggeredItem) {
      const element = child as React.ReactElement<StaggeredItemProps>;
      return React.cloneElement<StaggeredItemProps>(element, {
        index,
        staggerDelay,
      });
    }
    return child;
  });
  
  // Container variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
  staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
  duration: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };
  
  return (
    <LazyMotion features={domAnimation}>
  <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
        variants={containerVariants}
      >
        {childrenWithProps}
      </motion.div>
    </LazyMotion>
  );
}
