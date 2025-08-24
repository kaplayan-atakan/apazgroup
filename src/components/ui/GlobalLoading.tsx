"use client";

import React from 'react';

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-slate-300 border-t-black rounded-full animate-spin"></div>
        <span className="mt-3 text-slate-800 font-medium">Yükleniyor...</span>
      </div>
    </div>
  );
}
