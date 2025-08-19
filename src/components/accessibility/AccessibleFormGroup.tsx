import React from 'react';

interface AccessibleFieldsetProps {
  /** Legend (group title) text */
  legend: string;
  /** Whether the legend is visually hidden (but still accessible to screen readers) */
  hideLegend?: boolean;
  /** Optional description for the fieldset */
  description?: string;
  /** Optional error message when validation fails */
  errorMessage?: string;
  /** Indicates if the fieldset has a validation error */
  hasError?: boolean;
  /** Additional CSS class for styling */
  className?: string;
  /** Child form controls */
  children: React.ReactNode;
}

/**
 * AccessibleFieldset - A component that groups related form controls
 * with proper semantic HTML (fieldset/legend) and accessibility attributes
 */
export function AccessibleFieldset({
  legend,
  hideLegend = false,
  description,
  errorMessage,
  hasError = false,
  className = '',
  children,
}: AccessibleFieldsetProps) {
  const fieldsetId = React.useId();
  const descriptionId = description ? `${fieldsetId}-description` : undefined;
  const errorId = errorMessage ? `${fieldsetId}-error` : undefined;
  
  return (
    <fieldset 
      className={`${className} ${hasError ? 'border-red-300' : 'border-slate-300'}`}
      aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
      aria-invalid={hasError ? 'true' : undefined}
    >
      <legend className={hideLegend ? 'sr-only' : 'text-base font-medium text-slate-700'}>
        {legend}
      </legend>
      
      {description && (
        <p 
          id={descriptionId}
          className="mt-1 text-sm text-slate-500"
        >
          {description}
        </p>
      )}
      
      <div className="mt-2 space-y-4">
        {children}
      </div>
      
      {errorMessage && (
        <p
          id={errorId}
          className="mt-2 text-sm text-red-600"
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </fieldset>
  );
}

interface AccessibleFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  /** Form title (optional, for accessibility) */
  title?: string;
  /** Children components */
  children: React.ReactNode;
  /** Function called on form submission */
  onSubmit?: (e: React.FormEvent) => void;
  /** Additional CSS class for styling */
  className?: string;
  /** Form description */
  description?: string;
  /** Optional aria-label if title is not provided */
  ariaLabel?: string;
}

/**
 * AccessibleForm - A semantic form component with proper ARIA attributes
 */
export function AccessibleForm({
  title,
  children,
  onSubmit,
  className = '',
  description,
  ariaLabel,
  ...props
}: AccessibleFormProps) {
  const formId = React.useId();
  const titleId = title ? `${formId}-title` : undefined;
  const descriptionId = description ? `${formId}-description` : undefined;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };
  
  return (
    <form 
      className={`${className}`}
      onSubmit={handleSubmit}
      aria-labelledby={titleId || undefined}
      aria-describedby={descriptionId || undefined}
      aria-label={!titleId && ariaLabel ? ariaLabel : undefined}
      noValidate
      {...props}
    >
      {title && (
        <h2 id={titleId} className="text-lg font-medium text-slate-700 mb-4">
          {title}
        </h2>
      )}
      
      {description && (
        <p 
          id={descriptionId}
          className="mt-1 mb-4 text-sm text-slate-500"
        >
          {description}
        </p>
      )}
      
      <div className="space-y-6">
        {children}
      </div>
    </form>
  );
}
