import { notFound } from 'next/navigation';
import Image from 'next/image';

import { HeroGradient } from '../hero/HeroGradient';
import { getPageBySlug } from '../../lib/content';
import { markdownToHtml } from '../../lib/content/markdown';
import { isLocale } from '../../lib/i18n';
import { getPageAssetsForSlug } from '../../lib/pageAssets';
import blurMap from '../../lib/asset-blur-map.json';

export async function ContentArticle({ locale, slug }: { locale: string; slug: string }) {
  if (!isLocale(locale)) {
    return notFound();
  }
  const page = getPageBySlug(locale, slug);
  if (!page) {
    return notFound();
  }
  const mappedAssets = getPageAssetsForSlug(slug);
  const hasHero = page.sections.some(s => s.type === 'heroSimple');
  const heroSections = page.sections.filter(s => s.type === 'heroSimple');
  const contentSections = page.sections.filter(s => s.type !== 'heroSimple');

  return (
    <>
      {/* Hero(s) via reusable HeroGradient */}
      {heroSections.map((s, i) => {
        const hero = s as Extract<typeof s, { type: 'heroSimple' } & { heading: string; intro?: string; image?: string }>;
        return (
        <HeroGradient
          key={`hero-${i}`}
          heading={hero.heading}
          intro={hero.intro}
          imageSrc={hero.image}
          imageAlt={hero.heading}
          // Slightly larger minHeights for article hero to differentiate from small internal heroes
          minHeights={{ base: 'min-h-[220px]', md: 'md:min-h-[280px]', lg: 'lg:min-h-[340px]' }}
          radialPosition="circle_at_30%_30%"
          contentClassName="text-center"
          priorityImage={i === 0}
        />
        );
      })}

      <article className="prose prose-slate mx-auto max-w-4xl py-10">
        {!hasHero && <h1>{page.frontmatter.title}</h1>}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: page.frontmatter.title,
            inLanguage: locale,
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/${locale}/${slug}`
          })
        }}
      />
  {await Promise.all(contentSections.map(async (s, i) => {
        switch (s.type) {
          case 'prose': {
            const html = await markdownToHtml(s.body);
            return <div key={i} dangerouslySetInnerHTML={{ __html: html }} />;
          }
          case 'imageProse': {
            const rightHtml = await markdownToHtml(s.body);
            return (
              <div key={i} className="not-prose grid md:grid-cols-2 gap-8 items-start">
                <div className="relative w-full aspect-[5/6] rounded-lg overflow-hidden ring-1 ring-slate-200 bg-slate-100">
                  <Image
                    src={s.image}
                    alt={s.alt || ''}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                    placeholder={blurMap[s.image as keyof typeof blurMap] ? 'blur' : undefined}
                    blurDataURL={(blurMap as Record<string, string>)[s.image]}
                  />
                </div>
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: rightHtml }} />
              </div>
            );
          }
          case 'list':
            return (
              <ul key={i} className="list-disc ml-6">
                {s.items.map(item => <li key={item}>{item}</li>)}
              </ul>
            );
          case 'split': {
            const leftHtml = await markdownToHtml(s.left);
            const rightHtml = s.right ? await markdownToHtml(s.right) : '';
            return (
              <div key={i} className="not-prose grid md:grid-cols-2 gap-6 border rounded p-4 bg-slate-50">
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: leftHtml }} />
                {s.right && <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: rightHtml }} />}
              </div>
            );
          }
          case 'brandTeaser':
            return (
              <div key={i} className="border rounded p-6 bg-white shadow-sm not-prose">
                <div className="text-sm uppercase tracking-wide text-brand font-semibold mb-2">Brand Teaser</div>
                {s.title && <h3 className="text-xl font-semibold mb-2">{s.title}</h3>}
                {s.body && <p className="text-slate-600 text-sm">{s.body}</p>}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 opacity-40">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div key={idx} className="h-12 rounded bg-gradient-to-br from-slate-100 to-slate-200" />
                  ))}
                </div>
              </div>
            );
          case 'quote':
            return (
              <figure key={i} className="not-prose my-8 border-l-4 border-brand pl-4">
                <blockquote className="italic text-slate-700">“{s.text}”</blockquote>
                {s.cite && <figcaption className="mt-2 text-xs text-slate-500">— {s.cite}</figcaption>}
              </figure>
            );
          case 'statsGrid':
            return (
              <div key={i} className="not-prose grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
                {s.items.map(it => (
                  <div key={it.label} className="text-center p-3 rounded bg-slate-50 border">
                    <div className="text-xl font-semibold text-brand">{it.value}</div>
                    <div className="text-xs text-slate-600 mt-1">{it.label}</div>
                  </div>
                ))}
              </div>
            );
          case 'brandDetail':
            return (
              <section key={i} className="not-prose my-10 overflow-hidden rounded-lg border bg-white shadow-sm">
                {s.image && (
                  <div className="relative w-full aspect-[16/9] bg-slate-100">
                    <Image
                      src={s.image}
                      alt={s.name}
                      fill
                      sizes="(min-width: 1024px) 960px, 100vw"
                      loading="lazy"
                      className="object-cover"
                      placeholder={blurMap[s.image as keyof typeof blurMap] ? 'blur' : undefined}
                      blurDataURL={(blurMap as Record<string, string>)[s.image]}
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold tracking-tight">{s.name}</h3>
                  {s.description && (
                    <p className="mt-3 text-slate-600 leading-relaxed text-base">{s.description}</p>
                  )}
                </div>
              </section>
            );
          case 'aboutBrands': {
            const bodyHtml = await markdownToHtml(s.body);
            return (
              <section key={i} className="not-prose my-12">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  <div className="grid grid-cols-2 gap-6 sm:gap-8 content-start">
                    {s.logos.map(l => (
                      <div key={l.src} className="relative aspect-[4/2] rounded-xl ring-1 ring-slate-200 bg-white p-4 flex items-center justify-center shadow-sm hover:shadow transition-shadow">
                        <Image
                          src={l.src}
                          alt={l.alt || ''}
                          fill
                          sizes="(min-width: 1024px) 400px, 50vw"
                          className="object-contain p-2"
                          placeholder={blurMap[l.src as keyof typeof blurMap] ? 'blur' : undefined}
                          blurDataURL={(blurMap as Record<string,string>)[l.src]}
                        />
                      </div>
                    ))}
                  </div>
                  <article className="prose max-w-none leading-relaxed text-slate-700 [&_strong]:text-slate-900 [&_br]:leading-8">
                    <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
                  </article>
                </div>
              </section>
            );
          }
          default:
            return null;
        }
      }))}
      {mappedAssets && (
        <section className="not-prose mt-10">
          {slug === 'haberler' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {mappedAssets.map(a => (
                <div key={a.src} className="relative w-full aspect-square rounded overflow-hidden ring-1 ring-slate-200">
                  <Image 
                    src={a.src} 
                    alt={a.alt} 
                    fill 
                    sizes="(min-width: 640px) 33vw, 50vw" 
                    loading="lazy"
                    className="object-cover" 
                    placeholder={blurMap[a.src as keyof typeof blurMap] ? 'blur' : undefined} 
                    blurDataURL={(blurMap as Record<string,string>)[a.src]} 
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {mappedAssets.map(a => (
                <div key={a.src} className="relative w-full h-32 rounded overflow-hidden ring-1 ring-slate-200">
                  <Image 
                    src={a.src} 
                    alt={a.alt} 
                    fill 
                    sizes="(min-width: 640px) 25vw, 50vw" 
                    loading="lazy"
                    className="object-cover" 
                    placeholder={blurMap[a.src as keyof typeof blurMap] ? 'blur' : undefined} 
                    blurDataURL={(blurMap as Record<string,string>)[a.src]} 
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      )}
      </article>
    </>
  );
}
