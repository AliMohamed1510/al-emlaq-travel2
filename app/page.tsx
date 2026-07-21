import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ClientForm from '@/components/ClientForm';
import StatsCards from '@/components/StatsCards';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
            مرحباً بك في <span className="text-primary-600">Al EmlaQ Travel</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            نظام تسجيل بيانات العملاء - سجل بياناتك وسنقوم بالتواصل معك وتذكيرك بموعدك
          </p>
        </div>

        <StatsCards />
        <ClientForm />
      </main>

      <Footer />
    </div>
  );
}
