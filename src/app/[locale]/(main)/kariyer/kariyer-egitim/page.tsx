import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import { isLocale, type Locale } from '../../../../../lib/i18n';
import { generateSeoMetadata } from '../../../../../lib/seo';

interface PageProps { params: { locale: string } }

export function generateStaticParams() { return [{ locale: 'tr' }, { locale: 'en' }]; }

export function generateMetadata({ params }: PageProps): Metadata {
  const { locale } = params;
  if (!isLocale(locale)) return {};
  const description = "Eğitim ihtiyaç analizi, saha ve genel müdürlük çalışanlarının gelişim programları ile kongre ve konferans katılımlarına dair özet.";
  return generateSeoMetadata({
    title: 'Kariyer ve Eğitim Olanaklarımız | Apaz Group',
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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100" />
        <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle_at_75%_35%,#0f172a,transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl px-4 py-24 md:py-32 text-center">
          <h1 className="text-balance text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">Kariyer ve Eğitim Olanaklarımız</h1>
          <p className="mt-6 text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Apaz Group&apos;ta çalışanlarımızın sürekli gelişimini destekliyor, kariyer yolculuklarında yanlarında oluyoruz. Sürekli öğrenme kültürü ile her çalışanımızın potansiyelini en üst düzeye çıkarmasına olanak tanıyoruz.
          </p>
        </div>
      </section>

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
                <div className="prose prose-slate prose-lg max-w-none flex-1">
                  <p>Şirketimizde her sene sonunda bir sonraki yılın hedefleri ve mevcut senenin performans kriterlerinin sonuçları ve müşteri geri bildirimlerinin analizleri sonucunda eğitim ihtiyacı tespiti yapılmakta ve bu tespitleri doğrultusunda gelişim planları oluşturulmaktadır.</p>
                  <p>Saha çalışanlarımız uzmanlık eğitim programlarının yan ısıra kurum kültürünü geliştirici kişisel gelişim eğitimlerinin yanı sıra yasal zorunluluğumuz olan gıda ve hijyen eğitimlerine katılarak kendilerini geliştirmektedirler. Ayrıca bir üst göreve getirilirken de o görevin gerektirdiği teknik konularda eğitimlerini tamamlayarak ilgili pozisyona terfi etmektedirler.</p>
                  <p>Genel Müdürlük çalışanlarımız ise yine kendi konularında teknik eğitimlere ve kurum kültürünü geliştirici kişisel gelişim eğitimlerine katılmaktadırlar. Ayrıca teknolojiyi ve iş kollarındaki gelişmeleri takip edecek kongre ve konferanslara da gitmektedirler.</p>
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
                    <Link href={withLocale('/kariyer/kariyer-egitim')} className="font-semibold text-slate-900 border-l-4 border-brand-yellow pl-2 block">Kariyer ve Eğitim Olanaklarımız</Link>
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
