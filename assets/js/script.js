// Modern loading animation
document.addEventListener('DOMContentLoaded', () => {
    const terminalBody = document.querySelector('.terminal-body');
    const messages = [
        '> Initializing system...',
        '> Loading portfolio assets...',
        '> Configuring security protocols...',
        '> Establishing connection...',
        '> Access granted. Welcome!'
    ];

    async function typeMessage(message) {
        const lineElement = document.createElement('div');
        lineElement.className = 'terminal-line';
        terminalBody.appendChild(lineElement);

        for (let char of message) {
            await new Promise(resolve => setTimeout(resolve, 30));
            lineElement.textContent += char;
        }
        await new Promise(resolve => setTimeout(resolve, 200));
    }

    async function loadTerminal() {
        for (let message of messages) {
            await typeMessage(message);
        }

        // After all messages are typed, fade out the loading screen
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                document.getElementById('nav').classList.remove('hidden');
                
                // Animate in the main content
                document.querySelectorAll('article').forEach((article, index) => {
                    setTimeout(() => {
                        article.style.opacity = '1';
                        article.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }, 400);
        }, 1000);
    }

    loadTerminal();
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.box, .project-card, .skill-card').forEach(element => {
    observer.observe(element);
});

// Updated Security Incident Cards Script
// const incidents = [
//     {
//         title: "Brute Force Attack",
//         type: "Security Breach",
//         description: "Multiple failed login attempts targeting administrator accounts detected, indicating a potential brute force attack.",
//         mitigation: [
//             "Implemented account lockout after 5 failed attempts",
//             "Enhanced logging for authentication attempts",
//             "Deployed adaptive MFA for admin accounts"
//         ],
//         investigation: [
//             "Analyzed authentication logs for pattern recognition",
//             "Traced attack vectors and origin IPs",
//             "Reviewed existing access controls"
//         ],
//         postIncident: [
//             "Updated access control policies",
//             "Implemented real-time alert system",
//             "Conducted security awareness training"
//         ]
//     },
//     {
//         title: "Audit Policy Tampering",
//         type: "Policy Violation",
//         description: "Unauthorized modifications to system audit policies detected on critical infrastructure.",
//         mitigation: [
//             "Restored original audit policies",
//             "Implemented change monitoring",
//             "Restricted audit policy access"
//         ],
//         investigation: [
//             "Reviewed change management logs",
//             "Identified unauthorized modifications",
//             "Assessed impact on security posture"
//         ],
//         postIncident: [
//             "Enhanced audit policy controls",
//             "Updated change management procedures",
//             "Implemented integrity monitoring"
//         ]
//     },
//     {
//         title: "Resource Exhaustion",
//         type: "System Security",
//         description: "Critical system resources depleted due to abnormal process behavior and potential DoS attempt.",
//         mitigation: [
//             "Implemented resource quotas",
//             "Enhanced monitoring systems",
//             "Deployed load balancing solutions"
//         ],
//         investigation: [
//             "Analyzed system performance logs",
//             "Identified resource consumption patterns",
//             "Evaluated system architecture"
//         ],
//         postIncident: [
//             "Upgraded system resources",
//             "Implemented auto-scaling",
//             "Enhanced monitoring alerts"
//         ]
//     }
// ];

// function createIncidentCard(incident) {
//     const card = document.createElement('div');
//     card.className = 'incident-card';
    
//     card.innerHTML = `
//         <div class="card-header">
//             <h3>${incident.title}</h3>
//             <span class="incident-type">${incident.type}</span>
//         </div>
//         <div class="card-body">
//             <p class="incident-description">${incident.description}</p>
            
//             <div class="action-section">
//                 <h4 class="action-title">
//                     <i class="fas fa-shield-alt"></i>
//                     Mitigation Steps
//                 </h4>
//                 <ul class="action-list">
//                     ${incident.mitigation.map(action => `
//                         <li class="action-item">${action}</li>
//                     `).join('')}
//                 </ul>
//             </div>

//             <div class="action-section">
//                 <h4 class="action-title">
//                     <i class="fas fa-search"></i>
//                     Investigation Process
//                 </h4>
//                 <ul class="action-list">
//                     ${incident.investigation.map(action => `
//                         <li class="action-item">${action}</li>
//                     `).join('')}
//                 </ul>
//             </div>

//             <div class="action-section">
//                 <h4 class="action-title">
//                     <i class="fas fa-check-circle"></i>
//                     Post-Incident Actions
//                 </h4>
//                 <ul class="action-list">
//                     ${incident.postIncident.map(action => `
//                         <li class="action-item">${action}</li>
//                     `).join('')}
//                 </ul>
//             </div>
//         </div>
//     `;
    
//     return card;
// }

// Initialize cards when DOM is loaded
// document.addEventListener('DOMContentLoaded', () => {
//     const container = document.getElementById('cards-container');
//     if (container) {
//         incidents.forEach(incident => {
//             container.appendChild(createIncidentCard(incident));
//         });
//     }
// });

class TypeWriter {
    constructor(textElement, words, wait = 3000) {
        this.textElement = textElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current word index
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if(this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element with styling for name
        if (this.txt.includes("Ingrid")) {
            const parts = this.txt.split("Ingrid");
            this.textElement.innerHTML = `${parts[0]}<strong style="color: var(--primary)">Ingrid</strong>${parts[1] || ''}`;
        } else {
            this.textElement.innerHTML = this.txt;
        }

        // Initial Type Speed
        let typeSpeed = 100;

        if(this.isDeleting) {
            typeSpeed /= 2; // Faster deletion
        }

        // If word is complete
        if(!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const textElement = document.querySelector('.typing-text');
    const words = [
        "Hi, I'm Ingrid!",
        "Hi, I'm a Developer!",
        "Hi, I'm a Security Passionate!"
    ];
    const wait = 3000;

    // Init TypeWriter
    new TypeWriter(textElement, words, wait);
}

// Optional: Add replay functionality
function replayTyping() {
    const typingText = document.querySelector('.typing-text');
    typingText.innerHTML = '';
    charIndex = 0;
    typingText.parentElement.classList.remove('typing-complete');
    setTimeout(type, 500);
}

// Optional: Replay typing effect when scrolling back to top
document.addEventListener('scroll', function() {
    const intro = document.querySelector('.intro-header');
    const rect = intro.getBoundingClientRect();
    
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        if (!typingText.parentElement.classList.contains('typing-complete')) {
            replayTyping();
        }
    }
});

// Add this to your existing script.js
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const body = document.body;

    // Create backdrop element
    const backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        backdrop.classList.toggle('active');
        body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
    }

    hamburger.addEventListener('click', toggleMenu);
    backdrop.addEventListener('click', toggleMenu);

    // Close menu when clicking nav links
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            backdrop.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Close menu on window resize if open
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            backdrop.classList.remove('active');
            body.style.overflow = '';
        }
    });
});