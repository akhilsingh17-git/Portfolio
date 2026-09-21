/**
 * Awwwards-Quality Fluid Magnetic Custom Cursor
 * Akhil Kumar Singh — Portfolio
 */

(function () {
  // Disable on touch devices
  if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 1024) {
    return;
  }

  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  const ringText = ring ? ring.querySelector('span') : null;

  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let isMoving = false;

  // Track real mouse position
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMoving = true;

    // Direct dot translation
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  // Lerp animation loop for smooth trailing ring
  function renderCursor() {
    // Lerp factor
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;

    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;

    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Mouse leave / enter window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });

  // Interactive Hover Targets
  const setupHoverTargets = () => {
    // Standard links, buttons, and inputs
    const hoverElements = document.querySelectorAll('a, button, input, textarea, .tab-btn, .clickable');
    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });

    // Special Explore / Project Cards
    const exploreElements = document.querySelectorAll('[data-cursor="explore"], .project-card');
    exploreElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-explore');
        if (ringText) ringText.textContent = el.getAttribute('data-cursor-text') || 'VIEW';
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-explore');
        if (ringText) ringText.textContent = '';
      });
    });
  };

  // Run on load and whenever DOM updates
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupHoverTargets);
  } else {
    setupHoverTargets();
  }
})();
