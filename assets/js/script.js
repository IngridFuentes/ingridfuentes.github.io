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
        await new Promise(resolve => setTimeout(resolve, 300));
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
            }, 500);
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

// Security Incident Cards
const incidents = [
    {
        title: "Brute Force Attack",
        description: "Brute Force Attack is determined by repeated login attempts targeting the administrator account.",
        mitigation: [
            "Lock accounts after 5 failed attempts",
            "Set up alerts for repeated failed login attempts",
            "Implement rate limiting on login endpoints"
        ],
        investigation: [
            "Analyze events timeline for suspicious activities",
            "Correlate login attempts with known malicious IPs",
            "Review access logs to identify attack origin",
            "Conduct password policy review"
        ],
        postIncident: [
            "Reset compromised account passwords",
            "Implement multi-factor authentication",
            "Deploy intrusion prevention system"
        ]
    },
    {
        title: "Audit Policy Tampering",
        description: "Audit policy change detected on DC-SERVER-01. This could impact logging of critical security events.",
        mitigation: [
            "Enable real-time alerts for policy changes",
            "Implement strict change management",
            "Monitor audit-related events"
        ],
        investigation: [
            "Analyze Event ID 4719 for policy changes",
            "Review user permissions and access",
            "Check for concurrent suspicious activity"
        ],
        postIncident: [
            "Restore original audit policy",
            "Review audit logs comprehensively",
            "Restrict audit policy modifications"
        ]
    },
    {
        title: "Low Virtual Memory Condition",
        description: "System running low on memory while handling SSH connections. Potential resource exhaustion attack.",
        mitigation: [
            "Increase system memory allocation",
            "Restrict concurrent SSH connections",
            "Block malicious IP addresses"
        ],
        investigation: [
            "Monitor system resource usage",
            "Analyze SSH connection patterns",
            "Review server performance metrics"
        ],
        postIncident: [
            "Optimize server resources",
            "Implement connection rate limiting",
            "Update monitoring thresholds"
        ]
    }
];

function createCard(incident) {
    const card = document.createElement("div");
    card.classList.add("card", "animate-on-scroll");
    
    card.innerHTML = `
        <div class="card-header">
            <h3>${incident.title}</h3>
            <p class="description">${incident.description}</p>
        </div>
        
        <div class="card-content">
            <div class="section">
                <h4>Mitigation</h4>
                <ul>
                    ${incident.mitigation.map(action => `<li>${action}</li>`).join("")}
                </ul>
            </div>
            
            <div class="section">
                <h4>Investigation</h4>
                <ul>
                    ${incident.investigation.map(action => `<li>${action}</li>`).join("")}
                </ul>
            </div>
            
            <div class="section">
                <h4>Post-Incident</h4>
                <ul>
                    ${incident.postIncident.map(action => `<li>${action}</li>`).join("")}
                </ul>
            </div>
        </div>
    `;

    return card;
}

const container = document.getElementById("cards-container");
if (container) {
    incidents.forEach(incident => {
        const card = createCard(incident);
        container.appendChild(card);
        observer.observe(card);
    });
}