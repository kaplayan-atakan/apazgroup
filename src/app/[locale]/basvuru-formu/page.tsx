import type { Metadata } from 'next';
import Image from 'next/image';

import { isLocale } from '../../../lib/i18n';
import { generateSeoMetadata } from '../../../lib/seo';

import BasvuruFormClient from './BasvuruFormClient';

interface PageProps { params: { locale: string } }

export function generateMetadata({ params }: PageProps): Metadata {
  const { locale } = params;
  if (!isLocale(locale)) return {};
  return generateSeoMetadata({
    title: 'Başvuru Formu | Apaz Group',
    description: 'Apaz Group iş başvuru formu',
    locale,
    slug: 'basvuru-formu',
    type: 'article',
    imagePath: '/markalar/baydoner_foto.jpg'
  });
}

export default function BasvuruFormuPage() {
  return (
    <main className="pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Başvuru Formu</h1>
        <p className="text-slate-700 mb-10 leading-relaxed text-base md:text-lg">Aşağıdaki formu doldurarak Apaz Group bünyesindeki açık pozisyonlara başvuruda bulunabilirsiniz. Zorunlu alanları eksiksiz doldurduğunuzdan emin olun.</p>
        {/* LinkedIn Jobs Card */}
        <div className="mb-12">
          <a
            href="https://www.linkedin.com/company/apaz-group/jobs/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 md:p-7 shadow-sm ring-1 ring-transparent hover:shadow-md hover:ring-brand-primary/40 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
            aria-label="LinkedIn üzerinde Apaz Group açık pozisyonlarını görüntüle (yeni sekme)"
          >
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-full sm:w-auto flex justify-center">
                <Image
                  src="/hr/linkedin.svg"
                  alt="Apaz Group LinkedIn İlanları"
                  width={360}
                  height={120}
                  className="w-full max-w-[360px] sm:max-w-[300px] h-auto drop-shadow-sm transition-transform duration-300 group-hover:scale-[1.02]"
                  priority={false}
                />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-semibold tracking-tight text-brand-primary mb-2">
                  LinkedIn Üzerinden Açık Pozisyonlar
                </h2>
                <p className="text-sm text-slate-600 max-w-md">
                  Güncel ilanlarımızı LinkedIn sayfamızdan inceleyebilir ve doğrudan başvurabilirsiniz.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-accent group-hover:underline">
                  LinkedIn&apos;de görüntüle
                  <svg
                    className="w-4 h-4 text-brand-accent transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </a>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 md:p-8">
          <BasvuruFormClient />
        </div>
      </div>
    </main>
  );
}
