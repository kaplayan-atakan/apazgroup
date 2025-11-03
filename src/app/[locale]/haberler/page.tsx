import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { HeroGradient } from '../../../components/hero/HeroGradient';
import { isLocale } from '../../../lib/i18n';
import { generateSeoMetadata } from '../../../lib/seo';
import { getAllNews } from '../../../lib/content';
import blurMap from '../../../lib/asset-blur-map.json';

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
    <main>
      <HeroGradient
        heading="Haberler"
        intro="Şirketimiz ve markalarımız ile ilgili güncel gelişmeler."
        minHeights={{ base: 'min-h-[200px]', md: 'md:min-h-[230px]', lg: 'lg:min-h-[250px]' }}
        contentClassName="max-w-4xl"
      />
      <section className="py-6">
        <div className="max-w-6xl mx-auto px-6 grid gap-10 md:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {news.map(item => {
            const href = `/${locale}/haberler/${item.slug}`; // typedRoutes experimental: treat as dynamic string
            const img = item.frontmatter.image;
            return (
              <Link
                key={item.slug}
                // @ts-expect-error experimental typedRoutes dynamic
                href={href}
                className="group rounded-xl ring-1 ring-slate-200 bg-white shadow-sm hover:shadow-md transition focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow/60 overflow-hidden flex flex-col"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="text-lg font-semibold tracking-tight group-hover:text-brand-primary transition-colors">{item.frontmatter.title}</h2>
                  {item.frontmatter.date && <time className="mt-1 text-xs text-slate-500" dateTime={item.frontmatter.date}>{item.frontmatter.date}</time>}
                  {item.frontmatter.excerpt && <p className="mt-3 text-sm text-slate-600 line-clamp-4">{item.frontmatter.excerpt}</p>}
                  <span className="mt-4 inline-flex items-center text-[11px] font-semibold uppercase tracking-wide text-brand-primary">Haberi Oku →</span>
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
