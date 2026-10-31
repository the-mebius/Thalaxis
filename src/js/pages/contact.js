import { initSmoothScroll, setActiveNavLink, initMobileMenu, respectReducedMotion, updateCopyrightYear, initThemeSystem } from '../utils.js';

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  setActiveNavLink();
  initMobileMenu();
  respectReducedMotion();
  updateCopyrightYear();
  initThemeSystem();

  // Check URL search params for product pre-selection
  const params = new URLSearchParams(window.location.search);
  const productSlug = params.get('product');
  if (productSlug) {
    const select = document.getElementById('enquiry-type');
    if (select) {
      if (productSlug.includes('tx-3000')) select.value = 'tx-3000';
      else if (productSlug.includes('ex-6000')) select.value = 'ex-6000';
    }
  }

  // Form validation and submission adapter
  const form = document.getElementById('contact-form');
  const successAlert = document.getElementById('form-success-alert');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset errors
    document.querySelectorAll('.form-error').forEach(el => el.style.display = 'none');

    let isValid = true;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const organization = document.getElementById('organization').value.trim();
    const type = document.getElementById('enquiry-type').value;
    const message = document.getElementById('message').value.trim();
    const consent = document.getElementById('consent').checked;

    if (!name) {
      document.getElementById('error-name').style.display = 'block';
      isValid = false;
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
      document.getElementById('error-email').style.display = 'block';
      isValid = false;
    }

    if (!phone) {
      document.getElementById('error-number').style.display = 'block';
      isValid = false;
    }

    if (!type) {
      document.getElementById('error-type').style.display = 'block';
      isValid = false;
    }

    if (!message) {
      document.getElementById('error-message').style.display = 'block';
      isValid = false;
    }

    if (!consent) {
      document.getElementById('error-consent').style.display = 'block';
      isValid = false;
    }

    if (!isValid) return;

    // Disable button while sending
    const originalBtnText = submitBtn.innerText;
    submitBtn.disabled = true;
    submitBtn.innerText = 'Sending...';

    try {
      const response = await fetch('https://formspree.io/f/xjyyaywg', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          _replyto: email,
          phone,
          organization,
          enquiryType: type,
          message
        })
      });

      if (response.ok) {
        successAlert.style.display = 'block';
        form.reset();
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Network error. Please try again later.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerText = originalBtnText;
    }
  });
});
