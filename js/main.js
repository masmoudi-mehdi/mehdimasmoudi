// main.js - Script pour le portfolio professionnel de Mehdi Masmoudi
// Version corrigée pour résoudre les bugs d'animation et ajouter le support multilingue

// Fonction pour gérer le changement de langue
function switchLanguage(lang) {
  localStorage.setItem("language", lang);

  // Déterminer la page actuelle
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split("/").pop();

  // Rediriger vers la version correspondante dans la langue choisie
  if (
    currentPage === "index.html" ||
    currentPage === "index_en.html" ||
    currentPage === ""
  ) {
    window.location.href = lang === "fr" ? "index.html" : "index_en.html";
  } else if (
    currentPage === "portfolio.html" ||
    currentPage === "portfolio_en.html"
  ) {
    window.location.href =
      lang === "fr" ? "portfolio.html" : "portfolio_en.html";
  } else if (currentPath.includes("/blog/")) {
    // Pour les pages du blog
    if (currentPage === "index.html" || currentPage === "index_en.html") {
      window.location.href = lang === "fr" ? "index.html" : "index_en.html";
    } else {
      // Pour les articles de blog individuels (à implémenter plus tard)
      const baseName = currentPage.replace("_en", "");
      window.location.href =
        lang === "fr" ? baseName : baseName.replace(".html", "_en.html");
    }
  } else {
    // Pour toute autre page, revenir à la page d'accueil dans la langue choisie
    window.location.href = lang === "fr" ? "index.html" : "index_en.html";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Mettre à jour les boutons de langue
  const langButtons = document.querySelectorAll(".language-switch .lang-btn");
  if (langButtons.length) {
    langButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const lang = this.textContent.trim().toLowerCase();
        switchLanguage(lang === "fr" ? "fr" : "en");
      });
    });
  }

  // Vérifier la langue préférée pour toutes les pages
  const savedLanguage = localStorage.getItem("language");
  if (savedLanguage) {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split("/").pop();

    // Vérifier le type de page
    const isIndexPage =
      currentPage === "" ||
      currentPage === "index.html" ||
      currentPage === "index_en.html";
    const isPortfolioPage =
      currentPage === "portfolio.html" || currentPage === "portfolio_en.html";
    const isBlogIndexPage =
      currentPath.includes("/blog/") &&
      (currentPage === "index.html" || currentPage === "index_en.html");

    // Rediriger vers la version correspondante dans la langue préférée
    if (isIndexPage) {
      const shouldBeOnEnglish =
        savedLanguage === "en" && currentPage !== "index_en.html";
      const shouldBeOnFrench =
        savedLanguage === "fr" && currentPage !== "index.html";

      if (shouldBeOnEnglish) {
        window.location.href = "index_en.html";
        return; // Arrêter l'exécution car la page va être rechargée
      } else if (shouldBeOnFrench) {
        window.location.href = "index.html";
        return; // Arrêter l'exécution car la page va être rechargée
      }
    } else if (isPortfolioPage) {
      const shouldBeOnEnglish =
        savedLanguage === "en" && currentPage !== "portfolio_en.html";
      const shouldBeOnFrench =
        savedLanguage === "fr" && currentPage !== "portfolio.html";

      if (shouldBeOnEnglish) {
        window.location.href = "portfolio_en.html";
        return; // Arrêter l'exécution car la page va être rechargée
      } else if (shouldBeOnFrench) {
        window.location.href = "portfolio.html";
        return; // Arrêter l'exécution car la page va être rechargée
      }
    } else if (isBlogIndexPage) {
      const shouldBeOnEnglish =
        savedLanguage === "en" && currentPage !== "index_en.html";
      const shouldBeOnFrench =
        savedLanguage === "fr" && currentPage !== "index.html";

      if (shouldBeOnEnglish) {
        window.location.href = "index_en.html";
        return; // Arrêter l'exécution car la page va être rechargée
      } else if (shouldBeOnFrench) {
        window.location.href = "index.html";
        return; // Arrêter l'exécution car la page va être rechargée
      }
    }
  }

  // Variables
  const themeSwitch = document.querySelector(".theme-switch");
  const mobileMenu = document.querySelector(".mobile-menu");
  const navMenu = document.querySelector("nav ul");
  const navLinks = document.querySelectorAll("nav ul li a");
  const scrollTopBtn = document.querySelector(".scroll-top");
  const sections = document.querySelectorAll("section");
  const skillBars = document.querySelectorAll(".skill-progress");
  const contactForm = document.getElementById("contactForm");

  // Fonction pour l'animation de texte
  const typedTextSpan = document.querySelector(".typed-text");
  const cursorSpan = document.querySelector(".cursor");
  const textArray = [
    "Full Stack Developer",
    "Data Specialist",
    "Automation Expert",
  ];
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000;
  let textArrayIndex = 0;
  let charIndex = 0;

  // Fonction pour l'animation de texte
  function type() {
    if (typedTextSpan && cursorSpan) {
      if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing"))
          cursorSpan.classList.add("typing");
        typedTextSpan.textContent +=
          textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
      } else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
      }
    }
  }

  function erase() {
    if (typedTextSpan && cursorSpan) {
      if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing"))
          cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(
          0,
          charIndex - 1
        );
        charIndex--;
        setTimeout(erase, erasingDelay);
      } else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
      }
    }
  }

  // Démarrer l'animation de texte
  if (typedTextSpan && cursorSpan && textArray.length) {
    setTimeout(type, newTextDelay + 250);
  }

  // Changement de thème (clair/sombre)
  if (themeSwitch) {
    themeSwitch.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");

      // Changer l'icône
      const icon = themeSwitch.querySelector("i");
      if (icon) {
        if (document.body.classList.contains("dark-theme")) {
          icon.classList.remove("fa-moon");
          icon.classList.add("fa-sun");
          localStorage.setItem("theme", "dark");

          // Basculer les logos pour le thème sombre (logo noir)
          document.querySelectorAll(".logo-light").forEach((logo) => {
            logo.style.display = "none";
          });
          document.querySelectorAll(".logo-dark").forEach((logo) => {
            logo.style.display = "block";
            // Réinitialiser l'animation à chaque changement de thème
            logo.style.animation = "none";
            setTimeout(() => {
              logo.style.animation = "logoAppear 0.5s ease-in-out";
            }, 10);
          });
        } else {
          icon.classList.remove("fa-sun");
          icon.classList.add("fa-moon");
          localStorage.setItem("theme", "light");

          // Basculer les logos pour le thème clair (logo blanc)
          document.querySelectorAll(".logo-light").forEach((logo) => {
            logo.style.display = "block";
          });
          document.querySelectorAll(".logo-dark").forEach((logo) => {
            logo.style.display = "none";
          });
        }
      }
    });
  }

  // Vérifier le thème enregistré
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" && themeSwitch) {
    document.body.classList.add("dark-theme");
    const icon = themeSwitch.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    }

    // Initialiser les logos pour le thème sombre (logo noir)
    document.querySelectorAll(".logo-light").forEach((logo) => {
      logo.style.display = "none";
    });
    document.querySelectorAll(".logo-dark").forEach((logo) => {
      logo.style.display = "block";
      // Appliquer l'animation au chargement initial
      logo.style.animation = "logoAppear 0.5s ease-in-out";
    });
  } else {
    // Initialiser les logos pour le thème clair (logo blanc)
    document.querySelectorAll(".logo-light").forEach((logo) => {
      logo.style.display = "block";
    });
    document.querySelectorAll(".logo-dark").forEach((logo) => {
      logo.style.display = "none";
    });
  }

  // Menu mobile amélioré
  if (mobileMenu && navMenu) {
    // Ajouter des indices aux éléments du menu pour l'animation en cascade
    const menuItems = navMenu.querySelectorAll("li");
    menuItems.forEach((item, index) => {
      item.style.setProperty("--item-index", index);
    });

    // Gérer le clic sur le bouton du menu
    mobileMenu.addEventListener("click", () => {
      // Basculer la classe active pour le menu
      navMenu.classList.toggle("active");

      // Changer l'icône du bouton
      const icon = mobileMenu.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
      }

      // Mettre à jour l'attribut aria-expanded pour l'accessibilité
      const isExpanded = navMenu.classList.contains("active");
      mobileMenu.setAttribute("aria-expanded", isExpanded);

      // Empêcher le défilement du body quand le menu est ouvert
      document.body.style.overflow = isExpanded ? "hidden" : "";

      // Ajouter une classe au body pour indiquer que le menu est ouvert
      document.body.classList.toggle("menu-open", isExpanded);
    });

    // Fermer le menu mobile lorsqu'on clique en dehors
    document.addEventListener("click", (e) => {
      if (
        navMenu.classList.contains("active") &&
        !navMenu.contains(e.target) &&
        !mobileMenu.contains(e.target)
      ) {
        // Fermer le menu
        navMenu.classList.remove("active");

        // Rétablir l'icône du bouton
        const icon = mobileMenu.querySelector("i");
        if (icon) {
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-times");
        }

        // Mettre à jour l'attribut aria-expanded
        mobileMenu.setAttribute("aria-expanded", "false");

        // Rétablir le défilement du body
        document.body.style.overflow = "";

        // Retirer la classe du body
        document.body.classList.remove("menu-open");
      }
    });

    // Fermer le menu avec la touche Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("active")) {
        // Fermer le menu
        navMenu.classList.remove("active");

        // Rétablir l'icône du bouton
        const icon = mobileMenu.querySelector("i");
        if (icon) {
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-times");
        }

        // Mettre à jour l'attribut aria-expanded
        mobileMenu.setAttribute("aria-expanded", "false");

        // Rétablir le défilement du body
        document.body.style.overflow = "";

        // Retirer la classe du body
        document.body.classList.remove("menu-open");
      }
    });
  }

  // Fermer le menu mobile lors du clic sur un lien
  if (navLinks && navMenu && mobileMenu) {
    navLinks.forEach((link) => {
      if (!link.classList.contains("dropbtn")) {
        // Ajouter un effet de retour tactile pour tous les liens
        link.addEventListener(
          "touchstart",
          function () {
            this.classList.add("touch-active");
          },
          { passive: true }
        );

        link.addEventListener(
          "touchend",
          function () {
            this.classList.remove("touch-active");
          },
          { passive: true }
        );

        // Gérer le clic sur les liens
        link.addEventListener("click", (e) => {
          // Fermer le menu mobile pour tous les liens
          if (window.innerWidth <= 768) {
            navMenu.classList.remove("active");
            const icon = mobileMenu.querySelector("i");
            if (icon) {
              icon.classList.add("fa-bars");
              icon.classList.remove("fa-times");
            }
            mobileMenu.setAttribute("aria-expanded", "false");
            document.body.style.overflow = "";
            document.body.classList.remove("menu-open");

            // Ajouter un délai pour les liens d'ancrage pour permettre au menu de se fermer d'abord
            const href = link.getAttribute("href");
            if (href && href.startsWith("#") && href.length > 1) {
              const targetElement = document.querySelector(href);
              if (targetElement) {
                e.preventDefault();
                setTimeout(() => {
                  targetElement.scrollIntoView({ behavior: "smooth" });
                }, 300);
              }
            }
          }
        });
      }
    });
  }

  // Gérer le menu déroulant sur mobile avec animations améliorées et accessibilité
  const dropdownBtns = document.querySelectorAll(".dropbtn");
  if (dropdownBtns.length) {
    // Ajouter des IDs uniques aux menus déroulants s'ils n'en ont pas déjà
    document.querySelectorAll(".dropdown-content").forEach((content, index) => {
      if (!content.id) {
        content.id = `dropdown-content-${index}`;
      }
    });

    dropdownBtns.forEach((btn) => {
      // Trouver le contenu du menu déroulant associé
      const dropdown = btn.parentElement;
      const dropdownContent = dropdown.querySelector(".dropdown-content");

      // Ajouter aria-controls si le contenu a un ID
      if (dropdownContent && dropdownContent.id) {
        btn.setAttribute("aria-controls", dropdownContent.id);
      }

      // Initialiser aria-expanded
      btn.setAttribute("aria-expanded", "false");

      // Ajouter un effet de retour tactile
      btn.addEventListener(
        "touchstart",
        function () {
          if (window.innerWidth <= 768) {
            this.classList.add("touch-active");
          }
        },
        { passive: true }
      );

      btn.addEventListener(
        "touchend",
        function () {
          if (window.innerWidth <= 768) {
            this.classList.remove("touch-active");
          }
        },
        { passive: true }
      );

      // Gérer le clic sur le bouton du dropdown
      btn.addEventListener("click", (e) => {
        // Vérifier si on est sur mobile
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const dropdown = btn.parentElement;

          // Fermer tous les autres dropdowns avec animation
          document.querySelectorAll(".dropdown").forEach((item) => {
            if (item !== dropdown && item.classList.contains("active")) {
              // Animer la fermeture
              const dropdownContent = item.querySelector(".dropdown-content");
              const dropdownBtn = item.querySelector(".dropbtn");

              if (dropdownContent) {
                dropdownContent.style.opacity = "0";
                setTimeout(() => {
                  item.classList.remove("active");
                  // Mettre à jour aria-expanded
                  if (dropdownBtn) {
                    dropdownBtn.setAttribute("aria-expanded", "false");
                  }
                }, 300);
              } else {
                item.classList.remove("active");
                // Mettre à jour aria-expanded
                if (dropdownBtn) {
                  dropdownBtn.setAttribute("aria-expanded", "false");
                }
              }
            }
          });

          // Basculer l'état du dropdown actuel avec animation
          const isExpanded = dropdown.classList.contains("active");

          if (isExpanded) {
            // Animation de fermeture
            const dropdownContent = dropdown.querySelector(".dropdown-content");
            if (dropdownContent) {
              dropdownContent.style.opacity = "0";
              setTimeout(() => {
                dropdown.classList.remove("active");
                // Mettre à jour aria-expanded
                btn.setAttribute("aria-expanded", "false");
              }, 300);
            } else {
              dropdown.classList.remove("active");
              // Mettre à jour aria-expanded
              btn.setAttribute("aria-expanded", "false");
            }
          } else {
            // Animation d'ouverture
            dropdown.classList.add("active");
            // Mettre à jour aria-expanded
            btn.setAttribute("aria-expanded", "true");

            const dropdownContent = dropdown.querySelector(".dropdown-content");
            if (dropdownContent) {
              // Réinitialiser l'opacité pour l'animation
              dropdownContent.style.opacity = "0";
              setTimeout(() => {
                dropdownContent.style.opacity = "1";
              }, 10);
            }
          }
        }
      });

      // Ajouter la gestion du clavier pour l'accessibilité
      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          btn.click();
        } else if (e.key === "Escape") {
          const dropdown = btn.parentElement;
          if (dropdown.classList.contains("active")) {
            dropdown.classList.remove("active");
            btn.setAttribute("aria-expanded", "false");
          }
        }
      });
    });
  }

  // Fonction pour gérer le défilement
  function handleScroll() {
    // Bouton de retour en haut
    if (scrollTopBtn) {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add("active");
      } else {
        scrollTopBtn.classList.remove("active");
      }
    }

    // Navigation active selon la section
    if (sections && navLinks) {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        const href = link.getAttribute("href");
        if (href && href.startsWith("#") && href.substring(1) === current) {
          link.classList.add("active");

          // Si le lien actif est dans un menu déroulant, mettre également en surbrillance le bouton parent
          const parentDropdown = link.closest(".dropdown-content");
          if (parentDropdown) {
            const dropdownBtn = parentDropdown.previousElementSibling;
            if (dropdownBtn && dropdownBtn.classList.contains("dropbtn")) {
              dropdownBtn.classList.add("active");
            }
          }
        }
      });
    }

    // Animation des barres de compétences
    if (skillBars) {
      skillBars.forEach((bar) => {
        const barTop = bar.getBoundingClientRect().top;
        if (
          barTop < window.innerHeight - 100 &&
          !bar.classList.contains("animated")
        ) {
          // Stocker la largeur originale depuis l'attribut style
          const width = bar.style.width;
          // Réinitialiser la largeur
          bar.style.width = "0";
          // Marquer comme animé
          bar.classList.add("animated");
          // Animer après un court délai
          setTimeout(() => {
            bar.style.width = width;
          }, 100);
        }
      });
    }

    // Animation au défilement
    const elements = document.querySelectorAll(
      ".timeline-item, .education-item, .skill-item"
    );
    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (elementPosition < screenPosition) {
        element.classList.add("animate");
      }
    });
  }

  // Ajouter l'écouteur d'événement pour le défilement
  window.addEventListener("scroll", handleScroll);

  // Déclencher l'animation au chargement initial
  handleScroll();

  // Ajouter une classe pour les animations CSS
  document
    .querySelectorAll(
      ".timeline-item, .education-item, .skill-item, .project-item, .testimonial-item, .blog-item"
    )
    .forEach((item) => {
      item.classList.add("fade-in");
    });

  // Filtrage des projets
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");

  if (filterBtns.length && projectItems.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Retirer la classe active de tous les boutons
        filterBtns.forEach((b) => b.classList.remove("active"));
        // Ajouter la classe active au bouton cliqué
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        projectItems.forEach((item) => {
          if (
            filter === "all" ||
            item.getAttribute("data-category") === filter
          ) {
            item.style.display = "block";
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
            }, 100);
          } else {
            item.style.opacity = "0";
            item.style.transform = "translateY(20px)";
            setTimeout(() => {
              item.style.display = "none";
            }, 500);
          }
        });
      });
    });
  }

  // Slider de témoignages
  const testimonialItems = document.querySelectorAll(".testimonial-item");
  const prevBtn = document.querySelector(".testimonial-btn.prev");
  const nextBtn = document.querySelector(".testimonial-btn.next");
  const dots = document.querySelectorAll(".dot");
  let currentTestimonial = 0;

  if (testimonialItems.length && prevBtn && nextBtn && dots.length) {
    // Fonction pour afficher un témoignage spécifique
    function showTestimonial(index) {
      testimonialItems.forEach((item) => item.classList.remove("active"));
      dots.forEach((dot) => dot.classList.remove("active"));

      testimonialItems[index].classList.add("active");
      dots[index].classList.add("active");
      currentTestimonial = index;
    }

    // Événements pour les boutons précédent/suivant
    prevBtn.addEventListener("click", () => {
      currentTestimonial =
        (currentTestimonial - 1 + testimonialItems.length) %
        testimonialItems.length;
      showTestimonial(currentTestimonial);
    });

    nextBtn.addEventListener("click", () => {
      currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
      showTestimonial(currentTestimonial);
    });

    // Événements pour les points
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showTestimonial(index);
      });
    });

    // Rotation automatique des témoignages
    setInterval(() => {
      if (document.visibilityState === "visible") {
        currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
        showTestimonial(currentTestimonial);
      }
    }, 5000);
  }

  // Microinteractions
  const allLinks = document.querySelectorAll(
    "a:not(.social-icons a):not(.project-links a)"
  );
  const allButtons = document.querySelectorAll(
    "button:not(.testimonial-btn):not(.filter-btn)"
  );

  // Ajouter des effets de survol aux liens
  allLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transition = "all 0.3s ease";
      this.style.transform = "translateY(-2px)";
    });

    link.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Ajouter des effets de clic aux boutons
  allButtons.forEach((button) => {
    button.addEventListener("mousedown", function () {
      this.style.transition = "all 0.1s ease";
      this.style.transform = "scale(0.95)";
    });

    button.addEventListener("mouseup", function () {
      this.style.transform = "scale(1)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });

  // Formulaire de contact avec validation accessible
  if (contactForm) {
    const nameInput = contactForm.querySelector("#name");
    const emailInput = contactForm.querySelector("#email");
    const subjectInput = contactForm.querySelector("#subject");
    const messageInput = contactForm.querySelector("#message");
    const formStatus = contactForm.querySelector("#form-status");
    const nameError = contactForm.querySelector("#name-error");
    const emailError = contactForm.querySelector("#email-error");
    const subjectError = contactForm.querySelector("#subject-error");
    const messageError = contactForm.querySelector("#message-error");
    const isEnglish = document.documentElement.lang === "en";

    // Fonction pour valider un champ
    function validateField(input, errorElement, errorMessage) {
      if (!input.value.trim()) {
        input.classList.add("error");
        errorElement.textContent = errorMessage;
        input.setAttribute("aria-invalid", "true");
        return false;
      } else {
        input.classList.remove("error");
        errorElement.textContent = "";
        input.setAttribute("aria-invalid", "false");
        return true;
      }
    }

    // Fonction pour valider l'email
    function validateEmail(input, errorElement) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!input.value.trim()) {
        input.classList.add("error");
        errorElement.textContent = isEnglish
          ? "Email is required"
          : "L'email est requis";
        input.setAttribute("aria-invalid", "true");
        return false;
      } else if (!emailRegex.test(input.value.trim())) {
        input.classList.add("error");
        errorElement.textContent = isEnglish
          ? "Please enter a valid email address"
          : "Veuillez entrer une adresse email valide";
        input.setAttribute("aria-invalid", "true");
        return false;
      } else {
        input.classList.remove("error");
        errorElement.textContent = "";
        input.setAttribute("aria-invalid", "false");
        return true;
      }
    }

    // Validation en temps réel pour chaque champ
    nameInput.addEventListener("blur", function () {
      validateField(
        this,
        nameError,
        isEnglish ? "Name is required" : "Le nom est requis"
      );
    });

    emailInput.addEventListener("blur", function () {
      validateEmail(this, emailError);
    });

    subjectInput.addEventListener("blur", function () {
      validateField(
        this,
        subjectError,
        isEnglish ? "Subject is required" : "Le sujet est requis"
      );
    });

    messageInput.addEventListener("blur", function () {
      validateField(
        this,
        messageError,
        isEnglish ? "Message is required" : "Le message est requis"
      );
    });

    // Validation à la soumission du formulaire
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Valider tous les champs
      const isNameValid = validateField(
        nameInput,
        nameError,
        isEnglish ? "Name is required" : "Le nom est requis"
      );
      const isEmailValid = validateEmail(emailInput, emailError);
      const isSubjectValid = validateField(
        subjectInput,
        subjectError,
        isEnglish ? "Subject is required" : "Le sujet est requis"
      );
      const isMessageValid = validateField(
        messageInput,
        messageError,
        isEnglish ? "Message is required" : "Le message est requis"
      );

      // Si tous les champs sont valides, soumettre le formulaire
      if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        // Simuler l'envoi du formulaire
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn) {
          const originalText = submitBtn.textContent;
          submitBtn.textContent = isEnglish
            ? "Sending..."
            : "Envoi en cours...";
          submitBtn.disabled = true;

          // Effacer les messages d'erreur
          formStatus.textContent = "";
          formStatus.className = "form-status-message";

          // Simuler un délai d'envoi
          setTimeout(() => {
            // Afficher le message de succès
            formStatus.textContent = isEnglish
              ? "Your message has been sent successfully!"
              : "Votre message a été envoyé avec succès!";
            formStatus.className = "form-status-message success";
            formStatus.setAttribute("role", "alert");

            // Réinitialiser le formulaire
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Réinitialiser les états d'erreur
            [nameInput, emailInput, subjectInput, messageInput].forEach(
              (input) => {
                input.classList.remove("error");
                input.setAttribute("aria-invalid", "false");
              }
            );
            [nameError, emailError, subjectError, messageError].forEach(
              (error) => {
                error.textContent = "";
              }
            );
          }, 1500);
        }
      } else {
        // Afficher un message d'erreur général
        formStatus.textContent = isEnglish
          ? "Please correct the errors in the form."
          : "Veuillez corriger les erreurs dans le formulaire.";
        formStatus.className = "form-status-message error";
        formStatus.setAttribute("role", "alert");

        // Mettre le focus sur le premier champ invalide
        if (!isNameValid) nameInput.focus();
        else if (!isEmailValid) emailInput.focus();
        else if (!isSubjectValid) subjectInput.focus();
        else if (!isMessageValid) messageInput.focus();
      }
    });
  }
});
