import type { Metadata } from 'next';
import Image from 'next/image';

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
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="relative inline-block text-3xl md:text-[2.75rem] font-extrabold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-accent to-brand-yellow drop-shadow-sm">
            Şeffaflık ve Hesap Verebilirlik Politikası
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-[3px] w-48 bg-gradient-to-r from-brand-primary/80 via-brand-accent to-brand-yellow rounded-full" aria-hidden="true" />
          </h1>
          <p className="mt-10 max-w-3xl mx-auto text-[15px] md:text-[17px] leading-relaxed text-slate-600 font-medium">
            Kurumsal yönetim anlayışımız; doğruluk, izlenebilirlik ve hesap verebilirlik ilkeleri üzerine inşa edilmiştir. Tüm paydaşlarımızla şeffaf bir bilgi akışı kurarak sürdürülebilir güven yaratmayı hedefleriz.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 md:py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
          {/* Left: text */}
          <div className="relative">
            <div className="absolute -inset-x-4 -inset-y-4 rounded-2xl bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-accent/5 blur-md" aria-hidden="true" />
            <div className="relative rounded-2xl bg-white/70 backdrop-blur-xl px-7 md:px-9 py-9 ring-1 ring-slate-200/70 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
              <p className="text-slate-700 leading-[1.7] mb-8 text-[15px] md:text-[16px] font-normal first-letter:text-brand-primary first-letter:font-semibold first-letter:text-3xl first-letter:mr-1 first-letter:float-left">
                Kurum kültürümüzün en önemli unsurlarından biri çalışanlara, hissedarlarımıza ve paydaşlarımıza karşı şeffaf ve hesap verebilir bir yönetim anlayışını benimsemektir. Aşağıdaki ilkeler bu yaklaşımın omurgasını oluşturur:
              </p>
              <ul className="grid gap-4 md:gap-5 md:grid-cols-2">
                {[
                  'İç denetim kontrol listeleriyle süreçleri izleriz.',
                  'Yönetime sürekli bilgi sağlayan gerçek zamanlı dijital bir raporlama sistemi kurarız.',
                  'Kilit pozisyonları belirler ve eğitim/gelişimlerini izleriz.',
                  'Üst yöneticilere erişimin yollarını netleştirir ve şirket içinde bilgilendiririz.',
                  'Yetkilerin tam kullanımı ve alınan kararların sonuçlarını izleriz.',
                  'Müşteri ve çalışan geri bildirimlerine göre iyileştirmeler yapar, sonuçlarını izleriz.',
                  'Geri bildirimlerde süre sınırları koyar ve bu sürelere uyarız.',
                  'Bilgi ve belgelerin arşivini tutarız.'
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
