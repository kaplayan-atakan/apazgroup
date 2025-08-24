import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline' | 'soft' | 'danger' | 'success';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  pill?: boolean; // fully rounded visual
  loading?: boolean; // show progress indicator & aria-busy
  elevation?: 0 | 1 | 2; // shadow intensity
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

// Base styles emphasise subtle depth + smooth interaction
const base = [
  'relative inline-flex select-none items-center justify-center font-medium rounded-md',
  'transition-all duration-200 ease-out',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/50 focus-visible:ring-offset-2',
  'disabled:opacity-50 disabled:cursor-not-allowed',
  'active:scale-[0.985]',
  'shadow-sm hover:shadow-md',
  'data-[loading=true]:pointer-events-none'
].join(' ');

// Variants maintain WCAG contrast (primary ~ #1F3A52 on white; outline uses border)
const variants: Record<Variant, string> = {
  primary: [
    'text-white',
    'bg-brand-primary hover:bg-brand-primary-hover',
    'bg-gradient-to-b from-brand-primary to-brand-primary-hover',
  ].join(' '),
  secondary: [
    'text-white',
    'bg-brand-secondary hover:bg-brand-secondary-hover',
    'bg-gradient-to-b from-brand-secondary to-brand-secondary-hover'
  ].join(' '),
  accent: [
    'text-brand-neutral-dark',
    'bg-brand-accent hover:bg-brand-accent-hover',
    'bg-gradient-to-b from-brand-accent to-brand-accent-hover'
  ].join(' '),
  ghost: [
    'text-slate-700 hover:text-slate-900',
    'hover:bg-slate-100 active:bg-slate-200'
  ].join(' '),
  outline: [
    'text-brand-primary',
    'border border-brand-primary/70 hover:border-brand-primary',
    'bg-white hover:bg-brand-primary/5'
  ].join(' '),
  soft: [
    'text-brand-primary',
    'bg-brand-primary/10 hover:bg-brand-primary/15',
    'backdrop-blur-sm'
  ].join(' '),
  danger: [
    'text-white',
    'bg-brand-danger hover:bg-brand-danger/90',
    'bg-gradient-to-b from-brand-danger to-brand-danger'
  ].join(' '),
  success: [
    'text-white',
    'bg-brand-success hover:bg-brand-success/90',
    'bg-gradient-to-b from-brand-success to-brand-success'
  ].join(' ')
};

const sizes = {
  sm: 'h-8 px-3 text-[13px] gap-1',
  md: 'h-10 px-5 text-sm gap-2',
  lg: 'h-12 px-7 text-base gap-2'
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  pill = false,
  loading = false,
  elevation = 1,
  className = '',
  iconLeft,
  iconRight,
  children,
  disabled,
  ...props
}, ref) {
  const widthClass = fullWidth ? 'w-full' : '';
  const radius = pill ? 'rounded-full' : 'rounded-md';
  const isDisabled = disabled || loading;
  const elevationClass = elevation === 0 ? 'shadow-none' : elevation === 1 ? 'shadow-btn-sm hover:shadow-btn-md' : 'shadow-btn-md hover:shadow-btn-lg';
  return (
    <button
      ref={ref}
      data-loading={loading || undefined}
      className={`${base} ${radius} ${variants[variant]} ${sizes[size]} ${widthClass} ${elevationClass} ${className}`}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {/* Loading overlay */}
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg className="h-4 w-4 animate-spin text-current" viewBox="0 0 24 24" role="img" aria-label="Yükleniyor">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z" />
          </svg>
        </span>
      )}
      {iconLeft && !loading && <span className="-ml-0.5 inline-flex" aria-hidden="true">{iconLeft}</span>}
      <span className={`${loading ? 'opacity-0' : 'opacity-100'}`}>{children}</span>
      {iconRight && !loading && <span className="-mr-0.5 inline-flex" aria-hidden="true">{iconRight}</span>}
    </button>
  );
});
