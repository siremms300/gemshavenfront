'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  FaHome,
  FaPiggyBank,
  FaHandHoldingUsd,
  FaExchangeAlt,
  FaUser,
  FaSignOutAlt,
  FaChartBar,
  FaUsers,
  FaCog,
  FaTimes,
} from 'react-icons/fa';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  mobileOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: FaHome },
  { name: 'Savings', href: '/savings', icon: FaPiggyBank },
  { name: 'Loans', href: '/loans', icon: FaHandHoldingUsd },
  { name: 'Transactions', href: '/transactions', icon: FaExchangeAlt },
  { name: 'Profile', href: '/profile', icon: FaUser },
];

const adminItems = [
  { name: 'Admin', href: '/admin', icon: FaChartBar },
  { name: 'Members', href: '/admin/members', icon: FaUsers },
  { name: 'Settings', href: '/admin/settings', icon: FaCog },
];

export function Sidebar({ isOpen, mobileOpen, onToggle, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout, isAdmin } = useAuth();
  const allItems = isAdmin ? [...navItems, ...adminItems] : navItems;

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  const sidebarClasses = cn(
    'fixed lg:sticky top-0 left-0 z-50 h-screen bg-[#0f1e33] text-white flex flex-col transition-all duration-300 flex-shrink-0',
    isOpen ? 'lg:w-60' : 'lg:w-16',
    mobileOpen ? 'w-60 translate-x-0' : 'w-60 -translate-x-full lg:translate-x-0 lg:w-auto'
  );

  return (
    <aside className={sidebarClasses}>
      <div className="h-14 flex items-center justify-between px-4 border-b border-white/10 flex-shrink-0">
        <Link href="/dashboard" onClick={onClose} className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-secondary to-accent rounded flex items-center justify-center flex-shrink-0">
            <span className="text-primary font-bold text-xs">GH</span>
          </div>
          {isOpen && <span className="font-bold text-sm whitespace-nowrap">GEMS HAVEN</span>}
        </Link>
        <button onClick={onClose} className="lg:hidden p-1 hover:bg-white/10 rounded">
          <FaTimes size={16} />
        </button>
      </div>

      <nav className="flex-1 py-3 px-2 overflow-y-auto">
        {allItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-colors whitespace-nowrap',
                active ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white',
                !isOpen && 'lg:justify-center lg:px-2'
              )}
              title={!isOpen ? item.name : ''}
            >
              <Icon size={18} className="flex-shrink-0" />
              {isOpen && <span className="text-sm">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-2 border-t border-white/10 flex-shrink-0">
        <div className={cn('flex items-center gap-2 px-2 py-2 mb-1', !isOpen && 'lg:justify-center')}>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </div>
          {isOpen && (
            <div className="text-xs min-w-0">
              <p className="font-medium truncate">{user?.firstName} {user?.lastName}</p>
            </div>
          )}
        </div>

        <button
          onClick={() => { onClose(); logout(); }}
          className={cn(
            'flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors',
            !isOpen && 'lg:justify-center lg:px-2'
          )}
        >
          <FaSignOutAlt size={16} className="flex-shrink-0" />
          {isOpen && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  );
}

// Also export as default
export default Sidebar;