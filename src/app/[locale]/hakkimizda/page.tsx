import type { Metadata } from 'next';
import Image from 'next/image';

import { HeroGradient } from '../../../components/hero/HeroGradient';
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
          2007 yılında İzmir&apos;de kurduğumuz Apaz Group olarak çalışmalarımıza ilk olarak Baydöner markamızla başladık. Geçtiğimiz yıllarda hiç ara vermeden sürdürdüğümüz büyüme yolculuğumuzda, Baydöner markamız ile Türkiye&apos;nin dört bir yanında büyürken yeme-içme sektörüne iki yeni marka daha kazandırdık.
        </p>
        <p>
          2018 yılında PidebyPide, 2019 yılında ise Bursa İshakbey markalarımızı misafirlerimizle buluşturarak ailemizi büyüttük.
        </p>
        <p>
          Apaz Group çatısı altında yer alan Baydöner, PidebyPide ve Bursa İshakbey markalarımızla, Türk mutfağının yöresel lezzetlerini, kaliteli hizmet ve uygun fiyat anlayışımızla lezzet tutkunlarıyla bir araya getirmeye devam ediyoruz.
        </p>
      </>
    )
  },
  {
    key: 'baydoner',
  logo: { src: '/markalar/baydoner_logo.jpg', alt: 'Baydöner' },
    content: (
      <>
        {/* baydoner start */}
        <p>
          2007 yılında büyük bir heyecanla Türkiye&apos;nin geleneksel lezzeti iskendere hak ettiği değeri vermek için Baydöner markası ile yola çıktık. Türk mutfağının geleneksel ürünü iskenderi başarı ile hızlı servis restoran pazarına uyarladığımız Baydöner markamız, kısa sürede ülkenin en tanınmış Fast Casual restoran zincirlerinden biri oldu. Yeme-içme alanlarının en çok tercih edilen ürünü döner-iskender olurken AVM&apos;lerde bu kategoride akla gelen ilk marka olma başarısına Baydöner markamız ile sürdürmeye devam ediyoruz.
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
          Türk mutfağının klasikleşmiş tadı döneri en lezzetli ve en doyurucu haliyle sunmayı ilke edindiğimiz Bursa İshakbey markamız ile döner lezzetini taçlandıran ürün çeşitliliği, İskender ve ekmek arası ürün sunumları ile konuklarını ağırlıyoruz. Ayrıcalıklı konseptiyle yeme-içme sektöründe fark yaratan Bursa İshakbey, self servis konsepti ve uygun fiyatlı doyurucu menü anlayışıyla öne çıkıyor.
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
    <main className="min-h-dvh">
      <HeroGradient
  heading="Apaz Group Hakkında"
  headingClassName="text-brand-primary"
        intro=""
        minHeights={{ base: 'min-h-[200px]', md: 'md:min-h-[240px]', lg: 'lg:min-h-[260px]' }}
        contentClassName="max-w-4xl"
      />
      <section className="py-8 md:py-12">
        <article className="prose prose-slate max-w-none px-6 mx-auto">
          <div className="mb-12 space-y-10">
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
              className={`relative group p-4 md:p-5 rounded-xl overflow-hidden md:grid md:grid-cols-[190px_1fr] md:items-center gap-6 bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] ring-2 ring-brand-bronze-200/50`}
            >
              {/* Logo left (takes half width on desktop, full width on mobile) */}
              <div
                className={(() => {
                  // Base container sizing per brand (taller on mobile where needed)
                  const base = 'relative flex items-center justify-center bg-white/70 backdrop-blur-sm border border-slate-200 rounded-lg overflow-hidden';
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
                    if (section.key === 'apaz-group') return common + ' scale-[2] sm:scale-[1.8]';
                    if (section.key === 'baydoner') return common + ' scale-150 sm:scale-125';
                    if (section.key === 'pidebypide') return common + ' scale-95 sm:scale-90';
                    return common;
                  })()}
                >
                  <div className="w-full h-full flex items-center justify-center">
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
              <div className="mt-4 md:mt-0 space-y-4 leading-relaxed text-slate-900">
                <h2 id={`brand-${section.key}`} className="sr-only">{section.logo.alt}</h2>
                {section.content}
              </div>
              {/* Accent bar */}
              <span className={`absolute left-0 top-0 h-full w-1 ${a.bar} rounded-tr-lg rounded-br-lg`} aria-hidden="true" />
            </div>
          );
        })}
        {/* Summary growth card */}
  <div className="relative p-6 md:p-10 rounded-xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] ring-2 ring-brand-bronze-200/50">
          <p className="text-base md:text-lg leading-relaxed text-slate-900">
            Misafirlerine her ziyaretin, unutulmaz ve keyifli olmasını garanti ederek, her konuk için samimi ve kişiselleştirilmiş bir deneyim yaratmayı hedefleyerek, bugün Baydöner markasının yanı sıra self servis hizmet modelinde Bursa İshakbey ve PideByPide markaları ile ürün ve hizmet çeşitliliğini arttırarak büyümeye devam ediyoruz.
          </p>
        </div>
        {/* Vision / Mission / Values */}
        <div className="grid md:grid-cols-3 gap-6 pt-4">
          <section className="relative p-6 md:p-7 rounded-xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] ring-2 ring-brand-bronze-200/50">
            <h2 className="text-xl font-semibold mb-3 text-brand-primary after:block after:mt-1 after:h-0.5 after:w-12 after:bg-brand-primary/60">Vizyonumuz</h2>
            <p className="text-slate-900">İnovatif ve en iyilerin çalışmak istediği markalara sahip olmak.</p>
            <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brand-primary/40 via-brand-accent/30 to-brand-yellow/40 rounded-b-xl" aria-hidden="true" />
          </section>
          <section className="relative p-6 md:p-7 rounded-xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] ring-2 ring-brand-bronze-200/50">
            <h2 className="text-xl font-semibold mb-3 text-brand-secondary after:block after:mt-1 after:h-0.5 after:w-12 after:bg-brand-secondary/60">Misyonumuz</h2>
            <p className="text-slate-900">Yenilikçi ve güçlü fikirlerle müşterilerimizin kendilerini özel hissetmelerini sağlar, çalışma arkadaşlarımızın emeğine değer veririz.</p>
            <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brand-secondary/40 via-brand-accent/30 to-brand-primary/40 rounded-b-xl" aria-hidden="true" />
          </section>
          <section className="relative p-6 md:p-7 rounded-xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] ring-2 ring-brand-bronze-200/50">
            <h2 className="text-xl font-semibold mb-3 text-brand-accent after:block after:mt-1 after:h-0.5 after:w-12 after:bg-brand-accent/60">Değerlerimiz</h2>
            <ul className="list-disc ml-6 text-slate-900">
              <li>Fırsat eşitliği ve adalet</li>
              <li>Müşteri memnuniyeti ve kalite odaklılık</li>
              <li>Yenilikçilik, karşılıklı güven ve insana saygı</li>
            </ul>
            <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brand-accent/40 via-brand-yellow/30 to-brand-primary/40 rounded-b-xl" aria-hidden="true" />
          </section>
        </div>
          </div>
        </article>
      </section>
    </main>
  );
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return generateSeoMetadata({
    title: 'Apaz Group Hakkında',
    description: "",
    locale: params.locale,
    slug: 'hakkimizda',
    type: 'article',
    imagePath: '/brand/group-apaz--about.webp'
  });
}
