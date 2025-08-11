// 1. تعريف عناصر الصفحة
const qrCodeWrappers = document.querySelectorAll('.qr-code-wrapper');
const scanResultContainer = document.getElementById('scan-result');
const resultBox = document.getElementById('result-box');
const statusIcon = document.getElementById('status-icon');
const statusText = document.getElementById('status-text');
const scannedUrl = document.getElementById('scanned-url');
const recommendation = document.getElementById('recommendation');

// 2. قائمة الكلمات المفتاحية الخطيرة
const dangerousKeywords = ['suspicious', 'phishing', 'malware', 'login-confirm'];
const suspiciousTlds = ['.xyz', '.club', '.top', '.info']; // نطاقات عليا غالباً ما تستخدم في الاحتيال

// 3. وظيفة تحليل الرابط
function analyzeUrl(url) {
    // تحويل الرابط إلى حروف صغيرة لتسهيل البحث
    const lowerUrl = url.toLowerCase();
    let result = {
        status: 'safe',
        message: 'الرابط يبدو آمناً.',
        recommendation: 'يمكنك المتابعة بحذر.'
    };

    // --- فحص الكلمات الخطيرة ---
    if (dangerousKeywords.some(keyword => lowerUrl.includes(keyword))) {
        result.status = 'dangerous';
        result.message = 'خطر! الرابط يحتوي على كلمات مشبوهة.';
        result.recommendation = 'لا تفتح هذا الرابط أبداً.';
        return result;
    }

    // --- فحص النطاقات العليا المشبوهة ---
    if (suspiciousTlds.some(tld => lowerUrl.endsWith(tld))) {
        result.status = 'suspicious';
        result.message = 'تنبيه! الرابط يستخدم نطاقاً غير شائع.';
        result.recommendation = 'تأكد من أنك تثق بالمصدر قبل المتابعة.';
        return result;
    }

    // --- فحص أخطاء الكتابة الشائعة (Typo-squatting) ---
    if (lowerUrl.includes('g00gle') || lowerUrl.includes('faceboook')) {
        result.status = 'dangerous';
        result.message = 'خطر! الرابط يحاول تقليد موقع مشهور.';
        result.recommendation = 'هذه محاولة تصيد. لا تفتح الرابط.';
        return result;
    }
    
    // --- فحص إذا كان الرابط HTTP بدلاً من HTTPS ---
    if (url.startsWith('http://' )) {
        result.status = 'suspicious';
        result.message = 'تنبيه! الاتصال غير آمن (HTTP).';
        result.recommendation = 'تجنب إدخال أي بيانات حساسة في هذا الموقع.';
        return result;
    }

    return result;
}

// 4. وظيفة عرض نتائج الفحص
function displayScanResult(url) {
    const analysis = analyzeUrl(url);

    // إزالة كلاسات الحالة القديمة
    resultBox.classList.remove('safe', 'suspicious', 'dangerous');

    // إضافة كلاس الحالة الجديد
    resultBox.classList.add(analysis.status);

    // تحديث محتوى صندوق النتائج
    statusText.innerText = analysis.message;
    scannedUrl.innerText = url;
    recommendation.innerText = analysis.recommendation;

    // إظهار صندوق النتائج
    scanResultContainer.classList.remove('hidden');
}

// 5. ربط حدث النقر بكل رمز QR
qrCodeWrappers.forEach(wrapper => {
    wrapper.addEventListener('click', () => {
        // الحصول على الرابط من خاصية data-url
        const urlToScan = wrapper.dataset.url;
        // عرض نتائج تحليل هذا الرابط
        displayScanResult(urlToScan);
    });
});
// 6. إضافة حدث النقر على زر إعادة الفحص
document.getElementById('rescan-button').addEventListener('click', () => {
    // إخفاء صندوق النتائج
    scanResultContainer.classList.add('hidden');
    // إعادة تعيين محتوى صندوق النتائج
    resultBox.className = 'result-box';
    statusText.innerText = '';
    scannedUrl.innerText = '';
    recommendation.innerText = '';
});
// 7. إضافة حدث النقر على زر إغلاق صندوق النتائج    
document.getElementById('close-button').addEventListener('click', () => {
    // إخفاء صندوق النتائج
    scanResultContainer.classList.add('hidden');
    // إعادة تعيين محتوى صندوق النتائج
    resultBox.className = 'result-box';
    statusText.innerText = '';
    scannedUrl.innerText = '';
    recommendation.innerText = '';
});