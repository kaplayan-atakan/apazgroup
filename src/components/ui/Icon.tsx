import type { SVGProps } from 'react';

type IconName = 'menu' | 'close' | 'arrow-up' | 'play' | 'mouse' | 'linkedin' | 'x' | 'instagram' | 'chevron-up' | 'chevron-down' | 'chevron-left' | 'chevron-right' | 'users' | 'academic-cap' | 'chart-bar' | 'briefcase' | 'document-text';

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 20, className = '', ...props }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 20 20',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className
  };

  switch (name) {
    case 'menu':
      return (
        <svg {...common} {...props}>
          <path d="M3 6H17M3 10H17M3 14H17" />
        </svg>
      );
    case 'close':
      return (
        <svg {...common} {...props}>
          <path d="M4 4L16 16M16 4L4 16" />
        </svg>
      );
    case 'arrow-up':
      return (
        <svg {...common} {...props}>
          <path d="M10 16V4M10 4L5 9M10 4l5 5" />
        </svg>
      );
    case 'play':
      return (
        <svg {...common} {...props}>
          <polygon points="6,4 16,10 6,16" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'mouse':
      return (
        <svg {...common} {...props}>
          <rect x="6" y="2" width="8" height="16" rx="4" />
          <path d="M10 2v4" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg {...common} {...props} viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8" cy="9" r="1.5" fill="currentColor" stroke="none" />
          <path d="M7 11v6M11 11v6M11 13c0-1.1 1-2 2.5-2s2.5.9 2.5 2v4" />
        </svg>
      );
    case 'x':
      return (
        <svg {...common} {...props} viewBox="0 0 24 24">
          <path d="M4 4l16 16M20 4L4 20" />
        </svg>
      );
    case 'instagram':
      return (
        <svg {...common} {...props} viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17" cy="7" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'chevron-up':
      return (
        <svg {...common} {...props}>
          <path d="M15 12L10 7L5 12" />
        </svg>
      );
    case 'chevron-down':
      return (
        <svg {...common} {...props}>
          <path d="M5 8L10 13L15 8" />
        </svg>
      );
    case 'chevron-left':
      return (
        <svg {...common} {...props}>
          <path d="M12 5L7 10l5 5" />
        </svg>
      );
    case 'chevron-right':
      return (
        <svg {...common} {...props}>
          <path d="M8 5l5 5-5 5" />
        </svg>
      );
    case 'users':
      return (
        <svg {...common} {...props} viewBox="0 0 24 24">
          <path d="M16 19v-1a4 4 0 00-4-4H8a4 4 0 00-4 4v1" />
          <circle cx="12" cy="7" r="3" />
          <path d="M22 19v-1a4 4 0 00-3-3.87" />
          <path d="M16 7a3 3 0 010 6" />
        </svg>
      );
    case 'academic-cap':
      return (
        <svg {...common} {...props} viewBox="0 0 24 24">
          <path d="M12 3l9 5-9 5-9-5 9-5z" />
          <path d="M4 10v4c0 2.21 3.58 4 8 4s8-1.79 8-4v-4" />
        </svg>
      );
    case 'chart-bar':
      return (
        <svg {...common} {...props} viewBox="0 0 24 24">
          <path d="M4 19h16" />
          <rect x="6" y="10" width="3" height="6" rx="1" />
          <rect x="11" y="7" width="3" height="9" rx="1" />
          <rect x="16" y="12" width="3" height="4" rx="1" />
        </svg>
      );
    case 'briefcase':
      return (
        <svg {...common} {...props} viewBox="0 0 24 24">
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
          <path d="M3 12h18" />
        </svg>
      );
    case 'document-text':
      return (
        <svg {...common} {...props} viewBox="0 0 24 24">
          <path d="M7 3h7l5 5v13a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
          <path d="M14 3v6h6" />
          <path d="M9 13h6M9 17h6" />
        </svg>
      );
    default:
      return null;
  }
}
