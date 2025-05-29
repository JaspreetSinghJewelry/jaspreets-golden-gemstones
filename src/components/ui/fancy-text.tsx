
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
    gradient: 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent',
    glow: 'text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]',
    elegant: 'text-[#1F1E39] font-serif tracking-wide',
    gold: 'text-yellow-600 font-bold tracking-wider'
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
