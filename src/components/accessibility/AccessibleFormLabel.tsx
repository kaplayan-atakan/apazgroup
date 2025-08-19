import React from 'react';

import { VisuallyHidden } from '../ui/VisuallyHidden';

interface FormLabelProps {
  id: string;
  label: string;
  required?: boolean;
  hideLabel?: boolean;
  helpText?: string;
  errorMessage?: string;
  className?: string;
  htmlFor: string;
}

/**
 * AccessibleFormLabel - An accessible form label component
 * 
 * Features:
 * - Support for required fields
 * - Support for visually hidden labels (maintains accessibility)
 * - Support for help text
 * - Support for error messages
 * - Proper ARIA attributes
 */
export function AccessibleFormLabel({
  id,
  label,
  required = false,
  hideLabel = false,
  helpText,
  errorMessage,
  className = '',
  htmlFor,
}: FormLabelProps) {
  const helpTextId = helpText ? `${id}-help` : undefined;
  const errorId = errorMessage ? `${id}-error` : undefined;
  
  const LabelComponent = hideLabel ? VisuallyHidden : 'span';
  
  return (
    <div className={className}>
      <label 
        htmlFor={htmlFor}
        className="flex items-center text-sm font-medium mb-1 text-slate-700"
      >
        <LabelComponent>{label}</LabelComponent>
        {required && (
          <span className="ml-1 text-red-500" aria-hidden="true">*</span>
        )}
        {required && hideLabel && (
          <VisuallyHidden> (required)</VisuallyHidden>
        )}
      </label>
      
      {helpText && !errorMessage && (
        <p 
          id={helpTextId}
          className="text-xs text-slate-500 mt-1"
        >
          {helpText}
        </p>
      )}
      
      {errorMessage && (
        <p 
          id={errorId}
          className="text-xs text-red-500 mt-1"
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}

/**
 * Create props object for connecting form controls with labels
 * 
 * @param id Base ID for the form control
 * @param hasError Whether the form control has an error
 * @param helpText Optional help text
 * @param errorMessage Optional error message
 * @returns Props object with aria-describedby and aria-invalid
 */
export function createAccessibleFieldProps(
  id: string,
  hasError?: boolean,
  helpText?: string,
  errorMessage?: string,
) {
  const helpTextId = helpText ? `${id}-help` : undefined;
  const errorId = errorMessage ? `${id}-error` : undefined;
  
  return {
    id,
    'aria-describedby': errorId || helpTextId || undefined,
    'aria-invalid': hasError ? true : undefined,
  };
}
