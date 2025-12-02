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

  // Yeni metin (kullanıcı tarafından sağlanan) – yapılandırılmış içerik
  const intro: string[] = [
    'Kusursuz misafir deneyiminin yanı sıra kapsayıcılık, sürdürülebilirlik ve sosyal farkındalık, Apaz Group markalarının değişmeyen öncelikleri arasında yer alıyor.',
    'Herkes için erişilebilir olma yolunda nitelikli adımlar atan Apaz Group, markalarının ürün ve hizmetlerine erişimi kolaylaştıracak projelerini hayata geçirmeye devam ediyor.'
  ];
  const blindLookHeading = 'Baydöner X BlindLook İş Birliği';
  const blindLookParagraphs: string[] = [
    'BlindLook’un, görme engelli bireylerin ürün ve hizmetlere erişimini kolaylaştırmak için tasarladığı sesli betimleme altyapısını kullanan Baydöner, “Türkiye’nin ilk EyeBrand sertifikasına sahip ulusal restoran zinciri” unvanını aldı.',
    'Baydöner, restoranlarını ve dijital kanallarını görme engelli bireyler için erişilebilir hâle getirdi. Bu iş birliği sayesinde görme engelli tüketiciler, Baydöner restoranlarında kimsenin desteğine ihtiyaç duymadan deneyim yaşayabiliyor.',
    'Görme engelli bireyler, Baydöner Cossla uygulamasının sesli simülasyonuna BlindLook uygulaması üzerinden erişebiliyor. Bu proje, markanın Türkiye’deki 1 milyon görme engellinin hak ettiği hizmeti, lezzeti ve fırsat eşitliğini sağlama konusundaki kararlılığını gösteriyor.',
    'BlindLook’un yenilikçi ve yaratıcı teknolojilerini kullanarak her gün görme engellilere bu deneyimi sunan Baydöner, topluma karşı sorumluluklarını yerine getirmeye ve herkes için daha erişilebilir bir dünya yaratmaya devam ediyor.'
  ];

  return (
    <main className="min-h-dvh">
      <HeroGradient
        heading="Kurumsal Sosyal Sorumluluk"
        headingClassName="text-brand-primary"
        intro="Kapsayıcılık, sürdürülebilirlik ve sosyal farkındalık odaklı yaklaşımımız."
        minHeights={{ base: 'min-h-[200px]', md: 'md:min-h-[230px]', lg: 'lg:min-h-[250px]' }}
        contentClassName="max-w-4xl"
      />
      <div className="py-8 md:py-12 container mx-auto px-4">
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
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 ring-2 ring-brand-bronze-200/50 px-6 md:px-8 py-8 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 hover:ring-brand-secondary/50 hover:shadow-xl">
                  {/* Intro */}
                  <div className="space-y-4 text-[14.5px] md:text-[15px] leading-relaxed text-slate-700 tracking-[0.2px]">
                    {intro.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  {/* Divider */}
                  <div className="my-7 h-px bg-gradient-to-r from-transparent via-slate-300/70 to-transparent" aria-hidden="true" />
                  {/* BlindLook Section */}
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <span className="inline-block h-6 w-1.5 rounded-full bg-brand-accent" aria-hidden="true" />
                      <h2 className="text-lg md:text-xl font-semibold tracking-tight text-slate-900 m-0">{blindLookHeading}</h2>
                    </div>
                    <div className="space-y-4 text-[14.5px] md:text-[15px] leading-relaxed text-slate-700">
                      {blindLookParagraphs.map((p, i) => (
                        <p key={i} className={i === 0 ? 'font-medium' : undefined}>{p}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </main>
  );
}
