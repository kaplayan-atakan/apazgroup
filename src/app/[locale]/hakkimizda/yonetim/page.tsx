import type { Metadata, Route } from 'next';
import Link from 'next/link';

import { Suspense } from 'react';
import { generateSeoMetadata } from '../../../../lib/seo';
import { isLocale } from '../../../../lib/i18n';
import { getManagementPeople } from '../../../../lib/content';
import type { Section } from '../../../../lib/content/schemas';
import { PersonCard } from '../../../../components/cards/PersonCard';
import { normalizeSlug } from '../../../../lib/slug';

export const dynamic = 'force-static';

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale;
  return generateSeoMetadata({
    title: 'Yönetim | Apaz Group',
    description: 'Apaz Group yönetim ekibi: liderlik ve tecrübe.',
    locale,
    slug: 'hakkimizda/yonetim',
    imagePath: '/team/levent-yilmaz--yonetim.jpg',
    type: 'article'
  });
}

export default function Page({ params }: Props) {
  const { locale } = params;
  if (!isLocale(locale)) return null;

  let people = getManagementPeople(locale);
  // Çelik Başdemir'i (slug veya title eşleşmesi) en sona al
  people = people.sort((a, b) => {
    const aIsCelik = /celik-basdemir/i.test(a.slug) || /çelik başdemir/i.test(a.frontmatter.title.toLowerCase());
    const bIsCelik = /celik-basdemir/i.test(b.slug) || /çelik başdemir/i.test(b.frontmatter.title.toLowerCase());
    if (aIsCelik && !bIsCelik) return 1;
    if (!aIsCelik && bIsCelik) return -1;
    return a.frontmatter.title.localeCompare(b.frontmatter.title, 'tr');
  });

  return (
    <>
      {/* Başlık ve Açıklama (Hero kaldırıldı) */}
      <section className="py-10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Yönetim</h1>
          <p className="text-slate-700">
            Apaz Group&apos;un deneyimli yönetim kadrosu, sektördeki engin tecrübe ve bilgi birikimiyle markalarımızı başarıya taşıyor.
          </p>
        </div>
      </section>

      {/* Grid */}
      <Suspense
        fallback={
          <div className="py-6 max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-80 bg-slate-200 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        }
      >
        <section className="py-6">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {people.map((p) => {
              const slug = normalizeSlug(p.slug);
              const hero = p.sections.find((s): s is Extract<Section, { type: 'heroSimple' | 'imageProse' }> => s.type === 'heroSimple' || s.type === 'imageProse');
              const heroImage = hero && 'image' in hero ? (hero as { image?: string }).image : undefined;
              const href = `/${locale}/hakkimizda/yonetim/${slug}` as Route;
              return (
                <PersonCard
                  key={p.slug}
                  image={heroImage || '/team/levent-yilmaz--yonetim.jpg'}
                  name={p.frontmatter.title}
                  role={p.frontmatter.role}
                  description={p.frontmatter.description}
                  href={href}
                />
              );
            })}
          </div>
        </section>
      </Suspense>

      {/* Footer CTA */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-4">Apaz Group Hakkında Daha Fazla Bilgi</h3>
          <p className="text-slate-700 mb-6">Şirketimiz, değerlerimiz ve vizyonumuz hakkında daha fazla bilgi için hakkımızda sayfasını ziyaret edin.</p>
          <Link 
            href={`/${locale}/hakkimizda` as Route} 
            className="inline-flex items-center rounded-md bg-black px-4 py-2 text-white hover:bg-slate-800 transition-colors"
            prefetch={true}
          >
            <span>Apaz Group Hakkında</span>
            <span className="ml-2">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
