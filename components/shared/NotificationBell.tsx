'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { FaBell, FaTimes } from 'react-icons/fa';

interface Notification {
  id: string | number;
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

interface NotificationBellProps {
  notifications?: Notification[];
  onMarkAllRead?: () => void;
  onNotificationClick?: (notification: Notification) => void;
  className?: string;
}

const defaultNotifications: Notification[] = [
  {
    id: 1,
    title: 'Savings Interest Credited',
    message: '₦5,000 interest has been added to your account.',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 2,
    title: 'Loan Payment Due',
    message: 'Your loan payment of ₦45,000 is due in 3 days.',
    time: '1 day ago',
    unread: true,
  },
  {
    id: 3,
    title: 'Profile Update',
    message: 'Complete your profile to unlock all features.',
    time: '3 days ago',
    unread: false,
  },
];

export function NotificationBell({
  notifications = defaultNotifications,
  onMarkAllRead,
  onNotificationClick,
  className,
}: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localNotifications, setLocalNotifications] = useState(notifications);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const unreadCount = localNotifications.filter((n) => n.unread).length;

  useEffect(() => {
    setLocalNotifications(notifications);
  }, [notifications]);

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

  const handleMarkAllRead = () => {
    setLocalNotifications((prev) =>
      prev.map((n) => ({ ...n, unread: false }))
    );
    onMarkAllRead?.();
  };

  const handleDismiss = (e: React.MouseEvent, id: string | number) => {
    e.stopPropagation();
    setLocalNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
      >
        <FaBell className="text-gray-600 text-lg" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-medium">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-3 w-80 max-w-[calc(100vw-2rem)] sm:w-96 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="p-3 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">Notifications</h3>
                {unreadCount > 0 && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {unreadCount} unread
                  </p>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-xs text-primary hover:text-secondary transition font-medium"
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-[350px] overflow-y-auto">
              {localNotifications.length === 0 ? (
                <div className="py-8 text-center">
                  <FaBell className="text-3xl text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">No notifications</p>
                </div>
              ) : (
                localNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 cursor-pointer hover:bg-gray-50 transition relative border-b border-gray-50 last:border-0 ${
                      notification.unread ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <div className="flex items-start">
                      {notification.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full mt-1.5 mr-2 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`font-medium text-sm truncate ${
                            notification.unread ? 'text-gray-900' : 'text-gray-600'
                          }`}>
                            {notification.title}
                          </p>
                          <button
                            onClick={(e) => handleDismiss(e, notification.id)}
                            className="p-1 hover:bg-gray-200 rounded-full transition flex-shrink-0"
                            aria-label="Dismiss"
                          >
                            <FaTimes className="text-gray-400 text-[10px]" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NotificationBell;