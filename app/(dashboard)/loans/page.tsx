'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import api from '@/lib/axios';
import { formatCurrency, calculateLoanRepayment } from '@/lib/utils';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import Badge from '@/components/ui/Badge';
import { FaHandHoldingUsd, FaPlus, FaCalculator, FaChartLine, FaCalendar } from 'react-icons/fa';

export default function LoansPage() {
  const [loading, setLoading] = useState(true);
  const [activeLoans, setActiveLoans] = useState<any[]>([]);
  const [eligibility, setEligibility] = useState<any>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorData, setCalculatorData] = useState({ amount: 100000, tenure: 12, interestRate: 12 });

  useEffect(() => {
    fetchLoans();
    fetchEligibility();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await api.get('/loans/active');
      setActiveLoans(response.data.loans);
    } catch (error) {
      console.error('Failed to fetch loans:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEligibility = async () => {
    try {
      const response = await api.get('/loans/eligibility');
      setEligibility(response.data.eligibility);
    } catch (error) {
      console.error('Failed to fetch eligibility:', error);
    }
  };

  const calculation = calculateLoanRepayment(calculatorData.amount, calculatorData.tenure, calculatorData.interestRate);

  const loanTypes = [
    { id: 'personal', name: 'Personal Loan', icon: '👤', interestRate: 12, maxAmount: 1000000, maxTenure: 24, description: 'For personal expenses and emergencies' },
    { id: 'business', name: 'Business Loan', icon: '💼', interestRate: 15, maxAmount: 5000000, maxTenure: 36, description: 'Grow your business with flexible financing' },
    { id: 'emergency', name: 'Emergency Loan', icon: '🚨', interestRate: 8, maxAmount: 500000, maxTenure: 12, description: 'Quick access to funds for urgent needs' },
    { id: 'education', name: 'Education Loan', icon: '📚', interestRate: 10, maxAmount: 2000000, maxTenure: 48, description: 'Invest in your education and skills' },
    { id: 'asset', name: 'Asset Financing', icon: '🏠', interestRate: 18, maxAmount: 10000000, maxTenure: 60, description: 'Acquire assets for personal or business use' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary">Loans</h1>
            <p className="text-gray-600 mt-1">Apply for loans and manage your repayments</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" icon={<FaCalculator />} onClick={() => setShowCalculator(true)}>
              Calculator
            </Button>
            <Link href="/loans/apply">
              <Button variant="primary" icon={<FaPlus />}>Apply for Loan</Button>
            </Link>
          </div>
        </div>

        {/* Eligibility Card */}
        {eligibility && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-8 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 mb-2">Your Loan Eligibility</p>
                <h2 className="text-4xl lg:text-5xl font-bold">{formatCurrency(eligibility.maxAmount)}</h2>
                <div className="flex items-center mt-4 space-x-4">
                  <div className="flex items-center text-white/80">
                    <FaChartLine className="mr-2" />
                    <span>Based on your savings</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <FaCalendar className="mr-2" />
                    <span>Member since {new Date(eligibility.memberSince).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <FaHandHoldingUsd className="text-8xl text-white/20 hidden lg:block" />
            </div>
          </motion.div>
        )}

        {/* Active Loans */}
        {activeLoans.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-primary mb-4">Active Loans</h2>
            <div className="grid gap-4">
              {activeLoans.map((loan) => (
                <motion.div key={loan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <Card>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                          <FaHandHoldingUsd className="text-2xl" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">{loan.loanType} Loan</h3>
                          <p className="text-sm text-gray-500">Applied: {new Date(loan.applicationDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-500">Outstanding</p>
                          <p className="font-bold text-primary">{formatCurrency(loan.outstandingBalance)}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500">Progress</p>
                          <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                            <div className="h-full bg-secondary rounded-full" style={{ width: `${(loan.amountPaid / loan.totalRepayment) * 100}%` }} />
                          </div>
                        </div>
                      </div>
                      <Link href={`/loans/${loan.id}`}>
                        <Button variant="outline" size="sm">View Details</Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Loan Types */}
        <div>
          <h2 className="text-xl font-bold text-primary mb-4">Available Loan Types</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loanTypes.map((loan, index) => (
              <motion.div key={loan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                <Card hover>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{loan.icon}</span>
                      <div>
                        <h3 className="font-bold text-primary">{loan.name}</h3>
                        <p className="text-xs text-gray-500">{loan.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Interest Rate:</span>
                      <Badge variant="secondary">{loan.interestRate}% p.a.</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Max Amount:</span>
                      <span className="font-semibold">{formatCurrency(loan.maxAmount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Max Tenure:</span>
                      <span className="font-semibold">{loan.maxTenure} months</span>
                    </div>
                  </div>
                  <Link href={`/loans/apply?type=${loan.id}`}>
                    <Button variant="primary" size="sm" fullWidth>Apply Now</Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Loan Calculator Modal */}
        <Modal
          isOpen={showCalculator}
          onClose={() => setShowCalculator(false)}
          title="Loan Calculator"
          footer={
            <>
              <Button variant="outline" onClick={() => setShowCalculator(false)}>Close</Button>
              <Link href={`/loans/apply?amount=${calculatorData.amount}&tenure=${calculatorData.tenure}`}>
                <Button variant="primary">Apply with these terms</Button>
              </Link>
            </>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-medium text-gray-700">Loan Amount (₦)</label>
              <input
                type="number"
                value={calculatorData.amount}
                onChange={(e) => setCalculatorData({ ...calculatorData, amount: Number(e.target.value) })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Tenure (Months)</label>
              <select
                value={calculatorData.tenure}
                onChange={(e) => setCalculatorData({ ...calculatorData, tenure: Number(e.target.value) })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition"
              >
                {[3, 6, 12, 18, 24, 36, 48, 60].map(m => (
                  <option key={m} value={m}>{m} months</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Interest Rate (%)</label>
              <input
                type="number"
                value={calculatorData.interestRate}
                onChange={(e) => setCalculatorData({ ...calculatorData, interestRate: Number(e.target.value) })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition"
              />
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <div className="flex justify-between mb-2">
                <span>Monthly Payment:</span>
                <span className="font-bold text-primary">{formatCurrency(calculation.monthlyPayment)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Total Interest:</span>
                <span className="font-bold text-secondary">{formatCurrency(calculation.totalInterest)}</span>
              </div>
              <div className="flex justify-between text-lg pt-2 border-t">
                <span>Total Repayment:</span>
                <span className="font-bold text-primary">{formatCurrency(calculation.totalRepayment)}</span>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}