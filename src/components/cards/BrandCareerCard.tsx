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
    <article className="group rounded-lg overflow-hidden bg-white shadow-sm ring-1 ring-slate-200 hover:shadow-md transition">
      <div className="relative w-full h-48">
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
        <div className="flex items-center gap-3 mb-3">
          <div className="relative w-10 h-10">
            <Image src={logo} alt={`${title} logo`} fill sizes="40px" className="object-contain" />
          </div>
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        </div>
        <Link
          href={link as Route}
          className="inline-flex items-center text-sm font-medium text-slate-800 hover:text-brand-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
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
