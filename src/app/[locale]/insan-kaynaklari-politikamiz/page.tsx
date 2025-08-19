import type { Metadata } from 'next';

import { isLocale, defaultLocale } from '../../../lib/i18n';
import { getPageBySlug } from '../../../lib/content';
import { ContentArticle } from '../../../components/content/ContentArticle';

interface PageProps {
  params: { locale: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const slug = 'insan-kaynaklari-politikamiz';
  const { locale } = params;
  if (!isLocale(locale)) return {};
  const page = getPageBySlug(locale, slug);
  if (!page) return {};
  const title = page.frontmatter.seo?.title || page.frontmatter.title;
  const description = page.frontmatter.seo?.description;
  const isFallback = locale !== defaultLocale && page.locale === defaultLocale;
  const urlPath = `/${locale}/${slug}`;
  const altLangs: Record<string, string> = {
    'tr-TR': `/tr/${slug}`
  };
  if (locale === 'tr') {
    altLangs['en-US'] = `/en/${slug}`;
  } else {
    altLangs['en-US'] = `/en/${slug}`;
    altLangs['tr-TR'] = `/tr/${slug}`;
  }
  return {
    title,
    description,
    alternates: {
      canonical: urlPath,
      languages: altLangs
    },
    openGraph: {
      title,
      description,
      url: urlPath,
      type: 'article'
    },
    robots: isFallback ? { index: false, follow: true } : undefined
  };
}

export default async function IKPage({ params }: PageProps) {
  const { locale } = params;
  return <ContentArticle locale={locale} slug="insan-kaynaklari-politikamiz" />;
}
