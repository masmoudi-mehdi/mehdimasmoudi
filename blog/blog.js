// Script spécifique pour la page blog

document.addEventListener("DOMContentLoaded", function () {
  // Filtrage des articles par catégorie
  const categoryBtns = document.querySelectorAll(".category-btn");
  const blogPosts = document.querySelectorAll(".blog-post");

  if (categoryBtns.length && blogPosts.length) {
    categoryBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Retirer la classe active de tous les boutons
        categoryBtns.forEach((b) => b.classList.remove("active"));
        // Ajouter la classe active au bouton cliqué
        btn.classList.add("active");

        const category = btn.getAttribute("data-category");

        blogPosts.forEach((post) => {
          if (category === "all") {
            post.style.display = "block";
            setTimeout(() => {
              post.style.opacity = "1";
              post.style.transform = "translateY(0)";
            }, 100);
          } else {
            const postCategories = post
              .getAttribute("data-categories")
              .split(" ");
            if (postCategories.includes(category)) {
              post.style.display = "block";
              setTimeout(() => {
                post.style.opacity = "1";
                post.style.transform = "translateY(0)";
              }, 100);
            } else {
              post.style.opacity = "0";
              post.style.transform = "translateY(20px)";
              setTimeout(() => {
                post.style.display = "none";
              }, 500);
            }
          }
        });
      });
    });
  }

  // Formulaire de newsletter avec validation accessible
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const emailError = newsletterForm.querySelector("#newsletter-email-error");
    const statusMessage = newsletterForm.querySelector("#newsletter-status");
    const isEnglish = document.documentElement.lang === "en";

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

    // Validation en temps réel
    emailInput.addEventListener("blur", function () {
      validateEmail(this, emailError);
    });

    // Validation à la soumission
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const isEmailValid = validateEmail(emailInput, emailError);

      if (isEmailValid) {
        const email = emailInput.value.trim();
        // Simuler l'envoi du formulaire
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = isEnglish ? "Sending..." : "Envoi en cours...";
        submitBtn.disabled = true;

        // Effacer les messages d'erreur
        statusMessage.textContent = "";
        statusMessage.className = "form-status-message";

        // Simuler un délai d'envoi
        setTimeout(() => {
          // Afficher le message de succès
          const successText = isEnglish
            ? `Thank you for subscribing with ${email}. You will soon receive our latest articles!`
            : `Merci de vous être abonné avec l'adresse ${email}. Vous recevrez bientôt nos derniers articles !`;

          statusMessage.textContent = successText;
          statusMessage.className = "form-status-message success";
          statusMessage.setAttribute("role", "alert");

          // Réinitialiser le formulaire
          emailInput.value = "";
          emailInput.classList.remove("error");
          emailInput.setAttribute("aria-invalid", "false");
          emailError.textContent = "";

          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 1500);
      } else {
        // Afficher un message d'erreur général
        statusMessage.textContent = isEnglish
          ? "Please enter a valid email address to subscribe."
          : "Veuillez entrer une adresse email valide pour vous abonner.";
        statusMessage.className = "form-status-message error";
        statusMessage.setAttribute("role", "alert");

        // Mettre le focus sur le champ email
        emailInput.focus();
      }
    });
  }

  // Animation au défilement pour les articles
  function animateOnScroll() {
    const posts = document.querySelectorAll(".blog-post");

    posts.forEach((post) => {
      const postPosition = post.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (postPosition < screenPosition) {
        post.classList.add("animate");
      }
    });
  }

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Déclencher l'animation au chargement initial

  // Ajouter une classe pour les animations CSS
  document.querySelectorAll(".blog-post").forEach((post) => {
    post.classList.add("fade-in");
  });

  // Pagination (simulation)
  const paginationLinks = document.querySelectorAll(".pagination a");
  if (paginationLinks.length) {
    paginationLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        // Simuler le changement de page
        document.querySelectorAll(".pagination .page-number").forEach((num) => {
          num.classList.remove("active");
        });

        if (this.classList.contains("page-number")) {
          this.classList.add("active");

          // Simuler le chargement de nouveaux articles
          const blogList = document.querySelector(".blog-list");
          if (blogList) {
            blogList.style.opacity = "0.5";

            setTimeout(() => {
              window.scrollTo({
                top: document.querySelector(".blog-content").offsetTop - 100,
                behavior: "smooth",
              });

              setTimeout(() => {
                blogList.style.opacity = "1";
                alert(
                  "Cette fonctionnalité est simulée. Dans une version réelle, de nouveaux articles seraient chargés ici."
                );
              }, 500);
            }, 500);
          }
        }
      });
    });
  }
});
