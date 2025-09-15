import Image from 'next/image';
import type { Metadata } from 'next';

import { generateSeoMetadata } from '../../../../../lib/seo';
import { isLocale } from '../../../../../lib/i18n';
import { BrandCard } from '../../../../../components/cards/BrandCard';
import baydonerPhoto from '../../../../../../public/markalar/baydoner_foto.jpg';

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
    imagePath: '/brands/baydoner-banner--about.webp',
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
    <>
      {/* Top image */}
      <section className="not-prose">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-lg overflow-hidden ring-1 ring-slate-200 bg-black/5">
            <Image
              src={baydonerPhoto}
              alt="Baydöner restoran fotoğrafı"
              priority
              sizes="(min-width:1280px) 1200px, (min-width:1024px) 1000px, 100vw"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Intro text */}
      <section className="not-prose py-10">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-sm md:text-base leading-relaxed text-slate-700 whitespace-pre-line">{intro}</p>
        </div>
      </section>

      {/* Vision & Mission cards */}
      <section className="not-prose pb-12">
        <div className="max-w-6xl mx-auto px-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold tracking-tight mb-3">Vizyonumuz</h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">{vision}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
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
    </>
  );
}
