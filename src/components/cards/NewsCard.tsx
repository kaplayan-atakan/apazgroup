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
    <article className="group rounded-xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] ring-2 ring-brand-bronze-200/50 hover:ring-brand-secondary/50 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
      <div className="relative w-full h-40">
        <Image 
          src={image} 
          alt={title}
          fill 
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bronze-900/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
      </div>
      <div className="p-4">
        <time className="text-xs uppercase tracking-wide text-brand-accent font-medium">{date}</time>
        <h3 className="mt-1 text-base font-bold leading-snug text-brand-primary">{title}</h3>
        <p className="mt-2 text-sm text-slate-600 line-clamp-3">{excerpt}</p>
        <div className="mt-3">
          <Link href={link as Route} className="text-sm font-semibold text-brand-primary hover:text-brand-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary transition-colors duration-200" aria-label={`${title} haberini oku`}>
            Habere git →
          </Link>
        </div>
      </div>
    </article>
  );
}
