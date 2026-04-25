'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { cn } from '@/lib/utils';

interface QuickActionProps {
  label: string;
  icon: IconType;
  href: string;
  color: string;
  delay?: number;
  onClick?: () => void;
}

export function QuickAction({
  label,
  icon: Icon,
  href,
  color,
  delay = 0,
  onClick,
}: QuickActionProps) {
  const content = (
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition flex items-center space-x-3 group cursor-pointer">
      <div className={cn(
        'w-10 h-10 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform',
        color
      )}>
        <Icon />
      </div>
      <span className="font-medium text-gray-700">{label}</span>
    </div>
  );
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      {onClick ? (
        <div onClick={onClick}>{content}</div>
      ) : (
        <Link href={href}>{content}</Link>
      )}
    </motion.div>
  );
}

export default QuickAction;