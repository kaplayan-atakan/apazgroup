import type { Metadata } from 'next';
import { HeroGradient } from '../../../../components/hero/HeroGradient';
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
      {/* Unified Hero using HeroGradient */}
      <HeroGradient
        heading={loc === 'tr' ? 'Başvuru Formu' : 'Application Form'}
        imageSrc="/hr/ik-apaz--bize-katilin.jpg"
        imageAlt={loc === 'tr' ? 'Başvuru Formu Görseli' : 'Application Form Hero Image'}
        overlayColor="black/40"
        variant="brand"
        radialPosition="circle_at_30%_20%"
        contentClassName="text-center"
        priorityImage
      />

      {/* Intro + Form */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="prose prose-slate text-center max-w-2xl mx-auto mb-8">
            <p>
              {loc === 'tr'
                ? 'Apaz Group bünyesinde yer alan markalarımızda çalışmak için aşağıdaki formu doldurarak başvuruda bulunabilirsiniz.'
                : 'You can apply to our brands by filling the form below.'}
            </p>
          </div>
          <div className="rounded-xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 p-6 md:p-8 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] ring-2 ring-brand-bronze-200/50">
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
              title={loc === 'tr' ? "PidebyPide'de Kariyer" : 'Career at PidebyPide'}
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
