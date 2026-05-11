"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "ar" | "en";

type Dictionary = {
  app: {
    dashboard: string;
    newAnalysis: string;
    categories: string;
    xray: string;
    mri: string;
    ultrasound: string;
    history: string;
    settings: string;
    logout: string;
    searchPlaceholder: string;
    doctorName: string;
    doctorRole: string;
    switchTo: string;
  };
  upload: {
    title: string;
    subtitle: string;
    dropTitle: string;
    dropDescription: string;
    dicomButton: string;
    imageButton: string;
    fileLimit: string;
    encryptedTitle: string;
    encryptedDescription: string;
    aiTitle: string;
    aiDescription: string;
    tipsTitle: string;
    tips: string[];
    quote: string;
    previousTitle: string;
    previousDescription: string;
    historyButton: string;
  };
};

const dictionaries: Record<Language, Dictionary> = {
  ar: {
    app: {
      dashboard: "لوحة التحكم",
      newAnalysis: "تحليل جديد",
      categories: "التصنيفات",
      xray: "الأشعة (X-Ray)",
      mri: "الرنين المغناطيسي",
      ultrasound: "الموجات فوق الصوتية",
      history: "سجل التحليلات",
      settings: "الإعدادات",
      logout: "تسجيل الخروج",
      searchPlaceholder: "ابحث عن مريض، تحليل، أو تقرير...",
      doctorName: "د. أحمد علي",
      doctorRole: "أخصائي أشعة",
      switchTo: "English",
    },
    upload: {
      title: "بدء تحليل طبي جديد",
      subtitle: "قم برفع صور الأشعة (X-Ray, MRI, Ultrasound) ليقوم النظام بتحليلها فورًا.",
      dropTitle: "اسحب الملفات هنا أو قم بالاختيار",
      dropDescription: "يدعم النظام ملفات DICOM الطبية بالإضافة إلى الصور التقليدية مثل JPG و PNG بدقة عالية.",
      dicomButton: "رفع ملف DICOM",
      imageButton: "رفع صورة (JPG/PNG)",
      fileLimit: "الحد الأقصى لحجم الملف: 500 ميجابايت",
      encryptedTitle: "تشفير كامل للبيانات",
      encryptedDescription: "يتم تشفير جميع الصور الطبية المرفوعة وفقًا لمعايير HIPAA العالمية.",
      aiTitle: "ذكاء اصطناعي فائق",
      aiDescription: "يتعرف النظام تلقائيًا على نوع الأشعة وعضو الجسم المستهدف للتحليل.",
      tipsTitle: "نصائح لرفع الملفات",
      tips: [
        "تأكد من وضوح الصورة وعدم وجود تشويش كبير للحصول على أفضل النتائج.",
        "يفضل استخدام تنسيق DICOM للأشعة المقطعية والرنين المغناطيسي.",
        "يمكنك رفع عدة ملفات في وقت واحد لدمجها في تقرير واحد للحالة.",
      ],
      quote: "يساعد النظام في اكتشاف أكثر من 20 نوعًا من الأمراض الصدرية والعصبية والجلدية بدقة تضاهي كبار الاستشاريين.",
      previousTitle: "تحليلات سابقة",
      previousDescription: "هل تريد مراجعة تحليل سابق بدلًا من البدء من جديد؟",
      historyButton: "انتقل إلى السجل",
    },
  },
  en: {
    app: {
      dashboard: "Dashboard",
      newAnalysis: "New analysis",
      categories: "Categories",
      xray: "X-Ray",
      mri: "MRI",
      ultrasound: "Ultrasound",
      history: "Analysis history",
      settings: "Settings",
      logout: "Sign out",
      searchPlaceholder: "Search for a patient, scan, or report...",
      doctorName: "Dr. Ahmad Ali",
      doctorRole: "Radiology specialist",
      switchTo: "العربية",
    },
    upload: {
      title: "Start a new medical analysis",
      subtitle: "Upload radiology images (X-Ray, MRI, Ultrasound) and let the system analyze them instantly.",
      dropTitle: "Drag files here or choose from your device",
      dropDescription: "The system supports medical DICOM files as well as high-resolution JPG and PNG images.",
      dicomButton: "Upload DICOM file",
      imageButton: "Upload image (JPG/PNG)",
      fileLimit: "Maximum file size: 500 MB",
      encryptedTitle: "Full data encryption",
      encryptedDescription: "All uploaded medical images are encrypted according to global HIPAA standards.",
      aiTitle: "Advanced AI analysis",
      aiDescription: "The system automatically detects the scan type and target body area for analysis.",
      tipsTitle: "Upload tips",
      tips: [
        "Make sure the image is clear and has minimal noise for the best results.",
        "DICOM format is preferred for CT scans and MRI studies.",
        "You can upload multiple files at once and combine them into one case report.",
      ],
      quote: "The system helps detect more than 20 types of chest, neurological, and dermatological conditions with consultant-level accuracy.",
      previousTitle: "Previous analyses",
      previousDescription: "Want to review an earlier analysis instead of starting from scratch?",
      historyButton: "Go to history",
    },
  },
};

type LanguageContextValue = {
  language: Language;
  direction: "rtl" | "ltr";
  t: Dictionary;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar");

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem("clinicalmind-language");
    if (storedLanguage === "ar" || storedLanguage === "en") {
      setLanguage(storedLanguage);
    }
  }, []);

  useEffect(() => {
    const direction = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    document.body.dir = direction;
    window.localStorage.setItem("clinicalmind-language", language);
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => {
    const direction = language === "ar" ? "rtl" : "ltr";

    return {
      language,
      direction,
      t: dictionaries[language],
      toggleLanguage: () => setLanguage((current) => (current === "ar" ? "en" : "ar")),
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
