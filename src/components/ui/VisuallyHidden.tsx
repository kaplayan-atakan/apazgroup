import type { ReactNode } from 'react';

interface VHProps { children: ReactNode; }

export function VisuallyHidden({ children }: VHProps) {
  return (
    <span className="sr-only">{children}</span>
  );
}
