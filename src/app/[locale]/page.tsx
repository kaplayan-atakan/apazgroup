import type { Metadata } from 'next';

import { generateSeoMetadata } from '../../lib/seo';
// import { HomeHero } from '../../components/sections/HomeHero';
import { HomeHeroSlider } from '../../components/sections/slider/HomeHeroSlider';
import { BrandCard } from '../../components/cards/BrandCard';
import { HomeAboutNews } from '../../components/sections/HomeAboutNews';
import { HomeLatestProject } from '../../components/sections/HomeLatestProject';

export default function Home({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  return (
    <main className="min-h-dvh bg-white">
      <HomeHeroSlider
        slides={[
          { src: '/sliders/slider-1.jpg', alt: 'Apaz Group markaları görsel 1' },
          { src: '/sliders/slider-2.jpg', alt: 'Apaz Group markaları görsel 2' },
        ]}
        email="info@apazgroup.com"
      />

      {/* Markalarımız */}
      <section id="brands" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center">Markalarımız</h2>
          <div className="mx-auto mt-3 h-1 w-20 bg-brand-yellow" aria-hidden="true" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <BrandCard
              logo="/markalar/baydoner_logo.jpg"
              image="/markalar/baydoner_foto.jpg"
              title="Baydöner"
              description="Türk mutfağının en çok tercih edilen geleneksel iskenderin en lezzetli halini sunan Baydöner, fast casual restoran konseptiyle eksiksiz hizmet veriyor.​​"
              link={`/${locale}/markalarimiz/baydoner`}
            />
            <BrandCard
              logo="/markalar/pidebypide_logo.png"
              image="/markalar/pide_foto.jpg"
              title="Pide by Pide"
              description="İskender ve döner üzerine kurgulanan seçkin konseptiyle yeme-içme sektöründe fark yaratan Bursa İshakbey, uygun fiyatlı, doyurucu içerikleri ve self servis hizmeti ile ön plana çıkıyor.​​"
              link={`/${locale}/markalarimiz/pide-by-pide`}
            />
            <BrandCard
              logo="/markalar/bursaishakbey_logo.png"
              image="/markalar/bursaishakbey_foto.jpg"
              title="Bursa İshakbey"
              description="Pide by Pide, Türk mutfağının yöresel yemeği pidenin hızlı ve doyurucu versiyonunu enfes bir lezzet ve self servis konseptiyle sunuyor."
              link={`/${locale}/markalarimiz/bursa-ishakbey`}
            />
          </div>
        </div>
      </section>

      {/* Apaz Hakkında + Haberler slider */}
      <HomeAboutNews locale={locale} />

      {/* Franchise / Kariyer panelleri */}
      <HomeLatestProject locale={locale} />
    </main>
  );
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return generateSeoMetadata({
    title: 'Apaz Group — Anasayfa',
    description:
      "Dünyaca ünlü markalarımızı sevenleriyle buluşturuyoruz. 2007'den beri kaliteli hizmet anlayışıyla Türkiye'ye yayılıyoruz.",
    keywords: ['Apaz Group', 'Baydöner', 'Pide by Pide', 'Bursa İshakbey'],
    locale: params.locale,
    type: 'website',
  });
}
