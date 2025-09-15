import type { Metadata } from 'next';
import Image from 'next/image';

import { HeroGradient } from '../../../../components/hero/HeroGradient';
import { isLocale } from '../../../../lib/i18n';
import { generateSeoMetadata } from '../../../../lib/seo';
import { DelayedYoutubeShort } from '../../../../components/embeds/DelayedYoutubeShort';
// Revized layout: two-column (video + image & text)
import kssImg from '../../../../../public/kss/kss.jpg';

interface PageProps { params: { locale: string } }

export function generateStaticParams() { return [{ locale: 'tr' }, { locale: 'en' }]; }

export function generateMetadata({ params }: PageProps): Metadata {
  const { locale } = params;
  if (!isLocale(locale)) return {};
  const title = 'Kurumsal Sosyal Sorumluluk | Apaz Group';
  const description = 'Baydöner’in kapsayıcılık, sürdürülebilirlik ve sosyal farkındalık odaklı kurumsal sosyal sorumluluk yaklaşımı.';
  return generateSeoMetadata({
    title,
    description,
    locale,
    slug: 'kurumsal-sosyal-sorumluluk-politikasi',
    type: 'website',
    imagePath: '/kss/kss.jpg'
  });
}

export default function KSSPage({ params }: PageProps) {
  const { locale } = params;
  if (!isLocale(locale)) return null;

  // Orijinal metni yapılandırılmış çoklu paragrafa böldük (içerik metni değiştirilmedi / cümleler aynen korundu)
  const paragraphs: string[] = [
    'Kusursuz misafir deneyiminin yanı sıra kapsayıcılık, sürdürülebilirlik ve sosyal farkındalık da Baydöner’in değişmeyen öncelikleri arasında yer alıyor.',
    'Herkes için erişilebilir olma yolunda nitelikli adımlar atan Baydöner, bu doğrultuda ürün ve hizmetlerine erişimi kolaylaştıracak projelere sektörde öncülük ediyor.',
    'BlindLook’un görme engelli bireylerin ürün ve hizmetlere erişimini kolaylaştırmak için tasarladığı sesli betimleme altyapısını kullanan Baydöner, “Türkiye’nin ilk EyeBrand sertifikasına sahip ulusal restoran zinciri” unvanını da aldı.',
    'Baydöner; restoranlarını ve dijital kanallarını görme engelli bireyler için erişilebilir hale getirdi. Baydöner ve BlindLook iş birliği, görme engelli tüketicilerin Baydöner restoranlarında kimsenin desteğine ihtiyaç olmaksızın restoran deneyimini yaşamasının yolunu açıyor.',
    'Görme engelli bireyler, Baydöner Cossla uygulamasının sesli simülasyonuna Blindlook uygulaması üzerinden erişebiliyor. Proje, markanın Türkiye\'deki 1 milyon görme engellinin hak ettiği hizmeti, lezzeti ve en önemlisi fırsat eşitliğini sağlama konusundaki kararlılığını yansıtıyor.',
    'BlindLook’un yenilikçi ve yaratıcı teknolojilerini kullanarak her gün görme engellilere bu deneyimi sunan Baydöner, topluma karşı sorumluluklarını yerine getirmek ve herkes için daha erişilebilir bir dünya yaratmak adına çalışmaya devam ediyor.'
  ];

  return (
    <main>
      <HeroGradient
        heading="Kurumsal Sosyal Sorumluluk"
        intro="Kapsayıcılık, sürdürülebilirlik ve sosyal farkındalık odaklı yaklaşımımız."
        minHeights={{ base: 'min-h-[200px]', md: 'md:min-h-[230px]', lg: 'lg:min-h-[250px]' }}
        contentClassName="max-w-4xl"
      />
      <div className="py-10 md:py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left: Vertical YouTube Shorts video */}
          <div>
            <div className="relative mx-auto w-full max-w-sm aspect-[9/16] rounded-xl overflow-hidden shadow-lg ring-1 ring-slate-200 bg-black">
              <DelayedYoutubeShort videoId="Ij9QQOy2Hjc" delayMs={2000} title="Baydöner EyeBrand Projesi" />
            </div>
          </div>

          {/* Right: Image + paragraph (reduced size) */}
            <div className="flex flex-col items-center md:items-start">
              <div className="mx-auto md:mx-0 w-full max-w-sm lg:max-w-md">
                <Image
                  src={kssImg}
                  alt="Kurumsal sosyal sorumluluk projesi görseli"
                  priority
                  sizes="(min-width:1024px) 25vw, (min-width:768px) 35vw, 90vw"
                  className="rounded-xl shadow-lg ring-1 ring-slate-200 h-auto w-full"
                />
              </div>
              <div className="mt-8 w-full max-w-prose relative">
                <div className="absolute -inset-x-3 -inset-y-3 rounded-2xl bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-accent/5 blur-sm" aria-hidden="true" />
                <div className="relative rounded-2xl bg-white/70 backdrop-blur-xl ring-1 ring-slate-200/70 px-6 md:px-7 py-7 shadow-[0_4px_18px_-4px_rgba(0,0,0,0.06)]">
                  <div className="space-y-5 text-[14.5px] md:text-[15px] leading-relaxed text-slate-700 tracking-[0.15px]">
                    {paragraphs.map((p, i) => (
                      <p
                        key={i}
                        className={i === 2 ? 'font-medium' : undefined}
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </main>
  );
}
