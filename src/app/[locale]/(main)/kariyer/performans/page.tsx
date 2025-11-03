import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { HeroGradient } from '../../../../../components/hero/HeroGradient';
import { CareerContent, CareerParagraph, CareerList, CareerListItem } from '../../../../../components/career/CareerContent';

import { isLocale, type Locale } from '../../../../../lib/i18n';
import { generateSeoMetadata } from '../../../../../lib/seo';

interface PageProps { params: { locale: string } }

export function generateStaticParams() { return [{ locale: 'tr' }, { locale: 'en' }]; }

export function generateMetadata({ params }: PageProps): Metadata {
  const { locale } = params;
  if (!isLocale(locale)) return {};
  const description = "Hedeflerle yönetim ve yetkinlik gelişimi odaklı performans yaklaşımımızın ana hatları.";
  return generateSeoMetadata({
    title: 'Hedeflerle Yönetim ve Performans | Apaz Group',
    description,
    locale,
    slug: 'kariyer/performans',
    type: 'article',
    imagePath: '/policies/performans-degerlendirmesi--policy.png'
  });
}

export default function PerformansPage({ params }: PageProps) {
  const { locale } = params;
  if (!isLocale(locale)) return null;
  const loc = locale as Locale;

  const withLocale = (path: string) => (path === '/' ? `/${loc}` : `/${loc}${path}`);

  return (
    <main className="relative">
      <HeroGradient
        heading="Hedeflerle Yönetim Ve Performans"
        intro="Çalışanlarımızın performanslarının sürekli gelişimine odaklanan grubumuz çok yönlü ölçüm ve gelişim planlarıyla sürekli başarıyı hedeflemektedir."
        radialPosition="circle_at_70%_30%"
        minHeights={{ base: 'min-h-[240px]', md: 'md:min-h-[300px]', lg: 'lg:min-h-[360px]' }}
        contentClassName="max-w-5xl"
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
                      src="/kariyer/calisanlarimizin_performans_degerlendirmesi.png"
                      alt="Hedeflerle yönetim ve performans yaklaşımımız"
                      fill
                      sizes="(min-width:1024px) 256px, (min-width:768px) 224px, 60vw"
                      className="object-cover"
                      priority={false}
                    />
                  </figure>
                  <CareerContent>
                    <CareerParagraph>
                      Çalışanlarının performanslarının sürekli gelişimine odaklanan grubumuz çok yönlü ölçüm ve gelişim planlarıyla sürekli başarıyı hedeflemektedir.
                    </CareerParagraph>
                    <CareerParagraph>
                      Performans Gelişim Sistemimizin iki ana ölçüm alanı bulunmaktadır.
                    </CareerParagraph>
                    <h2 className="text-xl font-semibold tracking-tight mt-8 mb-4">Hedeflerle Yönetim</h2>
                    <CareerParagraph>
                      Belirlenen kurumsal hedeflerin departmanlara ve bireylere indirilmesi suretiyle kurumun finansal hedeflerine ulaşmasını izliyor, dönem boyunca çalışanlarımıza verilen geri bildirimler ve eğitimlerle hem şirket performans eğrisinin yükselmesi hem de çalışanlarımızın gelişimini hedefliyoruz.
                    </CareerParagraph>
                    <h2 className="text-xl font-semibold tracking-tight mt-8 mb-4">Yetkinliklerimizin Geliştirilmesi</h2>
                    <CareerParagraph>
                      Çalışanlarımızın bireysel gelişimlerini ve kurumsal değerlerimizin sürdürülebilirliğini sağlamak için “yetkinliklerimiz”i aşağıdaki üç alanda ölçümlüyor ve gelişim planları ile sürekli zenginleştirilmesini hedefliyoruz. Bu kapsamda;
                    </CareerParagraph>
                    <CareerList>
                      <CareerListItem>Kurumumuzun sürdürülebilirliğini sağlayacak olan kurumsal temel yetkinliklerimiz,</CareerListItem>
                      <CareerListItem>Departmanların işlerini daha verimli ve daha inovatif şekilde yapabilmeleri için işlerin gerektirdiği fonksiyonel yetkinliklerimiz,</CareerListItem>
                      <CareerListItem>Kurumsal yönetim politikalarımızın ve değerlerimizin doğru işlediğini izleyebilmek için belirlenen yönetsel yetkinliklerimiz</CareerListItem>
                    </CareerList>
                    <CareerParagraph>
                      ölçümleniyor ve ölçüm sonuçlarına göre bireysel gelişim planları oluşturuyoruz.
                    </CareerParagraph>
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
                    <Link href={withLocale('/kariyer/ucret-politikamiz')} className="hover:text-slate-900 text-slate-600 transition-colors">Ücret Politikamız</Link>
                  </li>
                  <li>
                    {/* @ts-expect-error typedRoutes dynamic string */}
                    <Link href={withLocale('/kariyer/performans')} className="font-semibold text-slate-900 border-l-4 border-brand-yellow pl-2 block">Hedeflerle Yönetim ve Performans</Link>
                  </li>
                  <li>
                    {/* @ts-expect-error typedRoutes dynamic string */}
                    <Link href={withLocale('/kariyer/olanaklar')} className="hover:text-slate-900 text-slate-600 transition-colors">Sosyal Olanaklar</Link>
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
