import { auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

function initAuthUI() {
  const loginLink = document.getElementById("loginLink");
  const profileMenu = document.getElementById("profileMenu");
  const profileCircle = document.getElementById("profileCircle");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const logoutBtn = document.getElementById("logoutBtn");

  if (!loginLink) return; // navbar not loaded yet

  onAuthStateChanged(auth, (user) => {
    if (user) {
      loginLink.classList.add("hidden");
      profileMenu.classList.remove("hidden");
      profileCircle.textContent = user.email.charAt(0).toUpperCase();
    } else {
      loginLink.classList.remove("hidden");
      profileMenu.classList.add("hidden");
    }
  });

  profileCircle.addEventListener("click", () => {
    dropdownMenu.classList.toggle("hidden");
  });

  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "index.html";
  });
}

// Wait until full page is loaded
window.addEventListener("load", () => {
  setTimeout(initAuthUI, 300); // small delay to ensure navbar injected
});
