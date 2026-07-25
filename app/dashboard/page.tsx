'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import CompanyDashboard from '@/components/CompanyDashboard';
import AdminDashboard from '@/components/AdminDashboard';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return user.role === 'admin' ? <AdminDashboard /> : <CompanyDashboard />;
}