import type { Metadata } from "next";
import "./globals.css";
import { 
  Activity, 
  Settings, 
  LogOut, 
  Upload, 
  LayoutDashboard, 
  History, 
  Bell, 
  Search, 
  User, 
  HelpCircle,
  Dna,
  Scan,
  Monitor
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ClinicalMind | منصة المساعدة الطبية الذكية",
  description: "منصة متقدمة للتحليل الطبي المدعوم بالذكاء الاصطناعي",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-[#0a0e1a] text-white overflow-hidden flex">
        {/* Sidebar - Fixed on the Right */}
        <aside className="w-72 bg-[#111827] border-l border-white/10 flex flex-col h-screen fixed right-0 top-0 z-50 shadow-2xl">
          <div className="p-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)]">
              <Activity className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-l from-white to-gray-400 bg-clip-text text-transparent">
              ClinicalMind
            </span>
          </div>

          <nav className="flex-1 px-4 space-y-2 mt-4">
            <Link href="/dashboard" className="sidebar-link sidebar-link-active group">
              <LayoutDashboard className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>لوحة التحكم</span>
            </Link>
            
            <Link href="/upload" className="sidebar-link group">
              <Upload className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>تحليل جديد</span>
            </Link>

            <div className="pt-4 pb-2 px-4">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">التصنيفات</span>
            </div>

            <Link href="#" className="sidebar-link group">
              <Scan className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>الأشعة (X-Ray)</span>
            </Link>

            <Link href="#" className="sidebar-link group">
              <Dna className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>الرنين المغناطيسي</span>
            </Link>

            <Link href="#" className="sidebar-link group">
              <Monitor className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>الموجات فوق الصوتية</span>
            </Link>

            <Link href="/history" className="sidebar-link group">
              <History className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>سجل التحليلات</span>
            </Link>
          </nav>

          <div className="p-4 border-t border-white/5 space-y-1">
            <Link href="#" className="sidebar-link group">
              <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              <span>الإعدادات</span>
            </Link>
            <button className="sidebar-link group w-full text-red-400 hover:bg-red-500/10 hover:text-red-300">
              <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 mr-72 flex flex-col h-screen overflow-hidden">
          {/* Top Navbar */}
          <header className="h-20 bg-[#0a0e1a]/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-8 z-40 sticky top-0">
            <div className="flex items-center gap-4 bg-gray-900/50 px-4 py-2 rounded-2xl border border-white/5 w-96">
              <Search className="w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="ابحث عن مريض، تحليل، أو تقرير..." 
                className="bg-transparent border-none focus:outline-none text-sm w-full placeholder:text-gray-600"
              />
            </div>

            <div className="flex items-center gap-6">
              <button className="p-2.5 rounded-xl bg-gray-900/50 border border-white/5 text-gray-400 hover:text-blue-400 hover:border-blue-500/30 transition-all relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#0a0e1a]"></span>
              </button>
              
              <button className="p-2.5 rounded-xl bg-gray-900/50 border border-white/5 text-gray-400 hover:text-blue-400 transition-all">
                <HelpCircle className="w-5 h-5" />
              </button>

              <div className="h-8 w-px bg-white/10 mx-2"></div>

              <div className="flex items-center gap-3 pl-2 cursor-pointer group">
                <div className="text-right">
                  <p className="text-sm font-semibold">د. أحمد علي</p>
                  <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">أخصائي أشعة</p>
                </div>
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 p-[2px] shadow-lg group-hover:shadow-blue-500/20 transition-all">
                  <div className="w-full h-full rounded-full bg-[#111827] flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-8 scroll-smooth">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
