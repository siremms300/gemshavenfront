'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import api from '@/lib/axios';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { FaSearch, FaEye, FaEdit, FaUserPlus, FaDownload, FaChevronLeft, FaChevronRight, FaEnvelope, FaPhone } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function AdminMembersPage() {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 0, limit: 20 });
  const [selectedMember, setSelectedMember] = useState<any>(null);

  useEffect(() => { fetchMembers(); }, [pagination.page, statusFilter]);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const params: any = { page: pagination.page, limit: pagination.limit };
      if (statusFilter !== 'all') params.status = statusFilter;
      if (searchTerm) params.search = searchTerm;
      const response = await api.get('/admin/members', { params });
      setMembers(response.data.members);
      setPagination(prev => ({ ...prev, total: response.data.total, totalPages: response.data.totalPages }));
    } catch (error) { console.error('Failed to fetch members:', error); }
    finally { setLoading(false); }
  };

  const handleStatusChange = async (memberId: string, newStatus: string) => {
    try {
      await api.put(`/admin/members/${memberId}/status`, { status: newStatus });
      toast.success(`Status updated to ${newStatus}`);
      fetchMembers();
    } catch (error) { toast.error('Failed to update status'); }
  };

  const viewMember = async (memberId: string) => {
    try {
      const response = await api.get(`/admin/members/${memberId}`);
      setSelectedMember(response.data.member);
    } catch (error) { toast.error('Failed to load member'); }
  };

  const getBadge = (status: string) => {
    const colors: any = { active: 'bg-green-100 text-green-700', pending: 'bg-yellow-100 text-yellow-700', inactive: 'bg-gray-100 text-gray-700', suspended: 'bg-red-100 text-red-700' };
    return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[status] || colors.inactive}`}>{status}</span>;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Members</h1>
            <p className="text-sm text-gray-500">Manage cooperative members</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2"><FaDownload size={12} />Export</button>
            <Link href="/admin/members/add" className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-light flex items-center gap-2"><FaUserPlus size={12} />Add Member</Link>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-600 mb-1">Search</label>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && fetchMembers()} placeholder="Search..." className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 border rounded-lg text-sm">
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          <button onClick={fetchMembers} className="px-4 py-2 bg-primary text-white rounded-lg text-sm">Apply</button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Member</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">ID</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Contact</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Savings</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={6} className="text-center py-12"><div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" /></td></tr>
                ) : members.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-12 text-gray-500 text-sm">No members found</td></tr>
                ) : (
                  members.map((m) => (
                    <tr key={m.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-white text-xs font-bold">{m.firstName?.[0]}{m.lastName?.[0]}</div>
                          <div><p className="font-medium text-sm">{m.firstName} {m.lastName}</p><p className="text-xs text-gray-400">{m.email}</p></div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm font-mono">{m.memberId}</td>
                      <td className="py-3 px-4 hidden md:table-cell">
                        <div className="text-xs space-y-0.5">
                          <p className="flex items-center gap-1 text-gray-500"><FaEnvelope size={10} />{m.email}</p>
                          <p className="flex items-center gap-1 text-gray-500"><FaPhone size={10} />{m.phone}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right text-sm font-semibold">₦{(m.totalSavings || 0).toLocaleString()}</td>
                      <td className="py-3 px-4 text-center">{getBadge(m.status)}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-1">
                          <button onClick={() => viewMember(m.id)} className="p-1.5 hover:bg-gray-100 rounded"><FaEye size={14} className="text-gray-500" /></button>
                          <Link href={`/admin/members/${m.id}/edit`} className="p-1.5 hover:bg-gray-100 rounded"><FaEdit size={14} className="text-blue-500" /></Link>
                          <select value={m.status} onChange={(e) => handleStatusChange(m.id, e.target.value)} className="text-xs border rounded px-1 py-0.5">
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
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
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50">
              <p className="text-xs text-gray-500">Page {pagination.page} of {pagination.totalPages}</p>
              <div className="flex gap-1">
                <button onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))} disabled={pagination.page === 1} className="px-3 py-1 border rounded text-xs disabled:opacity-50"><FaChevronLeft size={10} /></button>
                <button onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))} disabled={pagination.page === pagination.totalPages} className="px-3 py-1 border rounded text-xs disabled:opacity-50"><FaChevronRight size={10} /></button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Member Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedMember(null)}>
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-lg">Member Details</h3>
              <button onClick={() => setSelectedMember(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold text-lg">{selectedMember.firstName?.[0]}{selectedMember.lastName?.[0]}</div>
                <div><p className="font-bold">{selectedMember.firstName} {selectedMember.lastName}</p><p className="text-sm text-gray-500">{selectedMember.memberId}</p></div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-gray-500">Email</p><p className="font-medium">{selectedMember.email}</p></div>
                <div><p className="text-gray-500">Phone</p><p className="font-medium">{selectedMember.phone}</p></div>
                <div><p className="text-gray-500">Status</p><p>{getBadge(selectedMember.status)}</p></div>
                <div><p className="text-gray-500">Savings</p><p className="font-bold">₦{(selectedMember.totalSavings || 0).toLocaleString()}</p></div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setSelectedMember(null)} className="px-4 py-2 border rounded-lg text-sm">Close</button>
              <Link href={`/admin/members/${selectedMember.id}/edit`} className="px-4 py-2 bg-primary text-white rounded-lg text-sm">Edit</Link>
            </div>
          </motion.div>
        </div>
      )}
    </DashboardLayout>
  );
}