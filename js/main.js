/* ----------------------------------------------------
   SAHABAT DISLEKSIA - UTILITAS & FITUR AKSESIBILITAS
---------------------------------------------------- */

// Web Speech API - Text To Speech (TTS)
let currentSpeechRate = 0.85; // Kecepatan suara disesuaikan untuk disleksia (agak lambat & jelas)

function speakText(text) {
  if (!('speechSynthesis' in window)) {
    alert('Maaf, peramban Anda tidak mendukung fitur suarakan teks.');
    return;
  }

  // Hentikan suara yang sedang berjalan jika ada
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'id-ID';
  utterance.rate = currentSpeechRate;
  utterance.pitch = 1.1; // Nada bersahabat

  window.speechSynthesis.speak(utterance);
}

// Toggle Font Khusus Disleksia
function toggleDyslexicFont() {
  document.body.classList.toggle('font-dyslexic');
  const isDyslexic = document.body.classList.contains('font-dyslexic');
  localStorage.setItem('dyslexicFontEnabled', isDyslexic);
  
  const btn = document.getElementById('btnToggleFont');
  if (btn) {
    btn.classList.toggle('active', isDyslexic);
    btn.innerHTML = isDyslexic ? '🔤 Font Standar' : '🔤 Font Disleksia';
  }
}

// Pengaturan Ukuran Teks
let currentFontSizeLevel = 0; // -1, 0, 1, 2
function changeFontSize(delta) {
  const newLevel = currentFontSizeLevel + delta;
  if (newLevel < -1 || newLevel > 2) return;
  
  currentFontSizeLevel = newLevel;
  const baseSize = 100 + (currentFontSizeLevel * 10);
  document.documentElement.style.fontSize = `${baseSize}%`;
}

// Suara Efek Sederhana dengan Web Audio API
function playSoundEffect(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === 'correct') {
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } else if (type === 'click') {
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === 'wrong') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.setValueAtTime(180, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch (e) {
    // AudioContext fallback ignored
  }
}

// Inisialisasi Aksesibilitas dan Menu Mobile
document.addEventListener('DOMContentLoaded', () => {
  // Cek mode font disleksia tersimpan
  const savedFont = localStorage.getItem('dyslexicFontEnabled');
  if (savedFont === 'true') {
    document.body.classList.add('font-dyslexic');
    const btn = document.getElementById('btnToggleFont');
    if (btn) {
      btn.classList.add('active');
      btn.innerHTML = '🔤 Font Standar';
    }
  }

  // Toggle Menu Mobile
  const menuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  // Pasang pembaca audio otomatis untuk elemen bertanda data-speech
  document.querySelectorAll('[data-speech]').forEach(element => {
    element.addEventListener('click', (e) => {
      // Cegah bentrok jika klik tombol lain
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;
      const text = element.getAttribute('data-speech') || element.innerText;
      speakText(text);
    });
  });
});
