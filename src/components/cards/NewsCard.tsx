import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';

interface NewsCardProps {
  image: string;
  date: string;
  title: string;
  excerpt: string;
  link: string;
}

export function NewsCard({ image, date, title, excerpt, link }: NewsCardProps) {
  return (
    <article className="rounded-lg overflow-hidden bg-white shadow-sm ring-1 ring-slate-200 hover:shadow-md transition">
      <div className="relative w-full h-40">
        <Image 
          src={image} 
          alt={title}
          fill 
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <time className="text-xs uppercase tracking-wide text-slate-500">{date}</time>
        <h3 className="mt-1 text-base font-semibold leading-snug">{title}</h3>
        <p className="mt-2 text-sm text-slate-600 line-clamp-3">{excerpt}</p>
        <div className="mt-3">
          <Link href={link as Route} className="text-sm font-medium text-slate-800 hover:text-brand-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow" aria-label={`${title} haberini oku`}>
            Habere git →
          </Link>
        </div>
      </div>
    </article>
  );
}
