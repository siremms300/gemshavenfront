'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '@/lib/axios';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import { FaArrowUp, FaArrowDown, FaPiggyBank, FaChartPie, FaCreditCard, FaDownload, FaSearch } from 'react-icons/fa';

export default function TransactionsPage() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 0 });

  useEffect(() => {
    fetchTransactions();
  }, [pagination.page]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/savings/transactions?page=${pagination.page}&limit=20`);
      setTransactions(response.data.transactions);
      setPagination({
        page: response.data.page,
        total: response.data.total,
        totalPages: response.data.totalPages
      });
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit': return <FaArrowDown className="text-green-600" />;
      case 'withdrawal': return <FaArrowUp className="text-red-600" />;
      case 'loan_payment': return <FaCreditCard className="text-blue-600" />;
      case 'interest': return <FaChartPie className="text-purple-600" />;
      default: return <FaPiggyBank className="text-gray-600" />;
    }
  };

  const columns = [
    {
      key: 'date',
      header: 'Date',
      render: (value: string) => (
        <div>
          <p className="text-sm text-gray-800">{formatDateTime(value)}</p>
        </div>
      )
    },
    {
      key: 'type',
      header: 'Type',
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          {getTransactionIcon(value)}
          <span className="text-sm capitalize">{value.replace('_', ' ')}</span>
        </div>
      )
    },
    {
      key: 'description',
      header: 'Description',
    },
    {
      key: 'amount',
      header: 'Amount',
      align: 'right' as const,
      render: (value: number, row: any) => (
        <span className={`font-semibold ${row.type === 'deposit' || row.type === 'interest' ? 'text-green-600' : 'text-red-600'}`}>
          {row.type === 'deposit' || row.type === 'interest' ? '+' : '-'}
          {formatCurrency(Math.abs(value))}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      align: 'center' as const,
      render: (value: string) => (
        <Badge variant={value === 'completed' ? 'success' : value === 'pending' ? 'warning' : 'danger'}>
          {value}
        </Badge>
      )
    },
  ];

  const summary = {
    totalDeposits: transactions.filter(t => t.type === 'deposit').reduce((sum, t) => sum + t.amount, 0),
    totalWithdrawals: transactions.filter(t => t.type === 'withdrawal').reduce((sum, t) => sum + Math.abs(t.amount), 0),
    totalInterest: transactions.filter(t => t.type === 'interest').reduce((sum, t) => sum + t.amount, 0),
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary">Transactions</h1>
            <p className="text-gray-600 mt-1">View and manage your transaction history</p>
          </div>
          <Button variant="outline" icon={<FaDownload />}>Export</Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Total Deposits', value: formatCurrency(summary.totalDeposits), icon: FaArrowDown, color: 'text-green-600 bg-green-100' },
            { label: 'Total Withdrawals', value: formatCurrency(summary.totalWithdrawals), icon: FaArrowUp, color: 'text-red-600 bg-red-100' },
            { label: 'Interest Earned', value: formatCurrency(summary.totalInterest), icon: FaChartPie, color: 'text-purple-600 bg-purple-100' },
          ].map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">{item.label}</p>
                    <p className="text-2xl font-bold mt-1">{item.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}>
                    <item.icon className="text-xl" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <Card>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block mb-2 font-medium text-gray-700">Search</label>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search transactions..."
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition"
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition"
              >
                <option value="all">All Types</option>
                <option value="deposit">Deposit</option>
                <option value="withdrawal">Withdrawal</option>
                <option value="loan_payment">Loan Payment</option>
                <option value="interest">Interest</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Transactions Table */}
        <Card>
          <Table
            columns={columns}
            data={transactions}
            loading={loading}
            emptyMessage="No transactions found"
            striped
            hoverable
          />
        </Card>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page === 1}
              onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
            >
              Previous
            </Button>
            <span className="flex items-center px-4 text-sm text-gray-600">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page === pagination.totalPages}
              onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}