"use client";

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { Icon } from '../../ui/Icon';

// New minimal API
export interface HomeHeroSlide {
  src: string;
  alt: string;
  href?: string;
  openInNewTab?: boolean;
}
interface HomeHeroSliderProps {
  slides: HomeHeroSlide[];
  intervalMs?: number;
  /**
   * Eski davranış: tam genişlik ve cover kırpma.
   * Bu düzeltmede görsellerin doğal boyutu korunacak (1110x400) ve slider bu orana göre konumlanacak.
   * İleride ihtiyaç olursa tekrar fullBleed varyantı eklenebilir.
   */
  constrainToIntrinsic?: boolean; // default true
}

export function HomeHeroSlider({ slides, intervalMs = 6000, constrainToIntrinsic = true }: HomeHeroSliderProps) {
  const [index, setIndex] = useState(0);
  const go = useCallback((n: number) => setIndex(() => (n + slides.length) % slides.length), [slides.length]);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), intervalMs);
    return () => clearInterval(id);
  }, [slides.length, intervalMs]);

  if (!slides.length) return null;

  // Intrinsic slider ölçüleri: 1110 x 400 (aspect ~ 2.775)
  // constrainToIntrinsic true ise: max genişlik 1110px, aspect ratio korunur, image object-contain ile KIRPMA olmaz.
  // false ise eski tam genişlik cover davranışına (geçici olarak) geri döner.
  const intrinsicWrapper = 'relative w-full max-w-[1110px] mx-auto aspect-[1110/400] px-2 sm:px-0';
  // Full-width but maintain intrinsic aspect ratio and contain the image (no cropping)
  const fullBleedWrapper = 'relative w-full aspect-[1110/400]';
  const wrapperClass = constrainToIntrinsic ? intrinsicWrapper : fullBleedWrapper;

  return (
  <section className={`group/slider ${wrapperClass} overflow-hidden`} aria-roledescription="carousel" aria-label="Hero slider">
      {/* Slides */}
      <ul className="absolute inset-0 h-full list-none m-0 p-0" aria-live="off">
        {slides.map((s, i) => {
          const active = i === index;
          const imageEl = (
            <Image
              src={s.src}
              alt={s.alt}
              fill
              quality={90}
              priority={i === 0}
              sizes={constrainToIntrinsic ? '(max-width: 1110px) 100vw, 1110px' : '100vw'}
              className={constrainToIntrinsic ? 'object-contain object-center select-none' : 'object-contain object-center select-none'}
            />
          );
          return (
            <li
              key={s.src}
              className={`absolute inset-0 transition-opacity duration-700 ease-out will-change-opacity ${active ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} bg-black/5`}
              aria-hidden={!active}
            >
              {s.href ? (
                <a
                  href={s.href}
                  target={s.openInNewTab === false ? undefined : '_blank'}
                  rel={s.openInNewTab === false ? undefined : 'noopener noreferrer'}
                  className="block focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow/70 w-full h-full relative"
                  aria-label={s.alt}
                >
                  {imageEl}
                </a>
              ) : (
                <div className="w-full h-full relative">{imageEl}</div>
              )}
              {/* No gradient overlay in full-width contain mode to avoid darkening letterbox areas */}
            </li>
          );
        })}
      </ul>

      {/* Visible controls */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2 md:px-4">
        <button
          type="button"
            onClick={prev}
            aria-label="Önceki"
            className="pointer-events-auto h-11 w-11 md:h-12 md:w-12 rounded-full bg-white/70 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow/60"
        >
          <Icon name="chevron-left" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Sonraki"
          className="pointer-events-auto h-11 w-11 md:h-12 md:w-12 rounded-full bg-white/70 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow/60"
        >
          <Icon name="chevron-right" />
        </button>
      </div>

      {/* Indicators */}
  <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => go(i)}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-yellow ${i === index ? 'bg-brand-yellow scale-110' : 'bg-white/60 hover:bg-white/90'} shadow`}
          />
        ))}
      </div>
    </section>
  );
}
