"use client";

import React from 'react';
import Link from 'next/link';
import type { Route } from 'next';

interface ButtonLinkProps {
  href: Route | URL;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function ButtonLink({ href, children, className = "", onClick }: ButtonLinkProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  
  const handleClick = React.useCallback(() => {
    setIsLoading(true);
    onClick?.();
    
    // Reset loading state after transition or timeout
    setTimeout(() => setIsLoading(false), 2000);
  }, [onClick]);
  
  return (
    <Link 
      href={href} 
      className={`relative ${className} ${isLoading ? 'opacity-80' : ''}`}
      onClick={handleClick}
      prefetch={true}
    >
      {children}
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center bg-black/5 rounded">
          <span className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></span>
        </span>
      )}
    </Link>
  );
}
