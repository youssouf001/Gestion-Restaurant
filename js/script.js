// Activation du lien
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section[id], header[id]");
  const navLinks = document.querySelectorAll(".nav-link[href^='#']");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
});
//============ Validation du formulaire =====================
(function () {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");

  forms.forEach((form) => {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        event.stopPropagation();

        Swal.fire({
          icon: "error",
          title: "Formulaire incomplet",
          text: "Veuillez remplir correctement tous les champs.",
          confirmButtonColor: "#b87333",
        });

        form.classList.add("was-validated");
        return;
      }

      // popup de confirmation
      Swal.fire({
        icon: "success",
        title: "Réservation confirmée !",
        text: "Nous vous contacterons très bientôt.",
        confirmButtonColor: "#b87333",
        confirmButtonText: "OK",
      });

      form.reset();
      form.classList.remove("was-validated");
    });
  });
})();
