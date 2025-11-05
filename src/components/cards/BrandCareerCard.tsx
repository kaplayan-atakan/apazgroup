import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';

interface BrandCareerCardProps {
  logo: string;
  image: string;
  title: string;
  link: string;
}

export function BrandCareerCard({ logo, image, title, link }: BrandCareerCardProps) {
  return (
    <article className="group rounded-xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] ring-2 ring-brand-bronze-200/50 hover:ring-brand-secondary/50 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bronze-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative w-10 h-10">
            <Image src={logo} alt={`${title} logo`} fill sizes="40px" className="object-contain" />
          </div>
          <h3 className="text-lg font-bold tracking-tight text-brand-primary">{title}</h3>
        </div>
        <Link
          href={link as Route}
          className="inline-flex items-center text-sm font-semibold text-brand-primary hover:text-brand-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary transition-colors duration-200"
          aria-label={`${title} sayfasına git`}
        >
          İncele
          <span className="ml-1" aria-hidden>
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
