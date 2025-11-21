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
  className="fixed top-0 left-0 right-0 z-50 border-b-2 border-brand-bronze-300/40 bg-gradient-to-br from-brand-bronze-50/60 via-white/95 via-brand-gold-50/30 to-brand-bronze-50/60 backdrop-blur-md shadow-lg transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-secondary/5 before:via-transparent before:to-brand-accent/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_0%,theme(colors.brand.bronze.100),transparent_60%)] after:opacity-30 after:pointer-events-none"
    role="banner"
  >
  <nav className="container mx-auto px-4 h-16 lg:h-24 flex items-center justify-between relative z-10" aria-label={t(locale, 'nav.mainNavigation', 'Ana Navigasyon')}>
        {/* Logo */}
        {(() => {
          const href = withLocale('/');
          return (
            // @ts-expect-error typedRoutes experimental: dynamic string
            <Link href={href} aria-label={t(locale, 'nav.home', 'Anasayfaya git')} className="flex-shrink-0 group relative">
              <span className="relative block h-14 lg:h-20 w-[180px] lg:w-[260px] transition-all duration-300 group-hover:scale-105">
                {/* Decorative glow effect behind logo */}
                <span className="absolute inset-0 bg-gradient-to-r from-brand-secondary/0 via-brand-accent/20 to-brand-secondary/0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                {/* Dark/Light variants - can be adjusted to separate assets if provided */}
                <Image src="/brand/logo--global.png" alt="Apaz Group" fill sizes="(max-width:1024px) 180px, 260px" className="object-contain block relative z-10 drop-shadow-sm" priority />
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
            className="relative group rounded-xl bg-gradient-to-br from-brand-bronze-50 to-brand-gold-50/50 hover:from-brand-bronze-100 hover:to-brand-gold-100/50 transition-all duration-300 shadow-md hover:shadow-lg ring-1 ring-brand-bronze-200/50 hover:ring-brand-secondary/30"
            onMouseEnter={() => openSection('about')}
            onMouseLeave={closeSection}
          >
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="px-4 py-2.5 h-auto font-semibold text-brand-primary hover:text-brand-secondary focus-visible:ring-brand-secondary/40 text-sm transition-colors duration-300"
              aria-haspopup="true"
              aria-expanded="false"
              elevation={0}
            >
              <span className="flex items-center gap-2">
                <span className="relative">
                  {t(locale, 'nav.about', 'Hakkımızda')}
                  <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-secondary to-brand-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" aria-hidden="true" />
                </span>
                <Icon name="chevron-down" className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </span>
            </Button>
            {/* hover bridge: prevents hover-out between trigger and submenu */}
            <span aria-hidden className="absolute left-0 right-0 top-full h-2" />
            <ul
              data-open={desktopOpen === 'about'}
              className="absolute left-0 top-full z-50 w-72 bg-gradient-to-br from-white/95 to-brand-bronze-50 shadow-2xl rounded-xl py-3 border-2 border-brand-bronze-200/70 invisible opacity-0 translate-y-2 transition-all duration-300 data-[open=true]:visible data-[open=true]:opacity-100 data-[open=true]:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 backdrop-blur-md"
            >
              {aboutItems.map(([p,label],i)=>{const href=withLocale(p);return patternedLi(i,(
                // @ts-expect-error dynamic string
                <Link href={href} onClick={closeSection} data-close="true" aria-current={isActive(p)?'page':undefined} className="block px-4 py-3 text-sm font-semibold text-slate-700 hover:text-brand-secondary hover:bg-gradient-to-r hover:from-brand-bronze-50 hover:to-brand-gold-50/30 transition-all duration-200 rounded-lg mx-1.5 group/link"><span className="flex items-center justify-between">{label}<span className="opacity-0 group-hover/link:opacity-100 transition-opacity" aria-hidden="true">→</span></span></Link>
              ));})}
            </ul>
          </li>
          {/* Brands dropdown */}
          <li
            className="relative group rounded-xl bg-gradient-to-br from-brand-gold-50 to-brand-accent/10 hover:from-brand-gold-100 hover:to-brand-accent/20 transition-all duration-300 shadow-md hover:shadow-lg ring-1 ring-brand-gold-200/50 hover:ring-brand-accent/40"
            onMouseEnter={() => openSection('brands')}
            onMouseLeave={closeSection}
          >
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="px-4 py-2.5 h-auto font-semibold text-brand-primary hover:text-brand-accent focus-visible:ring-brand-accent/40 text-sm transition-colors duration-300"
              aria-haspopup="true"
              aria-expanded="false"
              elevation={0}
            >
              <span className="flex items-center gap-2">
                <span className="relative">
                  Markalarımız
                  <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-accent to-brand-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" aria-hidden="true" />
                </span>
                <Icon name="chevron-down" className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </span>
            </Button>
            <span aria-hidden className="absolute left-0 right-0 top-full h-2" />
            <ul
              data-open={desktopOpen === 'brands'}
              className="absolute left-0 top-full z-50 w-72 bg-gradient-to-br from-white/95 to-brand-gold-50 shadow-2xl rounded-xl py-3 border-2 border-brand-gold-200/70 invisible opacity-0 translate-y-2 transition-all duration-300 data-[open=true]:visible data-[open=true]:opacity-100 data-[open=true]:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 backdrop-blur-md"
            >
              {brandItems.map(([p,label],i)=>{const href=withLocale(p);return patternedLi(i,(
                // @ts-expect-error dynamic string
                <Link href={href} onClick={closeSection} data-close="true" aria-current={isActive(p)?'page':undefined} className="block px-4 py-3 text-sm font-semibold text-slate-700 hover:text-brand-accent hover:bg-gradient-to-r hover:from-brand-gold-50 hover:to-brand-accent/20 transition-all duration-200 rounded-lg mx-1.5 group/link"><span className="flex items-center justify-between">{label}<span className="opacity-0 group-hover/link:opacity-100 transition-opacity" aria-hidden="true">→</span></span></Link>
              ));})}
            </ul>
          </li>
          <li>
            {(() => { const href = withLocale('/franchising'); return (// @ts-expect-error typedRoutes dynamic string
              <Link href={href} className={`inline-flex items-center h-11 px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg text-sm relative overflow-hidden group ${isActive('/franchising') ? 'text-white bg-gradient-to-r from-brand-secondary via-brand-accent to-brand-secondary ring-2 ring-brand-accent/50 shadow-brand-accent/25' : 'bg-gradient-to-br from-brand-bronze-50 to-brand-gold-50/50 hover:from-brand-bronze-100 hover:to-brand-gold-100/50 text-brand-primary hover:text-brand-secondary ring-1 ring-brand-bronze-200/50 hover:ring-brand-secondary/30'}`}>
                <span className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ${isActive('/franchising') ? '' : 'opacity-0'}`} aria-hidden="true" />
                <span className="relative">Franchising</span>
              </Link>
            ); })()}
          </li>
          {/* Career dropdown */}
          <li
            className="relative group rounded-xl bg-gradient-to-br from-brand-bronze-50 to-brand-gold-50/50 hover:from-brand-bronze-100 hover:to-brand-gold-100/50 transition-all duration-300 shadow-md hover:shadow-lg ring-1 ring-brand-bronze-200/50 hover:ring-brand-secondary/30"
            onMouseEnter={() => openSection('career')}
            onMouseLeave={closeSection}
          >
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="px-4 py-2.5 h-auto font-semibold text-brand-primary hover:text-brand-secondary focus-visible:ring-brand-secondary/40 text-sm transition-colors duration-300"
              aria-haspopup="true"
              aria-expanded="false"
              elevation={0}
            >
              <span className="flex items-center gap-2">
                <span className="relative">
                  Kariyer
                  <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-secondary to-brand-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" aria-hidden="true" />
                </span>
                <Icon name="chevron-down" className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </span>
            </Button>
            <span aria-hidden className="absolute left-0 right-0 top-full h-2" />
            <ul
              data-open={desktopOpen === 'career'}
              className="absolute left-0 top-full z-50 bg-gradient-to-br from-white/95 to-brand-bronze-50 shadow-2xl rounded-xl py-3 border-2 border-brand-bronze-200/70 invisible opacity-0 translate-y-2 transition-all duration-300 data-[open=true]:visible data-[open=true]:opacity-100 data-[open=true]:translate-y-0 w-80 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 backdrop-blur-md"
            >
              {careerItems.map(([p,label],i)=>{const href=withLocale(p);return patternedLi(i,(
                // @ts-expect-error dynamic string
                <Link href={href} onClick={closeSection} data-close="true" aria-current={isActive(p)?'page':undefined} className="block px-4 py-3 text-sm font-semibold text-slate-700 hover:text-brand-secondary hover:bg-gradient-to-r hover:from-brand-bronze-50 hover:to-brand-gold-50/30 transition-all duration-200 rounded-lg mx-1.5 group/link"><span className="flex items-center justify-between">{label}<span className="opacity-0 group-hover/link:opacity-100 transition-opacity" aria-hidden="true">→</span></span></Link>
              ));})}
            </ul>
          </li>
          <li>
            {(() => { const href = withLocale('/iletisim'); return (// @ts-expect-error typedRoutes dynamic string
              <Link href={href} className={`inline-flex items-center h-11 px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg text-sm relative overflow-hidden group ${isActive('/iletisim') ? 'text-white bg-gradient-to-r from-brand-secondary via-brand-accent to-brand-secondary ring-2 ring-brand-accent/50 shadow-brand-accent/25' : 'bg-gradient-to-br from-brand-gold-50 to-brand-accent/10 hover:from-brand-gold-100 hover:to-brand-accent/20 text-brand-primary hover:text-brand-accent ring-1 ring-brand-gold-200/50 hover:ring-brand-accent/40'}`}>
                <span className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ${isActive('/iletisim') ? '' : 'opacity-0'}`} aria-hidden="true" />
                <span className="relative">İletişim</span>
              </Link>
            ); })()}
          </li>
        </ul>

        {/* Right side: socials + lang switcher + mobile toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-3">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary to-brand-accent rounded-full blur-md opacity-0 group-hover:opacity-75 transition-opacity duration-500" aria-hidden="true" />
              <SocialIcon url="https://www.linkedin.com/company/apaz-group" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" fgColor="#1F3A52" bgColor="transparent" style={{ height: 44, width: 44 }} className="relative hover:opacity-70 transition-all duration-300 hover:scale-110 drop-shadow-md" />
            </div>
          </div>
          {/* LangSwitcher temporarily hidden */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="lg:hidden h-12 w-12 p-0 rounded-xl bg-gradient-to-br from-brand-bronze-50 via-brand-gold-50 to-brand-bronze-50 hover:from-brand-bronze-100 hover:to-brand-gold-100 focus-visible:ring-brand-secondary/40 shadow-md hover:shadow-lg transition-all duration-300 ring-1 ring-brand-bronze-200/50 hover:ring-brand-secondary/30 group"
            onClick={() => setMobileOpen(true)}
            aria-label={t(locale, 'nav.openMenu', 'Menüyü Aç')}
            aria-controls="mobile-menu"
            aria-expanded={mobileOpen}
            pill
            elevation={0}
          >
            <Icon name="menu" className="transition-transform duration-300 group-hover:scale-110" />
          </Button>
        </div>
      </nav>

      {/* Mobile hamburger side-drawer (portal) */}
      {mobileOpen && typeof window !== 'undefined' && createPortal(
        <div id="mobile-menu" className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label={t(locale,'nav.mobileMenu','Mobil menü')}>
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <div ref={drawerRef} className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-gradient-to-br from-white via-brand-bronze-50/20 to-white shadow-2xl flex flex-col overflow-y-auto animate-slide-in-x focus:outline-none border-l border-brand-bronze-200" tabIndex={-1}>
            <div className="flex items-center justify-between px-5 h-16 border-b border-brand-bronze-200/50 bg-gradient-to-r from-white to-brand-bronze-50/30" role="none">
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
                className="h-11 w-11 p-0 rounded-full bg-gradient-to-br from-brand-bronze-50 to-brand-gold-50 hover:from-brand-bronze-100 hover:to-brand-gold-100 focus-visible:ring-brand-secondary/40 shadow-sm hover:shadow-md transition-all duration-300"
                onClick={() => setMobileOpen(false)}
                aria-label={t(locale, 'nav.closeMenu', 'Menüyü Kapat')}
                pill
                elevation={0}
              >
                <Icon name="close" />
              </Button>
            </div>
            <div className="px-4 py-6 space-y-3" role="menu" aria-orientation="vertical">
              <div role="none">
                <Button
                  ref={firstFocusableRef}
                  type="button"
                  variant="ghost"
                  fullWidth
                  className="relative flex items-center justify-center text-base font-semibold text-brand-primary h-12 px-4 rounded-lg bg-gradient-to-r from-brand-bronze-50 to-brand-gold-50/50 hover:from-brand-bronze-100 hover:to-brand-gold-100/50 transition-all duration-300 shadow-sm hover:shadow-md"
                  onClick={() => setMobileSubmenu(mobileSubmenu === 'about' ? null : 'about')}
                  aria-expanded={mobileSubmenu === 'about'}
                  aria-controls="m-about"
                  aria-haspopup="true"
                  elevation={0}
                >
                  <span className="pointer-events-none">Hakkımızda</span>
                  <span className="absolute right-4 inline-flex" aria-hidden="true">
                    <Icon name="chevron-down" className={`transition-transform duration-300 ${mobileSubmenu === 'about' ? 'rotate-180' : ''}`} />
                  </span>
                </Button>
                <ul id="m-about" className={`mt-3 ml-4 border-l-2 border-brand-bronze-200 pl-4 space-y-2 text-sm ${mobileSubmenu === 'about' ? 'block' : 'hidden'}`}>
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
                  className="relative flex items-center justify-center text-base font-semibold text-brand-primary h-12 px-4 rounded-lg bg-gradient-to-r from-brand-gold-50 to-brand-accent/10 hover:from-brand-gold-100 hover:to-brand-accent/20 transition-all duration-300 shadow-sm hover:shadow-md"
                  onClick={() => setMobileSubmenu(mobileSubmenu === 'brands' ? null : 'brands')}
                  aria-expanded={mobileSubmenu === 'brands'}
                  aria-controls="m-brands"
                  aria-haspopup="true"
                  elevation={0}
                >
                  <span className="pointer-events-none">Markalarımız</span>
                  <span className="absolute right-4 inline-flex" aria-hidden="true">
                    <Icon name="chevron-down" className={`transition-transform duration-300 ${mobileSubmenu === 'brands' ? 'rotate-180' : ''}`} />
                  </span>
                </Button>
                <ul id="m-brands" className={`mt-3 ml-4 border-l-2 border-brand-gold-200 pl-4 space-y-2 text-sm ${mobileSubmenu === 'brands' ? 'block' : 'hidden'}`}>
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
                  className={`justify-center text-base font-semibold h-12 px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md ${isActive('/franchising') ? 'text-white bg-gradient-to-r from-brand-secondary to-brand-accent' : 'text-brand-primary bg-gradient-to-r from-brand-bronze-50 to-brand-gold-50/50 hover:from-brand-bronze-100 hover:to-brand-gold-100/50'}`}
                  role="menuitem"
                >Franchising</Button>
              ); })()}
              {/* Career */}
              <div role="none">
                <Button
                  type="button"
                  variant="ghost"
                  fullWidth
                  className="relative flex items-center justify-center text-base font-semibold text-brand-primary h-12 px-4 rounded-lg bg-gradient-to-r from-brand-bronze-50 to-brand-gold-50/50 hover:from-brand-bronze-100 hover:to-brand-gold-100/50 transition-all duration-300 shadow-sm hover:shadow-md"
                  onClick={() => setMobileSubmenu(mobileSubmenu === 'career' ? null : 'career')}
                  aria-expanded={mobileSubmenu === 'career'}
                  aria-controls="m-career"
                  aria-haspopup="true"
                  elevation={0}
                >
                  <span className="pointer-events-none">Kariyer</span>
                  <span className="absolute right-4 inline-flex" aria-hidden="true">
                    <Icon name="chevron-down" className={`transition-transform duration-300 ${mobileSubmenu === 'career' ? 'rotate-180' : ''}`} />
                  </span>
                </Button>
                <ul id="m-career" className={`mt-3 ml-4 border-l-2 border-brand-bronze-200 pl-4 space-y-2 text-sm ${mobileSubmenu === 'career' ? 'block' : 'hidden'}`}>
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
                  className={`justify-center text-base font-semibold h-12 px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md ${isActive('/iletisim') ? 'text-white bg-gradient-to-r from-brand-secondary to-brand-accent' : 'text-brand-primary bg-gradient-to-r from-brand-gold-50 to-brand-accent/10 hover:from-brand-gold-100 hover:to-brand-accent/20'}`}
                  role="menuitem"
                >İletişim</Button>
              ); })()}
              <div className="pt-6 border-t border-brand-bronze-200 flex items-center gap-4">
                <SocialIcon url="https://www.linkedin.com/company/apaz-group" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" fgColor="#1F3A52" bgColor="transparent" style={{ height: 40, width: 40 }} className="hover:opacity-70 transition-all duration-300 hover:scale-110" />
              </div>
              <div className="text-xs text-brand-primary/60 font-medium">© 2025 Apaz Group</div>
            </div>
          </div>
        </div>, document.body)
      }
    </header>
  );
}
