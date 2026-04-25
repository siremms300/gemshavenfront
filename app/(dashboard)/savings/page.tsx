'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import api from '@/lib/axios';
import { formatCurrency } from '@/lib/utils';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import Badge from '@/components/ui/Badge';
import {
  FaPiggyBank,
  FaPlus,
  FaChartLine,
  FaPercentage,
  FaWallet,
  FaDownload,
  FaEye,
} from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function SavingsPage() {
  const [loading, setLoading] = useState(true);
  const [savings, setSavings] = useState<any[]>([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [selectedSavings, setSelectedSavings] = useState('');

  useEffect(() => {
    fetchSavings();
  }, []);

  const fetchSavings = async () => {
    try {
      const response = await api.get('/savings/balance');
      setSavings(response.data.savings);
      setTotalBalance(response.data.totalBalance);
    } catch (error) {
      console.error('Failed to fetch savings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeposit = async () => {
    if (!depositAmount || !selectedSavings) {
      toast.error('Please fill all fields');
      return;
    }
    try {
      await api.post('/savings/deposit', {
        amount: parseFloat(depositAmount),
        savingsType: selectedSavings
      });
      toast.success('Deposit successful!');
      setShowDepositModal(false);
      setDepositAmount('');
      setSelectedSavings('');
      fetchSavings();
    } catch (error) {
      toast.error('Deposit failed');
    }
  };

  const savingsPlans = [
    { id: 'regular', name: 'Regular Savings', description: 'Flexible savings with easy access', interestRate: 5, minBalance: 1000, color: '#1a3a5c' },
    { id: 'fixed', name: 'Fixed Deposit', description: 'Lock funds for higher returns', interestRate: 8, minBalance: 50000, color: '#c4963d' },
    { id: 'target', name: 'Target Savings', description: 'Save towards specific goals', interestRate: 6, minBalance: 5000, color: '#e8c77a' },
    { id: 'shares', name: 'Cooperative Shares', description: 'Become a shareholder', interestRate: 10, minBalance: 10000, color: '#2d5a7b' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary">Savings</h1>
            <p className="text-gray-600 mt-1">Manage your savings and watch your money grow</p>
          </div>
          <Button variant="primary" icon={<FaPlus />} onClick={() => setShowDepositModal(true)}>
            Make Deposit
          </Button>
        </div>

        {/* Total Balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-8 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 mb-2">Total Savings Balance</p>
              <h2 className="text-4xl lg:text-5xl font-bold">{formatCurrency(totalBalance)}</h2>
              <div className="flex items-center mt-4 space-x-4">
                <div className="flex items-center text-white/80">
                  <FaChartLine className="mr-2" />
                  <span>+12.5% this year</span>
                </div>
                <div className="flex items-center text-white/80">
                  <FaPercentage className="mr-2" />
                  <span>Avg. Interest: 7.2%</span>
                </div>
              </div>
            </div>
            <FaPiggyBank className="text-8xl text-white/20 hidden lg:block" />
          </div>
        </motion.div>

        {/* Savings Plans */}
        <div className="grid md:grid-cols-2 gap-6">
          {savingsPlans.map((plan, index) => {
            const existingSavings = savings.find(s => s.savingsType === plan.id);
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: plan.color + '20', color: plan.color }}>
                        <FaPiggyBank className="text-2xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-primary">{plan.name}</h3>
                        <p className="text-sm text-gray-500">{plan.description}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{plan.interestRate}% p.a.</Badge>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Current Balance</span>
                      <span className="font-bold text-primary">
                        {formatCurrency(existingSavings?.balance || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest Earned</span>
                      <span className="font-bold text-green-600">
                        {formatCurrency(existingSavings?.accruedInterest || 0)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setSelectedSavings(plan.id);
                        setShowDepositModal(true);
                      }}
                    >
                      Deposit
                    </Button>
                    <Link href={`/savings/${plan.id}`} className="flex-1">
                      <Button variant="outline" size="sm" fullWidth>
                        <FaEye className="mr-2" />
                        Details
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Deposit Modal */}
        <Modal
          isOpen={showDepositModal}
          onClose={() => setShowDepositModal(false)}
          title="Make a Deposit"
          footer={
            <>
              <Button variant="outline" onClick={() => setShowDepositModal(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleDeposit}>Proceed to Payment</Button>
            </>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-medium text-gray-700">Select Savings Plan</label>
              <select
                value={selectedSavings}
                onChange={(e) => setSelectedSavings(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition"
              >
                <option value="">Choose a plan</option>
                {savingsPlans.map(plan => (
                  <option key={plan.id} value={plan.id}>{plan.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Amount (₦)</label>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition"
                placeholder="Enter amount"
              />
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">You will be redirected to Paystack to complete your payment securely.</p>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}