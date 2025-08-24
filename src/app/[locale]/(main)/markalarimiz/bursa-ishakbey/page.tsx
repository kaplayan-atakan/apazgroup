import Image from 'next/image';
import type { Metadata } from 'next';

import { generateSeoMetadata } from '../../../../../lib/seo';
import bursaPhoto from '../../../../../../public/markalar/bursaishakbey_foto.jpg';
import { BrandCard } from '../../../../../components/cards/BrandCard';

interface PageProps { params: { locale: string } }

export function generateStaticParams() { return [{ locale: 'tr' }, { locale: 'en' }]; }

export function generateMetadata({ params }: PageProps): Metadata {
  const { locale } = params;
  const descriptionTR = "Hızlı servisi ve doyurucu porsiyonlarıyla self servis hizmet veren Bursa İshakbey, İskender'de uzmandır ve güvenilirdir.";
  const descriptionEN = 'Self-service concept with generous portions. Bursa İshakbey specializes in Iskender with trusted quality.';
  return generateSeoMetadata({
    title: 'Bursa İshakbey | Apaz Group',
    description: locale === 'tr' ? descriptionTR : descriptionEN,
    locale,
    slug: 'markalarimiz/bursa-ishakbey',
    type: 'article',
    imagePath: '/brands/bursaishakbey-hero--franchising.jpg'
  });
}

export default function BursaIshakbeyPage({ params }: PageProps) {
  const { locale } = params;

  const intro = `Türk mutfağının klasikleşmiş tadı döneri en lezzetli ve en doyurucu haliyle sunmayı ilke edinen Bursa İshakbey, döner lezzetini taçlandıran ürün çeşitliliği, İskender ve ekmek arası ürün sunumları ile konuklarını ağırlıyor. Ayrıcalıklı konseptiyle yeme-içme sektöründe fark yaratan Bursa İshakbey, self servis konsepti ve uygun fiyatlı doyurucu menü anlayışıyla öne çıkıyor. Hızlı servis ve avantajlı menüler, Bursa İshakbey’i lezzet tutkunları için vazgeçilmez yapıyor. Bursa İshakbey yeni şube yatırımlarını kesintisiz bir şekilde sürdürmeye devam ediyor.`;
  const vision = 'İskenderi hızlı yemek kategorisinin ana oyuncularından biri haline getirmek.';
  const mission = 'İskenderin standart yeme anlayışını değiştirerek geniş kitlelere ulaşmak.';

  return (
    <main className="py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top image */}
        <div className="rounded-lg overflow-hidden ring-1 ring-slate-200 bg-black/5">
          <Image
            src={bursaPhoto}
            alt="Bursa İshakbey restoran fotoğrafı"
            priority
            sizes="(min-width:1280px) 1200px, (min-width:1024px) 1000px, 100vw"
            className="w-full h-auto object-contain"
          />
        </div>
        {/* Intro */}
        <section className="mt-10">
          <p className="text-sm md:text-base leading-relaxed text-slate-700">{intro}</p>
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
              image="/markalar/pidebypide_logo.png"
              title="Pide by Pide"
              description="Yöresel pide lezzetlerini modern sunum ve konseptle buluşturan markamız."
              link={`/${locale}/markalarimiz/pide-by-pide`}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
