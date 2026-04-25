'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/shared/Logo';
import Avatar from '@/components/shared/Avatar';
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
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from 'react-icons/fa';
import { IconType } from 'react-icons';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isExpanded: boolean;
  isMobile: boolean;
  onToggle: () => void;
  onClose: () => void;
}

interface MenuItem {
  name: string;
  href: string;
  icon: IconType;
  adminOnly?: boolean;
  badge?: string;
}

export function Sidebar({ isExpanded, isMobile, onToggle, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout, isAdmin } = useAuth();

  const menuItems: MenuItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: FaHome },
    { name: 'Savings', href: '/savings', icon: FaPiggyBank },
    { name: 'Loans', href: '/loans', icon: FaHandHoldingUsd },
    { name: 'Transactions', href: '/transactions', icon: FaExchangeAlt },
    { name: 'Profile', href: '/profile', icon: FaUser },
  ];

  const adminItems: MenuItem[] = [
    { name: 'Admin Dashboard', href: '/admin', icon: FaChartBar, adminOnly: true },
    { name: 'Members', href: '/admin/members', icon: FaUsers, adminOnly: true },
    { name: 'Settings', href: '/admin/settings', icon: FaCog, adminOnly: true },
  ];

  const allItems = [...menuItems, ...(isAdmin ? adminItems : [])];

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-full bg-gradient-to-b from-primary to-primary-dark text-white transition-all duration-300 z-40 flex flex-col overflow-hidden',
        // On mobile (always expanded when visible): w-72
        // On desktop expanded: w-64
        // On desktop collapsed: w-20
        isMobile ? 'w-72' : isExpanded ? 'w-64' : 'w-20'
      )}
    >
      {/* Logo & Close Button */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 h-16 lg:h-20 flex-shrink-0">
        <Link
          href="/dashboard"
          className="flex items-center space-x-3 overflow-hidden flex-1 min-w-0"
          onClick={onClose}
        >
          <div className="flex-shrink-0">
            <Logo size="sm" variant="light" showText={false} />
          </div>
          <div
            className={cn(
              'transition-all duration-200 whitespace-nowrap overflow-hidden',
              isExpanded || isMobile ? 'opacity-100 w-auto' : 'opacity-0 w-0'
            )}
          >
            <h2 className="font-bold text-sm leading-tight">GEMS HAVEN</h2>
            <p className="text-[10px] text-white/60">Cooperative</p>
          </div>
        </Link>

        {/* Close button for mobile */}
        {isMobile && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition flex-shrink-0"
            aria-label="Close sidebar"
          >
            <FaTimes className="text-white/70" />
          </button>
        )}
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-white/10 flex-shrink-0">
        <div className={cn('flex items-center', !isExpanded && !isMobile && 'justify-center')}>
          <Avatar
            name={`${user?.firstName} ${user?.lastName}`}
            size="md"
          />
          <div
            className={cn(
              'ml-3 overflow-hidden transition-all duration-200',
              isExpanded || isMobile ? 'opacity-100 w-auto' : 'opacity-0 w-0 ml-0'
            )}
          >
            <p className="font-medium text-sm truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-white/60 truncate">{user?.memberId}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto overflow-x-hidden">
        <ul className="space-y-1">
          {allItems.map((item) => {
            const active = isActive(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all group relative',
                    active
                      ? 'bg-secondary text-primary font-medium'
                      : 'text-white/70 hover:bg-white/10 hover:text-white',
                    !isExpanded && !isMobile && 'justify-center px-2'
                  )}
                  title={!isExpanded && !isMobile ? item.name : undefined}
                >
                  <item.icon
                    className={cn(
                      'text-lg flex-shrink-0',
                      active ? 'text-primary' : ''
                    )}
                  />

                  {/* Text - shown on mobile or expanded desktop */}
                  <span
                    className={cn(
                      'transition-all duration-200 whitespace-nowrap',
                      isExpanded || isMobile
                        ? 'opacity-100'
                        : 'opacity-0 w-0 overflow-hidden'
                    )}
                  >
                    {item.name}
                  </span>

                  {/* Active Indicator */}
                  {active && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-l-full" />
                  )}

                  {/* Badge */}
                  {item.badge && (isExpanded || isMobile) && (
                    <span className="ml-auto px-2 py-0.5 text-[10px] bg-secondary text-primary rounded-full font-medium">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/10 space-y-1 flex-shrink-0">
        {/* Collapse Toggle - Desktop Only */}
        {!isMobile && (
          <button
            onClick={onToggle}
            className={cn(
              'w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all text-white/70 hover:bg-white/10 hover:text-white',
              !isExpanded && 'justify-center px-2'
            )}
            title={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isExpanded ? (
              <FaChevronLeft className="flex-shrink-0" />
            ) : (
              <FaChevronRight className="flex-shrink-0" />
            )}
            <span
              className={cn(
                'transition-all duration-200 whitespace-nowrap',
                isExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
              )}
            >
              Collapse
            </span>
          </button>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={cn(
            'w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all text-red-400 hover:bg-red-500/20 hover:text-red-300',
            !isExpanded && !isMobile && 'justify-center px-2'
          )}
          title="Logout"
        >
          <FaSignOutAlt className="flex-shrink-0" />
          <span
            className={cn(
              'transition-all duration-200 whitespace-nowrap',
              isExpanded || isMobile ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
            )}
          >
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;