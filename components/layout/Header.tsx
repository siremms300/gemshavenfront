'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/shared/Logo';
import NotificationBell from '@/components/shared/NotificationBell';
import ProfileDropdown from '@/components/shared/ProfileDropdown';
import Button from '@/components/ui/Button';
import { FaBars } from 'react-icons/fa';
import { useState, useEffect } from 'react';

interface HeaderProps {
  sidebarOpen?: boolean;
  onSidebarToggle?: () => void;
  transparent?: boolean;
  isMobile?: boolean;
}

export function Header({ 
  sidebarOpen, 
  onSidebarToggle,
  transparent = false,
  isMobile = false
}: HeaderProps) {
  const { isAuthenticated, user } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const isHomePage = pathname === '/';
  const isAuthPage = pathname === '/login' || pathname === '/register';
  
  // Handle scroll effect for homepage
  useEffect(() => {
    if (!isHomePage) return;
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);
  
  const navItems = [
    { label: 'Features', href: '/#features' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
  ];
  
  // Determine header background
  const getHeaderBg = () => {
    if (isAuthPage) return 'bg-white shadow-sm';
    if (isAuthenticated) return 'bg-white border-b border-gray-200';
    if (isHomePage && !scrolled) return 'bg-white/10 backdrop-blur-sm border-b border-white/20';
    return 'bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm';
  };

  return (
    <header className={`fixed top-0 right-0 left-0 z-30 transition-all duration-300 h-16 lg:h-20 ${getHeaderBg()}`}>
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          {/* Left Section */}
          <div className="flex items-center space-x-3">
            {/* Mobile Menu Toggle for Authenticated Users */}
            {isAuthenticated && isMobile && (
              <button
                onClick={onSidebarToggle}
                className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition"
                aria-label="Toggle sidebar"
              >
                <FaBars className="text-primary text-lg" />
              </button>
            )}

            {/* Desktop Sidebar Toggle */}
            {isAuthenticated && !isMobile && (
              <button
                onClick={onSidebarToggle}
                className="p-2 hover:bg-gray-100 rounded-lg transition hidden lg:block"
                aria-label="Toggle sidebar"
              >
                <FaBars className="text-primary text-lg" />
              </button>
            )}

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 flex-shrink-0">
              <Logo size="md" variant={isHomePage && !scrolled && !isAuthenticated ? 'light' : 'default'} />
              {!isAuthenticated && !isHomePage && (
                <span className="hidden sm:inline text-sm text-gray-500">Multipurpose Cooperative</span>
              )}
            </Link>
          </div>
          
          {/* Center - Desktop Navigation (Non-authenticated) */}
          {!isAuthenticated && !isAuthPage && (
            <nav className="hidden lg:flex items-center space-x-6 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors whitespace-nowrap ${
                    isHomePage && !scrolled
                      ? 'text-white/90 hover:text-white'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
          
          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {isAuthenticated ? (
              <>
                {/* Hide notification bell on very small screens */}
                <div className="hidden xs:block">
                  <NotificationBell />
                </div>
                
                {/* Profile Dropdown - Hidden on mobile */}
                <div className="hidden sm:block">
                  <ProfileDropdown user={user} />
                </div>
                
                {/* Mobile Profile Link */}
                <Link href="/profile" className="sm:hidden">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm hover:shadow-lg transition-shadow">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </div>
                </Link>
              </>
            ) : (
              <>
                {/* Desktop Auth Buttons */}
                <div className="hidden sm:flex items-center space-x-3">
                  {!isAuthPage && (
                    <>
                      <Link href="/login">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={
                            isHomePage && !scrolled
                              ? 'border-white text-white hover:bg-white hover:text-primary'
                              : ''
                          }
                        >
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/register">
                        <Button 
                          variant={isHomePage && !scrolled ? 'secondary' : 'primary'} 
                          size="sm"
                        >
                          Get Started
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
                
                {/* Mobile Sign In Link */}
                {!isAuthPage && (
                  <Link 
                    href="/login" 
                    className="sm:hidden text-sm font-medium text-primary hover:text-secondary transition"
                  >
                    Sign In
                  </Link>
                )}
                
                {/* Mobile Menu Button (Non-authenticated) */}
                {!isAuthPage && (
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
                    aria-label="Toggle menu"
                  >
                    <FaBars className={`text-lg ${isHomePage && !scrolled ? 'text-white' : 'text-primary'}`} />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu (Non-authenticated) */}
      {mobileMenuOpen && !isAuthenticated && !isAuthPage && (
        <div className="lg:hidden border-t border-gray-200 bg-white shadow-lg">
          <nav className="flex flex-col p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium text-base"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 space-y-3 sm:hidden">
              <Link
                href="/login"
                className="block w-full text-center py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="block w-full text-center py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-light transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;