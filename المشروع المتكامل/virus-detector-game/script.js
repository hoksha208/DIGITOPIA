// 1. تعريف عناصر الصفحة (DOM Elements)
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const gameOverScreen = document.getElementById('game-over-screen');

const startGameBtn = document.getElementById('start-game-btn');
const restartGameBtn = document.getElementById('restart-game-btn');

const scoreDisplay = document.getElementById('score-display');
const timeDisplay = document.getElementById('time-display');
const finalScoreDisplay = document.getElementById('final-score-display');

const gameArea = document.getElementById('game-area');

// 2. متغيرات اللعبة
let score = 0;
let timeLeft = 60;
let gameInterval;
let timerInterval;

// 3. وظائف اللعبة الأساسية
function startGame() {
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');

    score = 0;
    timeLeft = 60;
    scoreDisplay.innerText = score;
    timeDisplay.innerText = timeLeft;
    
    gameArea.innerHTML = '';

    gameInterval = setInterval(createVirus, 800);
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    timeDisplay.innerText = timeLeft;

    if (timeLeft <= 0) {
        endGame();
    }
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);

    gameScreen.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');

    finalScoreDisplay.innerText = score;
}

function createVirus() {
    const virus = document.createElement('div');
    virus.classList.add('virus');

    const gameAreaWidth = gameArea.offsetWidth;
    const gameAreaHeight = gameArea.offsetHeight;
    
    const randomX = Math.random() * (gameAreaWidth - 60);
    // --- التعديل هنا ---
    // يضمن عدم ظهور الفيروس في الـ 60 بكسل العلوية
    const randomY = (Math.random() * (gameAreaHeight - 120)) + 60;

    virus.style.left = `${randomX}px`;
    virus.style.top = `${randomY}px`;
    
    const virusTypes = ['☠', '☣', '⚠', '✖'];
    virus.innerText = virusTypes[Math.floor(Math.random() * virusTypes.length)];

    virus.addEventListener('click', () => {
        score++;
        scoreDisplay.innerText = score;
        
        virus.style.transform = 'scale(2)';
        virus.style.opacity = '0';
        
        setTimeout(() => {
            virus.remove();
        }, 200);
    });

    gameArea.appendChild(virus);

    setTimeout(() => {
        if (virus.parentElement) {
            virus.remove();
        }
    }, 2000);
}

// 4. ربط الوظائف بالأزرار (Event Listeners)
startGameBtn.addEventListener('click', startGame);
restartGameBtn.addEventListener('click', startGame);
