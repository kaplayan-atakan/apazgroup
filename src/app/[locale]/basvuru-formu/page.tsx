import type { Metadata } from 'next';

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
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 md:p-8">
          <BasvuruFormClient />
        </div>
      </div>
    </main>
  );
}
