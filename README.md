# David Fu — Personal Portfolio Website

## Folder Structure

```
david-fu-portfolio/
├── index.html          ← Main page (open this in a browser)
├── README.md           ← This file
│
├── css/
│   ├── reset.css       ← Clears browser default styles
│   ├── variables.css   ← All colors, fonts, spacing tokens
│   ├── base.css        ← Body, shared sections, buttons, ticker
│   ├── nav.css         ← Navigation bar + mobile hamburger
│   ├── hero.css        ← Hero / landing section
│   ├── about.css       ← About Me section
│   ├── projects.css    ← Projects grid
│   ├── experience.css  ← Experience timeline
│   ├── achievements.css← Achievements cards (dark section)
│   ├── skills.css      ← Skills + language strip
│   ├── contact.css     ← Contact form + social links
│   ├── footer.css      ← Footer bar
│   └── animations.css  ← Keyframes + scroll reveal
│
├── js/
│   └── main.js         ← All JavaScript (scroll reveal, nav, form, etc.)
│
└── assets/             ← Put images here if you add them later
    └── (empty for now)
```

---

## How to Run Locally (No Setup Required)

The easiest way — just open the file:

1. Download or unzip the folder onto your laptop
2. Double-click `index.html`
3. It opens in your browser. Done.

> The fonts load from Google Fonts, so you need an internet connection the first time. Once your browser caches them, it works offline too.

---

## How to Run with a Local Server (Better Option)

Opening the file directly works fine for this site, but if you ever add backend features, you'll want a local server. Here's the easiest way:

### Option A — Python (already on most Macs/Linux)
```bash
cd david-fu-portfolio
python3 -m http.server 8080
```
Then open: http://localhost:8080

### Option B — Node.js (if you have Node installed)
```bash
npx serve .
```
Then follow the link it prints.

### Option C — VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"
3. Auto-reloads every time you save a file

---

## How to Edit Things

### Change your name / bio text
→ Edit `index.html` directly. All the text content is in there.

### Change colors
→ Open `css/variables.css`. The whole color palette is at the top.  
Main colors to know:
- `--blue-accent` — the primary interactive blue (#2d7dd2)
- `--blue-deep` — darker blue used for the nav ticker (#1b4f8a)
- `--blue-darkest` — near-black blue for dark sections (#0d2b4e)
- `--cream` — page background (#f4f8fd)

### Change fonts
→ Also in `css/variables.css` — `--font-display`, `--font-sans`, `--font-ui`.  
To swap a font, change the Google Fonts link in `index.html` `<head>` too.

### Add a project
→ In `index.html`, find the `<!-- ═══ PROJECTS ═══ -->` section.  
Copy one of the `.proj-card` blocks and fill in your info.

### Add a photo of yourself
→ Put the image in the `assets/` folder.  
Then add an `<img>` tag wherever you want it in `index.html`.

### Make the contact form actually send emails
→ Sign up at https://formspree.io (free).  
They give you an endpoint URL. In `js/main.js`, find section 5 (CONTACT FORM)  
and add a `fetch()` call to that URL with your form data.

---

## How to Put This Online (Free)

### GitHub Pages (easiest, free)
1. Create a GitHub account at https://github.com
2. Create a new repository named `yourusername.github.io`
3. Upload all these files to it
4. Your site is live at `https://yourusername.github.io`

### Netlify (also free, drag & drop)
1. Go to https://netlify.com
2. Drag the entire `david-fu-portfolio` folder onto their dashboard
3. Done — they give you a free URL instantly

---

## Tech Stack

| What | Why |
|---|---|
| Plain HTML | No framework needed, works everywhere |
| Plain CSS (split into files) | Easy to edit, no build step |
| Plain JavaScript | Vanilla JS, no dependencies |
| Google Fonts | Syne + Instrument Serif + DM Sans |

No npm, no webpack, no build process. Just files.
