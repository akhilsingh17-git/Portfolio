/**
 * Floating Dock Navigation & Scrollspy
 * Akhil Kumar Singh — Portfolio
 */

(function () {
  const dock = document.querySelector('.dock-container');
  const dockLinks = document.querySelectorAll('.dock-nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.querySelector('.mobile-drawer-close');
  const drawerLinks = document.querySelectorAll('.mobile-drawer-link');

  // Scrollspy via IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -50% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        dockLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  // Smooth scroll click handler
  dockLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
          if (window.playUiSound) window.playUiSound('click');
        }
      }
    });
  });

  // Mobile Drawer Toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (window.playUiSound) window.playUiSound('click');
    });

    const closeDrawer = () => {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (drawerClose) {
      drawerClose.addEventListener('click', closeDrawer);
    }

    drawerLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        closeDrawer();
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) {
          e.preventDefault();
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            setTimeout(() => {
              targetEl.scrollIntoView({ behavior: 'smooth' });
            }, 150);
          }
        }
      });
    });
  }

  // Header Dock elevation on scroll
  window.addEventListener('scroll', () => {
    if (dock) {
      if (window.scrollY > 60) {
        dock.style.boxShadow = 'var(--shadow-lg), 0 0 25px rgba(0,0,0,0.3)';
        dock.style.borderColor = 'var(--border-hover)';
      } else {
        dock.style.boxShadow = '';
        dock.style.borderColor = '';
      }
    }
  });
})();
