"use client";
import React from 'react';
import Image from 'next/image';

import { usePrefersReducedMotion, motionConfig } from '../../lib/motion';

interface HeroGradientProps {
  heading: string;
  intro?: string;
  imageSrc?: string; // optional background image
  imageAlt?: string;
  radialPosition?: string; // e.g. circle_at_30%_30%
  overlayColor?: string; // tailwind color utility (e.g. black/40)
  variant?: 'light' | 'brand' | 'dark';
  className?: string; // extra classes for outer section
  contentClassName?: string; // extra classes for inner wrapper
  priorityImage?: boolean;
  minHeights?: { base?: string; md?: string; lg?: string };
}

/**
 * Reusable gradient hero with optional background image and motion-aware fade-in.
 * Ensures adequate vertical space without hard-coding viewport heights.
 */
export const HeroGradient: React.FC<HeroGradientProps> = ({
  heading,
  intro,
  imageSrc,
  imageAlt = heading,
  radialPosition = 'circle_at_35%_30%',
  overlayColor = 'black/40',
  className = '',
  contentClassName = '',
  priorityImage = false,
  // Adjusted default heights for better breathing room on multi-line headings
  minHeights = { base: 'min-h-[200px]', md: 'md:min-h-[250px]', lg: 'lg:min-h-[300px]' },
  variant = 'brand'
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const duration = motionConfig.durations.medium;
  const easing = motionConfig.easings.default;

  return (
    <section
      className={`relative w-full flex items-center overflow-hidden ${minHeights.base} ${minHeights.md || ''} ${minHeights.lg || ''} ${className}`.trim()}
      style={prefersReducedMotion ? undefined : {}}
    >
      {/* Base gradient layers */}
      {/* Background layer: variant-driven gradient harmonized with footer palette */}
      {variant === 'brand' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-brand-bronze-100 via-brand-bronze-200 to-brand-gold-100" />
          <div className={`absolute inset-0 opacity-[0.25] bg-[radial-gradient(${radialPosition},#b89b6f,transparent_65%)] mix-blend-multiply`} />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-accent/10" />
        </>
      )}
      {variant === 'light' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100" />
          <div className={`absolute inset-0 opacity-[0.15] bg-[radial-gradient(${radialPosition},#0f172a,transparent_60%)]`} aria-hidden="true" />
        </>
      )}
      {variant === 'dark' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
          <div className={`absolute inset-0 opacity-[0.25] bg-[radial-gradient(${radialPosition},#1F3A52,transparent_65%)]`} aria-hidden="true" />
        </>
      )}
      {imageSrc && (
        <>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="100vw"
            className="object-cover"
            priority={priorityImage}
          />
          <div className={`absolute inset-0 bg-${overlayColor}`} aria-hidden="true" />
        </>
      )}
      <div
        className={`relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-20 text-center transition-opacity transition-transform` +
          ` ${contentClassName}`}
        style={prefersReducedMotion ? undefined : {
          opacity: 1,
          animation: `heroFadeIn ${duration}ms ${easing} forwards`,
        }}
      >
        <h1 className="text-balance text-3xl md:text-5xl font-bold tracking-tight leading-[1.15] bg-gradient-to-br from-brand-primary via-brand-accent to-brand-primary bg-clip-text text-transparent py-1 drop-shadow-sm">
          {heading}
        </h1>
        {intro && (
          <p className="mt-6 text-lg md:text-xl text-brand-primary/80 leading-relaxed max-w-3xl mx-auto font-medium">{intro}</p>
        )}
      </div>
      {/* Keyframes (scoped via global since Tailwind can't generate dynamic) */}
      <style jsx global>{`
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};
