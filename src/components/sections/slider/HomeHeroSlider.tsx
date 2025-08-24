"use client";

import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';

import { Icon } from '../../ui/Icon';

interface Slide {
  src: string;        // default (desktop) image
  mobileSrc?: string; // optional mobile-optimized image
  alt: string;
}
interface HomeHeroSliderProps {
  slides: Slide[];
  email?: string;
  intervalMs?: number;
}

export function HomeHeroSlider({ slides, email, intervalMs = 6000 }: HomeHeroSliderProps) {
  const [index, setIndex] = useState(0);
  const [mobileHeight, setMobileHeight] = useState<number | null>(null);
  const [desktopHeight, setDesktopHeight] = useState<number | null>(null);
  const ratiosRef = useRef<number[]>([]); // collected natural H/W ratios
  const next = useCallback(() => setIndex(i => (i + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setIndex(i => (i - 1 + slides.length) % slides.length), [slides.length]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const id = setInterval(next, intervalMs);
    return () => clearInterval(id);
  }, [next, intervalMs]);

  // Fallback base ratio for desktop unified calc
  const fallbackRatio = 9/16; // stable primitive constant

  // Compute mobile height ONCE (first slide aspect ratio) & on resize; ignore further slide changes
  useEffect(() => {
    function compute() {
      if (typeof window === 'undefined') return;
      if (window.innerWidth >= 640) { setMobileHeight(null); return; }
      const imgEl = document.querySelector<HTMLImageElement>('[data-hero-slide] img');
      const ratio = (imgEl?.naturalHeight && imgEl?.naturalWidth) ? (imgEl.naturalHeight / imgEl.naturalWidth) : (536/800);
      const h = Math.round(window.innerWidth * ratio);
      setMobileHeight(Math.max(260, h));
    }
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  // Recompute desktop height once ratios known
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!ratiosRef.current.length) return;
    // Compute unified ratio using AVERAGE (daha dengeli görünüm için)
    const avgRatio = ratiosRef.current.reduce((a,b)=>a+b,0) / ratiosRef.current.length;
    const vw = window.innerWidth;
    const target = Math.min(Math.round(vw * (avgRatio || fallbackRatio)), Math.round(window.innerHeight * 0.85));
    setDesktopHeight(target);
    function handleResize(){
      const vw2 = window.innerWidth;
      const ratio = ratiosRef.current.length ? avgRatio : fallbackRatio;
      const t = Math.min(Math.round(vw2 * (ratio || fallbackRatio)), Math.round(window.innerHeight * 0.85));
      setDesktopHeight(t);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [fallbackRatio]);

  const handleImageNatural = useCallback((el: HTMLImageElement | null) => {
    if (!el) return;
    const r = el.naturalHeight && el.naturalWidth ? el.naturalHeight / el.naturalWidth : null;
    if (r && !ratiosRef.current.includes(r)) {
      ratiosRef.current.push(r);
    }
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      aria-label="Hero"
      style={mobileHeight ? { height: mobileHeight } : (desktopHeight ? { height: desktopHeight } : { height: '70vh' })}
    >
      <div className="absolute inset-0 overflow-hidden">
  {slides.map((s, i) => (
          <div
            key={s.src}
            data-hero-slide
            data-active={i === index || undefined}
            className={`absolute inset-0 transition-opacity duration-700 ease-out flex items-center justify-center px-0 ${i === index ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden={i !== index}
          >
            {/* Art direction: serve mobileSrc if provided for small screens */}
            {s.mobileSrc ? (
              <picture>
                <source media="(max-width:640px)" srcSet={s.mobileSrc} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src}
                  alt={s.alt}
                  className={`block w-full max-w-[1600px] h-auto object-cover object-center sm:w-full ${i === 1 ? 'lg:-translate-y-[10%]' : ''}`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  ref={handleImageNatural}
                />
              </picture>
            ) : (
              <div className="w-full flex items-center justify-center">
                <Image
                  src={s.src}
                  alt={s.alt}
                  priority={i === 0}
                  width={1600}
                  height={900}
                  sizes="100vw"
                  className={`w-full h-auto object-cover object-center max-w-[1600px] ${i === 1 ? 'lg:-translate-y-[10%]' : ''}`}
                  onLoadingComplete={(el) => handleImageNatural(el as unknown as HTMLImageElement)}
                />
              </div>
            )}
            {/* Overlay removed per request */}
          </div>
        ))}
      </div>

  {/* Center text & accent bar removed per request */}

      {email && (
        <div className="absolute bottom-6 left-6">
          <a href={`mailto:${email}`} className="text-brand-secondary hover:text-brand-secondary-hover transition-colors underline-offset-4 hover:underline">
            {email}
          </a>
        </div>
      )}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <button
          type="button"
          onClick={prev}
          className="h-10 w-10 inline-flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
          aria-label="Önceki slide"
        >
          <Icon name="chevron-left" />
        </button>
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Slide ${i + 1}`}
              aria-current={i === index}
              className={`h-2 w-2 rounded-full border transition-colors ${i === index ? 'bg-brand-yellow border-brand-yellow' : 'border-white/60 bg-white/40 hover:bg-white/70'}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          className="h-10 w-10 inline-flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
          aria-label="Sonraki slide"
        >
          <Icon name="chevron-right" />
        </button>
      </div>
    </section>
  );
}
