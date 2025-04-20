
const categories = {
    animals: ['elephant', 'giraffe', 'dolphin', 'tiger', 'kangaroo'],
    technology: ['javascript', 'computer', 'algorithm', 'keyboard', 'internet'],
    food: ['pizza', 'hamburger', 'sushi', 'pancake', 'spaghetti'],
    countries: ['thailand', 'brazil', 'japan', 'germany', 'canada'],
    sports: ['football', 'basketball', 'tennis', 'badminton', 'cricket']
  };
  
  let selectedWord = '';
  let guessedLetters = [];
  let wrongLetters = [];
  let score = 0;
  let timer = 0;
  let interval;
  let gameActive = false;
  let stats = { wins: 0, losses: 0, totalScore: 0 };
  let isTwoPlayer = false;
  
  const wordDisplay = document.getElementById('wordDisplay');
  const message = document.getElementById('message');
  const lettersContainer = document.getElementById('letters');
  const wrongLettersDisplay = document.getElementById('wrongLetters');
  const restartBtn = document.getElementById('restartBtn');
  const categorySelect = document.getElementById('category');
  const startBtn = document.getElementById('startBtn');
  const timerDisplay = document.getElementById('timer');
  const scoreDisplay = document.getElementById('score');
  const canvas = document.getElementById('hangmanCanvas');
  const ctx = canvas.getContext('2d');
  const modeSelect = document.getElementById('mode');
  const playerInputForm = document.getElementById('playerInputForm');
  const customWordInput = document.getElementById('customWord');
  const setCustomWordBtn = document.getElementById('setCustomWordBtn');
  
  function loadStats() {
    const saved = localStorage.getItem('hangmanStats');
    if (saved) stats = JSON.parse(saved);
    scoreDisplay.textContent = stats.totalScore;
  }
  function saveStats() {
    localStorage.setItem('hangmanStats', JSON.stringify(stats));
    scoreDisplay.textContent = stats.totalScore;
  }
  
  function chooseWord(category) {
    const words = categories[category];
    selectedWord = words[Math.floor(Math.random() * words.length)];
  }
  
  function displayWord() {
    wordDisplay.innerHTML = selectedWord
      .split('')
      .map(letter => guessedLetters.includes(letter) ? letter : '_')
      .join(' ');
  
    if (!wordDisplay.innerHTML.includes('_')) {
      message.textContent = '🎉 You won!';
      stats.wins++;
      stats.totalScore += 10;
      gameActive = false;
      stopTimer();
      saveStats();
      playSound('win');
      disableAllButtons();
    }
  }
  
  function updateWrongLetters() {
    wrongLettersDisplay.textContent = wrongLetters.join(', ');
    drawHangman(wrongLetters.length);
  
    if (wrongLetters.length >= 6) {
      message.textContent = `💀 You lost! Word was: ${selectedWord}`;
      stats.losses++;
      gameActive = false;
      stopTimer();
      saveStats();
      playSound('lose');
      disableAllButtons();
    }
  }
  
  function createLetterButtons() {
    lettersContainer.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i).toLowerCase();
      const btn = document.createElement('button');
      btn.textContent = letter;
      btn.addEventListener('click', () => handleGuess(letter, btn));
      lettersContainer.appendChild(btn);
    }
  }
  
  function disableAllButtons() {
    lettersContainer.querySelectorAll('button').forEach(btn => btn.disabled = true);
  }
  
  function handleGuess(letter, button) {
    if (!gameActive) return;
    button.disabled = true;
  
    if (selectedWord.includes(letter)) {
      guessedLetters.push(letter);
      displayWord();
      playSound('correct');
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetters();
        playSound('wrong');
      }
    }
  }
  
  function resetCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  
  function drawHangman(stage) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000';
  
    if (stage >= 1) {
      ctx.beginPath();
      ctx.moveTo(10, 240);
      ctx.lineTo(190, 240);
      ctx.stroke();
    }
    if (stage >= 2) {
      ctx.beginPath();
      ctx.moveTo(50, 240);
      ctx.lineTo(50, 20);
      ctx.stroke();
    }
    if (stage >= 3) {
      ctx.beginPath();
      ctx.moveTo(50, 20);
      ctx.lineTo(150, 20);
      ctx.stroke();
    }
    if (stage >= 4) {
      ctx.beginPath();
      ctx.moveTo(150, 20);
      ctx.lineTo(150, 50);
      ctx.stroke();
    }
    if (stage >= 5) {
      ctx.beginPath();
      ctx.arc(150, 70, 20, 0, Math.PI * 2);
      ctx.stroke();
    }
    if (stage >= 6) {
      ctx.beginPath();
      ctx.moveTo(150, 90);
      ctx.lineTo(150, 150);
      ctx.stroke();
      ctx.moveTo(150, 100);
      ctx.lineTo(130, 120);
      ctx.moveTo(150, 100);
      ctx.lineTo(170, 120);
      ctx.moveTo(150, 150);
      ctx.lineTo(130, 180);
      ctx.moveTo(150, 150);
      ctx.lineTo(170, 180);
      ctx.stroke();
    }
  }
  
  function startTimer() {
    timer = 0;
    interval = setInterval(() => {
      timer++;
      timerDisplay.textContent = timer;
    }, 1000);
  }
  
  function stopTimer() {
    clearInterval(interval);
  }
  
  function resetGame() {
    guessedLetters = [];
    wrongLetters = [];
    message.textContent = '';
    wrongLettersDisplay.textContent = '';
    resetCanvas();
    displayWord();
    createLetterButtons();
    gameActive = true;
    startTimer();
  }
  
  startBtn.addEventListener('click', () => {
    isTwoPlayer = modeSelect.value === 'two';
    if (!isTwoPlayer) {
      chooseWord(categorySelect.value);
      resetGame();
    } else {
      playerInputForm.style.display = 'block';
    }
  });
  
  setCustomWordBtn.addEventListener('click', () => {
    const word = customWordInput.value.trim().toLowerCase();
    if (word) {
      selectedWord = word;
      playerInputForm.style.display = 'none';
      resetGame();
    }
  });
  
  restartBtn.addEventListener('click', () => {
    if (!isTwoPlayer) {
      chooseWord(categorySelect.value);
    }
    resetGame();
  });
  
  function playSound(type) {
    const sounds = {
      correct: document.getElementById('correctSound'),
      wrong: document.getElementById('wrongSound'),
      win: document.getElementById('winSound'),
      lose: document.getElementById('loseSound')
    };
    if (sounds[type]) sounds[type].play();
  }
  
  loadStats();

  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }
  
  // เพิ่มโชว์สถิติ
  function displayStats() {
    document.getElementById('stats').innerHTML =
      `🏆 Wins: ${stats.wins} | 💀 Losses: ${stats.losses} | ⭐ Score: ${stats.totalScore}`;
  }
  
  function loadStats() {
    const saved = localStorage.getItem('hangmanStats');
    if (saved) stats = JSON.parse(saved);
    scoreDisplay.textContent = stats.totalScore;
    displayStats();
  }
  
  function saveStats() {
    localStorage.setItem('hangmanStats', JSON.stringify(stats));
    scoreDisplay.textContent = stats.totalScore;
    displayStats();
  }
  
  const introModal = document.getElementById('introModal');
const playBtn = document.getElementById('playBtn');

window.onload = () => {
  introModal.style.display = 'flex';
};

playBtn.addEventListener('click', () => {
  introModal.style.display = 'none';
});

function getRank(score) {
    if (score >= 500) return { title: '🔥👑 LEGENDARY', color: '#ff4b2b', emoji: '👑' };
    if (score >= 200) return { title: '🐉 Elite', color: '#ff8800', emoji: '🐲' };
    if (score >= 100) return { title: '🦅 Pro', color: '#4b7bec', emoji: '🦅' };
    if (score >= 50) return { title: '🐤 Player', color: '#20bf6b', emoji: '🎯' };
    if (score >= 20) return { title: '🐥 Rookie', color: '#f7b731', emoji: '🔰' };
    return { title: '🐣 Noob', color: '#a5b1c2', emoji: '🥚' };
  }
  
  function displayStats() {
    const rank = getRank(stats.totalScore);
  
    document.getElementById('rankDisplay').innerHTML = `
      <div style="color:${rank.color}">
        ${rank.emoji} <span style="font-size: 1.4rem">${rank.title}</span>
      </div>
    `;
  
  }
  
  