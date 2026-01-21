import Link from 'next/link';
import Image from 'next/image';
import { SocialIcon } from 'react-social-icons';
import { Icon } from '../ui/Icon';

import type { Locale } from '../../lib/i18n';
// import { LangSwitcher } from '../navigation/LangSwitcher'; // temporarily disabled

interface FooterProps { locale: Locale }

export function Footer({ locale }: FooterProps) {
  const withLocale = (path: string) => (path === '/' ? `/${locale}` : `/${locale}${path}`);

  const aboutItems = [
    ['/hakkimizda', 'Apaz Group Hakkında'],
    ['/hakkimizda/kalite', 'Kalite'],
    ['/haberler', 'Haberler'],
    ['/kurumsal-sosyal-sorumluluk-politikasi', 'Kurumsal Sosyal Sorumluluk (KSS)'],
    ['/seffaflik-ve-hesap-verebilirlik', 'Şeffaflık ve Hesap Verebilirlik'],
  ] as const;

  const brandItems = [
    ['/markalarimiz/baydoner', 'Baydöner'],
    ['/markalarimiz/pide-by-pide', 'PidebyPide'],
    ['/markalarimiz/bursa-ishakbey', 'Bursa İshakbey'],
  ] as const;

  const careerItems = [
    ['/kariyer/insan-kaynaklari-politikamiz', 'İnsan Kaynakları Politikamız'],
    ['/kariyer/kurum-kulturumuz-ve-etik-degerlerimiz', 'Kurum Kültürümüz / Etik Değerlerimiz'],
    ['/kariyer/ucret-politikamiz', 'Ücret Politikamız'],
    ['/kariyer/performans', 'Hedeflerle Yönetim ve Performans'],
    ['/kariyer/olanaklar', 'Sosyal Olanaklar'],
    ['/kariyer/kariyer-egitim', 'Eğitim ve Kariyer Olanaklarımız'],
    ['/bize-katilin', 'Bize Katılın'],
  ] as const;

  return (
    <footer className="relative text-brand-primary">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* Bronz odaklı gradient: açık bronz -> altın -> koyu navy */}
        <div className="w-full h-full bg-gradient-to-br from-brand-bronze-200 via-brand-gold-400 to-brand-primary opacity-95" />
        {/* İkinci katman: merkez bronz vurgusu */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,#b89b6f_0%,transparent_70%)] opacity-30 mix-blend-overlay" />
        {/* Üstten ince overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/20 via-transparent to-transparent" />
      </div>
      {/* 1) Footer widgets */}
      <div className="bg-brand-bronze-900/10 backdrop-blur-sm border-t border-brand-bronze-300/20">
        <div className="footer_widgets py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-primary text-center mb-8">Site Haritası</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Contact Information */}
              <div className="f_widgets_item">
                <div className="f_logo mb-6">
                  <div className="relative w-[180px] h-[60px]">
                    <Image
                      src="/brand/logo--global.png" /* legacy: /images/logo-dark.png */
                      alt="Apaz Group"
                      fill
                      sizes="180px"
                      className="object-contain h-auto"
                      priority
                    />
                  </div>
                </div>
                <div className="desc space-y-3 text-sm">
                  <p className="text-brand-primary flex items-start gap-3 leading-relaxed">
                    <Icon name="map-pin" size={32} aria-hidden className="text-brand-primary mt-0.5" />
                    <span>Adalet Mah. Anadolu Cad. No:41 Bağımsız Bölüm K:20 No:17 Megapol Tower Bayraklı - İZMİR</span>
                  </p>
                  <p>
                    <a
                      href="mailto:info@apazgroup.com"
                      className="mail inline-flex items-center gap-2 text-brand-primary hover:text-brand-secondary transition-colors"
                    >
                      <Icon name="mail" size={20} aria-hidden className="text-brand-primary" />
                      <span>info@apazgroup.com</span>
                    </a>
                  </p>
                  <p>
                    <a
                      href="tel:+902324644235"
                      className="phone inline-flex items-center gap-2 text-brand-primary hover:text-brand-secondary transition-colors"
                    >
                      <Icon name="phone" size={20} aria-hidden className="text-brand-primary" />
                      <span>+90 232 464 42 35</span>
                    </a>
                  </p>
                </div>
              </div>

              {/* About + Brands */}
              <div className="f_widgets_item">
                <div className="f_link">
                  <div className="f_title mb-6">
                    <h3 className="text-xl font-semibold text-brand-primary">Hakkımızda</h3>
                  </div>
                  <ul className="list text-sm">
                    {aboutItems.map(([path, label]) => (
                      <li key={path} className="py-1 first:pt-0 last:pb-0">
                        {(() => {
                          const href = withLocale(path);
                          return (
                            // @ts-expect-error typedRoutes experimental dynamic string
                            <Link href={href} className="text-brand-primary hover:text-brand-secondary transition-colors">
                              {label}
                            </Link>
                          );
                        })()}
                      </li>
                    ))}
                  </ul>

                  <div className="f_title mt-10 mb-6">
                    <h3 className="text-xl font-semibold text-brand-primary">Markalarımız</h3>
                  </div>
                  <ul className="list text-sm">
                    {brandItems.map(([path, label]) => (
                      <li key={path} className="py-1 first:pt-0 last:pb-0">
                        {(() => {
                          const href = withLocale(path);
                          return (
                            // @ts-expect-error typedRoutes experimental dynamic string
                            <Link href={href} className="text-brand-primary hover:text-brand-secondary transition-colors">
                              {label}
                            </Link>
                          );
                        })()}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Navigation (Franchising + Contact + Career) */}
              <div className="f_widgets_item">
                <div className="f_link">
                  <ul className="list text-xl mb-10">
                    <li className="py-1 first:pt-0 last:pb-0">
                      {(() => {
                        const href = withLocale('/franchising');
                        return (
                          // @ts-expect-error typedRoutes experimental dynamic string
                          <Link href={href} className="font-semibold text-brand-primary hover:text-brand-secondary transition-colors">
                            Franchising
                          </Link>
                        );
                      })()}
                    </li>
                  </ul>

                  <div className="f_title mb-6">
                    <h3 className="text-xl font-semibold text-brand-primary">Kariyer</h3>
                  </div>
                  <ul className="list text-sm">
                    {careerItems.map(([path, label]) => (
                      <li key={path} className="py-1 first:pt-0 last:pb-0">
                        {(() => {
                          const href = withLocale(path);
                          return (
                            // @ts-expect-error typedRoutes experimental dynamic string
                            <Link href={href} className="text-brand-primary hover:text-brand-secondary transition-colors">
                              {label}
                            </Link>
                          );
                        })()}
                      </li>
                    ))}
                  </ul>

                  <ul className="list text-xl mt-8 mb-10">
                    <li className="py-1 first:pt-0 last:pb-0">
                      {(() => {
                        const href = withLocale('/iletisim');
                        return (
                          // @ts-expect-error typedRoutes experimental dynamic string
                          <Link href={href} className="font-semibold text-brand-primary hover:text-brand-secondary transition-colors">
                            İletişim
                          </Link>
                        );
                      })()}
                    </li>
                  </ul>

                </div>
              </div>

              {/* Policies (KVKK & Çerez) */}
              <div className="f_widgets_item">
                <div className="f_link">
                  <div className="f_title mb-6">
                    <h3 className="text-xl font-semibold text-brand-primary">Diğer</h3>
                  </div>
                  <ul className="list text-sm">
                    {/* KVKK main + sublinks */}
                    <li className="py-1 first:pt-0 last:pb-0">
                      <a
                        href={`/pdf?src=${encodeURI('/hr/Kişisel Verilerin Korunması Kanunu Uyarınca Kamuoyu Aydınlatma Metni .pdf')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-primary hover:text-brand-primary transition-colors"
                      >
                        KVKK
                      </a>
                      <ul className="mt-2 ml-4 text-[13px] text-brand-primary/90">
                        <li className="py-0.5 first:pt-0 last:pb-0">
                          <a
                            href={`/pdf?src=${encodeURI('/hr/İnternet Sitesi Aydınlatma Metini.pdf')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-brand-primary transition-colors"
                          >
                            İnternet Sitesi Aydınlatma Metni
                          </a>
                        </li>
                        <li className="py-0.5 first:pt-0 last:pb-0">
                          <a
                            href={`/pdf?src=${encodeURI('/hr/Müşteriler, Tedarikçi Yetkilisi ve Tedarikçi Çalışanlarına Yönelik Aydınlatma Metni.pdf')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-brand-primary transition-colors"
                          >
                            Müşteri/Tedarikçi Aydınlatma Metni
                          </a>
                        </li>
                      </ul>
                    </li>
                    {/* Çerez Politikası */}
                    <li className="py-1 first:pt-0 last:pb-0">
                      <a
                        href={`/pdf?src=${encodeURI('/hr/Çerez Politikası.pdf')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-primary hover:text-brand-primary transition-colors"
                      >
                        Çerez Politikası
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand social (desktop grid) */}
      <div className="hidden lg:block bg-white/5 backdrop-blur-sm border-t border-white/10 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8">
            {[
              {
                name: 'Baydöner',
                logo: '/markalar/baydoner_logo.svg',
                links: {
                  instagram: 'https://www.instagram.com/baydoner?igsh=MzUzMXIycWRwYmk4',
                  linkedin: 'https://www.linkedin.com/company/baydoner/',
                  facebook: 'https://www.facebook.com/share/14L8PfC8MY/?mibextid=LQQJ4d',
                  x: 'https://x.com/bay_doner?s=11'
                }
              },
              {
                name: 'Bursa İshakbey',
                logo: '/markalar/bib_disi.png',
                links: {
                  instagram: 'https://www.instagram.com/bursaishakbey_/profilecard/?igsh=MXF2cXJjMzZkdWhzaw==',
                  linkedin: 'https://www.linkedin.com/company/bursa-ishakbey/',
                  facebook: 'https://www.facebook.com/share/1Dtz6FKNqS/?mibextid=LQQJ4d',
                  x: 'https://x.com/bursaishakbey_'
                }
              },
              {
                name: 'PidebyPide',
                logo: '/markalar/pidebypide_logo.png',
                links: {
                  instagram: 'https://www.instagram.com/pidebypide/profilecard/?igsh=aDRjMWpkOGc4bjk3',
                  linkedin: 'https://www.linkedin.com/company/pidebypide/',
                  facebook: 'https://www.facebook.com/share/1ETPPv1EYh/?mibextid=LQQJ4d',
                  x: 'https://x.com/pidebypide'
                }
              }
            ].map((brand) => (
              <div key={brand.name} className="flex flex-col items-center text-center">
                <div className={`relative mb-4 h-16 ${brand.name === 'Bursa İshakbey' ? 'w-[15rem]' : 'w-40'}`}>
                  <Image src={brand.logo} alt={brand.name} fill sizes={brand.name === 'Bursa İshakbey' ? '240px' : '160px'} className="object-contain" />
                </div>
                <div className="flex items-center gap-4 text-brand-primary">
                  <SocialIcon url={brand.links.instagram} aria-label={brand.name + ' Instagram'} target="_blank" rel="noopener noreferrer" fgColor="#1F3A52" bgColor="transparent" style={{ height: 32, width: 32 }} className="hover:opacity-90 transition-opacity" />
                  <SocialIcon url={brand.links.linkedin} aria-label={brand.name + ' LinkedIn'} target="_blank" rel="noopener noreferrer" fgColor="#1F3A52" bgColor="transparent" style={{ height: 32, width: 32 }} className="hover:opacity-90 transition-opacity" />
                  <SocialIcon url={brand.links.facebook} aria-label={brand.name + ' Facebook'} target="_blank" rel="noopener noreferrer" fgColor="#1F3A52" bgColor="transparent" style={{ height: 32, width: 32 }} className="hover:opacity-90 transition-opacity" />
                  <SocialIcon url={brand.links.x} aria-label={brand.name + ' X'} target="_blank" rel="noopener noreferrer" fgColor="#1F3A52" bgColor="transparent" style={{ height: 32, width: 32 }} className="hover:opacity-90 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand social (mobile horizontal scroll) */}
      <div className="lg:hidden bg-white/5 backdrop-blur-sm border-t border-white/10 py-6">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2" aria-label="Marka sosyal bağlantıları">
            {[
              {
                name: 'Baydöner',
                logo: '/markalar/baydoner_logo.svg',
                links: {
                  instagram: 'https://www.instagram.com/baydoner?igsh=MzUzMXIycWRwYmk4',
                  linkedin: 'https://www.linkedin.com/company/baydoner/',
                  facebook: 'https://www.facebook.com/share/14L8PfC8MY/?mibextid=LQQJ4d',
                  x: 'https://x.com/bay_doner?s=11'
                }
              },
              {
                name: 'Bursa İshakbey',
                logo: '/markalar/bib_disi.png',
                links: {
                  instagram: 'https://www.instagram.com/bursaishakbey_/profilecard/?igsh=MXF2cXJjMzZkdWhzaw==',
                  linkedin: 'https://www.linkedin.com/company/bursa-ishakbey/',
                  facebook: 'https://www.facebook.com/share/1Dtz6FKNqS/?mibextid=LQQJ4d',
                  x: 'https://x.com/bursaishakbey_'
                }
              },
              {
                name: 'PidebyPide',
                logo: '/markalar/pidebypide_logo.png',
                links: {
                  instagram: 'https://www.instagram.com/pidebypide/profilecard/?igsh=aDRjMWpkOGc4bjk3',
                  linkedin: 'https://www.linkedin.com/company/pidebypide/',
                  facebook: 'https://www.facebook.com/share/1ETPPv1EYh/?mibextid=LQQJ4d',
                  x: 'https://x.com/pidebypide'
                }
              }
            ].map((brand) => (
              <div key={brand.name} className="snap-center shrink-0 w-60 bg-white/10 rounded-lg border border-white/10 p-4 flex flex-col items-center">
                <div className={`relative mb-3 h-12 ${brand.name === 'Bursa İshakbey' ? 'w-[13.5rem]' : 'w-36'}`}>
                  <Image src={brand.logo} alt={brand.name} fill sizes={brand.name === 'Bursa İshakbey' ? '216px' : '144px'} className="object-contain" />
                </div>
                <div className="flex items-center gap-3 text-brand-primary">
                  <SocialIcon url={brand.links.instagram} aria-label={brand.name + ' Instagram'} target="_blank" rel="noopener noreferrer" fgColor="#1F3A52" bgColor="transparent" style={{ height: 24, width: 24 }} className="hover:opacity-90 transition-opacity" />
                  <SocialIcon url={brand.links.linkedin} aria-label={brand.name + ' LinkedIn'} target="_blank" rel="noopener noreferrer" fgColor="#1F3A52" bgColor="transparent" style={{ height: 24, width: 24 }} className="hover:opacity-90 transition-opacity" />
                  <SocialIcon url={brand.links.facebook} aria-label={brand.name + ' Facebook'} target="_blank" rel="noopener noreferrer" fgColor="#1F3A52" bgColor="transparent" style={{ height: 24, width: 24 }} className="hover:opacity-90 transition-opacity" />
                  <SocialIcon url={brand.links.x} aria-label={brand.name + ' X'} target="_blank" rel="noopener noreferrer" fgColor="#1F3A52" bgColor="transparent" style={{ height: 24, width: 24 }} className="hover:opacity-90 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Unified social + copyright bar */}
      <div className="border-t border-white/10 bg-black/40/60 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* <span className="text-xs tracking-wide text-brand-primary/80">Güven, lezzet ve sürdürülebilir büyüme.</span> */}
            {/* <div className="flex items-center gap-5">
              <SocialIcon url="https://www.linkedin.com/company/apaz-group" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" fgColor="#1F3A52" bgColor="transparent" style={{ height: 30, width: 30 }} className="hover:opacity-90 transition-opacity" />
            </div> */}
            <div className="text-center md:text-right text-[13px] text-brand-primary/80">
              © 2025 Apaz Group — Tüm Hakları Saklıdır.
            </div>
          </div>
        </div>
      </div>
      {/* Minimal bootstrap-like helpers (scoped) */}
      <style jsx global>{`
        .row { display:flex; flex-wrap:wrap; }
        .col-md-4 { width:100%; }
        @media (min-width:768px){ .col-md-4 { width:33.333%; } }
        .d-none { display:none; }
        @media (min-width:1024px){ .d-lg-block { display:block; } .d-lg-none { display:none; } }
      `}</style>
    </footer>
  );
}
