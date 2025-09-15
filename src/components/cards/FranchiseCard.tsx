import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';

interface FranchiseCardProps {
  logo: string;
  title: string;
  description: string;
  link: string;
  image?: string; // optional wide brand image / photo
}

export function FranchiseCard({ logo, title, description, link, image }: FranchiseCardProps) {
  return (
  <article className="group h-full rounded-lg overflow-hidden bg-white shadow-sm ring-1 ring-slate-200 hover:shadow-md transition flex flex-col pb-5">
      {/* Centered logo; title hidden visually */}
      <div className="p-5 pb-3">
        <div
          className={`mx-auto relative w-28 h-28 md:w-32 md:h-32 ${
            title.toLowerCase().includes('bursa') || title.toLowerCase().includes('ishakbey')
              ? 'scale-[1.2]' // 1/5 (20%) enlargement
              : ''
          }`}
        >
          <Image
            src={logo}
            alt={`${title} logo`}
            fill
            sizes="(max-width:768px) 80px, 96px"
            className="object-contain"
            priority={false}
          />
        </div>
        {/* Keep title for accessibility if needed, but hide visually */}
        <h3 className="sr-only">{title}</h3>
      </div>
      {/* Content column: description grows; image is anchored near bottom for alignment across cards */}
      <div className="px-5 flex-1 flex flex-col">
        <p className="text-sm text-slate-700 leading-relaxed">{description}</p>
        {/* spacer pushes media+cta to bottom so images align across uneven text lengths */}
        <div className="mt-auto" />
        {image && (
          <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden ring-1 ring-slate-200 bg-slate-50 mt-4">
            <Image
              src={image}
              alt={`${title} görseli`}
              fill
              sizes="(max-width:768px) 100vw, 33vw"
              className="object-cover group-hover:scale-[1.02] transition-transform"
              priority={false}
            />
          </div>
        )}
        <div className="pt-3">
          <Link
            href={link as Route}
            target={link.startsWith('http') ? '_blank' : undefined}
            rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center justify-center rounded bg-black text-white px-4 py-2 text-sm hover:bg-black/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            aria-label={`${title} franchising sayfasına git`}
          >
            Başvur
          </Link>
        </div>
      </div>
    </article>
  );
}
