import type { Metadata } from 'next';
import Image from 'next/image';

import { isLocale } from '../../../lib/i18n';
import { generateSeoMetadata } from '../../../lib/seo';
import blurMap from '../../../lib/asset-blur-map.json';

interface PageProps { params: { locale: string } , searchParams?: { page?: string } }

export function generateStaticParams() {
  return [{ locale: 'tr' }, { locale: 'en' }];
}

export function generateMetadata({ params }: PageProps): Metadata {
  const { locale } = params;
  if (!isLocale(locale)) return {};
  return generateSeoMetadata({
    title: 'Haberler | Apaz Group',
    description: 'Şirketimiz ve markalarımızla ilgili en güncel haberler.',
    locale,
    slug: 'haberler',
    type: 'website'
  });
}

interface StaticNewsItem { id: string; image: string; text: string; href: string; title?: string }

// Static 4-card news layout per request (legacy dynamic list & pagination removed)
const STATIC_NEWS: StaticNewsItem[] = [
  {
    id: 'haber-1',
    image: '/haberler-preview/haber-1.jpg',
    text: '“Alakart Restoran” kategorisinde üçüncü kez 1.lik ödülüne layık görülmenin mutluluğunu yaşıyoruz. ​',
    href: 'https://www.baydoner.com/hakkimizda/basin-odasi/2024'
  },
  {
    id: 'haber-2',
    image: '/haberler-preview/haber-2.jpg',
    text: 'A.C.E Awards 2025’de​ bir kez daha​ "Müşteri Deneyimini​ En İyi Yöneten Marka" olmanın mutluluğunu​ paylaşıyoruz.​',
    href: 'https://www.baydoner.com/hakkimizda/basin-odasi/2025'
  },
  {
    id: 'haber-3',
    image: '/haberler-preview/haber-3.jpg',
    text: 'Apaz Group’un Yeni CEO’su Çelik Başdemir Oldu​',
    href: 'https://n24.com.tr/apaz-groupun-yeni-ceosu-celik-basdemir-oldu/'
  },
  {
    id: 'haber-4',
    image: '/haberler-preview/haber-4.jpg',
    text: 'Apaz Group Yönetim Kurulu Üyesi​ BÜLENT POLAT​',
    href: 'https://kollektmag.com/dergi?v=1'
  }
];

export default function HaberlerPage({ params }: PageProps) {
  const { locale } = params;
  if (!isLocale(locale)) return null;

  return (
    <>
      {/* Intro */}
      <section className="py-10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Apaz Group Haberleri</h2>
          <p className="text-slate-700 mt-4">Şirketimiz ve markalarımız ile ilgili en güncel haberler, duyurular ve gelişmelere buradan ulaşabilirsiniz.</p>
        </div>
      </section>

      {/* 4 Card Static Grid */}
      <section className="py-6">
        <div className="max-w-6xl mx-auto px-6 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {STATIC_NEWS.map(item => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-primary rounded-xl"
              aria-label={item.text.length > 120 ? item.text.slice(0, 117) + '…' : item.text}
            >
              <article className="flex flex-col overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-white hover:shadow-md transition-shadow h-full">
                <div className="relative w-full aspect-[4/3] bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.text.slice(0, 80)}
                    fill
                    sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    placeholder={blurMap[item.image as keyof typeof blurMap] ? 'blur' : undefined}
                    blurDataURL={(blurMap as Record<string,string>)[item.image]}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                </div>
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <p className="text-sm leading-relaxed text-slate-800 font-medium">
                    {item.text}
                  </p>
                  <span className="text-xs font-semibold text-brand-primary inline-flex items-center gap-1 tracking-wide uppercase">
                    Habere Git
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3 h-3"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </article>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
