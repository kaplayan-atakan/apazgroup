import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

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
    <main className="min-h-dvh">
      {/* Main two-column section */}
      <section className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: contact info */}
          <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 ring-2 ring-brand-bronze-200/50 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] p-6 md:p-8 self-start">
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-brand-primary">Bize Ulaşın</h2>
              <p className="text-slate-700 mb-8">
                Sorularınız, önerileriniz veya iş birliği talepleriniz için bizimle iletişime geçebilirsiniz.
                Formu doldurarak veya aşağıdaki iletişim bilgilerimiz aracılığıyla bize ulaşabilirsiniz.
              </p>

              <div className="space-y-6">
                <div>
                  <div className="text-sm font-semibold text-brand-accent mb-1">Adres</div>
                  <div className="text-slate-700">Adalet Mah. Anadolu Cad. No:41 Bağımsız Bölüm K:20 No:17 Megapol Tower Bayraklı - İZMİR</div>
                </div>

                <div>
                  <div className="text-sm font-semibold text-brand-accent mb-1">E-posta</div>
                  <Link href="mailto:info@apazgroup.com" className="text-brand-accent hover:text-brand-accent transition-colors">info@apazgroup.com</Link>
                </div>

                <div>
                  <div className="text-sm font-semibold text-brand-accent mb-1">Telefon</div>
                  <Link href="tel:+902324644235" className="text-brand-accent hover:text-brand-accent transition-colors">+90 232 464 42 35</Link>
                </div>

                {/* <div className="flex items-center gap-4 pt-2">
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
                </div> */}
              </div>
            </div>
          </div>

          {/* Right: Kariyer.net + LinkedIn cards, then form */}
          <div className="space-y-10">
            {/* Kariyer.net Card */}
      <div>
              <a
                href="https://www.kariyer.net/is-ilanlari?fpi=10543&hc=T"
                target="_blank"
                rel="noopener noreferrer"
        className="group block rounded-xl bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 p-6 md:p-7 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] ring-2 ring-brand-bronze-200/50 hover:ring-brand-secondary/50 hover:shadow-xl transition focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-secondary/40"
                aria-label="Kariyer.net üzerinde Apaz Group iş ilanlarını görüntüle (yeni sekme)"
              >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                  <div className="w-48 flex justify-center">
                    <Image
                      src="/hr/kariyer-net.webp"
                      alt="Kariyer.net üzerinde Apaz Group iş ilanları"
                      width={360}
                      height={120} 
                      className="h-16 w-auto object-scale-down drop-shadow-sm transition-transform duration-300 group-hover:scale-[1.01]" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-xl font-semibold tracking-tight text-brand-primary mb-2">Kariyer.net İlanlarımız</h2>
                    <p className="text-sm text-brand-primary max-w-md">Güncel ilanlarımızı Kariyer.net sayfamızdan inceleyebilir ve doğrudan başvurabilirsiniz.</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-primary group-hover:text-brand-secondary">
                      Kariyer.net&apos;te görüntüle
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
            {/* LinkedIn Jobs Card */}
      <div>
              <a
                href="https://www.linkedin.com/company/apaz-group/jobs/"
                target="_blank"
                rel="noopener noreferrer"
        className="group block rounded-xl bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 p-6 md:p-7 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] ring-2 ring-brand-bronze-200/50 hover:ring-brand-secondary/50 hover:shadow-xl transition focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-secondary/40"
                aria-label="LinkedIn üzerinde Apaz Group açık pozisyonlarını görüntüle (yeni sekme)"
              >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                  <div className="w-48 flex justify-center">
                    <Image
                      src="/hr/linkedin.png"
                      alt="Apaz Group LinkedIn İlanları"
                      width={360}
                      height={120}
                      className="h-16 w-auto object-scale-down drop-shadow-sm transition-transform duration-300 group-hover:scale-[1.01]" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-xl font-semibold tracking-tight text-brand-primary mb-2">LinkedIn Üzerinden Açık Pozisyonlar</h2>
                    <p className="text-sm text-brand-primary max-w-md">Güncel ilanlarımızı LinkedIn sayfamızdan inceleyebilir ve doğrudan başvurabilirsiniz.</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-primary group-hover:text-brand-secondary">
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
            <div className="rounded-xl bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 p-6 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] ring-2 ring-brand-bronze-200/50">
              <h3 className="text-xl font-bold mb-4 text-brand-primary">İletişim Formu</h3>
              <ContactForm />
            </div>
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
    </main>
  );
}
