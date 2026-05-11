import { ArrowLeft, CheckCircle2, ShieldCheck, Zap, Activity } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15),transparent_50%)] pointer-events-none"></div>
        
        <div className="flex flex-col items-center text-center gap-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium animate-pulse">
            <Zap className="w-4 h-4" />
            <span>مستقبل التشخيص الطبي بالذكاء الاصطناعي</span>
          </div>
          
          <h1 className="text-6xl font-bold max-w-4xl leading-tight">
            دقة فائقة في <span className="bg-gradient-to-l from-blue-400 to-cyan-300 bg-clip-text text-transparent">تحليل الصور الطبية</span> والتشخيص السريع
          </h1>
          
          <p className="text-gray-400 text-xl max-w-2xl leading-relaxed">
            منصة متقدمة تساعد الأطباء على اكتشاف الأمراض بدقة متناهية من خلال تحليل صور الأشعة والرنين المغناطيسي في ثوانٍ معدودة.
          </p>

          <div className="flex items-center gap-4 mt-8">
            <Link href="/dashboard" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold text-lg shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-1 flex items-center gap-3">
              <span>ابدأ الآن مجاناً</span>
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link href="#features" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold text-lg transition-all">
              اكتشف المميزات
            </Link>
          </div>
        </div>

        {/* Feature Preview Card */}
        <div className="mt-20 glass-card p-4 mx-auto max-w-5xl group overflow-hidden">
          <div className="relative h-[400px] rounded-xl overflow-hidden bg-gray-900 flex items-center justify-center border border-white/5">
             <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent"></div>
             <Activity className="w-24 h-24 text-blue-500/20 group-hover:scale-125 transition-transform duration-700" />
             <div className="absolute bottom-8 right-8 text-right space-y-2">
                <div className="w-32 h-2 bg-blue-500/30 rounded-full"></div>
                <div className="w-48 h-2 bg-blue-500/20 rounded-full"></div>
                <div className="w-24 h-2 bg-blue-500/10 rounded-full"></div>
             </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
        <div className="glass-card p-8 flex flex-col gap-4 text-right">
          <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">خصوصية كاملة</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            نحن نستخدم أعلى معايير التشفير لضمان سرية بيانات المرضى ونتائج التحليلات.
          </p>
        </div>

        <div className="glass-card p-8 flex flex-col gap-4 text-right">
          <div className="w-12 h-12 bg-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">دقة تتجاوز 99%</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            نماذج الذكاء الاصطناعي مدربة على ملايين الحالات الطبية لضمان أدق النتائج.
          </p>
        </div>

        <div className="glass-card p-8 flex flex-col gap-4 text-right">
          <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">سرعة فائقة</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            احصل على تقرير تشخيصي شامل في أقل من 30 ثانية لكل حالة.
          </p>
        </div>
      </section>
    </div>
  );
}
