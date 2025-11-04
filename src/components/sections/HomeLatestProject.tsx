"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Route } from 'next';

type Props = { locale: string };

export function HomeLatestProject({ locale }: Props) {
  const router = useRouter();
  const withLocale = (path: string) => (path === '/' ? `/${locale}` : `/${locale}${path}`);
  // Updated: direct franchise CTA should go to franchising page instead of generic application form
  const franchiseHref = withLocale('/franchising') as Route;
  const careerFormHref = withLocale('/bize-katilin') as Route;

  return (
  <section className="py-8">
      <div className="container mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          {/* Franchise panel redesigned (variant-a) */}
          <section
            className="relative isolate w-full max-w-[320px] aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-white to-brand-bronze-50 font-sans mx-auto franchise-card focus:outline-none focus:ring-4 focus:ring-brand-secondary/50 cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
            role="region"
            aria-labelledby="franchise-heading"
            tabIndex={0}
            aria-label={locale === 'tr' ? 'Franchise fırsatları sayfasına git' : 'Go to franchising page'}
            onClick={() => router.push(franchiseHref)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                router.push(franchiseHref);
              }
            }}
          >
            <div className="absolute top-4 left-4 z-[5]">
              <h2 id="franchise-heading" className="m-0 font-sans font-extrabold tracking-[0.06em] text-[clamp(0.7rem,2.2vw,1.2rem)] leading-tight text-brand-secondary select-none drop-shadow-sm">
                FRANCHISE
              </h2>
            </div>
            <div className="absolute inset-0 navy-layer">
              <div className="absolute z-[4] w-[80%] max-w-[320px] text-center text-white font-sans font-medium text-[0.75rem] leading-[1.55] tracking-tight top-[60%] left-[60%] -translate-y-1/2 -translate-x-1/2">
                <p className="mb-[1.1em]">Apaz Group olarak,<br />Türk mutfağına hak ettiği<br />değeri verme vizyonuyla<br />çalışmalarımızı sürdürüyoruz.<br />İstikrarlı bir şekilde büyümeye<br />devam ediyoruz.<br />Siz de bu büyük ailenin bir<br />parçası olmak isterseniz;</p>
                <span
                  className="inline-flex items-center justify-center rounded-md bg-brand-secondary text-white font-sans font-semibold tracking-wide text-[0.5rem] px-4 py-2 shadow-md hover:bg-brand-secondary-hover hover:shadow-lg transition-all"
                  aria-hidden="true"
                >
                  FRANCHISE
                </span>
              </div>
              <div className="absolute z-[4] left-1/2 -translate-x-1/2 bottom-[42px] w-full flex justify-center px-7">
                {/* Alt kısımda yalnızca FRANCHISE butonu istenirse eklenebilir; şu an boş */}
              </div>
            </div>
            <style jsx>{`
              .franchise-card { 
                font-size:16px; 
                line-height:1.4; 
                /* Bronz gradient border */
                border: 2px solid transparent; 
                border-radius: 0.75rem;
                background: 
                  linear-gradient(to bottom right, #ffffff, #faf8f5) padding-box,
                  linear-gradient(135deg, #b89b6f, #95694e, #1F3A52) border-box;
              }
              /* Koyu (navy) çeyrek daire */
              .franchise-card .navy-layer::before { content:""; position:absolute; bottom:0; right:0; width:90%; height:90%; background:#1e3142; border-top-left-radius:100%; z-index:2; }
              /* Bronz çeyrek daire */
              .franchise-card .navy-layer::after { content:""; position:absolute; bottom:0; left:0; width:80%; height:70%; background:#b89b6f; border-top-right-radius:100%; z-index:1; }
              @media (max-width:520px) { .franchise-card { aspect-ratio:auto; min-height:320px; } }
            `}</style>
          </section>

          {/* Career panel mirrored design */}
          <section
            className="relative isolate w-full max-w-[320px] aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-white to-brand-bronze-50 font-sans mx-auto career-card shadow-lg hover:shadow-xl transition-shadow"
            role="region"
            aria-labelledby="career-heading"
          >
            {/* Heading on top-right (logo removed) */}
            <div className="absolute top-4 right-4 z-[5] flex flex-col items-center gap-3">
              <div className="vertical-title flex flex-col items-center">
                <h2 id="career-heading" className="m-0 font-sans font-extrabold tracking-[0.15em] text-[#1F3A52] text-[clamp(0.9rem,2.5vw,1.5rem)] leading-none select-none">
                  KARİYER
                </h2>
              </div>
            </div>
            <div className="absolute inset-0 career-layer">
              {/* Centered text block to sync with left card */}
              <div className="absolute z-[4] w-[80%] max-w-[320px] text-center text-[#1F3A52] font-sans font-medium text-[0.75rem] leading-[1.55] tracking-tight top-[60%] left-[40%] -translate-y-1/2 -translate-x-1/2">
                <p className="mb-[1.1em]">Apaz Group olarak benimsediğimiz <br /> kurum kültürümüz, çalışanlarımıza <br /> ekip çalışmasına dayanan, <br /> güvenli, huzurlu, samimi <br /> ve başarı odaklı bir <br /> çalışma yaşamı sunar. <br /> Gelişim odaklı yapımızla <br /> sürekli öğrenmeyi destekliyoruz.</p>
                <div className="flex flex-col items-center gap-2">
                  <Link
                    href={careerFormHref}
                    className="inline-flex items-center justify-center rounded-md bg-brand-primary text-white font-sans font-semibold tracking-wide text-[0.5rem] px-4 py-2 shadow-md hover:bg-brand-secondary hover:shadow-lg transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-secondary focus-visible:outline-offset-4"
                  >
                    BAŞVURU FORMU
                  </Link>
                </div>
              </div>
            </div>
            <style jsx>{`
              .career-card { 
                font-size:16px; 
                line-height:1.4; 
                /* Bronz gradient border */
                border: 2px solid transparent; 
                border-radius: 0.75rem;
                background: 
                  linear-gradient(to bottom right, #ffffff, #faf8f5) padding-box,
                  linear-gradient(135deg, #b89b6f, #95694e, #1F3A52) border-box;
              }
              /* Bronz çeyrek daire (ayna) */
              .career-card .career-layer::before { content:""; position:absolute; bottom:0; left:0; width:90%; height:90%; background:rgba(184,155,111,0.90); border-top-right-radius:100%; z-index:2; }
              /* Gri çeyrek daire */
              .career-card .career-layer::after { content:""; position:absolute; bottom:0; right:0; width:55%; height:45%; background:#a8a29e; border-top-left-radius:100%; z-index:1; }
              @media (max-width:520px) { .career-card { aspect-ratio:auto; min-height:320px; } }
            `}</style>
          </section>
        </div>
      </div>
    </section>
  );
}
