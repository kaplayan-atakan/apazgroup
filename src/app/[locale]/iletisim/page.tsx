import type { Metadata } from 'next';
import Link from 'next/link';

import { generateSeoMetadata } from '../../../lib/seo';
import { isLocale } from '../../../lib/i18n';
import { ContactForm } from '../../../components/forms/ContactForm';

type Props = { params: { locale: string } };

export const dynamic = 'force-static';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale;
  return generateSeoMetadata({
    title: 'İletişim | Apaz Group',
    description: 'Apaz Group ile iletişime geçin: adres, e-posta, telefon bilgileri ve iletişim formu.',
    locale,
    slug: 'iletisim',
    imagePath: '/hero/slider--home-hero.jpg'
  });
}

export default function Page({ params }: Props) {
  const { locale } = params;
  if (!isLocale(locale)) return null;

  return (
    <>
      {/* Main two-column section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: contact info */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Bize Ulaşın</h2>
            <p className="text-slate-700 mb-8">
              Sorularınız, önerileriniz veya iş birliği talepleriniz için bizimle iletişime geçebilirsiniz.
              Formu doldurarak veya aşağıdaki iletişim bilgilerimiz aracılığıyla bize ulaşabilirsiniz.
            </p>

            <div className="space-y-6">
              <div>
                <div className="text-sm font-semibold text-slate-500">Adres</div>
                <div className="text-slate-800">Adalet Mah. Anadolu Cad. No:41 Bağımsız Bölüm K:20 No:17 Megapol Tower Bayraklı - İZMİR</div>
              </div>

              <div>
                <div className="text-sm font-semibold text-slate-500">E-posta</div>
                <Link href="mailto:info@apazgroup.com" className="text-slate-800 hover:text-brand-yellow">info@apazgroup.com</Link>
              </div>

              <div>
                <div className="text-sm font-semibold text-slate-500">Telefon</div>
                <Link href="tel:+902324644235" className="text-slate-800 hover:text-brand-yellow">+90 232 464 42 35</Link>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <Link
                  href="https://twitter.com/ApazGroup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md px-3 py-2 ring-1 ring-slate-300 hover:bg-slate-50"
                  aria-label="Twitter"
                >
                  Twitter
                </Link>
                <Link
                  href="https://www.linkedin.com/company/apaz-group"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md px-3 py-2 ring-1 ring-slate-300 hover:bg-slate-50"
                  aria-label="LinkedIn"
                >
                  LinkedIn
                </Link>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-white p-6 rounded-lg shadow-sm ring-1 ring-slate-200">
            <h3 className="text-xl font-bold mb-4">İletişim Formu</h3>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[24rem]">
        <iframe
          title="Megapol Tower Bayraklı - İZMİR Kat 20"
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=Megapol%20Tower%20Bayrakl%C4%B1%20-%20%C4%B0ZM%C4%B0R%20Kat%2020&z=15&output=embed"
        />
      </section>
    </>
  );
}
