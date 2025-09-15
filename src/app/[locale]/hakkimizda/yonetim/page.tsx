import type { Metadata, Route } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

import { PersonCard } from '../../../../components/cards/PersonCard';
import { HeroGradient } from '../../../../components/hero/HeroGradient';
import { getManagementPeople } from '../../../../lib/content';
import type { Section } from '../../../../lib/content/schemas';
import { isLocale } from '../../../../lib/i18n';
import { normalizeSlug } from '../../../../lib/slug';
import { generateSeoMetadata } from '../../../../lib/seo';

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
  // Özel sıralama: Levent Yılmaz, Feridun Tuncer, Bülent Polat, Çelik Başdemir
  const customOrder = ['levent-yilmaz', 'feridun-tuncer', 'bulent-polat', 'celik-basdemir'];
  people = people.sort((a, b) => {
    const ai = customOrder.indexOf(a.slug);
    const bi = customOrder.indexOf(b.slug);
    const aDefined = ai !== -1;
    const bDefined = bi !== -1;
    if (aDefined && bDefined) return ai - bi; // both explicitly ordered
    if (aDefined && !bDefined) return -1;     // defined comes first
    if (!aDefined && bDefined) return 1;      // defined comes first
    // fallback: alphabetical for any extra entries
    return a.frontmatter.title.localeCompare(b.frontmatter.title, 'tr');
  });

  return (
    <main className="relative">
      <HeroGradient
        heading="Yönetim"
        intro="Deneyimli yönetim kadromuz; stratejik vizyon, operasyonel yetkinlik ve sürdürülebilir büyüme odağıyla markalarımızı geleceğe taşıyor."
        radialPosition="circle_at_25%_40%"
        minHeights={{ base: 'min-h-[220px]', md: 'md:min-h-[280px]', lg: 'lg:min-h-[340px]' }}
        contentClassName="max-w-4xl"
      />

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
                  role={p.frontmatter.role || ''}
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
  </main>
  );
}
