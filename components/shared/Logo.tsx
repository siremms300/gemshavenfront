'use client';

import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'light';
  showText?: boolean;
  className?: string;
}

export function Logo({
  size = 'md',
  variant = 'default',
  showText = true,
  className,
}: LogoProps) {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const variants = {
    default: 'bg-gradient-to-br from-primary to-secondary text-white',
    light: 'bg-gradient-to-br from-secondary to-accent text-primary',
  };

  return (
    <div className={cn('flex items-center space-x-3', className)}>
      <div className={cn('rounded-xl flex items-center justify-center font-bold flex-shrink-0', sizes[size], variants[variant])}>
        TH
      </div>
      {showText && (
        <div className="overflow-hidden">
          <h3 className={cn('font-bold leading-tight', textSizes[size], variant === 'light' ? 'text-white' : 'text-primary')}>
            Two Hands
          </h3>
          <p className={cn('text-[10px] leading-tight', variant === 'light' ? 'text-white/60' : 'text-gray-500')}>
            Cooperative
          </p>
        </div>
      )}
    </div>
  );
}

export default Logo;