"use client";

import {
  CloudUpload,
  FileIcon,
  FileSearch,
  ImageIcon,
  Info,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/components/language/LanguageProvider";

export default function UploadPage() {
  const { direction, language, t } = useLanguage();
  const isArabic = language === "ar";

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto pb-10" dir={direction}>
      <div className={isArabic ? "text-right" : "text-left"}>
        <h2 className="text-3xl font-bold">{t.upload.title}</h2>
        <p className="text-gray-500 mt-1">{t.upload.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-10 border-2 border-dashed border-blue-500/30 hover:border-blue-500/60 transition-all group flex flex-col items-center justify-center text-center gap-6 cursor-pointer bg-blue-500/[0.02]">
            <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-500 group-hover:scale-110 group-hover:bg-blue-600/20 transition-all duration-300 shadow-[0_0_30px_rgba(37,99,235,0.1)]">
              <CloudUpload className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold">{t.upload.dropTitle}</h3>
              <p className="text-gray-500 max-w-sm mx-auto">{t.upload.dropDescription}</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold flex items-center gap-3 transition-all shadow-lg shadow-blue-600/20">
                <FileIcon className="w-4 h-4" />
                <span>{t.upload.dicomButton}</span>
              </button>
              <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold flex items-center gap-3 transition-all">
                <ImageIcon className="w-4 h-4" />
                <span>{t.upload.imageButton}</span>
              </button>
            </div>

            <p className="text-[10px] text-gray-600 font-medium uppercase tracking-widest mt-4">
              {t.upload.fileLimit}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-5 flex items-start gap-4 border-emerald-500/20 bg-emerald-500/[0.01]">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className={isArabic ? "text-right" : "text-left"}>
                <h4 className="font-bold text-sm">{t.upload.encryptedTitle}</h4>
                <p className="text-xs text-gray-500 mt-1">{t.upload.encryptedDescription}</p>
              </div>
            </div>

            <div className="glass-card p-5 flex items-start gap-4 border-blue-500/20 bg-blue-500/[0.01]">
              <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
                <FileSearch className="w-5 h-5" />
              </div>
              <div className={isArabic ? "text-right" : "text-left"}>
                <h4 className="font-bold text-sm">{t.upload.aiTitle}</h4>
                <p className="text-xs text-gray-500 mt-1">{t.upload.aiDescription}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-amber-400">
              <Info className="w-5 h-5" />
              <h3 className="font-bold">{t.upload.tipsTitle}</h3>
            </div>

            <ul className={`space-y-4 text-sm text-gray-400 ${isArabic ? "text-right pr-2" : "text-left pl-2"}`}>
              {t.upload.tips.map((tip) => (
                <li key={tip} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  <p>{tip}</p>
                </li>
              ))}
            </ul>

            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 mt-2">
              <p className="text-[11px] text-blue-400 leading-relaxed italic">"{t.upload.quote}"</p>
            </div>
          </div>

          <div className="glass-card overflow-hidden group">
            <div className="h-32 bg-gradient-to-br from-indigo-600 to-purple-800 p-6 flex flex-col justify-end">
              <h4 className="font-bold text-lg leading-tight">{t.upload.previousTitle}</h4>
            </div>
            <div className="p-6">
              <p className="text-xs text-gray-500 leading-relaxed mb-4">{t.upload.previousDescription}</p>
              <button className="w-full py-3 rounded-xl border border-white/10 text-sm font-bold hover:bg-white/5 transition-all">
                {t.upload.historyButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
