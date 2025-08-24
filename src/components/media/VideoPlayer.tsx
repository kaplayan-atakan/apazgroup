"use client";

import React, { useEffect, useRef, useState } from 'react';

import { usePrefersReducedMotion } from '../../lib/motion';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
}

/**
 * VideoPlayer – viewport-aware lazy video loader with motion preference guard
 * - Defers attaching the source until in-view (reduces bandwidth)
 * - Respects prefers-reduced-motion (autoPlay disabled and paused)
 * - Uses playsInline for mobile
 */
export function VideoPlayer({
  src,
  poster,
  autoPlay = true,
  loop = true,
  muted = true,
  className = ''
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [canLoad, setCanLoad] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = videoRef.current?.parentElement;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setCanLoad(true);
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry?.isIntersecting) {
        setCanLoad(true);
        obs.disconnect();
      }
    }, { rootMargin: '200px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (prefersReduced) {
      // Pause and prevent autoplay if motion reduced
      try { v.pause(); } catch (e) {
        // no-op
      }
      v.removeAttribute('autoplay');
      return;
    }
    if (canLoad && autoPlay) {
      // Attempt autoplay; browsers may block if not muted
      (async () => {
        try { await v.play(); } catch {
          // If autoplay fails, keep controls off and leave it paused
        }
      })();
    }
  }, [canLoad, autoPlay, prefersReduced]);

  return (
    <video
      ref={videoRef}
      className={className}
      poster={poster}
      playsInline
      muted={muted}
      loop={loop}
      // Do not set controls by default – hero background
      // Autoplay attribute only if user doesn't prefer reduced motion
      autoPlay={autoPlay && !prefersReduced}
      preload={canLoad ? 'metadata' : 'none'}
    >
      {canLoad && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <source src={src} type="video/mp4" />
      )}
    </video>
  );
}
