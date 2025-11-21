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
  const title = 'Apaz Group Hakkında | Haber';
  const description = 'Apaz Group haber: franchise büyüme planları, PidebyPide ve Bursa İshakbey stratejileri, destek ve yatırım koşulları.';
  return generateSeoMetadata({
    title,
    description,
    locale,
    slug: 'haberler/haber1',
    type: 'article',
    imagePath: '/images/news/bulent_polat_haber1.png'
  });
}

export default function Haber1Page({ params }: PageProps) {
  const { locale } = params;
  if (!isLocale(locale)) return null;

  // Article JSON-LD with known publish date from legacy list
  const jsonLd = generateArticleSchema({
    locale,
    title: 'Apaz Group Hakkında',
    description: 'Apaz Group haber: franchise büyüme planları, PidebyPide ve Bursa İshakbey stratejileri, destek ve yatırım koşulları.',
    slug: 'haberler/haber1',
    datePublished: '2020-07-01',
  });

  return (
    <main>
      {/* Hero */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-primary">Apaz Group Hakkında</h1>
          <div className="w-20 h-1 bg-brand-primary mx-auto mt-4" aria-hidden="true" />
        </div>
      </section>

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

      {/* Content */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left: main image */}
            <div>
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow">
                <Image
                  src="/images/news/bulent_polat_haber1.png"
                  alt="Haber 1"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right: text with preserved breaks and inline images */}
            <div className="prose max-w-none">
              <p>
                <br />
                Şu an mevcut franchise şube sayısı?<br />
                PidebyPide ile hızlı bir büyüme sürecindeyiz. Mevcut anlaşma yaptığımız 4 nokta var. Franchise verdiğimiz bir dönemdeyiz. Büyümeyi franchise ağırlıklı planladığımız için Türkiye genelinde çok sayıda franchise şube açacağız. Gelen talepleri değerlendiriyoruz. PidebyPide Franchise Modeli, kendi işini kurmak isteyen, kısa sürede karlı bir yatırım fırsatı arayan, gelişimin bir parçası olmak isteyen girişimciler için oluşturuldu. Düşük yatırım maliyeti sayesinde yatırımcılara oldukça cazip fırsatlar sunuyor.
                Bursa İshakbey ile büyüme planımız doğrultusunda yatırımlarımıza her geçen gün yenilerini ekliyoruz. Yeni şubelerimizi hayata geçirirken franchise adaylarına da kapılarımızı açıyoruz.
                <br /><br />
                Bu yıl franchise şube açma hedefiniz neydi? <br />
                Koronovirüs ile birlikte bu sayıyı ne şekilde güncellediniz?<br />
                PidebyPide için; 2020 sonunda yaklaşık 20 franchise şubeye ulaşmayı planlıyoruz. Bu kapsamda franchise adaylarına iş birliği yapmak için kapılarımızı açıyoruz. PidebyPide için toplam şube sayımızı yılsonunda 61 olarak planladık. Hızlı bir şekilde büyümek başlıca hedeflerimiz arasında yer alıyor. Koronavirüs, hedefimizde bir değişiklik yapmamıza sebep olmadı. Koronavirüs sonrası yeni dünya koşullarında yeni iş modellerimizle franchise olarak büyümeye devam edeceğiz.
                Bursa İshakbey için; markanın ne kadar doğru bir yatırım örneği olduğu Koronavirüs ile birlikte tekrar tescillenmiş oldu. Bu dönemde oluşan akımların etkisiyle yerel markaların önemi bir kez daha artmış oldu. Apaz Group, yıllar boyunca oluşan deneyimiyle birlikte geleneksel ürünümüz olan İskender’i; kurguladığı self servis modeliyle küçük m2’ li alanlara sığdırarak inşaat, ekipman, işçilik vb yatırım maliyetlerini düşürdü. Bu modele bağlı olarak satış fiyatlarını uygun seviyelerde tutmayı başaran Bursa İshakbey markamız ile bir kez daha yatırımcıların dikkatini çekeceğimize inanıyoruz. Caddelerde oluşacak düşük kiralama maliyetlerini fırsat bilerek özellikle araç trafiğine kapalı alanlarda nokta sayımızı artırmak markamızın hedefleri arasında yer alıyor. Önümüzdeki dönemde Türkiye’nin her köşesinde açacağımız restoranlarımızla Bursa İshakbey ile yakaladığımız büyüme ivmemizi sürdüreceğiz. Türkiye genelinde 13 ilde 19 şube ile hizmet veren Bursa İshakbey, yatırımlarını kesintisiz bir şekilde sürdürürken 2021 yılında şube sayısını iki katına çıkarmayı hedefliyor.
                <br /><br />
                <span className="block">
                  <Image src="/images/brands/800-400-pidebypide.png" alt="PidebyPide" width={800} height={400} className="w-full h-auto rounded-lg my-2" />
                </span>
                <br />
                Franchise şartlarınızda güncellemeler yapacak mısınız? (Kampanya – indirim vs…)
                Bayilerde aranan özellikler;
                PidebyPide Franchise Modeli, AVM ve caddelerde büyüme stratejisi üzerine kurulu. Özellikle cadde mağazalarında yaya trafiği yüksek lokasyonlara öncelik veriyoruz. AVM’lerin yemek katında, minimum 50 m2 büyüklüğündeki alanları, cadde lokasyonlarında ise minimum 100-120 m2’lik alanları tercih ediyoruz. PidebyPide, bulunduğu bölgenin en işlek noktalarında müdavimleriyle buluşuyor. Cadde mağazalarımızda paket servis uygulaması da sunuyoruz. PidebyPide markamız ile bizimle aynı yolda yürüyen franchise’larımızı her zaman ailenin bir parçası olarak gördük.  Ailemiz büyürken hayalimize ortak olan herkese, bu zor günlerde yeni şartlar sunmayı planlıyoruz.
                Bursa İshakbey restoranlarımız AVM’ lerin yemek katında 50 – 80 m2, caddelerde ise 100-120 m2 aralığındaki alanlarda hizmet verecek şekilde tasarlandı. Markanın geleneksel ürününü uygun fiyata verme stratejisini, paket servis kanalına da taşıyarak satış kanal sayısını artırmayı planlıyoruz. Oluşturduğumuz model ile kendisini bu hedeflere uygun gören, yeniliklere, gelişime ve geliştirmeye açık, yatırdığı paranın geri dönüşümünü hızlandırmaya katkı sağlayacak girişimcilerle iş birliği yapmayı hedefliyoruz.
                <br /><br />
                <span className="block">
                  <Image src="/images/brands/800-400-bursaishakbey.png" alt="Bursa İshakbey" width={800} height={400} className="w-full h-auto rounded-lg my-2" />
                </span>
                <br />
                Franchise şubelerinize bu dönemde ne gibi destekler vereceksiniz?
                Franchise şubelerimize restoranın açılış hazırlıkları süresince ve açılışın ilk gününden itibaren yoğun destek hizmetleri sağlıyoruz. Yeni ürün inovasyonu, pazarlama, satın alma, lojistik, eğitim, insan kaynakları, operasyon, kalite kontrol gibi konular, işletmecilerimize destek verdiğimiz alanlar arasında yer alıyor.
                PidebyPide ile her zaman markamıza yatırım yapmış olan franchise’larımızın yanında olduk. Tüm Türkiye’de Koronavirüs ile mücadele ettiğimiz bu dönemde aynı milli dayanışmayı markamız bünyesinde de devam ettiriyoruz. Franchise’larımızın cirosundan alınan %5’lik royalty oranını bu süreçte almıyoruz.
                Bursa İshakbey markamız için ise %5 royalty oranı belirledik.
                Her iki markamız için de ilk 20 franchise şubesinden sözleşme boyunca isim hakkı bedeli alınmayacak. Ayrıca PidebyPide ve Bursa İshakbey markalarımız için, franchise adaylarının dikkatini çekecek şekilde yatırım maliyetlerinin düşürülerek zamana yayılması seçeneklerine dair alternatif çalışmalarımız bulunmaktadır.
                <br /><br />
                Franchise giriş bedeli? Toplam yatırım maliyeti?<br />
                -Franchise giriş bedeli?<br />
                PidebyPide franchise planımızda AVM ve cadde mağazaları olmak üzere, iki model bulunuyor. İsim hakkı bedeli bu döneme özel olarak 75.000 TL + KDV’dir.
                <br /><br />
                Bülent POLAT
                Apaz Group Yönetim Kurulu Üyesi
                <br /><br />
                Bursa İshakbey markasına yatırım yapmak isteyen girişimciler için 150.000 TL+KDV isim hakkı bedeli bulunuyor.<br />
                <br /><br />
                -Toplam yatırım maliyeti?
                Lokasyon ve m2’ye göre değişiyor. Restoran kurulum maliyeti lokasyonlara ve metrekare büyüklüğüne göre farklılık gösterdiğinden dolayı proje aşamasında fiyatlandırılıyor.
                <br /><br />
                Önümüzdeki yıla ilişkin büyüme planı?
                PidebyPide ve Bursa İshakbey markalarımızı franchise yatırımcıları ile büyütmeye devam edeceğiz.
                <br /><br />
              </p>
            </div>
          </div>
        </div>
      </section>

  {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
    </main>
  );
}
