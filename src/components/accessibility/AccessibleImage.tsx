import Image from 'next/image';
import React from 'react';

interface AccessibleImageProps {
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
  caption?: string;
  decorative?: boolean;
  longDesc?: string;
  id?: string;
  role?: string;
}

/**
 * AccessibleImage - An enhanced image component focused on accessibility
 * 
 * Features:
 * - All features from OptimizedImage
 * - Support for decorative images
 * - Optional caption support with figcaption
 * - Support for longdesc attribute via aria-describedby
 * - Proper role assignments
 * 
 * Accessibility features:
 * - Empty alt text for decorative images
 * - Proper figure/figcaption relationship
 * - Support for long descriptions
 * - Proper role attributes
 */
export function AccessibleImage({
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
  caption,
  decorative = false,
  longDesc,
  id,
  role,
}: AccessibleImageProps) {
  // Calculate aspect ratio if width and height are provided
  const aspectRatio = width && height ? width / height : undefined;
  const imageId = id || `img-${Math.random().toString(36).substring(2, 9)}`;
  const longDescId = longDesc ? `${imageId}-desc` : undefined;
  
  // If decorative, set alt to empty string and add aria-hidden
  const altText = decorative ? '' : alt;
  const ariaHidden = decorative ? true : undefined;
  
  const imageComponent = (
    <Image
      src={src}
      alt={altText}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      sizes={sizes}
      quality={quality}
      fill={fill}
      id={imageId}
      role={role}
      aria-hidden={ariaHidden}
      aria-describedby={longDescId}
      style={{
        objectFit,
        ...(aspectRatio && !fill ? { aspectRatio: `${aspectRatio}` } : {}),
      }}
    />
  );

  // If we have a caption or long description, wrap in a figure
  if (caption || longDesc) {
    return (
      <figure className={className}>
        <div className={fill ? 'relative w-full h-full' : ''}>
          {imageComponent}
        </div>
        
        {caption && (
          <figcaption className="mt-2 text-sm text-slate-500">
            {caption}
          </figcaption>
        )}
        
        {longDesc && (
          <div id={longDescId} className="sr-only">
            {longDesc}
          </div>
        )}
      </figure>
    );
  }

  // Otherwise, just return the image in a div
  return (
    <div 
      className={`${className} ${fill ? 'relative' : ''}`} 
      style={fill ? { height: '100%', width: '100%' } : {}}
    >
      {imageComponent}
    </div>
  );
}
