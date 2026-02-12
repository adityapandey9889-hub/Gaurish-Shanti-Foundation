const form = document.getElementById("contactForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", function(e){
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobile = document.getElementById("mobile").value.trim();

  if(mobile.length !== 10 || isNaN(mobile)){
    message.style.color = "red";
    message.textContent = "Please enter a valid 10-digit mobile number.";
    return;
  }

  message.style.color = "green";
  message.textContent = "Your message has been sent successfully!";

  form.reset();
});
