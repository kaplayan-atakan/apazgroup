"use client";

import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl mx-auto p-6">
        {/* Page header skeleton */}
        <div className="w-1/3 h-8 bg-slate-200 animate-pulse rounded mb-8"></div>
        
        {/* About page specific layout skeleton */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left column - logo grid */}
          <div className="grid grid-cols-2 gap-6 content-start">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i} 
                className="relative aspect-[4/2] rounded-xl ring-1 ring-slate-200 bg-slate-100 animate-pulse p-4"
              ></div>
            ))}
          </div>
          
          {/* Right column - content */}
          <div className="space-y-4">
            {/* Paragraph blocks */}
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="h-4 bg-slate-200 animate-pulse rounded"></div>
                ))}
              </div>
            ))}
            
            {/* Section headers */}
            <div className="mt-8 h-6 bg-slate-200 animate-pulse rounded w-1/4"></div>
            <div className="space-y-2">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-4 bg-slate-200 animate-pulse rounded"></div>
              ))}
            </div>
            
            {/* Another section */}
            <div className="mt-8 h-6 bg-slate-200 animate-pulse rounded w-1/3"></div>
            <div className="space-y-2">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-4 bg-slate-200 animate-pulse rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
