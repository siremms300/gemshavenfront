'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import {
  FaBars,
  FaBell,
  FaChevronDown,
  FaSignOutAlt,
  FaUser,
} from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  onMobileMenuClick: () => void;
  onSidebarToggle: () => void;
}

export function Header({ onMobileMenuClick, onSidebarToggle }: HeaderProps) {
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initials = `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`;

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 flex-shrink-0">
      <div className="flex items-center gap-2">
        <button onClick={onMobileMenuClick} className="lg:hidden p-1.5 hover:bg-gray-100 rounded">
          <FaBars size={18} className="text-gray-600" />
        </button>
        <button onClick={onSidebarToggle} className="hidden lg:block p-1.5 hover:bg-gray-100 rounded">
          <FaBars size={18} className="text-gray-600" />
        </button>
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          Welcome, {user?.firstName}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <div ref={notifRef} className="relative">
          <button onClick={() => setNotifOpen(!notifOpen)} className="p-2 hover:bg-gray-100 rounded relative">
            <FaBell size={16} className="text-gray-500" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-1 w-64 bg-white rounded-lg shadow-lg border z-50">
              <div className="p-3 border-b">
                <p className="text-sm font-medium">Notifications</p>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3 border-b last:border-0 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm font-medium">Savings Update</p>
                    <p className="text-xs text-gray-500">Your savings have been credited</p>
                    <p className="text-[10px] text-gray-400 mt-1">2 hours ago</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div ref={profileRef} className="relative">
          <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold">
              {initials}
            </div>
            <FaChevronDown size={10} className="text-gray-400 hidden sm:block" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border z-50">
              <div className="p-2 border-b">
                <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <Link href="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50">
                <FaUser size={14} /> Profile
              </Link>
              <button
                onClick={() => { setProfileOpen(false); logout(); }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <FaSignOutAlt size={14} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// Also export as default
export default Header;