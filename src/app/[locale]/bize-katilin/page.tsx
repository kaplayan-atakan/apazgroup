import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { isLocale, defaultLocale } from '../../../lib/i18n';
import { generateSeoMetadata } from '../../../lib/seo';

interface PageProps {
  params: { locale: string };
}

export function generateStaticParams() {
  return [{ locale: 'tr' }, { locale: 'en' }];
}

export function generateMetadata({ params }: PageProps): Metadata {
  const { locale } = params;
  if (!isLocale(locale)) return {};
  return generateSeoMetadata({
    title: 'Bize Katılın | Apaz Group',
    description: 'Apaz Group ailesine katılın, güçlü ekip ruhu ve kariyer gelişimi fırsatları.',
    locale,
    slug: 'bize-katilin',
    type: 'article',
    imagePath: '/markalar/baydoner_foto.jpg'
  });
}

export default function BizeKatilinPage({ params }: PageProps) {
  const { locale } = params;
  const loc = isLocale(locale) ? locale : defaultLocale;
  return (
    <main className="pt-12 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Apaz Group Ailesine Katılın!</h1>
        <div className="space-y-5 md:space-y-6 text-slate-700 text-base md:text-lg leading-relaxed">
          <p>Baydöner, Bursa İshakbey ve PidebyPide markalarımızla, Türkiye’nin en seçkin lezzet duraklarında çalışmanın ayrıcalığını yaşamak istemez misiniz? Misafirlerimize unutulmaz deneyimler sunan büyük ve sıcak ailemizde siz de yerinizi alın!</p>
          <p>Siz de Apaz Group’un bir parçası olarak; güler yüzlü hizmet, yüksek kalite standartları ve samimiyetle dolu çalışma ortamımızda kariyerinizi bir üst seviyeye taşıyın. İşine tutkuyla bağlı, dinamik ve yaratıcı bir ekiple birlikte çalışmak, kariyer yolculuğunuzda önemli bir adım atmak istiyorsanız, sizi aramızda görmekten mutluluk duyarız!</p>
          <h2 className="text-2xl font-semibold tracking-tight pt-4">Neden Apaz Group?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Kariyer Gelişimi:</strong> Sürekli eğitim ve gelişim fırsatları ile kariyerinizi ilerletin.</li>
            <li><strong>Güçlü Ekip Ruhu:</strong> Dayanışma ve işbirliğiyle başarıyı birlikte yakalayın.</li>
            <li><strong>Öncü Markalar:</strong> Sektörde fark yaratan markalarımızın bir parçası olun.</li>
            <li><strong>Çeşitli Pozisyonlar:</strong> Yeteneğinize ve ilginize uygun pozisyonlarda çalışma fırsatı yakalayın.</li>
          </ul>
          <p>Apaz Group olarak, sizinle birlikte daha güçlü, daha başarılı ve daha mutlu bir geleceğe adım atmaktan büyük heyecan duyuyoruz!</p>
          <p className="font-medium">Başvuru İçin: Aşağıda yer alan Marka Logolarına Tıklayabilirsiniz.</p>
        </div>
      </div>
      <section className="mt-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { title: 'Apaz Group', logo: '/brand/group-apaz--about.avif', href: `/${loc}/basvuru_formu` },
                { title: 'Baydöner', logo: '/markalar/baydoner_logo.svg', href: 'https://www.baydoner.com/' },
                { title: 'Bursa İshakbey', logo: '/markalar/bursaishakbey_logo.png', href: 'https://www.bursaishakbey.com/basvuru-formu' },
                { title: 'PidebyPide', logo: '/markalar/pidebypide_logo.png', href: 'https://www.pidebypide.com/kariyer' }
              ].map(item => {
                const isPide = item.title === 'PidebyPide';
                const sizeClass = isPide ? 'w-24 h-24' : 'w-36 h-36 md:w-40 md:h-40';
                const sizeAttr = isPide ? '128px' : '192px';
                return (
                  <Link
                    key={item.title}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    href={item.href as any}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    aria-label={`${item.title} başvuru / bilgi`}
                  >
                    <span className={`relative ${sizeClass}`}>
                      <Image src={item.logo} alt={`${item.title} logo`} fill sizes={sizeAttr} className="object-contain" />
                    </span>
                    <span className="sr-only">{item.title}</span>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
    </main>
  );
}
