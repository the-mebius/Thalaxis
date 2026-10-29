// Thalaxis Technology — Utilities
// Shared helper functions

/**
 * Smooth scroll to element with offset for fixed header
 * @param {string} selector - CSS selector for target element
 */
export function smoothScrollTo(selector) {
  const target = document.querySelector(selector);
  if (!target) return;

  const headerHeight = 80;
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  });
}

/**
 * Set up smooth scroll for anchor links
 */
export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      smoothScrollTo(href);
    });
  });
}

/**
 * Highlight active navigation link based on current page
 */
export function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/**
 * Mobile menu toggle functionality
 */
export function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav-primary');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isActive = toggle.classList.contains('active');

    if (isActive) {
      toggle.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      toggle.classList.add('active');
      nav.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });

  // Close menu when clicking nav link
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.classList.contains('active')) {
      toggle.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/**
 * Intersection Observer for entrance animations
 * @param {string} selector - CSS selector for elements to observe
 * @param {Object} options - IntersectionObserver options
 */
export function initEntranceAnimations(selector, options = {}) {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px',
  };

  const observerOptions = { ...defaultOptions, ...options };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll(selector).forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
  });
}

/**
 * Disable animations for users who prefer reduced motion
 */
export function respectReducedMotion() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(element => {
      element.style.animation = 'none';
      element.style.transition = 'none';
    });
  }
}

/**
 * Simple accordion functionality
 */
export function initAccordion() {
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const isActive = item.classList.contains('active');

      // Close all other items (optional: remove to allow multiple open)
      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current item
      item.classList.toggle('active', !isActive);
    });
  });
}

/**
 * Modal functionality
 * @param {string} modalId - Modal element ID
 * @param {string} triggerSelector - CSS selector for trigger buttons
 */
export function initModal(modalId, triggerSelector) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close');
  const triggers = document.querySelectorAll(triggerSelector);

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggers.forEach(trigger => {
    trigger.addEventListener('click', openModal);
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  return { openModal, closeModal };
}

/**
 * Format date to readable string
 * @param {string} isoDate - ISO date string
 * @returns {string}
 */
export function formatDate(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function}
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Get current year for copyright
 * @returns {number}
 */
export function getCurrentYear() {
  return new Date().getFullYear();
}

/**
 * Update copyright year in footer
 */
export function updateCopyrightYear() {
  const copyrightElement = document.querySelector('.footer-copy');
  if (copyrightElement) {
    const year = getCurrentYear();
    copyrightElement.textContent = `© ${year} Thalaxis Technology`;
  }
}

/**
 * Initialize theme system (dark / light mode with toggle and first-load modal popup)
 */
export function initThemeSystem() {
  const root = document.documentElement;
  const toggleBtn = document.getElementById('theme-toggle');
  const modal = document.getElementById('theme-popup-modal');
  const chooseDark = document.getElementById('choose-dark-mode');
  const chooseLight = document.getElementById('choose-light-mode');

  // Check stored theme or system preference
  const storedTheme = localStorage.getItem('thalaxis_theme');

  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('thalaxis_theme', 'light');
    } else if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('thalaxis_theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
      localStorage.removeItem('thalaxis_theme');
    }
  }

  if (storedTheme) {
    applyTheme(storedTheme);
    if (modal) {
      modal.style.display = 'none';
    }
  } else if (modal) {
    // Show first-load popup modal if no theme chosen yet
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (chooseDark) {
      chooseDark.addEventListener('click', () => {
        applyTheme('dark');
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    if (chooseLight) {
      chooseLight.addEventListener('click', () => {
        applyTheme('light');
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme');
      if (currentTheme === 'light') {
        applyTheme('dark');
      } else {
        applyTheme('light');
      }
    });
  }
}