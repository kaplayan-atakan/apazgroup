"use client";

import React, { useState } from 'react';
import Link from 'next/link';

type SmartLinkProps = React.ComponentProps<typeof Link> & {
  loadingClassName?: string;
};

export function SmartLink({ 
  children, 
  className = '',
  loadingClassName = 'opacity-70',
  ...props 
}: SmartLinkProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClick = () => {
    setIsLoading(true);
    // Reset after timeout to handle fast navigation or errors
    setTimeout(() => setIsLoading(false), 2000);
  };
  
  const combinedClassName = `${className} ${isLoading ? loadingClassName : ''}`;
  
  return (
    <Link 
      {...props} 
      className={combinedClassName} 
      onClick={handleClick}
    >
      {children}
      {isLoading && (
        <span className="inline-block ml-2 w-3 h-3 border-t-2 border-r-2 border-gray-500 rounded-full animate-spin"></span>
      )}
    </Link>
  );
}
