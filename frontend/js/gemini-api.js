// Gemini AI API Configuration
const GEMINI_API_KEY = 'AIzaSyAtSwAq_HJG1dyr8aF-13Uq1vyGEIdEQKU';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// دالة لتحليل الأعراض باستخدام Gemini AI
async function analyzeSymptomsWithGemini(symptoms) {
    try {
        const prompt = `أنت طبيب متخصص. المريض يعاني من الأعراض التالية: ${symptoms}

قم بتحليل هذه الأعراض وقدم:
1. التشخيص المحتمل (الأمراض المحتملة مع نسبة الاحتمالية)
2. درجة الخطورة (منخفضة، متوسطة، عالية)
3. الأسباب المحتملة
4. العلاج الموصى به
5. نصائح إضافية

قدم الإجابة بتنسيق JSON كالتالي:
{
  "possibleDiseases": [
    {"name": "اسم المرض", "probability": 85}
  ],
  "severity": "متوسطة",
  "severityLevel": "moderate",
  "causes": ["السبب 1", "السبب 2"],
  "treatment": ["العلاج 1", "العلاج 2"],
  "recommendations": ["نصيحة 1", "نصيحة 2"]
}`;

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 2048,
                }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // استخراج النص من الاستجابة
        const text = data.candidates[0].content.parts[0].text;
        
        // محاولة استخراج JSON من النص
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        
        // إذا لم يكن JSON، قم بتحليل النص يدوياً
        return parseGeminiResponse(text);
        
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        throw error;
    }
}

// دالة لتحليل استجابة Gemini إذا لم تكن JSON
function parseGeminiResponse(text) {
    // تحليل بسيط للنص
    return {
        possibleDiseases: [
            {name: "يرجى مراجعة الطبيب", probability: 0}
        ],
        severity: "غير محدد",
        severityLevel: "unknown",
        causes: ["يتطلب فحص طبي"],
        treatment: ["استشارة طبيب متخصص"],
        recommendations: [text.substring(0, 200)]
    };
}

// دالة لعرض النتائج
function displayDiagnosisResults(results, language = 'ar') {
    const resultContainer = document.getElementById('diagnosisResultContainer');
    
    // بناء HTML للأمراض المحتملة
    let diseasesHTML = '';
    results.possibleDiseases.forEach(disease => {
        diseasesHTML += `
            <div class="flex items-center justify-between p-3 bg-surface-container-high/30 rounded-xl">
                <span class="text-on-surface">${disease.name}</span>
                <span class="text-tertiary font-bold">${disease.probability}%</span>
            </div>
        `;
    });
    
    // بناء HTML للأسباب
    let causesHTML = '';
    results.causes.forEach(cause => {
        causesHTML += `
            <li class="flex gap-2">
                <span class="text-tertiary">•</span>
                <span>${cause}</span>
            </li>
        `;
    });
    
    // بناء HTML للعلاج
    let treatmentHTML = '';
    results.treatment.forEach(treat => {
        treatmentHTML += `
            <li class="flex gap-2">
                <span class="text-tertiary">•</span>
                <span>${treat}</span>
            </li>
        `;
    });
    
    // بناء HTML للتوصيات
    let recommendationsHTML = '';
    results.recommendations.forEach(rec => {
        recommendationsHTML += `
            <li class="flex gap-2">
                <span class="text-tertiary">•</span>
                <span>${rec}</span>
            </li>
        `;
    });
    
    // تحديد لون درجة الخطورة
    let severityColor = 'tertiary';
    if (results.severityLevel === 'high') severityColor = 'error';
    else if (results.severityLevel === 'moderate') severityColor = 'primary';
    
    resultContainer.innerHTML = `
        <div class="space-y-6">
            <div class="glass-panel rounded-2xl p-panel-padding">
                <h4 class="font-headline-sm text-on-surface mb-4">الأمراض المحتملة</h4>
                <div class="space-y-3">
                    ${diseasesHTML}
                </div>
            </div>
            
            <div class="glass-panel rounded-2xl p-panel-padding">
                <h4 class="font-headline-sm text-on-surface mb-4">درجة الخطورة</h4>
                <span class="px-4 py-2 rounded-full bg-${severityColor}/20 text-${severityColor} font-bold text-sm">${results.severity}</span>
            </div>

            <div class="glass-panel rounded-2xl p-panel-padding">
                <h4 class="font-headline-sm text-on-surface mb-4">الأسباب المحتملة</h4>
                <ul class="space-y-2 text-on-surface-variant">
                    ${causesHTML}
                </ul>
            </div>

            <div class="glass-panel rounded-2xl p-panel-padding">
                <h4 class="font-headline-sm text-on-surface mb-4">العلاج الموصى به</h4>
                <ul class="space-y-2 text-on-surface-variant">
                    ${treatmentHTML}
                </ul>
            </div>

            <div class="glass-panel rounded-2xl p-panel-padding">
                <h4 class="font-headline-sm text-on-surface mb-4">نصائح إضافية</h4>
                <ul class="space-y-2 text-on-surface-variant">
                    ${recommendationsHTML}
                </ul>
            </div>

            <div class="glass-panel rounded-2xl p-panel-padding bg-primary/10 border-primary/30">
                <p class="text-sm text-on-surface-variant">
                    ⚠️ <strong>تنبيه:</strong> هذا التشخيص مبني على الذكاء الاصطناعي ولا يغني عن استشارة الطبيب المتخصص. يرجى مراجعة الطبيب للحصول على تشخيص دقيق.
                </p>
            </div>
        </div>
    `;
}

// تحديث دالة analyzeDiagnosis في dashboard-script.js
async function analyzeDiagnosisWithAI() {
    const symptomsInput = document.getElementById('symptomsInput');
    const symptoms = symptomsInput.value.trim();

    if (!symptoms) {
        alert('يرجى إدخال الأعراض أولاً');
        return;
    }

    const analyzeBtn = document.getElementById('diagnosisBtn');
    const originalText = analyzeBtn.textContent;
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = 'جاري التحليل...';

    try {
        // استدعاء Gemini AI
        const results = await analyzeSymptomsWithGemini(symptoms);
        
        // عرض النتائج
        displayDiagnosisResults(results);
        
    } catch (error) {
        console.error('Error:', error);
        
        // عرض رسالة خطأ
        const resultContainer = document.getElementById('diagnosisResultContainer');
        resultContainer.innerHTML = `
            <div class="glass-panel rounded-2xl p-panel-padding bg-error/10 border-error/30">
                <h4 class="font-headline-sm text-error mb-4">حدث خطأ</h4>
                <p class="text-on-surface-variant">
                    عذراً، حدث خطأ أثناء تحليل الأعراض. يرجى المحاولة مرة أخرى.
                </p>
                <p class="text-sm text-on-surface-variant mt-2">
                    الخطأ: ${error.message}
                </p>
            </div>
        `;
    } finally {
        analyzeBtn.disabled = false;
        analyzeBtn.textContent = originalText;
    }
}
