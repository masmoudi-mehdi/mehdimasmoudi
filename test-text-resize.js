// Script pour tester le redimensionnement du texte
document.addEventListener('DOMContentLoaded', function() {
    // Créer les contrôles de test
    const testControls = document.createElement('div');
    testControls.style.position = 'fixed';
    testControls.style.top = '100px';
    testControls.style.right = '20px';
    testControls.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    testControls.style.color = 'white';
    testControls.style.padding = '15px';
    testControls.style.borderRadius = '8px';
    testControls.style.zIndex = '9999';
    testControls.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
    testControls.style.display = 'flex';
    testControls.style.flexDirection = 'column';
    testControls.style.gap = '10px';
    
    // Titre
    const title = document.createElement('h3');
    title.textContent = 'Test de redimensionnement du texte';
    title.style.margin = '0 0 10px 0';
    title.style.fontSize = '16px';
    testControls.appendChild(title);
    
    // Boutons de redimensionnement
    const sizes = [100, 125, 150, 175, 200];
    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.flexDirection = 'column';
    buttonsContainer.style.gap = '5px';
    
    sizes.forEach(size => {
        const button = document.createElement('button');
        button.textContent = `${size}%`;
        button.style.padding = '8px 12px';
        button.style.cursor = 'pointer';
        button.style.borderRadius = '4px';
        button.style.border = 'none';
        button.style.backgroundColor = size === 100 ? '#3F88C5' : '#e0e0e0';
        button.style.color = size === 100 ? 'white' : 'black';
        button.style.fontWeight = 'bold';
        
        button.addEventListener('click', function() {
            // Réinitialiser tous les boutons
            buttonsContainer.querySelectorAll('button').forEach(btn => {
                btn.style.backgroundColor = '#e0e0e0';
                btn.style.color = 'black';
            });
            
            // Mettre en évidence le bouton actif
            this.style.backgroundColor = '#3F88C5';
            this.style.color = 'white';
            
            // Appliquer la taille de texte
            document.body.style.fontSize = `${size}%`;
            
            // Mettre à jour le statut
            statusText.textContent = `Taille du texte: ${size}%`;
            
            // Vérifier les problèmes
            checkForIssues(size);
        });
        
        buttonsContainer.appendChild(button);
    });
    
    testControls.appendChild(buttonsContainer);
    
    // Texte de statut
    const statusText = document.createElement('div');
    statusText.textContent = 'Taille du texte: 100%';
    statusText.style.marginTop = '10px';
    statusText.style.fontSize = '14px';
    testControls.appendChild(statusText);
    
    // Résultats des problèmes
    const issuesContainer = document.createElement('div');
    issuesContainer.style.marginTop = '15px';
    issuesContainer.style.fontSize = '14px';
    issuesContainer.style.maxHeight = '200px';
    issuesContainer.style.overflowY = 'auto';
    issuesContainer.style.padding = '5px';
    issuesContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    issuesContainer.style.borderRadius = '4px';
    testControls.appendChild(issuesContainer);
    
    // Fonction pour vérifier les problèmes
    function checkForIssues(size) {
        issuesContainer.innerHTML = '';
        
        if (size <= 100) {
            issuesContainer.innerHTML = '<p>Aucun problème détecté à la taille normale.</p>';
            return;
        }
        
        const issues = [];
        
        // Vérifier les éléments avec overflow hidden
        document.querySelectorAll('*').forEach(el => {
            const style = window.getComputedStyle(el);
            if (style.overflow === 'hidden' || style.overflowX === 'hidden' || style.overflowY === 'hidden') {
                const rect = el.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0 && el.scrollHeight > el.clientHeight) {
                    issues.push({
                        element: el,
                        issue: 'Contenu tronqué (overflow: hidden)'
                    });
                }
            }
        });
        
        // Vérifier les éléments avec hauteur fixe
        document.querySelectorAll('*').forEach(el => {
            const style = window.getComputedStyle(el);
            if (style.height && style.height !== 'auto' && !style.height.includes('%') && !style.height.includes('vh') && !style.height.includes('em') && !style.height.includes('rem')) {
                const rect = el.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0 && el.scrollHeight > el.clientHeight) {
                    issues.push({
                        element: el,
                        issue: 'Hauteur fixe limitant le contenu'
                    });
                }
            }
        });
        
        // Afficher les problèmes
        if (issues.length === 0) {
            issuesContainer.innerHTML = `<p>Aucun problème majeur détecté à ${size}%.</p>`;
        } else {
            const issuesList = document.createElement('ul');
            issuesList.style.paddingLeft = '20px';
            issuesList.style.margin = '5px 0';
            
            issues.slice(0, 10).forEach(issue => {
                const li = document.createElement('li');
                li.textContent = `${issue.issue} - ${getElementDescription(issue.element)}`;
                issuesList.appendChild(li);
                
                // Mettre en évidence l'élément problématique
                issue.element.style.outline = '2px solid red';
                setTimeout(() => {
                    issue.element.style.outline = '';
                }, 5000);
            });
            
            if (issues.length > 10) {
                const li = document.createElement('li');
                li.textContent = `... et ${issues.length - 10} autres problèmes`;
                issuesList.appendChild(li);
            }
            
            issuesContainer.innerHTML = `<p>Problèmes détectés à ${size}% (${issues.length} au total):</p>`;
            issuesContainer.appendChild(issuesList);
        }
    }
    
    // Fonction pour obtenir une description de l'élément
    function getElementDescription(el) {
        let desc = el.tagName.toLowerCase();
        if (el.id) {
            desc += `#${el.id}`;
        }
        if (el.className && typeof el.className === 'string') {
            desc += `.${el.className.split(' ').join('.')}`;
        }
        return desc;
    }
    
    // Ajouter les contrôles à la page
    document.body.appendChild(testControls);
    
    // Bouton pour fermer le panneau
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '5px';
    closeButton.style.right = '5px';
    closeButton.style.backgroundColor = 'transparent';
    closeButton.style.border = 'none';
    closeButton.style.color = 'white';
    closeButton.style.fontSize = '16px';
    closeButton.style.cursor = 'pointer';
    closeButton.addEventListener('click', function() {
        testControls.remove();
        // Réinitialiser la taille du texte
        document.body.style.fontSize = '';
    });
    testControls.appendChild(closeButton);
});
