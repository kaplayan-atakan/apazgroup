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
  const title = 'Çalışan Memnuniyetine Önem Veriyoruz | Haber';
  const description = 'Apaz Group YK Üyesi Bülent Polat ile çalışan memnuniyeti, gelişim, performans değerlendirme ve kriz yönetimi üzerine söyleşi.';
  return generateSeoMetadata({
    title,
    description,
    locale,
    slug: 'haberler/haber2',
    type: 'article',
    imagePath: '/images/news/haber-2-420x220.png',
  });
}

export default function Haber2Page({ params }: PageProps) {
  const { locale } = params;
  if (!isLocale(locale)) return null;

  // Article JSON-LD with known publish date from legacy
  const jsonLd = generateArticleSchema({
    locale,
    title: 'Çalışan Memnuniyetine Önem Veriyoruz',
    description: 'Apaz Group YK Üyesi Bülent Polat ile çalışan memnuniyeti, gelişim, performans değerlendirme ve kriz yönetimi üzerine söyleşi.',
    slug: 'haberler/haber2',
    datePublished: '2020-08-10',
  });

  return (
    <main>
      {/* Hero */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-primary">ÇALIŞAN MEMNUNİYETİNE ÖNEM VERİYORUZ</h1>
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
                  src="/images/news/haber-2-420x220.png"
                  alt="Haber 2"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

      {/* Right: interview text (line breaks preserved) */}
            <div className="prose max-w-none">
              <p>
                <br />
                <b>
                  Apaz Group Yönetim Kurulu Üyesi Bülent Polat: “Her kademede çalışan personel, bizim için kıymetli. Bu nedenle çalışan memnuniyetine, gelişimine, performans değerlendirmeye ve insana değen diğer uygulamalarımıza önem veriyoruz.”
                </b>
                <br /><br />
        Bülent Bey öncelikle kaç yıldır bu sektörde olduğunuzu öğrenebilir miyiz?<br />
        2007 yılından bu yana Baydöner ailesinde Yönetim Kurulu Üyesi olarak görev yapıyorum. Bu kadar uzun bir süre aynı pozisyonda görev almak iş dünyasında pek de sık rastlanan bir durum değil. İsmimin, kuruluş aşamasından itibaren içinde olduğum Baydöner markası ile bütünleşmesinden büyük mutluluk duyuyorum.
        <br /><br />
        Başarılı olmanın ilk şartı nedir?<br />
        Başarının sırrı aile olabilmekten geçiyor. En üst kademeden en alta kadar tüm çalışanlar markaya karşı aidiyet duygusu hissettiğinde başarı da kendiliğinden geliyor. Bizim işimiz tam anlamı ile bir ekip işi. Her kademede çalışan personel, bizim için kıymetli. Bu nedenle çalışan memnuniyetine, gelişimine, performans değerlendirmeye ve insana değen diğer uygulamalarımıza önem veriyor, bireylerin mutlu olduğu ve aidiyet duygusu hissettiği işyerinde başarılı olacağına inanıyoruz.  Günlük değişikliklere adapte olmak, belirli bir strateji belirlemek ve birlikte karar almak da önem taşıyor.
        <br /><br />
        Yaşanabilecek tüm olumsuzluklara karşı nasıl bir kriz yönetimi planı yapıyorsunuz?<br />
        Bir kurumda uzun süre görev yapmak, sizin markanızı çok iyi tanımanızı sağlıyor. Uzun süre birlikte hareket eden ekiplerde karar verme ve aksiyon alma süreçleri hızlı bir şekilde ilerleyebiliyor. Çözüm odaklı çalışan, düzenli ve sağlıklı işleyen iletişim kanallarımız var. Herkes arkamızda, yönetim olarak ise biz herkesin arkasındayız. Tüm bu etkenler bir araya geldiğinde olası kriz senaryolarına karşı aksiyonlarınızı hazırlamış oluyorsunuz.
        <br /><br />
        Başarılı bir yönetici olabilmek için hangi süreçlerden geçmek gerekiyor?<br />
        Doğru iletişimi, başarılı bir yönetici olmanın anahtarı olarak nitelendiriyorum. İletişim ağının iyi kurulmuş olması ve çalışanların organize bir şekilde hareket etmesi, başarıyı etkilediği gibi kurum imajı ile çalışanların verimliliğini de yükseltiyor. Hırsınızı olumlu yönde kullandığınızda, verimli ve planlı bir şekilde çalıştığınızda başarı kaçınılmaz oluyor. Farklı araştırmalar yapmak ve kendinizi geliştirmek de sizi başarılı kılan etmenler arasında yer alıyor.
        <br /><br />
        Markalaşmada rakiplerinize karşı nasıl bir strateji izliyorsunuz?<br />
        Daima daha iyi olanı aramak, daha kalitelisini üretmek ve güçlenerek Türk ekonomisine güç katmak öncelikli ilkelerimizi oluşturuyor. Türk mutfağına hak ettiği değeri verme vizyonuyla çalışıyoruz. Türk mutfağının yerel lezzetlerini kaliteli hizmet ve uygun fiyat anlayışıyla lezzet tutkunlarının beğenisine sunuyoruz. İstikrarlı bir şekilde büyümeye devam ediyoruz. Bundan sonra yapacağımız yeni yatırımlarla, büyüme trendimizi sürdüreceğiz.
        <br /><br />
        Sektöre yeni giren yöneticilere nasıl tavsiyeleriniz var?<br />
        Kendilerine belirli hedefler koymalarını ve araştırmaktan vazgeçmemelerini tavsiye edebilirim. Biz Apaz Group’ta her zaman için büyük hedefler belirliyor ve gerçekleştirebilmek için çok çalışıyoruz. Aynı zamanda yaptığınız işi sevmelisiniz ve yaptığınız iş kaliteli olmalı. Sunumunuz çok önemli; insanlara yaptığınız işi doğru sunmalısınız. Çevrenizin olması ve tabii ki yaptığınız işi tanıtabilmek de olmazsa olmazlar arasında yer alıyor.
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
