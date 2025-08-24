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
  <article className="group rounded-lg overflow-hidden bg-white shadow-sm ring-1 ring-slate-200 hover:shadow-md transition flex flex-col pb-5">
      <div className="flex items-center gap-3 p-5 pb-3">
        <div className="relative w-12 h-12">
          <Image src={logo} alt={`${title} logo`} fill sizes="48px" className="object-contain" />
        </div>
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      </div>
      <div className="px-5 flex-1 flex flex-col">
        <p className="text-sm text-slate-700 mb-4 leading-relaxed">{description}</p>
        {image && (
          <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden ring-1 ring-slate-200 bg-slate-50 mb-4">
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
        <div className="mt-auto pt-2">
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
