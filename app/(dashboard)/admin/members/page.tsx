'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import api from '@/lib/axios';
import {
  FaSearch,
  FaFilter,
  FaEye,
  FaEdit,
  FaBan,
  FaCheckCircle,
  FaUserPlus,
  FaDownload,
  FaChevronLeft,
  FaChevronRight,
  FaEnvelope,
  FaPhone,
  FaCalendar
} from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function AdminMembersPage() {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    totalPages: 0,
    limit: 20
  });
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showMemberModal, setShowMemberModal] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, [pagination.page, statusFilter]);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const params: any = { page: pagination.page, limit: pagination.limit };
      if (statusFilter !== 'all') params.status = statusFilter;
      if (searchTerm) params.search = searchTerm;

      const response = await api.get('/admin/members', { params });
      setMembers(response.data.members);
      setPagination({
        ...pagination,
        total: response.data.total,
        totalPages: response.data.totalPages
      });
    } catch (error) {
      console.error('Failed to fetch members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPagination({ ...pagination, page: 1 });
    fetchMembers();
  };

  const handleStatusChange = async (memberId: string, newStatus: string) => {
    try {
      await api.put(`/admin/members/${memberId}/status`, { status: newStatus });
      toast.success(`Member status updated to ${newStatus}`);
      fetchMembers();
    } catch (error) {
      toast.error('Failed to update member status');
    }
  };

  const viewMemberDetails = async (memberId: string) => {
    try {
      const response = await api.get(`/admin/members/${memberId}`);
      setSelectedMember(response.data.member);
      setShowMemberModal(true);
    } catch (error) {
      toast.error('Failed to load member details');
    }
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { color: string; label: string }> = {
      active: { color: 'bg-green-100 text-green-700', label: 'Active' },
      inactive: { color: 'bg-gray-100 text-gray-700', label: 'Inactive' },
      pending: { color: 'bg-yellow-100 text-yellow-700', label: 'Pending' },
      suspended: { color: 'bg-red-100 text-red-700', label: 'Suspended' }
    };
    
    const badge = badges[status] || { color: 'bg-gray-100 text-gray-700', label: status };
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Members</h1>
          <p className="text-gray-600 mt-1">Manage cooperative members and their accounts</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="btn-outline">
            <FaDownload className="mr-2" />
            Export
          </button>
          <Link href="/admin/members/add" className="btn-primary">
            <FaUserPlus className="mr-2" />
            Add Member
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[250px]">
            <label className="input-label">Search</label>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search by name, email, or member ID..."
                className="input-field pl-10"
              />
            </div>
          </div>
          
          <div>
            <label className="input-label">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          
          <button onClick={handleSearch} className="btn-primary">
            Apply Filters
          </button>
        </div>
      </div>

      {/* Members Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Member</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Member ID</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Contact</th>
                <th className="text-right py-4 px-4 text-sm font-semibold text-gray-600">Savings</th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Joined</th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                  </td>
                </tr>
              ) : members.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-500">
                    No members found
                  </td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                          {member.firstName[0]}{member.lastName[0]}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{member.firstName} {member.lastName}</p>
                          <p className="text-xs text-gray-500">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm">{member.memberId}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <p className="text-sm flex items-center text-gray-600">
                          <FaEnvelope className="mr-2 text-gray-400" size={12} />
                          {member.email}
                        </p>
                        <p className="text-sm flex items-center text-gray-600">
                          <FaPhone className="mr-2 text-gray-400" size={12} />
                          {member.phone}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <p className="font-semibold text-primary">
                        ₦{member.totalSavings?.toLocaleString() || '0'}
                      </p>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {getStatusBadge(member.status)}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {new Date(member.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => viewMemberDetails(member.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition"
                          title="View Details"
                        >
                          <FaEye className="text-gray-600" />
                        </button>
                        <Link
                          href={`/admin/members/${member.id}/edit`}
                          className="p-2 hover:bg-gray-100 rounded-lg transition"
                          title="Edit Member"
                        >
                          <FaEdit className="text-blue-600" />
                        </Link>
                        <select
                          value={member.status}
                          onChange={(e) => handleStatusChange(member.id, e.target.value)}
                          className="text-xs border rounded px-2 py-1"
                        >
                          <option value="active">Active</option>
                          <option value="pending">Pending</option>
                          <option value="inactive">Inactive</option>
                          <option value="suspended">Suspended</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
              {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} members
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                disabled={pagination.page === 1}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition flex items-center"
              >
                <FaChevronLeft className="mr-2" size={12} />
                Previous
              </button>
              <button
                onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                disabled={pagination.page === pagination.totalPages}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition flex items-center"
              >
                Next
                <FaChevronRight className="ml-2" size={12} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Member Details Modal */}
      {showMemberModal && selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-primary">Member Details</h3>
              <button
                onClick={() => setShowMemberModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold">
                  {selectedMember.firstName[0]}{selectedMember.lastName[0]}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-primary">
                    {selectedMember.firstName} {selectedMember.lastName}
                  </h4>
                  <p className="text-gray-600">{selectedMember.memberId}</p>
                  <p className="text-sm text-gray-500">{selectedMember.email}</p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{selectedMember.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium">
                    {selectedMember.dateOfBirth ? new Date(selectedMember.dateOfBirth).toLocaleDateString() : 'Not provided'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Occupation</p>
                  <p className="font-medium">{selectedMember.occupation || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Monthly Income</p>
                  <p className="font-medium">
                    {selectedMember.monthlyIncome ? `₦${selectedMember.monthlyIncome.toLocaleString()}` : 'Not provided'}
                  </p>
                </div>
              </div>

              {/* Address */}
              {selectedMember.address && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Address</p>
                  <p className="text-gray-700">
                    {selectedMember.address.street}<br />
                    {selectedMember.address.city}, {selectedMember.address.state}<br />
                    {selectedMember.address.country}
                  </p>
                </div>
              )}

              {/* Bank Details */}
              {selectedMember.bankDetails && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Bank Details</p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p><span className="font-medium">Bank:</span> {selectedMember.bankDetails.bankName}</p>
                    <p><span className="font-medium">Account:</span> {selectedMember.bankDetails.accountNumber}</p>
                    <p><span className="font-medium">Name:</span> {selectedMember.bankDetails.accountName}</p>
                  </div>
                </div>
              )}

              {/* Financial Summary */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Financial Summary</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-green-700">
                      ₦{selectedMember.totalSavings?.toLocaleString() || '0'}
                    </p>
                    <p className="text-xs text-green-600">Total Savings</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-blue-700">
                      ₦{selectedMember.loanEligibility?.toLocaleString() || '0'}
                    </p>
                    <p className="text-xs text-blue-600">Loan Eligibility</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-purple-700">
                      {selectedMember.totalShares || '0'}
                    </p>
                    <p className="text-xs text-purple-600">Shares</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowMemberModal(false)}
                className="btn-outline"
              >
                Close
              </button>
              <Link
                href={`/admin/members/${selectedMember.id}/edit`}
                className="btn-primary"
              >
                Edit Member
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}