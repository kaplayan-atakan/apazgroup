import { useState } from 'react';

interface AnnouncementOptions {
  /** The politeness level for the announcement. Default is 'polite'. */
  politeness?: 'assertive' | 'polite';
  /** The time in milliseconds after which the announcement will be cleared. */
  clearAfter?: number;
  /** Whether to append the announcement to any existing announcement. */
  append?: boolean;
}

/**
 * Hook for managing screen reader announcements
 * 
 * @returns An object with functions to manage announcements
 */
export function useAnnouncement() {
  const [announcements, setAnnouncements] = useState<{
    polite: string;
    assertive: string;
  }>({
    polite: '',
    assertive: '',
  });

  // Function to announce a message to screen readers
  const announce = (
    message: string,
    options: AnnouncementOptions = {}
  ) => {
    const {
      politeness = 'polite',
      clearAfter = 5000,
      append = false,
    } = options;

    setAnnouncements((prev) => ({
      ...prev,
      [politeness]: append
        ? `${prev[politeness]} ${message}`
        : message,
    }));

    // Clear the announcement after the specified time
    if (clearAfter > 0) {
      setTimeout(() => {
        setAnnouncements((prev) => ({
          ...prev,
          [politeness]: '',
        }));
      }, clearAfter);
    }
  };

  // Helper functions for common announcement patterns
  const announcePolite = (
    message: string,
    options?: Omit<AnnouncementOptions, 'politeness'>
  ) => announce(message, { ...options, politeness: 'polite' });

  const announceAssertive = (
    message: string,
    options?: Omit<AnnouncementOptions, 'politeness'>
  ) => announce(message, { ...options, politeness: 'assertive' });

  return {
    announcements,
    announce,
    announcePolite,
    announceAssertive,
  };
}

/**
 * Announcement component for screen readers
 */
export function Announcer({ 
  politeAnnouncement,
  assertiveAnnouncement,
}: { 
  politeAnnouncement: string;
  assertiveAnnouncement: string;
}) {
  return (
    <>
      {/* Polite announcements */}
      <div
        aria-live="polite"
        className="sr-only"
        role="status"
      >
        {politeAnnouncement}
      </div>
      
      {/* Assertive announcements */}
      <div
        aria-live="assertive"
        className="sr-only"
        role="alert"
      >
        {assertiveAnnouncement}
      </div>
    </>
  );
}
