'use client';

import { Plane, Phone, Mail, MapPin } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-l from-primary-800 via-primary-700 to-primary-600 text-white shadow-lg">
      {/* Top bar */}
      <div className="bg-primary-900/50 py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:+201509025388" className="flex items-center gap-1 hover:text-gold-300 transition-colors">
              <Phone size={14} />
              <span>+20 150 902 5388</span>
            </a>
            <a href="tel:+201509025388" className="flex items-center gap-1 hover:text-gold-300 transition-colors">
              <Phone size={14} />
              <span>+201509025388</span>
            </a>
            <a href="mailto:info@alemlaqtravel.com" className="flex items-center gap-1 hover:text-gold-300 transition-colors">
              <Mail size={14} />
              <span>info@alemlaqtravel.com</span>
            </a>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span>القاهرة، مصر</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-white/20">
              <Plane size={36} className="text-gold-400" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Al EmlaQ <span className="text-gold-400">Travel</span>
              </h1>
              <p className="text-primary-100 text-sm mt-1">نظام تسجيل بيانات العملاء</p>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/20">
              <span className="text-gold-300 font-semibold">نحن نسافر من أجلك</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
