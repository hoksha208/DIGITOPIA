// 1. تعريف عناصر الصفحة (DOM Elements)
const inputText = document.getElementById('input-text');
const outputText = document.getElementById('output-text');

const encryptBtn = document.getElementById('encrypt-btn');
const decryptBtn = document.getElementById('decrypt-btn');
const copyBtn = document.getElementById('copy-btn');
const clearBtn = document.getElementById('clear-btn');

// 2. وظائف التشفير وفك التشفير
// سنستخدم تشفير Base64 لأنه مدعوم بشكل مباشر في المتصفحات ويوضح الفكرة جيداً
// btoa() -> Binary to ASCII (للتشفير)
// atob() -> ASCII to Binary (لفك التشفير)

function handleEncrypt() {
    const textToEncrypt = inputText.value;
    if (!textToEncrypt) {
        alert('الرجاء إدخال نص لتشفيره.');
        return;
    }
    try {
        // استخدام btoa لتشفير النص
        const encryptedText = btoa(unescape(encodeURIComponent(textToEncrypt)));
        outputText.value = encryptedText;
    } catch (error) {
        alert('حدث خطأ أثناء التشفير. تأكد من أن النص صالح.');
        console.error("Encryption Error:", error);
    }
}

function handleDecrypt() {
    const textToDecrypt = inputText.value;
    if (!textToDecrypt) {
        alert('الرجاء إدخال نص لفك تشفيره.');
        return;
    }
    try {
        // استخدام atob لفك تشفير النص
        const decryptedText = decodeURIComponent(escape(atob(textToDecrypt)));
        outputText.value = decryptedText;
    } catch (error) {
        alert('النص المدخل غير صالح لفك التشفير. تأكد من أنه نص مشفر بصيغة Base64.');
        console.error("Decryption Error:", error);
    }
}

// 3. وظائف مساعدة (نسخ ومسح)
function handleCopy() {
    if (!outputText.value) {
        alert('لا يوجد نص لنسخه.');
        return;
    }
    // تحديد النص في حقل الإخراج
    outputText.select();
    outputText.setSelectionRange(0, 99999); // للتوافق مع الأجهزة المحمولة

    // نسخ النص إلى الحافظة
    navigator.clipboard.writeText(outputText.value);

    // إعطاء تغذية راجعة للمستخدم
    alert('تم نسخ النتيجة إلى الحافظة!');
}

function handleClear() {
    inputText.value = '';
    outputText.value = '';
}

// 4. ربط الوظائف بالأزرار (Event Listeners)
encryptBtn.addEventListener('click', handleEncrypt);
decryptBtn.addEventListener('click', handleDecrypt);
copyBtn.addEventListener('click', handleCopy);
clearBtn.addEventListener('click', handleClear);
