'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { FaSave, FaCheckCircle, FaDatabase, FaPercentage, FaMoneyBillWave, FaShieldAlt, FaBell } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState('');

  const handleSave = (section: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSaved(section);
      toast.success('Settings saved');
      setTimeout(() => setSaved(''), 2000);
    }, 500);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: FaDatabase },
    { id: 'interestRates', label: 'Interest Rates', icon: FaPercentage },
    { id: 'loanSettings', label: 'Loan Settings', icon: FaMoneyBillWave },
    { id: 'security', label: 'Security', icon: FaShieldAlt },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Settings</h1>
          <p className="text-sm text-gray-500">Configure cooperative settings</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex border-b overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 text-sm whitespace-nowrap transition ${
                  activeTab === tab.id ? 'text-blue-900 border-b-2 border-blue-900 font-medium' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon size={14} />{tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'general' && (
              <div className="max-w-xl space-y-4">
                <div><label className="block text-sm font-medium text-gray-600 mb-1">Cooperative Name</label><input defaultValue="Gems Haven Multipurpose Cooperative Society" className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-600 mb-1">Registration Number</label><input defaultValue="GH/COOP/2024/001" className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-600 mb-1">Contact Email</label><input defaultValue="Gemshaven@consultant.com" className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-600 mb-1">Contact Phone</label><input defaultValue="08029204837" className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
              </div>
            )}

            {activeTab === 'interestRates' && (
              <div className="max-w-xl">
                <h4 className="font-medium text-sm text-gray-700 mb-3">Savings Rates</h4>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {['Regular Savings', 'Fixed Deposit', 'Target Savings', 'Shares'].map((name, i) => (
                    <div key={i}><label className="block text-sm text-gray-600 mb-1">{name} (%)</label><input type="number" defaultValue={[5, 8, 6, 10][i]} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                  ))}
                </div>
                <h4 className="font-medium text-sm text-gray-700 mb-3">Loan Rates</h4>
                <div className="grid grid-cols-2 gap-4">
                  {['Personal', 'Business', 'Emergency', 'Education', 'Asset'].map((name, i) => (
                    <div key={i}><label className="block text-sm text-gray-600 mb-1">{name} Loan (%)</label><input type="number" defaultValue={[12, 15, 8, 10, 18][i]} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'loanSettings' && (
              <div className="max-w-xl grid grid-cols-2 gap-4">
                {[
                  { label: 'Max Loan Multiplier', value: 3 },
                  { label: 'Processing Fee (%)', value: 1.5 },
                  { label: 'Min Loan Amount (₦)', value: 10000 },
                  { label: 'Max Loan Amount (₦)', value: 5000000 },
                ].map((item, i) => (
                  <div key={i}><label className="block text-sm text-gray-600 mb-1">{item.label}</label><input type="number" defaultValue={item.value} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                ))}
              </div>
            )}

            {activeTab === 'security' && (
              <div className="max-w-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div><p className="font-medium text-sm">Two-Factor Authentication</p><p className="text-xs text-gray-500">Require 2FA for admin accounts</p></div>
                  <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" className="sr-only peer" /><div className="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div></label>
                </div>
                {['Session Timeout (min)', 'Max Login Attempts', 'Password Expiry (days)'].map((label, i) => (
                  <div key={i}><label className="block text-sm text-gray-600 mb-1">{label}</label><input type="number" defaultValue={[30, 5, 90][i]} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                ))}
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="max-w-xl space-y-4">
                {['Email Notifications', 'SMS Notifications', 'Loan Reminders', 'Savings Updates'].map((label, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <p className="text-sm">{label}</p>
                    <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" defaultChecked={i < 3} className="sr-only peer" /><div className="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div></label>
                  </div>
                ))}
              </div>
            )}

            {/* Save Button */}
            <div className="flex items-center gap-3 mt-6 pt-4 border-t">
              <button onClick={() => handleSave(activeTab)} disabled={loading} className="px-6 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-light flex items-center gap-2">
                <FaSave size={14} />{loading ? 'Saving...' : 'Save Changes'}
              </button>
              {saved === activeTab && (
                <span className="text-green-600 text-sm flex items-center gap-1"><FaCheckCircle size={14} />Saved</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}