const translations = {
    en: {
        aiMedical: "AI Medical Intelligence",
        newDiagnosis: "New Diagnosis",
        newAnalysis: "New Analysis",
        categories: "Categories",
        brainXray: "Brain X-ray",
        chestXray: "Chest X-ray",
        boneXray: "Bone X-ray",
        brainAnalysis: "Brain X-ray Analysis",
        chestAnalysis: "Chest X-ray Analysis",
        boneAnalysis: "Bone X-ray Analysis",
        theme: "Theme",
        language: "Language",
        help: "Help",
        uploadImage: "Upload Image",
        clickOrDrag: "Click or drag image here",
        maxSize: "JPG, PNG, DICOM (Max 20MB)",
        analysisResult: "Analysis Result",
        analysisDetails: "Analysis details will populate here",
        backToHome: "Back to Home",
        confidence: "Confidence",
        diagnosis: "Diagnosis",
        recommendations: "Recommendations",
        severity: "Severity",
        analyze: "Analyze",
        analyzing: "Analyzing...",
        noImageSelected: "No image selected",
        selectImage: "Please select an image first",
        enterSymptoms: "Enter Symptoms",
        diagnosisResult: "Diagnosis Result",
        newDiagnosisDesc: "Enter patient symptoms and get AI-powered disease predictions with confidence scores",
        newAnalysisDesc: "Upload medical images for general analysis and AI-powered diagnostic insights",
        brainXrayDesc: "Specialized analysis for brain X-ray images to detect abnormalities",
        chestXrayDesc: "Specialized analysis for chest X-ray images to identify lung and heart conditions",
        boneXrayDesc: "Specialized analysis for bone X-ray images to detect fractures and bone disorders"
    },
    ar: {
        aiMedical: "ذكاء اصطناعي طبي",
        newDiagnosis: "تشخيص جديد",
        newAnalysis: "تحليل جديد",
        categories: "الفئات",
        brainXray: "أشعة الدماغ",
        chestXray: "أشعة الصدر",
        boneXray: "أشعة العظام",
        brainAnalysis: "تحليل أشعة الدماغ",
        chestAnalysis: "تحليل أشعة الصدر",
        boneAnalysis: "تحليل أشعة العظام",
        theme: "المظهر",
        language: "اللغة",
        help: "مساعدة",
        uploadImage: "رفع صورة",
        clickOrDrag: "انقر أو اسحب الصورة هنا",
        maxSize: "JPG, PNG, DICOM (الحد الأقصى 20MB)",
        analysisResult: "نتيجة التحليل",
        analysisDetails: "ستظهر تفاصيل التحليل هنا",
        backToHome: "العودة إلى الرئيسية",
        confidence: "درجة الثقة",
        diagnosis: "التشخيص",
        recommendations: "التوصيات",
        severity: "درجة الخطورة",
        analyze: "تحليل",
        analyzing: "جاري التحليل...",
        noImageSelected: "لم يتم اختيار صورة",
        selectImage: "يرجى اختيار صورة أولاً",
        enterSymptoms: "إدخال الأعراض",
        diagnosisResult: "نتيجة التشخيص",
        newDiagnosisDesc: "أدخل أعراض المريض واحصل على تنبؤات الأمراض المدعومة بالذكاء الاصطناعي مع درجات الثقة",
        newAnalysisDesc: "رفع الصور الطبية للتحليل العام والحصول على رؤى تشخيصية مدعومة بالذكاء الاصطناعي",
        brainXrayDesc: "تحليل متخصص لصور أشعة الدماغ للكشف عن التشوهات",
        chestXrayDesc: "تحليل متخصص لصور أشعة الصدر لتحديد حالات الرئة والقلب",
        boneXrayDesc: "تحليل متخصص لصور أشعة العظام للكشف عن الكسور واضطرابات العظام"
    }
};

let currentLanguage = localStorage.getItem('language') || 'en';
const API_BASE_URL = 'http://localhost:8000';

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function getPreviewImageSrc(previewId) {
    const preview = document.getElementById(previewId);
    const previewImage = preview ? preview.querySelector('img') : null;
    return previewImage ? previewImage.src : '';
}

function setButtonState(buttonId, disabled, label) {
    const button = document.getElementById(buttonId);
    if (!button) {
        return;
    }

    button.disabled = disabled;
    if (label) {
        button.textContent = label;
    }
}

function renderPredictionResult(containerId, data, previewSrc, titleKey) {
    const resultContainer = document.getElementById(containerId);
    if (!resultContainer) {
        throw Object.assign(new Error(`Result container not found: ${containerId}`), {
            issueArea: 'DOM rendering'
        });
    }

    const prediction = data.prediction || 'Unknown';
    const confidence = Number(data.confidence ?? 0);
    const title = translations[currentLanguage][titleKey] || translations[currentLanguage].analysisResult;

    resultContainer.innerHTML = `
        <div class="space-y-6 w-full">
            <div class="glass-panel rounded-2xl p-panel-padding">
                <h4 class="font-headline-sm text-on-surface mb-4">Uploaded Image</h4>
                <div class="flex items-center gap-4">
                    <div class="w-24 h-24 rounded-xl overflow-hidden bg-surface-container-high/30 border border-outline-variant/10 flex items-center justify-center shrink-0">
                        ${previewSrc ? `<img src="${previewSrc}" alt="Uploaded preview" class="w-full h-full object-contain" />` : '<span class="material-symbols-outlined text-4xl text-outline">image_not_supported</span>'}
                    </div>
                    <div>
                        <p class="text-sm text-on-surface-variant">Preview sent to the AI model</p>
                        <p class="text-xs uppercase tracking-[0.25em] text-outline mt-2">${escapeHtml(title)}</p>
                    </div>
                </div>
            </div>

            <div class="glass-panel rounded-2xl p-panel-padding">
                <h4 class="font-headline-sm text-on-surface mb-4">Prediction</h4>
                <p class="text-2xl font-bold text-on-surface">${escapeHtml(prediction)}</p>
            </div>

            <div class="glass-panel rounded-2xl p-panel-padding">
                <h4 class="font-headline-sm text-on-surface mb-4">Confidence</h4>
                <div class="flex items-center gap-4">
                    <div class="flex-1 bg-surface-container-high rounded-full h-2 overflow-hidden">
                        <div class="bg-tertiary h-2 rounded-full" style="width: ${Math.max(0, Math.min(100, confidence))}%"></div>
                    </div>
                    <span class="text-tertiary font-bold whitespace-nowrap">${confidence.toFixed(2)}%</span>
                </div>
            </div>
        </div>
    `;
}

function renderAnalysisError(containerId, issueArea, error, fallbackMessage) {
    const resultContainer = document.getElementById(containerId);
    if (!resultContainer) {
        throw Object.assign(new Error(`Result container not found: ${containerId}`), {
            issueArea: 'DOM rendering'
        });
    }

    const message = error instanceof Error ? error.message : String(error);
    resultContainer.innerHTML = `
        <div class="glass-panel rounded-2xl p-panel-padding bg-error/10 border border-error/30 w-full">
            <h4 class="font-headline-sm text-error mb-3">Analysis failed</h4>
            <p class="text-on-surface-variant mb-3">${escapeHtml(fallbackMessage || 'The analysis could not be completed.')} </p>
            <div class="space-y-1 text-sm text-on-surface-variant">
                <p><span class="font-bold text-on-surface">Issue area:</span> ${escapeHtml(issueArea)}</p>
                <p><span class="font-bold text-on-surface">Error:</span> ${escapeHtml(message)}</p>
            </div>
        </div>
    `;
}

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
    
    const descKey = {
        'newAnalysis': 'newAnalysisDesc',
        'diagnosis': 'newDiagnosisDesc',
        'analysis-brain': 'brainXrayDesc',
        'analysis-chest': 'chestXrayDesc',
        'analysis-bone': 'boneXrayDesc'
    };
    const descElement = document.getElementById('pageDescription');
    if (descElement && descKey[currentPage]) {
        descElement.textContent = translations[lang][descKey[currentPage]];
    }
    
    const style = document.getElementById('font-style');
    if (lang === 'ar') {
        style.textContent = `
            * { font-family: 'Cairo', sans-serif !important; }
            .material-symbols-outlined { font-family: 'Material Symbols Outlined' !important; }
        `;
    } else {
        style.textContent = `
            * { font-family: 'Inter', sans-serif !important; }
            .material-symbols-outlined { font-family: 'Material Symbols Outlined' !important; }
        `;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLanguage);
    updatePageDescription('newAnalysisDesc');
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.textContent = currentLanguage === 'en' ? 'EN / AR' : 'ع / إ';
    }
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    showPage('newAnalysis');
});

function toggleLanguage() {
    const newLang = currentLanguage === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.textContent = newLang === 'en' ? 'EN / AR' : 'ع / إ';
    }
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

let currentPage = 'newAnalysis';

function goHome() {
    window.location.href = 'home.html';
}

function showPage(page) {
    currentPage = page;
    
    document.getElementById('newAnalysisPage').style.display = 'none';
    document.getElementById('diagnosisPage').style.display = 'none';
    document.getElementById('analysisPage').style.display = 'none';
    
    document.querySelectorAll('aside a').forEach(link => {
        link.classList.remove('bg-primary/10', 'dark:bg-primary-container/20', 'text-primary', 'dark:text-primary', 'border-l-4', 'border-primary', 'shadow-sm');
        link.classList.add('text-on-surface-variant/70', 'hover:text-on-surface', 'hover:bg-surface-container-high', 'dark:hover:bg-white/5');
    });
    
    function setActiveLink(pageType) {
        const links = document.querySelectorAll('aside a');
        links.forEach(link => {
            const onclick = link.getAttribute('onclick');
            if (onclick && onclick.includes(`showPage('${pageType}')`)) {
                link.classList.remove('text-on-surface-variant/70', 'hover:text-on-surface', 'hover:bg-surface-container-high', 'dark:hover:bg-white/5');
                link.classList.add('bg-primary/10', 'dark:bg-primary-container/20', 'text-primary', 'dark:text-primary', 'border-l-4', 'border-primary', 'shadow-sm');
            }
        });
    }
    
    if (page === 'newAnalysis') {
        document.getElementById('newAnalysisPage').style.display = 'block';
        updatePageDescription('newAnalysisDesc');
        setActiveLink('newAnalysis');
    } else if (page === 'diagnosis') {
        document.getElementById('diagnosisPage').style.display = 'block';
        updatePageDescription('newDiagnosisDesc');
        setActiveLink('diagnosis');
    } else if (page.startsWith('analysis-')) {
        const category = page.split('-')[1];
        document.getElementById('analysisPage').style.display = 'block';
        updateAnalysisCategory(category);
        
        const descKey = {
            'brain': 'brainXrayDesc',
            'chest': 'chestXrayDesc',
            'bone': 'boneXrayDesc'
        };
        updatePageDescription(descKey[category]);
        
        setActiveLink(`analysis-${category}`);
    }
}

function updatePageDescription(descKey) {
    const descElement = document.getElementById('pageDescription');
    if (descElement) {
        descElement.textContent = translations[currentLanguage][descKey];
    }
}

function updateAnalysisCategory(category) {
    const categoryNames = {
        'brain': translations[currentLanguage].brainAnalysis,
        'chest': translations[currentLanguage].chestAnalysis,
        'bone': translations[currentLanguage].boneAnalysis
    };
    document.getElementById('analysisCategoryTitle').textContent = categoryNames[category] || categoryNames['brain'];
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('imagePreview');
            preview.innerHTML = `<img src="${e.target.result}" class="w-full h-full object-contain rounded-xl" alt="Preview">`;
            document.getElementById('analyzeBtn').disabled = false;
        };
        reader.readAsDataURL(file);
    }
}

async function analyzeImage() {
    const fileInput = document.getElementById('imageInput');
    const file = fileInput ? fileInput.files[0] : null;
    const previewSrc = getPreviewImageSrc('imagePreview');

    if (!file || !previewSrc) {
        alert(translations[currentLanguage].selectImage);
        return;
    }

    setButtonState('analyzeBtn', true, translations[currentLanguage].analyzing);

    try {
        const formData = new FormData();
        formData.append('file', file);

        formData.append('category', 'chest');
        const response = await fetch(`${API_BASE_URL}/predict`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw Object.assign(new Error(errorText || `Request failed with status ${response.status}`), {
                issueArea: 'API request'
            });
        }

        let data;
        try {
            data = await response.json();
        } catch (parseError) {
            throw Object.assign(new Error('Unable to parse JSON response from the backend'), {
                issueArea: 'response parsing'
            });
        }

        if (typeof data.prediction === 'undefined' || typeof data.confidence === 'undefined') {
            throw Object.assign(new Error('Backend response is missing prediction or confidence fields'), {
                issueArea: 'response parsing'
            });
        }

        renderPredictionResult('resultContainer', data, previewSrc, 'analysisResult');
    } catch (error) {
        const issueArea = error && error.issueArea
            ? error.issueArea
            : (error instanceof TypeError ? 'API request / CORS' : 'frontend JS');
        renderAnalysisError('resultContainer', issueArea, error, 'The chest analysis request did not complete.');
        console.error('Chest analysis failed:', error);
    } finally {
        setButtonState('analyzeBtn', false, translations[currentLanguage].analyze);
    }
}

function handleAnalysisImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('analysisImagePreview');
            preview.innerHTML = `<img src="${e.target.result}" class="w-full h-full object-contain rounded-xl" alt="Preview">`;
            document.getElementById('analysisAnalyzeBtn').disabled = false;
        };
        reader.readAsDataURL(file);
    }
}

async function analyzeImageCategory() {
    const fileInput = document.getElementById('analysisImageInput');
    const file = fileInput ? fileInput.files[0] : null;
    const previewSrc = getPreviewImageSrc('analysisImagePreview');
    const category = currentPage.split('-')[1];

    if (!file || !previewSrc) {
        alert(translations[currentLanguage].selectImage);
        return;
    }

    if (category !== 'chest') {
        renderAnalysisError(
            'analysisResultContainer',
            'frontend JS',
            new Error(`Real inference is currently connected only for chest analysis. Selected category: ${category}.`),
            'This category is still using placeholder behavior.'
        );
        return;
    }

    setButtonState('analysisAnalyzeBtn', true, translations[currentLanguage].analyzing);

    try {
        const formData = new FormData();
        formData.append('file', file);

        formData.append('category', category);
        const response = await fetch(`${API_BASE_URL}/predict`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw Object.assign(new Error(errorText || `Request failed with status ${response.status}`), {
                issueArea: 'API request'
            });
        }

        let data;
        try {
            data = await response.json();
        } catch (parseError) {
            throw Object.assign(new Error('Unable to parse JSON response from the backend'), {
                issueArea: 'response parsing'
            });
        }

        if (typeof data.prediction === 'undefined' || typeof data.confidence === 'undefined') {
            throw Object.assign(new Error('Backend response is missing prediction or confidence fields'), {
                issueArea: 'response parsing'
            });
        }

        renderPredictionResult('analysisResultContainer', data, previewSrc, 'analysisResult');
    } catch (error) {
        const issueArea = error && error.issueArea
            ? error.issueArea
            : (error instanceof TypeError ? 'API request / CORS' : 'frontend JS');
        renderAnalysisError('analysisResultContainer', issueArea, error, 'The chest analysis request did not complete.');
        console.error('Chest category analysis failed:', error);
    } finally {
        setButtonState('analysisAnalyzeBtn', false, translations[currentLanguage].analyze);
    }
}

async function analyzeDiagnosis() {
    const symptomsInput = document.getElementById('symptomsInput');
    const symptoms = symptomsInput.value.trim();

    if (!symptoms) {
        alert(translations[currentLanguage].selectImage);
        return;
    }

    const analyzeBtn = document.getElementById('diagnosisBtn');
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = translations[currentLanguage].analyzing;

    try {
        // استدعاء دالة Gemini AI من ملف gemini-api.js
        if (typeof analyzeSymptomsWithGemini === 'function') {
            const results = await analyzeSymptomsWithGemini(symptoms);
            displayDiagnosisResults(results, currentLanguage);
        } else {
            throw new Error('Gemini API not loaded');
        }
    } catch (error) {
        console.error('Error:', error);
        
        const resultContainer = document.getElementById('diagnosisResultContainer');
        resultContainer.innerHTML = `
            <div class="glass-panel rounded-2xl p-panel-padding bg-error/10 border-error/30">
                <h4 class="font-headline-sm text-error mb-4">حدث خطأ</h4>
                <p class="text-on-surface-variant">
                    عذراً، حدث خطأ أثناء تحليل الأعراض. يرجى المحاولة مرة أخرى.
                </p>
            </div>
        `;
    } finally {
        analyzeBtn.disabled = false;
        analyzeBtn.textContent = translations[currentLanguage].analyze;
    }
}
