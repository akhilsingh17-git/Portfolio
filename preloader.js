/**
 * High-Tech Preloader Sequence
 * Akhil Kumar Singh — Portfolio
 */

(function () {
  const preloader = document.getElementById('preloader');
  const counterEl = document.getElementById('preloader-counter');
  const barEl = document.getElementById('preloader-bar');
  const statusEl = document.getElementById('preloader-status');

  if (!preloader || !counterEl || !barEl) return;

  const statuses = [
    'BOOTING ARCHITECTURE...',
    'CONNECTING NEURAL LAYERS...',
    'INDEXING ARSENAL...',
    'SYSTEM READY'
  ];

  let progress = 0;
  let statusIndex = 0;

  const interval = setInterval(() => {
    // Accelerate smoothly
    const increment = Math.floor(Math.random() * 6) + 3;
    progress += increment;

    if (progress >= 30 && statusIndex === 0) {
      statusIndex = 1;
      if (statusEl) statusEl.textContent = statuses[1];
    } else if (progress >= 65 && statusIndex === 1) {
      statusIndex = 2;
      if (statusEl) statusEl.textContent = statuses[2];
    } else if (progress >= 95 && statusIndex === 2) {
      statusIndex = 3;
      if (statusEl) statusEl.textContent = statuses[3];
    }

    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      counterEl.textContent = '100%';
      barEl.style.width = '100%';

      setTimeout(() => {
        preloader.classList.add('fade-out');
        document.body.classList.add('loaded');

        // Trigger entrance animations
        const revealElements = document.querySelectorAll('.hero-section .reveal-up');
        revealElements.forEach(el => el.classList.add('is-revealed'));
      }, 350);
      return;
    }

    counterEl.textContent = String(progress).padStart(2, '0') + '%';
    barEl.style.width = progress + '%';
  }, 35);
})();
