import { Suspense } from 'react';
import Link from 'next/link';
import type { Route } from 'next';

import { getAllNews } from '../../lib/content';
import { HomeNewsScroller } from './HomeNewsScroller.client';

type Props = { locale: string };

export function HomeAboutNews({ locale }: Props) {
  const withLocale = (path: string) => (path === '/' ? `/${locale}` : `/${locale}${path}`);
  // Get latest 8 internal news items (already sorted desc by date)
  const news = getAllNews(locale).slice(0, 8);
  const aboutHref = withLocale('/hakkimizda') as Route;

  return (
    <section
      className="relative py-8 md:py-16 bg-gradient-to-br from-white via-slate-50 to-slate-100 overflow-hidden
                 before:content-[''] before:absolute before:inset-0 before:pointer-events-none
                 before:bg-[radial-gradient(circle_at_1px_1px,theme(colors.slate.200)_1px,transparent_0)] before:opacity-60
                 before:[background-size:26px_26px]"
      aria-label="Apaz Hakkında ve Güncel Haberler"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Apaz Hakkında */}
          <div className="lg:col-span-4">
            <div className="mb-4">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                Apaz <span className="text-brand-yellow">Hakkında</span>
              </h3>
              <span aria-hidden className="mt-2 inline-block h-1 w-16 bg-brand-yellow" />
            </div>
            <div className="space-y-4 text-slate-700">
              <p>
                2007 yılında İzmir’de kurulan Apaz Group, faaliyetlerine ilk olarak <b>Baydöner</b> markası ile başladı. O günden bugüne çalışmalarına ara vermeden devam eden Apaz Group, Baydöner ile Türkiye’nin dört bir yanında büyürken, yeme içme sektörüne 2 yeni marka kazandırdı
                <ul className="list-disc pl-5">
                  <li>2018 yılında PidebyPide,</li>
                  <li>2019 yılında ise Bursa İshakbey markaları Apaz Group çatısı altında misafirlerini ağırlamaya başladı.</li>
                </ul>
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href={aboutHref}
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-yellow to-amber-300 px-5 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-amber-200/60 hover:shadow-md hover:from-amber-300 hover:to-brand-yellow focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-yellow transition-all"
                >
                  Devamı
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Latest News (8) horizontal scroller */}
          <div className="lg:col-span-8">
            <Suspense>
              <HomeNewsScroller locale={locale} items={news.map(n => ({
                slug: n.slug,
                title: n.frontmatter.title,
                excerpt: n.frontmatter.excerpt || '',
                image: n.frontmatter.image || ''
              }))} />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}

// client component imported above

