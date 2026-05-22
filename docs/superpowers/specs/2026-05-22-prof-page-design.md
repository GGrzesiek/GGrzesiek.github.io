# Personal Professional IT Page — Design Spec

**Date:** 2026-05-22
**Status:** Approved

---

## Goal

A single-page personal website that serves as a general professional presence: attracting job opportunities, freelance/consulting clients, and building a technical reputation. The design must stand out visually while communicating credibility as a DevOps/platform engineer with C development experience.

---

## Tech Stack

| Concern | Choice | Reason |
|---|---|---|
| Framework | None — vanilla HTML/CSS/JS | Zero build complexity, full control, deploys anywhere |
| Particle background | tsParticles | Purpose-built for network/particle animations |
| Typewriter effect | Typed.js | Lightweight, battle-tested |
| Scroll animations | GSAP + ScrollTrigger | Industry-standard, smooth performance |
| Contact form backend | Formspree (free tier) | No server needed, works with static hosting |
| Hosting | GitHub Pages | Free, deploys on push to `main` |
| Domain | Namecheap `.me` (via GitHub Student Pack) | Free 1-year, professional appearance |

### File structure

```
index.html
assets/
  css/
    style.css
  js/
    main.js
```

No build step. All library dependencies loaded via CDN.

---

## Visual Identity

- **Background:** `#0f0f0f`
- **Primary accent:** `#00ff88` (green)
- **Body text:** `#e2e2e2`
- **Muted text:** `#666` / `#555`
- **Borders/dividers:** `#1e1e1e` / `#222`
- **Font — terminal elements:** JetBrains Mono (Google Fonts)
- **Font — body text:** System sans-serif stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`)
- **Nav:** Fixed top, anchor links to each section, transparent background with subtle backdrop blur

The aesthetic is "terminal dark" — monospace accents, green highlights, dark surfaces, and a network particle background in the hero. Professional but unmistakably technical. No emojis or decorative icons anywhere — visual interest comes from interactive elements, animations, and typography.

---

## Page Structure

Single scrollable page. Fixed navigation bar at the top with anchor links to all sections.

### 1. Hero (full-screen)

**Layout:** Left-aligned, terminal prompt style.

**Content:**
- Prompt line: `~/portfolio $ run --intro`
- "Initializing... ✓" confirmation line
- Name (large, bold)
- Role title with Typed.js typewriter effect cycling through: `"DevOps Engineer"`, `"Platform Engineer"`, `"Systems Developer"`
- Tagline as a comment: `# Building scalable infrastructure and systems that last`
- Two CTA buttons: `./contact.sh` (scrolls to contact) and `cat resume.pdf` (downloads CV)

**Background:** Full-screen animated particle network via tsParticles — dark canvas, green nodes, connecting lines that appear on proximity.

### 2. About

**Layout:** Text block with a stats row below.

**Content:**
- Section label: `// ABOUT_ME`
- Short bio paragraph (2–4 sentences): role, what I work on daily, the C/systems angle
- Stats row: 3 figures with labels — e.g. `3+ YRS EXP`, `10+ PROJECTS`, `5+ TECHNOLOGIES`

**Animation:** Section fades in when it enters the viewport (GSAP ScrollTrigger).

### 3. Skills

**Layout:** Grouped tag badges by category. No proficiency percentages.

**Categories (example — to be filled with real data):**
- `INFRASTRUCTURE` — Kubernetes, Docker, Terraform, Ansible, Helm
- `CLOUD` — AWS, GCP, (Azure)
- `CI/CD` — GitLab CI, GitHub Actions, ArgoCD
- `LANGUAGES` — C, Bash, Python
- `MONITORING` — Prometheus, Grafana, ELK

Each category has a small monospace label above its tag row. Primary-stack tags use green accent border; secondary/familiar tags use muted border.

**Animation:** Tag groups stagger-animate in on scroll.

### 4. Experience

**Layout:** Vertical timeline. Left border line with circular node per entry.

**Per entry:**
- Role title + company name
- Date range
- 2–3 bullet points of achievements/responsibilities (prefixed with `›`)

**Visual rule:** Current/most recent role gets green node and green title; past roles get muted node and `#e2e2e2` title.

**Animation:** Each entry slides in from the left as it enters the viewport.

### 5. Projects

**Layout:** Equal-weight grid (2 columns on desktop, 1 on mobile).

**Per card:**
- Project name (monospace, prefixed with `>` — terminal arrow, no icons or emojis)
- Short description (1–2 sentences)
- Tech tag badges (same style as skills)
- GitHub link button; optionally a live demo link

**Interaction:** Hover state — card border transitions to green glow (`box-shadow: 0 0 12px rgba(0,255,136,0.2); border-color: #00ff88`).

**Animation:** Cards fade and slide in on scroll in a staggered sequence.

### 6. Contact

**Layout:** Two-column — social links on the left, contact form on the right.

**Links column:**
- GitHub
- LinkedIn
- Email

Each link styled as a monospace row: `label → url ↗`.

**Form column:**
- Fields: Name, Email, Message
- Submit button: `send →` styled as a green terminal button
- Backend: Formspree (form `action` points to Formspree endpoint; no server required)
- Success/error states handled client-side

**Animation:** Section fades in on scroll.

---

## Navigation

Fixed top bar. Logo/name on the left. Anchor links on the right: `About · Skills · Experience · Projects · Contact`.

On mobile: hamburger menu that opens a full-screen overlay nav.

Active section highlighted in the nav as user scrolls (ScrollSpy via IntersectionObserver).

---

## Responsive Behavior

| Breakpoint | Changes |
|---|---|
| Desktop (>1024px) | Full layout as described |
| Tablet (768–1024px) | Projects grid stays 2-col; nav stays visible |
| Mobile (<768px) | Single column everywhere; hamburger nav; hero text scales down |

---

## Deployment

1. Push `index.html` + `assets/` to `main` branch of a GitHub repo named `<username>.github.io`
2. Enable GitHub Pages in repo settings (source: `main` branch, root)
3. Claim free `.me` domain via Namecheap (GitHub Student Pack)
4. Add custom domain in GitHub Pages settings; add CNAME record in Namecheap DNS

---

## Out of Scope

- Blog / articles section
- Dark/light mode toggle
- Animations that require a build pipeline (e.g., Framer Motion)
- Server-side rendering
- CMS or admin interface
