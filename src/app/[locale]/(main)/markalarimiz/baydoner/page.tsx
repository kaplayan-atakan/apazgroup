import type { Metadata } from 'next';
import Image from 'next/image';

import { BrandCard } from '../../../../../components/cards/BrandCard';
import { HeroGradient } from '../../../../../components/hero/HeroGradient';
import { isLocale } from '../../../../../lib/i18n';
import { generateSeoMetadata } from '../../../../../lib/seo';

type Props = { params: { locale: string } };

export const dynamic = 'force-static';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale;
  return generateSeoMetadata({
    title: 'Baydöner | Apaz Group',
    description:
      "Baydöner: ISO 22000 belgeli üreticilerle çalışan, ödüllü ve 100+ şubeli iskender lider markası.",
    locale,
    slug: 'markalarimiz/baydoner',
  imagePath: '/markalar/baydoner_foto.jpg',
    type: 'article'
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;
  if (!isLocale(locale)) return null;

  const intro = `Her restoranın da aynı hizmet ve kalite standartların da sunan Baydöner, ISO 22000 belgesine sahip üreticiler ile çalışarak en taze malzemeleri, kalite yönetim ve hijyen sistemlerine uygun şekilde ve keyifli mekanlarda, uygun fiyat politikasıyla tüketicileri ile buluşturmayı ilke edindi. Bugüne kadar sayısız ödüller kazanan Baydöner; son olarak, 2015, 2016 ve 2024 yıllarında, AVM Yatırımcıları Derneği tarafından düzenlenen ve halk oylaması ile seçilen “AVM’lerde En Sevilen ve Tercih Edilen Restoran Zinciri” ödülüne layık görüldü.`;
  const vision = 'Misafirlerimize en iyi müşteri deneyimini yaşatmak.';
  const mission = 'Misafirlerimize, çalışanlarımıza ve topluma duyarlı bir marka olarak iskenderi herkese ulaşılabilir kılmak.';

  return (
    <main className="relative">
      <HeroGradient
        heading="Baydöner"
        intro="ISO 22000 belgeli üreticilerle çalışan, ödüllü ve 100+ şubeli iskender lider markası."
        radialPosition="circle_at_20%_50%"
        contentClassName="max-w-4xl"
        minHeights={{ base: 'min-h-[220px]', md: 'md:min-h-[260px]', lg: 'lg:min-h-[300px]' }}
      />

      {/* Standalone banner image (elevated card overlapping hero) */}
      <section className="not-prose -mt-4 md:-mt-8">
        <div className="max-w-6xl mx-auto px-6">
          <figure className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 ring-2 ring-brand-bronze-200/50 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)]">
            <Image
              src="/markalar/baydoner_foto.jpg"
              alt="Baydöner marka görseli"
              fill
              sizes="(min-width: 1280px) 1200px, (min-width: 768px) 90vw, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/15 via-black/5 to-transparent" aria-hidden="true" />
          </figure>
        </div>
      </section>
      <section className="not-prose py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 ring-2 ring-brand-bronze-200/50 p-6 md:p-8 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)]">
            <p className="text-sm md:text-base leading-relaxed text-slate-700 whitespace-pre-line">{intro}</p>
          </div>
        </div>
      </section>

      {/* Vision & Mission cards */}
      <section className="not-prose pb-12">
        <div className="max-w-6xl mx-auto px-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 p-6 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] ring-2 ring-brand-bronze-200/50 transition-shadow duration-300 hover:ring-brand-secondary/50 hover:shadow-xl">
            <h2 className="text-lg font-semibold tracking-tight mb-3">Vizyonumuz</h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">{vision}</p>
          </div>
          <div className="rounded-xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 p-6 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] ring-2 ring-brand-bronze-200/50 transition-shadow duration-300 hover:ring-brand-secondary/50 hover:shadow-xl">
            <h2 className="text-lg font-semibold tracking-tight mb-3">Misyonumuz</h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">{mission}</p>
          </div>
        </div>
      </section>

      {/* Other brands (kept) */}
      <section className="not-prose py-12 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-xl font-semibold tracking-tight">Diğer Markalarımız</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <BrandCard
              logo="/markalar/pidebypide_logo.png"
              image="/markalar/pide_foto.jpg"
              title="PidebyPide"
              description="PidebyPide, Türk mutfağının yöresel yemeği pidenin hızlı ve doyurucu versiyonunu enfes bir lezzet ve self servis konseptiyle sunuyor."
              link={`/${locale}/markalarimiz/pide-by-pide`}
              hideTitle
              emphasizeLogo
              // logoScale={0.8}
            />
            <BrandCard
              logo="/markalar/bursaishakbey_logo.png"
              image="/markalar/bursaishakbey_foto.jpg"
              title="Bursa İshakbey"
              description="İskender ve döner üzerine kurgulanan seçkin konseptiyle yeme-içme sektöründe fark yaratan Bursa İshakbey, uygun fiyatlı, doyurucu içerikleri ve self servis hizmeti ile ön plana çıkıyor.​​"
              link={`/${locale}/markalarimiz/bursa-ishakbey`}
              hideTitle
              emphasizeLogo
              logoScale={1.5}
            />
          </div>
        </div>
      </section>
  </main>
  );
}
