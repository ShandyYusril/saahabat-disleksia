// js/auth.js
// Sistem Autentikasi Sahabat Disleksia

// --- KONFIGURASI KREDENSIAL LOGIN ---
const VALID_USER = "admin";
const VALID_PASS = "PKM2026";

// Kunci penyimpanan sesi
const AUTH_KEY = "isLoggedIn";
const USER_KEY = "currentUser";

/**
 * Memeriksa apakah pengguna sudah login
 * @returns {boolean}
 */
function isAuthenticated() {
  const sessionAuth = sessionStorage.getItem(AUTH_KEY);
  const localAuth = localStorage.getItem(AUTH_KEY);
  return sessionAuth === "true" || localAuth === "true";
}

/**
 * Mendapatkan data pengguna yang sedang login
 * @returns {object|null}
 */
function getCurrentUser() {
  if (!isAuthenticated()) return null;
  const userJson = sessionStorage.getItem(USER_KEY) || localStorage.getItem(USER_KEY);
  if (userJson) {
    try {
      return JSON.parse(userJson);
    } catch (e) {
      // Fallback jika parsing gagal
    }
  }
  return {
    username: VALID_USER,
    name: "Administrator",
    role: "Guru / Pendamping"
  };
}

/**
 * Memeriksa autentikasi untuk memproteksi halaman
 * Jika belum login, redirect ke login.html
 */
function requireAuth() {
  const page = window.location.pathname.split("/").pop().toLowerCase();
  if (!isAuthenticated() && page !== "login.html") {
    window.location.replace("login.html");
  }
}

/**
 * Menangani form submit login
 * @param {Event} event 
 */
function handleLogin(event) {
  if (event) event.preventDefault();

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const alertBox = document.getElementById("loginAlert");

  const username = usernameInput ? usernameInput.value.trim() : "";
  const password = passwordInput ? passwordInput.value : "";

  if (username === VALID_USER && password === VALID_PASS) {
    const userData = {
      username: VALID_USER,
      name: "Administrator",
      role: "Guru / Pendamping"
    };

    // Simpan status login di sessionStorage & localStorage
    sessionStorage.setItem(AUTH_KEY, "true");
    sessionStorage.setItem(USER_KEY, JSON.stringify(userData));
    localStorage.setItem(AUTH_KEY, "true");
    localStorage.setItem(USER_KEY, JSON.stringify(userData));

    if (alertBox) {
      alertBox.className = "alert-message alert-info";
      alertBox.textContent = "Login berhasil! Mengalihkan ke beranda...";
      alertBox.style.display = "block";
    }

    // Arahkan ke beranda
    window.location.href = "index.html";
  } else {
    if (alertBox) {
      alertBox.className = "alert-message alert-error";
      alertBox.textContent = "Username atau password salah! Silakan coba lagi.";
      alertBox.style.display = "block";
    } else {
      alert("Username atau password salah!");
    }

    if (passwordInput) {
      passwordInput.value = "";
      passwordInput.focus();
    }
  }
}

/**
 * Menangani logout pengguna
 */
function logoutUser() {
  sessionStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem(USER_KEY);
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(USER_KEY);
  window.location.replace("login.html");
}

// Alias untuk handleLogout
function handleLogout() {
  logoutUser();
}

// Jalankan pengecekan otomatis saat file auth.js pertama kali dimuat
(function runAuthGate() {
  const page = window.location.pathname.split("/").pop().toLowerCase();

  if (page === "login.html") {
    // Jika sudah login tetapi membuka login.html, arahkan langsung ke index.html
    if (isAuthenticated()) {
      window.location.replace("index.html");
    }
  } else {
    // Jika belum login dan mengakses halaman selain login.html, lempar ke login.html
    if (!isAuthenticated()) {
      window.location.replace("login.html");
    }
  }
})();