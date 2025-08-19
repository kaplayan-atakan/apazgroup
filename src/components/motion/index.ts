/**
 * Motion Components
 * 
 * This module exports all motion-related components.
 */

export { 
  FadeInSection,
  StaggeredItem,
  StaggeredMotionGroup
} from './MotionComponents';

// Re-export motion provider and hooks for convenience
export { 
  useMotionPreference,
  useMotionDuration,
  useMotionVariants
} from '../../hooks/useMotionPreference';
export { MotionProvider } from '../../components/layout/MotionProvider';
