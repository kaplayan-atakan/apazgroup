import React from 'react';

interface SkipLinkProps {
  href: string;
  text?: string;
  className?: string;
}

/**
 * SkipLink - A component for keyboard users to skip navigation
 * 
 * This component creates an off-screen link that becomes visible only when focused.
 * It helps keyboard users skip navigation and go directly to main content.
 */
export function SkipLink({
  href = '#main',
  text = 'İçeriğe geç',
  className = '',
}: SkipLinkProps) {
  return (
    <a 
      href={href}
      className={`sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:text-black focus:p-2 focus:rounded focus:z-50 ${className}`}
    >
      {text}
    </a>
  );
}
