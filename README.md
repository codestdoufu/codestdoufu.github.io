# David Fu — Personal Website

Portfolio site built from scratch with HTML, CSS, and vanilla JavaScript. No frameworks, no build tools, no dependencies — just clean code.

Live at: [codestdoufu.github.io/Personal-Website](https://codestdoufu.github.io/Personal-Website)

---

## Who I Am

Computer Engineering student at NYU Tandon (class of '29), based in Brooklyn. I've been building things since before it was on a resume — custom PCs for people in the neighborhood, Discord bots, Unity games, automation scripts. I reached USACO Platinum in competitive programming and qualified for the AIME two years in a row. Outside of code, I've logged 600+ volunteer hours teaching, distributing food, and supporting local communities. Bilingual in English and Mandarin.

---

## What's on the Site

- **Hero** — quick snapshot of who I am and what I've built
- **About** — the longer version, with education, competitions, and community work
- **Projects** — Creeper Discord Bot, Unity game dev, data analysis, custom PC building
- **Experience** — robotics instructor at Magikid, freelance PC builder, cybersecurity competitor, community volunteer
- **Achievements** — USACO Platinum, AIME qualifier (2023–2024), Principal's Honor Roll, cybersecurity semi-finals
- **Skills** — Python, C++, Java, C#, C, SQL, HTML, Unity, Linux, Git, and more
- **Contact** — socials + contact form (Formspree)

---

## Stack

Plain HTML, CSS, and vanilla JavaScript. That's it. No React, no Tailwind, no bundler.

CSS is split into per-section files for clarity:
```
css/
  variables.css   ← design tokens (colors, fonts, spacing)
  reset.css       ← baseline normalization
  base.css        ← shared section styles, buttons, ticker
  nav.css         ← sticky nav, hamburger, back-to-top, loader
  hero.css
  about.css
  projects.css
  experience.css
  achievements.css
  skills.css
  contact.css
  footer.css
  animations.css  ← scroll reveal, keyframes
```

---

## Setup

No build step needed. Just open `index.html` in a browser, or serve it with any static file server:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

---

## Contact Form

The contact form uses [Formspree](https://formspree.io). To activate it:

1. Sign up at formspree.io (free)
2. Create a new form and copy your form ID
3. Open `js/main.js` and replace `YOUR_FORMSPREE_ID` with your actual ID

---

## Links

- GitHub: [codestdoufu](https://github.com/codestdoufu)
- LinkedIn: [david-fu1](https://www.linkedin.com/in/david-fu1/)
- Instagram: [@codesttofu](https://www.instagram.com/codesttofu)
- Email: david328150@gmail.com
