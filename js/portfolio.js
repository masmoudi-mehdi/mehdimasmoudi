// Script spécifique pour la page portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Navigation par onglets
    const tabLinks = document.querySelectorAll('.portfolio-tabs a');
    const portfolioSections = document.querySelectorAll('.portfolio-section');
    
    if (tabLinks.length && portfolioSections.length) {
        // Fonction pour afficher une section spécifique
        function showSection(sectionId) {
            // Masquer toutes les sections
            portfolioSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Retirer la classe active de tous les liens
            tabLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Afficher la section sélectionnée
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Activer le lien correspondant
            const activeLink = document.querySelector(`.portfolio-tabs a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
        
        // Événements pour les liens d'onglets
        tabLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const sectionId = this.getAttribute('href').substring(1);
                showSection(sectionId);
                
                // Mettre à jour l'URL avec le hash sans recharger la page
                history.pushState(null, null, `#${sectionId}`);
            });
        });
        
        // Vérifier si un hash est présent dans l'URL
        if (window.location.hash) {
            const sectionId = window.location.hash.substring(1);
            showSection(sectionId);
        }
        
        // Gérer les changements d'URL (boutons précédent/suivant du navigateur)
        window.addEventListener('popstate', function() {
            if (window.location.hash) {
                const sectionId = window.location.hash.substring(1);
                showSection(sectionId);
            } else {
                // Par défaut, afficher la première section
                const firstSectionId = portfolioSections[0].id;
                showSection(firstSectionId);
            }
        });
    }
    
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
            
            // Accessibilité clavier
            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    showTestimonial(index);
                }
            });
        });
        
        // Rotation automatique des témoignages
        setInterval(() => {
            if (document.visibilityState === 'visible' && document.getElementById('testimonials').classList.contains('active')) {
                currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
                showTestimonial(currentTestimonial);
            }
        }, 5000);
    }
    
    // Animation des barres de compétences
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            if (barTop < window.innerHeight - 100 && !bar.classList.contains('animated')) {
                // Stocker la largeur originale
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
    
    // Déclencher l'animation des barres de compétences lorsque la section est active
    const skillsTab = document.querySelector('.portfolio-tabs a[href="#skills"]');
    if (skillsTab) {
        skillsTab.addEventListener('click', () => {
            setTimeout(animateSkillBars, 100);
        });
    }
    
    // Déclencher l'animation au chargement initial si la section compétences est active
    if (document.getElementById('skills').classList.contains('active')) {
        setTimeout(animateSkillBars, 100);
    }
});
