/* ── main.js ── */

/* ═══════════════════════════════════════
   1. PAGE LOADER
═══════════════════════════════════════ */
(function initLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      loader.addEventListener('transitionend', () => loader.remove(), { once: true });
    }, 300);
  });
})();


/* ═══════════════════════════════════════
   2. SCROLL REVEAL
═══════════════════════════════════════ */
(function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
})();


/* ═══════════════════════════════════════
   3. SKILL BAR ANIMATION
═══════════════════════════════════════ */
(function initSkillBars() {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;
  const animateBars = () => {
    document.querySelectorAll('.skill-bar-fill').forEach((fill) => {
      fill.classList.add('animated');
    });
  };
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(animateBars, 300);
        observer.disconnect();
      }
    },
    { threshold: 0.2 }
  );
  observer.observe(skillsSection);
})();


/* ═══════════════════════════════════════
   4. MOBILE NAV HAMBURGER
═══════════════════════════════════════ */
(function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
})();


/* ═══════════════════════════════════════
   5. ACTIVE NAV HIGHLIGHT
═══════════════════════════════════════ */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          links.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach((section) => observer.observe(section));
})();


/* ═══════════════════════════════════════
   6. BACK TO TOP BUTTON
═══════════════════════════════════════ */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ═══════════════════════════════════════
   7. CONTACT FORM — FORMSPREE

   HOW TO ACTIVATE:
   1. Go to https://formspree.io and sign up (free)
   2. Create a new form — you'll get an ID like "xyzabcde"
   3. Replace YOUR_FORMSPREE_ID below with that ID
═══════════════════════════════════════ */
(function initContactForm() {
  const btn       = document.getElementById('submit-btn');
  const statusEl  = document.getElementById('form-status');
  const FORM_ID   = 'YOUR_FORMSPREE_ID'; // <- replace with your actual ID

  if (!btn) return;

  const nameEl    = document.getElementById('name');
  const emailEl   = document.getElementById('email');
  const messageEl = document.getElementById('message');

  function setStatus(msg, isError) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = 'form-status' + (isError ? ' error' : '');
  }

  function highlightField(el) {
    el.style.borderColor = '#e05c3a';
    el.addEventListener('input', () => { el.style.borderColor = ''; }, { once: true });
  }

  btn.addEventListener('click', async () => {
    const name    = nameEl?.value.trim()    || '';
    const email   = emailEl?.value.trim()   || '';
    const message = messageEl?.value.trim() || '';

    if (!name)    highlightField(nameEl);
    if (!email)   highlightField(emailEl);
    if (!message) highlightField(messageEl);
    if (!name || !email || !message) {
      setStatus('Please fill in all fields.', true);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      highlightField(emailEl);
      setStatus('Please enter a valid email address.', true);
      return;
    }

    if (FORM_ID === 'YOUR_FORMSPREE_ID') {
      setStatus('Form not wired up yet — reach out via the socials below!', true);
      return;
    }

    btn.textContent = 'Sending...';
    btn.disabled = true;
    setStatus('');

    try {
      const res = await fetch('https://formspree.io/f/' + FORM_ID, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name: name, email: email, message: message }),
      });

      if (res.ok) {
        btn.textContent = 'Sent! ✓';
        btn.classList.add('sent');
        setStatus("Message received — I'll get back to you soon.");
        nameEl.value = '';
        emailEl.value = '';
        messageEl.value = '';
        setTimeout(() => {
          btn.textContent = 'Send Message';
          btn.classList.remove('sent');
          btn.disabled = false;
          setStatus('');
        }, 4000);
      } else {
        throw new Error('bad response');
      }
    } catch (err) {
      btn.textContent = 'Failed — try again';
      btn.classList.add('error');
      setStatus('Something went wrong. Try emailing david328150@gmail.com directly.', true);
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.classList.remove('error');
        btn.disabled = false;
      }, 4000);
    }
  });
})();


/* ═══════════════════════════════════════
   8. COPY EMAIL BUTTON
═══════════════════════════════════════ */
(function initCopyEmail() {
  const btn = document.getElementById('copy-email-btn');
  if (!btn) return;

  function showCopied() {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 2000);
  }

  btn.addEventListener('click', () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('david328150@gmail.com').then(showCopied);
    } else {
      // Fallback for older browsers
      const el = document.createElement('textarea');
      el.value = 'david328150@gmail.com';
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      showCopied();
    }
  });
})();


/* ═══════════════════════════════════════
   9. FOOTER YEAR — auto-updates every year
═══════════════════════════════════════ */
(function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();


/* ═══════════════════════════════════════
   10. SMOOTH SCROLL FALLBACK
═══════════════════════════════════════ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
