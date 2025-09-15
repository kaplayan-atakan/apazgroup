import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { generateSeoMetadata } from '../../../../../lib/seo';
import { isLocale, defaultLocale } from '../../../../../lib/i18n';
import { getManagementPeople, getPageBySlug } from '../../../../../lib/content';
import { normalizeSlug } from '../../../../../lib/slug';
import { markdownToHtml } from '../../../../../lib/content/markdown';
import { ManagementProfileClient } from '../../../../../components/profiles/ManagementProfileClient';

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

export default async function Page({ params }: Props) {
  const { locale } = params;
  const slug = normalizeSlug(params.slug);
  if (!isLocale(locale)) return notFound();
  const doc = getPageBySlug(locale, slug);
  if (!doc) return notFound();

  // Expect first section to be imageProse for management profiles; fall back gracefully
  type ImageProseSection = { type: 'imageProse'; image: string; alt?: string; body: string };
  const firstImageProse = doc.sections.find(
    (s): s is ImageProseSection => s.type === 'imageProse' && 'image' in s && 'body' in s
  );
  const portraitImage = firstImageProse?.image;
  const portraitAlt = firstImageProse?.alt || doc.frontmatter.title;
  const bodyMarkdown = firstImageProse?.body || '';

  const remainingSections = doc.sections.filter(s => s !== firstImageProse);
  const bodyHtml = await markdownToHtml(bodyMarkdown);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const canonical = `${siteUrl}/${locale}/hakkimizda/yonetim/${slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: doc.frontmatter.title,
            jobTitle: doc.frontmatter.role,
            image: portraitImage ? `${siteUrl}${portraitImage}` : undefined,
            url: canonical
          })
        }}
      />
      <ManagementProfileClient
        locale={locale}
        title={doc.frontmatter.title}
        role={doc.frontmatter.role}
        description={doc.frontmatter.description}
        portraitImage={portraitImage}
        portraitAlt={portraitAlt}
        bodyHtml={bodyHtml}
        remaining={remainingSections as Array<{ type: 'prose'; body: string } | { type: 'list'; items: string[] } | { type: 'quote'; text: string; cite?: string }>}
      />
    </>
  );
}
