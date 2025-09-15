import type { Metadata } from 'next';

import { isLocale, type Locale } from '../../../lib/i18n';
import { generateSeoMetadata } from '../../../lib/seo';
import { FranchiseCard } from '../../../components/cards/FranchiseCard';

interface PageProps {
  params: { locale: string };
}

export function generateStaticParams() {
  return [{ locale: 'tr' }, { locale: 'en' }];
}

export function generateMetadata({ params }: PageProps): Metadata {
  const { locale } = params;
  if (!isLocale(locale)) return {};
  return generateSeoMetadata({
    title: 'Franchising',
    description:
      locale === 'tr'
        ? 'Apaz Group markaları ile franchising fırsatları ve başvuru bilgileri.'
        : 'Franchising opportunities and application details for Apaz Group brands.',
    locale,
    slug: 'franchising',
    type: 'article',
    imagePath: '/markalar/baydoner_foto.jpg',
  });
}

export default function FranchisingPage({ params }: PageProps) {
  const { locale } = params;
  const loc = (isLocale(locale) ? locale : 'tr') as Locale;
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const pageUrl = `${base}/${loc}/franchising`;

  return (
    <main className="pt-8 md:pt-12">
      {/* Intro */}
      <section className="pb-14 pt-6 bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="max-w-5xl mx-auto px-6">
          <header className="mb-10 md:mb-14">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-primary tracking-tight mb-6 relative inline-block after:absolute after:left-0 after:-bottom-1 after:h-1 after:w-2/3 after:bg-gradient-to-r after:from-brand-accent after:to-brand-yellow/70">
              {loc === 'tr' ? 'Franchising' : 'Franchising'}
            </h1>
            <p className="mt-2 max-w-3xl text-[15px] md:text-[17px] leading-relaxed text-slate-600 font-medium">
              {loc === 'tr'
                ? 'Apaz Group markalarıyla sürdürülebilir büyüme, operasyonel destek ve güçlü marka değeri sunan esnek yatırım modelleri.'
                : 'Flexible franchise investment models backed by strong brand equity and operational excellence.'}
            </p>
          </header>
          {loc === 'tr' ? (
            <div className="relative">
              <div className="absolute -inset-x-4 -inset-y-4 rounded-2xl bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-accent/5 blur-md" aria-hidden="true" />
              <div className="relative rounded-2xl bg-white/70 backdrop-blur-xl px-7 md:px-10 py-10 ring-1 ring-slate-200/70 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] space-y-6 text-slate-700 text-[15px] leading-[1.75]">
                <p>
                  Apaz Group olarak, Türk mutfağına hak ettiği değeri verme vizyonuyla çalışmalarımızı sürdürüyoruz. İstikrarlı bir şekilde büyümeye devam ediyoruz. Bundan sonra yapacağımız yeni yatırımlarla, büyüme trendimizi sürdüreceğiz.
                </p>
                <p>
                  Franchise şubelerimize restoranın açılış hazırlıkları süresince ve açılışın ilk gününden itibaren kapsamlı destek sağlıyoruz. Yeni ürün inovasyonu, pazarlama, satın alma, lojistik, eğitim, insan kaynakları, operasyon ve kalite kontrol kritik destek alanlarımızdır.
                </p>
                <p>
                  Yıllardır süregelen uzmanlığı ile Türkiye’de İskender severlerin öncelikli tercihlerinden olan Baydöner; standart hizmet kalitesi, uygun fiyatı, şık restoran deneyimi ve fark yaratan uygulamalarıyla il ve şube ağını büyütmeyi hedefliyor.
                </p>
                <p>
                  Döneri en doyurucu haliyle ve erişilebilir fiyatlarla sunan Bursa İshakbey markamızla perakende ağımızı genişletmek üzere yatırımlarımız devam ediyor.
                </p>
                <p>
                  PidebyPide ise yöresel lezzet pideyi hızlı ve doyurucu bir formatta konumlandırarak franchise modeliyle girişimcilere cazip fırsatlar sunuyor.
                </p>
                <p className="font-medium text-slate-800">
                  Cazip yatırım modelleri hakkında bilgi almak için aşağıdaki markalar üzerinden ilgili bağlantılara ulaşabilirsiniz.
                </p>
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute -inset-x-4 -inset-y-4 rounded-2xl bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-accent/5 blur-md" aria-hidden="true" />
              <div className="relative rounded-2xl bg-white/70 backdrop-blur-xl px-7 md:px-10 py-10 ring-1 ring-slate-200/70 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] text-slate-700 text-[15px] leading-[1.75]">
                <p>
                  Franchising opportunities across Apaz Group brands: scalable formats, operational support and strong consumer resonance. (EN placeholder)
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Brand cards */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(circle_at_center,white,transparent)] bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.12),transparent_60%),radial-gradient(circle_at_70%_60%,rgba(0,82,255,0.12),transparent_55%)]" aria-hidden="true" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-center mb-14 text-slate-900">
            {loc === 'tr' ? 'Markalarımızla Franchise Fırsatları' : 'Franchise Opportunities'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <FranchiseCard
              logo="/markalar/baydoner_logo.svg"
              image="/markalar/baydoner_foto.jpg"
              title="Baydöner"
              description={
                loc === 'tr'
                  ? 'Türk mutfağının en çok tercih edilen ve vazgeçilmezi iskenderin en lezzetli halini sunan Baydöner, fast casual restoran konseptiyle eksiksiz hizmet veriyor.'
                  : 'Turkey’s leading Iskender experience in a fast casual format.'
              }
              link="https://www.baydoner.com/hakkimizda/franchising"
            />
            <FranchiseCard
              logo="/markalar/bursaishakbey_logo.png"
              image="/markalar/bursaishakbey_foto.jpg"
              title="Bursa İshakbey"
              description={
                loc === 'tr'
                  ? 'İskender ve döner üzerine kurgulanan seçkin konseptiyle yeme-içme sektöründe fark yaratan Bursa İshakbey, uygun fiyatlı, doyurucu içerikleri ile self servis hizmeti ile ön plana çıkıyor.'
                  : 'Value-focused self-service Iskender & döner concept.'
              }
              link="https://www.bursaishakbey.com/franchise"
            />
            <FranchiseCard
              logo="/markalar/pidebypide_logo.png"
              image="/markalar/pide_foto.jpg"
              title="PidebyPide"
              description={
                loc === 'tr'
                  ? 'PidebyPide, Türk mutfağının yöresel yemeği pidenin hızlı ve doyurucu versiyonunu enfes bir lezzet ve self servis konseptiyle sunuyor.'
                  : 'Fast, satisfying pide in a streamlined self-service model.'
              }
              link="https://www.pidebypide.com/franchise"
            />
          </div>
        </div>
      </section>


      {/* LocalBusiness JSON-LD */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Apaz Group Franchising',
            url: pageUrl,
            image: `${base}/brand/logo--global.png`,
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Çınarlı Mah. Ankara Asfaltı Cad. No: 17/402 Konak',
              addressLocality: 'İzmir',
              postalCode: '35110',
              addressCountry: 'TR',
            },
            telephone: '+90-232-441-8080',
            areaServed: 'TR',
          }),
        }}
      />
    </main>
  );
}
