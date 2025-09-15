import { ReactNode } from 'react';
import clsx from 'clsx';

interface CareerContentProps {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  /**
   * Size variants adjust base font-size & leading for long policy style text.
   */
  size?: 'sm' | 'base' | 'lg';
  /** Adds subtle gradient backdrop + ring */
  elevated?: boolean;
}

/**
 * CareerContent standardizes paragraph rhythm, max-width, spacing and typography
 * for Kariyer sayfaları. Replaces ad-hoc prose + spacing utilities.
 */
export function CareerContent({
  children,
  as: Tag = 'div',
  className,
  size = 'base',
  elevated = false,
}: CareerContentProps) {
  const sizeClasses = {
    sm: 'text-[13.5px] md:text-[14px] leading-relaxed',
    base: 'text-[14.5px] md:text-[15px] leading-relaxed',
    lg: 'text-[15.5px] md:text-[16px] leading-relaxed'
  }[size];

  return (
    <Tag
      className={clsx(
        'career-content relative max-w-prose space-y-5 tracking-[0.15px] text-slate-700',
        sizeClasses,
        elevated && 'relative rounded-2xl bg-white/70 backdrop-blur-xl ring-1 ring-slate-200/70 px-6 md:px-7 py-7 shadow-[0_4px_18px_-4px_rgba(0,0,0,0.06)]',
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function CareerParagraph({ children }: { children: ReactNode }) {
  return <p className="leading-[1.72] [text-wrap:pretty]">{children}</p>;
}

export function CareerList({ children }: { children: ReactNode }) {
  return (
    <ul className="list-disc pl-5 marker:text-brand-primary space-y-1 leading-[1.62]">{children}</ul>
  );
}

export function CareerListItem({ children }: { children: ReactNode }) {
  return <li className="pl-1">{children}</li>;
}
