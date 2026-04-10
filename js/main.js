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
   Bars use --fill-width CSS custom property.
   .animated triggers the width transition.
═══════════════════════════════════════ */
(function initSkillBars() {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;
  let animated = false;
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        if (animated) return;
        animated = true;
        setTimeout(() => {
          document.querySelectorAll('.skill-bar-fill').forEach((fill) => {
            fill.classList.add('animated');
          });
        }, 300);
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

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
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
  sections.forEach((s) => observer.observe(s));
})();


/* ═══════════════════════════════════════
   6. NAV SCROLL SHRINK
═══════════════════════════════════════ */
(function initNavShrink() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();


/* ═══════════════════════════════════════
   7. BACK TO TOP BUTTON
═══════════════════════════════════════ */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();


/* ═══════════════════════════════════════
   8. CURSOR GLOW
   Smooth lerp-following glow, desktop only.
═══════════════════════════════════════ */
(function initCursorGlow() {
  if (window.matchMedia('(hover: none)').matches) return;

  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  document.body.appendChild(glow);

  let mx = -999, my = -999, gx = -999, gy = -999;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    glow.style.opacity = '1';
  }, { passive: true });

  document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });

  const lerp = (a, b, t) => a + (b - a) * t;
  (function tick() {
    gx = lerp(gx, mx, 0.08);
    gy = lerp(gy, my, 0.08);
    glow.style.transform = `translate(${gx}px,${gy}px)`;
    requestAnimationFrame(tick);
  })();
})();


/* ═══════════════════════════════════════
   9. CONTACT FORM — FORMSPREE
   ID: xdapvayz (active)
═══════════════════════════════════════ */
(function initContactForm() {
  const btn       = document.getElementById('submit-btn');
  const statusEl  = document.getElementById('form-status');
  const FORM_ID   = 'xdapvayz';

  if (!btn) return;

  const nameEl    = document.getElementById('name');
  const emailEl   = document.getElementById('email');
  const messageEl = document.getElementById('message');

  const setStatus = (msg, isError) => {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = 'form-status' + (isError ? ' error' : '');
  };

  const highlightField = (el) => {
    el.style.borderColor = '#e05c3a';
    el.addEventListener('input', () => { el.style.borderColor = ''; }, { once: true });
  };

  btn.addEventListener('click', async () => {
    const name    = nameEl?.value.trim()    || '';
    const email   = emailEl?.value.trim()   || '';
    const message = messageEl?.value.trim() || '';

    if (!name)    highlightField(nameEl);
    if (!email)   highlightField(emailEl);
    if (!message) highlightField(messageEl);
    if (!name || !email || !message) return setStatus('Please fill in all fields.', true);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      highlightField(emailEl);
      return setStatus('Please enter a valid email address.', true);
    }

    btn.textContent = 'Sending...';
    btn.disabled = true;
    setStatus('');

    try {
      const res = await fetch('https://formspree.io/f/' + FORM_ID, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        btn.textContent = 'Sent! ✓';
        btn.classList.add('sent');
        setStatus("Message received — I'll get back to you soon.");
        nameEl.value = emailEl.value = messageEl.value = '';
        setTimeout(() => {
          btn.textContent = 'Send Message';
          btn.classList.remove('sent');
          btn.disabled = false;
          setStatus('');
        }, 4000);
      } else throw new Error();
    } catch {
      btn.textContent = 'Failed — try again';
      btn.classList.add('error');
      setStatus('Something went wrong. Email david328150@gmail.com directly.', true);
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.classList.remove('error');
        btn.disabled = false;
      }, 4000);
    }
  });
})();


/* ═══════════════════════════════════════
   10. COPY EMAIL
   Reads from the DOM so it never gets out of sync.
═══════════════════════════════════════ */
(function initCopyEmail() {
  const btn = document.getElementById('copy-email-btn');
  if (!btn) return;

  const EMAIL = document.getElementById('contact-email')?.textContent?.trim()
              || 'david328150@gmail.com';

  const showCopied = () => {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
  };

  const fallbackCopy = () => {
    const el = Object.assign(document.createElement('textarea'), {
      value: EMAIL,
      style: 'position:fixed;opacity:0;pointer-events:none'
    });
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showCopied();
  };

  btn.addEventListener('click', () => {
    navigator.clipboard
      ? navigator.clipboard.writeText(EMAIL).then(showCopied).catch(fallbackCopy)
      : fallbackCopy();
  });
})();


/* ═══════════════════════════════════════
   11. FOOTER YEAR
═══════════════════════════════════════ */
(function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();


/* ═══════════════════════════════════════
   12. SMOOTH SCROLL
═══════════════════════════════════════ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
})();