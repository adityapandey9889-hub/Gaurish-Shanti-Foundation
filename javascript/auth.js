const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

loginBtn.addEventListener("click", () => {
  loginBtn.classList.add("active");
  signupBtn.classList.remove("active");

  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
});

signupBtn.addEventListener("click", () => {
  signupBtn.classList.add("active");
  loginBtn.classList.remove("active");

  signupForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
});
