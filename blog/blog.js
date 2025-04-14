// Script spécifique pour la page blog

document.addEventListener('DOMContentLoaded', function() {
    // Filtrage des articles par catégorie
    const categoryBtns = document.querySelectorAll('.category-btn');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    if (categoryBtns.length && blogPosts.length) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Retirer la classe active de tous les boutons
                categoryBtns.forEach(b => b.classList.remove('active'));
                // Ajouter la classe active au bouton cliqué
                btn.classList.add('active');
                
                const category = btn.getAttribute('data-category');
                
                blogPosts.forEach(post => {
                    if (category === 'all') {
                        post.style.display = 'block';
                        setTimeout(() => {
                            post.style.opacity = '1';
                            post.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        const postCategories = post.getAttribute('data-categories').split(' ');
                        if (postCategories.includes(category)) {
                            post.style.display = 'block';
                            setTimeout(() => {
                                post.style.opacity = '1';
                                post.style.transform = 'translateY(0)';
                            }, 100);
                        } else {
                            post.style.opacity = '0';
                            post.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                post.style.display = 'none';
                            }, 500);
                        }
                    }
                });
            });
        });
    }
    
    // Formulaire de newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Simuler l'envoi du formulaire
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Envoi en cours...';
                submitBtn.disabled = true;
                
                // Simuler un délai d'envoi
                setTimeout(() => {
                    alert(`Merci de vous être abonné avec l'adresse ${email}. Vous recevrez bientôt nos derniers articles !`);
                    emailInput.value = '';
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }
    
    // Animation au défilement pour les articles
    function animateOnScroll() {
        const posts = document.querySelectorAll('.blog-post');
        
        posts.forEach(post => {
            const postPosition = post.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (postPosition < screenPosition) {
                post.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Déclencher l'animation au chargement initial
    
    // Ajouter une classe pour les animations CSS
    document.querySelectorAll('.blog-post').forEach(post => {
        post.classList.add('fade-in');
    });
    
    // Pagination (simulation)
    const paginationLinks = document.querySelectorAll('.pagination a');
    if (paginationLinks.length) {
        paginationLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Simuler le changement de page
                document.querySelectorAll('.pagination .page-number').forEach(num => {
                    num.classList.remove('active');
                });
                
                if (this.classList.contains('page-number')) {
                    this.classList.add('active');
                    
                    // Simuler le chargement de nouveaux articles
                    const blogList = document.querySelector('.blog-list');
                    if (blogList) {
                        blogList.style.opacity = '0.5';
                        
                        setTimeout(() => {
                            window.scrollTo({
                                top: document.querySelector('.blog-content').offsetTop - 100,
                                behavior: 'smooth'
                            });
                            
                            setTimeout(() => {
                                blogList.style.opacity = '1';
                                alert('Cette fonctionnalité est simulée. Dans une version réelle, de nouveaux articles seraient chargés ici.');
                            }, 500);
                        }, 500);
                    }
                }
            });
        });
    }
});
