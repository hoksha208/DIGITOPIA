// 1. تعريف عناصر الصفحة (DOM Elements)
const loginStep = document.getElementById('login-step');
const otpStep = document.getElementById('otp-step');
const successStep = document.getElementById('success-step');

const loginBtn = document.getElementById('login-btn');
const otpBtn = document.getElementById('otp-btn');
const logoutBtn = document.getElementById('logout-btn');

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const otpInput = document.getElementById('otp-code');

const loginError = document.getElementById('login-error');
const otpError = document.getElementById('otp-error');

const generatedOtpSpan = document.getElementById('generated-otp');
const welcomeUsernameSpan = document.getElementById('welcome-username');

// 2. بيانات وهمية وقيم مؤقتة
const fakeUser = {
    username: 'testuser',
    password: 'password123'
};

let generatedOtp = '';

// 3. وظائف النظام الأساسية
function handleLogin() {
    const enteredUsername = usernameInput.value;
    const enteredPassword = passwordInput.value;

    if (enteredUsername === fakeUser.username && enteredPassword === fakeUser.password) {
        loginError.innerText = '';
        
        generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        
        generatedOtpSpan.innerText = generatedOtp;

        loginStep.classList.remove('active');
        otpStep.classList.add('active');
    } else {
        loginError.innerText = 'اسم المستخدم أو كلمة المرور غير صحيحة.';
    }
}

function handleOtpVerification() {
    const enteredOtp = otpInput.value;

    if (enteredOtp === generatedOtp) {
        otpError.innerText = '';
        
        welcomeUsernameSpan.innerText = usernameInput.value;

        otpStep.classList.remove('active');
        successStep.classList.add('active');
    } else {
        otpError.innerText = 'رمز التحقق غير صحيح. حاول مرة أخرى.';
    }
}

function handleLogout() {
    usernameInput.value = '';
    passwordInput.value = '';
    otpInput.value = '';
    
    successStep.classList.remove('active');
    loginStep.classList.add('active');
}

// 4. ربط الوظائف بالأزرار (Event Listeners)
loginBtn.addEventListener('click', handleLogin);
otpBtn.addEventListener('click', handleOtpVerification);
logoutBtn.addEventListener('click', handleLogout);

// إضافة إمكانية الضغط على Enter للتنقل
passwordInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        handleLogin();
    }
});

otpInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        handleOtpVerification();
    }
});
// 5. تهيئة الصفحة
document.addEventListener('DOMContentLoaded', () => {
    loginStep.classList.add('active');
    otpStep.classList.remove('active');
    successStep.classList.remove('active');
});
// 6. إضافة بعض التنسيقات الأساسية  
document.body.style.fontFamily = 'Arial, sans-serif';
document.body.style.backgroundColor = '#f4f4f4';
document.body.style.color = '#333';
document.body.style.padding = '20px';
document.body.style.maxWidth = '600px';
document.body.style.margin = '0 auto';
document.querySelectorAll('.step').forEach(step => {
    step.style.display = 'none';
});
document.querySelectorAll('.step.active').forEach(step => {
    step.style.display = 'block';
});
document.querySelectorAll('input').forEach(input => {
    input.style.width = '100%';
    input.style.padding = '10px';
    input.style.marginBottom = '10px';
    input.style.border = '1px solid #ccc';
    input.style.borderRadius = '4px';
});
document.querySelectorAll('button').forEach(button => {
    button.style.padding = '10px 15px';
    button.style.backgroundColor = '#007bff';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.cursor = 'pointer';
});
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.backgroundColor = '#0056b3';
    });
    button.addEventListener('mouseout', () => {
        button.style.backgroundColor = '#007bff';
    });
});
document.querySelectorAll('.error').forEach(error => {
    error.style.color = 'red';
    error.style.fontSize = '0.9em';
});
document.querySelectorAll('.step').forEach(step => {
    step.style.padding = '20px';
    step.style.backgroundColor = '#fff';
    step.style.borderRadius = '8px';
    step.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
});
document.querySelectorAll('.step.active').forEach(step => {
    step.style.display = 'block';
});
// 7. إضافة بعض الرسائل التوجيهية
const instructions = document.createElement('div');
instructions.innerHTML = `
    <h2>نظام تسجيل الدخول متعدد العوامل</h2>
    <p>يرجى إدخال اسم المستخدم وكلمة المرور الخاصة بك لتسجيل الدخول. بعد ذلك، ستتلقى رمز تحقق عبر OTP للتحقق من هويتك.</p>
`;
document.body.insertBefore(instructions, loginStep);
document.querySelectorAll('.step').forEach(step => {
    step.style.display = 'none';
});
document.querySelectorAll('.step.active').forEach(step => {
    step.style.display = 'block';
});
// 8. إضافة بعض الرسوم المتحركة
const steps = document.querySelectorAll('.step');
steps.forEach(step => {
    step.style.transition = 'opacity 0.3s ease-in-out';
    step.style.opacity = '0';
    if (step.classList.contains('active')) {
        step.style.opacity = '1';
    }  
});
document.addEventListener('DOMContentLoaded', () => {
    steps.forEach(step => {
        step.style.display = 'none';
    });
    const activeStep = document.querySelector('.step.active');
    if (activeStep) {
        activeStep.style.display = 'block';
        activeStep.style.opacity = '1';
    }
});