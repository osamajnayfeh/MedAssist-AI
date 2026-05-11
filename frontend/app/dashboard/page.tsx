import { 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  FileText, 
  Calendar,
  MoreVertical,
  Activity
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { title: "إجمالي الحالات", value: "1,284", change: "+12%", icon: Users, color: "blue" },
    { title: "حالات قيد المعالجة", value: "43", change: "-5%", icon: Clock, color: "amber" },
    { title: "تحليلات مكتملة", value: "1,241", change: "+18%", icon: CheckCircle, color: "emerald" },
    { title: "حالات حرجة", value: "12", change: "+2%", icon: AlertCircle, color: "red" },
  ];

  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="flex items-center justify-between">
        <div className="text-right">
          <h2 className="text-3xl font-bold">لوحة التحكم الرئيسية</h2>
          <p className="text-gray-500 mt-1">مرحباً بك مجدداً، د. أحمد. إليك ملخص نشاط اليوم.</p>
        </div>
        <div className="flex items-center gap-3 bg-gray-900/50 p-2 rounded-2xl border border-white/5">
          <Calendar className="w-5 h-5 text-blue-400 mr-2" />
          <span className="text-sm font-medium ml-2">الإثنين، 11 مايو 2026</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-card p-6 flex flex-col gap-4 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-2 h-full bg-${stat.color}-500/50`}></div>
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-400`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-lg bg-${stat.color}-500/10 text-${stat.color}-400`}>
                {stat.change}
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1 tracking-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Analyses Table */}
        <div className="lg:col-span-2 glass-card flex flex-col h-full">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              <span>آخر التحليلات</span>
            </h3>
            <button className="text-sm text-blue-400 font-bold hover:underline">عرض الكل</button>
          </div>
          <div className="p-4 flex-1 overflow-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="text-gray-500 text-sm border-b border-white/5">
                  <th className="pb-4 font-semibold px-2">المريض</th>
                  <th className="pb-4 font-semibold px-2">النوع</th>
                  <th className="pb-4 font-semibold px-2">التاريخ</th>
                  <th className="pb-4 font-semibold px-2">الحالة</th>
                  <th className="pb-4 font-semibold px-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[1, 2, 3, 4, 5].map((item) => (
                  <tr key={item} className="hover:bg-white/5 transition-colors group">
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">
                          SM
                        </div>
                        <span className="text-sm font-medium">سارة محمد</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-sm text-gray-300">أشعة صدر</td>
                    <td className="py-4 px-2 text-sm text-gray-500">منذ 15 دقيقة</td>
                    <td className="py-4 px-2">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                        مكتمل
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <button className="text-gray-600 hover:text-white transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Daily Stats & Progress */}
        <div className="flex flex-col gap-8">
          <div className="glass-card p-6 flex flex-col gap-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <span>إحصائيات اليوم</span>
            </h3>
            
            <div className="space-y-6 mt-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">معدل الدقة</span>
                  <span className="font-bold">99.2%</span>
                </div>
                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[99.2%] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">سرعة المعالجة</span>
                  <span className="font-bold">1.2 ثانية</span>
                </div>
                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 w-[85%]"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">نسبة الاكتشاف المبكر</span>
                  <span className="font-bold">94%</span>
                </div>
                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[94%]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Card */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 shadow-xl shadow-blue-900/20 flex flex-col gap-4 relative overflow-hidden">
             <Activity className="absolute -bottom-4 -left-4 w-32 h-32 text-white/10 rotate-12" />
             <h3 className="text-xl font-bold relative z-10 leading-tight">جاهز لبدء <br />تحليل جديد؟</h3>
             <p className="text-blue-100/70 text-sm relative z-10">قم برفع الملفات الطبية الآن واحصل على النتائج في ثوانٍ.</p>
             <button className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors mt-2 relative z-10 self-start">
               رفع ملفات جديدة
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
