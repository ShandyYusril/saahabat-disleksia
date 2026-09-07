/* ----------------------------------------------------
   SAHABAT DISLEKSIA - HALAMAN MENGENAL HURUF A-Z
---------------------------------------------------- */

const ALPHABET_DATA = [
  { upper: 'A', lower: 'a', word: 'Apel', syllable: 'A - PEL', icon: '🍎', desc: 'Huruf A vokal untuk Apel', category: 'vokal' },
  { upper: 'B', lower: 'b', word: 'Bola', syllable: 'BO - LA', icon: '⚽', desc: 'Huruf B konsonan. Perutnya di depan', category: 'konsonan' },
  { upper: 'C', lower: 'c', word: 'Cangkir', syllable: 'CANG - KIR', icon: '☕', desc: 'Huruf C konsonan untuk Cangkir', category: 'konsonan' },
  { upper: 'D', lower: 'd', word: 'Dadu', syllable: 'DA - DU', icon: '🎲', desc: 'Huruf D konsonan. Perutnya di belakang', category: 'konsonan' },
  { upper: 'E', lower: 'e', word: 'Elang', syllable: 'E - LANG', icon: '🦅', desc: 'Huruf E vokal untuk Elang', category: 'vokal' },
  { upper: 'F', lower: 'f', word: 'Foto', syllable: 'FO - TO', icon: '📷', desc: 'Huruf F konsonan untuk Foto', category: 'konsonan' },
  { upper: 'G', lower: 'g', word: 'Gajah', syllable: 'GA - JAH', icon: '🐘', desc: 'Huruf G konsonan untuk Gajah', category: 'konsonan' },
  { upper: 'H', lower: 'h', word: 'Harimau', syllable: 'HA - RI - MAU', icon: '🐯', desc: 'Huruf H konsonan untuk Harimau', category: 'konsonan' },
  { upper: 'I', lower: 'i', word: 'Ikan', syllable: 'I - KAN', icon: '🐟', desc: 'Huruf I vokal bertitik di atas', category: 'vokal' },
  { upper: 'J', lower: 'j', word: 'Jeruk', syllable: 'JE - RUK', icon: '🍊', desc: 'Huruf J konsonan untuk Jeruk', category: 'konsonan' },
  { upper: 'K', lower: 'k', word: 'Kucing', syllable: 'KU - CING', icon: '🐱', desc: 'Huruf K konsonan untuk Kucing', category: 'konsonan' },
  { upper: 'L', lower: 'l', word: 'Lemon', syllable: 'LE - MON', icon: '🍋', desc: 'Huruf L konsonan lurus tinggi', category: 'konsonan' },
  { upper: 'M', lower: 'm', word: 'Mobil', syllable: 'MO - BIL', icon: '🚗', desc: 'Huruf M konsonan. Memiliki 3 kaki', category: 'konsonan' },
  { upper: 'N', lower: 'n', word: 'Nanas', syllable: 'NA - NAS', icon: '🍍', desc: 'Huruf N konsonan untuk Nanas', category: 'konsonan' },
  { upper: 'O', lower: 'o', word: 'Obat', syllable: 'O - BAT', icon: '💊', desc: 'Huruf O vokal berbentuk bulat', category: 'vokal' },
  { upper: 'P', lower: 'p', word: 'Pisang', syllable: 'PI - SANG', icon: '🍌', desc: 'Huruf P konsonan. Tangkainya di bawah', category: 'konsonan' },
  { upper: 'Q', lower: 'q', word: 'Quran', syllable: 'QUR - AN', icon: '📖', desc: 'Huruf Q konsonan. Ekor di kanan bawah', category: 'konsonan' },
  { upper: 'R', lower: 'r', word: 'Roti', syllable: 'RO - TI', icon: '🍞', desc: 'Huruf R konsonan untuk Roti', category: 'konsonan' },
  { upper: 'S', lower: 's', word: 'Sapi', syllable: 'SA - PI', icon: '🐄', desc: 'Huruf S konsonan melengkung halus', category: 'konsonan' },
  { upper: 'T', lower: 't', word: 'Topi', syllable: 'TO - PI', icon: '🧢', desc: 'Huruf T konsonan bergaris silang', category: 'konsonan' },
  { upper: 'U', lower: 'u', word: 'Udang', syllable: 'U - DANG', icon: '🦐', desc: 'Huruf U vokal terbuka ke atas', category: 'vokal' },
  { upper: 'V', lower: 'v', word: 'Vas', syllable: 'VAS', icon: '🏺', desc: 'Huruf V konsonan untuk Vas', category: 'konsonan' },
  { upper: 'W', lower: 'w', word: 'Wortel', syllable: 'WOR - TEL', icon: '🥕', desc: 'Huruf W konsonan. Mirip M terbalik', category: 'konsonan' },
  { upper: 'X', lower: 'x', word: 'Xilofon', syllable: 'XI - LO - FON', icon: '🪘', desc: 'Huruf X konsonan bergaris silang', category: 'konsonan' },
  { upper: 'Y', lower: 'y', word: 'Yoyo', syllable: 'YO - YO', icon: '🪀', desc: 'Huruf Y konsonan untuk Yoyo', category: 'konsonan' },
  { upper: 'Z', lower: 'z', word: 'Zebra', syllable: 'ZE - BRA', icon: 'ZEBRA', icon: 'Z', desc: 'Huruf Z konsonan untuk Zebra', category: 'konsonan' }
];

// Perbaiki item Z
ALPHABET_DATA[25] = { upper: 'Z', lower: 'z', word: 'Zebra', syllable: 'ZE - BRA', icon: '🦓', desc: 'Huruf Z konsonan untuk Zebra', category: 'konsonan' };

let currentFilter = 'all';
let currentActiveItem = null;

function renderAlphabetCards(filter = 'all') {
  const container = document.getElementById('alphabetGrid');
  if (!container) return;

  currentFilter = filter;

  let filteredData = ALPHABET_DATA.filter(item => {
  if (filter === 'vokal') return item.category === 'vokal';
  if (filter === 'konsonan') return item.category === 'konsonan';
  return true;
});

// Urutan huruf vokal dibuat AIUEO
if (filter === 'vokal') {
  const vocalOrder = ['A', 'I', 'U', 'E', 'O'];

  filteredData.sort((a, b) => {
    return vocalOrder.indexOf(a.upper) - vocalOrder.indexOf(b.upper);
  });
}

  container.innerHTML = filteredData.map(item => `
    <div class="alphabet-card" onclick="showLetterDetail('${item.upper}')" title="Klik untuk lihat detail huruf ${item.upper}">
      <div class="badge-category ${item.category}">${item.category.toUpperCase()}</div>
      <div class="alphabet-image">${item.icon}</div>
      <div class="alphabet-letters">
        <span class="letter-upper">${item.upper}</span>
        <span class="letter-lower">${item.lower}</span>
      </div>
      <div class="alphabet-word">${item.word}</div>
      <button class="audio-btn" style="margin-top: 12px; width: 100%; justify-content: center;">🔍 Detail</button>
    </div>
  `).join('');
}

function showLetterDetail(letterUpper) {
  const item = ALPHABET_DATA.find(d => d.upper === letterUpper);
  if (!item) return;

  currentActiveItem = item;

  // Isi data modal
  const modal = document.getElementById('letterDetailModal');
  const catElem = document.getElementById('detailCategory');
  const imgElem = document.getElementById('detailImage');
  const upperElem = document.getElementById('detailUpper');
  const lowerElem = document.getElementById('detailLower');
  const wordElem = document.getElementById('detailWord');
  const syllableElem = document.getElementById('detailSyllable');

  if (catElem) {
    catElem.textContent = item.category.toUpperCase();
    catElem.className = `badge-category ${item.category}`;
  }
  if (imgElem) imgElem.textContent = item.icon;
  if (upperElem) upperElem.textContent = item.upper;
  if (lowerElem) lowerElem.textContent = item.lower;
  if (wordElem) wordElem.textContent = item.word;
  if (syllableElem) syllableElem.textContent = item.syllable;

  if (modal) {
    modal.style.display = 'flex';
  }
}

function speakDetailText() {
  if (!currentActiveItem) return;
  const item = currentActiveItem;
  const text = `Ini huruf ${item.upper} besar dan ${item.lower} kecil. Gambar ${item.word}. Ejaan: ${item.syllable}. ${item.desc}.`;
}

function closeLetterDetail() {
  const modal = document.getElementById('letterDetailModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function filterAlphabet(type) {
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`filter-${type}`);
  if (activeBtn) activeBtn.classList.add('active');
  
  renderAlphabetCards(type);
}

document.addEventListener('DOMContentLoaded', () => {
  renderAlphabetCards('all');
});
