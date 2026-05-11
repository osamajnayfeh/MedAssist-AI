import { 
  Lock, 
  Mail, 
  Activity, 
  ArrowLeft, 
  UserCheck 
} from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none"></div>
      
      <div className="w-full max-w-md glass-card p-8 relative overflow-hidden">
        {/* Top Accent */}
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-blue-600 to-cyan-400"></div>

        <div className="flex flex-col items-center text-center gap-6">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <Activity className="text-white w-10 h-10" />
          </div>
          
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">ClinicalMind</h1>
            <p className="text-gray-500 text-sm font-medium">مرحباً بك مجدداً في منصتك الطبية الذكية</p>
          </div>
        </div>

        <form className="mt-10 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400 mr-1">البريد الإلكتروني</label>
            <div className="relative group">
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="email" 
                placeholder="doctor@clinicalmind.com" 
                className="w-full bg-gray-900/50 border border-white/5 rounded-xl py-3 pr-12 pl-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-gray-700"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <label className="text-sm font-semibold text-gray-400">كلمة المرور</label>
              <button type="button" className="text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors">
                نسيت كلمة المرور؟
              </button>
            </div>
            <div className="relative group">
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-gray-900/50 border border-white/5 rounded-xl py-3 pr-12 pl-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-gray-700"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 px-1">
            <input 
              type="checkbox" 
              id="remember" 
              className="w-4 h-4 rounded border-white/10 bg-gray-900/50 text-blue-600 focus:ring-blue-500/50 cursor-pointer"
            />
            <label htmlFor="remember" className="text-sm text-gray-500 cursor-pointer select-none">تذكرني على هذا الجهاز</label>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group">
            <span>تسجيل الدخول</span>
            <UserCheck className="w-5 h-5 group-hover:translate-x-[-4px] transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            ليس لديك حساب بعد؟{" "}
            <Link href="/auth/register" className="text-blue-500 font-bold hover:underline underline-offset-4">
              أنشئ حسابك الآن
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5">
          <Link href="/" className="flex items-center justify-center gap-2 text-xs text-gray-600 hover:text-gray-400 transition-colors">
            <ArrowLeft className="w-3 h-3" />
            <span>العودة للصفحة الرئيسية</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
