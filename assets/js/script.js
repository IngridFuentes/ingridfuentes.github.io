setTimeout(function() {
    // Hide the loading screen
    document.getElementById('loading-screen').style.display = 'none';
    
    // Show the portfolio page
    document.getElementById('portfolio').style.display = 'block';

    //Remove navbar in the loading-screen
    const navbar = document.getElementById("nav");
    navbar.classList.remove("hidden");

}, 7000); // 7000 milliseconds = 7 seconds

const incidents = [
    {
      title: "Brute Force Attack",
      description:
        "Brute Force Attack is determined by repeated login attempts targeting the administrator account.",
      mitigation: [
        "Lock accounts after 5 failed attempts.",
        "Set up alerts for repeated failed login attempts within a short period."

      ],
      investigation: [
        "Analyze the events timeline checking for suspicious activities.",
        "Correlate login attempts with known malicious IPs using threat intelligence feeds.",
        "Review access logs to identify the attack’s origin and block the source IP address.",
        "Conduct a password policy review to ensure adherence to strong password requirements."
      ],
      postIncident: [
        "Reset the compromised administrator account password.",
        "Implement multi-factor authentication for privileged accounts.",
        "Implement alerts for failed login."
      ]
    },
    {
      title: "Audit Policy Tampering",
      description:
        "Audit policy change detected on DC-SERVER-01. This could impact logging of critical security events.",
      mitigation: [
        "Enable real-time alerts for critical policy changes using SIEM tools.",
        "Implement strict change management protocols for audit policies.",
        "Increase monitoring for audit-related events."
      ],
      investigation: [
        "Analysis performed: Confirmed the account responsible for the audit policy change by analyzing the subject field of Event ID 4719.",
        "Analyze user permissions to determine if the account has legitimate access to modify audit policies.",
        "Review other security events around the same time to check for suspicious activity."
      ],
      postIncident: [
        "Restore the audit policy to its original state.",
        "Conduct a comprehensive review of audit logs to identify hidden malicious activities.",
        "Restrict permissions for modifying audit policies to a specific group."
      ]
    },
    {
      title: "Low Virtual Memory Condition",
      description:
        "The system is running low on memory while handling SSH connections. Potential misuse or high traffic identified.",
      mitigation: [
        "Increase system virtual memory allocation.",
        "Restrict the maximum number of concurrent SSH connections.",
        "Block IPs performing brute-force SSH attempts."
      ],
      investigation: [
        "Check system logs for memory-related errors.",
        "Analyze SSH connection logs for suspicious activity.",
        "Monitor resource usage to identify excessive load."
      ],
      postIncident: [
        "Upgrade server hardware or increase resource limits.",
        "Implement rate limiting for SSH connections.",
        "Perform a review of server usage and access patterns."
      ]
    }
  ];
  
  function createCard(incident) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.className = "card";
    card.innerHTML = `
      <h2>${incident.title}</h2>
      <p><strong>Description:</strong> ${incident.description}</p>
      
      <h3>Mitigation Actions:</h3>
      <ul>
        ${incident.mitigation.map((action) => `<li>${action}</li>`).join("")}
      </ul>
      
      <h3>Investigation Actions:</h3>
      <ul>
        ${incident.investigation.map((action) => `<li>${action}</li>`).join("")}
      </ul>
      
      <h3>Post-Incident Review:</h3>
      <ul>
        ${incident.postIncident.map((action) => `<li>${action}</li>`).join("")}
      </ul>
    `;
  
    return card;
  }
  
  const container = document.getElementById("cards-container");
  incidents.forEach((incident) => {
    const card = createCard(incident);
    container.appendChild(card);
  });