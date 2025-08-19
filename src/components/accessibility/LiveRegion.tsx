import React, { useState, useEffect } from 'react';

interface LiveRegionProps {
  message: string;
  ariaLive?: 'polite' | 'assertive' | 'off';
  clearAfter?: number; // milliseconds to clear the message
  className?: string;
  role?: 'status' | 'alert';
}

/**
 * LiveRegion - A component for announcing dynamic content changes to screen readers
 * 
 * This component creates an ARIA live region that will announce content changes
 * to screen reader users. The message can be polite (waits for user idle) or
 * assertive (interrupts user).
 */
export function LiveRegion({
  message,
  ariaLive = 'polite',
  clearAfter,
  className = '',
  role = 'status',
}: LiveRegionProps) {
  const [currentMessage, setCurrentMessage] = useState(message);

  useEffect(() => {
    setCurrentMessage(message);
    
    if (clearAfter && message) {
      const timer = setTimeout(() => {
        setCurrentMessage('');
      }, clearAfter);
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [message, clearAfter]);

  return (
    <div
      className={`sr-only ${className}`}
      aria-live={ariaLive}
      role={role}
    >
      {currentMessage}
    </div>
  );
}

/**
 * Reusable hook to manage announcements to screen readers
 */
export function useAnnounce() {
  const [announcement, setAnnouncement] = useState('');
  const [priority, setPriority] = useState<'polite' | 'assertive'>('polite');
  
  const announce = (message: string, isAssertive = false) => {
    setAnnouncement(message);
    setPriority(isAssertive ? 'assertive' : 'polite');
    
    // Auto clear after 10 seconds
    setTimeout(() => {
      setAnnouncement('');
    }, 10000);
  };
  
  return {
    announcement,
    priority,
    announce,
    announceAssertive: (message: string) => announce(message, true),
    announcePolite: (message: string) => announce(message, false),
  };
}
