import type { Metadata } from 'next';
import Image from 'next/image';

import { BrandCard } from '../../../../../components/cards/BrandCard';
import { HeroGradient } from '../../../../../components/hero/HeroGradient';
import { generateSeoMetadata } from '../../../../../lib/seo';

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
  imagePath: '/markalar/bursaishakbey_foto.jpg'
  });
}

export default function BursaIshakbeyPage({ params }: PageProps) {
  const { locale } = params;

  const intro = `Türk mutfağının klasikleşmiş tadı döneri en lezzetli ve en doyurucu haliyle sunmayı ilke edinen Bursa İshakbey, döner lezzetini taçlandıran ürün çeşitliliği, İskender ve ekmek arası ürün sunumları ile konuklarını ağırlıyor. Ayrıcalıklı konseptiyle yeme-içme sektöründe fark yaratan Bursa İshakbey, self servis konsepti ve uygun fiyatlı doyurucu menü anlayışıyla öne çıkıyor. Hızlı servis ve avantajlı menüler, Bursa İshakbey’i lezzet tutkunları için vazgeçilmez yapıyor. Bursa İshakbey yeni şube yatırımlarını kesintisiz bir şekilde sürdürmeye devam ediyor.`;
  const vision = 'İskenderi hızlı yemek kategorisinin ana oyuncularından biri haline getirmek.';
  const mission = 'İskenderin standart yeme anlayışını değiştirerek geniş kitlelere ulaşmak.';

  return (
    <main className="relative">
      <HeroGradient
        heading="Bursa İshakbey"
        intro="İskender deneyimini self servis konseptte hızlı, doyurucu ve erişilebilir kılan marka."
        radialPosition="circle_at_25%_50%"
        contentClassName="max-w-4xl"
        minHeights={{ base: 'min-h-[220px]', md: 'md:min-h-[260px]', lg: 'lg:min-h-[300px]' }}
      />

      <section className="not-prose -mt-4 md:-mt-8">
        <div className="max-w-6xl mx-auto px-6">
          <figure className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 ring-2 ring-brand-bronze-200/50 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)]">
            <Image
              src="/markalar/bursaishakbey_foto.jpg"
              alt="Bursa İshakbey marka görseli"
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
          <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 ring-2 ring-brand-bronze-200/50 p-6 md:p-8 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)]">
            <p className="text-sm md:text-base leading-relaxed text-slate-700">{intro}</p>
          </div>
        </section>
        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 p-6 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] ring-2 ring-brand-bronze-200/50 transition-shadow duration-300 hover:ring-brand-secondary/50 hover:shadow-xl">
            <h2 className="text-lg font-semibold tracking-tight mb-3 text-brand-primary">Vizyon</h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">{vision}</p>
          </div>
          <div className="rounded-xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 p-6 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] ring-2 ring-brand-bronze-200/50 transition-shadow duration-300 hover:ring-brand-secondary/50 hover:shadow-xl">
            <h2 className="text-lg font-semibold tracking-tight mb-3 text-brand-primary">Misyon</h2>
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
            />
            <BrandCard
              logo="/markalar/pidebypide_logo.png"
              image="/markalar/pide_foto.jpg"
              title="PidebyPide"
              description="Yöresel pide lezzetlerini modern sunum ve konseptle buluşturan markamız."
              link={`/${locale}/markalarimiz/pide-by-pide`}
              hideTitle
              emphasizeLogo
            />
          </div>
        </section>
      </div>
    </main>
  );
}
