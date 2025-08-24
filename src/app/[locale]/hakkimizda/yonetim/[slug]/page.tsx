import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ContentArticle } from '../../../../../components/content/ContentArticle';
import { generateSeoMetadata } from '../../../../../lib/seo';
import { isLocale, defaultLocale } from '../../../../../lib/i18n';
import { getManagementPeople, getPageBySlug } from '../../../../../lib/content';
import { normalizeSlug } from '../../../../../lib/slug';

export const dynamic = 'force-static';

type Props = { params: { locale: string; slug: string } };

export function generateStaticParams() {
  // Pre-render TR profiles and EN fallbacks using TR slugs
  const trPeople = getManagementPeople('tr');
  const trParams = trPeople.map(p => ({ locale: 'tr', slug: p.slug }));
  const enParams = trPeople.map(p => ({ locale: 'en', slug: p.slug }));
  return [...trParams, ...enParams];
}

export function generateMetadata({ params }: Props): Metadata {
  const { locale } = params;
  const slug = normalizeSlug(params.slug);
  if (!isLocale(locale)) return {};
  const doc = getPageBySlug(locale, slug);
  if (!doc) return {};
  const title = doc.frontmatter.seo?.title || doc.frontmatter.title || 'Yönetim';
  const description = doc.frontmatter.seo?.description || doc.frontmatter.description || '';
  const isFallback = locale !== defaultLocale && doc.locale === defaultLocale;
  return generateSeoMetadata({
    title: `${title} | Yönetim | Apaz Group`,
    description,
    locale,
    slug: `hakkimizda/yonetim/${slug}`,
    type: 'article',
    noIndex: isFallback
  });
}

export default function Page({ params }: Props) {
  const { locale } = params;
  const slug = normalizeSlug(params.slug);
  if (!isLocale(locale)) return notFound();
  const doc = getPageBySlug(locale, slug);
  if (!doc) return notFound();
  return <ContentArticle locale={locale} slug={slug} />;
}
