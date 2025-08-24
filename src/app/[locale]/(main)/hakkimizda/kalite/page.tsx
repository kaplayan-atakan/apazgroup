import type { Metadata } from 'next';
import Image from 'next/image';

import { isLocale } from '../../../../../lib/i18n';
import { generateSeoMetadata } from '../../../../../lib/seo';
import blurMap from '../../../../../lib/asset-blur-map.json';

interface PageProps { params: { locale: string } }

export function generateStaticParams() { return [{ locale: 'tr' }, { locale: 'en' }]; }

export function generateMetadata({ params }: PageProps): Metadata {
  const { locale } = params;
  if (!isLocale(locale)) return {};
  return generateSeoMetadata({
    title: 'Kalite | Apaz Group',
    description: 'Kalite politikamız, süreçlerimiz ve hijyen uygulamalarımız.',
    locale,
    slug: 'hakkimizda/kalite',
    type: 'article',
    imagePath: '/kalite/kalite-1.jpg'
  });
}

export default function KalitePage({ params }: PageProps) {
  const { locale } = params;
  if (!isLocale(locale)) return null;

  const images = [
    { src: '/kalite/kalite-1.jpg', alt: 'Kalite görsel 1' },
    { src: '/kalite/kalite-2.jpg', alt: 'Kalite görsel 2' },
    { src: '/kalite/kalite-3.jpg', alt: 'Kalite görsel 3' },
    { src: '/kalite/kalite-4.jpg', alt: 'Kalite görsel 4' }
  ];

  return (
    <main className="px-6 py-10 md:py-14 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Left textual content */}
        <div className="prose prose-slate max-w-none">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-primary tracking-tight mb-6 relative inline-block after:absolute after:left-0 after:-bottom-1 after:h-1 after:w-2/3 after:bg-gradient-to-r after:from-brand-accent after:to-brand-yellow/70">
            Kalite
          </h1>
          <p>
            Ürünün ilk kaynağından misafirimize ulaşıncaya kadar ki tüm aşamaları kontrol ediyor, gereken önlemleri alıyor, denetliyor ve sürekli iyileştiriyoruz.
          </p>
          <h2 className="mt-10 mb-4 text-2xl font-semibold text-brand-secondary">Kalite politikamız</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Hijyenik ortamlarda, kaliteli ve güvenli gıda üretilmesi bilincinin tüm çalışanlarda oluşturulması için her türlü teknik donanım ve desteği sağlamak,</li>
            <li>Müşterilerimizin her ziyaretinde memnuniyetlerini arttırmak için çalışmak,</li>
            <li>Müşteri ve çalışanlarımıza karşı yasal ve düzenleyici tüm şartlara uymak,</li>
            <li>Planlanmış eğitim programları ile çalışanlarımızla beraber, sürekli daha iyiyi hedefleyerek gelişmek,</li>
            <li>Topluma ve çevreye olan yükümlülüklerimizi yerine getirmek,</li>
            <li>Üretimimiz ve çalışmalarımız sırasında, sevgi ve saygı kuralları çerçevesinde bir takım olmak,</li>
          </ul>
          <h2 className="mt-12 mb-4 text-2xl font-semibold text-brand-primary">Kaliteli ve güvenli gıda tüketmeniz için;</h2>
          <div className="space-y-6">
            <p><strong>1- Tedarikçi seçimimiz</strong><br />Sadece gıda üreticilerimizi değil aynı zamanda gıda hazırlama ve servisinde kullandığımız malzemeleri aldığımız tedarikçilerimizi de denetliyoruz. Üretici ve tedarikçilerimizle çalışmaya başlamadan önce denetliyoruz, denetim puanı uluslararası kabul görmüş standartları karşılıyorsa çalışıyoruz. Denetimler baş denetçi olan gıda mühendisi ve veteriner hekimler tarafından yapılmaktadır. Bu puanlı denetimi her yıl tekrarlıyoruz. Helal sertifikalı yerli üreticileri tercih ediyoruz.</p>
            <p><strong>2- Ürün kontrollerimiz</strong><br />Üreticilerimizden gelen ürünlerin daha depolarımıza ve mutfaklarımıza girmeden gerekli kontrol ve analizlerini yaparak misafirlerimize sunulan ürünlerin güvenli ve taze olması garanti altına alıyoruz.</p>
            <p><strong>3- Sipariş ettiğiniz ürünlerin kontrolleri</strong><br />Gıda güvenliğinin 7/24 sağlanması için tüm süreçlerimizi izliyoruz. Doğru sıcaklıklarda bekletme, doğru tekniklerde pişirme, taze olması için sipariş kadar hazırlama, hijyen prosedürlerine uyum gibi kriterler belirlenmiştir. Bu kriterlere uyum dijital ortamda sürekli kontrol edilmektedir. Temiz ve sağlıklı menülerimizi hijyenik ortamlarda tüketilmesini sağlıyoruz.</p>
            <p><strong>4- Sadece uzmanlar değil siz de kontrol edebilirsiniz</strong><br />Mutfağımızı; cam bölmeden, banko gerisinden veya mutfak giriş kapısından isteğiniz an kaliteyi, temizliği ve ürün hazırlığını yerinde görebilirsiniz.</p>
          </div>
          <h2 className="mt-12 mb-4 text-2xl font-semibold text-brand-accent">Her zaman önemsediğimiz temizlik süreçlerimiz;</h2>
          <div className="space-y-4">
            <p><strong>1-</strong> Çalışanlarımız, her türlü hijyen eğitimini alarak iş başı yapar.</p>
            <p><strong>2-</strong> Çalışanlarımız, her vardiyada temiz ve ütülenmiş iş elbisesi giyer.</p>
            <p><strong>4-</strong> Çalışanlarımız üretim ve servis alanlarına ayakkabı/terliklerini dezenfekte ederek girer.</p>
            <p><strong>5-</strong> Üretim alanındaki çalışanlarımız; iş elbisesine ek olarak eldiven, kolluk takar.</p>
            <p><strong>6-</strong> Çalışanlarımız, 30 dakikada bir ve gerektikçe ellerini yıkanıp dezenfekte eder.</p>
            <p><strong>7-</strong> Müşterilerimizin kullandığı alanlar; her kullanım öncesi ve sonrası temizlenip dezenfekte edilir.</p>
            <p><strong>8-</strong> Restoranlarımız; iş başlangıcında, gün içinde ve mesai bitiminde detaylı temizlik-dezenfeksiyon işlemleri yapılır.</p>
            <p><strong>9-</strong> Ürün sevk ve pişirme sıcaklıkları kontrol edilerek bakteri/virüs gelişimi engellenir.</p>
            <p><strong>10-</strong> Restoranlar sürekli bağımsız dış firmalar tarafından denetlenir.</p>
          </div>
        </div>
        {/* Right images */}
        <div className="space-y-6 md:sticky md:top-24">
          {images.map(img => (
            <div key={img.src} className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-sm ring-1 ring-slate-200 bg-white">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width:768px) 100vw, 40vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
      {/* Re-added legacy bottom section */}
      <section className="mt-20">
        <div className="prose prose-slate max-w-none">
          {/* Kalite İlkeleri - 4 kart */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-16">
            {[
              { src: '/policies/kalite-1--kalite.webp', blur: '/policies/kalite-1--kalite.png', title: 'Müşteri Memnuniyeti', desc: 'Müşteri beklentilerini karşılamak ve aşmak için sürekli çalışıyoruz.' },
              { src: '/policies/kalite-2--kalite.webp', blur: '/policies/kalite-2--kalite.png', title: 'Gıda Güvenliği', desc: 'En yüksek gıda güvenliği standartlarına uygun üretim yapıyoruz.' },
              { src: '/policies/kalite-3--kalite.webp', blur: '/policies/kalite-3--kalite.png', title: 'Sürekli İyileştirme', desc: 'Tüm süreçlerimizi sürekli gözden geçirerek iyileştiriyoruz.' },
              { src: '/policies/kalite-4--kalite.webp', blur: '/policies/kalite-4--kalite.png', title: 'Çalışan Gelişimi', desc: 'Kaliteli hizmet için çalışanlarımızın sürekli eğitimine önem veriyoruz.' }
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 p-6 rounded-lg shadow-sm text-center ring-1 ring-slate-200">
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="64px"
                    className="object-contain"
                    placeholder={(blurMap as Record<string,string>)[item.blur] ? 'blur' : undefined}
                    blurDataURL={(blurMap as Record<string, string>)[item.blur]}
                  />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          {/* Kalite Standartları */}
          <h2 className="text-2xl font-bold mb-6">Kalite Standartlarımız</h2>
          <p>
            Apaz Group bünyesindeki tüm markalarımızda, uluslararası standartlara uygun kalite yönetim sistemleri uygulanmaktadır. Bu standartlar arasında:
          </p>
          {/* ISO 22000 */}
          <div className="bg-gray-50 p-8 rounded-lg my-6 ring-1 ring-slate-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-bold mb-3">ISO 22000 - Gıda Güvenliği Yönetim Sistemi</h3>
                <p>
                  Gıda zincirindeki tüm süreçlerde gıda güvenliğini sağlamak için uygulanan bu standart, hammadde tedariğinden son tüketiciye ulaşana kadar tüm aşamaları kapsar. Tedarikçi seçimi, depolama, hazırlık, pişirme ve servis aşamalarında risk analizleri yapılarak, potansiyel tehlikeler belirlenir ve kontrol altına alınır.
                </p>
              </div>
              <div className="w-full md:w-1/3 text-center">
                <div className="p-4 bg-white rounded-full inline-block shadow-md ring-1 ring-slate-200">
                  <span className="text-3xl font-bold text-brand-yellow">ISO 22000</span>
                </div>
              </div>
            </div>
          </div>
          {/* Kalite Kontrol Süreçlerimiz */}
          <h2 className="text-2xl font-bold mt-12 mb-6">Kalite Kontrol Süreçlerimiz</h2>
          <p>
            Kalite kontrol süreçlerimiz, müşterilerimize her zaman aynı lezzet ve kalitede ürün sunmamızı sağlamaktadır. Bu süreçler şunları içerir:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { step: '1', title: 'Tedarikçi Değerlendirme', desc: 'Hammadde tedarikçilerimizi düzenli olarak değerlendiriyor ve denetliyoruz. Sadece kalite standartlarımıza uygun tedarikçilerle çalışıyoruz.' },
              { step: '2', title: 'Hammadde Kontrolü', desc: 'Tüm gelen hammaddeleri fiziksel, kimyasal ve mikrobiyolojik analizlerle kontrol ediyoruz. Standartlara uymayan ürünleri reddediyoruz.' },
              { step: '3', title: 'Üretim Süreçleri', desc: 'Üretim süreçlerimiz, belirlenmiş standart reçete ve prosedürlere göre gerçekleştirilir. Bu sayede ürün standardizasyonu sağlanır.' },
              { step: '4', title: 'Şube Denetimleri', desc: 'Tüm şubelerimiz düzenli olarak denetlenir ve kalite standartlarımıza uygunluğu kontrol edilir. Denetim sonuçları raporlanır.' },
              { step: '5', title: 'Personel Eğitimi', desc: 'Tüm çalışanlarımıza düzenli olarak gıda güvenliği ve kalite konularında eğitimler verilir. Bilinçli personel, kalite güvencemizdir.' },
              { step: '6', title: 'Müşteri Geri Bildirimleri', desc: 'Müşteri geri bildirimlerini dikkatle değerlendirir ve süreçlerimizi sürekli iyileştirmek için kullanırız. Müşteri memnuniyeti bizim için önceliktir.' }
            ].map((item) => (
              <div key={item.step} className="bg-gray-50 p-6 rounded-lg ring-1 ring-slate-200">
                <div className="bg-brand-yellow text-black w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
          {/* Kalite Taahhüdümüz */}
          <div className="mt-12 bg-gray-100 p-8 rounded-lg border-l-4 border-brand-yellow ring-1 ring-slate-200">
            <h2 className="text-2xl font-bold mb-4">Kalite Taahhüdümüz</h2>
            <p className="text-lg">
              Apaz Group olarak, tüm markalarımızda aynı kalite anlayışıyla hizmet vermeyi taahhüt ediyoruz. Kaliteyi bir hedef değil, sürekli geliştirilmesi gereken bir süreç olarak görüyor ve bu doğrultuda çalışıyoruz.
            </p>
            <p className="text-lg mt-3">
              Markalarımızda sunduğumuz her ürün ve hizmet, Apaz Group&#39;un kalite anlayışını ve müşterilerine verdiği değeri yansıtmaktadır.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
