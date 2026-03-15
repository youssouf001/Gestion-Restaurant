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

// ================ Témoignages =======================
document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("testimonialsTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const indicators = document.querySelectorAll(".indicator");

  if (!track) return; // Si pas de slider sur la page, on sort

  let currentIndex = 0;
  const cards = document.querySelectorAll(".testimonials-card");
  const totalCards = cards.length;

  // Nombre de cards visibles selon la taille d'écran
  function getVisibleCards() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 991) return 2;
    return 3;
  }

  let visibleCards = getVisibleCards();
  const maxIndex = Math.max(0, totalCards - visibleCards);

  // Fonction pour mettre à jour le slider
  function updateSlider() {
    const cardWidth = cards[0].offsetWidth;
    const gap = 30; // Gap entre les cards
    const offset = -(currentIndex * (cardWidth + gap));
    track.style.transform = `translateX(${offset}px)`;

    // Mettre à jour les indicateurs
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentIndex);
    });

    // Désactiver les boutons aux extrémités
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;

    prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
    nextBtn.style.opacity = currentIndex >= maxIndex ? "0.5" : "1";
  }

  // Bouton précédent
  prevBtn.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  // Bouton suivant
  nextBtn.addEventListener("click", function () {
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSlider();
    }
  });

  // Clic sur les indicateurs
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", function () {
      if (index <= maxIndex) {
        currentIndex = index;
        updateSlider();
      }
    });
  });

  // Responsive : recalculer au redimensionnement
  window.addEventListener("resize", function () {
    const newVisibleCards = getVisibleCards();
    if (newVisibleCards !== visibleCards) {
      visibleCards = newVisibleCards;
      currentIndex = Math.min(currentIndex, totalCards - visibleCards);
      updateSlider();
    }
  });

  // Auto-play (optionnel - décommenter pour activer)

  let autoplayInterval = setInterval(function () {
    if (currentIndex >= maxIndex) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    updateSlider();
  }, 5000); // Change toutes les 5 secondes

  // Pause au hover
  track.addEventListener("mouseenter", function () {
    clearInterval(autoplayInterval);
  });

  track.addEventListener("mouseleave", function () {
    autoplayInterval = setInterval(function () {
      if (currentIndex >= maxIndex) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
      updateSlider();
    }, 5000);
  });

  // Initialiser
  updateSlider();
});
