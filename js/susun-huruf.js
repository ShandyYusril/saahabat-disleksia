/* ----------------------------------------------------
   SAHABAT DISLEKSIA - GAME SUSUN HURUF INTERAKTIF
---------------------------------------------------- */

const SUSUN_HURUF_QUESTIONS = [
  {
    targetWord: 'APEL',
    imageVisual: '🍎',
    hintText: 'A - P - E - L (Buah berwarna merah dan manis)',
    scrambled: ['P', 'A', 'L', 'E'],
    audioHint: 'Ini adalah gambar buah Apel. Susun huruf A, P, E, L.'
  },
  {
    targetWord: 'BOLA',
    imageVisual: '⚽',
    hintText: 'B - O - L - A (Mainan berbentuk bulat untuk ditendang)',
    scrambled: ['O', 'B', 'A', 'L'],
    audioHint: 'Ini adalah gambar Bola. Susun huruf B, O, L, A.'
  },
  {
    targetWord: 'BUKU',
    imageVisual: '📚',
    hintText: 'B - U - K - U (Benda tempat membaca dan menulis)',
    scrambled: ['U', 'K', 'B', 'U'],
    audioHint: 'Ini adalah gambar Buku. Susun huruf B, U, K, U.'
  },
  {
    targetWord: 'ROTI',
    imageVisual: '🍞',
    hintText: 'R - O - T - I (Makanan lezat untuk sarapan)',
    scrambled: ['T', 'O', 'R', 'I'],
    audioHint: 'Ini adalah gambar Roti. Susun huruf R, O, T, I.'
  },
  {
    targetWord: 'KUCING',
    imageVisual: '🐱',
    hintText: 'K - U - C - I - N - G (Hewan peliharaan lucu bersuara meong)',
    scrambled: ['C', 'I', 'K', 'G', 'U', 'N'],
    audioHint: 'Ini adalah gambar Kucing. Susun huruf K, U, C, I, N, G.'
  },
  {
    targetWord: 'MOBIL',
    imageVisual: '🚗',
    hintText: 'M - O - B - I - L (Kendaraan roda empat)',
    scrambled: ['O', 'M', 'L', 'B', 'I'],
    audioHint: 'Ini adalah gambar Mobil. Susun huruf M, O, B, I, L.'
  },
  {
    targetWord: 'RUMAH',
    imageVisual: '🏠',
    hintText: 'R - U - M - A - H (Tempat tinggal keluarga yang nyaman)',
    scrambled: ['M', 'R', 'H', 'U', 'A'],
    audioHint: 'Ini adalah gambar Rumah. Susun huruf R, U, M, A, H.'
  },
  {
    targetWord: 'GAJAH',
    imageVisual: '🐘',
    hintText: 'G - A - J - A - H (Hewan besar yang memiliki belalai panjang)',
    scrambled: ['A', 'G', 'J', 'H', 'A'],
    audioHint: 'Ini adalah gambar Gajah. Susun huruf G, A, J, A, H.'
  }
];

let currentQuestionIndex = 0;
let score = 0;
let placedLetters = []; // Menyimpan pilihan huruf user pada slot

function initSusunHurufGame() {
  currentQuestionIndex = 0;
  score = 0;
  updateScoreBoard();
  loadQuestion();
}

function updateScoreBoard() {
  const scoreElem = document.getElementById('scoreVal');
  const numElem = document.getElementById('questionNum');
  const totalElem = document.getElementById('totalQuestions');

  if (scoreElem) scoreElem.textContent = score;
  if (numElem) numElem.textContent = currentQuestionIndex + 1;
  if (totalElem) totalElem.textContent = SUSUN_HURUF_QUESTIONS.length;
}

function loadQuestion() {
  const q = SUSUN_HURUF_QUESTIONS[currentQuestionIndex];
  const imageVisualElem = document.getElementById('imageVisual');
  const imageHintElem = document.getElementById('imageHintText');
  const slotsContainer = document.getElementById('slotsContainer');
  const poolContainer = document.getElementById('poolContainer');
  const feedbackElem = document.getElementById('feedbackMessage');

  if (!q) {
    // Game Selesai!
    renderCompletionScreen();
    return;
  }

  updateScoreBoard();

  // Reset state pertanyaan
  placedLetters = new Array(q.targetWord.length).fill(null);

  if (imageVisualElem) imageVisualElem.textContent = q.imageVisual;
  if (imageHintElem) imageHintElem.textContent = q.hintText;

  if (feedbackElem) {
    feedbackElem.style.display = 'none';
    feedbackElem.textContent = '';
  }

  renderSlots();
  renderPool();
}

function renderSlots() {
  const q = SUSUN_HURUF_QUESTIONS[currentQuestionIndex];
  const slotsContainer = document.getElementById('slotsContainer');
  if (!slotsContainer) return;

  slotsContainer.innerHTML = placedLetters.map((item, idx) => {
    if (item !== null) {
      return `<div class="slot-box filled" onclick="removeLetterFromSlot(${idx})" title="Klik untuk menghapus huruf ini">${item.letter}</div>`;
    } else {
      return `<div class="slot-box" title="Kotak kosong">_</div>`;
    }
  }).join('');
}

function renderPool() {
  const q = SUSUN_HURUF_QUESTIONS[currentQuestionIndex];
  const poolContainer = document.getElementById('poolContainer');
  if (!poolContainer) return;

  poolContainer.innerHTML = q.scrambled.map((letter, idx) => {
    const isUsed = placedLetters.some(item => item && item.poolIndex === idx);
    return `
      <button class="pool-btn" ${isUsed ? 'disabled' : ''} onclick="selectPoolLetter('${letter}', ${idx})">
        ${letter}
      </button>
    `;
  }).join('');
}

function selectPoolLetter(letter, poolIndex) {
  // Cari slot pertama yang masih kosong
  const emptyIndex = placedLetters.findIndex(item => item === null);
  if (emptyIndex === -1) return; // Semua slot sudah terisi

  placedLetters[emptyIndex] = { letter: letter, poolIndex: poolIndex };

  renderSlots();
  renderPool();
}

function removeLetterFromSlot(slotIndex) {
  if (placedLetters[slotIndex] === null) return;

  placedLetters[slotIndex] = null;

  renderSlots();
  renderPool();
}

function resetCurrentWord() {
  const q = SUSUN_HURUF_QUESTIONS[currentQuestionIndex];
  if (!q) return;

  placedLetters = new Array(q.targetWord.length).fill(null);

  const feedbackElem = document.getElementById('feedbackMessage');
  if (feedbackElem) feedbackElem.style.display = 'none';

  renderSlots();
  renderPool();
}

function checkAnswer() {
  const q = SUSUN_HURUF_QUESTIONS[currentQuestionIndex];
  const feedbackElem = document.getElementById('feedbackMessage');

  // Cek apakah semua slot sudah terisi
  if (placedLetters.includes(null)) {
    if (feedbackElem) {
      feedbackElem.textContent = '⚠️ Silakan isi dan susun semua huruf terlebih dahulu!';
      feedbackElem.className = 'alert-message alert-error';
      feedbackElem.style.display = 'block';
    }
    return;
  }

  // Gabungkan huruf yang diletakkan
  const userWord = placedLetters.map(item => item.letter).join('');

  if (userWord === q.targetWord) {
    score += 20;
    updateScoreBoard();

    if (feedbackElem) {
      feedbackElem.textContent = `🎉 Hore! Hebat sekali, kata "${q.targetWord}" tersusun dengan tepat!`;
      feedbackElem.className = 'alert-message alert-info';
      feedbackElem.style.display = 'block';
    }

    // Simpan progres ke localStorage untuk Evaluasi
    saveProgress(20);

    // Lanjut ke soal berikutnya setelah delay
    setTimeout(() => {
      currentQuestionIndex++;
      loadQuestion();
    }, 1600);

  } else {
    updateScoreBoard();

    if (feedbackElem) {
      feedbackElem.textContent = `❌ Susunan "${userWord}" belum tepat. Perhatikan kembali gambar dan hurufnya!`;
      feedbackElem.className = 'alert-message alert-error';
      feedbackElem.style.display = 'block';
    }

  }
}

function renderCompletionScreen() {
  const susunCard = document.getElementById('susunGameCard');
  if (!susunCard) return;

  susunCard.innerHTML = `
    <div style="padding: 30px 10px; text-align: center;">
      <div style="font-size: 5.5rem; margin-bottom: 15px;">🏆🌟🎉</div>
      <h2 style="font-family: var(--font-heading); color: var(--primary); font-size: 2.2rem; margin-bottom: 10px;">
        SELAMAT! KAMU HEBAT!
      </h2>
      <p style="font-size: 1.15rem; color: var(--text-muted); margin-bottom: 25px;">
        Kamu berhasil menyusun seluruh kata dengan sangat baik!
      </p>

      <div style="background: #FFF9E6; border: 3px solid #FFE082; padding: 20px; border-radius: var(--radius-md); max-width: 400px; margin: 0 auto 30px auto;">
        <div style="font-size: 1.2rem; font-weight: bold; color: var(--secondary); margin-bottom: 6px;">
          ⭐ Total Skor Akhir: <span style="font-size: 1.8rem;">${score}</span>
        </div>
        <div style="font-size: 1rem; color: var(--text-main);">
        </div>
      </div>

      <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
        <button class="btn btn-primary" onclick="location.reload()">🔄 Main Lagi</button>
        <a href="belajar.html" class="btn btn-secondary">✏️ Ke Modul Belajar</a>
        <a href="evaluasi.html" class="btn btn-accent">📊 Lihat Laporan Evaluasi</a>
      </div>
    </div>
  `;

}

function saveProgress(points) {
  let stats = JSON.parse(localStorage.getItem('sahabat_disleksia_eval') || '{"totalScore":80, "completedGames":4, "accuracy":90}');
  stats.totalScore += points;
  stats.completedGames += 1;
  localStorage.setItem('sahabat_disleksia_eval', JSON.stringify(stats));
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('slotsContainer')) {
    initSusunHurufGame();
  }
});
