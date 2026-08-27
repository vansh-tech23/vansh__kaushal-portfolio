/**
 * VANSH KAUSHAL - PERSONAL PORTFOLIO INTERACTIVITY
 * ------------------------------------------------
 * Handles navbar scroll spy, mobile menu, CGPA animated counter,
 * expandable coursework code snippets, project modals, resume modal,
 * copy-to-clipboard, form validation, and toast notifications.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initCgpaCounter();
  initExpandableCards();
  initProjectModals();
  initCertificateModals();
  initResumeModal();
  initCopyButtons();
  initContactForm();
  initBackToTop();
});

/* ==========================================================================
   1. Navbar & Mobile Menu & Scroll Spy
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNav();
  });

  // Mobile menu toggle
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const icon = navToggle.querySelector('i');
      if (icon) {
        if (mobileNav.classList.contains('open')) {
          icon.className = 'fas fa-xmark';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });

    // Close mobile nav when clicking a link
    mobileNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        const icon = navToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  // Active section scroll spy
  function updateActiveNav() {
    const scrollPos = window.scrollY + 160;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

/* ==========================================================================
   2. Scroll Reveal Animations (Lightweight IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    reveals.forEach(el => el.classList.add('active'));
  }
}

/* ==========================================================================
   3. Animated CGPA Counter (Count up to 7.2)
   ========================================================================== */
function initCgpaCounter() {
  const counterElement = document.getElementById('cgpa-counter');
  if (!counterElement) return;

  let hasAnimated = false;
  const targetNumber = 7.2;
  const duration = 1800; // ms

  const startCounting = () => {
    const startTime = performance.now();

    function updateNumber(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Ease out cubic
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = (easeOutProgress * targetNumber).toFixed(1);

      counterElement.textContent = currentVal;

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        counterElement.textContent = targetNumber.toFixed(1);
      }
    }

    requestAnimationFrame(updateNumber);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          startCounting();
        }
      });
    }, { threshold: 0.4 });

    observer.observe(counterElement);
  } else {
    startCounting();
  }
}

/* ==========================================================================
   4. Coursework Expandable Cards
   ========================================================================== */
function initExpandableCards() {
  const expandableCards = document.querySelectorAll('.expandable-card');

  expandableCards.forEach(card => {
    const toggleBtn = card.querySelector('.expandable-toggle-btn');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
      const isExpanded = card.classList.contains('expanded');

      // Toggle state
      if (isExpanded) {
        card.classList.remove('expanded');
        toggleBtn.querySelector('.btn-text').textContent = 'View Code Snippet';
      } else {
        card.classList.add('expanded');
        toggleBtn.querySelector('.btn-text').textContent = 'Hide Code Snippet';
      }
    });
  });
}

/* ==========================================================================
   5. Project Details Modal
   ========================================================================== */
const projectData = {
  predictor: {
    title: 'Student Performance Predictor',
    category: 'Python · Machine Learning · Scikit-learn',
    overview: 'Built a student-performance prediction model using regression techniques and explored the fundamental machine-learning lifecycle from dataset preprocessing to feature scaling and model evaluation.',
    features: [
      'Data preparation & feature engineering using Pandas and NumPy',
      'Applied Linear Regression & Decision Tree models to forecast academic outcomes',
      'Evaluated accuracy using Mean Squared Error (MSE) and R² Score metrics',
      'Plotted regression trends and feature importance distributions'
    ],
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
    github: 'https://github.com/vansh-tech23'
  },
  face: {
    title: 'Face Recognition System',
    category: 'Python · OpenCV · Deep Learning',
    overview: 'Developed a real-time face-recognition and detection project utilizing computer vision libraries (OpenCV) and deep-learning techniques for accurate facial landmark extraction and identification.',
    features: [
      'Real-time webcam video stream capture and bounding box overlay',
      'Haar Cascade / Deep Learning face detector integration',
      'Facial embedding generation and distance similarity computation',
      'User-friendly graphical feedback interface'
    ],
    tech: ['Python', 'OpenCV', 'Deep Learning', 'NumPy'],
    github: 'https://github.com/vansh-tech23'
  },
  chatbot: {
    title: 'Chatbot using NLP',
    category: 'Python · Natural Language Processing',
    overview: 'Created an automated conversational agent using Python and NLP libraries to parse user intents, tokenize inputs, and deliver contextual responses for student queries and general FAQs.',
    features: [
      'Text tokenization, lemmatization, and stop-word removal pipeline',
      'Bag-of-Words and TF-IDF pattern matching for intent recognition',
      'Configurable intent schema with multi-response fallback logic',
      'Interactive command-line and expandable conversational interface'
    ],
    tech: ['Python', 'NLTK', 'NLP', 'JSON Schema'],
    github: 'https://github.com/vansh-tech23'
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-project-body');
  const modalTitle = document.getElementById('modal-project-title');
  const closeBtn = modal?.querySelector('.modal-close-btn');

  if (!modal || !modalBody) return;

  document.querySelectorAll('.open-project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectData[projectId];

      if (!data) return;

      modalTitle.textContent = data.title;
      modalBody.innerHTML = `
        <div style="margin-bottom: 1.25rem;">
          <span class="pill-tag" style="margin-bottom: 1rem;">${data.category}</span>
          <p style="color: var(--text-secondary); font-size: 1rem; line-height: 1.7; margin-bottom: 1.5rem;">
            ${data.overview}
          </p>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--text-primary);">
            <i class="fas fa-check-circle" style="color: var(--primary); margin-right: 0.4rem;"></i> Key Implementation Highlights:
          </h4>
          <ul style="list-style: none; padding-left: 0; display: flex; flex-direction: column; gap: 0.6rem;">
            ${data.features.map(f => `
              <li style="display: flex; align-items: flex-start; gap: 0.6rem; color: var(--text-secondary); font-size: 0.93rem;">
                <i class="fas fa-arrow-right" style="color: var(--primary); font-size: 0.8rem; margin-top: 0.35rem;"></i>
                <span>${f}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div style="margin-bottom: 2rem;">
          <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--text-primary);">
            <i class="fas fa-microchip" style="color: var(--primary); margin-right: 0.4rem;"></i> Technologies & Libraries:
          </h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${data.tech.map(t => `<span class="pill-tag">${t}</span>`).join('')}
          </div>
        </div>

        <div style="display: flex; gap: 1rem; justify-content: flex-end; flex-wrap: wrap; border-top: 1px solid var(--border-light); padding-top: 1.5rem;">
          <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            <i class="fab fa-github"></i> View on GitHub
          </a>
          <button class="btn btn-secondary close-modal-action">Close Details</button>
        </div>
      `;

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';

      modalBody.querySelector('.close-modal-action')?.addEventListener('click', closeModal);
    });
  });

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5.2 Certificate Details Modal
   ========================================================================== */
const certificateData = {
  python: {
    title: 'Python Data Structures & Problem Solving',
    category: 'Python',
    issuer: 'HackerRank / Coursera',
    date: 'June 2026',
    credId: 'VK-PY-DSA-2026-9482',
    image: 'assets/images/cert-python.svg',
    skills: ['Python 3', 'Data Structures', 'Algorithmic Problem Solving', 'Complexity Analysis', 'Recursion & OOP'],
    desc: 'Demonstrates proficiency in Python data structures (lists, dictionaries, trees, graphs), searching & sorting algorithms, dynamic programming, and clean modular code design.'
  },
  dbms: {
    title: 'Database Management Systems (DBMS)',
    category: 'DBMS / SQL',
    issuer: 'NPTEL / University Course',
    date: 'May 2026',
    credId: 'VK-DBMS-SQL-2026-7120',
    image: 'assets/images/cert-dbms.svg',
    skills: ['Relational DBMS', 'SQL Queries & Joins', 'ER Modeling', 'Normalization (1NF–BCNF)', 'ACID Transactions'],
    desc: 'Validates mastery in relational database design, complex SQL multi-table queries, index optimization, constraints, schema normalization, and database transaction integrity.'
  },
  cpp: {
    title: 'C++ Object-Oriented Programming Fundamentals',
    category: 'C / C++',
    issuer: 'Cisco Networking Academy',
    date: 'April 2026',
    credId: 'VK-CPP-OOP-2026-3819',
    image: 'assets/images/cert-cpp.svg',
    skills: ['C++', 'Object-Oriented Programming', 'Pointers & Memory', 'Inheritance & Polymorphism', 'STL Templates'],
    desc: 'Covers core modern C++ paradigms including memory allocation, pointer mechanics, class hierarchies, virtual functions, templates, and Standard Template Library (STL) algorithms.'
  }
};

function initCertificateModals() {
  const modal = document.getElementById('cert-modal');
  const modalBody = document.getElementById('modal-cert-body');
  const modalTitle = document.getElementById('modal-cert-title');
  const closeBtn = modal?.querySelector('.modal-close-btn');

  // View Certificate buttons
  document.querySelectorAll('.btn-view-cert').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const certKey = btn.getAttribute('data-cert');
      const data = certificateData[certKey];

      if (!data || !modal || !modalBody) return;

      modalTitle.textContent = data.title;
      modalBody.innerHTML = `
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <div style="height: 180px; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.25rem; border: 1px solid var(--border-light); background: #0f172a;">
            <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <span class="pill-tag" style="margin-bottom: 0.5rem; background: #e0e7ff; color: #4338ca; border-color: #c7d2fe;">${data.category}</span>
          <h3 style="font-size: 1.3rem; font-weight: 700; color: var(--text-primary); margin-top: 0.5rem; margin-bottom: 0.25rem;">${data.title}</h3>
          <div style="font-size: 0.95rem; color: var(--text-secondary); display: flex; align-items: center; justify-content: center; gap: 1.25rem; flex-wrap: wrap; margin-top: 0.5rem;">
            <span><i class="fas fa-building-columns" style="color: var(--primary);"></i> ${data.issuer}</span>
            <span><i class="fas fa-calendar-alt" style="color: var(--primary);"></i> ${data.date}</span>
          </div>
        </div>

        <div style="background-color: var(--bg-card-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
            <span style="font-size: 0.85rem; font-weight: 600; text-transform: uppercase; color: var(--text-muted);">Verification Status</span>
            <span style="display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.82rem; font-weight: 600; color: var(--success); background: var(--success-light); padding: 0.2rem 0.65rem; border-radius: var(--radius-pill);">
              <i class="fas fa-check-circle"></i> Verified Credential
            </span>
          </div>
          <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 0.75rem;">
            ${data.desc}
          </p>
          <div style="font-size: 0.85rem; color: var(--text-muted);">
            <strong>Candidate:</strong> Vansh Kaushal &nbsp;|&nbsp; <strong>Credential ID:</strong> <span style="font-family: var(--font-mono); color: var(--text-primary);">${data.credId}</span>
          </div>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.6rem;">Key Competencies Verified:</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
            ${data.skills.map(s => `<span class="pill-tag" style="font-size: 0.8rem;">${s}</span>`).join('')}
          </div>
        </div>

        <div style="display: flex; gap: 0.75rem; justify-content: flex-end; flex-wrap: wrap; border-top: 1px solid var(--border-light); padding-top: 1.25rem;">
          <button class="btn btn-secondary close-cert-modal-action">Close Preview</button>
        </div>
      `;

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';

      modalBody.querySelector('.close-cert-modal-action')?.addEventListener('click', closeCertModal);
    });
  });

  // "+ Add New Certificate" button handler
  document.querySelectorAll('.btn-add-cert').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Certificate upload portal ready. You can easily add new credentials anytime!', 'success');
    });
  });

  const closeCertModal = () => {
    modal?.classList.remove('open');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeCertModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeCertModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('open')) {
      closeCertModal();
    }
  });
}

/* ==========================================================================
   6. Resume Preview & Download Modal
   ========================================================================== */
function initResumeModal() {
  const modal = document.getElementById('resume-modal');
  const openBtns = document.querySelectorAll('.open-resume-btn');
  const closeBtn = modal?.querySelector('.modal-close-btn');

  if (!modal) return;

  const openModal = (e) => {
    e.preventDefault();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => btn.addEventListener('click', openModal));
  closeBtn?.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. Copy to Clipboard Utility with Toast
   ========================================================================== */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.btn-copy');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-label') || 'Text';

      if (!textToCopy) return;

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`${label} copied to clipboard!`, 'success');
        }).catch(() => fallbackCopy(textToCopy, label));
      } else {
        fallbackCopy(textToCopy, label);
      }
    });
  });

  function fallbackCopy(text, label) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(`${label} copied to clipboard!`, 'success');
    } catch (err) {
      showToast('Failed to copy text', 'error');
    }
    document.body.removeChild(textArea);
  }
}

/* ==========================================================================
   8. Client-Side Contact Form Handling
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const messageInput = document.getElementById('form-message');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate fast client-side submission
    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      submitBtn.style.backgroundColor = 'var(--success)';
      showToast('Thank you, Vansh has received your message!', 'success');
      form.reset();

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.backgroundColor = '';
        submitBtn.disabled = false;
      }, 3000);
    }, 900);
  });
}

/* ==========================================================================
   9. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   Toast Notification Function
   ========================================================================== */
function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3200);
}
