import Link from 'next/link';
import type { Route } from 'next';
import Image from 'next/image';

import { getAllNews } from '../../lib/content';

type Props = { locale: string };

export function HomeAboutNews({ locale }: Props) {
  const withLocale = (path: string) => (path === '/' ? `/${locale}` : `/${locale}${path}`);
  // Get all news items for horizontal scroll
  const allNews = getAllNews(locale);
  const news = allNews.slice(0, 8); // Show more items since it's scrollable

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-slate-50/30 via-white to-slate-50/20 transition-all duration-700">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-700">
          Haberler
        </h2>
        <div className="mx-auto mt-4 h-1 w-24 bg-gradient-to-r from-brand-secondary via-brand-accent to-brand-secondary rounded-full animate-in fade-in slide-in-from-bottom-2 duration-700 delay-150" aria-hidden="true" />
        
        {/* Horizontal scrollable container */}
        <div className="mt-12 md:mt-16 overflow-x-auto overflow-y-hidden -mx-4 px-4 pb-4">
          <div className="flex gap-6 md:gap-8" style={{ width: 'max-content' }}>
            {news.map((item) => {
              const href = withLocale(`/haberler/${item.slug}`) as Route;
              const imageUrl = item.frontmatter?.image || '/news/placeholder.jpg';
              const title = item.frontmatter?.title || 'Haber Başlığı';
              const excerpt = item.frontmatter?.excerpt || '';
              const dateStr = item.frontmatter?.date;
              
              return (
                <article
                  key={item.slug}
                  className="group rounded-xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] ring-2 ring-brand-bronze-200/50 hover:ring-brand-secondary/50 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex-shrink-0"
                  style={{ width: 'min(350px, 90vw)' }}
                >
                  <Link href={href} className="block">
                    <div className="relative w-full aspect-[4/3] bg-slate-100 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        sizes="350px"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-brand-bronze-900/20 via-transparent to-transparent" aria-hidden="true" />
                    </div>
                    <div className="p-4">
                      {dateStr && (
                        <time className="text-xs uppercase tracking-wide text-brand-accent font-medium">
                          {new Date(dateStr).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                      )}
                      <h3 className="mt-1 text-base font-bold leading-snug text-brand-primary line-clamp-2">
                        {title}
                      </h3>
                      {excerpt && (
                        <p className="mt-2 text-sm text-slate-600 line-clamp-3">{excerpt}</p>
                      )}
                      <span className="mt-3 inline-flex items-center text-sm font-semibold text-brand-primary group-hover:text-brand-secondary transition-colors">
                        Habere git <span className="ml-1" aria-hidden>→</span>
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>

        {/* "Tüm Haberler" link */}
        <div className="mt-8 flex justify-center">
          <Link
            href={withLocale('/haberler') as Route}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-secondary transition-colors"
          >
            Tüm Haberler
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

