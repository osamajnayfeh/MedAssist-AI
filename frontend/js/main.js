const translations = {
    en: {
        clinicalMind: "ClinicalMind",
        aiMedical: "AI Medical Intelligence",
        tagline: "Advanced AI-Powered Medical Diagnosis System",
        description: "Revolutionizing healthcare with cutting-edge artificial intelligence for accurate medical analysis and diagnosis",
        getStarted: "Get Started",
        language: "Language",
        theme: "Theme",
        features: "Features",
        about: "About",
        contact: "Contact",
        feature1Title: "Image Analysis",
        feature1Desc: "Advanced AI analysis of medical X-rays and imaging",
        feature2Title: "Symptom Diagnosis",
        feature2Desc: "Intelligent diagnosis based on patient symptoms",
        feature3Title: "Real-time Results",
        feature3Desc: "Instant analysis and comprehensive reports",
        feature4Title: "Multi-language",
        feature4Desc: "Support for Arabic and English interfaces",
        aboutTitle: "About ClinicalMind",
        aboutDesc: "ClinicalMind is a revolutionary AI-powered medical intelligence platform designed to assist healthcare professionals in making accurate diagnoses. Our system combines advanced machine learning algorithms with medical expertise to provide reliable analysis of medical images and patient symptoms.",
        whyChoose: "Why Choose ClinicalMind?",
        accuracy: "High Accuracy",
        accuracyDesc: "State-of-the-art AI models trained on millions of medical cases",
        speed: "Lightning Fast",
        speedDesc: "Get results in seconds, not hours",
        secure: "Secure & Private",
        secureDesc: "Your patient data is encrypted and protected",
        support: "24/7 Support",
        supportDesc: "Round-the-clock technical support",
        getStartedNow: "Get Started Now",
        startAnalyzing: "Start Analyzing Medical Cases",
        footer: "© 2026 ClinicalMind. All rights reserved.",
        features: "Features",
        howItWorks: "How It Works",
        step1: "Upload or Enter Data",
        step1Desc: "Upload medical images or enter patient symptoms",
        step2: "AI Analysis",
        step2Desc: "Our AI analyzes the data using advanced algorithms",
        step3: "Get Results",
        step3Desc: "Receive comprehensive diagnosis and recommendations"
    },
    ar: {
        clinicalMind: "كلينيكال مايند",
        aiMedical: "ذكاء اصطناعي طبي",
        tagline: "نظام تشخيص طبي متقدم بقوة الذكاء الاصطناعي",
        description: "ثورة في الرعاية الصحية باستخدام الذكاء الاصطناعي المتقدم للتحليل والتشخيص الطبي الدقيق",
        getStarted: "ابدأ الآن",
        language: "اللغة",
        theme: "المظهر",
        features: "الميزات",
        about: "حول",
        contact: "اتصل",
        feature1Title: "تحليل الصور",
        feature1Desc: "تحليل ذكي متقدم للأشعات والصور الطبية",
        feature2Title: "تشخيص الأعراض",
        feature2Desc: "تشخيص ذكي بناءً على أعراض المريض",
        feature3Title: "النتائج الفورية",
        feature3Desc: "تحليل فوري وتقارير شاملة",
        feature4Title: "متعدد اللغات",
        feature4Desc: "دعم واجهات عربية وإنجليزية",
        aboutTitle: "حول كلينيكال مايند",
        aboutDesc: "كلينيكال مايند هي منصة ذكاء اصطناعي طبية ثورية مصممة لمساعدة المتخصصين الطبيين في إجراء تشخيصات دقيقة. يجمع نظامنا بين خوارزميات التعلم الآلي المتقدمة والخبرة الطبية لتوفير تحليل موثوق للصور الطبية وأعراض المريض.",
        whyChoose: "لماذا تختار كلينيكال مايند؟",
        accuracy: "دقة عالية",
        accuracyDesc: "نماذج ذكاء اصطناعي متقدمة مدربة على ملايين الحالات الطبية",
        speed: "سرعة فائقة",
        speedDesc: "احصل على النتائج في ثوان وليس ساعات",
        secure: "آمن وخاص",
        secureDesc: "بيانات المريض مشفرة ومحمية",
        support: "دعم 24/7",
        supportDesc: "دعم تقني على مدار الساعة",
        getStartedNow: "ابدأ الآن",
        startAnalyzing: "ابدأ تحليل الحالات الطبية",
        footer: "© 2026 كلينيكال مايند. جميع الحقوق محفوظة.",
        features: "الميزات",
        howItWorks: "كيف يعمل",
        step1: "رفع أو إدخال البيانات",
        step1Desc: "رفع الصور الطبية أو إدخال أعراض المريض",
        step2: "تحليل الذكاء الاصطناعي",
        step2Desc: "يحلل نظامنا البيانات باستخدام خوارزميات متقدمة",
        step3: "احصل على النتائج",
        step3Desc: "احصل على تشخيص شامل والتوصيات"
    }
};

let currentLanguage = localStorage.getItem('language') || 'en';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = translations[lang][key];
    });
    
    const style = document.getElementById('font-style');
    if (lang === 'ar') {
        style.textContent = `* { font-family: 'Cairo', sans-serif !important; }`;
    } else {
        style.textContent = `* { font-family: 'Inter', sans-serif !important; }`;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLanguage);
});

function toggleLanguage() {
    const newLang = currentLanguage === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
}

function goToDashboard() {
    window.location.href = 'dashboard.html';
}
