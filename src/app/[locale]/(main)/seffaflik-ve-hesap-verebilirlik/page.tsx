import type { Metadata } from 'next';
import Image from 'next/image';

import { HeroGradient } from '../../../../components/hero/HeroGradient';
import { isLocale } from '../../../../lib/i18n';
import { generateSeoMetadata } from '../../../../lib/seo';

interface PageProps { params: { locale: string } }

export function generateStaticParams() { return [{ locale: 'tr' }, { locale: 'en' }]; }

export function generateMetadata({ params }: PageProps): Metadata {
  const { locale } = params;
  if (!isLocale(locale)) return {};
  const title = 'Şeffaflık ve Hesap Verebilirlik Politikası | Apaz Group';
  const description = 'İç denetim, dijital raporlama, eğitim ve gelişim, yönetici erişimi, yetki takibi, geri bildirimlerin yönetimi ve arşiv süreçlerimiz.';
  return generateSeoMetadata({
    title,
    description,
    locale,
    slug: 'seffaflik-ve-hesap-verebilirlik',
    type: 'website',
  imagePath: '/kss/seffaflik.png'
  });
}

export default function SeffaflikPage({ params }: PageProps) {
  const { locale } = params;
  if (!isLocale(locale)) return null;

  return (
    <main>
      <HeroGradient
        heading="Şeffaflık ve Hesap Verebilirlik Politikası"
        intro="Şeffaflık, izlenebilirlik ve hesap verebilirlik ilkelerimiz."
        minHeights={{ base: 'min-h-[210px]', md: 'md:min-h-[240px]', lg: 'lg:min-h-[260px]' }}
        contentClassName="max-w-4xl"
      />

      {/* Content */}
  <section className="py-10 md:py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
          {/* Left: text */}
          <div className="relative">
            <div className="absolute -inset-x-4 -inset-y-4 rounded-2xl bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-accent/5 blur-md" aria-hidden="true" />
            <div className="relative rounded-2xl bg-white/70 backdrop-blur-xl px-7 md:px-9 py-9 ring-1 ring-slate-200/70 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
              <div className="space-y-6 text-[15px] md:text-[16px] leading-relaxed text-slate-700">
                <p>
                  Kurum kültürümüzün en önemli unsurlarından biri; çalışanlarımıza, hissedarlarımıza ve tüm paydaşlarımıza karşı şeffaf ve hesap verebilir bir yönetim anlayışını benimsemektir.
                </p>
                <p>
                  Bu yaklaşım; sürdürülebilir güven, tutarlılık ve izlenebilirliğin süreçlerimize yerleşmesini sağlar. Aşağıdaki temel ilkeler kurumsal şeffaflık ve hesap verebilirlik omurgamızı oluşturur:
                </p>
                <h2 className="text-xl font-semibold text-brand-primary tracking-tight mt-4 mb-2 relative inline-block after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-2/3 after:bg-gradient-to-r after:from-brand-accent after:to-brand-yellow/70">
                  Temel İlkeler
                </h2>
                <ul className="grid gap-4 md:gap-5 md:grid-cols-2 pt-2" aria-label="Şeffaflık ve hesap verebilirlik ilkeleri">
                  {[
                    'İç denetim kontrol listeleriyle süreçleri izleriz.',
                    'Gerçek zamanlı dijital raporlama sistemiyle yönetime sürekli bilgi akışı sağlarız.',
                    'Kritik pozisyonları tanımlar, eğitim ve gelişimlerini takip ederiz.',
                    'Üst yönetime erişim kanallarını netleştirir ve düzenli bilgilendiririz.',
                    'Yetki kullanımını ve alınan kararların sonuçlarını sistematik biçimde izleriz.',
                    'Müşteri ve çalışan geri bildirimlerine göre iyileştirme yapar, sonuçlarını ölçeriz.',
                    'Geri bildirim süreçleri için süre sınırları koyar ve bu taahhütlere uyarız.',
                    'Bilgi ve belgelerin bütünlüklü, güvenilir bir arşivini tutarız.'
                  ].map(item => (
                    <li
                      key={item}
                      className="relative pl-7 text-slate-700 text-[13.5px] md:text-[14.5px] leading-relaxed tracking-[0.2px] group"
                    >
                      <span className="absolute left-0 top-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-brand-yellow text-[10px] font-semibold text-white shadow-sm">
                        <span className="scale-90">•</span>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right: image */}
          <div className="relative">
            <div className="absolute -inset-x-4 -inset-y-4 rounded-2xl bg-gradient-to-tr from-brand-accent/10 via-transparent to-brand-primary/10 blur" aria-hidden="true" />
            <div className="relative group overflow-hidden rounded-xl ring-1 ring-slate-200/70 shadow-md bg-white">
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src="/kss/seffaflik.png"
                  alt="Şeffaflık"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  priority={false}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
