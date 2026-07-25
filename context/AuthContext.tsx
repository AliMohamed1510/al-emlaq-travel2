'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserRole = 'admin' | 'company';

interface User {
  username: string;
  role: UserRole;
  companyName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// 🔐 بيانات ثابتة (ممكن تربطها بـ API أو Sheet بعدين)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
  role: 'admin' as UserRole,
  companyName: 'Al EmlaQ Admin',
};

// 🏢 الشركات (أنت اللي هتضيفهم)
const COMPANIES = [
  { username: 'company1', password: 'pass123', role: 'company' as UserRole, companyName: 'شركة السفر الأولى' },
  { username: 'company2', password: 'pass456', role: 'company' as UserRole, companyName: 'شركة السفر الثانية' },
  { username: 'company3', password: 'pass789', role: 'company' as UserRole, companyName: 'شركة السفر الثالثة' },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('al_emlaq_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = (username: string, password: string): boolean => {
    // فحص الأدمن
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const userData: User = {
        username: ADMIN_CREDENTIALS.username,
        role: ADMIN_CREDENTIALS.role,
        companyName: ADMIN_CREDENTIALS.companyName,
      };
      setUser(userData);
      localStorage.setItem('al_emlaq_user', JSON.stringify(userData));
      return true;
    }

    // فحص الشركات
    const company = COMPANIES.find(
      (c) => c.username === username && c.password === password
    );
    if (company) {
      const userData: User = {
        username: company.username,
        role: company.role,
        companyName: company.companyName,
      };
      setUser(userData);
      localStorage.setItem('al_emlaq_user', JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('al_emlaq_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
