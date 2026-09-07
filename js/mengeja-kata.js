const MENGEJA_KATA_DATA = [
  {
    word: "BOLA",
    syllables: ["BO", "LA"],
    icon: "⚽",
    description: "Alat untuk bermain sepak bola."
  },
  {
    word: "BUKU",
    syllables: ["BU", "KU"],
    icon: "📚",
    description: "Benda yang digunakan untuk membaca."
  },
  {
    word: "APEL",
    syllables: ["A", "PEL"],
    icon: "🍎",
    description: "Buah yang dapat berwarna merah atau hijau."
  },
  {
    word: "ROTI",
    syllables: ["RO", "TI"],
    icon: "🍞",
    description: "Makanan yang sering dimakan saat sarapan."
  },
  {
    word: "SAPI",
    syllables: ["SA", "PI"],
    icon: "🐄",
    description: "Hewan yang dapat menghasilkan susu."
  },
  {
    word: "KUCING",
    syllables: ["KU", "CING"],
    icon: "🐱",
    description: "Hewan yang sering dipelihara di rumah."
  },
  {
    word: "MOBIL",
    syllables: ["MO", "BIL"],
    icon: "🚗",
    description: "Kendaraan yang memiliki empat roda."
  },
  {
    word: "RUMAH",
    syllables: ["RU", "MAH"],
    icon: "🏠",
    description: "Tempat tinggal bersama keluarga."
  },
  {
    word: "SEPATU",
    syllables: ["SE", "PA", "TU"],
    icon: "👟",
    description: "Alas kaki yang digunakan saat berjalan."
  },
  {
    word: "SEPEDA",
    syllables: ["SE", "PE", "DA"],
    icon: "🚲",
    description: "Kendaraan roda dua yang dikayuh."
  }
];

let currentWordIndex = 0;


function loadCurrentWord() {

  const item = MENGEJA_KATA_DATA[currentWordIndex];

  if (!item) return;


  const imageVisual =
    document.getElementById("imageVisual");

  const fullWordText =
    document.getElementById("fullWordText");

  const descriptionText =
    document.getElementById("wordDescriptionText");

  const letterSpelling =
    document.getElementById("letterSpelling");

  const syllableDisplay =
    document.getElementById("syllableDisplay");

  const wordCounter =
    document.getElementById("wordCounter");

  const progressFill =
    document.getElementById("spellingProgressFill");


  imageVisual.textContent = item.icon;

  fullWordText.textContent = item.word;

  descriptionText.textContent = item.description;


  wordCounter.textContent =
    `Kata ke-${currentWordIndex + 1} dari ${MENGEJA_KATA_DATA.length}`;


  const progress =
    ((currentWordIndex + 1) /
      MENGEJA_KATA_DATA.length) * 100;

  progressFill.style.width =
    `${progress}%`;


  // Tampilkan huruf satu per satu
  letterSpelling.innerHTML =
    item.word
      .split("")
      .map(letter => `
        <span class="spelling-letter">
          ${letter}
        </span>
      `)
      .join("");


  // Tampilkan suku kata
  syllableDisplay.innerHTML =
    item.syllables
      .map(syllable => `
        <span class="spelling-syllable">
          ${syllable}
        </span>
      `)
      .join("");


  updatePreviousButton();
}


function updatePreviousButton() {

  const previousButton =
    document.getElementById("prevWord");

  if (!previousButton) return;

  previousButton.disabled =
    currentWordIndex === 0;
}


function nextWord() {

  if (
    currentWordIndex <
    MENGEJA_KATA_DATA.length - 1
  ) {

    currentWordIndex++;

    loadCurrentWord();

  } else {

    showCompletion();
  }
}


function previousWord() {

  if (currentWordIndex > 0) {

    currentWordIndex--;

    loadCurrentWord();
  }
}


function showCompletion() {

  const card =
    document.getElementById("mengejaCard");

  if (!card) return;


  card.innerHTML = `
    <div
      style="
        text-align: center;
        padding: 40px 20px;
      "
    >

      <div
        style="
          font-size: 5rem;
          margin-bottom: 20px;
        "
      >
        🌟🎉📚
      </div>

      <h2
        style="
          font-family: var(--font-heading);
          color: var(--accent);
          font-size: 2rem;
          margin-bottom: 15px;
        "
      >
        Hebat!
      </h2>

      <p
        style="
          font-size: 1.1rem;
          color: var(--text-muted);
          margin-bottom: 25px;
        "
      >
        Kamu sudah melihat semua contoh kata.
        Terus berlatih agar semakin lancar membaca!
      </p>

      <div
        style="
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        "
      >

        <button
          class="btn btn-primary"
          onclick="location.reload()"
        >
          🔄 Ulangi
        </button>

        <a
          href="belajar.html"
          class="btn btn-secondary"
        >
          ✏️ Kembali ke Belajar
        </a>

      </div>

    </div>
  `;
}


document.addEventListener(
  "DOMContentLoaded",
  () => {

    const nextButton =
      document.getElementById("nextWord");

    const previousButton =
      document.getElementById("prevWord");


    if (nextButton) {
      nextButton.addEventListener(
        "click",
        nextWord
      );
    }


    if (previousButton) {
      previousButton.addEventListener(
        "click",
        previousWord
      );
    }


    loadCurrentWord();
  }
);