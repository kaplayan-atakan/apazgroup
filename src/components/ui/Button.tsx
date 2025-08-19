import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'accent' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const base = 'inline-flex items-center justify-center font-medium rounded transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

// Color contrast ratios are compliant with WCAG 2.1 AA standards
const variants: Record<Variant, string> = {
  primary: 'bg-brand-primary text-brand-neutral-light hover:bg-brand-primary-hover focus-visible:outline-brand-primary/50',
  secondary: 'bg-brand-secondary text-brand-neutral-light hover:bg-brand-secondary-hover focus-visible:outline-brand-secondary/50',
  accent: 'bg-brand-accent text-brand-neutral-dark hover:bg-brand-accent-hover focus-visible:outline-brand-accent/50',
  ghost: 'text-slate-700 hover:bg-slate-100 focus-visible:outline-slate-500/50'
};

const sizes = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base'
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({ 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  iconLeft,
  iconRight,
  children,
  ...props 
}, ref) {
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button 
      ref={ref} 
      className={`${base} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`} 
      {...props} 
    >
      {iconLeft && <span className="mr-2" aria-hidden="true">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="ml-2" aria-hidden="true">{iconRight}</span>}
    </button>
  );
});
