/**
 * Dark / Light Theme Engine
 * Akhil Kumar Singh — Portfolio
 */

(function () {
  const THEME_KEY = 'akhil_theme_pref';
  const htmlEl = document.documentElement;
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  // Detect initial theme
  const getStoredTheme = () => localStorage.getItem(THEME_KEY);
  const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#08090e' : '#f8fafc');
    }

    // Update toggle icons
    themeToggleBtns.forEach(btn => {
      const sunIcon = btn.querySelector('.icon-sun');
      const moonIcon = btn.querySelector('.icon-moon');
      if (sunIcon && moonIcon) {
        if (theme === 'light') {
          sunIcon.style.display = 'none';
          moonIcon.style.display = 'inline-block';
        } else {
          sunIcon.style.display = 'inline-block';
          moonIcon.style.display = 'none';
        }
      }
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    });
  }

  const initialTheme = getStoredTheme() || 'dark';
  applyTheme(initialTheme);

  // Bind click
  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);

      if (window.playUiSound) {
        window.playUiSound('click');
      }
    });
  });

  // Watch system change
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
    if (!getStoredTheme()) {
      applyTheme(e.matches ? 'light' : 'dark');
    }
  });

  window.getCurrentTheme = () => htmlEl.getAttribute('data-theme') || 'dark';
})();
