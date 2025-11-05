import Link from 'next/link';
import type { Route } from 'next';

import { Icon } from '../ui/Icon';

type LinkCardProps = {
  href: Route;
  title: string;
  description: string;
  icon: 'briefcase' | 'document-text';
};

export function LinkCard({ href, title, description, icon }: LinkCardProps) {
  return (
    <Link href={href} className="block rounded-xl bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] ring-2 ring-brand-bronze-200/50 hover:ring-brand-secondary/50 p-6 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-brand-secondary/40 transition-all duration-300 transform hover:scale-[1.02]">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-md">
        <Icon name={icon} size={22} aria-hidden="true" />
      </div>
      <h4 className="mt-4 text-lg font-bold text-brand-primary">{title}</h4>
      <p className="mt-2 text-slate-600 text-sm leading-relaxed">{description}</p>
    </Link>
  );
}
