"use client";

import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-5xl mx-auto">
        {/* Title skeleton */}
        <div className="w-2/3 h-8 bg-slate-200 animate-pulse rounded mb-8 mx-auto"></div>
        
        {/* Team grid skeleton */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded border bg-white shadow-sm overflow-hidden">
              {/* Image placeholder */}
              <div className="relative w-full h-56 bg-slate-200 animate-pulse"></div>
              {/* Name and title placeholder */}
              <div className="p-3">
                <div className="h-5 bg-slate-200 animate-pulse rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-slate-200 animate-pulse rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
