"use client";

import { useEffect, useState } from 'react';

import { t } from '../../lib/i18n-dict';
import type { Locale } from '../../lib/i18n';

import { Icon } from './Icon';

export function BackToTop({ locale }: { locale?: Locale }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      type="button"
      aria-label={t((locale || 'tr') as Locale,'alt.backToTop','Back to top')}
      aria-hidden={!visible}
      className={`fixed bottom-4 right-4 z-40 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg ring-1 ring-black/5 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand transition-opacity ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      tabIndex={visible ? 0 : -1}
    >
      <span className="sr-only">{t((locale || 'tr') as Locale,'backToTop','Back to top')}</span>
      <Icon name="arrow-up" />
    </button>
  );
}
