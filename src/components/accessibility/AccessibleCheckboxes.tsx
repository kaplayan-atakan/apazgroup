import React, { forwardRef } from 'react';

import { VisuallyHidden } from '../ui/VisuallyHidden';

interface AccessibleCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  label: React.ReactNode;
  description?: string;
  hasError?: boolean;
  errorMessage?: string;
  hideLabel?: boolean;
}

/**
 * AccessibleCheckbox - An accessible checkbox component
 * 
 * Features:
 * - Custom styling with maintained accessibility
 * - Optional description
 * - Error message support
 * - Visual focus indicators
 */
export const AccessibleCheckbox = forwardRef<HTMLInputElement, AccessibleCheckboxProps>(
  function AccessibleCheckbox({
    id,
    label,
    description,
    hasError,
    errorMessage,
    hideLabel = false,
    className = '',
    ...props
  }, ref) {
    const descriptionId = description ? `${id}-description` : undefined;
    const errorId = errorMessage ? `${id}-error` : undefined;
    
    // Determine which ID to use for aria-describedby
    const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;
    
    return (
      <div className={`${className}`}>
        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              ref={ref}
              id={id}
              type="checkbox"
              className={`h-4 w-4 rounded border-slate-300 text-brand-primary focus:ring-2 focus:ring-brand-primary/50 ${
                hasError ? 'border-red-500' : ''
              }`}
              aria-invalid={hasError ? 'true' : undefined}
              aria-describedby={describedBy}
              {...props}
            />
          </div>
          
          <div className="ml-3 text-sm">
            <label 
              htmlFor={id}
              className={`font-medium text-slate-700 ${hasError ? 'text-red-700' : ''}`}
            >
              {hideLabel ? <VisuallyHidden>{label}</VisuallyHidden> : label}
            </label>
            
            {description && (
              <p 
                id={descriptionId}
                className="text-slate-500"
              >
                {description}
              </p>
            )}
            
            {errorMessage && (
              <p
                id={errorId}
                className="mt-1 text-xs text-red-500"
                role="alert"
              >
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

interface AccessibleRadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  label: React.ReactNode;
  description?: string;
  hasError?: boolean;
  errorMessage?: string;
  name: string;
}

/**
 * AccessibleRadio - An accessible radio button component
 */
export const AccessibleRadio = forwardRef<HTMLInputElement, AccessibleRadioProps>(
  function AccessibleRadio({
    id,
    label,
    description,
    hasError,
    errorMessage,
    className = '',
    name,
    ...props
  }, ref) {
    const descriptionId = description ? `${id}-description` : undefined;
    const errorId = errorMessage ? `${id}-error` : undefined;
    
    // Determine which ID to use for aria-describedby
    const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;
    
    return (
      <div className={`${className}`}>
        <div className="flex items-center">
          <input
            ref={ref}
            id={id}
            name={name}
            type="radio"
            className={`h-4 w-4 border-slate-300 text-brand-primary focus:ring-2 focus:ring-brand-primary/50 ${
              hasError ? 'border-red-500' : ''
            }`}
            aria-describedby={describedBy}
            {...props}
          />
          
          <div className="ml-3 text-sm">
            <label 
              htmlFor={id}
              className={`font-medium text-slate-700 ${hasError ? 'text-red-700' : ''}`}
            >
              {label}
            </label>
            
            {description && (
              <p 
                id={descriptionId}
                className="text-slate-500"
              >
                {description}
              </p>
            )}
          </div>
        </div>
        
        {errorMessage && (
          <p
            id={errorId}
            className="mt-1 ml-7 text-xs text-red-500"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

interface AccessibleRadioGroupProps {
  name: string;
  label: string;
  options: Array<{
    value: string;
    label: React.ReactNode;
    description?: string;
    disabled?: boolean;
  }>;
  value?: string;
  onChange?: (value: string) => void;
  hasError?: boolean;
  errorMessage?: string;
  hideLabel?: boolean;
  className?: string;
}

/**
 * AccessibleRadioGroup - A group of radio buttons
 */
export function AccessibleRadioGroup({
  name,
  label,
  options,
  value,
  onChange,
  hasError,
  errorMessage,
  hideLabel = false,
  className = '',
}: AccessibleRadioGroupProps) {
  const groupId = `${name}-group`;
  const errorId = errorMessage ? `${name}-error` : undefined;
  
  return (
    <div
      className={`${className}`}
      role="radiogroup"
      aria-labelledby={groupId}
      aria-invalid={hasError ? 'true' : undefined}
      aria-describedby={errorId}
    >
      <div id={groupId} className="mb-2 text-sm font-medium text-slate-700">
        {hideLabel ? <VisuallyHidden>{label}</VisuallyHidden> : label}
      </div>
      
      <div className="space-y-2">
        {options.map(option => (
          <AccessibleRadio
            key={option.value}
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={e => onChange?.(e.target.value)}
            label={option.label}
            description={option.description}
            disabled={option.disabled}
            hasError={hasError}
          />
        ))}
      </div>
      
      {errorMessage && (
        <p
          id={errorId}
          className="mt-1 text-xs text-red-500"
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}
