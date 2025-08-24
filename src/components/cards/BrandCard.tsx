import Image from 'next/image';
import Link from 'next/link';
// Avoid hard-typing Next.js Route here to keep flexibility with localized dynamic paths

interface BrandCardProps {
  logo?: string; // optional
  image: string;
  title: string;
  description: string;
  link: string;
}

export function BrandCard({ logo, image, title, description, link }: BrandCardProps) {
  return (
    <article className="group rounded-lg overflow-hidden bg-white shadow-sm ring-1 ring-slate-200 hover:shadow-md transition">
    <div className="relative w-full h-48 bg-slate-50">
        <Image 
          src={image} 
          alt={title}
          fill 
          sizes="(min-width: 768px) 33vw, 100vw"
      className="object-contain p-3"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          {logo ? (
            <div className="relative w-10 h-10 shrink-0">
              <Image src={logo} alt={`${title} logo`} fill sizes="40px" className="object-contain" />
            </div>
          ) : null}
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        </div>
        <p className="text-sm text-slate-600 mb-4">{description}</p>
        <Link 
          // @ts-expect-error: dynamic localized path isn't compatible with typedRoutes in this context
          href={link} 
          className="inline-flex items-center text-sm font-medium text-slate-800 hover:text-brand-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
          aria-label={`${title} sayfasına git`}
        >
          İncele
          <span className="ml-1" aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
