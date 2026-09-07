/* ==========================================================================
   SAHABAT DISLEKSIA
   GAME LABIRIN - VERSI TANPA AUDIO
   Menggunakan mekanisme Game Labirin lama
   ========================================================================== */

class GameEngine {
  constructor() {
    this.canvas = document.getElementById('game-canvas');

    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');

    this.currentLevelNum = 1;
    this.levelData = null;

    this.playerPos = { x: 1, y: 1 };
    this.characterEmoji = '🐰';

    this.score = 0;
    this.answeredCount = 0;

    this.activeQuestion = null;
    this.activeQuestionObj = null;

    this.isModalOpen = false;
    this.tileSize = 40;

    this.initCanvas();
    this.initEventListeners();
    this.loadLevel(this.currentLevelNum);

    this.gameLoop();
  }

  /* ============================================================
     CANVAS
     ============================================================ */

  initCanvas() {
    const resizeCanvas = () => {
      const size = Math.min(window.innerWidth - 40, 560);

      this.canvas.width = size;
      this.canvas.height = size;

      if (this.levelData) {
        this.tileSize = size / this.levelData.cols;
      }

      this.render();
    };

    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);
  }

  /* ============================================================
     LOAD LEVEL
     ============================================================ */

  loadLevel(levelNum) {
    if (levelNum < 1 || levelNum > window.mazeManager.levels.length) {
      levelNum = 1;
    }

    this.currentLevelNum = levelNum;

    this.levelData = window.mazeManager.getLevel(levelNum);

    this.playerPos = {
      ...this.levelData.start
    };

    this.answeredCount = 0;

    this.tileSize =
      this.canvas.width / this.levelData.cols;

    document.getElementById('level-num').textContent =
      levelNum;

    this.updateHUDProgress();
    this.render();
  }

  /* ============================================================
     HUD
     ============================================================ */

  updateHUDProgress() {
    const starSlots =
      document.querySelectorAll(
        '#progress-stars .star-slot'
      );

    starSlots.forEach((slot, index) => {
      if (index < this.answeredCount) {
        slot.textContent = '⭐';
        slot.classList.add('done');
      } else {
        slot.textContent = '❓';
        slot.classList.remove('done');
      }
    });

    const scoreElement =
      document.getElementById('score-count');

    if (scoreElement) {
      scoreElement.textContent = this.score;
    }
  }

  /* ============================================================
     EVENT LISTENERS
     ============================================================ */

  initEventListeners() {

    /* Keyboard */

    window.addEventListener('keydown', (e) => {

      if (this.isModalOpen) return;

      switch (e.key) {

        case 'ArrowUp':
        case 'w':
        case 'W':
          this.movePlayer(0, -1);
          e.preventDefault();
          break;

        case 'ArrowDown':
        case 's':
        case 'S':
          this.movePlayer(0, 1);
          e.preventDefault();
          break;

        case 'ArrowLeft':
        case 'a':
        case 'A':
          this.movePlayer(-1, 0);
          e.preventDefault();
          break;

        case 'ArrowRight':
        case 'd':
        case 'D':
          this.movePlayer(1, 0);
          e.preventDefault();
          break;
      }
    });


    /* D-PAD */

    const btnUp = document.getElementById('btn-up');
    const btnDown = document.getElementById('btn-down');
    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');

    if (btnUp) {
      btnUp.addEventListener('click', () => {
        this.movePlayer(0, -1);
      });
    }

    if (btnDown) {
      btnDown.addEventListener('click', () => {
        this.movePlayer(0, 1);
      });
    }

    if (btnLeft) {
      btnLeft.addEventListener('click', () => {
        this.movePlayer(-1, 0);
      });
    }

    if (btnRight) {
      btnRight.addEventListener('click', () => {
        this.movePlayer(1, 0);
      });
    }


    /* Petunjuk TANPA suara */

    const btnCenter =
      document.getElementById('btn-center');

    if (btnCenter) {
      btnCenter.addEventListener('click', () => {

        this.showTextHint(
          '💡 Temukan 5 tanda tanya ❓ dan jawab semua soal untuk mencapai 🏆!'
        );

      });
    }


    /* Character */

    const charSelect =
      document.getElementById('char-select');

    if (charSelect) {
      charSelect.addEventListener(
        'change',
        (e) => {

          this.characterEmoji =
            e.target.value;

          this.render();

        }
      );
    }


    /* Settings */

    const settingsButton =
      document.getElementById('btn-settings');

    const settingsModal =
      document.getElementById('settings-modal');

    if (settingsButton && settingsModal) {

      settingsButton.addEventListener(
        'click',
        () => {

          this.isModalOpen = true;

          settingsModal.classList.remove(
            'hidden'
          );

        }
      );
    }


    const closeSettings =
      document.getElementById(
        'btn-close-settings'
      );

    if (closeSettings && settingsModal) {

      closeSettings.addEventListener(
        'click',
        () => {

          settingsModal.classList.add(
            'hidden'
          );

          this.isModalOpen = false;

        }
      );
    }


    const saveSettings =
      document.getElementById(
        'btn-save-settings'
      );

    if (saveSettings && settingsModal) {

      saveSettings.addEventListener(
        'click',
        () => {

          this.applySettings();

          settingsModal.classList.add(
            'hidden'
          );

          this.isModalOpen = false;

        }
      );
    }


    /* Theme */

    document
      .querySelectorAll('.theme-picker-btn')
      .forEach((button) => {

        button.addEventListener(
          'click',
          () => {

            document
              .querySelectorAll(
                '.theme-picker-btn'
              )
              .forEach((b) => {
                b.classList.remove('active');
              });

            button.classList.add('active');

          }
        );

      });


    /* Victory */

    const restartButton =
      document.getElementById(
        'btn-restart-level'
      );

    if (restartButton) {

      restartButton.addEventListener(
        'click',
        () => {

          document
            .getElementById('victory-modal')
            .classList.add('hidden');

          this.isModalOpen = false;

          this.loadLevel(
            this.currentLevelNum
          );

        }
      );

    }


    const nextButton =
      document.getElementById(
        'btn-next-level'
      );

    if (nextButton) {

      nextButton.addEventListener(
        'click',
        () => {

          document
            .getElementById('victory-modal')
            .classList.add('hidden');

          this.isModalOpen = false;

          if (
            this.currentLevelNum <
            window.mazeManager.levels.length
          ) {

            this.loadLevel(
              this.currentLevelNum + 1
            );

          }

        }
      );

    }
  }


  /* ============================================================
     SETTINGS
     ============================================================ */

  applySettings() {

    const font =
      document.querySelector(
        'input[name="font-choice"]:checked'
      );

    const spacing =
      document.querySelector(
        'input[name="spacing-choice"]:checked'
      );

    const size =
      document.querySelector(
        'input[name="size-choice"]:checked'
      );

    const activeTheme =
      document.querySelector(
        '.theme-picker-btn.active'
      );

    const theme =
      activeTheme
        ? activeTheme.getAttribute(
            'data-theme'
          )
        : 'theme-cream';

    document.body.className = [
      theme,
      font ? font.value : 'font-lexend',
      spacing ? spacing.value : 'spacing-wide',
      size ? size.value : 'size-large'
    ].join(' ');
  }


  /* ============================================================
     MOVEMENT
     ============================================================ */

  movePlayer(dx, dy) {

    if (
      this.isModalOpen ||
      !this.levelData
    ) {
      return;
    }

    const targetX =
      this.playerPos.x + dx;

    const targetY =
      this.playerPos.y + dy;


    /* Batas */

    if (
      targetX < 0 ||
      targetX >= this.levelData.cols ||
      targetY < 0 ||
      targetY >= this.levelData.rows
    ) {
      return;
    }


    /* Tembok */

    if (
      this.levelData.grid[targetY][targetX]
      === 1
    ) {
      return;
    }


    /* Pindah */

    this.playerPos.x = targetX;
    this.playerPos.y = targetY;


    /* Checkpoint soal */

    const questionObj =
      this.levelData.questions.find(
        (q) =>
          q.x === targetX &&
          q.y === targetY &&
          !q.answered
      );


    if (questionObj) {
      this.triggerQuestion(
        questionObj
      );
    }


    /* Finish */

    if (
      targetX === this.levelData.finish.x &&
      targetY === this.levelData.finish.y
    ) {

      this.checkFinish();

    }


    this.render();
  }


  /* ============================================================
     SOAL
     ============================================================ */

  triggerQuestion(questionObj) {

    this.isModalOpen = true;

    this.activeQuestionObj =
      questionObj;

    this.activeQuestion =
      questionObj.data;


    const quizModal =
      document.getElementById(
        'quiz-modal'
      );

    const questionText =
      document.getElementById(
        'quiz-question-text'
      );

    const hintText =
      document.getElementById(
        'question-hint'
      );

    const optionsContainer =
      document.getElementById(
        'quiz-options'
      );

    const illustration =
      document.getElementById(
        'question-illustration'
      );

      const description =
  document.getElementById(
    'question-description'
  );

    const feedback =
      document.getElementById(
        'feedback-message'
      );


    if (!quizModal) return;


    /* Reset feedback */

    if (feedback) {
      feedback.className =
        'feedback-banner hidden';
    }


    /* Isi soal */

    if (illustration) {
      illustration.innerHTML =
        this.activeQuestion.illustration;
    }
    
if (description) {
  description.textContent =
    this.activeQuestion.description || '';
}
    if (questionText) {
      questionText.innerHTML =
        this.activeQuestion.questionText;
    }

    if (hintText) {
      hintText.textContent =
        this.activeQuestion.hintText;
    }


    /* Kategori soal */

    const modalTag =
      document.getElementById(
        'modal-tag-text'
      );

    if (modalTag) {

      switch (
        this.activeQuestion.category
      ) {

        case 'huruf_depan':
          modalTag.textContent =
            'Huruf Depan 📌';
          break;

        case 'melengkapi_huruf':
          modalTag.textContent =
            'Melengkapi Huruf 📝';
          break;

        case 'deteksi_huruf_kata':
          modalTag.textContent =
            'Deteksi Huruf 🔍';
          break;

        case 'diskriminasi_visual':
          modalTag.textContent =
            'Membedakan Huruf 👁️';
          break;

        case 'cari_vokal_konsonan':
          modalTag.textContent =
            'Vokal / Konsonan 🔤';
          break;

        default:
          modalTag.textContent =
            'Tantangan Huruf ❓';
      }

    }


    /* Pilihan jawaban */

    if (optionsContainer) {

      optionsContainer.innerHTML = '';

      this.activeQuestion.options
        .forEach((option) => {

          const button =
            document.createElement(
              'button'
            );

          button.className =
            'option-btn';

          button.innerHTML =
            `<span>${option.text}</span>`;

          button.addEventListener(
            'click',
            () => {

              this.handleAnswerSelect(
                option,
                button
              );

            }
          );

          optionsContainer.appendChild(
            button
          );

        });

    }


    quizModal.classList.remove(
      'hidden'
    );
  }


  /* ============================================================
     JAWABAN
     ============================================================ */

  handleAnswerSelect(
    option,
    buttonEl
  ) {

    const feedbackBanner =
      document.getElementById(
        'feedback-message'
      );

    const feedbackIcon =
      document.getElementById(
        'feedback-icon'
      );

    const feedbackText =
      document.getElementById(
        'feedback-text'
      );


    if (option.isCorrect) {

      /* BENAR */

      buttonEl.classList.add(
        'correct'
      );


      if (feedbackBanner) {
        feedbackBanner.className =
          'feedback-banner success';
      }

      if (feedbackIcon) {
        feedbackIcon.textContent =
          '🎉';
      }

      if (feedbackText) {
        feedbackText.textContent =
          'Tepat sekali! Hebat! ⭐';
      }


      /* Tandai sudah dijawab */

      if (this.activeQuestionObj) {

        this.activeQuestionObj.answered =
          true;

        this.answeredCount++;

        this.score += 10;

        this.updateHUDProgress();

      }


      /* Tutup soal */

      setTimeout(() => {

        const modal =
          document.getElementById(
            'quiz-modal'
          );

        if (modal) {
          modal.classList.add('hidden');
        }

        this.isModalOpen = false;

        this.render();

      }, 1200);


    } else {

      /* SALAH */

      buttonEl.classList.add(
        'incorrect'
      );


      if (feedbackBanner) {
        feedbackBanner.className =
          'feedback-banner retry';
      }

      if (feedbackIcon) {
        feedbackIcon.textContent =
          '😊';
      }

      if (feedbackText) {
        feedbackText.textContent =
          'Coba lagi! Kamu pasti bisa! 💪';
      }


      setTimeout(() => {

        buttonEl.classList.remove(
          'incorrect'
        );

      }, 600);

    }

  }


  /* ============================================================
     FINISH
     ============================================================ */

  checkFinish() {

    if (this.answeredCount >= 5) {

      this.triggerVictory();

    } else {

      const remaining =
        5 - this.answeredCount;

      this.showTextHint(
        `💡 Masih ada ${remaining} soal lagi. Yuk cari tanda tanya ❓ berikutnya!`
      );

    }

  }


  triggerVictory() {

    this.isModalOpen = true;

    const victoryModal =
      document.getElementById(
        'victory-modal'
      );

    if (victoryModal) {
      victoryModal.classList.remove(
        'hidden'
      );
    }

  }


  /* ============================================================
     TEXT HINT
     ============================================================ */

  showTextHint(message) {

    const existing =
      document.getElementById(
        'maze-text-hint'
      );

    if (existing) {
      existing.remove();
    }

    const hint =
      document.createElement('div');

    hint.id =
      'maze-text-hint';

    hint.textContent =
      message;

    hint.style.cssText = `
      position: fixed;
      left: 50%;
      bottom: 30px;
      transform: translateX(-50%);
      background: #FFF7D6;
      color: #7C4A03;
      border: 2px solid #F5C542;
      border-radius: 16px;
      padding: 14px 20px;
      font-weight: 700;
      z-index: 2000;
      max-width: 90%;
      text-align: center;
      box-shadow: 0 6px 18px rgba(0,0,0,.15);
    `;

    document.body.appendChild(hint);

    setTimeout(() => {
      hint.remove();
    }, 2500);
  }


  /* ============================================================
     RENDER MAZE
     ============================================================ */

  render() {

    if (!this.levelData) return;

    const cols =
      this.levelData.cols;

    const rows =
      this.levelData.rows;

    const ts =
      this.tileSize;


    this.ctx.clearRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );


    const styles =
      getComputedStyle(
        document.body
      );

    const wallColor =
      styles
        .getPropertyValue(
          '--wall-color'
        )
        .trim() ||
      '#334155';

    const pathColor =
      styles
        .getPropertyValue(
          '--path-color'
        )
        .trim() ||
      '#F1F5F9';


    /* Tembok + Jalan */

    for (
      let r = 0;
      r < rows;
      r++
    ) {

      for (
        let c = 0;
        c < cols;
        c++
      ) {

        const x =
          c * ts;

        const y =
          r * ts;


        if (
          this.levelData.grid[r][c]
          === 1
        ) {

          this.ctx.fillStyle =
            wallColor;

          this.ctx.fillRect(
            x,
            y,
            ts,
            ts
          );

          this.ctx.fillStyle =
            'rgba(0,0,0,.15)';

          this.ctx.fillRect(
            x,
            y + ts - 4,
            ts,
            4
          );

        } else {

          this.ctx.fillStyle =
            pathColor;

          this.ctx.fillRect(
            x,
            y,
            ts,
            ts
          );

          this.ctx.strokeStyle =
            'rgba(0,0,0,.04)';

          this.ctx.strokeRect(
            x,
            y,
            ts,
            ts
          );

        }

      }

    }


    /* Start */

    const startX =
      this.levelData.start.x *
      ts;

    const startY =
      this.levelData.start.y *
      ts;

    this.ctx.fillStyle =
      '#D1FAE5';

    this.ctx.fillRect(
      startX,
      startY,
      ts,
      ts
    );

    this.ctx.font =
      `${ts * .55}px sans-serif`;

    this.ctx.textAlign =
      'center';

    this.ctx.textBaseline =
      'middle';

    this.ctx.fillText(
      '🟢',
      startX + ts / 2,
      startY + ts / 2
    );


    /* Finish */

    const finishX =
      this.levelData.finish.x *
      ts;

    const finishY =
      this.levelData.finish.y *
      ts;

    this.ctx.fillStyle =
      '#FEF3C7';

    this.ctx.fillRect(
      finishX,
      finishY,
      ts,
      ts
    );

    this.ctx.fillText(
      '🏆',
      finishX + ts / 2,
      finishY + ts / 2
    );


    /* Checkpoint soal */

    this.levelData.questions
      .forEach((question) => {

        const qx =
          question.x * ts;

        const qy =
          question.y * ts;


        if (question.answered) {

          this.ctx.font =
            `${ts * .65}px sans-serif`;

          this.ctx.fillText(
            '⭐',
            qx + ts / 2,
            qy + ts / 2
          );

        } else {

          this.ctx.fillStyle =
            '#EEF2FF';

          this.ctx.beginPath();

          this.ctx.roundRect(
            qx + 4,
            qy + 4,
            ts - 8,
            ts - 8,
            8
          );

          this.ctx.fill();

          this.ctx.strokeStyle =
            '#4F46E5';

          this.ctx.lineWidth = 2;

          this.ctx.stroke();

          this.ctx.font =
            `${ts * .65}px sans-serif`;

          this.ctx.fillText(
            '❓',
            qx + ts / 2,
            qy + ts / 2
          );

        }

      });


    /* Player */

    const px =
      this.playerPos.x * ts;

    const py =
      this.playerPos.y * ts;


    this.ctx.fillStyle =
      'rgba(79,70,229,.2)';

    this.ctx.beginPath();

    this.ctx.arc(
      px + ts / 2,
      py + ts / 2,
      ts * .45,
      0,
      Math.PI * 2
    );

    this.ctx.fill();


    this.ctx.font =
      `${ts * .75}px sans-serif`;

    this.ctx.fillText(
      this.characterEmoji,
      px + ts / 2,
      py + ts / 2 + 2
    );

  }


  /* ============================================================
     GAME LOOP
     ============================================================ */

  gameLoop() {

    this.render();

    requestAnimationFrame(
      () => this.gameLoop()
    );

  }

}


/* ==============================================================
   START
   ============================================================== */

window.addEventListener(
  'DOMContentLoaded',
  () => {

    window.gameEngine =
      new GameEngine();

  }
);