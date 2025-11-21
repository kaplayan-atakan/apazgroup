import type { Metadata } from 'next';
// import Image from 'next/image';

import { HeroGradient } from '../../../../../components/hero/HeroGradient';
import { isLocale } from '../../../../../lib/i18n';
import { generateSeoMetadata } from '../../../../../lib/seo';

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

  // const images = [
  //   { src: '/kalite/kalite-1.jpg', alt: 'Kalite görsel 1' },
  //   { src: '/kalite/kalite-2.jpg', alt: 'Kalite görsel 2' },
  //   { src: '/kalite/kalite-3.jpg', alt: 'Kalite görsel 3' },
  //   { src: '/kalite/kalite-4.jpg', alt: 'Kalite görsel 4' }
  // ] as const;

  return (
    <main>
      <HeroGradient
        heading="Kalite"
        intro="Kalite politikamız, süreçlerimiz ve hijyen uygulamalarımız."
        minHeights={{ base: 'min-h-[200px]', md: 'md:min-h-[240px]', lg: 'lg:min-h-[260px]' }}
        contentClassName="max-w-4xl"
      />
      {/* Structured content */}
      <div className="px-6 py-10 md:py-14 max-w-7xl mx-auto space-y-20">
        {/* Kalite Taahhüdü (üste alındı) */}
        <section
          aria-labelledby="kalite-taahhudu-heading"
          className="rounded-xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 px-6 md:px-10 py-10 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] ring-2 ring-brand-bronze-200/50 relative transition-all duration-300 hover:ring-brand-secondary/50 hover:shadow-xl"
        >
          <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,white,transparent)] bg-[radial-gradient(circle_at_30%_25%,rgba(255,215,0,0.15),transparent_70%),radial-gradient(circle_at_75%_65%,rgba(0,82,255,0.15),transparent_65%)]" aria-hidden="true" />
          <div className="relative">
            <h2 id="kalite-taahhudu-heading" className="mt-8 mb-6 text-2xl md:text-3xl font-semibold tracking-tight text-brand-primary">Kalite Taahhüdümüz</h2>
            <p className="text-slate-700 leading-relaxed text-[15px] md:text-base max-w-4xl">
              Apaz Group olarak, tüm markalarımızda aynı yüksek kalite anlayışıyla hizmet vermeyi taahhüt ediyoruz. Kaliteyi bir hedef değil, sürekli geliştirilen bir süreç olarak görüyor ve her adımımızda bu anlayışı uyguluyoruz.
            </p>
            <p className="text-slate-700 leading-relaxed text-[15px] md:text-base max-w-4xl mt-4">
              Markalarımızda sunduğumuz her ürün ve hizmet, Apaz Group’un kalite anlayışını ve müşterilerine verdiği değeri yansıtmaktadır.
            </p>
          </div>
        </section>
        <section className="relative" aria-labelledby="kalite-politikamiz-heading">
          <div className="absolute -inset-x-4 -inset-y-4 rounded-2xl bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-accent/5 blur-md" aria-hidden="true" />
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 px-7 md:px-10 py-10 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] ring-2 ring-brand-bronze-200/50 space-y-14 transition-all duration-300 hover:ring-brand-secondary/50 hover:shadow-xl">
            {/* Kalite Politikamız */}
            <div className="prose prose-slate max-w-none">
              <h2 id="kalite-politikamiz-heading" className="mt-2 mb-5 text-2xl md:text-3xl font-semibold tracking-tight text-brand-primary">Kalite Politikamız</h2>
              <p className="leading-relaxed text-slate-700 text-[15px] md:text-base">
                Ürünlerimiz, ilk kaynağından misafirlerimize ulaşıncaya kadar geçen her aşamada titizlikle kontrol edilir. Sürekli denetim ve iyileştirme çalışmalarıyla güvenli, kaliteli ve hijyenik gıdayı sizlere sunmayı hedefliyoruz.
              </p>
              <ul className="list-disc pl-5 md:pl-6 mt-6 space-y-2 md:space-y-2 text-slate-700 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-3 md:space-y-0">
                {[
                  'Hijyenik ortamlarda, güvenli gıda üretimi',
                  'Her ziyarette artan müşteri memnuniyeti',
                  'Yasal ve düzenleyici şartlara tam uyum',
                  'Eğitim programlarıyla sürekli gelişim',
                  'Topluma ve çevreye karşı sorumluluk bilinci',
                  'Sevgi, saygı ve ekip ruhuyla çalışma'
                ].map(item => (
                  <li key={item} className="break-inside-avoid pr-2 leading-snug md:leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <hr className="border-t border-slate-200" />
            {/* Kaliteli ve Güvenli Gıda */}
            <div className="prose prose-slate max-w-none">
              <h2 className="mb-6 text-2xl md:text-3xl font-semibold tracking-tight text-brand-primary">Kaliteli ve Güvenli Gıda İçin Uygulamalarımız</h2>
              <ol className="space-y-6 [counter-reset:step] [&>li]:pl-0">
                <li className="relative">
                  <div className="flex items-start gap-4">
                    <span className="shrink-0 w-8 h-8 rounded-full bg-brand-yellow/90 text-black font-bold flex items-center justify-center text-sm shadow ring-1 ring-black/5">1</span>
                    <p className="leading-relaxed text-[15px] md:text-base"><strong>1. Tedarikçi Seçimi:</strong> Gıda üreticilerimizi ve tedarikçilerimizi işbirliği öncesinde uluslararası standartlara göre denetliyoruz. Denetimler gıda mühendisi ve veteriner hekimler tarafından her yıl tekrarlanıyor. Tercihimizi helal sertifikalı, yerli üreticilerden yana kullanıyoruz.</p>
                  </div>
                </li>
                <li className="relative">
                  <div className="flex items-start gap-4">
                    <span className="shrink-0 w-8 h-8 rounded-full bg-brand-yellow/90 text-black font-bold flex items-center justify-center text-sm shadow ring-1 ring-black/5">2</span>
                    <p className="leading-relaxed text-[15px] md:text-base"><strong>2. Ürün Kontrolleri:</strong> Depolarımıza ve mutfaklarımıza giren her ürün, misafirlerimize ulaşmadan önce analiz ve kontrollerden geçiyor. Böylece ürünlerimizin taze ve güvenli olması garanti altına alınıyor.</p>
                  </div>
                </li>
                <li className="relative">
                  <div className="flex items-start gap-4">
                    <span className="shrink-0 w-8 h-8 rounded-full bg-brand-yellow/90 text-black font-bold flex items-center justify-center text-sm shadow ring-1 ring-black/5">3</span>
                    <p className="leading-relaxed text-[15px] md:text-base"><strong>3. Üretim Süreçleri:</strong> Tüm üretimlerimiz, belirlenmiş standart reçete ve prosedürlere göre yapılır. Böylece her ürünün aynı kalite ve lezzette olması sağlanır.</p>
                  </div>
                </li>
                <li className="relative">
                  <div className="flex items-start gap-4">
                    <span className="shrink-0 w-8 h-8 rounded-full bg-brand-yellow/90 text-black font-bold flex items-center justify-center text-sm shadow ring-1 ring-black/5">4</span>
                    <p className="leading-relaxed text-[15px] md:text-base"><strong>4. Şube Denetimleri:</strong> Tüm şubelerimiz düzenli olarak denetlenir ve kalite standartlarımıza uygunluğu raporlanır. Böylece her noktada aynı kaliteyi sunarız.</p>
                  </div>
                </li>
                <li className="relative">
                  <div className="flex items-start gap-4">
                    <span className="shrink-0 w-8 h-8 rounded-full bg-brand-yellow/90 text-black font-bold flex items-center justify-center text-sm shadow ring-1 ring-black/5">5</span>
                    <p className="leading-relaxed text-[15px] md:text-base"><strong>5. Hazırlık ve Pişirme Süreci:</strong> Gıda güvenliği, 7/24 dijital sistemlerle takip ediliyor. Doğru sıcaklıklarda muhafaza, uygun pişirme teknikleri, sipariş üzerine hazırlık ve hijyen standartlarına uyum sürekli denetleniyor.</p>
                  </div>
                </li>
                <li className="relative">
                  <div className="flex items-start gap-4">
                    <span className="shrink-0 w-8 h-8 rounded-full bg-brand-yellow/90 text-black font-bold flex items-center justify-center text-sm shadow ring-1 ring-black/5">6</span>
                    <p className="leading-relaxed text-[15px] md:text-base"><strong>6. Şeffaf Mutfak:</strong> Mutfaklarımızda kaliteyi sadece biz değil, siz de görebilirsiniz. Cam bölmeden, banko gerisinden veya giriş kapısından mutfağımızı dilediğiniz an izleyerek ürünlerin nasıl hazırlandığını yerinde inceleyebilirsiniz.</p>
                  </div>
                </li>
              </ol>
            </div>
            <hr className="border-t border-slate-200" />
            {/* İlkelerimiz */}
            <div className="prose prose-slate max-w-none">
              <h2 className="mb-6 text-2xl md:text-3xl font-semibold tracking-tight text-brand-accent">Vazgeçmediğimiz İlkelerimiz</h2>
              <ul className="list-disc pl-5 md:pl-6 grid md:grid-cols-2 gap-x-12 gap-y-2 text-slate-700">
                {[
                  'Çalışanlara işe başlamadan önce tüm hijyen eğitimleri verilir.',
                  'Her vardiyada temiz ve ütülenmiş iş elbisesi temin edilir.',
                  'Üretim alanındaki çalışanlara iş elbisesine ek olarak eldiven ve kolluk kullanımı sağlanır.',
                  'Çalışanların elleri üretim sürecinde öncesinde ve üretim sürecinde çapraz bulaşmayı engelleyecek şekilde yıkanır ve dezenfekte edilir.',
                  'Müşterilerin kullandığı alanlar, her kullanım öncesi ve sonrası temizlenir ve dezenfekte edilir.',
                  'Restoranlarda iş başlangıcında, gün içinde ve mesai bitiminde detaylı temizlik ve dezenfeksiyon yapılır.',
                  'Ürün sevk ve pişirme sıcaklıkları kontrol edilerek bakteri ve virüs oluşumu önlenir.',
                  'Restoranlar bağımsız dış firmalar tarafından düzenli olarak denetlenir.'
                ].map(item => (
                  <li key={item} className="leading-snug md:leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
            {/* Kalite Görselleri (üstte yanyana) */}
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-4 mb-10">
              {images.map(img => (
                <div key={img.src} className="relative w-full aspect-[4/3] rounded-lg overflow-hidden ring-1 ring-slate-200 bg-slate-100 shadow-sm">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width:640px) 50vw, (max-width:1024px) 25vw, 200px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div> */}
          </div>
        </section>
      </div>
      {/* Re-added legacy bottom section */}
      {/* <section className="mt-20 px-6 md:px-10 pb-12 md:pb-16">
        <div className="prose prose-slate max-w-7xl mx-auto"> */}
          {/* Kalite İlkeleri - 4 kart */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-16">
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
                    placeholder={(blurMap as Record<string, string>)[item.blur] ? 'blur' : undefined}
                    blurDataURL={(blurMap as Record<string, string>)[item.blur]}
                  />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm">{item.desc}</p>
              </div>
            ))}
          </div> */}
          {/* Kalite Standartları */}
          {/* <h2 className="text-2xl font-bold mb-6">Kalite Standartlarımız</h2>
          <p>
            Apaz Group bünyesindeki tüm markalarımızda, uluslararası standartlara uygun kalite yönetim sistemleri uygulanmaktadır. Bu standartlar arasında:
          </p> */}
          {/* ISO 22000 */}
          {/* <div className="bg-gray-50 p-8 rounded-lg my-6 ring-1 ring-slate-200">
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
          </div> */}
{/* 


        </div>
      </section> */}
    </main>
  );
}
