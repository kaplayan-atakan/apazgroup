import Image from 'next/image';
import type { Metadata } from 'next';

import { generateSeoMetadata } from '../../../../../lib/seo';
import pidePhoto from '../../../../../../public/markalar/pide_foto.jpg';
import { BrandCard } from '../../../../../components/cards/BrandCard';

interface PageProps { params: { locale: string } }

export function generateStaticParams() { return [{ locale: 'tr' }, { locale: 'en' }]; }

export function generateMetadata({ params }: PageProps): Metadata {
  const { locale } = params;
  const descriptionTR = 'PidebyPide, Türk mutfağının yöresel yemeği pidenin hızlı ve doyurucu halini sunuyor.';
  const descriptionEN = 'PidebyPide offers a fast and satisfying interpretation of traditional Turkish pide.';
  return generateSeoMetadata({
    title: 'Pide by Pide | Apaz Group',
    description: locale === 'tr' ? descriptionTR : descriptionEN,
    locale,
    slug: 'markalarimiz/pide-by-pide',
    type: 'article',
    imagePath: '/markalar/pide_foto.jpg'
  });
}

export default function PideByPidePage({ params }: PageProps) {
  const { locale } = params;

  const intro = `PidebyPide olarak, konuklarımıza, Türk mutfağının yöresel yemeği pidenin hızlı ve doyurucu halini, enfes bir lezzetle sunuyoruz. Deneyimli ustalarımız tarafından hazırlanan günlük taze hamurdan özel olarak üretilen bol malzemeli ürünlerimizi, çıtır çıtır, lezzetine lezzet katarak servis ediyor, kalitemizden ödün vermeden çalışmalarımıza devam ediyoruz. 26 restoranımız ile devam ettiğimiz lezzet yolculuğumuza, önümüzdeki dönemde Türkiye’deki diğer illeri de kapsayarak hızla büyümeyi hedefliyoruz.`;
  const vision = 'Geniş kitlelerin tercih ettiği pide restoran zinciri olmak';
  const mission = 'Lezzetli, doyurucu ve uygun fiyatlı pideyi en en kolay ve hızlı şekilde herkese, her yerde ulaştırmak.';

  return (
    <main className="py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top image */}
        <div className="rounded-lg overflow-hidden ring-1 ring-slate-200 bg-black/5">
          <Image
            src={pidePhoto}
            alt="Pide by Pide restoran fotoğrafı"
            priority
            sizes="(min-width:1280px) 1200px, (min-width:1024px) 1000px, 100vw"
            className="w-full h-auto object-contain"
          />
        </div>
        {/* Intro */}
        <section className="mt-10">
          <p className="text-sm md:text-base leading-relaxed text-slate-700 whitespace-pre-line">{intro}</p>
        </section>
        {/* Vision & Mission */}
        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold tracking-tight mb-3">Vizyon</h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">{vision}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold tracking-tight mb-3">Misyon</h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">{mission}</p>
          </div>
        </section>
        {/* Other brands */}
        <section className="mt-14 pb-4">
          <h2 className="text-xl font-semibold tracking-tight">Diğer Markalarımız</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <BrandCard
              image="/markalar/baydoner_logo.jpg"
              title="Baydöner"
              description="Türkiye'nin iskender deneyimini standart kalite ve müşteri memnuniyetiyle sunan lider zincir."
              link={`/${locale}/markalarimiz/baydoner`}
            />
            <BrandCard
              image="/markalar/bursaishakbey_logo.png"
              title="Bursa İshakbey"
              description="İskender'de uzman, taze ve doyurucu porsiyonlarıyla fark yaratan markamız."
              link={`/${locale}/markalarimiz/bursa-ishakbey`}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
