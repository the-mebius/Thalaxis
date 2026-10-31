import {
      initSmoothScroll,
      setActiveNavLink,
      initMobileMenu,
      initAccordion,
      respectReducedMotion,
      updateCopyrightYear,
      initThemeSystem
    } from '../utils.js';

    document.addEventListener('DOMContentLoaded', () => {
      initSmoothScroll();
      setActiveNavLink();
      initMobileMenu();
      initAccordion();
      respectReducedMotion();
      updateCopyrightYear();
      initThemeSystem();
    });