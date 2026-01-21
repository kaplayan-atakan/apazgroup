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
  imagePath: '/markalar/bursaishakbey_foto.jpeg'
  });
}

export default function BursaIshakbeyPage({ params }: PageProps) {
  const { locale } = params;

  const intro = `Bursa İshkabey olarak Türk mutfağının klasikleşmiş lezzeti döneri en lezzetli ve en doyurucu haliyle misafirlerimize sunmayı ilke ediniyoruz. Döner lezzetini taçlandıran ürün çeşitliliğimiz; İskender ve ekmek arası seçeneklerimizle misafirlerimizi ağırlıyor; ayrıcalıklı konseptimizle yeme-içme sektöründe fark yaratıyor; self servis yapımız ve uygun fiyatlı, doyurucu menü anlayışımızla öne çıkıyoruz. Yeni şube yatırımlarımızı kesintisiz şekilde devam ettirerek hızla büyümeyi hedefliyoruz.`;
  const vision = 'İskenderi hızlı yemek kategorisinin ana oyuncularından biri haline getirmek.';
  const mission = 'İskenderin standart yeme anlayışını değiştirerek geniş kitlelere ulaşmak.';

  return (
    <main className="min-h-dvh">
      <HeroGradient
        heading="Bursa İshakbey"
        headingClassName="text-brand-primary"
        logoSrc="/markalar/bursaishakbey_logo.png"
        logoAlt="Bursa İshakbey"
        logoClassName="mx-auto h-16 w-auto object-contain md:h-20"
        logoWidth={420}
        logoHeight={160}
        logoPriority
        logoHref="https://www.bursaishakbey.com"
        logoTarget="_blank"
        logoRel="noopener noreferrer"
        logoHrefAriaLabel="Bursa İshakbey web sitesini yeni sekmede aç"
        logoWrapperClassName="px-6 py-3 md:px-7 md:py-3"
        radialPosition="circle_at_25%_50%"
        contentClassName="max-w-4xl"
        minHeights={{ base: 'min-h-[220px]', md: 'md:min-h-[260px]', lg: 'lg:min-h-[300px]' }}
      />

      <section className="not-prose -mt-4 md:-mt-8">
        <div className="max-w-6xl mx-auto px-6">
          <figure className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 ring-2 ring-brand-bronze-200/50 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)]">
            <Image
              src="/markalar/bursaishakbey_foto.jpeg"
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
      <section className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10">
          <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 ring-2 ring-brand-bronze-200/50 p-6 md:p-8 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)]">
            <p className="text-sm md:text-base leading-relaxed text-slate-700">{intro}</p>
            <div className="mt-6 flex justify-center">
              <a
                href="https://www.bursaishakbey.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold text-brand-primary ring-2 ring-brand-bronze-200/60 bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] transition-shadow duration-300 hover:ring-brand-secondary/50 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                aria-label="Bursa İshakbey web sitesi: Detaylı Bilgilendirme için İncele"
              >
                Detaylı Bilgilendirme için İncele →
              </a>
            </div>
          </div>
          </div>
        </div>
          <div className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto px-6">
          <div className="rounded-xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 p-6 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] ring-2 ring-brand-bronze-200/50 transition-shadow duration-300 hover:ring-brand-secondary/50 hover:shadow-xl">
            <h2 className="text-lg font-semibold tracking-tight mb-3 text-brand-primary">Vizyon</h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">{vision}</p>
          </div>
          <div className="rounded-xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 p-6 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] ring-2 ring-brand-bronze-200/50 transition-shadow duration-300 hover:ring-brand-secondary/50 hover:shadow-xl">
            <h2 className="text-lg font-semibold tracking-tight mb-3 text-brand-primary">Misyon</h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">{mission}</p>
          </div>
          </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-xl font-semibold tracking-tight">Diğer Markalarımız</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <BrandCard
              logo="/markalar/baydoner_logo.svg"
              image="/markalar/baydoner_foto.jpeg"
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
              description="PidebyPide, Türk mutfağının yöresel yemeği olan pideyi hızlı, doyurucu ve self servis konseptiyle sunuyor."
              link={`/${locale}/markalarimiz/pide-by-pide`}
              hideTitle
              emphasizeLogo
            />
          </div>
        </div>
      </section>
    </main>
  );
}
