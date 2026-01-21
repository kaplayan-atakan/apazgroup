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
    imagePath: '/markalar/baydoner_foto.jpeg',
    type: 'article'
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;
  if (!isLocale(locale)) return null;

  const intro = `Her restoranında aynı hizmet ve kalite standartların sunan Baydöner, ISO 22000 belgesine sahip üreticiler ile çalışarak en taze malzemeleri, kalite yönetim ve hijyen sistemlerine uygun şekilde ve keyifli mekanlarda, uygun fiyat politikasıyla misafirleri ile buluşturmayı ilke edindi. Bugüne kadar sayısız ödüller kazanan Baydöner; son olarak, 2015, 2016 ve 2024 yıllarında, AVM Yatırımcıları Derneği tarafından düzenlenen ve halk oylaması ile seçilen “AVM’lerde En Sevilen ve Tercih Edilen Restoran Zinciri” ödülüne layık görüldü.`;
  const vision = 'Geleneksel İskender ustalığını en iyi misafir deneyimiyle sunan, her restoranda aynı ustalığı ve özeni yaşatan marka olmak.';
  const mission = 'Misafirlerimize, çalışanlarımıza ve topluma duyarlı bir marka olarak, iskenderi herkes için ulaşılabilir kılmak.';

  return (
    <main className="min-h-dvh">
      <HeroGradient
        heading="Baydöner"
        headingClassName="text-brand-primary"
        logoSrc="/markalar/baydoner_logo.svg"
        logoAlt="Baydöner"
        logoClassName="mx-auto h-16 w-auto object-contain md:h-20"
        logoWidth={420}
        logoHeight={160}
        logoPriority
        logoHref="https://www.baydoner.com"
        logoTarget="_blank"
        logoRel="noopener noreferrer"
        logoHrefAriaLabel="Baydöner web sitesini yeni sekmede aç"
        logoWrapperClassName="px-6 py-3 md:px-7 md:py-3"
        radialPosition="circle_at_20%_50%"
        contentClassName="max-w-4xl"
        minHeights={{ base: 'min-h-[220px]', md: 'md:min-h-[260px]', lg: 'lg:min-h-[300px]' }}
      />

      {/* Standalone banner image (elevated card overlapping hero) */}
      <section className="not-prose -mt-4 md:-mt-8">
        <div className="max-w-6xl mx-auto px-6">
          <figure className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 ring-2 ring-brand-bronze-200/50 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)]">
            <Image
              src="/markalar/baydoner_foto.jpeg"
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
      <section className="py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 ring-2 ring-brand-bronze-200/50 p-6 md:p-8 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)]">
            <p className="text-sm md:text-base leading-relaxed text-slate-700 whitespace-pre-line">{intro}</p>
            <div className="mt-6 flex justify-center">
              <a
                href="https://www.baydoner.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold text-brand-primary ring-2 ring-brand-bronze-200/60 bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] transition-shadow duration-300 hover:ring-brand-secondary/50 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                aria-label="Baydöner web sitesi: Detaylı Bilgilendirme için İncele"
              >
                Detaylı Bilgilendirme için İncele →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission cards */}
      <section className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 p-6 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] ring-2 ring-brand-bronze-200/50 transition-shadow duration-300 hover:ring-brand-secondary/50 hover:shadow-xl">
            <h2 className="text-lg font-semibold tracking-tight mb-3 text-brand-primary">Vizyonumuz</h2>
            <p className="text-brand-primary text-sm md:text-base leading-relaxed">{vision}</p>
          </div>
          <div className="rounded-xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 p-6 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] ring-2 ring-brand-bronze-200/50 transition-shadow duration-300 hover:ring-brand-secondary/50 hover:shadow-xl">
            <h2 className="text-lg font-semibold tracking-tight mb-3 text-brand-primary">Misyonumuz</h2>
            <p className="text-brand-primary text-sm md:text-base leading-relaxed">{mission}</p>
          </div>
        </div>
      </section>

      {/* Other brands (kept) */}
      <section className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-xl font-semibold tracking-tight">Diğer Markalarımız</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <BrandCard
              logo="/markalar/pidebypide_logo.png"
              image="/markalar/pide_foto.jpg"
              title="PidebyPide"
              description="PidebyPide, Türk mutfağının yöresel yemeği olan pideyi hızlı, doyurucu ve self servis konseptiyle sunuyor."
              link={`/${locale}/markalarimiz/pide-by-pide`}
              hideTitle
              emphasizeLogo
            // logoScale={0.8}
            />
            <BrandCard
              logo="/markalar/bursaishakbey_logo.png"
              image="/markalar/bursaishakbey_foto.jpeg"
              title="Bursa İshakbey"
              description="Bursa İshakbey, döner lezzetini taze, doyurucu porsiyonlarıyla ve self servis konseptiyle sunuyor."
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
