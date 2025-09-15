import Image from 'next/image';
import Link from 'next/link';
// Avoid hard-typing Next.js Route here to keep flexibility with localized dynamic paths

interface BrandCardProps {
  logo?: string; // optional
  image: string;
  title: string;
  description: string;
  link: string;
  hideTitle?: boolean; // visually hide the title (keep for a11y)
  emphasizeLogo?: boolean; // enlarge & center logo
  logoScale?: number; // optional scale multiplier for logo (e.g., 1.1)
}

export function BrandCard({ logo, image, title, description, link, hideTitle, emphasizeLogo, logoScale }: BrandCardProps) {
  return (
    <Link
      // @ts-expect-error dynamic localized path
      href={link}
      aria-label={`${title} sayfasına git`}
  className="group block rounded-lg overflow-hidden bg-white shadow-sm ring-1 ring-slate-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow/40 transition-shadow duration-300 ease-out cursor-pointer transform-gpu will-change-transform hover:scale-[1.025] focus:scale-[1.02] p-2"
    >
      <article className="h-full flex flex-col">
        <div className="relative w-full h-48 bg-slate-50 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-contain"
            loading="lazy"
          />
        </div>
        <div className="p-0 flex flex-col flex-1">
          <div
            className={
              emphasizeLogo
                ? 'flex flex-col items-center mb-2'
                : 'flex items-center gap-2 mb-2'
            }
          >
            {logo ? (
              <div
                className={
                  emphasizeLogo
                    ? 'relative w-28 h-28 mb-1'
                    : 'relative w-10 h-10 shrink-0'
                }
                style={logoScale ? { transform: `scale(${logoScale})` } : undefined}
              >
                <Image
                  src={logo}
                  alt={`${title} logo`}
                  fill
                  sizes={emphasizeLogo ? '112px' : '40px'}
                  className="object-contain"
                  priority={emphasizeLogo}
                />
              </div>
            ) : null}
            {hideTitle ? (
              <h3 className="sr-only">{title}</h3>
            ) : (
              <h3 className="text-lg font-semibold tracking-tight text-center">
                {title}
              </h3>
            )}
          </div>
          <p className={`text-sm text-slate-600 ${emphasizeLogo ? 'text-center' : ''}`}>{description}</p>
          <span
            className={
              (emphasizeLogo
                ? 'mx-auto block w-max underline underline-offset-4 text-sm font-medium text-slate-800 group-hover:text-brand-yellow'
                : 'inline-flex items-center text-sm font-medium text-slate-800 group-hover:text-brand-yellow') + ' mt-auto pt-3'
            }
          >
            İncele <span className="ml-1" aria-hidden>→</span>
          </span>
        </div>
      </article>
    </Link>
  );
}
