// js/auth.js
// Sistem Autentikasi Sahabat Disleksia

// --- KONFIGURASI KREDENSIAL LOGIN ---
const VALID_USER = "admin";
const VALID_PASS = "PKM2026";

// Kunci penyimpanan sesi & konfigurasi batas waktu 24 jam
const AUTH_KEY = "isLoggedIn";
const USER_KEY = "currentUser";
const AUTH_TIME_KEY = "authLoginTime";
const AUTH_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 Jam (86.400.000 milidetik)

/**
 * Menghapus seluruh data sesi login
 */
function clearAuthSession() {
  try {
    sessionStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(AUTH_TIME_KEY);
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(AUTH_TIME_KEY);
  } catch (e) {
    console.error("Gagal membersihkan sesi login:", e);
  }
}

/**
 * Memeriksa apakah pengguna sudah login dan sesinya masih aktif (< 24 jam)
 * @returns {boolean}
 */
function isAuthenticated() {
  try {
    const isSessionAuth = sessionStorage.getItem(AUTH_KEY) === "true";
    const isLocalAuth = localStorage.getItem(AUTH_KEY) === "true";

    // Jika belum ada status login
    if (!isSessionAuth && !isLocalAuth) {
      return false;
    }

    // Ambil timestamp waktu login
    const loginTimeStr = localStorage.getItem(AUTH_TIME_KEY) || sessionStorage.getItem(AUTH_TIME_KEY);
    if (!loginTimeStr) {
      // Sesi tanpa catatan waktu dianggap kadaluarsa
      clearAuthSession();
      return false;
    }

    const loginTime = parseInt(loginTimeStr, 10);
    const now = Date.now();

    // Validasi apakah waktu login sudah melewati batas 24 jam atau waktu tidak valid
    if (isNaN(loginTime) || (now - loginTime > AUTH_EXPIRY_MS) || (now < loginTime)) {
      clearAuthSession();
      return false;
    }

    // Sinkronisasi sessionStorage jika membuka tab baru dari localStorage yang sah
    if (!isSessionAuth && isLocalAuth) {
      sessionStorage.setItem(AUTH_KEY, "true");
      sessionStorage.setItem(AUTH_TIME_KEY, loginTimeStr);
      const user = localStorage.getItem(USER_KEY);
      if (user) sessionStorage.setItem(USER_KEY, user);
    }

    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Mendapatkan sisa masa aktif sesi login
 * @returns {{hours: number, minutes: number, expired: boolean}}
 */
function getRemainingSessionTime() {
  const loginTimeStr = localStorage.getItem(AUTH_TIME_KEY) || sessionStorage.getItem(AUTH_TIME_KEY);
  if (!loginTimeStr) return { hours: 0, minutes: 0, expired: true };
  const loginTime = parseInt(loginTimeStr, 10);
  const remainingMs = (loginTime + AUTH_EXPIRY_MS) - Date.now();
  if (remainingMs <= 0) return { hours: 0, minutes: 0, expired: true };

  const hours = Math.floor(remainingMs / (1000 * 60 * 60));
  const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
  return { hours, minutes, expired: false };
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
 * Jika belum login / expired, redirect ke login.html
 */
function requireAuth() {
  const page = window.location.pathname.split("/").pop().toLowerCase();
  if (!isAuthenticated() && page !== "login.html") {
    window.location.replace("login.html?expired=1");
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

    const loginTimestamp = Date.now().toString();

    // Simpan status login & timestamp aktif 24 jam di sessionStorage & localStorage
    sessionStorage.setItem(AUTH_KEY, "true");
    sessionStorage.setItem(USER_KEY, JSON.stringify(userData));
    sessionStorage.setItem(AUTH_TIME_KEY, loginTimestamp);

    localStorage.setItem(AUTH_KEY, "true");
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    localStorage.setItem(AUTH_TIME_KEY, loginTimestamp);

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
 * Menangani logout pengguna secara manual
 */
function logoutUser() {
  clearAuthSession();
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
    // Jika masih dalam masa login aktif 24 jam, langsung diarahkan ke index.html
    if (isAuthenticated()) {
      window.location.replace("index.html");
    }
  } else {
    // Jika belum login atau sesi 24 jam telah habis, alihkan ke login.html
    if (!isAuthenticated()) {
      window.location.replace("login.html");
    }
  }
})();

// Penanganan notifikasi expired pada halaman login dan auto-check berkala
document.addEventListener("DOMContentLoaded", () => {
  const page = window.location.pathname.split("/").pop().toLowerCase();

  if (page === "login.html") {
    const params = new URLSearchParams(window.location.search);
    if (params.get("expired") === "1") {
      const alertBox = document.getElementById("loginAlert");
      if (alertBox) {
        alertBox.className = "alert-message alert-warning";
        alertBox.textContent = "⏱️ Sesi login Anda telah berakhir (24 jam). Silakan masuk kembali.";
        alertBox.style.display = "block";
      }
    }
  } else {
    // Pengecekan otomatis saat halaman tetap terbuka (tiap 1 menit) & saat tab kembali aktif
    setInterval(() => {
      if (!isAuthenticated()) {
        window.location.replace("login.html?expired=1");
      }
    }, 60000);

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && !isAuthenticated()) {
        window.location.replace("login.html?expired=1");
      }
    });
  }
});