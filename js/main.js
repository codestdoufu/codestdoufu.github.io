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
  let animated = false;
  const animateBars = () => {
    if (animated) return;
    animated = true;
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
  sections.forEach((section) => observer.observe(section));
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
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ═══════════════════════════════════════
   8. CURSOR GLOW
   Smooth blue radial glow following the mouse.
   Skipped on touch/mobile devices.
═══════════════════════════════════════ */
(function initCursorGlow() {
  if (window.matchMedia('(hover: none)').matches) return;

  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  document.body.appendChild(glow);

  let mouseX = -999, mouseY = -999;
  let glowX  = -999, glowY  = -999;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    glow.style.opacity = '1';
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });

  function lerp(a, b, t) { return a + (b - a) * t; }

  (function animate() {
    glowX = lerp(glowX, mouseX, 0.08);
    glowY = lerp(glowY, mouseY, 0.08);
    glow.style.transform = `translate(${glowX}px, ${glowY}px)`;
    requestAnimationFrame(animate);
  })();
})();


/* ═══════════════════════════════════════
   9. CONTACT FORM — FORMSPREE

   HOW TO ACTIVATE:
   1. Go to https://formspree.io and sign up (free)
   2. Create a new form — you'll get an ID like "xyzabcde"
   3. Replace YOUR_FORMSPREE_ID below with that ID
═══════════════════════════════════════ */
(function initContactForm() {
  const btn       = document.getElementById('submit-btn');
  const statusEl  = document.getElementById('form-status');
  const FORM_ID   = 'xdapvayz';

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
        body: JSON.stringify({ name, email, message }),
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
    } catch {
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
   10. COPY EMAIL BUTTON
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
      const el = document.createElement('textarea');
      el.value = 'david328150@gmail.com';
      el.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      showCopied();
    }
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
   12. SMOOTH SCROLL FALLBACK
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


/* ═══════════════════════════════════════
   13. GITHUB ACTIVITY FEED
   Pulls recent public events from the GitHub
   API and renders them into #github-feed.
═══════════════════════════════════════ */
(function initGitHubFeed() {
  const container = document.getElementById('github-feed');
  if (!container) return;

  const USERNAME = 'codestdoufu';
  const API_URL  = `https://api.github.com/users/${USERNAME}/events/public?per_page=30`;

  const EVENT_MAP = {
    PushEvent:         { icon: '⬆', label: 'Pushed to' },
    CreateEvent:       { icon: '✦', label: 'Created' },
    WatchEvent:        { icon: '★', label: 'Starred' },
    ForkEvent:         { icon: '⑂', label: 'Forked' },
    IssuesEvent:       { icon: '◉', label: 'Issue on' },
    PullRequestEvent:  { icon: '⇄', label: 'Pull request on' },
    IssueCommentEvent: { icon: '◎', label: 'Commented on' },
    DeleteEvent:       { icon: '✕', label: 'Deleted from' },
    PublicEvent:       { icon: '◆', label: 'Made public' },
    ReleaseEvent:      { icon: '⬡', label: 'Released on' },
  };

  function timeAgo(dateStr) {
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
    if (diff < 60)    return `${diff}s ago`;
    if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }

  fetch(API_URL)
    .then(r => { if (!r.ok) throw new Error(); return r.json(); })
    .then(events => {
      const seen = new Set();
      const filtered = events.filter(e => {
        const key = e.type + e.repo.name;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      }).slice(0, 6);

      if (!filtered.length) {
        container.innerHTML = '<p class="gh-empty">No recent public activity.</p>';
        return;
      }

      container.innerHTML = filtered.map(event => {
        const info    = EVENT_MAP[event.type] || { icon: '◆', label: 'Activity on' };
        const repo    = event.repo.name.replace(`${USERNAME}/`, '');
        const repoUrl = `https://github.com/${event.repo.name}`;
        const commits = event.type === 'PushEvent' && event.payload?.commits?.length
          ? `<span class="gh-commits">${event.payload.commits.length} commit${event.payload.commits.length !== 1 ? 's' : ''}</span>`
          : '';
        return `
          <div class="gh-item">
            <span class="gh-icon">${info.icon}</span>
            <div class="gh-body">
              <span class="gh-action">${info.label}</span>
              <a class="gh-repo" href="${repoUrl}" target="_blank" rel="noopener">${repo}</a>
              ${commits}
            </div>
            <span class="gh-time">${timeAgo(event.created_at)}</span>
          </div>`;
      }).join('');
    })
    .catch(() => {
      container.innerHTML = `<p class="gh-empty">View activity on <a href="https://github.com/${USERNAME}" target="_blank" rel="noopener">GitHub →</a></p>`;
    });
})();