"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Bell,
  Dna,
  Globe2,
  HelpCircle,
  History,
  LayoutDashboard,
  LogOut,
  Monitor,
  Scan,
  Search,
  Settings,
  Upload,
  User,
} from "lucide-react";
import { LanguageProvider, useLanguage } from "@/components/language/LanguageProvider";

function ShellContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { language, direction, t, toggleLanguage } = useLanguage();
  const isArabic = language === "ar";
  const sidebarSide = isArabic ? "right-0 border-l" : "left-0 border-r";
  const contentOffset = isArabic ? "lg:mr-72" : "lg:ml-72";
  const activeClass = "sidebar-link-active";

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: t.app.dashboard },
    { href: "/upload", icon: Upload, label: t.app.newAnalysis },
  ];

  const categoryItems = [
    { href: "#", icon: Scan, label: t.app.xray },
    { href: "#", icon: Dna, label: t.app.mri },
    { href: "#", icon: Monitor, label: t.app.ultrasound },
    { href: "/history", icon: History, label: t.app.history },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white overflow-hidden flex" dir={direction}>
      <aside className={`w-72 bg-[#111827] border-white/10 flex-col h-screen fixed top-0 z-50 shadow-2xl hidden lg:flex ${sidebarSide}`}>
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)]">
            <Activity className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-l from-white to-gray-400 bg-clip-text text-transparent">
            ClinicalMind
          </span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className={`sidebar-link group ${pathname === item.href ? activeClass : ""}`}>
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="pt-4 pb-2 px-4">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.app.categories}</span>
          </div>

          {categoryItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.label} href={item.href} className={`sidebar-link group ${pathname === item.href ? activeClass : ""}`}>
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-1">
          <Link href="#" className="sidebar-link group">
            <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            <span>{t.app.settings}</span>
          </Link>
          <button className="sidebar-link group w-full text-red-400 hover:bg-red-500/10 hover:text-red-300">
            <LogOut className={`w-5 h-5 transition-transform ${isArabic ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
            <span>{t.app.logout}</span>
          </button>
        </div>
      </aside>

      <div className={`flex-1 ${contentOffset} flex flex-col h-screen overflow-hidden`}>
        <header className="h-20 bg-[#0a0e1a]/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-8 z-40 sticky top-0 gap-6">
          <div className="flex items-center gap-4 bg-gray-900/50 px-4 py-2 rounded-2xl border border-white/5 w-full max-w-md">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t.app.searchPlaceholder}
              className="bg-transparent border-none focus:outline-none text-sm w-full placeholder:text-gray-600"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-900/50 border border-white/5 text-sm font-semibold text-gray-300 hover:text-white hover:border-blue-500/30 transition-all"
              aria-label={`Switch language to ${t.app.switchTo}`}
            >
              <Globe2 className="w-4 h-4 text-blue-400" />
              <span>{language.toUpperCase()}</span>
            </button>

            <button className="p-2.5 rounded-xl bg-gray-900/50 border border-white/5 text-gray-400 hover:text-blue-400 hover:border-blue-500/30 transition-all relative">
              <Bell className="w-5 h-5" />
              <span className={`absolute top-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#0a0e1a] ${isArabic ? "right-2.5" : "left-2.5"}`} />
            </button>

            <button className="p-2.5 rounded-xl bg-gray-900/50 border border-white/5 text-gray-400 hover:text-blue-400 transition-all">
              <HelpCircle className="w-5 h-5" />
            </button>

            <div className="h-8 w-px bg-white/10 mx-1" />

            <div className="flex items-center gap-3 cursor-pointer group">
              <div className={isArabic ? "text-right" : "text-left"}>
                <p className="text-sm font-semibold">{t.app.doctorName}</p>
                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">{t.app.doctorRole}</p>
              </div>
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 p-[2px] shadow-lg group-hover:shadow-blue-500/20 transition-all">
                <div className="w-full h-full rounded-full bg-[#111827] flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-400" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 scroll-smooth">{children}</main>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ShellContent>{children}</ShellContent>
    </LanguageProvider>
  );
}
