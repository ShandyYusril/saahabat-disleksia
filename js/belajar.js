/* ----------------------------------------------------
   SAHABAT DISLEKSIA - MODUL BELAJAR INTERAKTIF (4 SUB-MENU)
---------------------------------------------------- */

// Data Pembelajaran
const LEARN_DATA = {
  // 1. Mengenal Huruf
  mengenalHuruf: [
    { letter: 'B b', word: 'Bola', icon: '⚽', desc: 'Perut di depan bawah', audio: 'Huruf B. Bola. Perutnya di depan.' },
    { letter: 'D d', word: 'Dadu', icon: '🎲', desc: 'Perut di belakang bawah', audio: 'Huruf D. Dadu. Perutnya di belakang.' },
    { letter: 'P p', word: 'Pena', icon: '✏️', desc: 'Kaki ke bawah, kepala di atas', audio: 'Huruf P. Pena. Kaki ke bawah.' },
    { letter: 'Q q', word: 'Quran', icon: '📖', desc: 'Bentuk terbalik dari P', audio: 'Huruf Q. Quran. Ekor di kanan.' },
    { letter: 'M m', word: 'Mata', icon: '👁️', desc: 'Memiliki 3 kaki bawah', audio: 'Huruf M. Mata. Memiliki tiga kaki.' },
    { letter: 'W w', word: 'Wortel', icon: '🥕', desc: 'Mirip M terbalik', audio: 'Huruf W. Wortel. Mirip M terbalik.' },
    { letter: 'A a', word: 'Apel', icon: '🍎', desc: 'Huruf vokal A', audio: 'Huruf A. Apel.' },
    { letter: 'I i', word: 'Ikan', icon: '🐟', desc: 'Huruf vokal I bertitik', audio: 'Huruf I. Ikan.' }
  ],

  // 2. Susun Huruf
  susunHuruf: [
    { targetWord: 'BOLA', hint: '⚽ BOLA', scrambled: ['O', 'B', 'A', 'L'] },
    { targetWord: 'BUKU', hint: '📚 BUKU', scrambled: ['U', 'K', 'B', 'U'] },
    { targetWord: 'ROTI', hint: '🍞 ROTI', scrambled: ['T', 'O', 'R', 'I'] },
    { targetWord: 'KUDA', hint: '🐎 KUDA', scrambled: ['D', 'A', 'K', 'U'] }
  ],

  // 3. Susun Kata
  susunKata: [
    { sentenceTarget: ['SAYA', 'SUKA', 'BACA'], hint: '📖 Saya Suka Baca', options: ['BACA', 'SAYA', 'MAKAN', 'SUKA'] },
    { sentenceTarget: ['BUKU', 'INI', 'BAGUS'], hint: '📚 Buku Ini Bagus', options: ['INI', 'BAGUS', 'BUKU', 'LARI'] },
    { sentenceTarget: ['BOLA', 'SAYA', 'BULAT'], hint: '⚽ Bola Saya Bulat', options: ['SAYA', 'BULAT', 'BOLA', 'MINUM'] }
  ],

  // 4. Mengeja Kata
  mengejaKata: [
    { word: 'BOLA', display: 'BO - LA', syllables: ['BO', 'LA'], icon: '⚽' },
    { word: 'BUKU', display: 'BU - KU', syllables: ['BU', 'KU'], icon: '📚' },
    { word: 'SUSU', display: 'SU - SU', syllables: ['SU', 'SU'], icon: '🥛' },
    { word: 'ROTI', display: 'RO - TI', syllables: ['RO', 'TI'], icon: '🍞' },
    { word: 'KAPAL', display: 'KA - PAL', syllables: ['KA', 'PAL'], icon: '🚢' },
    { word: 'MATA', display: 'MA - TA', syllables: ['MA', 'TA'], icon: '👁️' }
  ]
};

// Global state untuk modul interaktif
let susunHurufIndex = 0;
let susunHurufCurrentArr = [];

let susunKataIndex = 0;
let susunKataCurrentArr = [];

// Fungsi Navigasi Tab / Scroll ke Card Modul
function selectBelajarModule(moduleId) {
  playSoundEffect('click');
  const targetElem = document.getElementById(moduleId);
  if (targetElem) {
    targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Highlight efek visual
    targetElem.style.transition = 'all 0.4s ease';
    targetElem.style.borderColor = 'var(--primary)';
    targetElem.style.boxShadow = '0 0 25px rgba(74, 144, 226, 0.4)';
    
    setTimeout(() => {
      targetElem.style.boxShadow = 'var(--shadow-soft)';
    }, 1500);
  }

  // Audio pengumuman modul
  const titles = {
    'modulMengenalHuruf': 'Modul Mengenal Huruf. Mari pelajari bentuk dan bunyi huruf.',
    'modulSusunHuruf': 'Modul Susun Huruf. Klik huruf acak untuk menyusun kata yang benar.',
    'modulSusunKata': 'Modul Susun Kata. Susun kata acak menjadi kalimat yang utuh.',
    'modulMengejaKata': 'Modul Mengeja Kata. Dengarkan ejaan suku kata demi suku kata.'
  };
  if (titles[moduleId]) {
    speakText(titles[moduleId]);
  }
}

/* --- 1. RENDER MENGENAL HURUF --- */
function renderMengenalHuruf() {
  const container = document.getElementById('mengenalHurufContainer');
  if (!container) return;

  container.innerHTML = LEARN_DATA.mengenalHuruf.map(item => `
    <div class="letter-card" onclick="speakText('${item.audio}')">
      <div style="font-size: 2.2rem; margin-bottom: 5px;">${item.icon}</div>
      <div class="letter-main">${item.letter}</div>
      <div class="letter-word">${item.word}</div>
      <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">${item.desc}</div>
      <button class="audio-btn" style="margin-top: 10px; margin-bottom: 0;">🔊 Dengar</button>
    </div>
  `).join('');
}

/* --- 2. LOGIKA & RENDER SUSUN HURUF --- */
function initSusunHuruf() {
  const data = LEARN_DATA.susunHuruf[susunHurufIndex];
  const hintElem = document.getElementById('susunHurufHint');
  const targetSlotsElem = document.getElementById('susunHurufTargetSlots');
  const poolElem = document.getElementById('susunHurufPool');
  const feedbackElem = document.getElementById('susunHurufFeedback');

  if (!data || !hintElem) return;

  hintElem.textContent = data.hint;
  susunHurufCurrentArr = [];
  feedbackElem.style.display = 'none';

  // Render Slot Kosong
  targetSlotsElem.innerHTML = Array.from(data.targetWord).map(() => `
    <div class="option-btn" style="border: 2px dashed var(--primary); min-width: 60px; height: 60px; display: inline-flex; align-items: center; justify-content: center; font-size: 1.8rem; background: #FAFBFD;">_</div>
  `).join('');

  // Render Pilihan Huruf Acak
  poolElem.innerHTML = data.scrambled.map((letter) => `
    <button class="option-btn" onclick="addLetterToSusunHuruf('${letter}', this)">${letter}</button>
  `).join('');
}

function addLetterToSusunHuruf(letter, btnElem) {
  const data = LEARN_DATA.susunHuruf[susunHurufIndex];
  if (susunHurufCurrentArr.length >= data.targetWord.length) return;

  playSoundEffect('click');
  speakText(letter);
  susunHurufCurrentArr.push(letter);
  btnElem.disabled = true;
  btnElem.style.opacity = '0.4';

  updateSusunHurufUI();
}

function updateSusunHurufUI() {
  const data = LEARN_DATA.susunHuruf[susunHurufIndex];
  const targetSlotsElem = document.getElementById('susunHurufTargetSlots');
  const feedbackElem = document.getElementById('susunHurufFeedback');

  const slots = Array.from(data.targetWord).map((_, idx) => {
    const val = susunHurufCurrentArr[idx] || '_';
    return `<div class="option-btn" style="border: 3px solid var(--primary); min-width: 60px; height: 60px; display: inline-flex; align-items: center; justify-content: center; font-size: 1.8rem; background: ${val !== '_' ? '#EBF5FF' : '#FAFBFD'}; color: var(--primary);">${val}</div>`;
  });

  targetSlotsElem.innerHTML = slots.join('');

  // Cek jika sudah penuh
  if (susunHurufCurrentArr.length === data.targetWord.length) {
    const result = susunHurufCurrentArr.join('');
    if (result === data.targetWord) {
      playSoundEffect('correct');
      feedbackElem.textContent = `🎉 Hore! Benar: ${data.targetWord}`;
      feedbackElem.className = 'alert-message alert-info';
      feedbackElem.style.display = 'block';
      speakText(`Hore! Kata ${data.targetWord} tersusun dengan benar.`);

      setTimeout(() => {
        susunHurufIndex = (susunHurufIndex + 1) % LEARN_DATA.susunHuruf.length;
        initSusunHuruf();
      }, 1500);
    } else {
      playSoundEffect('wrong');
      feedbackElem.textContent = `❌ Belum tepat (${result}). Mari coba lagi!`;
      feedbackElem.className = 'alert-message alert-error';
      feedbackElem.style.display = 'block';
      speakText('Belum tepat. Mari coba lagi.');

      setTimeout(() => {
        initSusunHuruf();
      }, 1500);
    }
  }
}

/* --- 3. LOGIKA & RENDER SUSUN KATA --- */
function initSusunKata() {
  const data = LEARN_DATA.susunKata[susunKataIndex];
  const hintElem = document.getElementById('susunKataHint');
  const targetSlotsElem = document.getElementById('susunKataTargetSlots');
  const poolElem = document.getElementById('susunKataPool');
  const feedbackElem = document.getElementById('susunKataFeedback');

  if (!data || !hintElem) return;

  hintElem.textContent = data.hint;
  susunKataCurrentArr = [];
  feedbackElem.style.display = 'none';

  targetSlotsElem.innerHTML = data.sentenceTarget.map(() => `
    <div class="option-btn" style="border: 2px dashed var(--secondary); padding: 10px 20px; min-width: 90px; height: 50px; font-size: 1.1rem; background: #FAFBFD;">______</div>
  `).join('');

  poolElem.innerHTML = data.options.map(word => `
    <button class="option-btn" style="border-color: var(--secondary); color: var(--secondary);" onclick="addWordToSusunKata('${word}', this)">${word}</button>
  `).join('');
}

function addWordToSusunKata(word, btnElem) {
  const data = LEARN_DATA.susunKata[susunKataIndex];
  if (susunKataCurrentArr.length >= data.sentenceTarget.length) return;

  playSoundEffect('click');
  speakText(word);
  susunKataCurrentArr.push(word);
  btnElem.disabled = true;
  btnElem.style.opacity = '0.4';

  updateSusunKataUI();
}

function updateSusunKataUI() {
  const data = LEARN_DATA.susunKata[susunKataIndex];
  const targetSlotsElem = document.getElementById('susunKataTargetSlots');
  const feedbackElem = document.getElementById('susunKataFeedback');

  targetSlotsElem.innerHTML = data.sentenceTarget.map((_, idx) => {
    const val = susunKataCurrentArr[idx] || '______';
    return `<div class="option-btn" style="border: 3px solid var(--secondary); padding: 10px 20px; font-size: 1.1rem; background: ${val !== '______' ? '#FFF3E6' : '#FAFBFD'}; color: var(--secondary);">${val}</div>`;
  }).join('');

  if (susunKataCurrentArr.length === data.sentenceTarget.length) {
    const isCorrect = susunKataCurrentArr.every((val, idx) => val === data.sentenceTarget[idx]);
    if (isCorrect) {
      playSoundEffect('correct');
      const sentenceStr = data.sentenceTarget.join(' ');
      feedbackElem.textContent = `🎉 HEBAT! Kalimat: "${sentenceStr}"`;
      feedbackElem.className = 'alert-message alert-info';
      feedbackElem.style.display = 'block';
      speakText(`Hebat! ${sentenceStr}`);

      setTimeout(() => {
        susunKataIndex = (susunKataIndex + 1) % LEARN_DATA.susunKata.length;
        initSusunKata();
      }, 1800);
    } else {
      playSoundEffect('wrong');
      feedbackElem.textContent = `❌ Susunan belum cocok. Mari ulangi lagi!`;
      feedbackElem.className = 'alert-message alert-error';
      feedbackElem.style.display = 'block';
      speakText('Susunan belum tepat.');

      setTimeout(() => {
        initSusunKata();
      }, 1500);
    }
  }
}

/* --- 4. RENDER MENGEJA KATA --- */
function renderMengejaKata() {
  const container = document.getElementById('mengejaKataContainer');
  if (!container) return;

  container.innerHTML = LEARN_DATA.mengejaKata.map(item => `
    <div class="letter-card" style="border-color: #E8F8F0;" onclick="spellWordOut('${item.word}', '${item.syllables.join("', '")}')">
      <div style="font-size: 2.2rem; margin-bottom: 8px;">${item.icon}</div>
      <div style="font-size: 1.8rem; font-weight: bold; color: var(--accent); margin-bottom: 4px;">${item.display}</div>
      <div style="font-size: 1.1rem; font-weight: 600; color: var(--text-main); margin-bottom: 10px;">${item.word}</div>
      
      <div style="display: flex; gap: 6px; justify-content: center; flex-wrap: wrap;">
        ${item.syllables.map(syl => `
          <span style="background: #E8F8F0; color: var(--accent); padding: 4px 10px; border-radius: 12px; font-weight: bold; font-size: 0.9rem;">
            🔊 ${syl}
          </span>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function spellWordOut(fullWord, ...syllables) {
  playSoundEffect('click');
  const spellingText = `${fullWord}. Dibaca: ${syllables.join(' ... ')}.`;
  speakText(spellingText);
}

// Inisialisasi Saat Halaman Dimuat
document.addEventListener('DOMContentLoaded', () => {
  renderMengenalHuruf();
  initSusunHuruf();
  initSusunKata();
  renderMengejaKata();
});
