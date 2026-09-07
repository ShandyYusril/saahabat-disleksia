/* ----------------------------------------------------
   SAHABAT DISLEKSIA - EVALUASI PERKEMBANGAN MEMBACA
   (ALUR WIZARD TES TERPADU & HALAMAN HASIL AKHIR)
---------------------------------------------------- */

// DAFTAR SOAL EVALUASI TERPADU (5 ALUR UTAMA)
const UNIFIED_EVALUATION_QUESTIONS = [
  {
    id: 1,
    type: "pilihanGanda",
    categoryTitle: "📝 1. Pilihan Ganda (Pengenalan Huruf Mirip)",
    imageVisual: "⚽",
    question: "Perhatikan gambar bola ⚽ di bawah ini. Manakah penulisan kata yang BENAR?",
    options: [
      { key: "A", text: "A. D O L A" },
      { key: "B", text: "B. B O L A" },
      { key: "C", text: "C. P O L A" },
      { key: "D", text: "D. Q O L A" }
    ],
    answer: "B",
    explanation: "Huruf awal yang tepat untuk BOLA adalah huruf 'B'."
  },
  {
    id: 2,
    type: "susunHuruf",
    categoryTitle: "🧩 2. Menyusun Huruf Kata",
    imageVisual: "🍎",
    targetWord: "APEL",
    question: "Susunlah huruf-huruf yang diacak di bawah ini untuk membentuk kata APEL 🍎!",
    scrambled: ['P', 'A', 'L', 'E'],
    explanation: "Susunan huruf yang benar adalah A - P - E - L."
  },
 {
  id: 3,
  type: "susunKata",
  categoryTitle: "🧱 3. Menyusun Suku Kata Menjadi Kata",
  imageVisual: "🍎",
  targetWord: "APEL",
  question: "Susunlah suku kata yang diacak untuk membentuk kata APEL 🍎!",
  scrambled: ["PEL", "A"],
  explanation: "Susunan suku kata yang benar adalah A - PEL sehingga membentuk kata APEL."
  },
  {
    id: 4,
    type: "susunSukuKata",
    categoryTitle: "🔤 4. Menyusun Suku Kata",
    imageVisual: "🏫",
    targetWord: "SEKOLAH",
    targetSyllables: ["SE", "KO", "LAH"],
    scrambled: ["LAH", "SE", "KO"],
    question: "Susunlah suku kata yang diacak di bawah ini untuk membentuk kata SEKOLAH 🏫!",
    explanation: "Susunan suku kata yang tepat adalah SE - KO - LAH."
  },
  {
    id: 5,
    type: "mengejaKata",
    categoryTitle: "🔤 5. Mengeja Suku Kata",
    imageVisual: "🐱",
    word: "KUCING",
    question: "Pilihlah ejaan suku kata yang TEPAT untuk kata KUCING 🐱!",
    options: [
      { key: "A", text: "A. KU - CING" },
      { key: "B", text: "B. K - UCING" },
      { key: "C", text: "C. KUC - ING" },
      { key: "D", text: "D. K - U - C - I - N - G" }
    ],
    answer: "A",
    explanation: "Ejaan suku kata yang tepat untuk KUCING adalah KU - CING."
  }
];

// STATE WIZARD UTAMA
let currentStepIndex = 0;
let isStepChecked = false;
let stepUserAnswers = {};
let wizardTileState = [];

// LOAD DATA EVALUASI UTAMA
function loadEvaluationData() {
  const stats = JSON.parse(localStorage.getItem('sahabat_disleksia_eval') || '{"totalScore":80, "completedGames":4, "accuracy":92}');
  
  const scoreElem = document.getElementById('evalTotalScore');
  const gamesElem = document.getElementById('evalCompletedGames');
  const accuracyElem = document.getElementById('evalAccuracy');
  const badgeCountElem = document.getElementById('evalBadgeCount');

  if (scoreElem) scoreElem.textContent = stats.totalScore;
  if (gamesElem) gamesElem.textContent = stats.completedGames;
  if (accuracyElem) accuracyElem.textContent = `${stats.accuracy || 92}%`;

  // Hitung Lencana
  let unlockedBadges = 0;
  if (stats.completedGames >= 1) unlockedBadges++;
  if (stats.totalScore >= 50) unlockedBadges++;
  if (stats.completedGames >= 3) unlockedBadges++;
  if (stats.totalScore >= 150) unlockedBadges++;

  if (badgeCountElem) badgeCountElem.textContent = unlockedBadges;

  // Update Lencana Bintang Utama
  const badgeBintang = document.getElementById('badgeBintangUtama');
  if (badgeBintang) {
    if (stats.totalScore >= 150) {
      badgeBintang.classList.add('unlocked');
    } else {
      badgeBintang.classList.remove('unlocked');
    }
  }

  updateRecommendation(stats);

  // Render Langkah Soal Wizard Pertama
  renderCurrentQuestionStep();

  // Muat Catatan Observasi
  loadNotes();
}

// RENDER SOAL AKTIF (STEP WIZARD)
function renderCurrentQuestionStep() {
  const q = UNIFIED_EVALUATION_QUESTIONS[currentStepIndex];
  if (!q) return;

  isStepChecked = false;
  wizardTileState = [];

  // Update Progress UI
  const total = UNIFIED_EVALUATION_QUESTIONS.length;
  const pct = Math.round(((currentStepIndex + 1) / total) * 100);

  const progText = document.getElementById('evalProgressText');
  const progCategory = document.getElementById('evalBadgeCategory');
  const progPercent = document.getElementById('evalProgressPercent');
  const progFill = document.getElementById('evalProgressBarFill');

  if (progText) progText.textContent = `🎯 Soal ${currentStepIndex + 1} dari ${total}`;
  if (progCategory) progCategory.textContent = q.categoryTitle;
  if (progPercent) progPercent.textContent = `${pct}% Selesai`;
  if (progFill) progFill.style.width = `${pct}%`;

  // Hide Feedback & Buttons
  hideStepFeedback();
  const btnCheck = document.getElementById('btnCheckStep');
  const btnNext = document.getElementById('btnNextStep');
  const btnReset = document.getElementById('btnResetStep');

  if (btnCheck) {
    btnCheck.style.display = 'inline-block';
    btnCheck.disabled = false;
  }
  if (btnNext) btnNext.style.display = 'none';

  // Render Area Soal Spesifik Tipe
  const area = document.getElementById('evalQuestionArea');
  if (!area) return;

  if (q.type === 'pilihanGanda' || q.type === 'mengejaKata') {
    if (btnReset) btnReset.style.display = 'none';
    area.innerHTML = `
      <div class="quiz-question-item">
        <div class="quiz-question-title">
          <span>${q.imageVisual} ${escapeHtml(q.question)}</span>
        </div>
        <div class="quiz-options-group">
          ${q.options.map(opt => `
            <label class="quiz-option-label" id="wizOptLabel_${opt.key}">
              <input type="radio" name="wizRadio" value="${opt.key}">
              <span>${escapeHtml(opt.text)}</span>
            </label>
          `).join('')}
        </div>
      </div>
    `;
  } else if (q.type === 'susunHuruf') {
    if (btnReset) btnReset.style.display = 'inline-block';
    area.innerHTML = `
      <div class="quiz-question-item">
        <div class="quiz-question-title">
          <span>${q.imageVisual} ${escapeHtml(q.question)}</span>
        </div>

        <div style="font-weight: bold; font-size: 0.9rem; color: var(--text-muted); margin-bottom: 4px;">Kotak Susunan Huruf Kamu:</div>
        <div class="eval-slot-box" id="wizSlotBox">
          <span style="color: var(--text-muted); font-size: 0.9rem;">Klik huruf-huruf pilihan di bawah untuk menyusun kata...</span>
        </div>

        <div style="font-weight: bold; font-size: 0.9rem; color: var(--text-muted); margin-bottom: 6px;">Pilihan Huruf Diacak:</div>
        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;" id="wizPoolBox">
          ${q.scrambled.map((char, idx) => `
            <button type="button" class="eval-tile-btn" id="wizTile_${idx}" onclick="clickWizardTile('${char}', ${idx})">
              ${char}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  } else if (q.type === 'susunKata') {
    if (btnReset) btnReset.style.display = 'inline-block';
    area.innerHTML = `
      <div class="quiz-question-item">
        <div class="quiz-question-title">
          <span>${q.imageVisual} ${escapeHtml(q.question)}</span>
        </div>

        <div style="font-weight: bold; font-size: 0.9rem; color: var(--text-muted); margin-bottom: 4px;">Kotak Susunan Suku Kata Kamu:</div>
        <div class="eval-slot-box" id="wizSlotBox">
          <span style="color: var(--text-muted); font-size: 0.9rem;">Klik Suku kata di bawah untuk menyusun kata...</span>
        </div>

        <div style="font-weight: bold; font-size: 0.9rem; color: var(--text-muted); margin-bottom: 6px;">Pilihan Suku Kata Diacak:</div>
        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;" id="wizPoolBox">
          ${q.scrambled.map((word, idx) => `
            <button type="button" class="eval-tile-btn" style="border-color: var(--purple); color: var(--purple);" id="wizTile_${idx}" onclick="clickWizardTile('${word}', ${idx})">
              ${word}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  } else if (q.type === 'susunSukuKata') {
    if (btnReset) btnReset.style.display = 'inline-block';
    area.innerHTML = `
      <div class="quiz-question-item">
        <div class="quiz-question-title">
          <span>${q.imageVisual} ${escapeHtml(q.question)}</span>
        </div>

        <div style="font-weight: bold; font-size: 0.9rem; color: var(--text-muted); margin-bottom: 4px;">Kotak Susunan Suku Kata Kamu:</div>
        <div class="eval-slot-box" id="wizSlotBox">
          <span style="color: var(--text-muted); font-size: 0.9rem;">Klik suku kata di bawah untuk menyusun...</span>
        </div>

        <div style="font-weight: bold; font-size: 0.9rem; color: var(--text-muted); margin-bottom: 6px;">Pilihan Suku Kata Diacak:</div>
        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;" id="wizPoolBox">
          ${q.scrambled.map((syl, idx) => `
            <button type="button" class="eval-tile-btn" style="border-color: var(--accent); color: var(--accent);" id="wizTile_${idx}" onclick="clickWizardTile('${syl}', ${idx})">
              ${syl}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }
}

// HANDLER TILE INTERAKSI UNTUK WIZARD
function clickWizardTile(val, idx) {
  if (isStepChecked) return;

  const btn = document.getElementById(`wizTile_${idx}`);
  if (!btn || btn.classList.contains('used')) return;

  btn.classList.add('used');
  wizardTileState.push({ val, idx });
  updateWizardSlots();
}

function removeWizardTile(selIdx) {
  if (isStepChecked) return;

  const removed = wizardTileState.splice(selIdx, 1)[0];
  if (removed) {
    const btn = document.getElementById(`wizTile_${removed.idx}`);
    if (btn) btn.classList.remove('used');
  }
  updateWizardSlots();
}

function resetCurrentStep() {
  // Reset jawaban dan izinkan user mencoba kembali
  isStepChecked = false;
  wizardTileState = [];

  const q = UNIFIED_EVALUATION_QUESTIONS[currentStepIndex];

  if (q && q.scrambled) {
    q.scrambled.forEach((_, idx) => {
      const btn = document.getElementById(`wizTile_${idx}`);
      if (btn) btn.classList.remove('used');
    });
  }

  // Sembunyikan feedback
  hideStepFeedback();

  // Tampilkan kembali tombol cek
  const btnCheck = document.getElementById('btnCheckStep');
  const btnNext = document.getElementById('btnNextStep');

  if (btnCheck) {
    btnCheck.style.display = 'inline-block';
    btnCheck.disabled = false;
  }

  if (btnNext) {
    btnNext.style.display = 'none';
  }

  updateWizardSlots();
}

function updateWizardSlots() {
  const container = document.getElementById('wizSlotBox');
  if (!container) return;

  if (wizardTileState.length === 0) {
    container.innerHTML = `<span style="color: var(--text-muted); font-size: 0.9rem;">Klik pilihan di bawah untuk menyusun jawaban...</span>`;
    return;
  }

  const q = UNIFIED_EVALUATION_QUESTIONS[currentStepIndex];
  let badgeColor = 'var(--primary)';
  let bgColor = '#EBF5FF';

  if (q.type === 'susunKata') { badgeColor = 'var(--purple)'; bgColor = '#F5EBFB'; }
  if (q.type === 'susunSukuKata') { badgeColor = 'var(--accent)'; bgColor = '#E8F8F0'; }

  container.innerHTML = wizardTileState.map((item, i) => `
    <button type="button" class="eval-tile-btn" style="background: ${bgColor}; border-color: ${badgeColor}; color: ${badgeColor};" onclick="removeWizardTile(${i})" title="Klik untuk menghapus">
      ${item.val} ✖
    </button>
  `).join('');
}

// CEK JAWABAN SOAL AKTIF
function checkCurrentStepAnswer() {
  if (isStepChecked) return;

  const q = UNIFIED_EVALUATION_QUESTIONS[currentStepIndex];
  if (!q) return;

  let isCorrect = false;
  let userAnsStr = "";
  let correctAnsStr = "";

  if (q.type === 'pilihanGanda' || q.type === 'mengejaKata') {
    const selected = document.querySelector('input[name="wizRadio"]:checked');
    if (!selected) {
      alert("Mohon pilih salah satu jawaban terlebih dahulu!");
      return;
    }
    const val = selected.value;
    userAnsStr = `Pilihan (${val})`;
    correctAnsStr = `Pilihan (${q.answer})`;
    isCorrect = (val === q.answer);

    // Styling opsi
    q.options.forEach(opt => {
      const lbl = document.getElementById(`wizOptLabel_${opt.key}`);
      if (lbl) {
        if (opt.key === q.answer) lbl.classList.add('selected-correct');
        else if (opt.key === val && !isCorrect) lbl.classList.add('selected-wrong');
      }
    });

  } else if (q.type === 'susunHuruf') {
    if (wizardTileState.length === 0) {
      alert("Mohon susun huruf-huruf terlebih dahulu!");
      return;
    }
    const userWord = wizardTileState.map(s => s.val).join('');
    userAnsStr = userWord.split('').join(' - ');
    correctAnsStr = q.targetWord.split('').join(' - ');
    isCorrect = (userWord === q.targetWord);

  } else if (q.type === 'susunKata') {
  if (wizardTileState.length === 0) {
    alert("Mohon susun suku kata terlebih dahulu!");
    return;
  }

  const userWord = wizardTileState.map(s => s.val).join('');
  userAnsStr = userWord;
  correctAnsStr = q.targetWord;
  isCorrect = (userWord === q.targetWord);

  } else if (q.type === 'susunSukuKata') {
    if (wizardTileState.length === 0) {
      alert("Mohon susun suku kata terlebih dahulu!");
      return;
    }
    const userSyl = wizardTileState.map(s => s.val).join(' - ');
    const targetSyl = q.targetSyllables.join(' - ');
    userAnsStr = userSyl;
    correctAnsStr = targetSyl;
    isCorrect = (userSyl === targetSyl);
  }

  isStepChecked = true;
  stepUserAnswers[q.id] = {
    isCorrect,
    userAnsStr,
    correctAnsStr,
    explanation: q.explanation,
    question: q.question,
    categoryTitle: q.categoryTitle,
    type: q.type
  };

  // Suara & Alert Feedback
  const fb = document.getElementById('evalStepFeedback');
  const btnCheck = document.getElementById('btnCheckStep');
  const btnNext = document.getElementById('btnNextStep');

  if (fb) {
    fb.style.display = 'block';
    if (isCorrect) {
      fb.className = 'alert-message alert-info';
      fb.innerHTML = `✅ <strong>Benar sekali! Pintar!</strong> ${q.explanation}`;
    } else {
      fb.className = 'alert-error alert-message';
      fb.innerHTML = `❌ <strong>Belum tepat.</strong> Jawaban yang benar adalah <strong>${correctAnsStr}</strong>. ${q.explanation}`;
    }
  }

  if (btnCheck) btnCheck.style.display = 'none';

  if (btnNext) {
    btnNext.style.display = 'inline-block';
    if (currentStepIndex === UNIFIED_EVALUATION_QUESTIONS.length - 1) {
      btnNext.innerHTML = '🏆 Lihat Hasil Akhir Evaluasi 🎉';
    } else {
      btnNext.innerHTML = '➡️ Lanjut Soal Berikutnya';
    }
  }
}

// LANJUT KE SOAL BERIKUTNYA
function nextQuestionStep() {
  if (!isStepChecked) return;

  if (currentStepIndex < UNIFIED_EVALUATION_QUESTIONS.length - 1) {
    currentStepIndex++;
    renderCurrentQuestionStep();
  } else {
    // Selesai Seluruh Soal ➔ Tampilkan Hasil Akhir
    finishEvaluationWizard();
  }
}

// SELESAI SELURUH SOAL & PROSES HASIL AKHIR
function finishEvaluationWizard() {
  let correctCount = 0;
  const totalQuestions = UNIFIED_EVALUATION_QUESTIONS.length;

  let categoryScores = {
    pilihanGanda: { correct: 0, total: 1 },
    susunHuruf: { correct: 0, total: 1 },
    susunKata: { correct: 0, total: 1 },
    susunSukuKata: { correct: 0, total: 1 },
    mengejaKata: { correct: 0, total: 1 }
  };

  let detailReviews = [];

  UNIFIED_EVALUATION_QUESTIONS.forEach(q => {
    const ans = stepUserAnswers[q.id] || { isCorrect: false, userAnsStr: "Belum Dijawab", correctAnsStr: "-", explanation: q.explanation };
    if (ans.isCorrect) {
      correctCount++;
      if (categoryScores[q.type]) categoryScores[q.type].correct++;
    }

    detailReviews.push({
      category: q.categoryTitle,
      question: q.question,
      userAnswer: ans.userAnsStr,
      correctAnswer: ans.correctAnsStr,
      isCorrect: ans.isCorrect,
      explanation: q.explanation
    });
  });

  const accuracyPct = Math.round((correctCount / totalQuestions) * 100);
  const finalScore100 = accuracyPct;

  // PESAN POSITIF & SEMANGAT
  let positiveMsg = "🎉 HEBAT SEKALI! Kamu luar biasa! Teruslah semangat belajar membaca! 🌟";
  let gradeText = "Predikat: SANGAT BAIK 🌟";

  if (finalScore100 >= 80) {
    positiveMsg = "🌟 PINTAR SEKALI! Kamu berhasil menjawab dengan sangat baik! Pertahankan prestasimu ya! 👏";
    gradeText = "Predikat: SANGAT BAIK 🌟";
  } else if (finalScore100 >= 60) {
    positiveMsg = "👍 BAGUS SEKALI! Kamu sudah berusaha keras! Makin rajin berlatih membaca ya! 💪";
    gradeText = "Predikat: BAIK 👍";
  } else {
    positiveMsg = "🌱 TETAP SEMANGAT! Kamu anak yang hebat dan pantang menyerah! Mari terus berlatih bersama! ✨";
    gradeText = "Predikat: PERLU PENDAMPINGAN 💡";
  }

  // Update Tampilan Hasil Akhir
  const scoreElem = document.getElementById('finalResultScore');
  const correctElem = document.getElementById('finalResultCorrect');
  const accuracyElem = document.getElementById('finalResultAccuracy');
  const gradeElem = document.getElementById('finalResultGrade');
  const posMsgElem = document.getElementById('positiveMessageBanner');

  if (scoreElem) scoreElem.textContent = finalScore100;
  if (correctElem) correctElem.textContent = `${correctCount} / ${totalQuestions} Soal`;
  if (accuracyElem) accuracyElem.textContent = `${accuracyPct}%`;
  if (gradeElem) gradeElem.textContent = gradeText;
  if (posMsgElem) posMsgElem.textContent = positiveMsg;

  // Update Skor Per Kategori
  const resPG = document.getElementById('resScore_pilihanGanda');
  const resSH = document.getElementById('resScore_susunHuruf');
  const resSK = document.getElementById('resScore_susunKata');
  const resSSK = document.getElementById('resScore_susunSukuKata');
  const resMK = document.getElementById('resScore_mengejaKata');

  if (resPG) resPG.textContent = `${categoryScores.pilihanGanda.correct * 100}%`;
  if (resSH) resSH.textContent = `${categoryScores.susunHuruf.correct * 100}%`;
  if (resSK) resSK.textContent = `${categoryScores.susunKata.correct * 100}%`;
  if (resSSK) resSSK.textContent = `${categoryScores.susunSukuKata.correct * 100}%`;
  if (resMK) resMK.textContent = `${categoryScores.mengejaKata.correct * 100}%`;

  // Render Detail Review List
  const reviewContainer = document.getElementById('resultsDetailReviewList');
  if (reviewContainer) {
    reviewContainer.innerHTML = detailReviews.map((rev, idx) => `
      <div class="results-review-item ${rev.isCorrect ? 'correct' : 'wrong'}">
        <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 0.9rem; margin-bottom: 4px;">
          <span style="color: var(--primary);">${idx + 1}. ${escapeHtml(rev.category)}</span>
          <span>${rev.isCorrect ? '✅ Benar (+20)' : '❌ Belum Tepat'}</span>
        </div>
        <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-main); margin-bottom: 6px;">
          ${escapeHtml(rev.question)}
        </div>
        <div style="font-size: 0.88rem; color: var(--text-muted);">
          <span>Jawaban Anda: <strong>${escapeHtml(rev.userAnswer)}</strong></span> | 
          <span>Kunci Jawaban: <strong>${escapeHtml(rev.correctAnswer)}</strong></span>
        </div>
        <div style="font-size: 0.85rem; color: #475569; margin-top: 4px; font-style: italic;">
          💡 ${escapeHtml(rev.explanation)}
        </div>
      </div>
    `).join('');
  }

  // Tampilkan Halaman Hasil Evaluasi
  const wizardCard = document.getElementById('evalWizardCard');
  const resultsPage = document.getElementById('evalResultsPage');

  if (wizardCard) wizardCard.style.display = 'none';
  if (resultsPage) {
    resultsPage.style.display = 'block';
    resultsPage.scrollIntoView({ behavior: 'smooth' });
  }

  // Simpan Hasil Poin ke LocalStorage KPI
  saveFullEvaluationProgress(finalScore100, accuracyPct);
}

// ULANGI TES WIZARD DARI AWAL
function restartEvaluationWizard() {
  currentStepIndex = 0;
  isStepChecked = false;
  stepUserAnswers = {};
  wizardTileState = [];

  const wizardCard = document.getElementById('evalWizardCard');
  const resultsPage = document.getElementById('evalResultsPage');

  if (resultsPage) resultsPage.style.display = 'none';
  if (wizardCard) {
    wizardCard.style.display = 'block';
    wizardCard.scrollIntoView({ behavior: 'smooth' });
  }

  renderCurrentQuestionStep();
}

function hideStepFeedback() {
  const fb = document.getElementById('evalStepFeedback');
  if (fb) {
    fb.style.display = 'none';
    fb.textContent = '';
  }
}

// SIMPAN HASIL KE LOCALSTORAGE KPI
function saveFullEvaluationProgress(score, accuracy) {
  let stats = JSON.parse(localStorage.getItem('sahabat_disleksia_eval') || '{"totalScore":80, "completedGames":4, "accuracy":92}');
  stats.totalScore += Math.round(score * 0.5);
  stats.completedGames += 1;
  stats.accuracy = Math.round((stats.accuracy + accuracy) / 2);
  localStorage.setItem('sahabat_disleksia_eval', JSON.stringify(stats));

  // Refresh KPI Dashboard
  const scoreElem = document.getElementById('evalTotalScore');
  const gamesElem = document.getElementById('evalCompletedGames');
  const accuracyElem = document.getElementById('evalAccuracy');
  if (scoreElem) scoreElem.textContent = stats.totalScore;
  if (gamesElem) gamesElem.textContent = stats.completedGames;
  if (accuracyElem) accuracyElem.textContent = `${stats.accuracy}%`;

  updateRecommendation(stats);
}

function updateRecommendation(stats) {
  const recElem = document.getElementById('evalRecommendationText');
  if (!recElem) return;

  if (stats.totalScore >= 120) {
    recElem.innerHTML = `🌟 <strong>Luar Biasa!</strong> Ananda telah menguasai sebagian besar pengenalan huruf dan ejaan dasar dengan total skor <strong>${stats.totalScore}</strong>. Sangat disarankan untuk meningkatkan tantangan pada modul <strong>Susun Kata</strong> dan <strong>Mengeja Kata</strong>.`;
  } else if (stats.totalScore >= 50) {
    recElem.innerHTML = `👍 <strong>Perkembangan Bagus!</strong> Ananda aktif berlatih dengan akurasi <strong>${stats.accuracy || 92}%</strong>. Pertahankan pendampingan pada modul <strong>Susun Huruf</strong> dan game <strong>Labirin Alphabet</strong> secara berkala.`;
  } else {
    recElem.innerHTML = `🌱 <strong>Awal Yang Baik!</strong> Ananda sedang memulai perjalanan membaca. Disarankan untuk memprioritaskan modul <strong>Mengenal Huruf (b vs d, p vs q)</strong> dan <strong>Tebak Huruf Awal</strong> dengan bantuan audio.`;
  }
}

function saveTeacherNote(event) {
  event.preventDefault();
  const noteInput = document.getElementById('noteText').value.trim();
  const observerInput = document.getElementById('observerName').value.trim();
  const roleInput = document.getElementById('observerRole').value;

  if (!noteInput || !observerInput) {
    alert('Mohon lengkapi Nama Pengamat dan Catatan Perkembangan!');
    return;
  }

  let notes = JSON.parse(localStorage.getItem('sahabat_disleksia_notes') || '[]');
  notes.unshift({
    id: Date.now(),
    observer: observerInput,
    role: roleInput,
    text: noteInput,
    date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  });

  localStorage.setItem('sahabat_disleksia_notes', JSON.stringify(notes));

  document.getElementById('noteText').value = '';
  loadNotes();
}

function deleteNote(id) {
  if (confirm('Hapus catatan ini?')) {
    let notes = JSON.parse(localStorage.getItem('sahabat_disleksia_notes') || '[]');
    notes = notes.filter(n => n.id !== id);
    localStorage.setItem('sahabat_disleksia_notes', JSON.stringify(notes));
    loadNotes();
  }
}

function loadNotes() {
  const container = document.getElementById('notesList');
  if (!container) return;

  const notes = JSON.parse(localStorage.getItem('sahabat_disleksia_notes') || '[]');

  if (notes.length === 0) {
    const defaultNotes = [
      {
        id: 1,
        observer: "Ibu Ani, S.Pd.",
        role: "Guru Kelas",
        date: "3 September 2026",
        text: "Ananda menunjukkan kemajuan pesat dalam membedakan huruf b dan d serta mampu menyelesaikan tes menyusun huruf dan suku kata."
      },
      {
        id: 2,
        observer: "Bapak Budi",
        role: "Orang Tua",
        date: "2 September 2026",
        text: "Ananda sangat antusias bermain Game Labirin Alphabet Picture di rumah dan berhasil menyelesaikan kuis evaluasi mengeja kata."
      }
    ];

    container.innerHTML = defaultNotes.map(n => renderNoteCard(n, false)).join('');
    return;
  }

  container.innerHTML = notes.map(n => renderNoteCard(n, true)).join('');
}

function renderNoteCard(n, isDeletable) {
  return `
    <div style="background: #F8FAFC; border-left: 4px solid var(--primary); padding: 14px 16px; border-radius: 8px; margin-bottom: 12px; position: relative;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.9rem; font-weight: bold; color: var(--primary);">
        <span>📝 ${escapeHtml(n.observer)} <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: normal;">(${escapeHtml(n.role || 'Pengamat')})</span></span>
        <span style="color: var(--text-muted); font-weight: normal; font-size: 0.85rem;">${escapeHtml(n.date)}</span>
      </div>
      <div style="font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
        ${escapeHtml(n.text)}
      </div>
      ${isDeletable ? `<button onclick="deleteNote(${n.id})" style="background: none; border: none; color: var(--warning); cursor: pointer; font-size: 0.8rem; margin-top: 6px; padding: 0;">🗑️ Hapus Catatan</button>` : ''}
    </div>
  `;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}

function resetProgress() {
  if (confirm('Apakah Anda yakin ingin mengulang seluruh data evaluasi dan catatan?')) {
    localStorage.removeItem('sahabat_disleksia_eval');
    localStorage.removeItem('sahabat_disleksia_notes');
    loadEvaluationData();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('evalTotalScore')) {
    loadEvaluationData();
  }

  const noteForm = document.getElementById('evalNoteForm');
  if (noteForm) {
    noteForm.addEventListener('submit', saveTeacherNote);
  }
});
