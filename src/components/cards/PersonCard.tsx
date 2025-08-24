"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import { useState } from 'react';

import blurMap from '../../lib/asset-blur-map.json';

export interface PersonCardProps {
  image: string;
  name: string;
  role?: string;
  description?: string;
  href: string;
}

export function PersonCard({ image, name, role, description, href }: PersonCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    // Reset after timeout to handle fast navigation or errors
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <article className={`group rounded-lg overflow-hidden bg-white shadow-sm ring-1 ring-slate-200 hover:shadow-md transition ${isLoading ? 'opacity-70' : ''}`}>
      <div className="relative w-full aspect-[4/3]">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className={`object-cover transition-opacity ${isLoading ? 'opacity-70' : ''}`}
          placeholder={blurMap[image as keyof typeof blurMap] ? 'blur' : undefined}
          blurDataURL={(blurMap as Record<string, string>)[image]}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold tracking-tight">{name}</h3>
        {role && <div className="text-sm text-slate-600 mt-0.5">{role}</div>}
        {description && <p className="mt-2 text-sm text-slate-600">{description}</p>}
        <Link
          href={href as Route}
          className="mt-4 inline-flex items-center text-sm font-medium text-slate-800 hover:text-brand-yellow"
          aria-label={`${name} profilini gör`}
          onClick={handleClick}
          prefetch={true}
        >
          İncele 
          <span className="ml-1" aria-hidden>
            {isLoading ? (
              <span className="inline-block w-3 h-3 border-t-2 border-r-2 border-slate-600 rounded-full animate-spin"></span>
            ) : '→'}
          </span>
        </Link>
      </div>
    </article>
  );
}
