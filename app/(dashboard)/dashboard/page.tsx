'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import Card from '@/components/ui/Card';
import { 
  FaPiggyBank, 
  FaHandHoldingUsd, 
  FaChartPie, 
  FaCreditCard,
  FaArrowUp,
  FaPlus,
  FaExchangeAlt
} from 'react-icons/fa';

export default function DashboardPage() {
  const { user } = useAuth();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Morning' : hour < 18 ? 'Afternoon' : 'Evening';

  const stats = [
    { 
      title: 'Total Savings', 
      value: '₦1,250,000', 
      change: '+12.5%', 
      icon: FaPiggyBank, 
      color: 'text-emerald-600 bg-emerald-100' 
    },
    { 
      title: 'Active Loans', 
      value: 'No active loan', 
      change: 'N/A', 
      icon: FaHandHoldingUsd, 
      color: 'text-blue-600 bg-blue-100' 
    },
    { 
      title: 'Shares Value', 
      value: '₦250,000', 
      change: '+5.2%', 
      icon: FaChartPie, 
      color: 'text-purple-600 bg-purple-100' 
    },
    { 
      title: 'Loan Eligibility', 
      value: '₦3,750,000', 
      change: 'Available', 
      icon: FaCreditCard, 
      color: 'text-orange-600 bg-orange-100' 
    },
  ];

  const quickActions = [
    { label: 'Quick Save', icon: FaPiggyBank, color: 'bg-emerald-500', href: '/savings/deposit' },
    { label: 'Request Loan', icon: FaHandHoldingUsd, color: 'bg-blue-500', href: '/loans/apply' },
    { label: 'Pay Loan', icon: FaCreditCard, color: 'bg-purple-500', href: '/loans/repay' },
    { label: 'Transfer', icon: FaExchangeAlt, color: 'bg-orange-500', href: '/transactions/transfer' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Good {greeting}, {user?.firstName}!
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Welcome back to your financial dashboard</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action, index) => (
            <a
              key={index}
              href={action.href}
              className={`${action.color} text-white rounded-xl p-4 flex items-center gap-3 hover:opacity-90 transition-opacity`}
            >
              <action.icon size={20} />
              <span className="text-sm font-medium">{action.label}</span>
            </a>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="p-5">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <span className="text-xs font-medium text-green-600 flex items-center gap-1">
                  <FaArrowUp size={10} />
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-0.5">{stat.title}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts & Activity */}
        <div className="grid lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2 p-5">
            <h3 className="font-semibold text-gray-800 mb-4">Savings Growth</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 text-sm">
              Chart - Savings Trend (6 months)
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Monthly Savings</p>
                    <p className="text-xs text-gray-400">Jun {16 - i}, 2024</p>
                  </div>
                  <span className="text-sm font-semibold text-green-600">+₦50,000</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}