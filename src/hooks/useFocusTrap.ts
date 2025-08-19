import { useRef, useEffect } from 'react';

interface FocusTrapOptions {
  active?: boolean;
  onEscapeKey?: () => void;
  focusFirst?: boolean;
}

/**
 * Hook to trap focus within a container element
 * 
 * @param options Configuration options
 * @param options.active Whether the focus trap is active (default: true)
 * @param options.onEscapeKey Callback when Escape key is pressed
 * @param options.focusFirst Whether to focus the first focusable element (default: false)
 * @returns Object containing a ref to attach to the container element
 */
export function useFocusTrap({
  active = true,
  onEscapeKey,
  focusFirst = false,
}: FocusTrapOptions = {}) {
  const trapFocusRef = useRef<HTMLElement | null>(null);
  
  // Handle focus trap
  useEffect(() => {
    if (!active || !trapFocusRef.current) return;
    
    const trapElement = trapFocusRef.current;
    
    // Get all focusable elements
    const focusableElements = Array.from(trapElement.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )).filter(el => !el.hasAttribute('disabled') && el.getAttribute('tabindex') !== '-1');
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // Focus first element if enabled
    if (focusFirst && firstElement) {
      requestAnimationFrame(() => {
        firstElement.focus();
      });
    }
    
    // Store previously focused element
    const previouslyFocused = document.activeElement as HTMLElement;
    
    // Handle keydown events
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle Escape key
      if (e.key === 'Escape' && onEscapeKey) {
        onEscapeKey();
        return;
      }
      
      // Handle Tab key for cycling focus
      if (e.key === 'Tab') {
        // If Shift+Tab pressed on first element, move focus to last element
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } 
        // If Tab pressed on last element, move focus to first element
        else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };
    
    // Add keydown event listener
    trapElement.addEventListener('keydown', handleKeyDown);
    
    return () => {
      // Remove event listener
      trapElement.removeEventListener('keydown', handleKeyDown);
      
      // Restore focus when trap is deactivated
      if (previouslyFocused && document.body.contains(previouslyFocused)) {
        previouslyFocused.focus();
      }
    };
  }, [active, onEscapeKey, focusFirst]);
  
  return { trapFocusRef };
}
