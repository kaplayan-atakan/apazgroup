import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getAllPages, getPageBySlug } from '../../../lib/content';
import { isLocale, defaultLocale } from '../../../lib/i18n';
import { normalizeSlug } from '../../../lib/slug';
import { generateSeoMetadata, generateArticleSchema } from '../../../lib/seo';
import { ContentArticle } from '../../../components/content/ContentArticle';

interface PageProps {
  params: { locale: string; slug: string };
}

export function generateStaticParams() {
  const locales = ['tr','en'];
  const excluded = new Set([
    'haberler',
    'kurumsal-sosyal-sorumluluk-politikasi',
    'franchising',
    'bize-katilin',
    'basvuru-formu',
    'iletisim',
    'seffaflik-ve-hesap-verebilirlik'
  ]);
  return locales.flatMap(locale =>
    getAllPages(locale)
      .filter(p => !excluded.has(p.slug))
      .map(p => ({ locale, slug: p.slug }))
  );
}

export function generateMetadata({ params }: PageProps): Metadata {
  const { locale } = params;
  const slug = normalizeSlug(params.slug);
  
  if (!isLocale(locale)) return {};
  
  if (slug === 'haberler' || slug === 'kurumsal-sosyal-sorumluluk-politikasi' || slug === 'franchising' || slug === 'bize-katilin' || slug === 'basvuru-formu' || slug === 'iletisim' || slug === 'seffaflik-ve-hesap-verebilirlik') {
    // Dedicated static page handles /haberler; dynamic route should not override.
    return {};
  }
  const page = getPageBySlug(locale, slug);
  if (!page) return {};
  
  const title = page.frontmatter.seo?.title || page.frontmatter.title;
  const description = page.frontmatter.seo?.description || '';
  
  // Check if this is a fallback (using TR content for EN page)
  const isFallback = locale !== defaultLocale && page.locale === defaultLocale;
  
  // Find a featured image if available in the page content
  let imagePath: string | undefined;
  // Try to find a hero section with image or a brand teaser with image
  const heroSection = page.sections.find(s => s.type === 'heroSimple' && s.image);
  const brandSection = page.sections.find(s => s.type === 'brandTeaser' && s.images?.[0]);
  
  if (heroSection && 'image' in heroSection) {
    imagePath = heroSection.image;
  } else if (brandSection && 'images' in brandSection && brandSection.images?.[0]) {
    imagePath = brandSection.images[0];
  }

  // Get image path from frontmatter SEO settings, or use the section image if available
  const finalImagePath = page.frontmatter.seo?.image || imagePath;
  
  // Keywords from SEO settings or default empty array
  const keywords = page.frontmatter.seo?.keywords || [];
  
  // Generate standard SEO metadata
  const metadata = generateSeoMetadata({
    title,
    description,
    locale,
    slug,
    imagePath: finalImagePath,
    type: 'article',
    noIndex: isFallback, // No index for fallback content
    keywords
  });

  // Add structured data for this article
  const structuredData = generateArticleSchema({
    title,
    description,
    slug,
    locale
  });
  
  // Add the structured data to the metadata
  if (!metadata.other) metadata.other = {};
  metadata.other['script:ld+json'] = JSON.stringify(structuredData);

  return metadata;
}

export default function ContentPage({ params }: PageProps) {
  const { locale } = params;
  const slug = normalizeSlug(params.slug);
  if (slug === 'haberler' || slug === 'kurumsal-sosyal-sorumluluk-politikasi' || slug === 'franchising' || slug === 'bize-katilin' || slug === 'basvuru-formu' || slug === 'iletisim' || slug === 'seffaflik-ve-hesap-verebilirlik') {
    redirect(`/${locale}/${slug}`);
  }
  return <ContentArticle locale={locale} slug={slug} />;
}
