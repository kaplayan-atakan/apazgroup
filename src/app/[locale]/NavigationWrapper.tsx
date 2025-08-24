"use client";

import { ReactNode } from 'react';

import { NavigationProvider } from '../../components/context/NavigationContext';

export function NavigationWrapper({ children }: { children: ReactNode }) {
  return <NavigationProvider>{children}</NavigationProvider>;
}
