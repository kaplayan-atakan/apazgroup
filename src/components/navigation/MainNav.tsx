"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { useState, useRef, useEffect } from 'react';

import { Icon } from '../ui/Icon';
import { t } from '../../lib/i18n-dict';
import type { Locale } from '../../lib/i18n';

export interface NavItem {
  label: string;
  href: string; // locale ön eki olmadan relative (örn: /franchising)
}

interface MainNavProps {
  locale: string;
  items: NavItem[];
  className?: string;
  endSlot?: ReactNode;
}

export function MainNav({ locale, items, className = '', endSlot }: MainNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  function close(focusToggle = true) { setOpen(false); if (focusToggle) toggleRef.current?.focus(); }

  // Close on route change (pathname) for mobile
  useEffect(() => { setOpen(false); }, [pathname]);

  // Outside click / Escape handling
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      }
      if (e.key === 'Tab') {
        // simple focus trap: keep focus within panel when open on mobile viewport
        const panel = panelRef.current;
        if (!panel) return;
        const focusables = panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) {
          e.preventDefault();
            (last as HTMLElement).focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
            (first as HTMLElement).focus();
        }
      }
    }
    function onClick(e: MouseEvent) {
      const panel = panelRef.current;
      const toggle = toggleRef.current;
      if (!panel) return;
      if (panel.contains(e.target as Node) || toggle?.contains(e.target as Node)) return;
      close(false);
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  // Focus first link when opening
  useEffect(() => {
    if (open) setTimeout(() => firstLinkRef.current?.focus(), 0);
  }, [open]);
  return (
    <nav aria-label={t(locale as unknown as Locale, 'nav.mainNavigation', 'Ana Navigasyon')} className={`w-full border-b border-slate-200 bg-white/70 backdrop-blur ${className}`}>
      <div className="mx-auto max-w-6xl px-4 flex items-center gap-4 h-14">
  <div className="font-bold text-brand-primary flex items-center gap-3">
          <button
            type="button"
            ref={toggleRef}
            onClick={() => setOpen(o => !o)}
            className="md:hidden inline-flex items-center justify-center rounded p-2 text-brand-primary hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary"
            aria-label={open ? t(locale as unknown as Locale,'nav.closeMenu','Menüyü kapat') : t(locale as unknown as Locale,'nav.openMenu','Menüyü aç')}
            aria-expanded={open}
            aria-controls="main-menu"
            aria-haspopup="true"
          >
            <span className="sr-only">{open ? t(locale as unknown as Locale,'nav.closeMenu','Menüyü kapat') : t(locale as unknown as Locale,'nav.openMenu','Menüyü aç')}</span>
            <Icon name={open ? 'close' : 'menu'} />
          </button>
            <Link
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- typedRoutes experimental limitation
              href={`/${locale}` as any}
            className="inline-flex items-center gap-2"
              aria-label={t(locale as unknown as Locale,'nav.home','Anasayfaya git')}
          >
            <div className="relative h-6 w-[96px]">
              <Image
                src="/brand/logo--global.png"
                  alt={t(locale as unknown as Locale,'alt.logo','Apaz Group')}
                fill
                sizes="96px"
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>
        <ul className="hidden md:flex items-center gap-4 text-sm font-medium" role="menubar">
          {items.map(item => {
            const full = `/${locale}${item.href === '/' ? '' : item.href}`;
            const active = pathname === full;
            const linkHref = full as unknown as string;
            return (
              <li key={item.href} role="none">
                <Link
                  // @ts-expect-error dynamic route string (typedRoutes experimental)
                  href={linkHref}
                  className={`px-2 py-1 rounded hover:bg-slate-100 focus:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/70 transition-colors ${active ? 'text-brand-primary font-semibold underline decoration-brand-accent/40 underline-offset-4' : 'text-slate-600'}`}
                  onClick={() => close(false)}
                  role="menuitem"
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="ml-auto flex items-center gap-3">{endSlot}</div>
      </div>
      {/* Mobile panel */}
      <div
        id="main-menu"
        ref={panelRef}
        className={`md:hidden border-b border-slate-200 bg-white transition-[max-height,opacity] duration-200 overflow-hidden ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        aria-hidden={!open}
        role="menu"
      >
        <ul className="flex flex-col px-4 py-3 gap-1 text-sm font-medium">
          {items.map(item => {
            const full = `/${locale}${item.href === '/' ? '' : item.href}`;
            const active = pathname === full;
            const linkHref = full as unknown as string;
            return (
              <li key={item.href} role="none">
                <Link
                  // @ts-expect-error dynamic route string (typedRoutes experimental)
                  href={linkHref}
                  className={`block px-3 py-2 rounded hover:bg-slate-100 focus:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/70 transition-colors ${active ? 'text-brand-primary font-semibold underline decoration-brand-accent/40 underline-offset-4' : 'text-slate-600'}`}
                  onClick={() => close(false)}
                  ref={!firstLinkRef.current ? firstLinkRef : undefined}
                  role="menuitem"
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li className="pt-2 border-t border-slate-200 flex">{endSlot}</li>
        </ul>
      </div>
    </nav>
  );
}
