'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Avatar from './Avatar';
import {
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
  FaQuestionCircle,
  FaBug,
} from 'react-icons/fa';

interface User {
  id?: string;
  memberId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  profilePicture?: string;
}

interface ProfileDropdownProps {
  user: User | null;
  className?: string;
}

export function ProfileDropdown({ user, className }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const userDisplayName = user
    ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User'
    : 'User';

  const userEmail = user?.email || '';
  const userRole = user?.role || 'member';
  const userMemberId = user?.memberId || '';

  const menuItems = [
    {
      icon: FaUser,
      label: 'My Profile',
      href: '/profile',
      description: 'Manage your account',
    },
    {
      icon: FaCog,
      label: 'Settings',
      href: '/settings',
      description: 'Preferences & security',
    },
    {
      icon: FaQuestionCircle,
      label: 'Help & Support',
      href: '/contact',
      description: 'Get assistance',
    },
    {
      icon: FaBug,
      label: 'Report Issue',
      href: '/contact',
      description: 'Submit a bug report',
    },
  ];

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
        aria-label="Open user menu"
      >
        <Avatar
          name={userDisplayName}
          src={user?.profilePicture}
          size="sm"
        />
        <div className="hidden md:block text-left">
          <p className="font-medium text-gray-800 text-xs leading-tight group-hover:text-primary transition-colors max-w-[120px] truncate">
            {userDisplayName}
          </p>
          <p className="text-[10px] text-gray-500 capitalize">{userRole}</p>
        </div>
        <FaChevronDown className="hidden md:block text-gray-400 text-[10px] group-hover:text-gray-600 transition-colors" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
          >
            {/* User Info Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <Avatar
                  name={userDisplayName}
                  src={user?.profilePicture}
                  size="md"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">
                    {userDisplayName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                  {userMemberId && (
                    <p className="text-[10px] text-gray-400 mt-0.5">{userMemberId}</p>
                  )}
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 mt-3 rounded-full text-[10px] font-medium bg-primary/10 text-primary capitalize">
                {userRole}
              </span>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition group"
                >
                  <item.icon className="text-gray-400 group-hover:text-primary transition-colors text-sm" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-700 text-sm group-hover:text-primary transition-colors">
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-400">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Logout */}
            <div className="p-2 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg hover:bg-red-50 transition group"
              >
                <FaSignOutAlt className="text-red-400 group-hover:text-red-600 transition-colors text-sm" />
                <div className="flex-1 text-left">
                  <p className="font-medium text-red-500 text-sm group-hover:text-red-700 transition-colors">
                    Sign Out
                  </p>
                  <p className="text-xs text-gray-400">Logout of your account</p>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProfileDropdown;