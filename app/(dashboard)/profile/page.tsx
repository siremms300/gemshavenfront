'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/axios';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Avatar from '@/components/shared/Avatar';
import Badge from '@/components/ui/Badge';
import { FaUser, FaUniversity, FaUserFriends, FaLock, FaCamera, FaSave } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(false);
  
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const tabs = [
    { id: 'personal', label: 'Personal Information', icon: FaUser },
    { id: 'bank', label: 'Bank Details', icon: FaUniversity },
    { id: 'kin', label: 'Next of Kin', icon: FaUserFriends },
    { id: 'security', label: 'Security', icon: FaLock },
  ];

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/users/profile', profileData);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Profile Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account information and preferences</p>
        </div>

        {/* Profile Header */}
        <Card>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Avatar name={`${user?.firstName} ${user?.lastName}`} size="xl" />
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white hover:bg-secondary-dark transition">
                <FaCamera size={14} />
              </button>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary">{user?.firstName} {user?.lastName}</h2>
              <div className="flex items-center space-x-3 mt-1">
                <p className="text-gray-600">{user?.memberId}</p>
                <Badge variant={user?.status === 'active' ? 'success' : 'warning'}>
                  {user?.status}
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Card padding="none">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 transition ${
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
            {activeTab === 'personal' && (
              <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleProfileUpdate} className="space-y-6 max-w-2xl">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition"
                    />
                  </div>
                </div>
                <Button type="submit" variant="primary" icon={<FaSave />} loading={loading}>
                  Save Changes
                </Button>
              </motion.form>
            )}

            {activeTab === 'bank' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
                <p className="text-gray-600 text-center py-12">Bank details form coming soon.</p>
              </motion.div>
            )}

            {activeTab === 'kin' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
                <p className="text-gray-600 text-center py-12">Next of kin form coming soon.</p>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md">
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Current Password</label>
                    <input type="password" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition" />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">New Password</label>
                    <input type="password" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition" />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Confirm New Password</label>
                    <input type="password" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition" />
                  </div>
                  <Button variant="primary" icon={<FaLock />}>Change Password</Button>
                </div>
              </motion.div>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}