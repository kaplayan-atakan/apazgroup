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
    <Link href={href} className="block rounded-lg border bg-white shadow-sm p-6 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-slate-900 text-white">
        <Icon name={icon} size={22} aria-hidden="true" />
      </div>
      <h4 className="mt-4 text-lg font-semibold">{title}</h4>
      <p className="mt-2 text-slate-600 text-sm leading-relaxed">{description}</p>
    </Link>
  );
}
