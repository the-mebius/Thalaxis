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
    });