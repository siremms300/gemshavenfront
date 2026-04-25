'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import api from '@/lib/axios';
import {
  FaUsers,
  FaUserPlus,
  FaPiggyBank,
  FaHandHoldingUsd,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaWallet,
  FaCreditCard,
  FaUserFriends,
  FaCalendar,
  FaBell
} from 'react-icons/fa';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>({
    members: { total: 0, active: 0, pending: 0 },
    savings: { total: 0 },
    loans: { active: 0, totalOutstanding: 0, pending: 0 }
  });
  const [activities, setActivities] = useState<any>({
    recentMembers: [],
    recentSavings: [],
    recentLoans: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, activitiesRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/recent-activities')
      ]);
      setStats(statsRes.data.stats);
      setActivities(activitiesRes.data.activities);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Members',
      value: stats.members.total.toLocaleString(),
      change: '+12%',
      increase: true,
      icon: FaUsers,
      color: 'from-blue-500 to-cyan-500',
      link: '/admin/members'
    },
    {
      title: 'Active Members',
      value: stats.members.active.toLocaleString(),
      change: '+8%',
      increase: true,
      icon: FaUserFriends,
      color: 'from-emerald-500 to-green-500',
      link: '/admin/members?status=active'
    },
    {
      title: 'Total Savings',
      value: `₦${stats.savings.total.toLocaleString()}`,
      change: '+15%',
      increase: true,
      icon: FaPiggyBank,
      color: 'from-purple-500 to-pink-500',
      link: '/admin/savings'
    },
    {
      title: 'Active Loans',
      value: stats.loans.active.toLocaleString(),
      change: '₦' + stats.loans.totalOutstanding.toLocaleString(),
      increase: false,
      icon: FaHandHoldingUsd,
      color: 'from-orange-500 to-red-500',
      link: '/admin/loans'
    }
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
    { id: 1, type: 'member', name: 'John Doe', action: 'Account Verification', time: '2 hours ago' },
    { id: 2, type: 'loan', name: 'Sarah Johnson', action: 'Loan Application - ₦500,000', time: '3 hours ago' },
    { id: 3, type: 'withdrawal', name: 'Michael Okonkwo', action: 'Withdrawal - ₦150,000', time: '5 hours ago' },
    { id: 4, type: 'member', name: 'Grace Adeyemi', action: 'Account Verification', time: '1 day ago' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage members, savings, loans, and cooperative operations</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="relative p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition">
            <FaBell className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {pendingApprovals.length}
            </span>
          </button>
          <Link href="/admin/settings" className="btn-outline">
            Settings
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={stat.link} className="stat-card block">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                  <stat.icon className="text-xl" />
                </div>
                <div className={`flex items-center text-sm ${stat.increase ? 'text-green-600' : 'text-blue-600'}`}>
                  {stat.increase ? <FaArrowUp className="mr-1" /> : <FaChartLine className="mr-1" />}
                  {stat.change}
                </div>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.title}</div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Growth Chart */}
        <div className="lg:col-span-2 card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-primary">Growth Overview</h3>
            <select className="px-3 py-1 border rounded-lg text-sm">
              <option>Last 6 Months</option>
              <option>Last Year</option>
              <option>All Time</option>
            </select>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis yAxisId="left" stroke="#1a3a5c" />
              <YAxis yAxisId="right" orientation="right" stroke="#c4963d" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
              />
              <Line yAxisId="left" type="monotone" dataKey="members" stroke="#1a3a5c" strokeWidth={2} name="Members" />
              <Line yAxisId="right" type="monotone" dataKey="savings" stroke="#c4963d" strokeWidth={2} name="Savings (₦)" />
              <Line yAxisId="right" type="monotone" dataKey="loans" stroke="#e8c77a" strokeWidth={2} name="Loans (₦)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Loan Distribution */}
        <div className="card">
          <h3 className="text-lg font-bold mb-6 text-primary">Loan Distribution</h3>
          
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={loanDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {loanDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="mt-4 space-y-2">
            {loanDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-semibold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities & Pending Approvals */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Members */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-primary">Recent Members</h3>
            <Link href="/admin/members" className="text-sm text-secondary hover:text-primary transition">
              View All →
            </Link>
          </div>
          
          <div className="space-y-3">
            {activities.recentMembers.map((member: any) => (
              <div key={member.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                    {member.firstName[0]}{member.lastName[0]}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{member.firstName} {member.lastName}</p>
                    <p className="text-xs text-gray-500">{member.memberId}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                    member.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {member.status}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(member.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-primary">Pending Approvals</h3>
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
              {pendingApprovals.length} Pending
            </span>
          </div>
          
          <div className="space-y-3">
            {pendingApprovals.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-3">
                  {item.type === 'member' && <FaUserPlus className="text-blue-500" />}
                  {item.type === 'loan' && <FaHandHoldingUsd className="text-green-500" />}
                  {item.type === 'withdrawal' && <FaWallet className="text-orange-500" />}
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.action}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">{item.time}</span>
                  <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition">
                    <FaCheckCircle size={16} />
                  </button>
                  <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">
                    <FaTimesCircle size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {pendingApprovals.length === 0 && (
            <div className="text-center py-8">
              <FaCheckCircle className="text-4xl text-green-500 mx-auto mb-3" />
              <p className="text-gray-600">No pending approvals</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-bold text-primary mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/admin/members/add" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition text-center">
            <FaUserPlus className="text-2xl text-primary mx-auto mb-2" />
            <span className="text-sm font-medium">Add Member</span>
          </Link>
          <Link href="/admin/loans/review" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition text-center">
            <FaHandHoldingUsd className="text-2xl text-primary mx-auto mb-2" />
            <span className="text-sm font-medium">Review Loans</span>
          </Link>
          <Link href="/admin/withdrawals" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition text-center">
            <FaWallet className="text-2xl text-primary mx-auto mb-2" />
            <span className="text-sm font-medium">Process Withdrawals</span>
          </Link>
          <Link href="/admin/reports" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition text-center">
            <FaChartLine className="text-2xl text-primary mx-auto mb-2" />
            <span className="text-sm font-medium">Generate Reports</span>
          </Link>
        </div>
      </div>
    </div>
  );
}