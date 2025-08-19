import type { SVGProps } from 'react';

type IconName = 'menu' | 'close' | 'arrow-up' | 'play' | 'mouse' | 'linkedin' | 'x' | 'instagram' | 'chevron-up' | 'chevron-down';

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
    default:
      return null;
  }
}
