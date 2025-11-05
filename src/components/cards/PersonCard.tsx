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
    <article className={`group rounded-xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] ring-2 ring-brand-bronze-200/50 hover:ring-brand-secondary/50 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] ${isLoading ? 'opacity-70' : ''}`}>
  {/* Increased height (4/3 -> 16/15) to reveal ~25% more of portrait without changing width */}
  <div className="relative w-full aspect-[16/15]">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className={`object-cover transition-all duration-500 group-hover:scale-[1.05] ${isLoading ? 'opacity-70' : ''}`}
          placeholder={blurMap[image as keyof typeof blurMap] ? 'blur' : undefined}
          blurDataURL={(blurMap as Record<string, string>)[image]}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bronze-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold tracking-tight leading-tight text-brand-primary">{name}</h3>
        {role && (
          <div className="mt-1 text-sm font-semibold text-brand-secondary tracking-tight">
            {role}
          </div>
        )}
        {description && <p className="mt-2 text-sm text-slate-600">{description}</p>}
        <Link
          href={href as Route}
          className="mt-4 inline-flex items-center text-sm font-semibold text-brand-primary hover:text-brand-secondary transition-colors duration-200"
          aria-label={`${name} profilini gör`}
          onClick={handleClick}
          prefetch={true}
        >
          İncele 
          <span className="ml-1" aria-hidden>
            {isLoading ? (
              <span className="inline-block w-3 h-3 border-t-2 border-r-2 border-brand-secondary rounded-full animate-spin"></span>
            ) : '→'}
          </span>
        </Link>
      </div>
    </article>
  );
}
