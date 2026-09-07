const questions = [
  {
    word: "APEL",
    image: "🍎",
    syllables: ["AP", "EL"]
  },
  {
    word: "BOLA",
    image: "⚽",
    syllables: ["BO", "LA"]
  },
  {
    word: "BUKU",
    image: "📚",
    syllables: ["BU", "KU"]
  },
  {
    word: "SAPI",
    image: "🐄",
    syllables: ["SA", "PI"]
  },
  {
    word: "ROTI",
    image: "🍞",
    syllables: ["RO", "TI"]
  },
  {
    word: "KAKI",
    image: "🦶",
    syllables: ["KA", "KI"]
  },
  {
    word: "MATA",
    image: "👁️",
    syllables: ["MA", "TA"]
  },
  {
    word: "IKAN",
    image: "🐟",
    syllables: ["I", "KAN"]
  }
];

let currentQuestion = 0;
let score = 0;
let selectedSyllables = [];

const imageElement = document.getElementById("wordImage");
const answerArea = document.getElementById("answerArea");
const syllableOptions = document.getElementById("syllableOptions");
const feedback = document.getElementById("feedback");

const scoreElement = document.getElementById("score");
const questionNumber = document.getElementById("questionNumber");

const checkAnswer = document.getElementById("checkAnswer");
const resetAnswer = document.getElementById("resetAnswer");
const nextQuestion = document.getElementById("nextQuestion");


function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}


function loadQuestion() {

  const question = questions[currentQuestion];

  selectedSyllables = [];

  imageElement.textContent = question.image;

  answerArea.innerHTML = "";
  feedback.textContent = "";

  questionNumber.textContent =
    `${currentQuestion + 1} / ${questions.length}`;

  nextQuestion.style.display = "none";
  checkAnswer.style.display = "inline-flex";

  const shuffled = shuffle(question.syllables);

  shuffled.forEach((syllable) => {

    const button = document.createElement("button");

    button.className = "syllable-button";
    button.textContent = syllable;

    button.addEventListener("click", () => {

      selectedSyllables.push(syllable);

      renderAnswer();

      button.disabled = true;

    });

    syllableOptions.appendChild(button);

  });
}


function renderAnswer() {

  answerArea.innerHTML = "";

  selectedSyllables.forEach((syllable, index) => {

    const button = document.createElement("button");

    button.className = "answer-syllable";
    button.textContent = syllable;

    button.addEventListener("click", () => {

      selectedSyllables.splice(index, 1);

      renderAnswer();
      restoreOptions();

    });

    answerArea.appendChild(button);

  });

}


function restoreOptions() {

  const buttons =
    syllableOptions.querySelectorAll("button");

  buttons.forEach((button) => {

    const syllable = button.textContent;

    const usedCount =
      selectedSyllables.filter(
        item => item === syllable
      ).length;

    const originalCount =
      questions[currentQuestion].syllables.filter(
        item => item === syllable
      ).length;

    button.disabled = usedCount >= originalCount;

  });

}


checkAnswer.addEventListener("click", () => {

  const question = questions[currentQuestion];

  const answer =
    selectedSyllables.join("");

  if (answer === question.word) {

    score += 10;

    scoreElement.textContent = score;

    feedback.textContent =
      "🎉 Hebat! Susunan katanya benar!";

    feedback.className =
      "game-feedback success";

    checkAnswer.style.display = "none";
    nextQuestion.style.display = "inline-flex";

  } else {

    feedback.textContent =
      "💪 Belum tepat. Coba susun lagi!";

    feedback.className =
      "game-feedback error";

  }

});


resetAnswer.addEventListener("click", () => {

  selectedSyllables = [];

  renderAnswer();
  restoreOptions();

  feedback.textContent = "";

});


nextQuestion.addEventListener("click", () => {

  currentQuestion++;

  if (currentQuestion >= questions.length) {

    feedback.textContent =
      `🌟 Selesai! Skor kamu ${score}. Hebat!`;

    feedback.className =
      "game-feedback success";

    checkAnswer.style.display = "none";
    resetAnswer.style.display = "none";
    nextQuestion.style.display = "none";

    return;
  }

  syllableOptions.innerHTML = "";

  loadQuestion();

});


loadQuestion();