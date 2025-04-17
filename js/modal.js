/**
 * Fonctionnalité de modal pour afficher l'image en grand
 */

// Variables globales
let modal;
let modalImage;
let isModalOpen = false;

// Initialiser les variables une fois que le DOM est chargé
document.addEventListener("DOMContentLoaded", () => {
  modal = document.getElementById("imageModal");
  modalImage = document.getElementById("modalImage");

  // S'assurer que la modal est cachée au chargement
  if (modal) {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  }

  // Ajouter un indicateur visuel que l'image est cliquable
  const profileImage = document.querySelector(".profile-image");
  if (profileImage) {
    profileImage.title = "Cliquez pour agrandir";
  }
});

/**
 * Ouvre la modal avec l'image agrandie
 * @param {HTMLImageElement} img - L'élément image qui a été cliqué
 */
function openImageModal(img) {
  // Vérifier si les éléments existent
  if (!modal || !modalImage) {
    modal = document.getElementById("imageModal");
    modalImage = document.getElementById("modalImage");

    // Si les éléments n'existent toujours pas, sortir de la fonction
    if (!modal || !modalImage) {
      console.error("Modal elements not found");
      return;
    }
  }

  // Mettre à jour l'image dans la modal
  modalImage.src = img.src;
  modalImage.alt = img.alt;

  // Afficher la modal
  modal.style.display = "flex";

  // Forcer un reflow pour permettre l'animation
  void modal.offsetWidth;

  // Ajouter la classe pour l'animation
  modal.classList.add("show");

  // Mettre à jour l'état
  isModalOpen = true;

  // Mettre à jour les attributs ARIA
  modal.setAttribute("aria-hidden", "false");

  // Capturer le focus
  const closeButton = modal.querySelector(".close-modal");
  if (closeButton) {
    setTimeout(() => {
      closeButton.focus();
    }, 100);
  }

  // Désactiver le défilement du body
  document.body.style.overflow = "hidden";

  // Ajouter les écouteurs d'événements
  document.addEventListener("keydown", handleModalKeydown);
  modal.addEventListener("click", handleModalClick);
}

/**
 * Ferme la modal
 */
function closeImageModal() {
  // Vérifier si la modal existe
  if (!modal) {
    return;
  }

  // Retirer la classe pour l'animation
  modal.classList.remove("show");

  // Attendre la fin de l'animation avant de cacher la modal
  setTimeout(() => {
    if (modal) {
      modal.style.display = "none";

      // Mettre à jour les attributs ARIA
      modal.setAttribute("aria-hidden", "true");
    }

    // Mettre à jour l'état
    isModalOpen = false;

    // Réactiver le défilement du body
    document.body.style.overflow = "";
  }, 300); // Correspond à la durée de l'animation CSS

  // Retirer les écouteurs d'événements
  document.removeEventListener("keydown", handleModalKeydown);
  if (modal) {
    modal.removeEventListener("click", handleModalClick);
  }

  // Retourner le focus à l'image
  const profileImage = document.querySelector(".profile-image");
  if (profileImage) {
    profileImage.focus();
  }
}

/**
 * Gère les événements clavier pour la modal
 * @param {KeyboardEvent} event - L'événement clavier
 */
function handleModalKeydown(event) {
  // Fermer la modal avec la touche Escape
  if (event.key === "Escape" && isModalOpen) {
    closeImageModal();
  }

  // Piéger le focus dans la modal
  if (event.key === "Tab" && isModalOpen && modal) {
    const focusableElements = modal.querySelectorAll(
      'button, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length > 0) {
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }
}

/**
 * Gère les clics sur la modal
 * @param {MouseEvent} event - L'événement clic
 */
function handleModalClick(event) {
  // Fermer la modal si on clique en dehors du contenu
  if (modal && event.target === modal) {
    closeImageModal();
  }
}
