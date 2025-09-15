import type { Metadata } from 'next';
import Image from 'next/image';

import { generateSeoMetadata } from '../../../lib/seo';
import { isLocale } from '../../../lib/i18n';

// Consolidated brand logo data used to build individual cards
const BRAND_SECTIONS = [
  {
    key: 'apaz-group',
    logo: { src: '/brand/group-apaz--about.webp', alt: 'Apaz Group' },
    // Content paragraphs & lists extracted from between /* apaz group start */ and next start marker
    content: (
      <>
        {/* apaz group start */}
        <p>
          2007 yılında İzmir&apos;de kurulan Apaz Group, faaliyetlerine ilk olarak Baydöner markası ile başladı. Geçtiğimiz yıllarda çalışmalarına ara vermeden devam eden Apaz Group, Baydöner ile Türkiye&apos;nin dört bir yanında büyürken, yeme içme sektörüne 2 yeni marka kazandırdı:
        </p>
        <ul className="list-disc ml-6">
          <li>2018 yılında PidebyPide</li>
          <li>2019 yılında ise Bursa İshakbey</li>
        </ul>
        <p>
          markaları Apaz Group çatısı altında misafirlerini ağırlamaya başladı. Apaz Group bünyesinde yer alan Baydöner, PidebyPide ve Bursa İshakbey markaları, Türk mutfağının yöresel lezzetlerini kaliteli hizmet ve uygun fiyat anlayışıyla lezzet tutkunlarıyla buluşturuyor.
        </p>
      </>
    )
  },
  {
    key: 'baydoner',
    logo: { src: '/brands/baydoner-banner--about.webp', alt: 'Baydöner' },
    content: (
      <>
        {/* baydoner start */}
        <p>
          2007 yılında büyük bir heyecanla Türkiye’nin geleneksel lezzeti iskendere hak ettiği değeri vermek için Baydöner markası ile yola çıktık. Türk mutfağının geleneksel ürünü iskenderi başarı ile hızlı servis restoran pazarına uyarlayan Baydöner, kısa sürede ülkenin en tanınmış Fast Casual restoran zincirlerinden biri oldu. Yeme-içme alanlarının en çok tercih edilen ürünü döner-iskender olurken bu kategoride akla gelen ilk marka olma başarısına ulaştık.
        </p>
      </>
    )
  },
  {
    key: 'pidebypide',
    logo: { src: '/markalar/pidebypide_logo.png', alt: 'PidebyPide' },
    content: (
      <>
        {/* pidebypide start */}
        <p>
          PidebyPide olarak, konuklarımıza, Türk mutfağının yöresel yemeği pidenin hızlı ve doyurucu halini, enfes bir lezzetle sunuyoruz. Deneyimli ustalarımız tarafından hazırlanan günlük taze hamurdan özel olarak üretilen bol malzemeli ürünlerimizi, çıtır çıtır, lezzetine lezzet katarak servis ediyor, kalitemizden ödün vermeden çalışmalarımıza devam ediyoruz.
        </p>
      </>
    )
  },
  {
    key: 'bursaishakbey',
    logo: { src: '/markalar/bursaishakbey_logo.png', alt: 'Bursa İshakbey' },
    content: (
      <>
        {/* bursaishakbey start */}
        <p>
          Türk mutfağının klasikleşmiş tadı döneri en lezzetli ve en doyurucu haliyle sunmayı ilke edinen Bursa İshakbey, döner lezzetini taçlandıran ürün çeşitliliği, İskender ve ekmek arası ürün sunumları ile konuklarını ağırlıyor. Ayrıcalıklı konseptiyle yeme-içme sektöründe fark yaratan Bursa İshakbey, self servis konsepti ve uygun fiyatlı doyurucu menü anlayışıyla öne çıkıyor.
        </p>
      </>
    )
  }
];

export default function HakkimizdaPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  if (!isLocale(locale)) return null;
  const accentCycle = ['brand-primary', 'brand-secondary', 'brand-accent', 'brand-yellow'] as const;
  return (
    <article className="prose prose-slate max-w-none px-6 py-8 md:py-12 mx-auto">
      <header className="mb-10 relative">
        <h1 className="relative inline-block text-3xl md:text-4xl font-bold tracking-tight mb-4 text-brand-primary after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-1 after:w-3/4 after:bg-gradient-to-r after:from-brand-accent after:to-brand-yellow/70">
          Apaz Group Hakkında
        </h1>
      </header>

      <section className="mb-12 space-y-10">
        {BRAND_SECTIONS.map((section, idx) => {
          const accent = accentCycle[idx % accentCycle.length]!; // safe
          // Map accent token to concrete utility sets (avoid dynamic class names for Tailwind)
          const accentClasses: Record<string, { border: string; to: string; bar: string }> = {
            'brand-primary': { border: 'border-brand-primary', to: 'to-brand-primary/5', bar: 'bg-brand-primary' },
            'brand-secondary': { border: 'border-brand-secondary', to: 'to-brand-secondary/5', bar: 'bg-brand-secondary' },
            'brand-accent': { border: 'border-brand-accent', to: 'to-brand-accent/5', bar: 'bg-brand-accent' },
            'brand-yellow': { border: 'border-brand-yellow', to: 'to-brand-yellow/10', bar: 'bg-brand-yellow' }
          };
          const a = accentClasses[accent] ?? {
            border: 'border-slate-200',
            to: 'to-slate-100',
            bar: 'bg-slate-300'
          };
          return (
            <div
              key={section.key}
              role="region"
              aria-labelledby={`brand-${section.key}`}
              className={`relative group p-4 md:p-5 rounded-xl border shadow-sm md:grid md:grid-cols-[190px_1fr] md:items-center gap-6 overflow-hidden bg-gradient-to-br from-white ${a.to} ${a.border} transition-all duration-500 ease-out hover:shadow-md hover:border-slate-300`}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.6),transparent_60%)]" />
              {/* Logo left (takes half width on desktop, full width on mobile) */}
              <div
                className={(() => {
                  // Base container sizing per brand (taller on mobile where needed)
                  const base = 'relative flex items-center justify-center bg-white/70 backdrop-blur-sm border border-slate-200 rounded-lg overflow-hidden transition-all duration-500 ease-out group-hover:border-slate-300';
                  if (section.key === 'pidebypide' || section.key === 'bursaishakbey') return base + ' h-28 md:h-24 w-full md:w-[190px] p-4 md:p-4';
                  if (section.key === 'apaz-group') return base + ' h-32 md:h-28 w-full md:w-[200px] p-4 md:p-5';
                  if (section.key === 'baydoner') return base + ' h-28 md:h-28 w-full md:w-[190px] p-4 md:p-5';
                  return base + ' h-28 md:h-28 w-full md:w-[180px] p-4';
                })()}
              >
                {/* Wrapper scale for visual emphasis (keeps container size stable) */}
                <div
                  className={(() => {
                    const common = 'w-full h-full flex items-center justify-center';
                    if (section.key === 'apaz-group' || section.key === 'baydoner') return common + ' scale-150 sm:scale-125';
                    if (section.key === 'pidebypide') return common + ' scale-95 sm:scale-90';
                    return common;
                  })()}
                >
                  <div className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.03]">
                    <Image
                      src={section.logo.src}
                      alt={section.logo.alt}
                      fill
                      sizes="(max-width:640px) 80vw, (max-width:768px) 60vw, 40vw"
                      className="object-contain drop-shadow-sm"
                      priority={section.key === 'apaz-group'}
                    />
                  </div>
                </div>
              </div>
              {/* Text right (below on mobile) */}
              <div className="mt-4 md:mt-0 space-y-4 leading-relaxed text-slate-700 transition-colors duration-500">
                <h2 id={`brand-${section.key}`} className="sr-only">{section.logo.alt}</h2>
                {section.content}
              </div>
              {/* Accent bar */}
              <span className={`absolute left-0 top-0 h-full w-1 ${a.bar} rounded-tr-lg rounded-br-lg`} aria-hidden="true" />
            </div>
          );
        })}
        {/* Summary growth card */}
        <div className="relative p-6 md:p-10 rounded-xl shadow-sm border border-brand-accent bg-gradient-to-r from-brand-accent/10 via-white to-brand-yellow/10 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.6),transparent_55%)] mix-blend-overlay" />
          <p className="text-base md:text-lg leading-relaxed text-slate-700">
            Misafirlerine her ziyaretin, unutulmaz ve keyifli olmasını garanti ederek, her konuk için samimi ve kişiselleştirilmiş bir deneyim yaratmayı hedefleyerek, bugün Baydöner markasının yanı sıra self servis hizmet modelinde Bursa İshakbey ve PideByPide markaları ile ürün ve hizmet çeşitliliğini arttırarak büyümeye devam ediyoruz.
          </p>
        </div>
        {/* Vision / Mission / Values */}
        <div className="grid md:grid-cols-3 gap-6 pt-4">
          <section className="relative p-6 md:p-7 rounded-xl border border-brand-primary/40 bg-gradient-to-br from-white to-brand-primary/5 shadow-sm">
            <h2 className="text-xl font-semibold mb-3 text-brand-primary after:block after:mt-1 after:h-0.5 after:w-12 after:bg-brand-primary/60">Vizyonumuz</h2>
            <p>İnovatif ve en iyilerin çalışmak istediği markalara sahip olmak.</p>
            <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brand-primary/40 via-brand-accent/30 to-brand-yellow/40 rounded-b-xl" aria-hidden="true" />
          </section>
          <section className="relative p-6 md:p-7 rounded-xl border border-brand-secondary/40 bg-gradient-to-br from-white to-brand-secondary/10 shadow-sm">
            <h2 className="text-xl font-semibold mb-3 text-brand-secondary after:block after:mt-1 after:h-0.5 after:w-12 after:bg-brand-secondary/60">Misyonumuz</h2>
            <p>Yenilikçi ve güçlü fikirlerle müşterilerimizin kendilerini özel hissetmelerini sağlar, iş arkadaşlarımızın emeğine değer veririz.</p>
            <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brand-secondary/40 via-brand-accent/30 to-brand-primary/40 rounded-b-xl" aria-hidden="true" />
          </section>
          <section className="relative p-6 md:p-7 rounded-xl border border-brand-accent/40 bg-gradient-to-br from-white to-brand-accent/10 shadow-sm">
            <h2 className="text-xl font-semibold mb-3 text-brand-accent after:block after:mt-1 after:h-0.5 after:w-12 after:bg-brand-accent/60">Değerlerimiz</h2>
            <ul className="list-disc ml-6">
              <li>Fırsat eşitliği ve adalet</li>
              <li>Müşteri memnuniyeti ve kalite odaklılık</li>
              <li>Yenilikçilik, karşılıklı güven ve insana saygı</li>
            </ul>
            <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brand-accent/40 via-brand-yellow/30 to-brand-primary/40 rounded-b-xl" aria-hidden="true" />
          </section>
        </div>
      </section>
    </article>
  );
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return generateSeoMetadata({
    title: 'Apaz Group Hakkında',
    description: "Apaz Group'un kuruluşu, vizyonu, misyonu ve değerleri.",
    locale: params.locale,
    slug: 'hakkimizda',
    type: 'article',
    imagePath: '/brand/group-apaz--about.webp'
  });
}
