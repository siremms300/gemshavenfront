'use client';

import { cn } from '@/lib/utils';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

export function Alert({ children, variant = 'info', className }: AlertProps) {
  const variants = {
    success: { bg: 'bg-green-50 border-green-200 text-green-700', icon: FaCheckCircle },
    warning: { bg: 'bg-yellow-50 border-yellow-200 text-yellow-700', icon: FaExclamationTriangle },
    error: { bg: 'bg-red-50 border-red-200 text-red-700', icon: FaTimesCircle },
    info: { bg: 'bg-blue-50 border-blue-200 text-blue-700', icon: FaInfoCircle },
  };
  
  const { bg, icon: Icon } = variants[variant];
  
  return (
    <div className={cn('p-4 border rounded-xl flex items-start', bg, className)}>
      <Icon className="mt-0.5 mr-3 flex-shrink-0" />
      <div className="text-sm">{children}</div>
    </div>
  );
}

export default Alert;