/**
 * Web Audio API Synthesized Micro-Sound Effects
 * Akhil Kumar Singh — Portfolio
 */

(function () {
  let audioCtx = null;
  let isSoundEnabled = false;

  const soundToggleBtns = document.querySelectorAll('.sound-toggle-btn');

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playUiSound(type = 'click') {
    if (!isSoundEnabled || !audioCtx) return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(820, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.04);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'hover') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(540, now);
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        osc.start(now);
        osc.stop(now + 0.03);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(880, now + 0.06); // A5
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        osc.start(now);
        osc.stop(now + 0.16);
      }
    } catch (e) {
      // Audio fallback
    }
  }

  // Bind sound toggle button
  soundToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      initAudio();
      isSoundEnabled = !isSoundEnabled;

      btn.classList.toggle('sound-active', isSoundEnabled);
      btn.setAttribute('aria-label', isSoundEnabled ? 'Mute sound effects' : 'Enable sound effects');

      if (isSoundEnabled) {
        playUiSound('success');
      }
    });
  });

  // Attach hover sounds to key CTA elements
  document.addEventListener('mouseover', (e) => {
    if (isSoundEnabled && e.target.closest('.btn, .dock-nav-link, .category-tag, .tab-btn')) {
      playUiSound('hover');
    }
  });

  window.playUiSound = playUiSound;
})();
