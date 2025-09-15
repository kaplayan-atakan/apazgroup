import { BrandLogo } from "../brand/BrandLogo";

interface BrandTeaserProps {
  title?: string;
  body?: string;
  showTitles?: boolean;
  id?: string;
}

const BRAND_LOGOS: Array<{ key: string; src: string; alt: string; name: string }> = [
  { key: 'pidebypide', src: '/markalar/pidebypide_logo.png', alt: 'PidebyPide Logo', name: 'PidebyPide' },
  { key: 'baydoner', src: '/brands/baydoner-logo--franchising.png', alt: 'Baydöner Logo', name: 'Baydöner' },
  { key: 'bursaishakbey', src: '/markalar/bursaishakbey_logo.png', alt: 'Bursa İshakbey Logo', name: 'Bursa İshakbey' }
];

export function BrandTeaser({ title, body, showTitles = false, id }: BrandTeaserProps) {
  const sectionId = id || 'brand-teaser';
  const headingId = `${sectionId}-heading`;
  
  return (
    <section 
      className="border rounded p-6 bg-white shadow-sm not-prose"
      id={sectionId}
      aria-labelledby={title ? headingId : undefined}
    >
      <div className="text-xs font-semibold tracking-wide text-brand uppercase mb-2" id={title ? undefined : headingId}>Brand Teaser</div>
      {title && <h2 id={headingId} className="text-xl font-semibold mb-3">{title}</h2>}
      {body && <p className="text-slate-600 text-sm mb-4 max-w-prose">{body}</p>}
      <div 
        className="grid grid-cols-2 sm:grid-cols-3 gap-4"
        role="list"
        aria-label="Markalarımız"
      >
        {BRAND_LOGOS.map(logo => (
          <div 
            key={logo.key} 
            className="flex flex-col items-center gap-2"
            role="listitem"
          >
            <BrandLogo 
              src={logo.src} 
              alt={logo.alt} 
              name={showTitles ? logo.name : undefined} 
            />
            {showTitles && 
              <span 
                className="text-xs text-slate-600 font-medium"
                id={`${logo.key}-label`}
              >
                {logo.name}
              </span>
            }
          </div>
        ))}
      </div>
    </section>
  );
}
