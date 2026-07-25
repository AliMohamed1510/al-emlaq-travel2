'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ClientForm from './ClientForm';
import { Users, FileText, Calendar, LogOut, Building2 } from 'lucide-react';

// بيانات وهمية للعرض (هتربطها بالـ Sheet أو API بعدين)
const MOCK_CLIENTS = [
  { id: 1, fullName: 'أحمد محمد', email: 'ahmed@test.com', phone: '+20 123 456 7890', serviceType: 'تأشيرة', appointmentDate: '2026-08-15', status: 'جديد' },
  { id: 2, fullName: 'محمد علي', email: 'mohamed@test.com', phone: '+20 111 222 3333', serviceType: 'عمرة', appointmentDate: '2026-09-01', status: 'مؤكد' },
];

export default function CompanyDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'add' | 'list'>('add');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* الهيدر */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
            <Building2 size={20} className="text-primary-600" />
          </div>
          <div>
            <h1 className="font-bold text-slate-800">{user?.companyName}</h1>
            <p className="text-xs text-slate-500">حساب شركة</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-all"
        >
          <LogOut size={16} />
          خروج
        </button>
      </header>

      {/* التبويبات */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('add')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'add'
                ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300'
            }`}
          >
            <FileText size={16} />
            إضافة عميل جديد
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'list'
                ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300'
            }`}
          >
            <Users size={16} />
            قائمة العملاء
          </button>
        </div>

        {/* المحتوى */}
        {activeTab === 'add' ? (
          <ClientForm />
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Users size={20} className="text-primary-500" />
                عملاء {user?.companyName}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-right text-xs font-semibold text-slate-500 uppercase px-6 py-3">الاسم</th>
                    <th className="text-right text-xs font-semibold text-slate-500 uppercase px-6 py-3">الإيميل</th>
                    <th className="text-right text-xs font-semibold text-slate-500 uppercase px-6 py-3">الجوال</th>
                    <th className="text-right text-xs font-semibold text-slate-500 uppercase px-6 py-3">الخدمة</th>
                    <th className="text-right text-xs font-semibold text-slate-500 uppercase px-6 py-3">الموعد</th>
                    <th className="text-right text-xs font-semibold text-slate-500 uppercase px-6 py-3">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_CLIENTS.map((client) => (
                    <tr key={client.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-800">{client.fullName}</td>
                      <td className="px-6 py-4 text-slate-600 text-sm">{client.email}</td>
                      <td className="px-6 py-4 text-slate-600 text-sm">{client.phone}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                          {client.serviceType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 text-sm flex items-center gap-1">
                        <Calendar size={14} className="text-slate-400" />
                        {client.appointmentDate}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          client.status === 'مؤكد' 
                            ? 'bg-emerald-50 text-emerald-700' 
                            : 'bg-amber-50 text-amber-700'
                        }`}>
                          {client.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}