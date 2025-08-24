"use client";

import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl mx-auto p-6">
        {/* Page header skeleton */}
        <div className="w-1/3 h-8 bg-slate-200 animate-pulse rounded mb-8"></div>
        
        {/* Content skeleton - 2 column layout */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {/* Left column with image placeholders */}
            <div className="aspect-video w-full bg-slate-200 animate-pulse rounded-lg"></div>
            
            {/* Multiple stacked skeletons */}
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-video bg-slate-200 animate-pulse rounded-lg"></div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Right column with text placeholders */}
            <div className="h-6 bg-slate-200 animate-pulse rounded w-3/4"></div>
            <div className="h-6 bg-slate-200 animate-pulse rounded"></div>
            <div className="h-6 bg-slate-200 animate-pulse rounded w-5/6"></div>
            <div className="h-6 bg-slate-200 animate-pulse rounded w-2/3"></div>
            
            {/* Paragraph blocks */}
            <div className="space-y-2 mt-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-4 bg-slate-200 animate-pulse rounded"></div>
              ))}
            </div>
            
            <div className="space-y-2 mt-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-4 bg-slate-200 animate-pulse rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
