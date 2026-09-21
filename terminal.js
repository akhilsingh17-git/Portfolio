/**
 * Interactive Recruiter CLI Terminal
 * Akhil Kumar Singh — Portfolio
 */

(function () {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  const terminalChips = document.querySelectorAll('.terminal-chip');

  if (!terminalBody || !terminalInput) return;

  const COMMANDS = {
    help: () => `
Available Commands:
  <span class="command">whoami</span>       - Candidate summary & career focus
  <span class="command">skills</span>       - Technical skills breakdown
  <span class="command">projects</span>     - Production and ML projects
  <span class="command">experience</span>   - Industrial internship history
  <span class="command">education</span>    - Academic background & credentials
  <span class="command">contact</span>      - Direct phone, email, and social links
  <span class="command">clear</span>        - Clear terminal console
    `,
    whoami: () => `
<span class="success">Akhil Kumar Singh</span> — AI Engineer / Software Development Engineer
IT undergraduate with solid grounding in DSA, OOP, OS, and DBMS.
Shipped 3 independent projects spanning Computer Vision and NLP (BERT/RoBERTa)
served via live APIs. Looking to build and scale intelligent systems.
    `,
    skills: () => `
<span class="info">Languages:</span> Java, Python, SQL
<span class="info">Core CS:</span> Data Structures & Algorithms, OOP, DBMS, OS, System Design Fundamentals
<span class="info">AI & ML:</span> BERT, RoBERTa, OpenCV, Dlib, DeepFace, NLP, Computer Vision
<span class="info">Web Stack:</span> React.js, HTML5, CSS3, REST APIs
<span class="info">Databases & Tools:</span> MySQL, Git, GitHub, Vercel
    `,
    projects: () => `
<span class="success">[01] Fake News Detection Framework</span>
     - Fine-tuned BERT & RoBERTa models; served live predictions via REST API.
     - Dual client: Integrated Web App & Chrome Extension.

<span class="success">[02] Driver Drowsiness Detection System</span>
     - Real-time Eye Aspect Ratio (EAR) metric on ESP32-CAM.
     - OpenCV, Dlib, Imutils, DeepFace pipeline with immediate buzzer alarm.

<span class="success">[03] YouTube Clone (React.js)</span>
     - Rebuilt core video platform with search, dynamic filters & external API integration.
    `,
    experience: () => `
<span class="warning">Machine Learning Intern</span> @ Unified Mentor Pvt. Ltd. (Jul 2026 – Sep 2026)
- Two months tackling Python, ML, and NLP tasks on real project pipelines rather than tutorials.
    `,
    education: () => `
<span class="info">B.Tech, Information Technology (2023 – 2027)</span>
  Pranveer Singh Institute of Technology (PSIT), Kanpur — 64%

<span class="info">Higher Secondary</span>
  Dr. Virendra Swarup Education Centre, Panki, Kanpur
  12th Grade: 70% | 10th Grade: 87%
    `,
    contact: () => `
<span class="success">Direct Phone:</span> +91 9569756996
<span class="success">LinkedIn:</span> linkedin.com/in/akhil-singh
<span class="success">GitHub:</span> github.com/akhil-singh
<span class="success">Role Status:</span> Open to AI Engineer / SDE Opportunities
    `,
    sudo: () => `Permission denied: Akhil has root access to his neural models. 😉`,
    clear: () => {
      terminalBody.innerHTML = '';
      return '';
    }
  };

  function appendLine(html, type = 'info') {
    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;
    line.innerHTML = html;
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function executeCommand(cmdStr) {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    // Echo command
    appendLine(`<span class="terminal-prompt-prefix">akhil@dev:~$</span> ${cmdStr}`, 'command');

    if (COMMANDS[trimmed]) {
      const output = COMMANDS[trimmed]();
      if (output) appendLine(output);
    } else {
      appendLine(`Command not recognized: "${cmdStr}". Type <span class="command">help</span> for options.`, 'warning');
    }

    if (window.playUiSound) window.playUiSound('click');
  }

  // Handle Input Keypress
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const value = terminalInput.value;
      terminalInput.value = '';
      executeCommand(value);
    }
  });

  // Handle Quick Chips
  terminalChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        executeCommand(cmd);
      }
    });
  });
})();
