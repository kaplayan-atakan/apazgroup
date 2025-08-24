"use client";
import Link from 'next/link';
import Image from 'next/image';
import type { Route } from 'next';

type Props = { locale: string };

export function HomeLatestProject({ locale }: Props) {
  const withLocale = (path: string) => (path === '/' ? `/${locale}` : `/${locale}${path}`);
  // Updated: direct franchise CTA should go to franchising page instead of generic application form
  const franchiseHref = withLocale('/franchising') as Route;

  return (
  <section className="py-8">
      <div className="container mx-auto px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          {/* Franchise panel redesigned (variant-a) */}
          <section
            className="relative isolate w-full max-w-[560px] aspect-square rounded-xl overflow-hidden bg-white border border-slate-900/5 font-sans mx-auto franchise-card"
            role="region"
            aria-labelledby="franchise-heading"
          >
            <div className="absolute top-4 left-4 z-[5]">
              <h2 id="franchise-heading" className="m-0 font-extrabold tracking-[0.06em] text-[clamp(1.4rem,4.5vw,2.4rem)] leading-tight text-[#b89b6f] select-none">
                FRANCHISE
              </h2>
              <div className="mt-1 h-[44px] w-[180px] relative">
                <Image src="/brand/logo--global.png" alt="Apaz Group" fill sizes="180px" className="object-contain" priority />
              </div>
            </div>
            <div className="absolute inset-0 navy-layer">
              <div className="absolute z-[4] w-[55%] max-w-[320px] text-center text-white font-medium text-[0.95rem] leading-[1.55] tracking-tight top-[60%] left-[43%] -translate-y-1/2 -translate-x-[8%]">
                <p className="mb-[1.1em]">Apaz Group olarak,<br />Türk mutfağına hak ettiği<br />değeri verme vizyonuyla<br />çalışmalarımızı sürdürüyoruz. <br /> İstikrarlı bir şekilde büyümeye<br />devam ediyoruz. <br /> Siz de bu büyük ailenin bir<br />parçası olmak isterseniz; </p>
                {/* <p className="mb-[1.1em]">İstikrarlı bir şekilde büyümeye<br />devam ediyoruz.</p> */}
                {/* <p className="mb-4">Siz de bu büyük ailenin bir<br />parçası olmak isterseniz;</p> */}
                <Link
                  href={franchiseHref}
                  className="inline-flex items-center justify-center rounded-md bg-[#b89b6f] text-white font-semibold tracking-wide text-[0.7rem] px-4 py-2 shadow-[0_2px_6px_-2px_rgba(0,0,0,0.25)] hover:bg-[#a28756] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4"
                >
                  FRANCHISE
                </Link>
              </div>
              <div className="absolute z-[4] left-1/2 -translate-x-1/2 bottom-[42px] w-full flex justify-center px-7">
                {/* Alt kısımda yalnızca FRANCHISE butonu istenirse eklenebilir; şu an boş */}
              </div>
            </div>
            <style jsx>{`
              .franchise-card { font-size:16px; line-height:1.4; }
              /* Koyu (navy) çeyrek daire: sağ-alt merkezli, kart yüksekliğinin %90'ı */
              .franchise-card .navy-layer::before { content:""; position:absolute; bottom:0; right:0; width:90%; height:90%; background:#1e3142; border-top-left-radius:100%; z-index:2; }
              /* Altın çeyrek daire: sol-alt merkezli, kart yüksekliğinin %80'i */
              .franchise-card .navy-layer::after { content:""; position:absolute; bottom:0; left:0; width:80%; height:70%; background:#b89b6f; border-top-right-radius:100%; z-index:1; }
              @media (max-width:520px) { .franchise-card { aspect-ratio:auto; min-height:560px; } .franchise-card .text-wrapper { font-size:.92rem; width:70%!important; left:50%!important; transform:translate(-50%,-50%)!important; top:54%!important; } .franchise-card .cta-wrapper { bottom:32px!important; } }
            `}</style>
          </section>

          {/* Career panel mirrored design */}
          <section
            className="relative isolate w-full max-w-[560px] aspect-square rounded-xl overflow-hidden bg-white border border-slate-900/5 font-sans mx-auto career-card"
            role="region"
            aria-labelledby="career-heading"
          >
            {/* Vertical heading & logo on right side */}
            <div className="absolute top-4 right-4 z-[5] flex flex-col items-center gap-3">
              <div className="vertical-title flex flex-col items-center">
                <h2 id="career-heading" className="m-0 font-extrabold tracking-[0.15em] text-[#1F3A52] text-[clamp(1.1rem,4vw,1.9rem)] leading-none select-none">
                  KARİYER
                </h2>
              </div>
              <div className="vertical-logo relative h-40 w-14">
                <Image src="/brand/logo--global.png" alt="Apaz Group" fill sizes="56px" className="object-contain" />
              </div>
            </div>
            <div className="absolute inset-0 career-layer">
              {/* Text block mirrored to right side (towards heading), so place nearer to right */}
              <div className="absolute z-[4] w-[55%] max-w-[320px] text-center text-[#1F3A52] font-medium text-[0.9rem] leading-[1.5] tracking-tight top-[60%] right-[45%] -translate-y-1/2 translate-x-[8%]">
                <p className="mb-[1.05em]"> Apaz Group olarak benimsediğimiz kurum kültürümüz, çalışanlarımıza ekip çalışmasına dayanan, güvenli, huzurlu, samimi ve başarı odaklı bir çalışma yaşamı sunar. Gelişim odaklı yapımızla sürekli öğrenmeyi destekliyoruz.</p>
                {/* <p className="mb-4"><br />Gelişim odaklı yapımızla<br />sürekli öğrenmeyi destekliyoruz.</p> */}
                <div className="flex flex-col items-center gap-2">
                  
                  <Link
                    href={franchiseHref}
                    className="inline-flex items-center justify-center rounded-md bg-[#1F3A52] text-white font-semibold tracking-wide text-[0.7rem] px-4 py-2 shadow-[0_2px_6px_-2px_rgba(0,0,0,0.25)] hover:bg-[#a28756] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-900 focus-visible:outline-offset-4"
                  >
                    BAŞVURU FORMU
                  </Link>
                </div>
              </div>
            </div>
            <style jsx>{`
              .career-card { font-size:16px; line-height:1.4; }
              /* Large GOLD quarter circle left-bottom (mirror of franchise), 80% diameter, slight transparency */
              .career-card .career-layer::before { content:""; position:absolute; bottom:0; left:0; width:90%; height:90%; background:rgba(184,155,111,0.85); border-top-right-radius:100%; z-index:2; }
              /* Small GREY quarter circle right-bottom, 45% diameter (mirror of navy) */
              .career-card .career-layer::after { content:""; position:absolute; bottom:0; right:0; width:55%; height:45%; background:#B2B2B2; border-top-left-radius:100%; z-index:1; }
              /* Vertical heading bottom-to-top */
              .career-card .vertical-title { writing-mode:vertical-rl; transform:rotate(180deg); }
              .career-card .vertical-title h1 { letter-spacing:0.05em; }
              /* Rotate logo vertical (bottom-to-top) similarly */
              .career-card .vertical-logo { writing-mode:vertical-rl; transform:rotate(270deg); }
              @media (max-width:520px) { .career-card { aspect-ratio:auto; min-height:560px; } }
            `}</style>
          </section>
        </div>
      </div>
    </section>
  );
}
