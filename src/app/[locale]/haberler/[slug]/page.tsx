import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { isLocale } from '../../../../lib/i18n';
import { getAllNews, getPageBySlug } from '../../../../lib/content';
import { generateSeoMetadata } from '../../../../lib/seo';
import { markdownToHtml } from '../../../../lib/content/markdown';
import blurMap from '../../../../lib/asset-blur-map.json';

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

export default async function HaberPage({ params }: PageProps) {
  const { locale, slug } = params;
  if (!isLocale(locale)) return notFound();
  const doc = getPageBySlug(locale, slug);
  if (!doc) return notFound();
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const pageUrl = `${base}/${locale}/haberler/${slug}`;
  const imageUrl = doc.frontmatter.image ? `${base}${doc.frontmatter.image}` : undefined;
  // Collect prose sections and split into logical paragraphs (blank line => new paragraph).
  const proseSections = doc.sections.filter((s): s is { type: 'prose'; body: string } => s.type === 'prose');
  const paragraphMdBlocks: string[] = [];
  for (const sec of proseSections) {
    // Split on 2+ newlines first; if author used only single newlines, fall back to single newline split while preserving markdown.
    const trimmed = sec.body.trim();
    if (!trimmed) continue;
    let parts = trimmed.split(/\n{2,}/); // standard paragraphs
    if (parts.length === 1) {
      // No blank lines used; split on single newline but keep contiguous lines together if very short.
      parts = trimmed.split(/\n+/);
    }
    for (const p of parts) {
      const clean = p.trim();
      if (clean) paragraphMdBlocks.push(clean);
    }
  }
  const paragraphHtml: string[] = [];
  for (const block of paragraphMdBlocks) {
    paragraphHtml.push(await markdownToHtml(block));
  }

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
      <main className="py-10 md:py-16 bg-gradient-to-br from-white via-slate-50 to-slate-100">
        <article className="max-w-6xl mx-auto px-6">
          {/* Breadcrumb */}
            <nav className="text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1">
                <li>
                  <Link href={`/${locale}`} className="hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow rounded px-1">Anasayfa</Link>
                </li>
                <li className="opacity-60">/</li>
                <li>
                  <Link href={`/${locale}/haberler`} className="hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow rounded px-1">Haberler</Link>
                </li>
                <li className="opacity-60">/</li>
                <li className="font-medium text-slate-700 truncate max-w-[180px] md:max-w-[360px]" aria-current="page">{doc.frontmatter.title}</li>
              </ol>
            </nav>
          <div className="grid gap-10 md:gap-14 md:grid-cols-12 items-start">
            {/* Left: Image */}
            {doc.frontmatter.image && (
              <div className="md:col-span-5 lg:col-span-5">
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow ring-1 ring-slate-200 bg-slate-100">
                  <Image
                    src={doc.frontmatter.image}
                    alt={doc.frontmatter.title}
                    fill
                    sizes="(min-width:1024px) 40vw, 100vw"
                    className="object-cover"
                    priority
                    placeholder={blurMap[doc.frontmatter.image as keyof typeof blurMap] ? 'blur' : undefined}
                    blurDataURL={(blurMap as Record<string,string>)[doc.frontmatter.image]}
                  />
                </div>
              </div>
            )}
            {/* Right: Content */}
            <div className={doc.frontmatter.image ? 'md:col-span-7 lg:col-span-7' : 'md:col-span-12'}>
              <header>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-primary leading-tight">{doc.frontmatter.title}</h1>
                {doc.frontmatter.excerpt && (
                  <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-prose">{doc.frontmatter.excerpt}</p>
                )}
              </header>
              <div className="mt-8 space-y-6">
                {paragraphHtml.map((html, idx) => (
                  <div
                    key={idx}
                    className="prose prose-slate max-w-none leading-relaxed [&_p]:my-0 [&_strong]:text-slate-900"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                ))}
              </div>
              <div className="mt-10 pt-6 border-t flex justify-between text-sm text-slate-500">
                <Link href={`/${locale}/haberler`} className="font-medium text-brand-primary hover:underline">← Tüm Haberler</Link>
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}

// Small helper server component for rendering markdown asynchronously
// (Legacy helper removed: paragraphs now handled inline)
