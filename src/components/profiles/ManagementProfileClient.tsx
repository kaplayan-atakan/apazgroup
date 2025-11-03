"use client";
import Image from 'next/image';
import Link from 'next/link';
import { FadeInSection } from '../motion';
import { Icon } from '../ui/Icon';
import blurMap from '../../lib/asset-blur-map.json';

interface SectionProse { type: 'prose'; body: string }
interface SectionList { type: 'list'; items: string[] }
interface SectionQuote { type: 'quote'; text: string; cite?: string }

export interface ManagementProfileClientProps {
  locale: string;
  title: string;
  role?: string;
  description?: string;
  portraitImage?: string;
  portraitAlt?: string;
  bodyHtml: string;
  remaining: Array<SectionProse | SectionList | SectionQuote>;
}

export function ManagementProfileClient({ locale, title, role, description, portraitImage, portraitAlt, bodyHtml, remaining }: ManagementProfileClientProps) {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#1f3a52_0%,#0d1820_55%,#05090c_100%)] opacity-95" />
        <div className="absolute inset-0 mix-blend-overlay pointer-events-none [background-image:linear-gradient(45deg,rgba(255,255,255,0.04)_0%,transparent_55%),linear-gradient(-45deg,rgba(255,255,255,0.04)_0%,transparent_55%)]" />
        {portraitImage && (
          <div className="absolute -right-24 -bottom-24 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-brand-primary/20 via-brand-secondary/10 to-transparent blur-3xl opacity-60" />
        )}
      </div>
      <div className="max-w-6xl mx-auto px-6 pt-10 md:pt-16 pb-12 md:pb-20">
        <nav className="text-xs text-slate-300 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
          <Link href={`/${locale}/hakkimizda`} className="hover:text-white transition-colors flex items-center gap-1"><Icon name="chevron-left" size={14} /> <span>Hakkımızda</span></Link>
          <span className="opacity-40" aria-hidden>/</span>
          <span className="text-slate-100 font-medium">{title}</span>
        </nav>
        <div className="grid md:grid-cols-[340px_minmax(0,1fr)] gap-10 items-start">
          <FadeInSection className="relative">
            <div className="relative rounded-2xl ring-1 ring-white/10 shadow-2xl bg-gradient-to-b from-white/10 via-white/5 to-white/0 backdrop-blur-lg p-4 flex flex-col items-center text-center">
              <div className="relative w-56 h-64 rounded-xl overflow-hidden ring-1 ring-white/15 shadow-lg mb-6">
                {portraitImage ? (
                  <Image
                    src={portraitImage}
                    alt={portraitAlt || title}
                    fill
                    sizes="224px"
                    className="object-cover"
                    placeholder={blurMap[portraitImage as keyof typeof blurMap] ? 'blur' : undefined}
                    blurDataURL={(blurMap as Record<string,string>)[portraitImage]}
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-slate-800" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-sm">{title}</h1>
              {role && <p className="mt-2 text-brand-yellow font-medium tracking-tight uppercase text-[13px]">{role}</p>}
              {description && <p className="mt-4 text-sm leading-relaxed text-slate-200/90 max-w-[32ch]">{description}</p>}
            </div>
          </FadeInSection>
          <FadeInSection className="relative">
            <div className="relative">
              <div className="absolute -inset-x-6 -inset-y-6 rounded-3xl bg-gradient-to-br from-brand-primary/10 via-brand-secondary/5 to-transparent blur-2xl opacity-70 pointer-events-none" aria-hidden />
              <article className="relative prose prose-slate max-w-none prose-headings:scroll-mt-28 text-slate-200 [&_p]:text-slate-300 [&_a]:text-brand-yellow hover:[&_a]:text-brand-yellow/80">
                <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
                {remaining.map((s, i) => {
                  if (s.type === 'prose') return <div key={i} dangerouslySetInnerHTML={{ __html: (s as SectionProse).body }} />;
                  if (s.type === 'list') return <ul key={i} className="list-disc ml-6">{s.items.map(it => <li key={it}>{it}</li>)}</ul>;
                  if (s.type === 'quote') return <figure key={i} className="not-prose my-8 border-l-4 border-brand-primary pl-4"><blockquote className="italic text-slate-200">“{s.text}”</blockquote>{s.cite && <figcaption className="mt-2 text-xs text-slate-400">— {s.cite}</figcaption>}</figure>;
                  return null;
                })}
              </article>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
