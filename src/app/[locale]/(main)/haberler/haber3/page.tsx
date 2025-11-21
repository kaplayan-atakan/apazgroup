import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import { isLocale } from '../../../../../lib/i18n';
import { generateSeoMetadata, generateArticleSchema } from '../../../../../lib/seo';

interface PageProps { params: { locale: string } }

export function generateStaticParams() { return [{ locale: 'tr' }, { locale: 'en' }]; }

export function generateMetadata({ params }: PageProps): Metadata {
  const { locale } = params;
  if (!isLocale(locale)) return {};
  const title = 'En Etkili 50 CEO / Bülent Polat | Haber';
  const description = 'Apaz Group 2019-2020 değerlendirmeleri, büyüme hedefleri, Baydöner-PidebyPide-Bursa İshakbey marka stratejileri.';
  return generateSeoMetadata({
    title,
    description,
    locale,
    slug: 'haberler/haber3',
    type: 'article',
    imagePath: '/images/news/haber-3-420x220.png',
  });
}

export default function Haber3Page({ params }: PageProps) {
  const { locale } = params;
  if (!isLocale(locale)) return null;

  const jsonLd = generateArticleSchema({
    locale,
    title: 'En Etkili 50 CEO / Bülent Polat',
    description: 'Apaz Group 2019-2020 değerlendirmeleri, büyüme hedefleri, Baydöner-PidebyPide-Bursa İshakbey marka stratejileri.',
    slug: 'haberler/haber3',
    datePublished: '2020-01-14',
  });

  return (
    <main>
      {/* Hero */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-primary">En Etkili 50 CEO / Bülent Polat</h1>
          <div className="w-20 h-1 bg-brand-primary mx-auto mt-4" aria-hidden="true" />
        </div>
      </section>

      {/* Content */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left: main image */}
            <div>
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow">
                <Image
                  src="/images/news/haber-3-420x220.png"
                  alt="Haber 3"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

      {/* Right: content with preserved breaks */}
            <div className="prose max-w-none">
              <p>
                <br />
                <b>2019 yılı sizin için nasıl geçti, şirket için koyduğunuz hedeflere ulaştınız mı?</b><br />
        Apaz Group olarak, bünyemizdeki markalarla gelişim trendimizi 2019’da da devam ettirdik. Sektörel anlamda pazarın lider kuruluşlarından biri olarak, başarılı bir şekilde 2019’u tamamlıyoruz. Türk mutfağına hak ettiği değeri verme vizyonuyla çalışmalarımızı sürdürdük. İstikrarlı bir şekilde büyümeye devam ediyoruz. Bundan sonra yapacağımız yeni yatırımlarla, büyüme trendimizi sürdüreceğiz. Baydöner, PidebyPide ve Bursa İshakbey markalarımızla; Türk mutfağının yerel lezzetlerini kaliteli hizmet ve uygun fiyat anlayışıyla lezzet tutkunlarının beğenisine sunmaya devam edeceğiz. Yatırımlarımızı sadece Baydöner markamız ile de sınırlandırmıyoruz. Türk mutfağının klasikleşmiş tadı döneri en doyurucu haliyle ve uygun fiyatlarla sunmayı ilke edinen Bursa
        İshakbey markamızın şubelerinin de açılışlarına ağırlık verdik. Aynı zamanda Türk mutfağının yerel yemeği pideyi hızlı ve leziz bir şekilde sunan PidebyPide restoranlarımızı da açmayı sürdürüyoruz. Dışarıda yemek yeme konusunda geleneksel lezzet döneri tercih edenlerin gözdesi Baydöner, yeni ürünleri ile fark yaratıyor. Türk mutfağının yerel yemeği pidenin hızlı ve doyurucu halini sunan PidebyPide, her geçen gün restoranlarına yenilerini ekliyor. Önümüzdeki dönemde Türkiye’nin dört bir köşesine götürmeyi planladığımız PidebyPide için hazırladığımız franchise modeli ile girişimcilere pek çok cazip fırsat sunuyoruz. Türk damak tadına uygun lezzetleri ve uygun fiyat politikasıyla hizmet veren Bursa İshakbey markamızla, perakende ağımızı genişletmek üzere restoran yatırımlarımıza devam ediyoruz.
                <br /><br /><br />
                <b>2020 hedefleriniz nelerdir ve sizce sektörünüz için 2020’de nasıl bir tablo var?</b><br />
        Apaz Group olarak PidebyPide ve Bursa İshakbey markalarımızla yurt içi yatırımlarımıza odaklanmış durumdayız. Bu yolda çalışmalarımıza devam ediyoruz.
        PidebyPide tarafında, 2020 sonunda yaklaşık 20 franchise şubeye ulaşmayı planlıyoruz. Bu kapsamda franchise adaylarına işbirliği yapmak için kapılarımızı açıyoruz. İşletmecilerimize, restoranın açılış hazırlıkları süresince ve açılışın ilk gününden itibaren pazarlama, satın
        alma, lojistik, eğitim, insan kaynakları, operasyon, kalite kontrol gibi yoğun destek hizmetleri vereceğiz. PidebyPide için toplam şube sayımızı yılsonunda 60 olarak planladık. Hızlı bir şekilde büyümek başlıca hedeflerimiz arasında yer alıyor.
        Bursa İshakbey markamız ile yatırımlarımıza hız kesmeden devam ediyoruz. Son olarak Kasım ayında 4 farklı bölgede 4 yeni şube açtık. Önümüzdeki dönemde Türkiye’nin her köşesinde açacağımız restoranlarımızla büyüme ivmemizi sürdüreceğiz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}

      {/* Back to listing */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <Link
            href={`/${locale}/haberler`}
            className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            Haberler&apos;e dön
          </Link>
        </div>
      </section>
    </main>
  );
}
