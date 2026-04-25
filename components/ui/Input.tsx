'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  helper?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      icon,
      iconPosition = 'left',
      helper,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block mb-2 font-medium text-gray-700">
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </span>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full border-2 rounded-xl text-base transition-all duration-300 focus:outline-none focus:ring-4',
              'bg-white',
              error
                ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                : 'border-gray-200 focus:border-secondary focus:ring-secondary/10',
              icon && iconPosition === 'left' && 'pl-10',
              icon && iconPosition === 'right' && 'pr-10',
              'px-4 py-3',
              className
            )}
            {...props}
          />
          
          {icon && iconPosition === 'right' && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </span>
          )}
        </div>
        
        {error && <p className="text-danger text-sm mt-1">{error}</p>}
        {helper && !error && <p className="text-gray-500 text-sm mt-1">{helper}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;