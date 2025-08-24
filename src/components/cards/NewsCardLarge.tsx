import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';

import blurMap from '../../lib/asset-blur-map.json';

type Props = {
  href: Route;
  image: string;
  date: string;
  title: string;
  excerpt: string;
  ctaLabel?: string;
};

export function NewsCardLarge({ href, image, date, title, excerpt, ctaLabel }: Props) {
  return (
    <Link href={href} className="group block rounded-lg border bg-white shadow-sm overflow-hidden hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900">
      <div className="relative w-full aspect-[21/11] bg-slate-100">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover group-hover:scale-[1.02] transition-transform"
          placeholder={blurMap[image as keyof typeof blurMap] ? 'blur' : undefined}
          blurDataURL={(blurMap as Record<string, string>)[image]}
        />
      </div>
      <div className="p-4">
        <div className="text-xs uppercase tracking-wide text-slate-500">{date}</div>
        <h3 className="mt-2 text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-slate-600 text-sm line-clamp-3">{excerpt}</p>
        <div className="mt-3 inline-flex items-center text-sm font-medium text-brand-primary">
          {ctaLabel || 'Devamını oku'}
          <span aria-hidden="true" className="ml-1">→</span>
        </div>
      </div>
    </Link>
  );
}
