# Changelog

All notable changes to this project will be documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

## [0.1.0.0] - 2026-05-22

### Added
- Complete personal portfolio page with hero, about, skills, experience, projects, and contact sections
- Terminal dark aesthetic with #00ff88 green accent and JetBrains Mono font
- tsParticles 2.12.0 animated network background in hero section
- Typed.js 2.1.0 typewriter effect cycling through DevOps/Platform/Systems roles
- GSAP 3.12.5 + ScrollTrigger scroll-reveal animations on all six sections
- ScrollSpy active nav highlighting via IntersectionObserver
- Hamburger mobile menu with accessible overlay dialog
- Async Formspree contact form with success/error states
- Playwright e2e test suite: 48 tests covering sections, nav, scrollspy, contact form, accessibility, and responsive layout
- GitHub Actions CI workflow running Playwright tests on push/PR
- Semantic HTML with full ARIA landmark structure, sr-only labels, and aria-labelledby bindings
- CDN resource hints: preconnect for Google Fonts and jsDelivr, defer on all scripts
- tsParticles performance config: fpsLimit 60, pauseOnBlur, pauseOnOutsideViewport
