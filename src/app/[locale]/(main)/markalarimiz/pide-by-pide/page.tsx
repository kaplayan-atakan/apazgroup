import type { Metadata } from 'next';
import Image from 'next/image';

import { BrandCard } from '../../../../../components/cards/BrandCard';
import { HeroGradient } from '../../../../../components/hero/HeroGradient';
import { generateSeoMetadata } from '../../../../../lib/seo';

interface PageProps { params: { locale: string } }

export function generateStaticParams() { return [{ locale: 'tr' }, { locale: 'en' }]; }

export function generateMetadata({ params }: PageProps): Metadata {
  const { locale } = params;
  const descriptionTR = 'PidebyPide, Türk mutfağının yöresel yemeği pidenin hızlı ve doyurucu halini sunuyor.';
  const descriptionEN = 'PidebyPide offers a fast and satisfying interpretation of traditional Turkish pide.';
  return generateSeoMetadata({
    title: 'PidebyPide | Apaz Group',
    description: locale === 'tr' ? descriptionTR : descriptionEN,
    locale,
    slug: 'markalarimiz/pide-by-pide',
    type: 'article',
    imagePath: '/markalar/pide_foto.jpg'
  });
}

export default function PideByPidePage({ params }: PageProps) {
  const { locale } = params;

  const intro = `PidebyPide olarak, konuklarımıza, Türk mutfağının yöresel yemeği pidenin hızlı ve doyurucu halini, enfes bir lezzetle sunuyoruz. Deneyimli ustalarımız tarafından hazırlanan günlük taze hamurdan özel olarak üretilen bol malzemeli ürünlerimizi, çıtır çıtır, lezzetine lezzet katarak servis ediyor, kalitemizden ödün vermeden çalışmalarımıza devam ediyoruz. Lezzet yolculuğumuzun önümüzdeki döneminde Türkiye’deki diğer illeri de kapsayarak hızla büyümeyi hedefliyoruz.`;
  const vision = 'Geniş kitlelerin tercih ettiği pide restoran zinciri olmak';
  const mission = 'Lezzetli, doyurucu ve uygun fiyatlı pideyi en en kolay ve hızlı şekilde herkese, her yerde ulaştırmak.';

  return (
    <main className="relative">
      <HeroGradient
        heading="PidebyPide"
        intro="Yöresel pideyi hızlı, doyurucu ve modern konseptte sunan marka."
        radialPosition="circle_at_20%_55%"
        contentClassName="max-w-4xl"
        minHeights={{ base: 'min-h-[220px]', md: 'md:min-h-[260px]', lg: 'lg:min-h-[300px]' }}
      />

      <section className="not-prose -mt-4 md:-mt-8">
        <div className="max-w-6xl mx-auto px-6">
          <figure className="relative aspect-[16/9] rounded-2xl overflow-hidden ring-1 ring-slate-200 bg-slate-100 shadow-sm md:shadow-lg">
            <Image
              src="/markalar/pide_foto.jpg"
              alt="PidebyPide marka görseli"
              fill
              sizes="(min-width: 1280px) 1200px, (min-width: 768px) 90vw, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/15 via-black/5 to-transparent" aria-hidden="true" />
          </figure>
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <section className="mb-10">
          <div className="relative rounded-xl overflow-hidden ring-1 ring-slate-200 bg-white/70 backdrop-blur-sm p-6 md:p-8">
            <p className="text-sm md:text-base leading-relaxed text-slate-700 whitespace-pre-line">{intro}</p>
          </div>
        </section>
        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold tracking-tight mb-3">Vizyon</h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">{vision}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold tracking-tight mb-3">Misyon</h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">{mission}</p>
          </div>
        </section>
  <section className="mt-14 pb-4">
          <h2 className="text-xl font-semibold tracking-tight">Diğer Markalarımız</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <BrandCard
              logo="/markalar/baydoner_logo.svg"
              image="/markalar/baydoner_foto.jpg"
              title="Baydöner"
              description="Türkiye'nin iskender deneyimini standart kalite ve müşteri memnuniyetiyle sunan lider zincir."
              link={`/${locale}/markalarimiz/baydoner`}
              hideTitle
              emphasizeLogo
              logoScale={1.5}
            />
            <BrandCard
              logo="/markalar/bursaishakbey_logo.png"
              image="/markalar/bursaishakbey_foto.jpg"
              title="Bursa İshakbey"
              description="İskender'de uzman, taze ve doyurucu porsiyonlarıyla fark yaratan markamız."
              link={`/${locale}/markalarimiz/bursa-ishakbey`}
              hideTitle
              emphasizeLogo
              logoScale={1.5}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
