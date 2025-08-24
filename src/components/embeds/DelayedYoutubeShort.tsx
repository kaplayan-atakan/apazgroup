"use client";

import React, { useEffect, useState } from 'react';

interface DelayedYoutubeShortProps {
  videoId: string;
  delayMs?: number; // default 2000
  title?: string;
  start?: number; // optional start seconds
  className?: string;
}

// Delays autoplay of a YouTube Shorts (or standard) embed by delayMs, starting muted.
// Renders an iframe that swaps its src after the delay to trigger autoplay while muted.
export function DelayedYoutubeShort({
  videoId,
  delayMs = 2000,
  title = 'YouTube video',
  start,
  className,
}: DelayedYoutubeShortProps) {
  const baseParams = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    enablejsapi: '1',
  });
  if (start) baseParams.set('start', String(start));

  const autoplayParams = new URLSearchParams(baseParams);
  autoplayParams.set('autoplay', '1');
  autoplayParams.set('mute', '1');

  const initialSrc = `https://www.youtube.com/embed/${videoId}?${baseParams.toString()}`;
  const autoplaySrc = `https://www.youtube.com/embed/${videoId}?${autoplayParams.toString()}`;

  const [src, setSrc] = useState(initialSrc);

  useEffect(() => {
    const t = setTimeout(() => {
      setSrc(autoplaySrc);
    }, delayMs);
    return () => clearTimeout(t);
  }, [autoplaySrc, delayMs]);

  return (
    <iframe
      src={src}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      loading="lazy"
      className={className || 'absolute inset-0 h-full w-full'}
    />
  );
}

export default DelayedYoutubeShort;
