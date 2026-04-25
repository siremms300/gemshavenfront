'use client';

import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'full' | 'md';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  rounded = 'full',
  className,
}: BadgeProps) {
  const variants = {
    success: 'bg-green-100 text-green-700 border-green-200',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    danger: 'bg-red-100 text-red-700 border-red-200',
    info: 'bg-blue-100 text-blue-700 border-blue-200',
    default: 'bg-gray-100 text-gray-700 border-gray-200',
    primary: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary/10 text-secondary border-secondary/20',
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };
  
  const roundedStyles = {
    full: 'rounded-full',
    md: 'rounded-md',
  };
  
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium border',
        variants[variant],
        sizes[size],
        roundedStyles[rounded],
        className
      )}
    >
      {children}
    </span>
  );
}

export default Badge;