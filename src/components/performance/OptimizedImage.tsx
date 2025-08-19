import Image from 'next/image';
import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  fill?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

/**
 * OptimizedImage - An optimized image component using Next.js Image
 * 
 * Features:
 * - Automatic responsive sizing with sizes prop
 * - Automatic lazy loading for non-priority images
 * - WebP/AVIF format conversion
 * - Proper alt text for accessibility
 * 
 * Usage recommendations:
 * - Use priority={true} for LCP (Largest Contentful Paint) images
 * - Use fill={true} with parent position:relative for responsive images
 * - Set appropriate sizes prop based on your layout
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  fill = false,
  objectFit = 'cover',
}: OptimizedImageProps) {
  // Calculate aspect ratio if width and height are provided
  const aspectRatio = width && height ? width / height : undefined;

  return (
    <div 
      className={`${className} ${fill ? 'relative' : ''}`} 
      style={fill ? { height: '100%', width: '100%' } : {}}
    >
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        sizes={sizes}
        quality={quality}
        fill={fill}
        style={{
          objectFit: objectFit,
          ...(aspectRatio && !fill ? { aspectRatio: `${aspectRatio}` } : {}),
        }}
      />
    </div>
  );
}
