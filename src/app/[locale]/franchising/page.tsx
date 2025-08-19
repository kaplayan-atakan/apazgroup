import Image from 'next/image';
import type { Metadata } from 'next';

import { t } from '../../../lib/i18n-dict';
import type { Locale } from '../../../lib/i18n';
import { isLocale, defaultLocale } from '../../../lib/i18n';
import { getPageBySlug } from '../../../lib/content';
import { ContentArticle } from '../../../components/content/ContentArticle';
import blurMap from '../../../lib/asset-blur-map.json';

interface PageProps { params: { locale: string } }
const BM = blurMap as Record<string, string>;

export function generateMetadata({ params }: PageProps): Metadata {
  const slug = 'franchising';
  const { locale } = params;
  if (!isLocale(locale)) return {};
  const page = getPageBySlug(locale, slug);
  if (!page) return {};
  const title = page.frontmatter.seo?.title || page.frontmatter.title;
  const description = page.frontmatter.seo?.description;
  const isFallback = locale !== defaultLocale && page.locale === defaultLocale;
  const urlPath = `/${locale}/${slug}`;
  const altLangs: Record<string, string> = { 'tr-TR': `/tr/${slug}` };
  if (locale === 'tr') {
    altLangs['en-US'] = `/en/${slug}`;
  } else {
    altLangs['en-US'] = `/en/${slug}`;
    altLangs['tr-TR'] = `/tr/${slug}`;
  }
  return {
    title,
    description,
    alternates: { canonical: urlPath, languages: altLangs },
    openGraph: { title, description, url: urlPath, type: 'article' },
    robots: isFallback ? { index: false, follow: true } : undefined
  };
}

export default function FranchisingPage({ params }: PageProps) {
  const { locale } = params;
  return (
    <main className="mx-auto max-w-5xl py-10">
      <section className="not-prose">
        <div className="relative w-full h-40 sm:h-56 md:h-64 lg:h-72 rounded overflow-hidden ring-1 ring-slate-200 bg-slate-100">
          <Image
            src="/brands/baydoner-banner--about.png"
            alt={t(locale as unknown as Locale,'alt.franchisingBanner','Franchising banner')}
            fill
            priority={false}
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
            placeholder={BM['/brands/baydoner-banner--about.png'] ? 'blur' : undefined}
            blurDataURL={BM['/brands/baydoner-banner--about.png']}
          />
        </div>
      </section>
      <div className="mt-8">
        <ContentArticle locale={locale} slug="franchising" />
      </div>
    </main>
  );
}
