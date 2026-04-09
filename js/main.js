/* ── main.js ── */

/* ═══════════════════════════════════════
   1. SCROLL REVEAL
   Watches .reveal elements and adds
   .visible when they enter the viewport.
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
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
})();


/* ═══════════════════════════════════════
   2. SKILL BAR ANIMATION
   Animates skill bars when the skills
   section scrolls into view.
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
        // Small delay so the section reveal animation fires first
        setTimeout(animateBars, 300);
        observer.disconnect();
      }
    },
    { threshold: 0.2 }
  );

  observer.observe(skillsSection);
})();


/* ═══════════════════════════════════════
   3. MOBILE NAV HAMBURGER
   Toggles .open on the hamburger button
   and the nav links list.
═══════════════════════════════════════ */
(function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
})();


/* ═══════════════════════════════════════
   4. ACTIVE NAV HIGHLIGHT
   Highlights the nav link matching
   whichever section is currently visible.
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
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
})();


/* ═══════════════════════════════════════
   5. CONTACT FORM — SEND BUTTON
   Shows a "Sent!" confirmation state
   when the button is clicked.
   (No real email sending — wire up
    a service like Formspree or EmailJS
    when you're ready to go live.)
═══════════════════════════════════════ */
(function initContactForm() {
  const btn = document.getElementById('submit-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const name    = document.getElementById('name')?.value.trim();
    const email   = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!name || !email || !message) {
      // Simple validation: shake the empty fields
      [
        { id: 'name',    val: name },
        { id: 'email',   val: email },
        { id: 'message', val: message },
      ].forEach(({ id, val }) => {
        if (!val) {
          const el = document.getElementById(id);
          if (el) {
            el.style.borderColor = '#e05c3a';
            el.addEventListener(
              'input',
              () => { el.style.borderColor = ''; },
              { once: true }
            );
          }
        }
      });
      return;
    }

    // Success state
    btn.textContent = 'Sent! ✓';
    btn.classList.add('sent');
    btn.disabled = true;

    // Reset after 3 seconds
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.classList.remove('sent');
      btn.disabled = false;
      document.getElementById('name').value    = '';
      document.getElementById('email').value   = '';
      document.getElementById('message').value = '';
    }, 3000);
  });
})();


/* ═══════════════════════════════════════
   6. SMOOTH SCROLL (fallback for
   browsers that ignore CSS scroll-behavior)
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
