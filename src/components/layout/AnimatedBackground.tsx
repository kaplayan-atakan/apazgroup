"use client";

import { useEffect, useState } from 'react';

export function AnimatedBackground() {
  const [scrollY, setScrollY] = useState(0);

  // Optimized scroll handler with RAF and throttling
  useEffect(() => {
    let rafId: number | null = null;
    let lastScrollY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only update if scroll difference is significant (more than 5px)
      if (Math.abs(currentScrollY - lastScrollY) < 5) return;
      
      if (rafId === null) {
        rafId = window.requestAnimationFrame(() => {
          setScrollY(currentScrollY);
          lastScrollY = currentScrollY;
          rafId = null;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Calculate section-based gradient transitions
  const progress = Math.min(scrollY / 1500, 1);
  const opacity1 = Math.max(0.3, 1 - progress * 0.7);
  const opacity2 = Math.min(1, 0.3 + progress * 0.7);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Animated gradient base - Dark Navy Blue Theme */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          background: `
            radial-gradient(ellipse at top left, rgba(15, 29, 41, ${opacity1 * 0.45}) 0%, transparent 50%),
            radial-gradient(ellipse at top right, rgba(31, 58, 82, ${opacity1 * 0.40}) 0%, transparent 50%),
            radial-gradient(ellipse at bottom left, rgba(15, 29, 41, ${opacity2 * 0.35}) 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, rgba(31, 58, 82, ${opacity2 * 0.38}) 0%, transparent 50%),
            radial-gradient(ellipse at center, rgba(15, 29, 41, ${0.20 + progress * 0.20}) 20%, transparent 70%),
            linear-gradient(135deg, 
              rgba(248, 247, 244, 1) 0%,
              rgba(255, 255, 255, 1) 25%,
              rgba(248, 247, 244, 1) 50%,
              rgba(255, 255, 255, 1) 75%,
              rgba(248, 247, 244, 1) 100%
            )
          `
        }}
      />

      {/* Enhanced texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              rgba(15, 29, 41, 0.30) 35px,
              rgba(15, 29, 41, 0.30) 70px
            )
          `
        }}
      />

      {/* Enhanced animated light rays - Dark Navy Theme */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          background: `
            linear-gradient(
              ${120 + scrollY * 0.08}deg,
              transparent 0%,
              rgba(15, 29, 41, 0.5) 40%,
              rgba(31, 58, 82, 0.6) 50%,
              rgba(15, 29, 41, 0.5) 60%,
              transparent 100%
            )
          `,
          transition: 'background 0.5s ease-out'
        }}
      />

      {/* Secondary light beam for depth */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          background: `
            linear-gradient(
              ${240 - scrollY * 0.06}deg,
              transparent 0%,
              rgba(31, 58, 82, 0.45) 45%,
              rgba(15, 29, 41, 0.35) 55%,
              transparent 100%
            )
          `,
          transition: 'background 0.5s ease-out'
        }}
      />
    </div>
  );
}
