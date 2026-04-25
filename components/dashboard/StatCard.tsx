'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { IconType } from 'react-icons';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  increase?: boolean;
  icon: IconType;
  color: string;
  href?: string;
  loading?: boolean;
  delay?: number;
}

export function StatCard({
  title,
  value,
  change,
  increase,
  icon: Icon,
  color,
  href,
  loading = false,
  delay = 0,
}: StatCardProps) {
  const CardWrapper = href ? Link : 'div';
  
  const content = (
    <div className="stat-card">
      <div className="flex justify-between items-start mb-4">
        <div className={cn('w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white', color)}>
          <Icon className="text-xl" />
        </div>
        {change && (
          <div className={cn(
            'flex items-center text-sm',
            increase ? 'text-green-600' : 'text-red-600'
          )}>
            {increase ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
            {change}
          </div>
        )}
      </div>
      
      {loading ? (
        <div className="h-8 w-24 bg-gray-200 animate-pulse rounded mb-2"></div>
      ) : (
        <div className="text-3xl font-bold text-primary mb-2">{value}</div>
      )}
      
      <div className="text-sm text-gray-500 uppercase tracking-wide">{title}</div>
    </div>
  );
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <CardWrapper href={href as string} className="block">
        {content}
      </CardWrapper>
    </motion.div>
  );
}

export default StatCard;