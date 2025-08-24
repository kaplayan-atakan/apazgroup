import Image from 'next/image';
import Link from 'next/link';

type Props = { locale: string };

export function HomeAboutNews({ locale }: Props) {
  const withLocale = (path: string) => (path === '/' ? `/${locale}` : `/${locale}${path}`);
  // Replaced legacy internal news teasers with new static external news cards
  const externalNews = [
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

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Apaz Hakkında */}
          <div className="lg:col-span-4">
            <div className="mb-4">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                Apaz <span className="text-brand-yellow">Hakkında</span>
              </h3>
              <span aria-hidden className="mt-2 inline-block h-1 w-16 bg-brand-yellow" />
            </div>
            <div className="space-y-4 text-slate-700">
              <p>
                2007 yılında büyük bir heyecanla Türkiye’nin geleneksel lezzeti iskendere hak ettiği değeri vermek için <b>Baydöner</b> markası ile yola çıktık.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                {(() => { const href = withLocale('/hakkimizda'); return (
                  // @ts-expect-error typedRoutes experimental dynamic string
                  <Link href={href} className="inline-flex items-center font-semibold text-slate-900 hover:text-brand-yellow transition-colors">Devamı..</Link>
                ); })()}
              </div>
            </div>
          </div>

          {/* Right: Static 4 news cards grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {externalNews.map(item => (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-white hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-yellow"
                  aria-label={item.text.length > 120 ? item.text.slice(0,117) + '…' : item.text}
                >
                  <div className="relative w-full aspect-[4/3] bg-slate-100">
                    <Image
                      src={item.image}
                      alt={item.text.slice(0, 80)}
                      fill
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  </div>
                  <div className="p-4 flex flex-col gap-3 flex-1">
                    <p className="text-xs md:text-sm leading-relaxed text-slate-800 font-medium line-clamp-5">{item.text}</p>
                    <span className="text-[10px] md:text-xs font-semibold text-brand-primary inline-flex items-center gap-1 tracking-wide uppercase">
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
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
