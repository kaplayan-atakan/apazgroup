import Image from 'next/image';

interface FranchiseCardProps {
  logo: string;
  title: string;
  description: string;
  link: string;
  image?: string; // optional wide brand image / photo
}

export function FranchiseCard({ logo, title, description, link, image }: FranchiseCardProps) {
  const isBursaIshakbey = /bursa\s*ishakbey/i.test(title) || /bursaishakbey/i.test(logo);
  const isBaydoner = /bayd[öo]ner/i.test(title) || /baydoner/i.test(logo);
  const logoWrapperClass = `relative h-full w-full ${isBursaIshakbey ? 'max-w-[270px] md:max-w-[280px]' : isBaydoner ? 'max-w-[200px]' : 'max-w-[180px]'} px-2`;
  return (
    <a
      href={link}
      target={link.startsWith('http') ? '_blank' : undefined}
      rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
      aria-label={`${title} franchising sayfasına git`}
      className="group block rounded-lg overflow-hidden bg-white shadow-sm ring-1 ring-slate-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow/40 transition-shadow duration-300 ease-out transform-gpu will-change-transform hover:scale-[1.025] focus:scale-[1.02] p-2"
    >
      <article className="h-full flex flex-col">
        {/* Top media (mirrors BrandCard) */}
        {image && (
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
        )}

        {/* Logo + content */}
        <div className="p-0 flex flex-col flex-1">
          {/* Emphasized centered logo area (like BrandCard emphasizeLogo) */}
          <div className="flex items-center justify-center h-28 w-full mb-2">
            <div className={logoWrapperClass}>
              <Image
                src={logo}
                alt={`${title} logo`}
                fill
                sizes={isBursaIshakbey ? '240px' : '200px'}
                className="object-contain transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                priority={false}
              />
            </div>
          </div>

          <p className="text-sm text-slate-600 text-center">{description}</p>

          {/* Centered visual button; whole card is clickable */}
          <div className="pt-3 mt-auto flex justify-center">
            <span className="inline-flex items-center justify-center rounded bg-black text-white px-4 py-2 text-sm group-hover:bg-black/90">
              Başvur
            </span>
          </div>
        </div>
      </article>
    </a>
  );
}
