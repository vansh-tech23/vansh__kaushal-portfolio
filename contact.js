/**
 * VANSH KAUSHAL - DEVELOPER PORTFOLIO
 * Contact Form Interaction & Copy-to-Clipboard Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  // Toast Helper
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, icon = 'fas fa-check-circle', duration = 3500) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="${icon} text-cyan"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // Copy Buttons
  const copyButtons = document.querySelectorAll('.copy-btn[data-copy]');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-label') || 'Text';

      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(`${label} copied to clipboard!`, 'fas fa-clipboard-check');
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`${label} copied to clipboard!`, 'fas fa-clipboard-check');
      }
    });
  });

  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const subjectInput = document.getElementById('form-subject');
      const messageInput = document.getElementById('form-message');

      if (!nameInput?.value.trim()) {
        showToast('Please enter your name.', 'fas fa-triangle-exclamation');
        nameInput?.focus();
        return;
      }

      if (!emailInput?.value.trim() || !emailInput.value.includes('@')) {
        showToast('Please enter a valid email address.', 'fas fa-triangle-exclamation');
        emailInput?.focus();
        return;
      }

      if (!subjectInput?.value.trim()) {
        showToast('Please enter a subject.', 'fas fa-triangle-exclamation');
        subjectInput?.focus();
        return;
      }

      if (!messageInput?.value.trim()) {
        showToast('Please write your message.', 'fas fa-triangle-exclamation');
        messageInput?.focus();
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        showToast(`Thank you, ${nameInput.value}! Your message has been prepared. (Mailto client opened)`, 'fas fa-paper-plane');
        
        // Open default mail client with prepopulated message
        const mailtoUrl = `mailto:kaushalvansh089@gmail.com?subject=${encodeURIComponent(subjectInput.value)}&body=${encodeURIComponent(`Name: ${nameInput.value}\nEmail: ${emailInput.value}\n\nMessage:\n${messageInput.value}`)}`;
        window.location.href = mailtoUrl;

        contactForm.reset();
      }, 1000);
    });
  }

  window.showToast = showToast;
});
