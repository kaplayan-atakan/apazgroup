import type { Metadata } from 'next';
import Image from 'next/image';

import { isLocale, type Locale } from '../../../../lib/i18n';
import { generateSeoMetadata } from '../../../../lib/seo';
import { BasvuruForm } from '../../../../components/forms/BasvuruForm';
import { BrandCareerCard } from '../../../../components/cards/BrandCareerCard';

interface PageProps { params: { locale: string } }

export function generateStaticParams() { return [{ locale: 'tr' }, { locale: 'en' }]; }

export function generateMetadata({ params }: PageProps): Metadata {
  const { locale } = params;
  if (!isLocale(locale)) return {};
  return generateSeoMetadata({
    title: locale === 'tr' ? 'Başvuru Formu' : 'Application Form',
    description: locale === 'tr'
      ? 'Apaz Group bünyesindeki markalar için başvuru formu.'
      : 'Application form for roles across Apaz Group brands.',
    locale,
    slug: 'kariyer/basvuru-formu',
    type: 'article',
    imagePath: '/hr/ik-apaz--bize-katilin.webp'
  });
}

export default function BasvuruFormuPage({ params }: PageProps) {
  const { locale } = params;
  const loc = (isLocale(locale) ? locale : 'tr') as Locale;
  return (
    <div>
      {/* Hero */}
      <section className="relative w-full h-[40vh] min-h-[320px] md:h-[50vh]">
        <Image src="/hr/ik-apaz--bize-katilin.jpg" alt="Başvuru Formu" fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-sm">
            {loc === 'tr' ? 'Başvuru Formu' : 'Application Form'}
          </h1>
        </div>
      </section>

      {/* Intro + Form */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="prose prose-slate text-center max-w-2xl mx-auto mb-8">
            <h2 className="!mt-0">{loc === 'tr' ? 'Kariyer Başvuru Formu' : 'Career Application Form'}</h2>
            <p>
              {loc === 'tr'
                ? 'Apaz Group bünyesinde yer alan markalarımızda çalışmak için aşağıdaki formu doldurarak başvuruda bulunabilirsiniz.'
                : 'You can apply to our brands by filling the form below.'}
            </p>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm ring-1 ring-slate-200">
            <BasvuruForm locale={loc} />
          </div>
        </div>
      </section>

      {/* Brand career links */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-center">{loc === 'tr' ? 'Markalarımızda Kariyer' : 'Careers at Our Brands'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <BrandCareerCard
              logo="/brands/baydoner-logo--franchising.png"
              image="/hr/ik-baydoner--bize-katilin.jpg"
              title={loc === 'tr' ? "Baydöner'de Kariyer" : 'Career at Baydöner'}
              link="https://www.baydoner.com/kariyer/basvuru-formu"
            />
            <BrandCareerCard
              logo="/markalar/pidebypide_logo.png"
              image="/hr/ik-pidebypide--bize-katilin.jpg"
              title={loc === 'tr' ? "Pide by Pide'de Kariyer" : 'Career at Pide by Pide'}
              link="#"
            />
            <BrandCareerCard
              logo="/markalar/bursaishakbey_logo.png"
              image="/hr/ik-bursaishakbey--bize-katilin.jpg"
              title={loc === 'tr' ? "Bursa İshakbey'de Kariyer" : 'Career at Bursa İshakbey'}
              link="#"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
