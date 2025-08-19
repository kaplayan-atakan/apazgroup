import React, { forwardRef, useState, useRef, useEffect } from 'react';

import { Icon } from '../ui/Icon';
import { useFocusTrap } from '../../hooks/useFocusTrap';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface AccessibleSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  id: string;
  label: React.ReactNode;
  options: SelectOption[];
  description?: string;
  hasError?: boolean;
  errorMessage?: string;
  hideLabel?: boolean;
  onChange?: (value: string) => void;
  className?: string;
}

/**
 * Native Select - An accessible select dropdown using the native HTML select element
 */
export const NativeSelect = forwardRef<HTMLSelectElement, AccessibleSelectProps>(
  function NativeSelect({
    id,
    label,
    options,
    description,
    hasError,
    errorMessage,
    hideLabel = false,
    className = '',
    onChange,
    ...restProps
  }, ref) {
    const descriptionId = description ? `${id}-description` : undefined;
    const errorId = errorMessage ? `${id}-error` : undefined;
    
    // Determine which ID to use for aria-describedby
    const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;
    
    return (
      <div className={`${className}`}>
        <label 
          htmlFor={id}
          className={hideLabel ? 'sr-only' : 'block text-sm font-medium text-slate-700'}
        >
          {label}
        </label>
        
        {description && (
          <p 
            id={descriptionId}
            className="mt-1 text-sm text-slate-500"
          >
            {description}
          </p>
        )}
        
        <div className="relative mt-1">
          <select
            ref={ref}
            id={id}
            className={`block w-full rounded-md border ${
              hasError 
                ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500' 
                : 'border-slate-300 focus:border-brand-primary focus:ring-brand-primary'
            } py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-offset-0 sm:text-sm`}
            aria-invalid={hasError ? 'true' : undefined}
            aria-describedby={describedBy}
            onChange={(e) => onChange?.(e.target.value)}
            {...restProps}
          >
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
            </svg>
          </div>
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
      </div>
    );
  }
);

/**
 * CustomSelect - An accessible custom select dropdown that looks better than the native select
 * but maintains full keyboard navigation and screen reader support
 */
export function CustomSelect({
  id,
  label,
  options,
  value,
  description,
  hasError,
  errorMessage,
  hideLabel = false,
  className = '',
  disabled = false,
  required = false,
  onChange
}: AccessibleSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const optionRefs = useRef<Array<HTMLLIElement | null>>([]);
  
  // Setup focus trap when dropdown is open
  const { trapFocusRef } = useFocusTrap({
    active: isOpen,
    onEscapeKey: () => setIsOpen(false),
  });
  
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = errorMessage ? `${id}-error` : undefined;
  const listboxId = `${id}-listbox`;
  
  // Get currently selected option label
  const selectedOption = options.find(opt => opt.value === selectedValue);
  const selectedLabel = selectedOption?.label || '';
  
  // Sync internal state with external value
  useEffect(() => {
    if (value !== undefined && value !== selectedValue) {
      setSelectedValue(value);
    }
  }, [value, selectedValue]);
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    switch (e.key) {
      case 'Enter':
      case ' ':
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(options.findIndex(opt => opt.value === selectedValue));
          e.preventDefault();
        }
        break;
      case 'Escape':
        if (isOpen) {
          setIsOpen(false);
          buttonRef.current?.focus();
          e.preventDefault();
        }
        break;
      case 'ArrowDown':
        if (isOpen) {
          e.preventDefault();
          setFocusedIndex(prev => {
            const nextIndex = Math.min(prev + 1, options.length - 1);
            optionRefs.current[nextIndex]?.focus();
            return nextIndex;
          });
        } else {
          setIsOpen(true);
          setFocusedIndex(
            selectedValue 
              ? options.findIndex(opt => opt.value === selectedValue) 
              : 0
          );
          e.preventDefault();
        }
        break;
      case 'ArrowUp':
        if (isOpen) {
          e.preventDefault();
          setFocusedIndex(prev => {
            const nextIndex = Math.max(prev - 1, 0);
            optionRefs.current[nextIndex]?.focus();
            return nextIndex;
          });
        }
        break;
      case 'Home':
        if (isOpen) {
          e.preventDefault();
          setFocusedIndex(0);
          optionRefs.current[0]?.focus();
        }
        break;
      case 'End':
        if (isOpen) {
          e.preventDefault();
          const lastIndex = options.length - 1;
          setFocusedIndex(lastIndex);
          optionRefs.current[lastIndex]?.focus();
        }
        break;
      default:
        // Handle typeahead - find option that starts with the pressed key
        if (isOpen && e.key.length === 1) {
          const char = e.key.toLowerCase();
          const matchIndex = options.findIndex(
            opt => opt.label.toLowerCase().startsWith(char) && !opt.disabled
          );
          if (matchIndex !== -1) {
            setFocusedIndex(matchIndex);
            optionRefs.current[matchIndex]?.focus();
          }
        }
        break;
    }
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  // Handle selection
  const handleSelectOption = (option: SelectOption) => {
    if (option.disabled) return;
    
    setSelectedValue(option.value);
    onChange?.(option.value);
    setIsOpen(false);
    buttonRef.current?.focus();
  };
  
  // Create a div to wrap the custom select and pass the trapFocusRef to it
  return (
    <div className={`relative ${className}`}>
      <div ref={containerRef}>
        <label 
          id={`${id}-label`}
          htmlFor={id}
          className={hideLabel ? 'sr-only' : 'block text-sm font-medium text-slate-700 mb-1'}
        >
          {label}{required && <span aria-hidden="true" className="text-red-500 ml-1">*</span>}
        </label>
        
        {description && (
          <p 
            id={descriptionId}
            className="mt-1 mb-1 text-sm text-slate-500"
          >
            {description}
          </p>
        )}
        
        {/* Use button element for better focus management */}
        <button 
          ref={buttonRef}
          type="button"
          id={id}
          aria-controls={listboxId}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-labelledby={`${id}-label`}
          aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
          disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          className={`relative w-full cursor-default rounded-md border ${
            hasError 
              ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500' 
              : 'border-slate-300 bg-white text-slate-900 focus:border-brand-primary focus:ring-brand-primary'
          } py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 sm:text-sm ${
            disabled ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : ''
          }`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
        >
          <span className="block truncate">{selectedLabel}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <Icon
              name={isOpen ? 'chevron-up' : 'chevron-down'}
              className="h-5 w-5 text-slate-400"
              aria-hidden="true"
            />
          </span>
        </button>
        
        {isOpen && (
          <div ref={trapFocusRef as React.RefObject<HTMLDivElement>}>
            <ul
              ref={listboxRef}
              id={listboxId}
              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              tabIndex={-1}
              role="listbox"
              aria-labelledby={`${id}-label`}
              onKeyDown={handleKeyDown}
            >
              {options.map((option, index) => {
                const isSelected = option.value === selectedValue;
                const isDisabled = !!option.disabled;
                
                return (
                  <li
                    key={option.value}
                    ref={el => optionRefs.current[index] = el}
                    className={`${
                      isSelected
                        ? 'bg-brand-primary text-white'
                        : isDisabled
                          ? 'text-slate-400'
                          : 'text-slate-900'
                    } relative cursor-default select-none py-2 pl-8 pr-4 ${
                      isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
                    } ${focusedIndex === index ? 'bg-slate-100' : ''}`}
                    id={`${id}-option-${option.value}`}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={isDisabled}
                    tabIndex={focusedIndex === index ? 0 : -1}
                    onClick={() => !isDisabled && handleSelectOption(option)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        !isDisabled && handleSelectOption(option);
                      }
                    }}
                  >
                    <span className={`block truncate ${isSelected ? 'font-medium' : 'font-normal'}`}>
                      {option.label}
                    </span>
                    {isSelected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
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
    </div>
  );
}
