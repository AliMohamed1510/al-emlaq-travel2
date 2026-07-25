'use client';

import { useAuth } from '@/context/AuthContext';
import { LogOut, Shield, Users, Building2, TrendingUp, Calendar } from 'lucide-react';

const ALL_CLIENTS = [
  { id: 1, fullName: 'أحمد محمد', company: 'شركة السفر الأولى', email: 'ahmed@test.com', serviceType: 'تأشيرة', appointmentDate: '2026-08-15' },
  { id: 2, fullName: 'محمد علي', company: 'شركة السفر الأولى', email: 'mohamed@test.com', serviceType: 'عمرة', appointmentDate: '2026-09-01' },
  { id: 3, fullName: 'خالد سعيد', company: 'شركة السفر الثانية', email: 'khaled@test.com', serviceType: 'حج', appointmentDate: '2026-08-20' },
];

const STATS = [
  { label: 'إجمالي العملاء', value: '24', icon: Users, color: 'bg-blue-500' },
  { label: 'عدد الشركات', value: '3', icon: Building2, color: 'bg-emerald-500' },
  { label: 'مواعيد هذا الشهر', value: '8', icon: Calendar, color: 'bg-amber-500' },
  { label: 'نسبة النمو', value: '+12%', icon: TrendingUp, color: 'bg-purple-500' },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* الهيدر */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
            <Shield size={20} className="text-purple-600" />
          </div>
          <div>
            <h1 className="font-bold text-slate-800">لوحة تحكم الأدمن</h1>
            <p className="text-xs text-slate-500">{user?.companyName}</p>
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

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon size={20} className="text-white" />
                </div>
                <span className="text-2xl font-bold text-slate-800">{stat.value}</span>
              </div>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* جدول كل العملاء */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Users size={20} className="text-purple-500" />
              جميع العملاء
            </h2>
            <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {ALL_CLIENTS.length} عميل
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-right text-xs font-semibold text-slate-500 uppercase px-6 py-3">#</th>
                  <th className="text-right text-xs font-semibold text-slate-500 uppercase px-6 py-3">الاسم</th>
                  <th className="text-right text-xs font-semibold text-slate-500 uppercase px-6 py-3">الشركة</th>
                  <th className="text-right text-xs font-semibold text-slate-500 uppercase px-6 py-3">الإيميل</th>
                  <th className="text-right text-xs font-semibold text-slate-500 uppercase px-6 py-3">الخدمة</th>
                  <th className="text-right text-xs font-semibold text-slate-500 uppercase px-6 py-3">الموعد</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ALL_CLIENTS.map((client, idx) => (
                  <tr key={client.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-slate-400 text-sm">{idx + 1}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{client.fullName}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {client.company}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{client.email}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                        {client.serviceType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{client.appointmentDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}