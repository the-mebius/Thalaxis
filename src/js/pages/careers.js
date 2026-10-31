import { getActiveJobs, getJobById } from '../../data/careers.js';
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

  // Render job listings
  const jobsRoot = document.getElementById('job-listings-root');
  const activeJobs = getActiveJobs();

  if (activeJobs.length === 0) {
    jobsRoot.innerHTML = `
      <div class="card" style="text-align: center; padding: var(--space-3xl);">
        <h3>No open positions at this time</h3>
        <p class="soft" style="margin: var(--space-md) auto 0;">We are always interested in connecting with experienced marine engineers and roboticists. Send your CV to <a href="mailto:info@thalaxistechnology.in" class="brand">info@thalaxistechnology.in</a>.</p>
      </div>
    `;
  } else {
    jobsRoot.innerHTML = activeJobs.map(job => `
      <article class="card" data-job-id="${job.id}">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: var(--space-lg); margin-bottom: var(--space-md); flex-wrap: wrap;">
          <div>
            <span class="badge badge-brand" style="margin-bottom: var(--space-xs); display: inline-flex;">${job.department}</span>
            <h3 style="font-size: 1.5rem; margin-bottom: var(--space-2xs);">${job.title}</h3>
            <p class="soft" style="font-size: 0.875rem;">${job.location} &bull; ${job.type}</p>
          </div>
          <button class="btn btn-primary apply-trigger-btn" data-job-id="${job.id}">Apply for Role</button>
        </div>

        <p class="soft" style="line-height: 1.7; margin-bottom: var(--space-lg);">${job.description}</p>

        <div class="stack-sm" style="border-top: 1px solid var(--color-line); padding-top: var(--space-lg);">
          <h4 style="font-size: 0.9375rem; text-transform: uppercase; letter-spacing: 0.05em;">Key Requirements</h4>
          <ul style="padding-left: 1.25rem; color: var(--color-ink-soft);" class="stack-2xs">
            ${job.requirements.map(req => `<li>${req}</li>`).join('')}
          </ul>
        </div>
      </article>
    `).join('');
  }

  // Modal logic
  const modal = document.getElementById('apply-modal');
  const modalClose = modal.querySelector('.modal-close');
  const positionTitle = document.getElementById('modal-position-title');
  const positionIdInput = document.getElementById('position-id');
  const applicationForm = document.getElementById('application-form');
  const successAlert = document.getElementById('modal-success-alert');

  document.querySelectorAll('.apply-trigger-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const jobId = btn.getAttribute('data-job-id');
      const job = getJobById(jobId);
      if (!job) return;

      positionTitle.textContent = `Apply for ${job.title}`;
      positionIdInput.value = job.id;
      successAlert.style.display = 'none';
      applicationForm.reset();
      positionIdInput.value = job.id;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Form submission adapter
  applicationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    document.querySelectorAll('.form-error').forEach(el => el.style.display = 'none');

    let isValid = true;
    const name = document.getElementById('applicant-name').value.trim();
    const email = document.getElementById('applicant-email').value.trim();
    const phone = document.getElementById('applicant-phone').value.trim();
    const resumeInput = document.getElementById('applicant-resume');
    const resume = resumeInput.files[0];

    if (!name) {
      document.getElementById('error-app-name').style.display = 'block';
      isValid = false;
    }

    if (!email || !email.includes('@')) {
      document.getElementById('error-app-email').style.display = 'block';
      isValid = false;
    }

    if (!resume) {
      document.getElementById('error-app-resume').style.display = 'block';
      isValid = false;
    }

    if (!isValid) return;

    const submitBtn = applicationForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerText;
    submitBtn.disabled = true;
    submitBtn.innerText = 'Submitting...';

    // Convert resume file to Base64 data URL so Formspree receives it reliably without multipart plan limits
    const reader = new FileReader();
    reader.readAsDataURL(resume);
    reader.onload = async function () {
      const base64Resume = reader.result;

      try {
        const response = await fetch('https://formspree.io/f/xjyyaywg', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            positionId: positionIdInput.value,
            name: name,
            _replyto: email,
            phone: phone,
            coverLetter: document.getElementById('applicant-cover').value.trim(),
            resumeFileName: resume.name,
            resumeFileType: resume.type,
            resumeFileBase64: base64Resume
          })
        });

        if (response.ok) {
          successAlert.style.display = 'block';
          applicationForm.reset();
          positionIdInput.value = positionIdInput.value;
          successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          const data = await response.json();
          alert(data.error || 'Failed to submit application. Please try again.');
        }
      } catch (error) {
        console.error('Submission error:', error);
        alert('Network error. Please try again later.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
      }
    };
    reader.onerror = function (error) {
      console.error('File reading error:', error);
      alert('Failed to read resume file. Please try again.');
      submitBtn.disabled = false;
      submitBtn.innerText = originalBtnText;
    };
  });
});
