// Language and Theme Management for ClinicalMind Frontend

const translations = {
  en: {
    newDiagnosis: 'New Diagnosis',
    categories: 'Categories',
    brainXray: 'Brain X-ray',
    chestXray: 'Chest X-ray',
    boneXray: 'Bone X-ray',
    history: 'History',
    analysisHistory: 'Analysis History',
    theme: 'Theme',
    language: 'Language',
    help: 'Help',
    uploadImage: 'Upload Image',
    clickOrDrag: 'Click or drag image here',
    fileTypes: 'JPG, PNG, DICOM (Max 20MB)',
    resultPreview: 'Result Preview',
    waitingForAnalysis: 'Waiting for analysis',
    analysisResult: 'Analysis Result',
    reportsAndExplanations: 'Reports and Explanations',
    analysisDetailsPopulate: 'Analysis details will populate here'
  },
  ar: {
    newDiagnosis: 'تشخيص جديد',
    categories: 'الفئات',
    brainXray: 'أشعة الدماغ',
    chestXray: 'أشعة الصدر',
    boneXray: 'أشعة العظام',
    history: 'السجل',
    analysisHistory: 'سجل التحليل',
    theme: 'المظهر',
    language: 'اللغة',
    help: 'مساعدة',
    uploadImage: 'تحميل الصورة',
    clickOrDrag: 'انقر أو اسحب الصورة هنا',
    fileTypes: 'JPG, PNG, DICOM (الحد الأقصى 20 ميجابايت)',
    resultPreview: 'معاينة النتيجة',
    waitingForAnalysis: 'في انتظار التحليل',
    analysisResult: 'نتيجة التحليل',
    reportsAndExplanations: 'التقارير والشروحات',
    analysisDetailsPopulate: 'سيتم ملء تفاصيل التحليل هنا'
  }
};

// Get saved language and theme from localStorage
const savedLanguage = localStorage.getItem('language') || 'en';
const savedTheme = localStorage.getItem('theme') || 'dark';

// Initialize language and theme on page load
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(savedLanguage);
  setTheme(savedTheme);
  
  // Update margin after language is set
  const mainContent = document.getElementById('mainContent');
  if (mainContent && savedLanguage === 'ar') {
    mainContent.classList.remove('ml-[280px]');
    mainContent.classList.add('mr-[280px]');
    mainContent.style.marginLeft = '0';
    mainContent.style.marginRight = '280px';
  }
  
  // Language button
  const langBtn = document.querySelector('[data-icon="language"]').closest('button');
  langBtn.addEventListener('click', toggleLanguage);
  
  // Theme button
  const themeBtn = document.querySelector('[data-icon="dark_mode"]').closest('button');
  themeBtn.removeAttribute('onclick');
  themeBtn.addEventListener('click', toggleTheme);
  
  // Help button
  const helpBtn = document.querySelector('[data-icon="help"]').closest('button');
  helpBtn.addEventListener('click', () => {
    alert('ClinicalMind - AI Medical Intelligence\n\nClick or drag medical images to analyze them with AI.');
  });
});

// Set Language
function setLanguage(lang) {
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === 'ar' ? 'rtl' : 'ltr';
  html.classList.toggle('arabic', lang === 'ar');
  
  // Update main content margin based on direction
  const mainContent = document.getElementById('mainContent');
  if (mainContent) {
    if (lang === 'ar') {
      mainContent.classList.remove('ml-[280px]');
      mainContent.classList.add('mr-[280px]');
      mainContent.style.marginLeft = '0';
      mainContent.style.marginRight = '280px';
    } else {
      mainContent.classList.remove('mr-[280px]');
      mainContent.classList.add('ml-[280px]');
      mainContent.style.marginLeft = '280px';
      mainContent.style.marginRight = '0';
    }
  }
  
  // Update all text content
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    el.textContent = translations[lang][key] || key;
  });
  
  // Update sidebar brand
  const subtitle = document.querySelector('p[class*="text-primary"]');
  if (subtitle) {
    subtitle.textContent = lang === 'ar' ? 'ذكاء طبي من الذكاء الاصطناعي' : 'AI Medical Intelligence';
  }
  
  localStorage.setItem('language', lang);
}

function toggleLanguage() {
  const currentLang = document.documentElement.lang;
  const newLang = currentLang === 'en' ? 'ar' : 'en';
  setLanguage(newLang);
}

// Set Theme (dark/light)
function setTheme(theme) {
  const html = document.documentElement;
  if (theme === 'light') {
    html.classList.remove('dark');
  } else {
    html.classList.add('dark');
  }
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.contains('dark');
  const newTheme = isDark ? 'light' : 'dark';
  setTheme(newTheme);
}
