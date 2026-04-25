'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/axios';
import { formatCurrency } from '@/lib/utils';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import QuickAction from '@/components/dashboard/QuickAction';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import {
  FaPiggyBank,
  FaHandHoldingUsd,
  FaChartPie,
  FaCreditCard,
  FaPlus,
  FaExchangeAlt,
} from 'react-icons/fa';

export default function DashboardPage() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSavings: 0,
    activeLoanAmount: 0,
    totalShares: 0,
    loanEligibility: 0,
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/users/dashboard-stats');
      setStats(response.data.stats);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Savings',
      value: formatCurrency(stats.totalSavings),
      change: '+12.5%',
      increase: true,
      icon: FaPiggyBank,
      color: 'from-emerald-500 to-green-500',
      href: '/savings',
    },
    {
      title: 'Active Loan',
      value: stats.activeLoanAmount > 0 
        ? formatCurrency(stats.activeLoanAmount) 
        : 'No active loan',
      change: stats.activeLoanAmount > 0 ? 'On Track' : 'N/A',
      increase: true,
      icon: FaHandHoldingUsd,
      color: 'from-blue-500 to-cyan-500',
      href: '/loans',
    },
    {
      title: 'Shares Value',
      value: formatCurrency(stats.totalShares),
      change: '+5.2%',
      increase: true,
      icon: FaChartPie,
      color: 'from-purple-500 to-pink-500',
      href: '/savings/shares',
    },
    {
      title: 'Loan Eligibility',
      value: formatCurrency(stats.loanEligibility),
      change: 'Available',
      increase: true,
      icon: FaCreditCard,
      color: 'from-orange-500 to-red-500',
      href: '/loans/apply',
    },
  ];

  const quickActions = [
    {
      label: 'Quick Save',
      icon: FaPiggyBank,
      color: 'bg-emerald-500',
      href: '/savings/deposit',
    },
    {
      label: 'Request Loan',
      icon: FaHandHoldingUsd,
      color: 'bg-blue-500',
      href: '/loans/apply',
    },
    {
      label: 'Pay Loan',
      icon: FaCreditCard,
      color: 'bg-purple-500',
      href: '/loans/repay',
    },
    {
      label: 'Transfer',
      icon: FaExchangeAlt,
      color: 'bg-orange-500',
      href: '/transactions/transfer',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary">
              {greeting}, {user?.firstName}! 👋
            </h1>
            <p className="text-gray-600 mt-1">
              Welcome back to your financial dashboard
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <QuickAction key={index} {...action} delay={index * 0.05} />
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <StatCard
              key={index}
              {...stat}
              loading={loading}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Additional dashboard content... */}
      </div>
    </DashboardLayout>
  );
}