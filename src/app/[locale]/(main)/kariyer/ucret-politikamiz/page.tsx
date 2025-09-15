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
  const description = "Ücret politikamızın temel prensipleri: nitelikli çalışanı çekme, elde tutma, yüksek performansı ödüllendirme ve yasal yükümlülükleri eksiksiz yerine getirme.";
  return generateSeoMetadata({
    title: 'Ücret Politikamız | Apaz Group',
    description,
    locale,
    slug: 'kariyer/ucret-politikamiz',
    type: 'article',
    imagePath: '/policies/ucret-politikamiz--policy.png'
  });
}

export default function UcretPolitikamizPage({ params }: PageProps) {
  const { locale } = params;
  if (!isLocale(locale)) return null;
  const loc = locale as Locale;

  const withLocale = (path: string) => (path === '/' ? `/${loc}` : `/${loc}${path}`);

  return (
    <main className="relative">
      <HeroGradient
        heading="Ücret Politikamız"
        intro="Apaz Group olarak, çalışanlarımıza adil, eşitlikçi ve şeffaf bir ücret politikası sunmayı taahhüt ediyoruz. Ücretlendirme sistemimiz, iş değeri, performans ve rekabetçi pazar dinamiklerine dayanmaktadır."
        radialPosition="circle_at_35%_30%"
      />
      <section className="py-12 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px] items-start">
            <article className="relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-sm ring-1 ring-slate-200 shadow-sm p-6 md:p-10">
              <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(circle_at_60%_40%,black,transparent_75%)] bg-gradient-to-br from-white/70 via-white/40 to-white/10" />
              <div className="relative">
                <div className="md:flex md:items-start md:gap-8">
                  <figure className="relative w-full md:w-56 lg:w-64 aspect-[4/5] rounded-lg overflow-hidden shadow ring-1 ring-slate-200 mb-6 md:mb-0 md:shrink-0">
                    <Image
                      src="/kariyer/ucret_politikamiz.png"
                      alt="Ücret Politikamız"
                      fill
                      sizes="(min-width:1024px) 256px, (min-width:768px) 224px, 60vw"
                      className="object-cover"
                      priority={false}
                    />
                  </figure>
                  <CareerContent>
                    <CareerParagraph>Ücret politikamız, nitelikli çalışanları kurumumuza çekme, mevcut çalışanlarımızı elde tutma, performansı yüksek ve nitelikli çalışanlarımızı ödüllendirme ve yasal yükümlülüklerimizi tam ve eksiksiz yerine getirme prensiplerine dayanmaktadır.</CareerParagraph>
                    <CareerParagraph>Bu politikadan hareketle ücret işgücü piyasalarındaki dengelere, işin içeriğine ve işi yapan bireyin yetkinliği ve performansına dayalı olarak kurgulanmıştır.</CareerParagraph>
                  </CareerContent>
                </div>
              </div>
            </article>
            <aside className="space-y-6">
              <nav className="rounded-2xl bg-white/60 backdrop-blur-sm ring-1 ring-slate-200 shadow-sm p-6 sticky top-8">
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
                    <Link href={withLocale('/kariyer/ucret-politikamiz')} className="font-semibold text-slate-900 border-l-4 border-brand-yellow pl-2 block">Ücret Politikamız</Link>
                  </li>
                  <li>
                    {/* @ts-expect-error typedRoutes dynamic string */}
                    <Link href={withLocale('/kariyer/performans')} className="hover:text-slate-900 text-slate-600 transition-colors">Performans Değerlendirme</Link>
                  </li>
                  <li>
                    {/* @ts-expect-error typedRoutes dynamic string */}
                    <Link href={withLocale('/kariyer/olanaklar')} className="hover:text-slate-900 text-slate-600 transition-colors">Sosyal Olanaklar</Link>
                  </li>
                  <li>
                    {/* @ts-expect-error typedRoutes dynamic string */}
                    <Link href={withLocale('/kariyer/kariyer-egitim')} className="hover:text-slate-900 text-slate-600 transition-colors">Kariyer ve Eğitim Olanaklarımız</Link>
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
