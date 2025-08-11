// 1. تعريف عناصر الصفحة
const systemScreen = document.getElementById('system-screen');
const ransomwareScreen = document.getElementById('ransomware-screen');
const responseScreen = document.getElementById('response-screen');
const fileGrid = document.querySelector('.file-grid');
const launchAttackBtn = document.getElementById('launch-attack-btn');
const showResponseBtn = document.getElementById('show-response-btn');
const resetSimulationBtn = document.getElementById('reset-simulation-btn');

// 2. إعدادات المحاكاة
const fileNames = [
    'Patient_Ali_M.pdf', 'Scans_Fatima_H.zip', 'Records_2023.docx',
    'Billing_Info.xlsx', 'Appointments.csv', 'X-Rays_Youssef_K.jpg',
    'Lab_Results.pdf', 'Staff_Schedule.docx'
];

// 3. وظائف المحاكاة

// --- وظيفة لإنشاء الملفات الأولية ---
function createInitialFiles() {
    fileGrid.innerHTML = ''; // مسح أي ملفات قديمة
    fileNames.forEach(name => {
        const fileDiv = document.createElement('div');
        fileDiv.classList.add('file');
        fileDiv.innerHTML = `
            <div class="icon">📄</div>
            <div class="name">${name}</div>
        `;
        fileGrid.appendChild(fileDiv);
    });
}

// --- وظيفة لبدء هجوم الفدية ---
function launchAttack() {
    // إظهار شاشة الفدية
    ransomwareScreen.classList.add('active');

    // محاكاة تشفير الملفات بشكل بصري
    const files = document.querySelectorAll('.file');
    let i = 0;
    const encryptInterval = setInterval(() => {
        if (i < files.length) {
            files[i].classList.add('encrypted');
            files[i].querySelector('.name').innerText += '.encrypted';
            i++;
        } else {
            clearInterval(encryptInterval);
        }
    }, 300); // تشفير ملف كل 0.3 ثانية
}

// --- وظيفة لإظهار خطوات الاستجابة ---
function showResponseSteps() {
    responseScreen.classList.add('active');
}

// --- وظيفة لإعادة تعيين المحاكاة ---
function resetSimulation() {
    // إخفاء كل الشاشات الإضافية
    ransomwareScreen.classList.remove('active');
    responseScreen.classList.remove('active');
    
    // إعادة إنشاء الملفات الأصلية
    createInitialFiles();
}

// 4. ربط الوظائف بالأزرار
launchAttackBtn.addEventListener('click', launchAttack);
showResponseBtn.addEventListener('click', showResponseSteps);
resetSimulationBtn.addEventListener('click', resetSimulation);

// 5. تشغيل المحاكاة عند تحميل الصفحة
// نبدأ بإنشاء الملفات الأولية عندما يتم تحميل الصفحة
window.onload = createInitialFiles;
// 6. إضافة تأثيرات CSS
const style = document.createElement('style'); 
style.textContent = `
    .file.encrypted {
        background-color: #f8d7da; /* لون خلفية للملفات المشفرة */
        color: #721c24; /* لون نص للملفات المشفرة */
    }
    .file.encrypted .icon {
        color: #721c24; /* تغيير لون الأيقونة للملفات المشفرة */
    }
`;
document.head.appendChild(style);