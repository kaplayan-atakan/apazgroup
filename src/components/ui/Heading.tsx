import type { ReactNode } from 'react';

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  className?: string;
  id?: string;
  tabIndex?: number;
}

const sizes: Record<number, string> = {
  1: 'text-3xl md:text-4xl font-bold',
  2: 'text-2xl md:text-3xl font-semibold',
  3: 'text-xl md:text-2xl font-semibold',
  4: 'text-lg font-semibold',
  5: 'text-base font-semibold',
  6: 'text-sm font-semibold'
};

export function Heading({ level = 2, children, className = '', id, tabIndex }: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <Tag 
      className={`${sizes[level]} tracking-tight ${className}`}
      id={id}
      tabIndex={tabIndex}
    >
      {children}
    </Tag>
  );
}
