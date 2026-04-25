'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';
import Spinner from '@/components/ui/Spinner';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [children]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="fixed inset-0 flex bg-gray-50">
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar - fixed on left */}
      <Sidebar 
        isOpen={sidebarOpen}
        mobileOpen={mobileSidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Content Area - takes remaining width */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Header - fixed at top */}
        <Header 
          onMobileMenuClick={() => setMobileSidebarOpen(true)}
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="w-full max-w-7xl mx-auto px-4 py-6 md:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;