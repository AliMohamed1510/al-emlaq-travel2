'use client';

import { Users, CalendarCheck, FileCheck, Clock } from 'lucide-react';

const stats = [
  { icon: Users, label: 'العملاء المسجلين', value: '0', color: 'bg-blue-500' },
  { icon: CalendarCheck, label: 'المواعيد القادمة', value: '0', color: 'bg-emerald-500' },
  { icon: FileCheck, label: 'الخدمات المكتملة', value: '0', color: 'bg-gold-500' },
  { icon: Clock, label: 'في الانتظار', value: '0', color: 'bg-orange-500' },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="bg-white rounded-2xl p-5 shadow-md border border-slate-100 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`${stat.color} p-2.5 rounded-xl text-white`}>
              <stat.icon size={20} />
            </div>
            <span className="text-2xl font-bold text-slate-800">{stat.value}</span>
          </div>
          <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
