import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  id?: string;
  role?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
}

export function Container({ 
  children, 
  className = '', 
  as: Tag = 'div',
  id,
  role,
  ariaLabel,
  ariaLabelledby
}: ContainerProps) {
  return (
    <Tag 
      className={`mx-auto max-w-6xl px-4 ${className}`}
      id={id}
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
    >
      {children}
    </Tag>
  );
}
