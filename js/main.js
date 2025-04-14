// main.js - Script pour le portfolio professionnel de Mehdi Masmoudi
// Version corrigée pour résoudre les bugs d'animation et ajouter le support multilingue

// Fonction pour gérer le changement de langue
function switchLanguage(lang) {
    localStorage.setItem('language', lang);
    window.location.href = lang === 'fr' ? 'index.html' : 'index_en.html';
}

document.addEventListener('DOMContentLoaded', function() {
    // Vérifier la langue préférée uniquement pour les pages d'index
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        const currentPage = window.location.pathname.split('/').pop();

        // Vérifier si nous sommes sur une page d'index ou une page sans nom (racine du site)
        const isIndexPage = currentPage === '' || currentPage === 'index.html' || currentPage === 'index_en.html';

        if (isIndexPage) {
            const shouldBeOnEnglish = savedLanguage === 'en' && currentPage !== 'index_en.html';
            const shouldBeOnFrench = savedLanguage === 'fr' && currentPage !== 'index.html';

            if (shouldBeOnEnglish) {
                window.location.href = 'index_en.html';
                return; // Arrêter l'exécution car la page va être rechargée
            } else if (shouldBeOnFrench) {
                window.location.href = 'index.html';
                return; // Arrêter l'exécution car la page va être rechargée
            }
        }
    }

    // Variables
    const themeSwitch = document.querySelector('.theme-switch');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');
    const scrollTopBtn = document.querySelector('.scroll-top');
    const sections = document.querySelectorAll('section');
    const skillBars = document.querySelectorAll('.skill-progress');
    const contactForm = document.getElementById('contactForm');

    // Fonction pour l'animation de texte
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    const textArray = ["Full Stack Developer", "Data Specialist", "Automation Expert"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    // Fonction pour l'animation de texte
    function type() {
        if (typedTextSpan && cursorSpan) {
            if (charIndex < textArray[textArrayIndex].length) {
                if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            }
            else {
                cursorSpan.classList.remove("typing");
                setTimeout(erase, newTextDelay);
            }
        }
    }

    function erase() {
        if (typedTextSpan && cursorSpan) {
            if (charIndex > 0) {
                if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            }
            else {
                cursorSpan.classList.remove("typing");
                textArrayIndex++;
                if(textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingDelay + 1100);
            }
        }
    }

    // Démarrer l'animation de texte
    if(typedTextSpan && cursorSpan && textArray.length) {
        setTimeout(type, newTextDelay + 250);
    }

    // Changement de thème (clair/sombre)
    if (themeSwitch) {
        themeSwitch.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');

            // Changer l'icône
            const icon = themeSwitch.querySelector('i');
            if (icon) {
                if (document.body.classList.contains('dark-theme')) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                    localStorage.setItem('theme', 'dark');

                    // Basculer les logos pour le thème sombre (logo vert)
                    document.querySelectorAll('.logo-light').forEach(logo => {
                        logo.style.display = 'none';
                    });
                    document.querySelectorAll('.logo-dark').forEach(logo => {
                        logo.style.display = 'block';
                    });
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                    localStorage.setItem('theme', 'light');

                    // Basculer les logos pour le thème clair (logo blanc)
                    document.querySelectorAll('.logo-light').forEach(logo => {
                        logo.style.display = 'block';
                    });
                    document.querySelectorAll('.logo-dark').forEach(logo => {
                        logo.style.display = 'none';
                    });
                }
            }
        });
    }

    // Vérifier le thème enregistré
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' && themeSwitch) {
        document.body.classList.add('dark-theme');
        const icon = themeSwitch.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }

        // Initialiser les logos pour le thème sombre (logo vert)
        document.querySelectorAll('.logo-light').forEach(logo => {
            logo.style.display = 'none';
        });
        document.querySelectorAll('.logo-dark').forEach(logo => {
            logo.style.display = 'block';
        });
    } else {
        // Initialiser les logos pour le thème clair (logo blanc)
        document.querySelectorAll('.logo-light').forEach(logo => {
            logo.style.display = 'block';
        });
        document.querySelectorAll('.logo-dark').forEach(logo => {
            logo.style.display = 'none';
        });
    }

    // Menu mobile
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }

            // Mettre à jour l'attribut aria-expanded
            const isExpanded = navMenu.classList.contains('active');
            mobileMenu.setAttribute('aria-expanded', isExpanded);
        });

        // Fermer le menu mobile lorsqu'on clique en dehors
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                !mobileMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = mobileMenu.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
                mobileMenu.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Fermer le menu mobile lors du clic sur un lien
    if (navLinks && navMenu && mobileMenu) {
        navLinks.forEach(link => {
            if (!link.classList.contains('dropbtn')) {
                // Vérifier si le lien pointe vers une ancre dans la page actuelle
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    link.addEventListener('click', () => {
                        navMenu.classList.remove('active');
                        const icon = mobileMenu.querySelector('i');
                        if (icon) {
                            icon.classList.add('fa-bars');
                            icon.classList.remove('fa-times');
                        }
                        mobileMenu.setAttribute('aria-expanded', 'false');
                    });
                }
            }
        });
    }

    // Gérer le menu déroulant sur mobile
    const dropdownBtns = document.querySelectorAll('.dropbtn');
    if (dropdownBtns.length) {
        dropdownBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Vérifier si on est sur mobile
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const dropdown = btn.parentElement;

                    // Fermer tous les autres dropdowns
                    document.querySelectorAll('.dropdown').forEach(item => {
                        if (item !== dropdown) {
                            item.classList.remove('active');
                        }
                    });

                    // Basculer l'état du dropdown actuel
                    dropdown.classList.toggle('active');
                }
            });
        });
    }

    // Fonction pour gérer le défilement
    function handleScroll() {
        // Bouton de retour en haut
        if (scrollTopBtn) {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        }

        // Navigation active selon la section
        if (sections && navLinks) {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href && href.startsWith('#') && href.substring(1) === current) {
                    link.classList.add('active');

                    // Si le lien actif est dans un menu déroulant, mettre également en surbrillance le bouton parent
                    const parentDropdown = link.closest('.dropdown-content');
                    if (parentDropdown) {
                        const dropdownBtn = parentDropdown.previousElementSibling;
                        if (dropdownBtn && dropdownBtn.classList.contains('dropbtn')) {
                            dropdownBtn.classList.add('active');
                        }
                    }
                }
            });
        }

        // Animation des barres de compétences
        if (skillBars) {
            skillBars.forEach(bar => {
                const barTop = bar.getBoundingClientRect().top;
                if (barTop < window.innerHeight - 100 && !bar.classList.contains('animated')) {
                    // Stocker la largeur originale depuis l'attribut style
                    const width = bar.style.width;
                    // Réinitialiser la largeur
                    bar.style.width = "0";
                    // Marquer comme animé
                    bar.classList.add('animated');
                    // Animer après un court délai
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                }
            });
        }

        // Animation au défilement
        const elements = document.querySelectorAll('.timeline-item, .education-item, .skill-item');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    }

    // Ajouter l'écouteur d'événement pour le défilement
    window.addEventListener('scroll', handleScroll);

    // Déclencher l'animation au chargement initial
    handleScroll();

    // Ajouter une classe pour les animations CSS
    document.querySelectorAll('.timeline-item, .education-item, .skill-item, .project-item, .testimonial-item, .blog-item').forEach(item => {
        item.classList.add('fade-in');
    });

    // Filtrage des projets
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterBtns.length && projectItems.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Retirer la classe active de tous les boutons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Ajouter la classe active au bouton cliqué
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 500);
                    }
                });
            });
        });
    }

    // Slider de témoignages
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;

    if (testimonialItems.length && prevBtn && nextBtn && dots.length) {
        // Fonction pour afficher un témoignage spécifique
        function showTestimonial(index) {
            testimonialItems.forEach(item => item.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            testimonialItems[index].classList.add('active');
            dots[index].classList.add('active');
            currentTestimonial = index;
        }

        // Événements pour les boutons précédent/suivant
        prevBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
            showTestimonial(currentTestimonial);
        });

        nextBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
            showTestimonial(currentTestimonial);
        });

        // Événements pour les points
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });

        // Rotation automatique des témoignages
        setInterval(() => {
            if (document.visibilityState === 'visible') {
                currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
                showTestimonial(currentTestimonial);
            }
        }, 5000);
    }

    // Microinteractions
    const allLinks = document.querySelectorAll('a:not(.social-icons a):not(.project-links a)');
    const allButtons = document.querySelectorAll('button:not(.testimonial-btn):not(.filter-btn)');

    // Ajouter des effets de survol aux liens
    allLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.transform = 'translateY(-2px)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Ajouter des effets de clic aux boutons
    allButtons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transition = 'all 0.1s ease';
            this.style.transform = 'scale(0.95)';
        });

        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Formulaire de contact
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simuler l'envoi du formulaire
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                // Adapter le texte en fonction de la langue
                const isEnglish = document.documentElement.lang === 'en';
                submitBtn.textContent = isEnglish ? 'Sending...' : 'Envoi en cours...';
                submitBtn.disabled = true;

                // Simuler un délai d'envoi
                setTimeout(() => {
                    // Message en fonction de la langue
                    const successMessage = isEnglish ? 'Your message has been sent successfully!' : 'Votre message a été envoyé avec succès!';
                    alert(successMessage);
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }
});
