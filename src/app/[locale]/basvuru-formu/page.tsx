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

export default function BasvuruFormuPage({ params }: PageProps) {
  const { locale } = params;
  const loc = isLocale(locale) ? locale : 'tr';
  return (
    <main className="relative">
      <div className="container mx-auto px-4 max-w-4xl pt-12 pb-24">
        <p className="text-slate-700 mb-10 leading-relaxed text-base md:text-lg">{loc === 'tr' ? 'Aşağıdaki linklerden Apaz Group bünyesindeki açık pozisyonlara başvuruda bulunabilirsiniz.' : 'Fill out the form below to apply for open positions within Apaz Group. Please ensure all required fields are completed.'}</p>
        {/* LinkedIn Jobs Card */}
        <div className="mb-12">
          <a
            href="https://www.linkedin.com/company/apaz-group/jobs/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 md:p-7 shadow-sm ring-1 ring-transparent hover:shadow-md hover:ring-brand-primary/40 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
            aria-label="LinkedIn üzerinde Apaz Group açık pozisyonlarını görüntüle (yeni sekme)"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <div className="w-48 flex justify-center">
                <Image
                  src="/hr/linkedin.svg"
                  alt="Apaz Group LinkedIn İlanları"
                  width={360}
                  height={120}
                  className="h-16 w-auto object-scale-down drop-shadow-sm transition-transform duration-300 group-hover:scale-[1.01]"
                  priority={false} />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-semibold tracking-tight text-brand-primary mb-2">
                  {loc === 'tr' ? 'LinkedIn Üzerinden Açık Pozisyonlar' : 'Open Roles on LinkedIn'}
                </h2>
                <p className="text-sm text-slate-600 max-w-md">
                  {loc === 'tr' ? 'Güncel ilanlarımızı LinkedIn sayfamızdan inceleyebilir ve doğrudan başvurabilirsiniz.' : 'View our current openings on LinkedIn and apply directly.'}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-accent group-hover:underline">
                  {loc === 'tr' ? 'LinkedIn\'de görüntüle' : 'View on LinkedIn'}
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
        {/* Kariyer.net Jobs Card */}
        <div className="mb-12">
          <a
            href="https://www.kariyer.net/is-ilanlari?fpi=10543&hc=T"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 md:p-7 shadow-sm ring-1 ring-transparent hover:shadow-md hover:ring-brand-primary/40 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
            aria-label={loc === 'tr' ? 'Kariyer.net üzerinde Apaz Group iş ilanlarını görüntüle (yeni sekme)' : 'View Apaz Group job listings on Kariyer.net (new tab)'}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <div className="w-48 flex justify-center">
                <Image
                  src="/hr/kariyer-net.webp"
                  alt={loc === 'tr' ? 'Kariyer.net üzerinde Apaz Group iş ilanları' : 'Apaz Group job listings on Kariyer.net'}
                  width={360}
                  height={120}
                  className="h-16 w-auto object-scale-down drop-shadow-sm transition-transform duration-300 group-hover:scale-[1.01]" />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-semibold tracking-tight text-brand-primary mb-2">
                  {loc === 'tr' ? 'Kariyer.net İlanlarımız' : 'Our Listings on Kariyer.net'}
                </h2>
                <p className="text-sm text-slate-600 max-w-md">
                  {loc === 'tr' ? 'Güncel ilanlarımızı Kariyer.net sayfamızdan inceleyebilir ve doğrudan başvurabilirsiniz.' : 'Browse our current postings on Kariyer.net and apply directly.'}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-accent group-hover:underline">
                  {loc === 'tr' ? 'Kariyer.net\'te görüntüle' : 'View on Kariyer.net'}
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
        <p className="text-slate-700 mb-10 leading-relaxed text-base md:text-lg">{loc === 'tr' ? 'Ayrıca, özgeçmiş bankamızda yer almak isterseniz aşağıdaki formu doldurarak başvurunuzu gerçekleştirebilirsiniz. Zorunlu alanları eksiksiz doldurduğunuzdan emin olun.' : 'Fill out the form below to apply for open positions within Apaz Group. Please ensure all required fields are completed.'}</p>
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 md:p-8">
          <BasvuruFormClient />
        </div>
      </div>
    </main>
  );
}
