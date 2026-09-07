/* ----------------------------------------------------
   SAHABAT DISLEKSIA - GAME EDUKASI INTERAKTIF
---------------------------------------------------- */

const GAME_QUESTIONS = [
  {
    targetWord: 'B O L A',
    promptText: 'Pilihlah huruf Awal yang tepat untuk kata BOLA (⚽)',
    correctAnswer: 'B',
    options: ['B', 'D', 'P', 'Q'],
    audioHint: 'Huruf B untuk BOLA'
  },
  {
    targetWord: 'D A D U',
    promptText: 'Pilihlah huruf Awal yang tepat untuk kata DADU (🎲)',
    correctAnswer: 'D',
    options: ['B', 'D', 'P', 'Q'],
    audioHint: 'Huruf D untuk DADU'
  },
  {
    targetWord: 'P E N A',
    promptText: 'Pilihlah huruf Awal yang tepat untuk kata PENA (✏️)',
    correctAnswer: 'P',
    options: ['Q', 'P', 'B', 'D'],
    audioHint: 'Huruf P untuk PENA'
  },
  {
    targetWord: 'M A T A',
    promptText: 'Pilihlah huruf Awal yang tepat untuk kata MATA (👁️)',
    correctAnswer: 'M',
    options: ['W', 'M', 'N', 'U'],
    audioHint: 'Huruf M untuk MATA'
  },
  {
    targetWord: 'W O R T E L',
    promptText: 'Pilihlah huruf Awal yang tepat untuk kata WORTEL (🥕)',
    correctAnswer: 'W',
    options: ['M', 'W', 'V', 'N'],
    audioHint: 'Huruf W untuk WORTEL'
  }
];

let currentQuestionIndex = 0;
let score = 0;
let streak = 0;

function initGame() {
  currentQuestionIndex = 0;
  score = 0;
  streak = 0;
  updateScoreBoard();
  loadQuestion();
}

function updateScoreBoard() {
  const scoreElem = document.getElementById('gameScore');
  const streakElem = document.getElementById('gameStreak');
  if (scoreElem) scoreElem.textContent = score;
  if (streakElem) streakElem.textContent = streak;
}

function loadQuestion() {
  const q = GAME_QUESTIONS[currentQuestionIndex];
  const wordElem = document.getElementById('gameTargetWord');
  const promptElem = document.getElementById('gamePromptText');
  const optionsElem = document.getElementById('gameOptionsContainer');
  const feedbackElem = document.getElementById('gameFeedback');

  if (!q) {
    // Game Selesai!
    if (wordElem) wordElem.textContent = '🎉 HEBAT!';
    if (promptElem) promptElem.textContent = `Kamu berhasil menyelesaikan semua tantangan! Total Skor: ${score}`;
    if (optionsElem) {
      optionsElem.innerHTML = `
        <button class="btn btn-primary" onclick="initGame()">🔄 Main Lagi</button>
        <a href="evaluasi.html" class="btn btn-accent">📊 Lihat Laporan Evaluasi</a>
      `;
    }
    if (feedbackElem) feedbackElem.style.display = 'none';
    speakText(`Hore! Kamu hebat sekali. Kamu mendapat skor ${score}`);
    playSoundEffect('correct');
    return;
  }

  if (wordElem) wordElem.textContent = q.targetWord;
  if (promptElem) promptElem.textContent = q.promptText;
  if (feedbackElem) {
    feedbackElem.style.display = 'none';
    feedbackElem.textContent = '';
  }

  // Suara otomatis prompt
  speakText(q.promptText);

  // Render opsi tombol
  if (optionsElem) {
    optionsElem.innerHTML = q.options.map(opt => `
      <button class="option-btn" onclick="checkAnswer('${opt}')">${opt}</button>
    `).join('');
  }
}

function checkAnswer(selectedOption) {
  const q = GAME_QUESTIONS[currentQuestionIndex];
  const feedbackElem = document.getElementById('gameFeedback');

  if (selectedOption === q.correctAnswer) {
    playSoundEffect('correct');
    score += 20;
    streak += 1;
    updateScoreBoard();
    
    if (feedbackElem) {
      feedbackElem.textContent = '✅ Benar sekali! Pintar!';
      feedbackElem.className = 'alert-message alert-info';
      feedbackElem.style.display = 'block';
    }

    speakText('Benar sekali! Pintar!');

    // Simpan progres ke localStorage untuk Evaluasi
    saveProgress(20);

    setTimeout(() => {
      currentQuestionIndex++;
      loadQuestion();
    }, 1200);
  } else {
    playSoundEffect('wrong');
    streak = 0;
    updateScoreBoard();
    
    if (feedbackElem) {
      feedbackElem.textContent = `❌ Belum tepat. Coba perhatikan lagi huruf ${q.correctAnswer}!`;
      feedbackElem.className = 'alert-message alert-error';
      feedbackElem.style.display = 'block';
    }

    speakText(`Belum tepat. Coba lagi.`);
  }
}

function saveProgress(points) {
  let stats = JSON.parse(localStorage.getItem('sahabat_disleksia_eval') || '{"totalScore":0, "completedGames":0, "accuracy":100}');
  stats.totalScore += points;
  stats.completedGames += 1;
  localStorage.setItem('sahabat_disleksia_eval', JSON.stringify(stats));
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('gameTargetWord')) {
    initGame();
  }
});
