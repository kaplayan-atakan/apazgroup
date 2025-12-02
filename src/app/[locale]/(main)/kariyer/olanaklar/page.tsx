import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { HeroGradient } from '../../../../../components/hero/HeroGradient';
import { CareerContent, CareerParagraph } from '../../../../../components/career/CareerContent';

import { isLocale, type Locale } from '../../../../../lib/i18n';
import { generateSeoMetadata } from '../../../../../lib/seo';

interface PageProps { params: { locale: string } }

export function generateStaticParams() { return [{ locale: 'tr' }, { locale: 'en' }]; }

export function generateMetadata({ params }: PageProps): Metadata {
  const { locale } = params;
  if (!isLocale(locale)) return {};
  const description = "Apaz Group'ta çalışanlara sunulan olanaklar: sosyal etkinlikler, yılbaşı kutlamaları, Tema Vakfı ağaç kartları ve bebek paketi uygulaması.";
  return generateSeoMetadata({
    title: 'Sosyal Olanaklar | Apaz Group',
    description,
    locale,
    slug: 'kariyer/olanaklar',
    type: 'article',
    imagePath: '/policies/calisan-olanaklari--policy.png'
  });
}

export default function OlanaklarPage({ params }: PageProps) {
  const { locale } = params;
  if (!isLocale(locale)) return null;
  const loc = locale as Locale;

  const withLocale = (path: string) => (path === '/' ? `/${loc}` : `/${loc}${path}`);

  return (
    <main className="min-h-dvh">
      {/* Gradient Hero */}
      <HeroGradient
  heading="Sosyal Olanaklar"
  headingClassName="text-brand-primary"
        intro="Apaz Group'ta çalışanlarımıza sunduğumuz olanaklar; ekip birlikteliğini, paylaşma kültürünü ve aidiyet duygusunu güçlendirmeyi hedefler."
        radialPosition="circle_at_30%_20%"
  minHeights={{ base: 'min-h-[180px]', md: 'md:min-h-[215px]', lg: 'lg:min-h-[260px]' }}
      />

      {/* Content & Sidebar */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px] items-start">
            {/* Article (Trimmed to requested scope) */}
            <article className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 ring-2 ring-brand-bronze-200/50 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] p-6 md:p-10">
              <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(circle_at_60%_40%,black,transparent_75%)] bg-gradient-to-br from-white/70 via-white/40 to-white/10" />
              <div className="relative md:flex md:items-start md:gap-8">
                <figure className="relative w-full md:w-56 lg:w-64 aspect-[4/5] rounded-lg overflow-hidden shadow ring-1 ring-slate-200 mb-6 md:mb-0 md:shrink-0">
                  <Image
                    src="/kariyer/calisanlara_sunulan_olanaklar.png"
                    alt="Çalışanlara sunulan sosyal olanakları temsil eden görsel"
                    fill
                    sizes="(min-width:1024px) 256px, (min-width:768px) 224px, 60vw"
                    className="object-cover"
                  />
                </figure>
                <CareerContent>
                  <CareerParagraph>Çalışanlarımızın iş dışında da birlikte vakit geçirmesi, ortak faaliyetlerde bulunmasını ve ortak başarıyı kutlamalarını sağlamak için futbol ve basketbol sporlarına yönelik turnuvalar ile eğlence amaçlı bowling turnuvası organizasyonları düzenlenmektedir.</CareerParagraph>
                  <CareerParagraph>Her yılın son haftasında yılbaşı kutlamaları kapsamında tüm çalışanlarımızın katıldığı yemek organizasyonları yapılmaktadır.</CareerParagraph>
                  <CareerParagraph>Çalışanlarımıza doğum günlerinde bu mutlu günlerini paylaşabilmek amacıyla “Tema Vakfı Ağaç Hediye Kartları” gönderilmekte bu vesile ile doğaya ve çevreye duyarlı bir şirket olduğumuzu da çalışanlarımızla paylaşmaktayız. Ayrıca her çalışana doğum gününde 1 gün ücretli doğum günü izni tanınmaktadır.</CareerParagraph>
                  <CareerParagraph>Çalışanlarımızın aidiyet duygusunu güçlendirmek için, yeni bebeği olan çalışma arkadaşlarımıza &apos;Bebek Paketi&apos; gönderiyoruz.</CareerParagraph>
                </CareerContent>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              <nav className="rounded-2xl bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 ring-2 ring-brand-bronze-200/50 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] p-6 sticky top-8">
                <h3 className="text-base font-semibold tracking-tight text-slate-900 mb-4">Kariyer Bölümleri</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    {/* @ts-expect-error typedRoutes dynamic string */}
                    <Link href={withLocale('/kariyer/insan-kaynaklari-politikamiz')} className="hover:text-slate-900 text-slate-600 transition-colors">İnsan Kaynakları Politikamız</Link>
                  </li>
                  <li>
                    {/* @ts-expect-error typedRoutes dynamic string */}
                    <Link href={withLocale('/kariyer/kurum-kulturumuz-ve-etik-degerlerimiz')} className="hover:text-slate-900 text-slate-600 transition-colors">Kurum Kültürümüz ve Etik Değerlerimiz</Link>
                  </li>
                  <li>
                    {/* @ts-expect-error typedRoutes dynamic string */}
                    <Link href={withLocale('/kariyer/ucret-politikamiz')} className="hover:text-slate-900 text-slate-600 transition-colors">Ücret Politikamız</Link>
                  </li>
                  <li>
                    {/* @ts-expect-error typedRoutes dynamic string */}
                    <Link href={withLocale('/kariyer/performans')} className="hover:text-slate-900 text-slate-600 transition-colors">Performans Değerlendirme</Link>
                  </li>
                  <li>
                    {/* @ts-expect-error typedRoutes dynamic string */}
                    <Link href={withLocale('/kariyer/olanaklar')} className="font-semibold text-slate-900 border-l-4 border-brand-yellow pl-2 block">Sosyal Olanaklar</Link>
                  </li>
                  <li>
                    {/* @ts-expect-error typedRoutes dynamic string */}
                    <Link href={withLocale('/kariyer/kariyer-egitim')} className="hover:text-slate-900 text-slate-600 transition-colors">Eğitim ve Kariyer Olanaklarımız</Link>
                  </li>
                  <li>
                    {/* @ts-expect-error typedRoutes dynamic string */}
                    <Link href={withLocale('/bize-katilin')} className="hover:text-slate-900 text-slate-600 transition-colors">Bize Katılın</Link>
                  </li>
                </ul>

              </nav>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
