'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '@/lib/axios';
import {
  FaSave,
  FaPercentage,
  FaMoneyBillWave,
  FaClock,
  FaShieldAlt,
  FaBell,
  FaEnvelope,
  FaDatabase,
  FaCheckCircle
} from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      cooperativeName: 'Gems Haven Multipurpose Cooperative Society',
      registrationNumber: 'GH/COOP/2024/001',
      contactEmail: 'Gemshaven@consultant.com',
      contactPhone: '08029204837',
      address: '123 Cooperative Avenue, Victoria Island, Lagos'
    },
    interestRates: {
      regularSavings: 5,
      fixedDeposit: 8,
      targetSavings: 6,
      shares: 10,
      personalLoan: 12,
      businessLoan: 15,
      emergencyLoan: 8,
      educationLoan: 10,
      assetFinancing: 18
    },
    loanSettings: {
      maxLoanMultiplier: 3,
      minLoanAmount: 10000,
      maxLoanAmount: 5000000,
      minTenure: 1,
      maxTenure: 60,
      processingFee: 1.5
    },
    fees: {
      membershipFee: 1000,
      minimumDeposit: 5000,
      withdrawalFee: 100,
      latePaymentFee: 500,
      earlyWithdrawalPenalty: 2
    },
    security: {
      requireTwoFactor: false,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      passwordExpiryDays: 90
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      loanReminders: true,
      savingsUpdates: true,
      promotionalEmails: false
    }
  });

  const [saveSuccess, setSaveSuccess] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await api.get('/admin/settings');
      setSettings(response.data.settings);
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    }
  };

  const handleSave = async (section: string) => {
    setLoading(true);
    try {
      await api.put('/admin/settings', {
        section,
        data: settings[section as keyof typeof settings]
      });
      
      setSaveSuccess({ ...saveSuccess, [section]: true });
      toast.success('Settings saved successfully');
      
      setTimeout(() => {
        setSaveSuccess({ ...saveSuccess, [section]: false });
      }, 3000);
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: FaDatabase },
    { id: 'interestRates', label: 'Interest Rates', icon: FaPercentage },
    { id: 'loanSettings', label: 'Loan Settings', icon: FaMoneyBillWave },
    { id: 'fees', label: 'Fees & Charges', icon: FaMoneyBillWave },
    { id: 'security', label: 'Security', icon: FaShieldAlt },
    { id: 'notifications', label: 'Notifications', icon: FaBell }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Settings</h1>
        <p className="text-gray-600 mt-1">Configure cooperative settings and preferences</p>
      </div>

      {/* Tabs */}
      <div className="card p-0 overflow-hidden">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 max-w-2xl"
            >
              <div>
                <label className="input-label">Cooperative Name</label>
                <input
                  type="text"
                  value={settings.general.cooperativeName}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, cooperativeName: e.target.value }
                  })}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="input-label">Registration Number</label>
                <input
                  type="text"
                  value={settings.general.registrationNumber}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, registrationNumber: e.target.value }
                  })}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="input-label">Contact Email</label>
                <input
                  type="email"
                  value={settings.general.contactEmail}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, contactEmail: e.target.value }
                  })}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="input-label">Contact Phone</label>
                <input
                  type="text"
                  value={settings.general.contactPhone}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, contactPhone: e.target.value }
                  })}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="input-label">Address</label>
                <textarea
                  value={settings.general.address}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, address: e.target.value }
                  })}
                  className="input-field"
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                {saveSuccess.general && (
                  <span className="text-green-600 flex items-center">
                    <FaCheckCircle className="mr-2" />
                    Saved successfully
                  </span>
                )}
                <button
                  onClick={() => handleSave('general')}
                  disabled={loading}
                  className="btn-primary ml-auto"
                >
                  <FaSave className="mr-2" />
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}

          {/* Interest Rates */}
          {activeTab === 'interestRates' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 max-w-2xl"
            >
              <h3 className="text-lg font-semibold text-primary mb-4">Savings Interest Rates</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Regular Savings (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.interestRates.regularSavings}
                    onChange={(e) => setSettings({
                      ...settings,
                      interestRates: { ...settings.interestRates, regularSavings: parseFloat(e.target.value) }
                    })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">Fixed Deposit (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.interestRates.fixedDeposit}
                    onChange={(e) => setSettings({
                      ...settings,
                      interestRates: { ...settings.interestRates, fixedDeposit: parseFloat(e.target.value) }
                    })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">Target Savings (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.interestRates.targetSavings}
                    onChange={(e) => setSettings({
                      ...settings,
                      interestRates: { ...settings.interestRates, targetSavings: parseFloat(e.target.value) }
                    })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">Shares Dividend (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.interestRates.shares}
                    onChange={(e) => setSettings({
                      ...settings,
                      interestRates: { ...settings.interestRates, shares: parseFloat(e.target.value) }
                    })}
                    className="input-field"
                  />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-primary mb-4 mt-6">Loan Interest Rates</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Personal Loan (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.interestRates.personalLoan}
                    onChange={(e) => setSettings({
                      ...settings,
                      interestRates: { ...settings.interestRates, personalLoan: parseFloat(e.target.value) }
                    })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">Business Loan (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.interestRates.businessLoan}
                    onChange={(e) => setSettings({
                      ...settings,
                      interestRates: { ...settings.interestRates, businessLoan: parseFloat(e.target.value) }
                    })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">Emergency Loan (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.interestRates.emergencyLoan}
                    onChange={(e) => setSettings({
                      ...settings,
                      interestRates: { ...settings.interestRates, emergencyLoan: parseFloat(e.target.value) }
                    })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">Education Loan (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.interestRates.educationLoan}
                    onChange={(e) => setSettings({
                      ...settings,
                      interestRates: { ...settings.interestRates, educationLoan: parseFloat(e.target.value) }
                    })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">Asset Financing (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.interestRates.assetFinancing}
                    onChange={(e) => setSettings({
                      ...settings,
                      interestRates: { ...settings.interestRates, assetFinancing: parseFloat(e.target.value) }
                    })}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                {saveSuccess.interestRates && (
                  <span className="text-green-600 flex items-center">
                    <FaCheckCircle className="mr-2" />
                    Saved successfully
                  </span>
                )}
                <button
                  onClick={() => handleSave('interestRates')}
                  disabled={loading}
                  className="btn-primary ml-auto"
                >
                  <FaSave className="mr-2" />
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}

          {/* Loan Settings */}
          {activeTab === 'loanSettings' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 max-w-2xl"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Max Loan Multiplier (x savings)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={settings.loanSettings.maxLoanMultiplier}
                    onChange={(e) => setSettings({
                      ...settings,
                      loanSettings: { ...settings.loanSettings, maxLoanMultiplier: parseFloat(e.target.value) }
                    })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">Processing Fee (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.loanSettings.processingFee}
                    onChange={(e) => setSettings({
                      ...settings,
                      loanSettings: { ...settings.loanSettings, processingFee: parseFloat(e.target.value) }
                    })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">Minimum Loan Amount (₦)</label>
                  <input
                    type="number"
                    value={settings.loanSettings.minLoanAmount}
                    onChange={(e) => setSettings({
                      ...settings,
                      loanSettings: { ...settings.loanSettings, minLoanAmount: parseInt(e.target.value) }
                    })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">Maximum Loan Amount (₦)</label>
                  <input
                    type="number"
                    value={settings.loanSettings.maxLoanAmount}
                    onChange={(e) => setSettings({
                      ...settings,
                      loanSettings: { ...settings.loanSettings, maxLoanAmount: parseInt(e.target.value) }
                    })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">Minimum Tenure (months)</label>
                  <input
                    type="number"
                    value={settings.loanSettings.minTenure}
                    onChange={(e) => setSettings({
                      ...settings,
                      loanSettings: { ...settings.loanSettings, minTenure: parseInt(e.target.value) }
                    })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">Maximum Tenure (months)</label>
                  <input
                    type="number"
                    value={settings.loanSettings.maxTenure}
                    onChange={(e) => setSettings({
                      ...settings,
                      loanSettings: { ...settings.loanSettings, maxTenure: parseInt(e.target.value) }
                    })}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                {saveSuccess.loanSettings && (
                  <span className="text-green-600 flex items-center">
                    <FaCheckCircle className="mr-2" />
                    Saved successfully
                  </span>
                )}
                <button
                  onClick={() => handleSave('loanSettings')}
                  disabled={loading}
                  className="btn-primary ml-auto"
                >
                  <FaSave className="mr-2" />
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}

          {/* Fees */}
          {activeTab === 'fees' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 max-w-2xl"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Membership Fee (₦)</label>
                  <input
                    type="number"
                    value={settings.fees.membershipFee}
                    onChange={(e) => setSettings({
                      ...settings,
                      fees: { ...settings.fees, membershipFee: parseInt(e.target.value) }
                    })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">Minimum Deposit (₦)</label>
                  <input
                    type="number"
                    value={settings.fees.minimumDeposit}
                    onChange={(e) => setSettings({
                      ...settings,
                      fees: { ...settings.fees, minimumDeposit: parseInt(e.target.value) }
                    })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">Withdrawal Fee (₦)</label>
                  <input
                    type="number"
                    value={settings.fees.withdrawalFee}
                    onChange={(e) => setSettings({
                      ...settings,
                      fees: { ...settings.fees, withdrawalFee: parseInt(e.target.value) }
                    })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">Late Payment Fee (₦)</label>
                  <input
                    type="number"
                    value={settings.fees.latePaymentFee}
                    onChange={(e) => setSettings({
                      ...settings,
                      fees: { ...settings.fees, latePaymentFee: parseInt(e.target.value) }
                    })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">Early Withdrawal Penalty (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.fees.earlyWithdrawalPenalty}
                    onChange={(e) => setSettings({
                      ...settings,
                      fees: { ...settings.fees, earlyWithdrawalPenalty: parseFloat(e.target.value) }
                    })}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                {saveSuccess.fees && (
                  <span className="text-green-600 flex items-center">
                    <FaCheckCircle className="mr-2" />
                    Saved successfully
                  </span>
                )}
                <button
                  onClick={() => handleSave('fees')}
                  disabled={loading}
                  className="btn-primary ml-auto"
                >
                  <FaSave className="mr-2" />
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 max-w-2xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">Require 2FA for all admin accounts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.security.requireTwoFactor}
                      onChange={(e) => setSettings({
                        ...settings,
                        security: { ...settings.security, requireTwoFactor: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div>
                  <label className="input-label">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
                    })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="input-label">Max Login Attempts</label>
                  <input
                    type="number"
                    value={settings.security.maxLoginAttempts}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: { ...settings.security, maxLoginAttempts: parseInt(e.target.value) }
                    })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="input-label">Password Expiry (days)</label>
                  <input
                    type="number"
                    value={settings.security.passwordExpiryDays}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: { ...settings.security, passwordExpiryDays: parseInt(e.target.value) }
                    })}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                {saveSuccess.security && (
                  <span className="text-green-600 flex items-center">
                    <FaCheckCircle className="mr-2" />
                    Saved successfully
                  </span>
                )}
                <button
                  onClick={() => handleSave('security')}
                  disabled={loading}
                  className="btn-primary ml-auto"
                >
                  <FaSave className="mr-2" />
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 max-w-2xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Email Notifications</p>
                    <p className="text-sm text-gray-500">Send notifications via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.emailNotifications}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, emailNotifications: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">SMS Notifications</p>
                    <p className="text-sm text-gray-500">Send notifications via SMS</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.smsNotifications}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, smsNotifications: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Loan Reminders</p>
                    <p className="text-sm text-gray-500">Send payment due reminders</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.loanReminders}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, loanReminders: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Savings Updates</p>
                    <p className="text-sm text-gray-500">Send savings and interest updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.savingsUpdates}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, savingsUpdates: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Promotional Emails</p>
                    <p className="text-sm text-gray-500">Send marketing and promotional emails</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.promotionalEmails}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, promotionalEmails: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                {saveSuccess.notifications && (
                  <span className="text-green-600 flex items-center">
                    <FaCheckCircle className="mr-2" />
                    Saved successfully
                  </span>
                )}
                <button
                  onClick={() => handleSave('notifications')}
                  disabled={loading}
                  className="btn-primary ml-auto"
                >
                  <FaSave className="mr-2" />
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}