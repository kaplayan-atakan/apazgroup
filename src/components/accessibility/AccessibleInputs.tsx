import React, { forwardRef } from 'react';

interface AccessibleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  hasError?: boolean;
  helpText?: string;
  errorMessage?: string;
}

/**
 * AccessibleInput - An accessible input component
 * 
 * Features:
 * - Built-in accessibility attributes
 * - Support for help text
 * - Support for error messages
 * - Automatic aria-describedby connection
 */
export const AccessibleInput = forwardRef<HTMLInputElement, AccessibleInputProps>(
  function AccessibleInput({
    id,
    hasError,
    helpText,
    errorMessage,
    className = '',
    ...props
  }, ref) {
    const helpTextId = helpText ? `${id}-help` : undefined;
    const errorId = errorMessage ? `${id}-error` : undefined;
    
    // Determine which ID to use for aria-describedby
    const describedBy = [helpTextId, errorId].filter(Boolean).join(' ') || undefined;
    
    return (
      <div className="w-full">
        <input
          ref={ref}
          id={id}
          className={`w-full rounded border px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 ${
            hasError 
              ? 'border-red-500 bg-red-50' 
              : 'border-slate-300 bg-white'
          } ${className}`}
          aria-invalid={hasError ? 'true' : undefined}
          aria-describedby={describedBy}
          {...props}
        />
        
        {helpText && !errorMessage && (
          <p
            id={helpTextId}
            className="mt-1 text-xs text-slate-500"
          >
            {helpText}
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
    );
  }
);

interface AccessibleTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  hasError?: boolean;
  helpText?: string;
  errorMessage?: string;
}

/**
 * AccessibleTextarea - An accessible textarea component
 */
export const AccessibleTextarea = forwardRef<HTMLTextAreaElement, AccessibleTextareaProps>(
  function AccessibleTextarea({
    id,
    hasError,
    helpText,
    errorMessage,
    className = '',
    ...props
  }, ref) {
    const helpTextId = helpText ? `${id}-help` : undefined;
    const errorId = errorMessage ? `${id}-error` : undefined;
    
    // Determine which ID to use for aria-describedby
    const describedBy = [helpTextId, errorId].filter(Boolean).join(' ') || undefined;
    
    return (
      <div className="w-full">
        <textarea
          ref={ref}
          id={id}
          className={`w-full rounded border px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 ${
            hasError 
              ? 'border-red-500 bg-red-50' 
              : 'border-slate-300 bg-white'
          } ${className}`}
          aria-invalid={hasError ? 'true' : undefined}
          aria-describedby={describedBy}
          {...props}
        />
        
        {helpText && !errorMessage && (
          <p
            id={helpTextId}
            className="mt-1 text-xs text-slate-500"
          >
            {helpText}
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
    );
  }
);

interface AccessibleSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  options: Array<{ value: string; label: string }>;
  hasError?: boolean;
  helpText?: string;
  errorMessage?: string;
}

/**
 * AccessibleSelect - An accessible select component
 */
export const AccessibleSelect = forwardRef<HTMLSelectElement, AccessibleSelectProps>(
  function AccessibleSelect({
    id,
    options,
    hasError,
    helpText,
    errorMessage,
    className = '',
    ...props
  }, ref) {
    const helpTextId = helpText ? `${id}-help` : undefined;
    const errorId = errorMessage ? `${id}-error` : undefined;
    
    // Determine which ID to use for aria-describedby
    const describedBy = [helpTextId, errorId].filter(Boolean).join(' ') || undefined;
    
    return (
      <div className="w-full">
        <select
          ref={ref}
          id={id}
          className={`w-full rounded border px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 ${
            hasError 
              ? 'border-red-500 bg-red-50' 
              : 'border-slate-300 bg-white'
          } ${className}`}
          aria-invalid={hasError ? 'true' : undefined}
          aria-describedby={describedBy}
          {...props}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        {helpText && !errorMessage && (
          <p
            id={helpTextId}
            className="mt-1 text-xs text-slate-500"
          >
            {helpText}
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
    );
  }
);
