// 1. تعريف عناصر الصفحة (DOM Elements)
const welcomeScreen = document.getElementById('welcome-screen');
const simulatorScreen = document.getElementById('simulator-screen');
const resultsScreen = document.getElementById('results-screen');

const startBtn = document.getElementById('start-btn');
const scenarioContainer = document.getElementById('scenario-container');
const realBtn = document.getElementById('real-btn');
const fakeBtn = document.getElementById('fake-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

const feedbackMessage = document.getElementById('feedback-message');
const scoreText = document.getElementById('score-text');

// 2. قائمة سيناريوهات الاحتيال
const scenarios = [
    {
        text: "مبروك! تم اختيار رقمك للفوز بـ 200,000 جنيه من البنك الأهلي. لتأكيد الاستلام، يرجى إرسال بيانات بطاقتك كاملة على الرابط التالي: bit.ly/Ahly-Win",
        isFake: true,
        feedback: "البنوك لا تطلب بيانات البطاقة عبر روابط، والعناوين المختصرة مثل bit.ly غالباً ما تكون مريبة."
    },
    {
        text: "عزيزي العميل، لقد لاحظنا نشاطاً مريباً على حسابك. يرجى تأكيد هويتك فوراً عبر تسجيل الدخول من هنا لتجنب إيقاف الحساب: facebook-secure-login.com",
        isFake: true,
        feedback: "انظر جيداً للرابط، إنه ليس فيسبوك الرسمي. المحتالون يقلدون أشكال المواقع الشهيرة."
    },
    {
        text: "تم شحن طلبك من أمازون رقم #408-1234567-8901234. من المتوقع وصوله يوم الثلاثاء. يمكنك تتبع الشحنة من تطبيق أمازون الرسمي.",
        isFake: false,
        feedback: "هذه رسالة حقيقية. لا تطلب أي معلومات شخصية، لا تحتوي على روابط مريبة، وتوجهك إلى التطبيق الرسمي."
    },
    {
        text: "خالتي بعتالك 5000 جنيه على فودافون كاش بس محتاجة تأكيد. اتصل بـ *9*1# ودخل الرقم السري عشان الفلوس توصلك.",
        isFake: true,
        feedback: "هذا كود احتيالي مشهور لتحويل الأموال *من* حسابك وليس *إلى* حسابك. كن حذراً من أي أكواد تطلب منك إدخالها."
    },
    {
        text: "تحديث هام من واتساب: سيتم إيقاف حسابك خلال 24 ساعة لعدم تحديث البيانات. اضغط هنا للحفاظ على حسابك: wa.me/update-2024-info",
        isFake: true,
        feedback: "واتساب لا يرسل مثل هذه التحذيرات أبداً، والضغط على الرابط قد يؤدي إلى اختراق حسابك."
    }
];

// 3. متغيرات لتتبع حالة اللعبة
let currentScenarioIndex = 0;
let score = 0;

// 4. وظائف التحكم باللعبة
function startGame() {
    welcomeScreen.classList.add('hidden');
    resultsScreen.classList.add('hidden');
    simulatorScreen.classList.remove('hidden');
    
    currentScenarioIndex = 0;
    score = 0;
    
    showScenario(currentScenarioIndex);
}

function showScenario(index) {
    const scenario = scenarios[index];
    scenarioContainer.innerText = scenario.text;
    
    feedbackMessage.innerText = '';
    nextBtn.classList.add('hidden');
    realBtn.disabled = false;
    fakeBtn.disabled = false;
}

function checkAnswer(userChoiceIsFake) {
    realBtn.disabled = true;
    fakeBtn.disabled = true;

    const correctChoice = scenarios[currentScenarioIndex].isFake;

    if (userChoiceIsFake === correctChoice) {
        score++;
        feedbackMessage.style.color = 'green';
        feedbackMessage.innerText = "إجابة صحيحة! " + scenarios[currentScenarioIndex].feedback;
    } else {
        feedbackMessage.style.color = 'red';
        feedbackMessage.innerText = "إجابة خاطئة. " + scenarios[currentScenarioIndex].feedback;
    }
    
    nextBtn.classList.remove('hidden');
}

function showResults() {
    simulatorScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    scoreText.innerText = `لقد كشفت ${score} من أصل ${scenarios.length} محاولة احتيال.`;
}

// 5. ربط الوظائف بالأزرار (Event Listeners)
startBtn.addEventListener('click', startGame);
fakeBtn.addEventListener('click', () => checkAnswer(true));
realBtn.addEventListener('click', () => checkAnswer(false));

nextBtn.addEventListener('click', () => {
    currentScenarioIndex++;
    if (currentScenarioIndex < scenarios.length) {
        showScenario(currentScenarioIndex);
    } else {
        showResults();
    }
});

restartBtn.addEventListener('click', startGame);
