import React, { useEffect, useRef } from 'react';

interface FocusTrapProps {
  children: React.ReactNode;
  active?: boolean;
  initialFocus?: boolean;
  restoreFocus?: boolean;
  onEscape?: () => void;
}

/**
 * FocusTrap - Traps focus within a component for improved accessibility
 * 
 * This component is useful for modals, dialogs, and other components that
 * should trap focus within them when active.
 * 
 * Features:
 * - Traps focus within the component
 * - Sets initial focus when opened (optional)
 * - Restores focus when closed (optional)
 * - Calls onEscape callback when Escape key is pressed
 */
export function FocusTrap({
  children,
  active = true,
  initialFocus = true,
  restoreFocus = true,
  onEscape,
}: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<Element | null>(null);

  // Store the previously focused element when the trap becomes active
  useEffect(() => {
    if (active && restoreFocus) {
      previousFocusRef.current = document.activeElement;
    }
  }, [active, restoreFocus]);

  // Set initial focus when the trap becomes active
  useEffect(() => {
    if (active && initialFocus && containerRef.current) {
      // Focus the first focusable element
      const focusableElements = containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      } else {
        // If no focusable elements, make the container focusable
        containerRef.current.tabIndex = -1;
        containerRef.current.focus();
      }
    }
  }, [active, initialFocus]);

  // Restore focus when the trap becomes inactive
  useEffect(() => {
    if (!active && restoreFocus && previousFocusRef.current) {
      (previousFocusRef.current as HTMLElement).focus();
    }
  }, [active, restoreFocus]);

  // Handle tab key to trap focus
  useEffect(() => {
    if (!active || !containerRef.current) return;

    function handleKeyDown(e: KeyboardEvent) {
      // Handle Escape key
      if (e.key === 'Escape' && onEscape) {
        onEscape();
        return;
      }

      // Only handle Tab key
      if (e.key !== 'Tab' || !containerRef.current) return;

      const focusableElements = containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      // If shift+tab and on first element, wrap to last element
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
      // If tab and on last element, wrap to first element
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [active, onEscape]);

  return (
    <div ref={containerRef} className="focus-trap">
      {children}
    </div>
  );
}
