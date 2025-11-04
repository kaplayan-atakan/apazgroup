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
    <main className="min-h-dvh bg-gradient-to-b from-white via-brand-bronze-50/30 to-white">
      {/* Hero Slider - Increased spacing */}
      <div className="py-6 md:py-10">
        <HomeHeroSlider
          slides={[
            { src: '/sliders/kariyernet_slider.png', alt: 'İnsan Kaynakları Ekibimiz İnsana Saygı Ödülü', href: `/${locale}/haberler/2025-10-15-insan-kaynaklari-ekibimiz-insana-saygi-odulu`, openInNewTab: false },
            { src: '/sliders/20250220113059184_ACE.jpg', alt: 'ACE ödül duyurusu', href: 'https://www.baydoner.com/cmsfiles/pressrooms/9-a-c-e-achievement-in-customer-excellence-awards-da-gold-odule-layik-gorulduk-1.pdf' },
            { src: '/sliders/20241219120714929_AYD.png', alt: 'AYD perakende araştırması sonucu', href: 'https://www.baydoner.com/cmsfiles/pressrooms/baydoner-en-begenilen-ve-tercih-edilen-perakende-markalari-arastirmasinda-zirvede.pdf?v=36' },
            { src: '/sliders/20250103113820636_STEIVIE.png', alt: 'Steivie yönetim kurulu sahada haber görseli', href: 'https://www.baydoner.com/cmsfiles/pressrooms/apaz-group-un-kalbinde-misafir-var-apaz-group-yonetim-kurulu-sahada.pdf' },
          ]}
        />
      </div>

      {/* Markalarımız */}
      <section id="brands" className="py-16 md:py-24 bg-gradient-to-br from-brand-bronze-50/40 via-white to-brand-gold-50/30 transition-all duration-700">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-700">Markalarımız</h2>
          <div className="mx-auto mt-4 h-1 w-24 bg-gradient-to-r from-brand-secondary via-brand-accent to-brand-secondary rounded-full animate-in fade-in slide-in-from-bottom-2 duration-700 delay-150" aria-hidden="true" />
          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <BrandCard
              logo="/markalar/baydoner_logo.svg"
              image="/markalar/baydoner_foto.jpg"
              title="Baydöner"
              description="Türk mutfağının en çok tercih edilen geleneksel iskenderin en lezzetli halini sunan Baydöner, fast casual restoran konseptiyle eksiksiz hizmet veriyor.​​"
              link={`/${locale}/markalarimiz/baydoner`}
              hideTitle
              emphasizeLogo
              logoScale={1.5}
            />
            <BrandCard
              logo="/markalar/pidebypide_logo.png"
              image="/markalar/pide_foto.jpg"
              title="PidebyPide"
              description="PidebyPide, Türk mutfağının yöresel yemeği pidenin hızlı ve doyurucu versiyonunu enfes bir lezzet ve self servis konseptiyle sunuyor."
              link={`/${locale}/markalarimiz/pide-by-pide`}
              hideTitle
              emphasizeLogo
            />
            <BrandCard
              logo="/markalar/bursaishakbey_logo.png"
              image="/markalar/bursaishakbey_foto.jpg"
              title="Bursa İshakbey"
              description="İskender ve döner üzerine kurgulanan seçkin konseptiyle yeme-içme sektöründe fark yaratan Bursa İshakbey, uygun fiyatlı, doyurucu içerikleri ve self servis hizmeti ile ön plana çıkıyor.​​"
              link={`/${locale}/markalarimiz/bursa-ishakbey`}
              hideTitle
              emphasizeLogo
              logoScale={2}
            />
          </div>
        </div>
      </section>

      {/* Apaz Hakkında + Haberler slider */}
      <div className="py-16 md:py-24">
        <HomeAboutNews locale={locale} />
      </div>

      {/* Franchise / Kariyer panelleri */}
      <div className="py-16 md:py-24">
        <HomeLatestProject locale={locale} />
      </div>
    </main>
  );
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return generateSeoMetadata({
    title: 'Apaz Group — Anasayfa',
    description:
      "Dünyaca ünlü markalarımızı sevenleriyle buluşturuyoruz. 2007'den beri kaliteli hizmet anlayışıyla Türkiye'ye yayılıyoruz.",
    keywords: ['Apaz Group', 'Baydöner', 'PidebyPide', 'Bursa İshakbey'],
    locale: params.locale,
    type: 'website',
  });
}
