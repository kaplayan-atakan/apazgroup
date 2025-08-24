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
  const title = 'Baydöner’e iki kardeş geldi: Pidebypide ve Bursa İshakbek | Haber';
  const description = 'Apaz Group pazarlama stratejileri; Baydöner’in "Türkiye’nin en Coss iskenderi" iletişimi; Pide by Pide ve Bursa İshakbey vizyonu.';
  return generateSeoMetadata({
    title,
    description,
    locale,
    slug: 'haberler/haber4',
    type: 'article',
    imagePath: '/images/news/haber-4-420x220.png',
  });
}

export default function Haber4Page({ params }: PageProps) {
  const { locale } = params;
  if (!isLocale(locale)) return null;

  const jsonLd = generateArticleSchema({
    locale,
    title: 'Baydöner’e iki kardeş geldi: Pidebypide ve Bursa İshakbek',
    description: 'Apaz Group ve M.A.R.K.A ile iletişim stratejileri.',
    slug: 'haberler/haber4',
    datePublished: '2020-03-01',
  });

  return (
    <main>
      {/* Hero */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Baydöner’e iki kardeş geldi: Pidebypide ve Bursa İshakbek</h1>
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
                  src="/images/news/haber-4-420x220.png"
                  alt="Haber 4"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

      {/* Right: content */}
            <div className="prose max-w-none">
              <p>
                <br />
        “Coss” söylemiyle zihinlere kazınan Baydöner, 2020’de iletişim çalışmalarına hız verdi. Yeni dönemde reklam dünyasının duayen ismi Hulusi Derici ile çalışmaya başlayan marka “Türkiye’nin en Coss iskenderi” sloganı ve öğle ve akşam öğünlerini sahiplenen stratejisiyle tüketicisine sesleniyor. Yeni stratejilerinin detaylarını dinlemek için bir araya geldiğimiz Apaz Group Pazarlama Direktörü Kemal Ömerci ve M.A.R.K.A. Kurucusu Hulusi Derici, Apaz Group bünyesinde doğan Pide by Pide ve Bursa İshakbey markalarının da müjdesini verdi.
        DeFacto’da Hulusi Derici ve ajansı M.A.R.K.A. ile oldukça başarılı iş birliklerine imza attınız. BayDöner’de yeniden birliktesiniz. Öncelikle dilerseniz bir DeFacto sürecini konuşalım…
        <br /><br />
  Hulusi Derici: Kemal Bey, DeFacto’ya gelmeden 2-3 yıl öncesinde müşterime Jean&apos;i üretimden çıkaralım ve ona meydan okuyalım stratejisini kabul ettirip “Jean Amerikan’ın şalvarıdır” lansman kampanyasını başlatmış ve birkaç sezon da reklam yapmıştık. DeFacto’nun büyümesiyle birlikte bir pazarlama müdürüne ihtiyaç duyuldu. Ve Kemal Bey göreve başladı. Sevdik birlikte çalışmayı ve birlikte etkili işlere imza attık.
        <br />
        Kemal Ömerci: 2010’da işe başladığımda DeFacto sağlıklı bir doğum olmuştu ancak henüz yeni kalkışa geçmişti. 2015 yılında ayrıldığım süreçte ise DeFacto kocaman bir markaydı. Araştırmalarda da pazar payında da 2’nci sırada yer alıyordu. Hulusi Bey ile yaptığımız birbirinden değerli çalışmalar oldu. Birlikte çok güzel sonuçlar alan çalışmalara imza attık. Defacto diyince hala M.A.R.K.A.’nın yaptığı reklamlar hatırlanıyor.
        <br /><br />
        Hulusi Derici: Hazır giyim reklamları içerisinde her yıl açık ara en çok hatırlanan, en çok beğenilen reklamlar Defacto reklamlarıydı. Hatta 2014 yılının Ipsos araştırmasında tüm sektörlerin reklamları arasında en akılda kalan ilk on markadan biriydi DeFacto…Yılın en beğenilen giysi reklamlarında açık ara yüzde 27 ile ilk sırada yer aldı.
        <br /><br />
        BayDöner ile yine M.A.R.K.A. reklam ajansıyla çalışıyorsunuz. Bu süreç nasıl başladı?
        <br /><br />
        Kemal Ömerci: Apaz Group’un Baydöner, PidebyPide ve Bursa İshakbey olmak üzere 3 ayrı markası var. Ekim 2019’dan bu yana Apaz Group’ta bu üç markanın pazarlama direktörüyüm. Pide By Pide ve Bursa İshakbey bir yıllık marka ve çok yeni. Baydöner ise 13 yıldır sektörde. Baydöner için yapılan birtakım çalışmalar vardı ama 2020 stratejisi kapsamında neler yapabiliriz diye düşünürken Hulusi Bey ile yeniden yollarımızın kesişmesi gerektiğini anladım. Ve şirket patronlarımızla Hulusi Bey bir araya geldi. Sonra da markalarımızın stratejilerini, iletişim çalışmalarını ve hatta kampanyalarını hazırlamaya başladık. Baydöner için gerçekleştirdiğimiz çalışmaları da yakın zamanda hayata geçirdik. Eskiden sadece “Aklınıza gelince Baydöner’e gelin” tonunda bir mesajınız vardı şimdi ise akşam ve öğlen öğünlerini sahipleniyorsunuz. Bu strateji değişiminin altında nasıl bir içgörü var?
        <br />
  Kemal Ömerci: Aslında orada Hulusi Bey ile oluşturduğumuz daha büyük bir fotoğraf var. “Coss” çok başarılı bir şekilde geçmişte bulunmuş. O bizim olumlu bir mirasımız ama yeterli değildi artık. Çünkü zamanında biz tüketicilere “Canınız çektikçe Baydöner’e gelin, iskender yiyin” demişiz. Tüketicinin canının istediği zaman gelmesini beklemek çok mütevazı bir yaklaşım. Bu kapsamda kategoriyi akla getiren anları sahiplenelim dedik. İlk reklamlarımız da bu strateji çerçevesinde &quot;Öğlen ne yesek acaba?&quot; ve &quot;Akşam ne yesek acaba?&quot; şeklinde biçimlendi. Baydöner’in kendi reçetesiyle hazırlanan bir tereyağı var. Ve bunu tüketiciler seviyor, önemsiyor. Biz de bu içgörüyü reklamlarımıza taşıdık. Kampanyada o “Coss” anını tekrar vurguladık.
        BayDöner’in M.A.R.K.A. ile çalışamaya başlamasıyla birlikte pazarlama ve iletişim stratejisinde neler değişti?
        <br />
        Kemal Ömerci: Ipsos Hane Tüketim Paneli Raporu’na göre iskender ve döner kategorisinde pazar lideri olan Baydöner, aynı zamanda pazarda en büyük, en çok ürün satışı yapan, en çok pazar payı elde eden marka. Bu durumu “en çok”, “en büyük” gibi kelimelerle ifade etmek yerine iskenderdeki uzmanlığımızı dile getirme yolu olarak “Türkiye’nin en Coss iskenderi” sloganı Hulusi Bey’in katkısıyla ortaya çıktı. Bu sloganla pazar liderliğimizi de vurgu yapıyoruz.
        <br /><br />
  Hulusi Derici: Sadece “Coss” ile kalmayalım, “Türkiye’nin en Coss iskenderi” diyelim dedik. Bu slogandaki &quot;en coss&quot; yerine isteyen istediği üstünlüğü koyabilir. Elde “Coss” gibi güzel bir malzeme varken bunu daha ileriye taşımak ve efektif hale getirmek istedik. Ben birinin yaptığı güzel bir işe “güzel” demeyi bilirim. Miras doğru bir mirassa onu neden reddedelim? Şimdi de öyle oldu. Elde bir “Coss” temeli vardı. Şimdi onun üstüne bir gökdelen inşa ediyoruz.
        Televizyon reklamları dışında ne tür çalışmalar gerçekleştirildi?
        <br />
        Kemal Ömerci: Televizyon reklamlarımızın dışında özel projelere de imza attık. Radyo tarafında Cem Arslan ve Nihat Sırdar ile çalışmalar yürüttük. Televizyon tarafında bir başka projeyi de Kelime Oyunu programıyla gerçekleştirdik. Çukur dizisinde duvar yazısında kampanyamızı duyurduk. 5 milyonluk bir izlenme elde ettik bu çalışmayla. Ticari olarak bu işi sahiplenen ilk firma biziz.
        “Cosss” diye bir kavramı da reklam sektöründe var ettiniz ve rakiplerinizden ayrışmayı başardınız. Bu kelimenin hikayesi nedir?
        <br />
        Kemal Ömerci: Daha önceki ajansın yapmış olduğu bir çalışma. Kızgın yağın çıkardığı sesin abartılarak sinyal haline getirilmesi sonucunda ortaya çıkmış. Ve Hulusi beyin de dediği gibi oldukça başarılı bir çalışma. Biz bir araya geldiğimizde dedik ki bu fikir iyi bir miras. Ama fikrin daha güçlendirilmeye ihtiyacı var. O nedenle kategoriyi akla getiren anlarda müşteriye iskenderi ve Baydöner’i hatırlatalım istedik.
        Pide by Pide ve Bursa İshakbey markaları ilerleyen dönemde nasıl bir kimliğe ve iletişim diline sahip olacak?
        <br /><br />
        Hulusi Derici: Apaz Group’un kurucuları ve Kemal Bey ile ilk buluşmamız bu iki yeni marka sayesinde oldu. Pide by Pide ve Bursa İshakbey tıpkı DeFacto gibi henüz doğmamış markalardı. İki markanın da şu anki durumlarından çok daha farklı bir noktaya taşıyoruz. Markaların ürün gamından tutun da logolarına kadar her şeyi sil baştan yaratıyoruz. Her iki markanın da mağaza sayısı az olduğu için bir şeyleri değiştirmek çok daha kolay ve ucuz. Apaz Group’un yöneticileriyle birbirimizi sanki yıllardır tanıyor gibiyiz. O nedenle çok hızlı yol aldık. Çok hızlı kararlar verildi. Pide by Pide’nin bütün stratejisi, her şey yenilendi. Bursa İshakbey’in temeli son derece doğru. Ve o temel üzerine binayı inşa ediyoruz. Markanın iletişim stratejilerini ve görsel kimliğini değiştireceğiz. Markanın hikayesini oluşturup, görsel kimliğini de ona göre öreceğiz. Menüsü dahil birlikte tamamen elden geçiriyoruz. Kemal Ömerci: Pide by Pide, fast food pide sektörünün en genç markası. Henüz 20 şehirde 40 tane şubemiz var. Yeni marka stratejimizin pilot uygulamasını İzmir’de yapacağız. Pide by Pide’nin şu an 20 şube sayısını 40’a çıkarmayı hedefliyoruz. Yeni şubelerle birlikte yüzde 100 büyüme olacak. Bursa İshakbey ise ezber bozan bir marka. Fast food mantığında bir yapısı var. Ana menümüz İskender. Tazelik, uygun fiyat ve iskender uzmanlığı markamızın özünde var. Menünüzü belirliyorsunuz, siparişiniz taze olarak hazırlanıyor ve iskenderinizi AVM’nin ortak alanında yiyorsunuz. Klasik bir yiyeceğin modernize edilme hali… Bursa İshakbey’in 13 ilde 20 şubesi var. Ve 2020 yılında da bir bu kadar daha büyüyecek.
        <br />
        Hulusi Derici ve M.A.R.K.A ekibiyle çalışmak nasıl bir deneyim?
        <br />
        Kemal Ömerci: Açıkçası çok keyifli. Yeniliğin ve zorun peşinde koşmayı çok seviyor. Herkesin “Çok zor, olmaz” dediği, “Bu kadar kısa zamanda asla yetişmez” dediği şeyleri Hulusi Bey ve M.A.R.K.A. ekibi “Yaparız, neden olmasın” diyor ve gerçekten de oluyor o iş. Ben de tam olarak hayata öyle bakıyorum. Çünkü pazarlama ve şirketler büyüyebilmesi için rekabette öne geçebilmesi için tam da böyle olmalı. Cesaret edilemeyeni, olmaz deneni yapmak gerekir. Hulusi Bey’e ve M.A.R.K.A. ekibine gece 1’de bile ulaşabiliyoruz. Öte taraftan şirketin kültürüne ve iş yapış şekline de uydu M.A.R.K.A.’nın bakış açısı çok olumlu bir sinerjiyi yarattık kısa sürede. Apaz Group kurucuları Ferudun Tuncer ve Levent Yılmaz da çok yenilikçi, vizyoner ve profesyonel yönetim tarzına sahipler. Hulusi Bey ile de uyumlu bir beraberlikleri oldu. Bu nedenle çok şanslıyım.
        <br /><br />
        Hulusi Derici: Bizde mesai saati kavramı yok. Banka memuru değiliz ki mesaiyle ilgili bir işimiz olsun. FaceTime ile akşamları yüz yüze görüşebiliyoruz müşterimizle. İnsanların aklına bir şey geldiği zaman bunu paylaşabilecek silah arkadaşı olduğunu bilebilmeli. Pazarlama zaten bir savaştır. O nedenle silah arkadaşı diyorum müşterilerimize. En kısa zamanda, en az maliyetle en efektif nasıl sonuç alınır? Ben buna odaklanıyorum. Apaz Group’la tempomuz bu anlamda çok uyuştu.
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
