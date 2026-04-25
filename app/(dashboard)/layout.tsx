'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHome,
  FaPiggyBank,
  FaHandHoldingUsd,
  FaExchangeAlt,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBell,
  FaCog,
  FaUsers,
  FaChartBar,
  FaWallet,
  FaCreditCard,
  FaUserCircle,
  FaChevronDown,
  FaChevronRight
} from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, title: 'Savings interest credited', message: '₦5,000 interest added to your account', time: '2 hours ago', unread: true },
    { id: 2, title: 'Loan payment due', message: 'Your loan payment of ₦45,000 is due in 3 days', time: '1 day ago', unread: true },
    { id: 3, title: 'Welcome to Gems Haven!', message: 'Complete your profile to get started', time: '3 days ago', unread: false },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: FaHome },
    { name: 'Savings', href: '/savings', icon: FaPiggyBank },
    { name: 'Loans', href: '/loans', icon: FaHandHoldingUsd },
    { name: 'Transactions', href: '/transactions', icon: FaExchangeAlt },
    { name: 'Profile', href: '/profile', icon: FaUser },
  ];

  const adminMenuItems = [
    { name: 'Admin Dashboard', href: '/admin', icon: FaChartBar },
    { name: 'Members', href: '/admin/members', icon: FaUsers },
    { name: 'Settings', href: '/admin/settings', icon: FaCog },
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
    toast.success('Logged out successfully');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-gradient-to-b from-primary to-primary-dark text-white
        transition-all duration-300 z-50 overflow-y-auto
        ${sidebarOpen ? 'w-64' : 'w-20'}
        lg:w-64
      `}>
        {/* Logo */}
        <div className="p-4 border-b border-white/10">
          <Link href="/dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold text-lg">GH</span>
            </div>
            <div className={`${!sidebarOpen && 'lg:hidden'} ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
              <h2 className="font-bold text-sm">GEMS HAVEN</h2>
              <p className="text-xs text-white/60">Cooperative</p>
            </div>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-white/10">
          <div className={`flex items-center ${!sidebarOpen && 'lg:justify-center'}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center flex-shrink-0">
              <FaUserCircle className="text-primary text-2xl" />
            </div>
            <div className={`ml-3 ${!sidebarOpen && 'lg:hidden'} ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
              <p className="font-medium text-sm truncate">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-white/60 truncate">{user.memberId}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center space-x-3 px-3 py-3 rounded-lg transition-all
                      ${isActive ? 'bg-secondary text-primary' : 'hover:bg-white/10 text-white/80 hover:text-white'}
                      ${!sidebarOpen && 'lg:justify-center'}
                    `}
                  >
                    <item.icon className="text-lg flex-shrink-0" />
                    <span className={`${!sidebarOpen && 'lg:hidden'} ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}

            {isAdmin && adminMenuItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center space-x-3 px-3 py-3 rounded-lg transition-all
                      ${isActive ? 'bg-secondary text-primary' : 'hover:bg-white/10 text-white/80 hover:text-white'}
                      ${!sidebarOpen && 'lg:justify-center'}
                    `}
                  >
                    <item.icon className="text-lg flex-shrink-0" />
                    <span className={`${!sidebarOpen && 'lg:hidden'} ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all
              hover:bg-red-500/20 text-red-400 hover:text-red-300
              ${!sidebarOpen && 'lg:justify-center'}
            `}
          >
            <FaSignOutAlt className="text-lg flex-shrink-0" />
            <span className={`${!sidebarOpen && 'lg:hidden'} ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'} lg:ml-64`}>
        {/* Header */}
        <header className="glass sticky top-0 z-40">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
              >
                {sidebarOpen ? <FaTimes /> : <FaBars />}
              </button>
              <h1 className="text-2xl font-bold text-primary hidden sm:block">
                {menuItems.find(item => item.href === pathname)?.name || 
                 adminMenuItems.find(item => pathname.startsWith(item.href))?.name || 
                 'Dashboard'}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <FaBell className="text-gray-600" />
                  {notifications.filter(n => n.unread).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.filter(n => n.unread).length}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-800">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer ${notification.unread ? 'bg-blue-50/50' : ''}`}
                          >
                            <div className="flex items-start">
                              <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${notification.unread ? 'bg-blue-500' : 'bg-gray-300'}`} />
                              <div className="flex-1">
                                <p className="font-medium text-gray-800">{notification.title}</p>
                                <p className="text-sm text-gray-600">{notification.message}</p>
                                <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 border-t border-gray-100">
                        <button className="w-full text-center text-sm text-primary hover:text-secondary transition">
                          Mark all as read
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <span className="text-white font-bold">
                      {user.firstName[0]}{user.lastName[0]}
                    </span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="font-medium text-gray-800 text-sm">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                  <FaChevronDown className="hidden md:block text-gray-400 text-xs" />
                </button>

                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
                    >
                      <Link
                        href="/profile"
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <FaUser className="text-gray-500" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <FaCog className="text-gray-500" />
                        <span>Settings</span>
                      </Link>
                      <hr className="border-gray-100" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-50 text-red-600 transition"
                      >
                        <FaSignOutAlt />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}