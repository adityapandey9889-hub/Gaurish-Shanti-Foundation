document.addEventListener("DOMContentLoaded", function () {

  fetch("navbar.html")
    .then(response => response.text())
    .then(data => {

      document.getElementById("navbar-placeholder").innerHTML = data;

      // Now elements exist
      const hamburger = document.getElementById("hamburger");
      const navLinks = document.getElementById("nav-links");

      hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("active");
      });

    });

});
