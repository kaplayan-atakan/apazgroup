"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import type { Route } from 'next';

import blurMap from '../../../../lib/asset-blur-map.json';
import type { PageDocument, Section } from '../../../../lib/content/schemas';
import { PersonCard } from '../../../../components/cards/PersonCard';
import { normalizeSlug } from '../../../../lib/slug';
import { usePageOptimizations } from '../../../../lib/usePageOptimizations';

interface YonetimPageContentProps {
  people: PageDocument[];
  locale: string;
}

export function YonetimPageContent({ people, locale }: YonetimPageContentProps) {
  // Use the optimization hook for prefetching related routes
  usePageOptimizations(locale, 'yonetim');
  
  return (
    <>
      {/* Hero */}
  <section className="relative w-full min-h-[200px] md:min-h-[240px] lg:min-h-[280px] flex items-center">
        <Image
          src="/team/levent-yilmaz--yonetim.jpg"
          alt="Yönetim"
          fill
          sizes="100vw"
          priority={true} // LCP görseli için öncelikli yükleme
          className="object-cover"
          placeholder={blurMap['/team/levent-yilmaz--yonetim.jpg'] ? 'blur' : undefined}
          blurDataURL={(blurMap as Record<string, string>)['/team/levent-yilmaz--yonetim.jpg']}
        />
        <div className="absolute inset-0 bg-black/40" />
  <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-16 text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Yönetim</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Yönetim Ekibimiz</h2>
          <p className="text-slate-700">
            Apaz Group&apos;un deneyimli yönetim kadrosu, sektördeki engin tecrübe ve bilgi birikimiyle
            markalarımızı başarıya taşıyor.
          </p>
        </div>
      </section>

      {/* Grid */}
      <Suspense fallback={
        <div className="py-6 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-80 bg-slate-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      }>
        <section className="py-6">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {people.map((p) => {
              const slug = normalizeSlug(p.slug);
              const hero = p.sections.find((s: Section): s is Extract<Section, { type: 'heroSimple' }> => s.type === 'heroSimple');
              const href = `/${locale}/hakkimizda/yonetim/${slug}` as Route;
              return (
                <PersonCard
                  key={p.slug}
                  image={hero?.image || '/team/levent-yilmaz--yonetim.jpg'}
                  name={p.frontmatter.title}
                  role={p.frontmatter.role}
                  description={p.frontmatter.description}
                  href={href}
                />
              );
            })}
          </div>
        </section>
      </Suspense>

      {/* Footer CTA */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-4">Apaz Group Hakkında Daha Fazla Bilgi</h3>
          <p className="text-slate-700 mb-6">Şirketimiz, değerlerimiz ve vizyonumuz hakkında daha fazla bilgi için hakkımızda sayfasını ziyaret edin.</p>
          <Link 
            href={`/${locale}/hakkimizda` as Route} 
            className="inline-flex items-center rounded-md bg-black px-4 py-2 text-white hover:bg-slate-800 transition-colors"
            prefetch={true}
          >
            <span>Apaz Group Hakkında</span>
            <span className="ml-2">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
