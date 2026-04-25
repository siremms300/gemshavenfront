'use client';

import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  bordered?: boolean;
  gradient?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className,
  padding = 'md',
  hover = false,
  bordered = true,
  gradient = false,
  onClick,
}: CardProps) {
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const baseStyles = 'rounded-2xl shadow-md transition-all duration-300';
  const borderStyles = bordered ? 'border border-secondary/10' : '';
  const hoverStyles = hover ? 'hover:shadow-xl hover:-translate-y-1 hover:border-secondary/30 cursor-pointer' : '';
  const gradientStyles = gradient
    ? 'bg-gradient-to-br from-white to-slate-50'
    : 'bg-white';
  
  return (
    <div
      className={cn(
        baseStyles,
        borderStyles,
        hoverStyles,
        gradientStyles,
        paddings[padding],
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default Card;