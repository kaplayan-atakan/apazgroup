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
  const description = "Eğitim ihtiyaç analizi, saha ve genel müdürlük çalışanlarının gelişim programları ile kongre ve konferans katılımlarına dair özet.";
  return generateSeoMetadata({
    title: 'Eğitim ve Kariyer Olanaklarımız | Apaz Group',
    description,
    locale,
    slug: 'kariyer/kariyer-egitim',
    type: 'article',
    imagePath: '/policies/kariyer-egitim--policy.png'
  });
}

export default function KariyerEgitimPage({ params }: PageProps) {
  const { locale } = params;
  if (!isLocale(locale)) return null;
  const loc = locale as Locale;

  const withLocale = (path: string) => (path === '/' ? `/${loc}` : `/${loc}${path}`);

  return (
    <main className="relative">
      {/* Gradient Hero */}
      <HeroGradient
        heading="Eğitim ve Kariyer Olanaklarımız"
        intro="Apaz Group'ta çalışanlarımızın sürekli gelişimini destekliyor, kariyer yolculuklarında yanlarında oluyoruz. Sürekli öğrenme kültürü ile her çalışanımızın potansiyelini en üst düzeye çıkarmasına olanak tanıyoruz."
        radialPosition="circle_at_75%_35%"
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px] items-start">
            <article className="relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-sm ring-1 ring-slate-200 shadow-sm p-6 md:p-10">
              <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(circle_at_60%_40%,black,transparent_75%)] bg-gradient-to-br from-white/70 via-white/40 to-white/10" />
              <div className="relative md:flex md:items-start md:gap-8">
                <figure className="relative w-full md:w-56 lg:w-64 aspect-[4/5] rounded-lg overflow-hidden shadow ring-1 ring-slate-200 mb-6 md:mb-0 md:shrink-0">
                  <Image
                    src="/kariyer/kariyer_ve_egitim_olanaklarimiz.png"
                    alt="Kariyer ve eğitim gelişim olanaklarını temsil eden görsel"
                    fill
                    sizes="(min-width:1024px) 256px, (min-width:768px) 224px, 60vw"
                    className="object-cover"
                  />
                </figure>
                <CareerContent>
                  <CareerParagraph>Şirketimizde her sene sonunda bir sonraki yılın hedefleri ve mevcut senenin performans kriterlerinin sonuçları ve müşteri geri bildirimlerinin analizleri sonucunda eğitim ihtiyacı tespiti yapılmakta ve bu tespitler doğrultusunda gelişim planları oluşturulmaktadır.</CareerParagraph>
                  <CareerParagraph>Apaz Gelişim Atölyesi ismini verdiğimiz online Eğitim Okulumuz’da çalışanlarımızın mesleki gelişimlerini sağlayan uygulamalı, interaktif eğitimlerimizin yanı sıra Eğitim Şubeleri’mizde yöneticilik pozisyonlarına aday olan çalışanlarımıza uzun süreli teorik ve pratik eğitimlerden oluşan geliştirme programları sunulmaktadır.</CareerParagraph>
                  <CareerParagraph>Ayrıca Operasyon Yöneticilerimiz ve Saha Eğitim Müdürü’müz tarafından yapılan saha ziyaretlerinde yerinde uygulamalı eğitimler ile de çalışanlarımızın gelişimleri sağlanmaktadır.</CareerParagraph>
                  <CareerParagraph>Yasal zorunluluk gereği alınması gerekli eğitimlerimiz de yine Apaz Gelişim Atölyesi üzerinden tüm çalışanlarımızın erişimine sunulmakta olup çalışanlarımız, zaman ve mekan kısıtlaması olmaksızın eğitimlerini tamamlayarak sertifikalarını alabilmektedirler.</CareerParagraph>
                  <CareerParagraph>Genel Müdürlük çalışanlarımız ise, yıllık eğitim planları doğrultusunda şirket içi ve şirket dışı kaynaklardan mesleki gelişim konularında eğitim alırken teknolojiyi ve iş kollarındaki gelişmeleri takip edecek kongre ve konferanslara da katılmaktadırlar. </CareerParagraph>
                  <CareerParagraph>Ayrıca, tüm çalışanlarımız Apaz Gelişim Atölyemiz üzerinden kişisel gelişim ve misafir memnuniyeti konularında eğitim alabilmektedir.</CareerParagraph>
                </CareerContent>
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
                    <Link href={withLocale('/kariyer/ucret-politikamiz')} className="hover:text-slate-900 text-slate-600 transition-colors">Ücret Politikamız</Link>
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
                    <Link href={withLocale('/kariyer/kariyer-egitim')} className="font-semibold text-slate-900 border-l-4 border-brand-yellow pl-2 block">Eğitim ve Kariyer Olanaklarımız</Link>
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
