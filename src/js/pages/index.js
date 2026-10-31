import {
      initSmoothScroll,
      setActiveNavLink,
      initMobileMenu,
      respectReducedMotion,
      updateCopyrightYear,
      initThemeSystem
    } from '../utils.js';

    document.addEventListener('DOMContentLoaded', () => {
      initSmoothScroll();
      setActiveNavLink();
      initMobileMenu();
      respectReducedMotion();
      updateCopyrightYear();
      initThemeSystem();

      // Video Mute/Unmute control
      const video = document.getElementById('hero-video-el');
      const muteBtn = document.getElementById('video-mute-toggle');
      const muteIcon = document.getElementById('mute-icon');
      const muteText = document.getElementById('mute-text');

      if (video && muteBtn) {
        muteBtn.addEventListener('click', () => {
          video.muted = !video.muted;
          if (video.muted) {
            muteIcon.textContent = '🔇';
            muteText.textContent = 'Unmute Video';
          } else {
            muteIcon.textContent = '🔊';
            muteText.textContent = 'Mute Video';
          }
        });
      }
    });