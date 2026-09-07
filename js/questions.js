/* ==========================================================================
   DYSLEXIA LETTER & WORD QUESTIONS DATABASE
   5 Variasi Jenis Soal Spesialisasi Disleksia:
   1. Huruf Depan (huruf_depan): Menentukan huruf awal dari gambar.
   2. Melengkapi Huruf (melengkapi_huruf): Mengisi 1 huruf rumpang (B A T _ ).
   3. Deteksi Huruf dalam Kata (deteksi_huruf_kata): Menemukan huruf yang ada di kata.
   4. Diskriminasi Visual (diskriminasi_visual): Membedakan huruf cermin/mirip (b, d, p, q, m, w, n, u).
   5. Cari Huruf Vokal/Konsonan (cari_vokal_konsonan): Menemukan vokal/konsonan dari kata/kumpulan huruf.
   ========================================================================== */

const QUESTION_BANK = [
  // =========================================================================
  // 1. HURUF DEPAN (Menentukan huruf awal dari gambar)
  // =========================================================================
  {
    id: 'hd_apel',
    tier: 1,
    category: 'huruf_depan',
    illustration: '🍎',
    word: 'APEL',
    questionText: 'Huruf awal dari gambar tersebut adalah...',
    speechText: 'Gambar Apel. Huruf awal dari kata Apel adalah apa?',
    hintText: 'Pilihlah huruf pertama yang mengawali kata dari gambar di atas.',
    options: [
      { text: 'A', isCorrect: true },
      { text: 'E', isCorrect: false },
      { text: 'I', isCorrect: false },
      { text: 'O', isCorrect: false }
    ]
  },
  {
    id: 'hd_ikan',
    tier: 1,
    category: 'huruf_depan',
    illustration: '🐟',
    word: 'IKAN',
    questionText: 'Huruf awal dari gambar tersebut adalah...',
    speechText: 'Gambar Ikan. Huruf pertama dari kata Ikan adalah apa?',
    hintText: 'Pilihlah huruf pertama yang mengawali kata dari gambar di atas.',
    options: [
      { text: 'I', isCorrect: true },
      { text: 'A', isCorrect: false },
      { text: 'U', isCorrect: false },
      { text: 'E', isCorrect: false }
    ]
  },
  {
    id: 'hd_bola',
    tier: 1,
    category: 'huruf_depan',
    illustration: '⚽',
    word: 'BOLA',
    questionText: 'Huruf awal dari gambar tersebut adalah...',
    speechText: 'Gambar Bola. Huruf depan dari kata Bola adalah apa?',
    hintText: 'Pilihlah huruf pertama yang mengawali kata dari gambar di atas.',
    options: [
      { text: 'B', isCorrect: true },
      { text: 'T', isCorrect: false },
      { text: 'L', isCorrect: false },
      { text: 'S', isCorrect: false }
    ]
  },
  {
    id: 'hd_gajah',
    tier: 1,
    category: 'huruf_depan',
    illustration: '🐘',
    word: 'GAJAH',
    questionText: 'Huruf awal dari gambar tersebut adalah...',
    speechText: 'Gambar Gajah. Huruf awal dari kata Gajah adalah apa?',
    hintText: 'Pilihlah huruf pertama yang mengawali kata dari gambar di atas.',
    options: [
      { text: 'G', isCorrect: true },
      { text: 'J', isCorrect: false },
      { text: 'H', isCorrect: false },
      { text: 'M', isCorrect: false }
    ]
  },
  {
    id: 'hd_kucing',
    tier: 1,
    category: 'huruf_depan',
    illustration: '🐱',
    word: 'KUCING',
    questionText: 'Huruf awal dari gambar tersebut adalah...',
    speechText: 'Gambar Kucing. Huruf pertama kata Kucing adalah apa?',
    hintText: 'Pilihlah huruf pertama yang mengawali kata dari gambar di atas.',
    options: [
      { text: 'K', isCorrect: true },
      { text: 'T', isCorrect: false },
      { text: 'C', isCorrect: false },
      { text: 'S', isCorrect: false }
    ]
  },
  {
    id: 'hd_sapi',
    tier: 1,
    category: 'huruf_depan',
    illustration: '🐄',
    word: 'SAPI',
    questionText: 'Huruf awal dari gambar tersebut adalah...',
    speechText: 'Gambar Sapi. Huruf depan kata Sapi adalah apa?',
    hintText: 'Pilihlah huruf pertama yang mengawali kata dari gambar di atas.',
    options: [
      { text: 'S', isCorrect: true },
      { text: 'P', isCorrect: false },
      { text: 'K', isCorrect: false },
      { text: 'M', isCorrect: false }
    ]
  },
  {
    id: 'hd_rumah',
    tier: 1,
    category: 'huruf_depan',
    illustration: '🏠',
    word: 'RUMAH',
    questionText: 'Huruf awal dari gambar tersebut adalah...',
    speechText: 'Gambar Rumah. Huruf awal dari kata Rumah adalah apa?',
    hintText: 'Pilihlah huruf pertama yang mengawali kata dari gambar di atas.',
    options: [
      { text: 'R', isCorrect: true },
      { text: 'H', isCorrect: false },
      { text: 'S', isCorrect: false },
      { text: 'L', isCorrect: false }
    ]
  },

  // =========================================================================
  // 2. MELENGKAPI HURUF (Mengisi 1 huruf yang hilang B A T _ )
  // =========================================================================
  {
    id: 'mh_batu',
    tier: 3,
    category: 'melengkapi_huruf',
    illustration: '🪨',
    word: 'BATU',
    questionText: 'Lengkapi huruf yang hilang: <br><span class="highlight-letter">B A T _</span> 🪨',
    speechText: 'Lengkapi huruf yang hilang dari kata B A T rumpang.',
    hintText: 'Pilihlah huruf yang tepat untuk melengkapi bagian rumpang.',
    options: [
      { text: 'U', isCorrect: true },
      { text: 'A', isCorrect: false },
      { text: 'I', isCorrect: false },
      { text: 'E', isCorrect: false }
    ]
  },
  {
    id: 'mh_kata',
    tier: 3,
    category: 'melengkapi_huruf',
    illustration: '📝',
    word: 'KATA',
    questionText: 'Lengkapi huruf yang hilang: <br><span class="highlight-letter">K A _ A</span> 📝',
    speechText: 'Lengkapi huruf yang hilang dari kata K A rumpang A.',
    hintText: 'Pilihlah huruf yang tepat untuk melengkapi bagian rumpang.',
    options: [
      { text: 'T', isCorrect: true },
      { text: 'B', isCorrect: false },
      { text: 'S', isCorrect: false },
      { text: 'M', isCorrect: false }
    ]
  },
  {
    id: 'mh_buku',
    tier: 3,
    category: 'melengkapi_huruf',
    illustration: '📖',
    word: 'BUKU',
    questionText: 'Lengkapi huruf yang hilang: <br><span class="highlight-letter">B _ K U</span> 📖',
    speechText: 'Lengkapi huruf yang hilang dari kata B rumpang K U.',
    hintText: 'Pilihlah huruf yang tepat untuk melengkapi bagian rumpang.',
    options: [
      { text: 'U', isCorrect: true },
      { text: 'A', isCorrect: false },
      { text: 'I', isCorrect: false },
      { text: 'E', isCorrect: false }
    ]
  },
  {
    id: 'mh_bola',
    tier: 3,
    category: 'melengkapi_huruf',
    illustration: '⚽',
    word: 'BOLA',
    questionText: 'Lengkapi huruf yang hilang: <br><span class="highlight-letter">B O _ A</span> ⚽',
    speechText: 'Lengkapi huruf yang hilang dari kata B O rumpang A.',
    hintText: 'Pilihlah huruf yang tepat untuk melengkapi bagian rumpang.',
    options: [
      { text: 'L', isCorrect: true },
      { text: 'R', isCorrect: false },
      { text: 'M', isCorrect: false },
      { text: 'K', isCorrect: false }
    ]
  },
  {
    id: 'mh_apel',
    tier: 3,
    category: 'melengkapi_huruf',
    illustration: '🍎',
    word: 'APEL',
    questionText: 'Lengkapi huruf yang hilang: <br><span class="highlight-letter">A P _ L</span> 🍎',
    speechText: 'Lengkapi huruf yang hilang dari kata A P rumpang L.',
    hintText: 'Pilihlah huruf yang tepat untuk melengkapi bagian rumpang.',
    options: [
      { text: 'E', isCorrect: true },
      { text: 'I', isCorrect: false },
      { text: 'U', isCorrect: false },
      { text: 'O', isCorrect: false }
    ]
  },
  {
    id: 'mh_mata',
    tier: 3,
    category: 'melengkapi_huruf',
    illustration: '👁️',
    word: 'MATA',
    questionText: 'Lengkapi huruf yang hilang: <br><span class="highlight-letter">M _ T A</span> 👁️',
    speechText: 'Lengkapi huruf yang hilang dari kata M rumpang T A.',
    hintText: 'Pilihlah huruf yang tepat untuk melengkapi bagian rumpang.',
    options: [
      { text: 'A', isCorrect: true },
      { text: 'I', isCorrect: false },
      { text: 'E', isCorrect: false },
      { text: 'O', isCorrect: false }
    ]
  },
  {
    id: 'mh_rumah',
    tier: 3,
    category: 'melengkapi_huruf',
    illustration: '🏠',
    word: 'RUMAH',
    questionText: 'Lengkapi huruf yang hilang: <br><span class="highlight-letter">R U _ A H</span> 🏠',
    speechText: 'Lengkapi huruf yang hilang dari kata R U rumpang A H.',
    hintText: 'Pilihlah huruf yang tepat untuk melengkapi bagian rumpang.',
    options: [
      { text: 'M', isCorrect: true },
      { text: 'W', isCorrect: false },
      { text: 'N', isCorrect: false },
      { text: 'B', isCorrect: false }
    ]
  },
  {
    id: 'mh_sapi',
    tier: 3,
    category: 'melengkapi_huruf',
    illustration: '🐄',
    word: 'SAPI',
    questionText: 'Lengkapi huruf yang hilang: <br><span class="highlight-letter">S A _ I</span> 🐄',
    speechText: 'Lengkapi huruf yang hilang dari kata S A rumpang I.',
    hintText: 'Pilihlah huruf yang tepat untuk melengkapi bagian rumpang.',
    options: [
      { text: 'P', isCorrect: true },
      { text: 'Q', isCorrect: false },
      { text: 'B', isCorrect: false },
      { text: 'D', isCorrect: false }
    ]
  },

  // =========================================================================
  // 3. DETEKSI HURUF DALAM KATA (Menentukan huruf yang ada di suatu kata)
  // =========================================================================
  {
    id: 'dh_rumah',
    tier: 1,
    category: 'deteksi_huruf_kata',
    illustration: '🏠',
    word: 'RUMAH',
    description: 'Perhatikan gambar diatas!',
    questionText: 'Huruf mana yang ada pada kata dari gambar diatas?',
    speechText: 'Huruf apa yang ada di dalam kata Rumah?',
    options: [
      { text: 'R', isCorrect: true },
      { text: 'K', isCorrect: false },
      { text: 'T', isCorrect: false },
      { text: 'B', isCorrect: false }
    ]
  },
  {
    id: 'dh_gajah',
    tier: 1,
    category: 'deteksi_huruf_kata',
    illustration: '🐘',
    word: 'GAJAH',
    description: 'Perhatikan gambar diatas!',
    questionText: 'Huruf mana yang ada pada kata dari gambar diatas?',
    speechText: 'Huruf apa yang ada di dalam kata Gajah?',
    options: [
      { text: 'J', isCorrect: true },
      { text: 'B', isCorrect: false },
      { text: 'P', isCorrect: false },
      { text: 'D', isCorrect: false }
    ]
  },
  {
    id: 'dh_bola',
    tier: 1,
    category: 'deteksi_huruf_kata',
    illustration: '⚽',
    word: 'BOLA',
    description: 'Perhatikan gambar diatas!',
    questionText: 'Huruf mana yang ada pada kata dari gambar diatas?',
    speechText: 'Huruf mana yang ada pada kata Bola?',
    options: [
      { text: 'L', isCorrect: true },
      { text: 'K', isCorrect: false },
      { text: 'M', isCorrect: false },
      { text: 'N', isCorrect: false }
    ]
  },
  {
    id: 'dh_ikan',
    tier: 1,
    category: 'deteksi_huruf_kata',
    illustration: '🐟',
    word: 'IKAN',
    description: 'Perhatikan gambar diatas!',
    questionText: 'Huruf mana yang ada pada kata dari gambar diatas?',
    speechText: 'Huruf mana yang ada di kata Ikan?',
    options: [
      { text: 'K', isCorrect: true },
      { text: 'M', isCorrect: false },
      { text: 'B', isCorrect: false },
      { text: 'P', isCorrect: false }
    ]
  },
  {
    id: 'dh_daun',
    tier: 2,
    category: 'deteksi_huruf_kata',
    illustration: '🍃',
    word: 'DAUN',
    description: 'Perhatikan gambar diatas!',
    questionText: 'Huruf mana yang ada pada kata dari gambar diatas?',
    speechText: 'Huruf apa yang ada di dalam kata Daun?',
    options: [
      { text: 'N', isCorrect: true },
      { text: 'P', isCorrect: false },
      { text: 'T', isCorrect: false },
      { text: 'S', isCorrect: false }
    ]
  },
  {
    id: 'dh_mata',
    tier: 2,
    category: 'deteksi_huruf_kata',
    illustration: '👁️',
    word: 'MATA',
    description: 'Perhatikan gambar diatas!',
    questionText: 'Huruf mana yang ada pada kata dari gambar diatas?',
    speechText: 'Huruf mana yang ada di kata Mata?',
    options: [
      { text: 'T', isCorrect: true },
      { text: 'S', isCorrect: false },
      { text: 'L', isCorrect: false },
      { text: 'K', isCorrect: false }
    ]
  },

  // =========================================================================
  // 4. DISKRIMINASI VISUAL (Membedakan huruf cermin/mirip b, d, p, q, m, w, n, u)
  // =========================================================================
  {
    id: 'dv_b_direct',
    tier: 2,
    category: 'diskriminasi_visual',
    illustration: '🔍',
    word: 'HURUF b',
    questionText: 'Perut di kanan depan: <span class="highlight-letter">b</span> <br>Pilih huruf <strong>b</strong>!',
    speechText: 'Perut di kanan depan b. Pilih huruf b!',
    hintText: 'Perhatikan bentuk dan arah lingkaran pada huruf yang diminta.',
    options: [
      { text: 'b', isCorrect: true },
      { text: 'd', isCorrect: false },
      { text: 'p', isCorrect: false },
      { text: 'q', isCorrect: false }
    ]
  },
  {
    id: 'dv_d_direct',
    tier: 2,
    category: 'diskriminasi_visual',
    illustration: '🔍',
    word: 'HURUF d',
    questionText: 'Perut di kiri belakang: <span class="highlight-letter">d</span> <br>Pilih huruf <strong>d</strong>!',
    speechText: 'Perut di kiri belakang d. Pilih huruf d!',
    hintText: 'Perhatikan bentuk dan arah lingkaran pada huruf yang diminta.',
    options: [
      { text: 'd', isCorrect: true },
      { text: 'b', isCorrect: false },
      { text: 'q', isCorrect: false },
      { text: 'p', isCorrect: false }
    ]
  },
  {
    id: 'dv_p_direct',
    tier: 2,
    category: 'diskriminasi_visual',
    illustration: '🔍',
    word: 'HURUF p',
    questionText: 'Ekor di bawah, kepala kanan: <span class="highlight-letter">p</span> <br>Pilih huruf <strong>p</strong>!',
    speechText: 'Ekor di bawah, kepala kanan p. Pilih huruf p!',
    hintText: 'Perhatikan posisi lingkaran dan garis lurus pada huruf yang diminta.',
    options: [
      { text: 'p', isCorrect: true },
      { text: 'q', isCorrect: false },
      { text: 'b', isCorrect: false },
      { text: 'd', isCorrect: false }
    ]
  },
  {
    id: 'dv_q_direct',
    tier: 2,
    category: 'diskriminasi_visual',
    illustration: '🔍',
    word: 'HURUF q',
    questionText: 'Ekor di bawah, kepala kiri: <span class="highlight-letter">q</span> <br>Pilih huruf <strong>q</strong>!',
    speechText: 'Ekor di bawah, kepala kiri q. Pilih huruf q!',
    hintText: 'Perhatikan posisi lingkaran dan garis lurus pada huruf yang diminta.',
    options: [
      { text: 'q', isCorrect: true },
      { text: 'p', isCorrect: false },
      { text: 'd', isCorrect: false },
      { text: 'b', isCorrect: false }
    ]
  },
  {
    id: 'dv_m_direct',
    tier: 2,
    category: 'diskriminasi_visual',
    illustration: '🔍',
    word: 'HURUF M',
    questionText: 'Kaki tiga menunjuk ke bawah: <span class="highlight-letter">M</span> <br>Pilih huruf <strong>M</strong>!',
    speechText: 'Kaki tiga menunjuk ke bawah M. Pilih huruf M!',
    hintText: 'Perhatikan arah bukaan dan lengkungan pada huruf yang diminta.',
    options: [
      { text: 'M', isCorrect: true },
      { text: 'W', isCorrect: false },
      { text: 'N', isCorrect: false },
      { text: 'V', isCorrect: false }
    ]
  },
  {
    id: 'dv_w_direct',
    tier: 2,
    category: 'diskriminasi_visual',
    illustration: '🔍',
    word: 'HURUF W',
    questionText: 'Terbuka menunjuk ke atas: <span class="highlight-letter">W</span> <br>Pilih huruf <strong>W</strong>!',
    speechText: 'Terbuka menunjuk ke atas W. Pilih huruf W!',
    hintText: 'Perhatikan arah bukaan dan lengkungan pada huruf yang diminta.',
    options: [
      { text: 'W', isCorrect: true },
      { text: 'M', isCorrect: false },
      { text: 'V', isCorrect: false },
      { text: 'N', isCorrect: false }
    ]
  },
  {
    id: 'dv_n_direct',
    tier: 2,
    category: 'diskriminasi_visual',
    illustration: '🔍',
    word: 'HURUF n',
    questionText: 'Lengkungan terbalik ke bawah: <span class="highlight-letter">n</span> <br>Pilih huruf <strong>n</strong>!',
    speechText: 'Lengkungan terbalik ke bawah n. Pilih huruf n!',
    hintText: 'Perhatikan arah lengkungan pada huruf yang diminta.',
    options: [
      { text: 'n', isCorrect: true },
      { text: 'u', isCorrect: false },
      { text: 'm', isCorrect: false },
      { text: 'w', isCorrect: false }
    ]
  },
  {
    id: 'dv_u_direct',
    tier: 2,
    category: 'diskriminasi_visual',
    illustration: '🔍',
    word: 'HURUF u',
    questionText: 'Mangkuk terbuka ke atas: <span class="highlight-letter">u</span> <br>Pilih huruf <strong>u</strong>!',
    speechText: 'Mangkuk terbuka ke atas u. Pilih huruf u!',
    hintText: 'Perhatikan arah lengkungan pada huruf yang diminta.',
    options: [
      { text: 'u', isCorrect: true },
      { text: 'n', isCorrect: false },
      { text: 'v', isCorrect: false },
      { text: 'm', isCorrect: false }
    ]
  },

  // =========================================================================
  // 5. CARI HURUF VOKAL / KONSONAN (Finding Vowels or Consonants)
  // =========================================================================
  {
  id: 'vk_find_vowel_in_bandung',
  tier: 1,
  category: 'cari_vokal_konsonan',
  illustration: '🏙️',
  word: 'BANDUNG',
  questionText: 'Perhatikan kata <strong>BANDUNG</strong>. Manakah yang merupakan <strong>huruf vokal</strong>?',
  speechText: 'Perhatikan kata Bandung. Manakah yang merupakan huruf vokal?',
  hintText: 'Pilih huruf vokal yang terdapat pada kata BANDUNG.',
  options: [
    { text: 'A', isCorrect: true },
    { text: 'B', isCorrect: false },
    { text: 'N', isCorrect: false },
    { text: 'D', isCorrect: false }
  ]
},
  {
    id: 'vk_find_vowel_in_bola',
    tier: 1,
    category: 'cari_vokal_konsonan',
    illustration: '⚽',
    word: 'BOLA',
    questionText: 'Pilih <strong>huruf vokal</strong> yang ada di kata BOLA ⚽!',
    speechText: 'Pilih huruf vokal yang ada di kata Bola!',
    hintText: 'Pilihlah huruf vokal yang terdapat pada kata di atas.',
    options: [
      { text: 'O', isCorrect: true },
      { text: 'B', isCorrect: false },
      { text: 'L', isCorrect: false },
      { text: 'S', isCorrect: false }
    ]
  },
  {
    id: 'vk_find_consonant_B',
    tier: 1,
    category: 'cari_vokal_konsonan',
    illustration: '✨',
    word: 'KONSONAN',
    questionText: 'Manakah yang merupakan <strong>Huruf Konsonan</strong> (Bukan Vokal)?',
    speechText: 'Manakah yang merupakan Huruf Konsonan?',
    hintText: 'Pilihlah huruf yang termasuk dalam kelompok huruf konsonan.',
    options: [
      { text: 'B', isCorrect: true },
      { text: 'A', isCorrect: false },
      { text: 'I', isCorrect: false },
      { text: 'U', isCorrect: false }
    ]
  },
  {
    id: 'vk_find_vowel_in_ikan',
    tier: 1,
    category: 'cari_vokal_konsonan',
    illustration: '🐟',
    word: 'IKAN',
    questionText: 'Pilih <strong>huruf vokal</strong> yang ada di kata IKAN 🐟!',
    speechText: 'Pilih huruf vokal yang ada di kata Ikan!',
    hintText: 'Pilihlah huruf vokal yang terdapat pada kata di atas.',
    options: [
      { text: 'I', isCorrect: true },
      { text: 'K', isCorrect: false },
      { text: 'N', isCorrect: false },
      { text: 'T', isCorrect: false }
    ]
  },
  {
    id: 'vk_find_consonant_in_mata',
    tier: 2,
    category: 'cari_vokal_konsonan',
    illustration: '👁️',
    word: 'MATA',
    questionText: 'Pilih <strong>huruf konsonan</strong> yang ada di kata MATA 👁️!',
    speechText: 'Pilih huruf konsonan yang ada di kata Mata!',
    hintText: 'Pilihlah huruf konsonan yang terdapat pada kata di atas.',
    options: [
      { text: 'T', isCorrect: true },
      { text: 'A', isCorrect: false },
      { text: 'I', isCorrect: false },
      { text: 'U', isCorrect: false }
    ]
  }
];

/**
 * Mengambil variasi soal berdasarkan tingkat kesulitan level (Per 5 Level):
 * Menyusun 5 variasi jenis soal (Huruf Depan, Melengkapi Huruf, Deteksi Huruf, Diskriminasi Visual, Cari Vokal/Konsonan)
 */
function getQuestionsForLevel(levelNumber, count = 5) {
  let pool = [];

  if (levelNumber <= 5) {
    // Tier 1: Pemula (Utamakan Huruf Depan, Deteksi Huruf, Cari Vokal/Konsonan)
    pool = QUESTION_BANK.filter(q => q.tier === 1);
  } else if (levelNumber <= 10) {
    // Tier 2: Menengah (Utamakan Diskriminasi Visual & Deteksi Huruf)
    const t2 = QUESTION_BANK.filter(q => q.tier === 2);
    const t1 = QUESTION_BANK.filter(q => q.tier === 1);
    pool = [...t2, ...t1];
  } else if (levelNumber <= 15) {
    // Tier 3: Lanjutan (Utamakan Melengkapi Huruf Rumpang & Diskriminasi Visual)
    const t3 = QUESTION_BANK.filter(q => q.tier === 3);
    const t2 = QUESTION_BANK.filter(q => q.tier === 2);
    pool = [...t3, ...t2];
  } else {
    // Tier 4+: Campuran Seluruh Variasi Soal
    pool = [...QUESTION_BANK];
  }

  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());
  const shuffledPool = shuffle(pool);
  const selected = [];
  const usedCategories = new Set();

  // Pass 1: Pilih soal dari kategori berbeda agar dalam 1 level mendapatkan variasi jenis soal
  for (const q of shuffledPool) {
    if (selected.length >= count) break;
    if (!usedCategories.has(q.category)) {
      selected.push(q);
      usedCategories.add(q.category);
    }
  }

  // Pass 2: Isi sisa kuota jika jumlah kategori terpilih belum mencapai target count
  if (selected.length < count) {
    for (const q of shuffledPool) {
      if (selected.length >= count) break;
      if (!selected.includes(q)) {
        selected.push(q);
      }
    }
  }

  // Acak urutan pilihan (options) untuk setiap soal yang terpilih
  return selected.map(q => {
    const qCopy = JSON.parse(JSON.stringify(q));
    qCopy.options.sort(() => 0.5 - Math.random());
    return qCopy;
  });
}

// Fallback untuk kompatibilitas
function getRandomQuestions(count = 5) {
  return getQuestionsForLevel(1, count);
}
