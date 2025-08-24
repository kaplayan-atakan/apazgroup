import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { isLocale } from '../../../../lib/i18n';
import { getAllNews, getPageBySlug } from '../../../../lib/content';
import { generateSeoMetadata } from '../../../../lib/seo';
import { ContentArticle } from '../../../../components/content/ContentArticle';

interface PageProps { params: { locale: string; slug: string } }

export function generateStaticParams() {
  const locales: Array<'tr' | 'en'> = ['tr', 'en'];
  return locales.flatMap((locale) =>
    getAllNews(locale).map((p) => ({ locale, slug: p.slug }))
  );
}

export function generateMetadata({ params }: PageProps): Metadata {
  const { locale, slug } = params;
  if (!isLocale(locale)) return {};
  const doc = getPageBySlug(locale, slug);
  if (!doc) return {};
  return generateSeoMetadata({
    title: doc.frontmatter.seo?.title || doc.frontmatter.title,
    description: doc.frontmatter.seo?.description || doc.frontmatter.excerpt || '',
    locale,
    slug: `haberler/${slug}`,
    type: 'article',
    imagePath: doc.frontmatter.image
  });
}

export default function HaberPage({ params }: PageProps) {
  const { locale, slug } = params;
  if (!isLocale(locale)) return notFound();
  const doc = getPageBySlug(locale, slug);
  if (!doc) return notFound();
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const pageUrl = `${base}/${locale}/haberler/${slug}`;
  const imageUrl = doc.frontmatter.image ? `${base}${doc.frontmatter.image}` : undefined;

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: doc.frontmatter.title,
            description: doc.frontmatter.excerpt || doc.frontmatter.description || '',
            datePublished: doc.frontmatter.date,
            inLanguage: locale,
            mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
            image: imageUrl ? [imageUrl] : undefined,
            publisher: {
              '@type': 'Organization',
              name: 'Apaz Group',
              logo: { '@type': 'ImageObject', url: `${base}/brand/logo--global.png` }
            },
            articleSection: 'Haberler'
          })
        }}
      />
      <ContentArticle locale={locale} slug={slug} />
    </>
  );
}
