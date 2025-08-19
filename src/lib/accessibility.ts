/**
 * Utility functions for accessibility features across the application
 */

/**
 * Calculates the relative luminance of a color.
 * Formula from WCAG 2.0: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * 
 * @param hexColor A hexadecimal color code (e.g. "#ffffff")
 * @returns The relative luminance value between 0 and 1
 */
export function getLuminance(hexColor: string): number {
  // Remove the # if present
  const color = hexColor.charAt(0) === '#' ? hexColor.substring(1) : hexColor;
  
  // Convert to RGB
  const r = parseInt(color.substr(0, 2), 16) / 255;
  const g = parseInt(color.substr(2, 2), 16) / 255;
  const b = parseInt(color.substr(4, 2), 16) / 255;
  
  // Calculate RGB values
  const R = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const G = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const B = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  
  // Calculate luminance
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * Calculates the contrast ratio between two colors.
 * Formula from WCAG 2.0: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * 
 * @param color1 First color in hex format
 * @param color2 Second color in hex format
 * @returns Contrast ratio between 1 and 21
 */
export function getContrastRatio(color1: string, color2: string): number {
  const luminance1 = getLuminance(color1);
  const luminance2 = getLuminance(color2);
  
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Checks if a color combination meets WCAG 2.1 AA standards for normal text.
 * 
 * @param foreground Foreground color in hex format
 * @param background Background color in hex format
 * @returns Boolean indicating if the contrast meets AA standards (4.5:1)
 */
export function meetsWCAGAA(foreground: string, background: string): boolean {
  return getContrastRatio(foreground, background) >= 4.5;
}

/**
 * Checks if a color combination meets WCAG 2.1 AA standards for large text.
 * Large text is defined as 14pt (18.6px) and bold or 18pt (24px) or larger.
 * 
 * @param foreground Foreground color in hex format
 * @param background Background color in hex format
 * @returns Boolean indicating if the contrast meets AA standards for large text (3:1)
 */
export function meetsWCAGAALargeText(foreground: string, background: string): boolean {
  return getContrastRatio(foreground, background) >= 3;
}

/**
 * Checks if a color combination meets WCAG 2.1 AAA standards for normal text.
 * 
 * @param foreground Foreground color in hex format
 * @param background Background color in hex format
 * @returns Boolean indicating if the contrast meets AAA standards (7:1)
 */
export function meetsWCAGAAA(foreground: string, background: string): boolean {
  return getContrastRatio(foreground, background) >= 7;
}

/**
 * Checks if a color combination meets WCAG 2.1 AAA standards for large text.
 * 
 * @param foreground Foreground color in hex format
 * @param background Background color in hex format
 * @returns Boolean indicating if the contrast meets AAA standards for large text (4.5:1)
 */
export function meetsWCAGAAALargeText(foreground: string, background: string): boolean {
  return getContrastRatio(foreground, background) >= 4.5;
}

/**
 * Creates an accessible focus outline style for interactive elements
 * 
 * @returns Tailwind CSS classes for focus styling
 */
export function accessibleFocusStyle(): string {
  return "focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-brand-primary";
}
