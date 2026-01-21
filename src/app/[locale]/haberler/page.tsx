import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { HeroGradient } from '../../../components/hero/HeroGradient';
import { isLocale } from '../../../lib/i18n';
import { generateSeoMetadata } from '../../../lib/seo';
import { getAllNews } from '../../../lib/content';
import blurMap from '../../../lib/asset-blur-map.json';
import { formatDateTR } from '../../../lib/date';

interface PageProps { params: { locale: string } }

export function generateStaticParams() { return [{ locale: 'tr' }, { locale: 'en' }]; }

export function generateMetadata({ params }: PageProps): Metadata {
  const { locale } = params;
  if (!isLocale(locale)) return {};
  return generateSeoMetadata({
    title: 'Haberler | Apaz Group',
    description: 'Şirketimiz ve markalarımızla ilgili en güncel haberler.',
    locale,
    slug: 'haberler',
    type: 'website'
  });
}

export default function HaberlerPage({ params }: PageProps) {
  const { locale } = params;
  if (!isLocale(locale)) return null;
  const news = getAllNews(locale);

  return (
    <main className="min-h-dvh">
      <HeroGradient
  heading="Haberler"
  headingClassName="text-brand-primary"
        intro="Şirketimiz ve markalarımız ile ilgili güncel gelişmeler."
        minHeights={{ base: 'min-h-[200px]', md: 'md:min-h-[230px]', lg: 'lg:min-h-[250px]' }}
        contentClassName="max-w-4xl"
      />
      <section className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-6 grid gap-10 md:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {news.map(item => {
            const href = `/${locale}/haberler/${item.slug}`; // typedRoutes experimental: treat as dynamic string
            const img = item.frontmatter.image;
            return (
              <Link
                key={item.slug}
                // @ts-expect-error experimental typedRoutes dynamic
                href={href}
                className="group rounded-xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] ring-2 ring-brand-bronze-200/50 hover:ring-brand-secondary/50 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-secondary/60 flex flex-col"
              >
                {img && (
                  <div className="relative w-full aspect-[16/9] bg-slate-100">
                    <Image
                      src={img}
                      alt={item.frontmatter.title}
                      fill
                      sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      placeholder={blurMap[img as keyof typeof blurMap] ? 'blur' : undefined}
                      blurDataURL={(blurMap as Record<string,string>)[img]}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/50 via-brand-bronze-900/20 to-transparent" />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="text-lg font-bold tracking-tight text-brand-primary group-hover:text-brand-secondary transition-colors">{item.frontmatter.title}</h2>
                  {item.frontmatter.date && (
                    <time className="mt-1 text-xs text-brand-accent font-medium" dateTime={item.frontmatter.date}>
                      {formatDateTR(item.frontmatter.date)}
                    </time>
                  )}
                  {item.frontmatter.excerpt && <p className="mt-3 text-sm text-slate-700 line-clamp-4">{item.frontmatter.excerpt}</p>}
                  <span className="mt-4 inline-flex items-center text-[11px] font-bold uppercase tracking-wide text-brand-secondary group-hover:text-brand-accent">Haberi Oku →</span>
                </div>
              </Link>
            );
          })}
          {news.length === 0 && (
            <div className="col-span-full text-center text-slate-500 text-sm py-16">Henüz haber eklenmedi.</div>
          )}
        </div>
      </section>
  </main>
  );
}
