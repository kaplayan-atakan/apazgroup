"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { Locale } from '../../lib/i18n';
import { locales } from '../../lib/i18n';

interface LangSwitcherProps { current: Locale }

export function LangSwitcher({ current }: LangSwitcherProps) {
  const pathname = usePathname();
  // Strip current locale prefix
  const rest = pathname.replace(/^\/(tr|en)/, '') || '/';
  return (
    <nav className="flex gap-1 items-center" aria-label="Language switcher">
      <ul className="flex gap-1">
        {locales.map(l => {
            const target = `/${l}${rest === '/' ? '' : rest}`;
            const active = l === current;
            const label = l === 'tr' ? 'Türkçe' : 'English';
            // typedRoutes (experimental) bu dinamik kombinasyonu henüz doğrulayamıyor.
            return (
              <li key={l}>
                <Link
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- typedRoutes experimental limitation
                  href={target as any}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/70 ${active ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  aria-label={`Switch to ${label}`}
                  aria-current={active ? 'page' : undefined}
                  lang={l}
                >
                  {l.toUpperCase()}
                </Link>
              </li>
            );
        })}
      </ul>
    </nav>
  );
}

// End of LangSwitcher
