'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/shared/Logo';
import Button from '@/components/ui/Button';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function PublicHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isAuthPage = pathname === '/login' || pathname === '/register';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Features', href: '/#features' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
  ];

  // Header background based on scroll and page
  const headerBg = () => {
    if (isHomePage && !scrolled) return 'bg-transparent';
    return 'bg-white shadow-sm border-b border-gray-200';
  };

  // Text color based on scroll and page
  const textColor = () => {
    if (isHomePage && !scrolled) return 'text-primary';
    return 'text-gray-700 hover:text-primary';
  };

  // Logo variant based on scroll
  const logoVariant = () => {
    if (isHomePage && !scrolled) return 'default';
    return 'default';
  };

  if (isAuthPage) return null; // Auth pages have their own simple header

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg()}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo size="md" variant={logoVariant()} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${textColor()}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link href="/login">
              <Button variant={isHomePage && !scrolled ? 'outline' : 'outline'} size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button variant={isHomePage && !scrolled ? 'primary' : 'primary'} size="sm">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {mobileOpen ? (
              <FaTimes className={`text-lg ${isHomePage && !scrolled ? 'text-primary' : 'text-gray-600'}`} />
            ) : (
              <FaBars className={`text-lg ${isHomePage && !scrolled ? 'text-primary' : 'text-gray-600'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
              >
                {item.label}
              </Link>
            ))}
            <div className="grid grid-cols-2 gap-3 pt-3">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="text-center py-3 border-2 border-primary text-primary rounded-full font-semibold text-sm"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="text-center py-3 bg-primary text-white rounded-full font-semibold text-sm"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}