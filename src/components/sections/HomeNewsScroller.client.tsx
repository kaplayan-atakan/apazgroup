"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import { useRef, useState, useEffect } from 'react';

export interface HomeNewsScrollerItem { slug: string; title: string; excerpt: string; image: string }

export function HomeNewsScroller({ locale, items }: { locale: string; items: HomeNewsScrollerItem[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const update = () => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    update();
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => update();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollByAmount = (dir: 1 | -1) => {
    const el = containerRef.current;
    if (!el) return;
    const amount = Math.min(480, el.clientWidth * 0.9);
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <div className="relative" aria-label="Güncel Haberler" role="region">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold tracking-wide text-slate-900 uppercase">Güncel Haberler</h4>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollByAmount(-1)}
            disabled={!canScrollLeft}
            aria-label="Geri"
            className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount(1)}
            disabled={!canScrollRight}
            aria-label="İleri"
            className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
          >
            →
          </button>
        </div>
      </div>
      <div
        ref={containerRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mb-4 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent"
        tabIndex={0}
      >
  {items.map((item, idx) => {
          const href = `/${locale}/haberler/${item.slug}`;
          return (
            <Link
              key={item.slug}
              href={href as Route}
              className="group relative flex-shrink-0 w-[260px] h-[360px] snap-start rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-yellow overflow-hidden flex flex-col"
            >
              <div className="relative w-full aspect-[4/3] bg-slate-100">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="260px"
        className={`object-cover transition-transform duration-300 ${idx === 0 || idx === 2 ? 'scale-[1.05] group-hover:scale-[1.09]' : 'group-hover:scale-[1.04]'}`}
                    loading="lazy"
                  />
                )}
                {/* Removed overlay for a cleaner image presentation */}
              </div>
              <div className="p-4 flex flex-col gap-3 flex-1">
                <h5 className="text-xs font-semibold leading-snug line-clamp-3 text-slate-900 group-hover:text-brand-primary transition-colors">{item.title}</h5>
                <p className="text-[11px] text-slate-600 line-clamp-4">{item.excerpt}</p>
                <span className="mt-auto text-[10px] font-semibold text-brand-primary inline-flex items-center gap-1 tracking-wide uppercase">Oku →</span>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="mt-6 flex justify-end">
        <Link href={`/${locale}/haberler` as Route} className="text-xs font-semibold text-brand-primary hover:underline inline-flex items-center gap-1">
          Tüm Haberler
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
