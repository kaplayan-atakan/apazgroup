import Image from 'next/image';

interface BrandLogoProps {
  src: string;
  alt: string;
  name?: string;
}

export function BrandLogo({ src, alt, name }: BrandLogoProps) {
  return (
    <figure className="flex items-center justify-center p-3 rounded bg-white shadow-sm ring-1 ring-slate-200">
      <div className="relative h-16 w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 640px) 200px, 40vw"
          loading="lazy"
          className="object-contain grayscale hover:grayscale-0 transition duration-200"
        />
      </div>
      {name && <figcaption className="sr-only">{name}</figcaption>}
    </figure>
  );
}
