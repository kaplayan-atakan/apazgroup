"use client";

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import type { Locale } from '../../lib/i18n';
import { t } from '../../lib/i18n-dict';
// import { LangSwitcher } from '../navigation/LangSwitcher'; // temporarily disabled
import { Icon } from '../ui/Icon';
import { SocialIcon } from 'react-social-icons';
import { Button } from '../ui/Button';

type MobileSection = 'about' | 'brands' | 'career' | null;

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<MobileSection>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const firstFocusableRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  // Desktop dropdown open state controlled via mouseenter/leave
  const [desktopOpen, setDesktopOpen] = useState<MobileSection>(null);
  const openSection = (s: MobileSection) => setDesktopOpen(s);
  const closeSection = () => setDesktopOpen(null);

  const withLocale = (path: string) => (path === '/' ? `/${locale}` : `/${locale}${path}`);
  const isActive = (path: string) => pathname === withLocale(path);

  // Client navigation helper for mobile buttons (suppresses typedRoutes constraints for dynamic strings)
  const go = (href: string) => {
    try {
      // @ts-expect-error dynamic string not in typed route map
      router.push(href);
    } catch {
      window.location.href = href; // graceful fallback
    }
    setMobileOpen(false);
  };

  // Data sources for dropdowns (single source of truth for desktop & mobile)
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

  const patternedLi = (i: number, children: React.ReactNode) => (
    <li className="odd:bg-brand-primary/5 even:bg-brand-accent/5 hover:odd:bg-brand-primary/10 hover:even:bg-brand-accent/10 transition-colors" key={i}>{children}</li>
  );

  const mobileBg = (i: number) => i % 2 === 0 ? 'bg-brand-primary/5 hover:bg-brand-primary/10' : 'bg-brand-accent/5 hover:bg-brand-accent/10';
  const mobileItemClasses = (i: number, active: boolean) => [
    'justify-start h-10 px-2 text-sm rounded-md transition-colors',
    mobileBg(i),
    active ? 'text-brand-primary font-medium' : 'hover:text-brand-primary'
  ].join(' ');

  // Lock scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Focus close button on open
  useEffect(() => { if (mobileOpen) setTimeout(() => closeBtnRef.current?.focus(), 0); }, [mobileOpen]);

  // Close on Escape when mobile menu open & focus trap
  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      } else if (e.key === 'Tab' && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, a, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last && last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
            first && first.focus();
        }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  return (
  <header
    id="site-header"
  className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-gradient-to-b from-white to-slate-50"
    role="banner"
  >
  <nav className="container mx-auto px-4 h-16 lg:h-24 flex items-center justify-between" aria-label={t(locale, 'nav.mainNavigation', 'Ana Navigasyon')}>
        {/* Logo */}
        {(() => {
          const href = withLocale('/');
          return (
            // @ts-expect-error typedRoutes experimental: dynamic string
            <Link href={href} aria-label={t(locale, 'nav.home', 'Anasayfaya git')} className="flex-shrink-0">
              <span className="relative block h-14 lg:h-20 w-[180px] lg:w-[260px] transition-all duration-200">
                {/* Dark/Light variants - can be adjusted to separate assets if provided */}
                <Image src="/brand/logo--global.png" alt="Apaz Group" fill sizes="(max-width:1024px) 180px, 260px" className="object-contain block" priority />
              </span>
            </Link>
          );
        })()}

        {/* Desktop navigation */}
  <ul
    className="hidden lg:flex items-center gap-6 font-medium"
    onMouseLeave={closeSection}
    onClick={(e) => {
      const target = (e.target as HTMLElement).closest('a[data-close]') as HTMLElement | null;
      if (target) {
        closeSection();
        // Blur after paint so group-focus-within no longer applies keeping dropdown visible
        requestAnimationFrame(() => target.blur());
      }
    }}
  >
          {/* About dropdown */}
          <li
            className="relative group rounded-md bg-brand-primary/5 hover:bg-brand-primary/10 transition-colors"
            onMouseEnter={() => openSection('about')}
            onMouseLeave={closeSection}
          >
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="px-2 py-1 h-auto font-normal text-slate-700 hover:text-brand-primary focus-visible:ring-brand-primary/40 text-[13px]"
              aria-haspopup="true"
              aria-expanded="false"
              elevation={0}
            >
              <span className="flex items-center gap-1">
                {t(locale, 'nav.about', 'Hakkımızda')}
                <Icon name="chevron-down" />
              </span>
            </Button>
            {/* hover bridge: prevents hover-out between trigger and submenu */}
            <span aria-hidden className="absolute left-0 right-0 top-full h-2" />
            <ul
              data-open={desktopOpen === 'about'}
              className="absolute left-0 top-full z-50 w-64 bg-white shadow-lg rounded-md py-2 border border-slate-200 invisible opacity-0 translate-y-1 transition data-[open=true]:visible data-[open=true]:opacity-100 data-[open=true]:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0"
            >
              {aboutItems.map(([p,label],i)=>{const href=withLocale(p);return patternedLi(i,(
                // @ts-expect-error dynamic string
                <Link href={href} onClick={closeSection} data-close="true" aria-current={isActive(p)?'page':undefined} className="block px-4 py-2 text-[13px]">{label}</Link>
              ));})}
            </ul>
          </li>
          {/* Brands dropdown */}
          <li
            className="relative group rounded-md bg-brand-accent/5 hover:bg-brand-accent/10 transition-colors"
            onMouseEnter={() => openSection('brands')}
            onMouseLeave={closeSection}
          >
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="px-2 py-1 h-auto font-normal text-slate-700 hover:text-brand-primary focus-visible:ring-brand-primary/40 text-[13px]"
              aria-haspopup="true"
              aria-expanded="false"
              elevation={0}
            >
              <span className="flex items-center gap-1">
                Markalarımız
                <Icon name="chevron-down" />
              </span>
            </Button>
            <span aria-hidden className="absolute left-0 right-0 top-full h-2" />
            <ul
              data-open={desktopOpen === 'brands'}
              className="absolute left-0 top-full z-50 w-64 bg-white shadow-lg rounded-md py-2 border border-slate-200 invisible opacity-0 translate-y-1 transition data-[open=true]:visible data-[open=true]:opacity-100 data-[open=true]:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0"
            >
              {brandItems.map(([p,label],i)=>{const href=withLocale(p);return patternedLi(i,(
                // @ts-expect-error dynamic string
                <Link href={href} onClick={closeSection} data-close="true" aria-current={isActive(p)?'page':undefined} className="block px-4 py-2 text-[13px]">{label}</Link>
              ));})}
            </ul>
          </li>
          <li>
            {(() => { const href = withLocale('/franchising'); return (// @ts-expect-error typedRoutes dynamic string
              <Link href={href} className={`inline-flex items-center h-8 px-2 py-1 rounded-md font-normal transition-colors text-[13px] ${isActive('/franchising') ? 'text-brand-primary font-semibold bg-brand-primary/20' : 'bg-brand-primary/5 hover:bg-brand-primary/10 text-slate-700 hover:text-brand-primary'}`}>Franchising</Link>
            ); })()}
          </li>
          {/* Career dropdown */}
          <li
            className="relative group rounded-md bg-brand-primary/5 hover:bg-brand-primary/10 transition-colors"
            onMouseEnter={() => openSection('career')}
            onMouseLeave={closeSection}
          >
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="px-2 py-1 h-auto font-normal text-slate-700 hover:text-brand-primary focus-visible:ring-brand-primary/40 text-[13px]"
              aria-haspopup="true"
              aria-expanded="false"
              elevation={0}
            >
              <span className="flex items-center gap-1">
                Kariyer
                <Icon name="chevron-down" />
              </span>
            </Button>
            <span aria-hidden className="absolute left-0 right-0 top-full h-2" />
            <ul
              data-open={desktopOpen === 'career'}
              className="absolute left-0 top-full z-50 bg-white shadow-lg rounded-md py-2 border border-slate-200 invisible opacity-0 translate-y-1 transition data-[open=true]:visible data-[open=true]:opacity-100 data-[open=true]:translate-y-0 w-72 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0"
            >
              {careerItems.map(([p,label],i)=>{const href=withLocale(p);return patternedLi(i,(
                // @ts-expect-error dynamic string
                <Link href={href} onClick={closeSection} data-close="true" aria-current={isActive(p)?'page':undefined} className="block px-4 py-2 text-[13px]">{label}</Link>
              ));})}
            </ul>
          </li>
          <li>
            {(() => { const href = withLocale('/iletisim'); return (// @ts-expect-error typedRoutes dynamic string
              <Link href={href} className={`inline-flex items-center h-8 px-2 py-1 rounded-md font-normal transition-colors text-[13px] ${isActive('/iletisim') ? 'text-brand-primary font-semibold bg-brand-primary/20' : 'bg-brand-accent/5 hover:bg-brand-accent/10 text-slate-700 hover:text-brand-primary'}`}>İletişim</Link>
            ); })()}
          </li>
        </ul>

        {/* Right side: socials + lang switcher + mobile toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-3">
            <SocialIcon url="https://www.linkedin.com/company/apaz-group" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" fgColor="#1F3A52" bgColor="transparent" style={{ height: 36, width: 36 }} className="hover:opacity-80 transition-opacity" />
          </div>
          {/* LangSwitcher temporarily hidden */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="lg:hidden h-10 w-10 p-0 rounded-full hover:bg-brand-primary/5 focus-visible:ring-brand-primary/40"
            onClick={() => setMobileOpen(true)}
            aria-label={t(locale, 'nav.openMenu', 'Menüyü Aç')}
            aria-controls="mobile-menu"
            aria-expanded={mobileOpen}
            pill
            elevation={0}
          >
            <Icon name="menu" />
          </Button>
        </div>
      </nav>

      {/* Mobile hamburger side-drawer (portal) */}
      {mobileOpen && typeof window !== 'undefined' && createPortal(
        <div id="mobile-menu" className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label={t(locale,'nav.mobileMenu','Mobil menü')}>
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]" onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <div ref={drawerRef} className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-xl flex flex-col overflow-y-auto animate-slide-in-x focus:outline-none" tabIndex={-1}>
            <div className="flex items-center justify-between px-5 h-16 border-b border-slate-200" role="none">
              {(() => { const href = withLocale('/'); return (// @ts-expect-error typedRoutes dynamic string
                <Link href={href} aria-label={t(locale, 'nav.home', 'Anasayfa')} onClick={() => setMobileOpen(false)} className="flex-shrink-0">
                  <span className="relative block h-14 lg:h-20 w-[180px] lg:w-[260px] transition-all duration-200">
                    <Image src="/brand/logo--global.png" alt="Apaz Group" fill sizes="(max-width:1024px) 180px, 260px" className="object-contain" />
                  </span>
                </Link>
              ); })()}
              <Button
                ref={closeBtnRef}
                type="button"
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0 rounded-full hover:bg-brand-primary/5 focus-visible:ring-brand-primary/40"
                onClick={() => setMobileOpen(false)}
                aria-label={t(locale, 'nav.closeMenu', 'Menüyü Kapat')}
                pill
                elevation={0}
              >
                <Icon name="close" />
              </Button>
            </div>
            <div className="px-4 py-6 space-y-4" role="menu" aria-orientation="vertical">
              <div role="none">
                <Button
                  ref={firstFocusableRef}
                  type="button"
                  variant="ghost"
                  fullWidth
                  className="relative flex items-center justify-center text-base font-medium text-slate-800 h-12 px-3 rounded-md bg-brand-primary/5 hover:bg-brand-primary/10 hover:text-brand-primary transition-colors"
                  onClick={() => setMobileSubmenu(mobileSubmenu === 'about' ? null : 'about')}
                  aria-expanded={mobileSubmenu === 'about'}
                  aria-controls="m-about"
                  aria-haspopup="true"
                  elevation={0}
                >
                  <span className="pointer-events-none">Hakkımızda</span>
                  <span className="absolute right-3 inline-flex" aria-hidden="true">
                    <Icon name="chevron-down" className={`transition-transform duration-200 ${mobileSubmenu === 'about' ? 'rotate-180' : ''}`} />
                  </span>
                </Button>
                <ul id="m-about" className={`mt-2 ml-3 border-l border-slate-200 pl-3 space-y-1 text-sm ${mobileSubmenu === 'about' ? 'block' : 'hidden'}`}>
                  {aboutItems.map(([p,label],i)=>{ const href=withLocale(p); return (
                    <li key={p}>
                      <Button
                        type="button" variant="ghost" fullWidth elevation={0}
                        onClick={() => go(href)}
                        className={mobileItemClasses(i, isActive(p))}
                        role="menuitem"
                        aria-current={isActive(p)?'page':undefined}
                      >{label}</Button>
                    </li>
                  );})}
                </ul>
              </div>
              {/* Brands */}
              <div role="none">
                <Button
                  type="button"
                  variant="ghost"
                  fullWidth
                  className="relative flex items-center justify-center text-base font-medium text-slate-800 h-12 px-3 rounded-md bg-brand-accent/5 hover:bg-brand-accent/10 hover:text-brand-primary transition-colors"
                  onClick={() => setMobileSubmenu(mobileSubmenu === 'brands' ? null : 'brands')}
                  aria-expanded={mobileSubmenu === 'brands'}
                  aria-controls="m-brands"
                  aria-haspopup="true"
                  elevation={0}
                >
                  <span className="pointer-events-none">Markalarımız</span>
                  <span className="absolute right-3 inline-flex" aria-hidden="true">
                    <Icon name="chevron-down" className={`transition-transform duration-200 ${mobileSubmenu === 'brands' ? 'rotate-180' : ''}`} />
                  </span>
                </Button>
                <ul id="m-brands" className={`mt-2 ml-3 border-l border-slate-200 pl-3 space-y-1 text-sm ${mobileSubmenu === 'brands' ? 'block' : 'hidden'}`}>
                  {brandItems.map(([p,label],i)=>{ const href=withLocale(p); return (
                    <li key={p}>
                      <Button
                        type="button" variant="ghost" fullWidth elevation={0}
                        onClick={() => go(href)}
                        className={mobileItemClasses(i, isActive(p))}
                        role="menuitem"
                        aria-current={isActive(p)?'page':undefined}
                      >{label}</Button>
                    </li>
                  );})}
                </ul>
              </div>
              {/* Franchising direct link */}
        {(() => { const href = withLocale('/franchising'); return (
                <Button
                  type="button"
                  variant="ghost"
                  fullWidth
                  elevation={0}
          onClick={() => go(href)}
                  className={`justify-start text-base font-medium h-12 px-3 rounded-md transition-colors ${isActive('/franchising') ? 'text-brand-primary font-semibold bg-brand-primary/20' : 'text-slate-800 bg-brand-primary/5 hover:text-brand-primary hover:bg-brand-primary/10'}`}
                  role="menuitem"
                >Franchising</Button>
              ); })()}
              {/* Career */}
              <div role="none">
                <Button
                  type="button"
                  variant="ghost"
                  fullWidth
                  className="relative flex items-center justify-center text-base font-medium text-slate-800 h-12 px-3 rounded-md bg-brand-accent/5 hover:bg-brand-accent/10 hover:text-brand-primary transition-colors"
                  onClick={() => setMobileSubmenu(mobileSubmenu === 'career' ? null : 'career')}
                  aria-expanded={mobileSubmenu === 'career'}
                  aria-controls="m-career"
                  aria-haspopup="true"
                  elevation={0}
                >
                  <span className="pointer-events-none">Kariyer</span>
                  <span className="absolute right-3 inline-flex" aria-hidden="true">
                    <Icon name="chevron-down" className={`transition-transform duration-200 ${mobileSubmenu === 'career' ? 'rotate-180' : ''}`} />
                  </span>
                </Button>
                <ul id="m-career" className={`mt-2 ml-3 border-l border-slate-200 pl-3 space-y-1 text-sm ${mobileSubmenu === 'career' ? 'block' : 'hidden'}`}>
                  {careerItems.map(([p,label],i)=>{ const href=withLocale(p); return (
                    <li key={p}>
                      <Button
                        type="button" variant="ghost" fullWidth elevation={0}
                        onClick={() => go(href)}
                        className={mobileItemClasses(i, isActive(p))}
                        role="menuitem"
                        aria-current={isActive(p)?'page':undefined}
                      >{label}</Button>
                    </li>
                  );})}
                </ul>
              </div>
              {/* Contact */}
        {(() => { const href = withLocale('/iletisim'); return (
                <Button
                  type="button"
                  variant="ghost"
                  fullWidth
                  elevation={0}
          onClick={() => go(href)}
                  className={`justify-start text-base font-medium h-12 px-3 rounded-md transition-colors ${isActive('/iletisim') ? 'text-brand-primary font-semibold bg-brand-primary/20' : 'text-slate-800 bg-brand-primary/5 hover:text-brand-primary hover:bg-brand-primary/10'}`}
                  role="menuitem"
                >İletişim</Button>
              ); })()}
              <div className="pt-6 border-t border-slate-200 flex items-center gap-4">
                <SocialIcon url="https://www.linkedin.com/company/apaz-group" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" fgColor="#1F3A52" bgColor="transparent" style={{ height: 36, width: 36 }} className="hover:opacity-80 transition-opacity" />
              </div>
              <div className="text-xs text-slate-500">© 2025 Apaz Group</div>
            </div>
          </div>
        </div>, document.body)
      }
    </header>
  );
}
