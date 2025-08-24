import React, { useState, useCallback } from 'react';
import Link from 'next/link';

type NavLinkProps = {
  href: string; // Accept string; upstream Link will refine
  prefetch?: boolean;
  locale?: string | false;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  children: React.ReactNode;
  className?: string;
  showLoading?: boolean;
};

export const NavLink = ({ children, className = '', showLoading = true, ...props }: NavLinkProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(
  () => {
      if (showLoading) {
        setIsLoading(true);
        // Reset after a timeout in case navigation is very fast
        setTimeout(() => setIsLoading(false), 2000);
      }
    },
    [showLoading]
  );

  return (
    <Link
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- bridging string to Next typed route until route helpers are standardized
      href={props.href as any}
      prefetch={props.prefetch}
      locale={props.locale}
      replace={props.replace}
      scroll={props.scroll}
      shallow={props.shallow}
      passHref={props.passHref}
      className={`${className} ${isLoading ? 'relative opacity-70' : ''}`}
      onClick={handleClick}
    >
      {children}
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></span>
        </span>
      )}
    </Link>
  );
};
