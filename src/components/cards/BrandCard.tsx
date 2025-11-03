import Image from 'next/image';
import Link from 'next/link';
// Avoid hard-typing Next.js Route here to keep flexibility with localized dynamic paths

interface BrandCardProps {
  logo?: string; // optional (string or static path). Future: allow StaticImageData.
  image: string;
  title: string;
  description: string;
  link: string;
  hideTitle?: boolean; // visually hide the title (keep for a11y)
  emphasizeLogo?: boolean; // enlarge & center logo
  logoScale?: number; // optional scale multiplier for logo (e.g., 1.1)
}

export function BrandCard({ logo, image, title, description, link, hideTitle, emphasizeLogo, logoScale }: BrandCardProps) {
  const isRasterLogo = !!logo && /\.(png|jpe?g|webp)$/i.test(logo);
  // Unified container heights to avoid uneven card heights; prevent over-upscaling raster logos
  const logoContainerClass = emphasizeLogo
    ? 'flex items-center justify-center h-28 w-full mb-2'
    : 'flex items-center gap-2 mb-2 h-14';
  const isBursaIshakbey = !!logo && /bursaishakbey/i.test(logo);
  const isBaydoner = !!logo && /baydoner/i.test(logo);
  const logoWrapperClass = emphasizeLogo
    ? isBursaIshakbey
      ? 'relative h-full w-full max-w-[270px] md:max-w-[280px] px-2'
      : isBaydoner
      ? 'relative h-full w-full max-w-[200px] px-2'
      : 'relative h-full w-full max-w-[180px] px-2'
    : 'relative w-10 h-10 shrink-0';
  const computedLogoStyle = logoScale && !emphasizeLogo ? { transform: `scale(${logoScale})` } : undefined;
  const logoAlt = hideTitle ? '' : `${title} logo`;
  const logoAriaHidden = hideTitle ? true : undefined;
  return (
    <Link
      // @ts-expect-error dynamic localized path
      href={link}
      aria-label={`${title} sayfasına git`}
  className="group block rounded-lg overflow-hidden bg-white shadow-sm ring-1 ring-slate-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow/40 transition-shadow duration-300 ease-out cursor-pointer transform-gpu will-change-transform hover:scale-[1.025] focus:scale-[1.02] p-2"
    >
      <article className="h-full flex flex-col">
        {/* Unified media aspect to ensure identical card heights; object-cover for full bleed */}
        <div className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-slate-100 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width:1280px) 400px, (min-width:1024px) 33vw, (min-width:768px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
            loading="lazy"
            priority={false}
          />
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/10 via-transparent to-transparent" aria-hidden="true" />
        </div>
        <div className="p-0 flex flex-col flex-1">
          <div className={logoContainerClass}>
            {logo ? (
              <div className={logoWrapperClass} style={computedLogoStyle}>
                <Image
                  src={logo}
                  alt={logoAlt}
                  aria-hidden={logoAriaHidden}
                  fill
                  sizes={emphasizeLogo ? (isBursaIshakbey ? '240px' : '200px') : '40px'}
                  className={
                    'object-contain transition-transform duration-300 ease-out' +
                    (emphasizeLogo ? ' group-hover:scale-[1.02]' : '') +
                    (isRasterLogo ? ' [image-rendering:auto]' : '')
                  }
                  priority={false}
                  quality={isRasterLogo ? 100 : 90}
                />
              </div>
            ) : null}
            {!hideTitle && (
              <h3 className={emphasizeLogo ? 'sr-only' : 'text-lg font-semibold tracking-tight text-center'}>
                {title}
              </h3>
            )}
            {hideTitle && <h3 className="sr-only">{title}</h3>}
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
