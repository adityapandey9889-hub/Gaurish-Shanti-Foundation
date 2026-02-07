const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", e => {
    e.preventDefault();

    status.textContent = "Sending your message...";
    setTimeout(() => {
        status.textContent = "✅ Thank you! We’ll get back to you soon.";
        form.reset();
    }, 1200);
});
