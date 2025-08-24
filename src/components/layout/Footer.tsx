import Link from 'next/link';
import Image from 'next/image';
import { SocialIcon } from 'react-social-icons';

import type { Locale } from '../../lib/i18n';
import { LangSwitcher } from '../navigation/LangSwitcher';

interface FooterProps { locale: Locale }

export function Footer({ locale }: FooterProps) {
  const withLocale = (path: string) => (path === '/' ? `/${locale}` : `/${locale}${path}`);

  return (
    <footer>
      {/* 1) Footer widgets */}
      <div className="bg-gray-100">
        <div className="footer_widgets py-16">
          <div className="container mx-auto px-4">
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
                  <p className="text-gray-600">
                    Adalet Mah. Anadolu Cad. No:41 Bağımsız Bölüm K:20 No:17 Megapol Tower Bayraklı - İZMİR
                  </p>
                  <p>
                    <a
                      href="mailto:info@apazgroup.com"
                      className="mail text-gray-800 hover:text-yellow-500 transition-colors"
                    >
                      info@apazgroup.com
                    </a>
                  </p>
                  <p>
                    <a
                      href="tel:+902324644235"
                      className="phone text-gray-800 hover:text-yellow-500 transition-colors"
                    >
                      +90 232 464 42 35
                    </a>
                  </p>
                </div>
              </div>

              {/* Site Map */}
              <div className="f_widgets_item">
                <div className="f_link">
                  <div className="f_title mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Site Haritası</h3>
                  </div>
                  <ul className="list space-y-2 text-sm">
                    <li>
                      {(() => { const href = withLocale('/hakkimizda'); return (
                        // @ts-expect-error typedRoutes experimental dynamic string
                        <Link href={href} className="text-gray-600 hover:text-yellow-500 transition-colors">Hakkımızda</Link>
                      ); })()}
                    </li>
                    <li>
                      {(() => { const href = withLocale('/franchising'); return (
                        // @ts-expect-error typedRoutes experimental dynamic string
                        <Link href={href} className="text-gray-600 hover:text-yellow-500 transition-colors">Franchising</Link>
                      ); })()}
                    </li>
                    <li>
                      {(() => { const href = withLocale('/kariyer/insan-kaynaklari-politikamiz'); return (
                        // @ts-expect-error typedRoutes experimental dynamic string
                        <Link href={href} className="text-gray-600 hover:text-yellow-500 transition-colors">Kariyer</Link>
                      ); })()}
                    </li>
                    <li>
                      {(() => { const href = withLocale('/iletisim'); return (
                        // @ts-expect-error typedRoutes experimental dynamic string
                        <Link href={href} className="text-gray-600 hover:text-yellow-500 transition-colors">İletişim</Link>
                      ); })()}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Brands */}
              <div className="f_widgets_item">
                <div className="f_link">
                  <div className="f_title mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Markalarımız</h3>
                  </div>
                  <ul className="list space-y-2 text-sm">
                    <li>
                      {(() => { const href = withLocale('/markalarimiz/baydoner'); return (
                        // @ts-expect-error typedRoutes experimental dynamic string
                        <Link href={href} className="text-gray-600 hover:text-yellow-500 transition-colors">Baydöner</Link>
                      ); })()}
                    </li>
                    <li>
                      {(() => { const href = withLocale('/markalarimiz/pide-by-pide'); return (
                        // @ts-expect-error typedRoutes experimental dynamic string
                        <Link href={href} className="text-gray-600 hover:text-yellow-500 transition-colors">Pide by Pide</Link>
                      ); })()}
                    </li>
                    <li>
                      {(() => { const href = withLocale('/markalarimiz/bursa-ishakbey'); return (
                        // @ts-expect-error typedRoutes experimental dynamic string
                        <Link href={href} className="text-gray-600 hover:text-yellow-500 transition-colors">Bursa İshakbey</Link>
                      ); })()}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Other Links */}
              <div className="f_widgets_item">
                <div className="f_link">
                  <div className="f_title mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Diğer</h3>
                  </div>
                  <ul className="list space-y-2 text-sm">
                    <li>
                      {(() => { const href = withLocale('/kisisel-verilerin-korunmasi'); return (
                        // @ts-expect-error typedRoutes experimental dynamic string
                        <Link href={href} className="text-gray-600 hover:text-yellow-500 transition-colors">Kişisel Verilerin Korunması</Link>
                      ); })()}
                    </li>
                    <li>
                      {/* Bilgi Toplumu Hizmetleri linki kaldırıldı */}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2) Social section */}
      <div className="social py-6 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <ul className="flex items-center">
              <li className="mr-4 text-gray-600">Bizi Takip Edin :</li>
              {/* <li className="mx-2">
                <SocialIcon
                  url="https://x.com/ApazGroup"
                  aria-label="X (Twitter)"
                  bgColor="#0f172a"
                  fgColor="#ffffff"
                  style={{ height: 28, width: 28 }}
                />
              </li> */}
              <li className="mx-2">
                <SocialIcon
                  url="https://www.linkedin.com/company/apazgroup"
                  aria-label="LinkedIn"
                  bgColor="#0f172a"
                  fgColor="#ffffff"
                  style={{ height: 28, width: 28 }}
                />
              </li>
            </ul>

            {/* Language Switcher */}
            <div className="right_text">
              <LangSwitcher current={locale} />
            </div>
          </div>
        </div>
      </div>

      {/* 3) Copyright */}
      <div className="footer_copyright py-4 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="left_text mb-4 md:mb-0">
              <p>© 2025 Apaz Group - Tüm Hakları Saklıdır.</p>
            </div>
            <div className="footer_right"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
