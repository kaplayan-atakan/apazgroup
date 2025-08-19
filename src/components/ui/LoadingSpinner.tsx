"use client";
import React from 'react';
import { motion } from 'framer-motion';

import { useMotionPreference } from '../../hooks/useMotionPreference';

interface LoadingSpinnerProps {
  /** Size of the spinner in pixels */
  size?: number;
  /** Color of the spinner (hex, rgb, etc.) */
  color?: string;
  /** Text to be announced to screen readers */
  srText?: string;
  /** Additional CSS class */
  className?: string;
}

/**
 * LoadingSpinner - An accessible animated loading indicator
 * 
 * Features:
 * - Respects reduced motion preferences
 * - Properly labeled for screen readers
 * - Customizable size and color
 */
export function LoadingSpinner({
  size = 40,
  color = 'currentColor',
  srText = 'Yükleniyor...',
  className = '',
}: LoadingSpinnerProps) {
  const { prefersReducedMotion } = useMotionPreference();
  
  // Define spinner animation
  const spinTransition = {
    repeat: Infinity,
    ease: "linear",
    duration: prefersReducedMotion ? 0 : 1.5,
  };

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {/* Visually hidden text for screen readers */}
      <span className="sr-only">{srText}</span>
      
      {/* Visual spinner */}
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
        animate={prefersReducedMotion ? {} : { rotate: 360 }}
        transition={spinTransition}
        aria-hidden="true"
      >
        {/* Spinner track (background circle) */}
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke={color}
          strokeOpacity="0.2"
          strokeWidth="4"
        />
        
        {/* Spinner indicator (moving part) */}
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="80, 200"
        />
      </motion.svg>
    </div>
  );
}

interface LoadingOverlayProps {
  /** Whether the overlay is active/visible */
  isLoading: boolean;
  /** Text to be announced to screen readers */
  srText?: string;
  /** Additional CSS class for the overlay */
  className?: string;
  /** Optional children to display inside the overlay */
  children?: React.ReactNode;
}

/**
 * LoadingOverlay - A fullscreen or container-based loading overlay
 * 
 * Features:
 * - Properly announced to screen readers
 * - Respects reduced motion preferences
 * - Can contain custom content or default spinner
 */
export function LoadingOverlay({
  isLoading,
  srText = 'Sayfa yükleniyor, lütfen bekleyin...',
  className = '',
  children,
}: LoadingOverlayProps) {
  const { prefersReducedMotion } = useMotionPreference();
  
  // Define fade animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  
  // Don't render anything if not loading
  if (!isLoading) return null;
  
  return (
    <motion.div
      className={`fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-50 ${className}`}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={overlayVariants}
      transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
      role="alert"
      aria-live="assertive"
    >
      {/* Loading announcement for screen readers */}
      <div aria-live="assertive" className="sr-only">
        {srText}
      </div>
      
      {/* Content - either provided children or default spinner */}
      {children || <LoadingSpinner size={50} color="#0070f3" srText={srText} />}
    </motion.div>
  );
}
