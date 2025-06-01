
import React from 'react';
import { cn } from '@/lib/utils';

interface FancyTextProps {
  children: React.ReactNode;
  variant?: 'gradient' | 'glow' | 'elegant' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const FancyText = ({ 
  children, 
  variant = 'gradient', 
  size = 'md', 
  className 
}: FancyTextProps) => {
  const variants = {
    gradient: 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent',
    glow: 'text-blue-600 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]',
    elegant: 'text-gray-800 font-serif tracking-wide',
    gold: 'text-black font-bold tracking-wider'
  };

  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-4xl'
  };

  return (
    <span className={cn(variants[variant], sizes[size], className)}>
      {children}
    </span>
  );
};
