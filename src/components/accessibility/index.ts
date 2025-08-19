/**
 * Accessibility Components
 * 
 * This module exports all accessibility-focused components.
 */

export { AccessibleImage } from './AccessibleImage';
export { AccessibleFormLabel, createAccessibleFieldProps } from './AccessibleFormLabel';
export { LiveRegion, useAnnounce } from './LiveRegion';
export { SkipLink } from './SkipLink';
export { FocusTrap } from './FocusTrap';
export { useAnnouncement, Announcer } from './useAnnouncement';

// Form components
export { 
  AccessibleInput, 
  AccessibleTextarea 
} from './AccessibleInputs';
export { 
  AccessibleCheckbox, 
  AccessibleRadio, 
  AccessibleRadioGroup 
} from './AccessibleCheckboxes';
export { 
  NativeSelect,
  CustomSelect 
} from './AccessibleSelect';
export { 
  AccessibleFieldset,
  AccessibleForm 
} from './AccessibleFormGroup';

// Re-export focus management hooks
export { useFocusTrap } from '../../hooks/useFocusTrap';
