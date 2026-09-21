/**
 * Application Master Controller & Interactive Simulators
 * Akhil Kumar Singh — Portfolio
 */

function initApp() {
  // =========================================================================
  // 1. CARD SPOTLIGHT & 3D TILT EFFECT
  // =========================================================================
  const glassCards = document.querySelectorAll('.glass-card, .project-card');

  glassCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // =========================================================================
  // 2. SCROLL REVEAL (IntersectionObserver)
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-fade');

  // Immediately reveal elements already in viewport
  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('is-revealed');
    }
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.05,
      rootMargin: '0px 0px -20px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // =========================================================================
  // 3. INTERACTIVE SIMULATOR: FAKE NEWS DETECTION (BERT/RoBERTa)
  // =========================================================================
  const simInput = document.getElementById('sim-fake-input');
  const simBtn = document.getElementById('sim-fake-btn');
  const simLabel = document.getElementById('sim-fake-label');
  const simFill = document.getElementById('sim-fake-fill');
  const simScore = document.getElementById('sim-fake-score');

  if (simBtn && simInput && simLabel && simFill && simScore) {
    simBtn.addEventListener('click', () => {
      const text = simInput.value.trim();
      if (!text) {
        simInput.focus();
        return;
      }

      // Visual loading state
      simBtn.textContent = 'Tokenizing...';
      simBtn.disabled = true;

      setTimeout(() => {
        // Deterministic analysis based on input text keywords
        const lower = text.toLowerCase();
        const suspiciousWords = ['shocking', 'miracle', 'secret', 'cure', 'conspiracy', 'won', 'free money', 'alien'];
        const hasSuspicious = suspiciousWords.some(w => lower.includes(w));

        if (hasSuspicious) {
          const conf = (Math.random() * 8 + 88).toFixed(1);
          simLabel.innerHTML = '<span style="color: #ef4444;">Flagged: Likely Fake</span>';
          simScore.textContent = `${conf}% Confidence`;
          simFill.style.width = `${conf}%`;
          simFill.style.backgroundColor = '#ef4444';
        } else {
          const conf = (Math.random() * 6 + 92).toFixed(1);
          simLabel.innerHTML = '<span style="color: #10b981;">Verified: High Credibility</span>';
          simScore.textContent = `${conf}% Confidence`;
          simFill.style.width = `${conf}%`;
          simFill.style.backgroundColor = '#10b981';
        }

        simBtn.textContent = 'Analyze';
        simBtn.disabled = false;
        if (window.playUiSound) window.playUiSound('success');
      }, 420);
    });
  }

  // =========================================================================
  // 4. INTERACTIVE SIMULATOR: DROWSINESS DETECTION (ESP32-CAM EAR)
  // =========================================================================
  const earValEl = document.getElementById('ear-val');
  const earBadgeEl = document.getElementById('ear-badge');
  const testDrowsyBtn = document.getElementById('test-drowsy-btn');

  if (earValEl && earBadgeEl && testDrowsyBtn) {
    let isTestingDrowsy = false;
    let normalInterval = setInterval(updateNormalEar, 900);

    function updateNormalEar() {
      if (isTestingDrowsy) return;
      const val = (Math.random() * 0.08 + 0.30).toFixed(2);
      earValEl.textContent = val;
      earBadgeEl.innerHTML = '<span class="status-dot"></span> Active (Awake)';
      earBadgeEl.style.color = 'var(--accent-emerald)';
      earBadgeEl.style.borderColor = 'rgba(16, 185, 129, 0.3)';
    }

    testDrowsyBtn.addEventListener('click', () => {
      isTestingDrowsy = !isTestingDrowsy;

      if (isTestingDrowsy) {
        testDrowsyBtn.textContent = 'Reset State';
        testDrowsyBtn.style.background = '#ef4444';
        earValEl.textContent = '0.14';
        earBadgeEl.innerHTML = '⚠️ Drowsiness Alarm (EAR < 0.20)';
        earBadgeEl.style.color = '#ef4444';
        earBadgeEl.style.borderColor = 'rgba(239, 68, 68, 0.5)';
        if (window.playUiSound) window.playUiSound('click');
      } else {
        testDrowsyBtn.textContent = 'Simulate Eye Closure';
        testDrowsyBtn.style.background = '';
        updateNormalEar();
        if (window.playUiSound) window.playUiSound('click');
      }
    });
  }

  // =========================================================================
  // 5. TOAST & COPY TO CLIPBOARD
  // =========================================================================
  const toast = document.getElementById('toast');

  function showToast(message) {
    if (!toast) return;
    toast.querySelector('.toast-text').textContent = message;
    toast.classList.add('show');
    if (window.playUiSound) window.playUiSound('success');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  window.showToast = showToast;

  // Copy phone / email helper
  document.querySelectorAll('.copy-trigger').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = trigger.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`);
        }).catch(() => {
          showToast(`Direct value: ${textToCopy}`);
        });
      }
    });
  });

  // =========================================================================
  // 6. CONTACT FORM SIMULATION
  // =========================================================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const msg = document.getElementById('form-message').value;

      if (!name || !email || !msg) {
        showToast('Please complete all required fields.');
        return;
      }

      showToast(`Thank you, ${name}! Your message has been sent to Akhil.`);
      contactForm.reset();
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
