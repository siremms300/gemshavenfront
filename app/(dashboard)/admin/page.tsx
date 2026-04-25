'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import api from '@/lib/axios';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  FaUsers, FaUserPlus, FaPiggyBank, FaHandHoldingUsd,
  FaChartLine, FaArrowUp, FaCheckCircle, FaTimesCircle,
  FaWallet, FaUserFriends, FaBell
} from 'react-icons/fa';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>({
    members: { total: 0, active: 0, pending: 0 },
    savings: { total: 0 },
    loans: { active: 0, totalOutstanding: 0, pending: 0 }
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes] = await Promise.all([api.get('/admin/stats')]);
      setStats(statsRes.data.stats);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Members', value: stats.members.total.toLocaleString(), change: '+12%', icon: FaUsers, color: 'text-blue-600 bg-blue-100', href: '/admin/members' },
    { title: 'Active Members', value: stats.members.active.toLocaleString(), change: '+8%', icon: FaUserFriends, color: 'text-emerald-600 bg-emerald-100', href: '/admin/members?status=active' },
    { title: 'Total Savings', value: `₦${stats.savings.total.toLocaleString()}`, change: '+15%', icon: FaPiggyBank, color: 'text-purple-600 bg-purple-100', href: '/admin/savings' },
    { title: 'Active Loans', value: stats.loans.active.toLocaleString(), change: `₦${stats.loans.totalOutstanding.toLocaleString()}`, icon: FaHandHoldingUsd, color: 'text-orange-600 bg-orange-100', href: '/admin/loans' },
  ];

  const monthlyData = [
    { month: 'Jan', members: 120, savings: 85000000, loans: 45000000 },
    { month: 'Feb', members: 145, savings: 92000000, loans: 52000000 },
    { month: 'Mar', members: 168, savings: 98000000, loans: 58000000 },
    { month: 'Apr', members: 192, savings: 105000000, loans: 65000000 },
    { month: 'May', members: 220, savings: 112000000, loans: 72000000 },
    { month: 'Jun', members: 245, savings: 125000000, loans: 80000000 }
  ];

  const loanDistribution = [
    { name: 'Personal', value: 35, color: '#1a3a5c' },
    { name: 'Business', value: 30, color: '#c4963d' },
    { name: 'Emergency', value: 15, color: '#e8c77a' },
    { name: 'Education', value: 12, color: '#2d5a7b' },
    { name: 'Asset', value: 8, color: '#9e752a' }
  ];

  const pendingApprovals = [
    { id: 1, type: 'member', name: 'John Doe', action: 'Account Verification', time: '2h ago' },
    { id: 2, type: 'loan', name: 'Sarah Johnson', action: 'Loan - ₦500,000', time: '3h ago' },
    { id: 3, type: 'withdrawal', name: 'Michael Okonkwo', action: 'Withdrawal - ₦150,000', time: '5h ago' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Manage cooperative operations</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 bg-white rounded-lg border hover:bg-gray-50">
              <FaBell className="text-gray-500" size={16} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">{pendingApprovals.length}</span>
            </button>
            <Link href="/admin/settings" className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Settings</Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {statCards.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Link href={stat.href} className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${stat.color}`}><stat.icon size={20} /></div>
                  <span className="text-xs font-medium text-green-600 flex items-center gap-1"><FaArrowUp size={10} />{stat.change}</span>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-800 mb-4">Growth Overview</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="members" stroke="#1a3a5c" strokeWidth={2} name="Members" />
                <Line type="monotone" dataKey="savings" stroke="#c4963d" strokeWidth={2} name="Savings" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-800 mb-4">Loan Distribution</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={loanDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={3} dataKey="value">
                  {loanDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {loanDistribution.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />{item.name}</div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-800 mb-4">Pending Approvals</h3>
          <div className="space-y-2">
            {pendingApprovals.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-3">
                  {item.type === 'member' && <FaUserPlus className="text-blue-500" />}
                  {item.type === 'loan' && <FaHandHoldingUsd className="text-green-500" />}
                  {item.type === 'withdrawal' && <FaWallet className="text-orange-500" />}
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-600">{item.action}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{item.time}</span>
                  <button className="p-1.5 bg-green-100 text-green-600 rounded hover:bg-green-200"><FaCheckCircle size={14} /></button>
                  <button className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200"><FaTimesCircle size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}