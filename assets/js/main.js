// ============================================================
// PARTICLES — animated network background in hero
// ============================================================
tsParticles.load('particles', {
  background: { color: { value: 'transparent' } },
  particles: {
    number: { value: 60, density: { enable: true, area: 800 } },
    color: { value: '#00ff88' },
    opacity: { value: 0.35 },
    size: { value: { min: 1, max: 2 } },
    links: {
      enable: true,
      color: '#00ff88',
      opacity: 0.1,
      distance: 130,
    },
    move: { enable: true, speed: 0.6, outModes: 'bounce' },
  },
  interactivity: {
    events: { onHover: { enable: true, mode: 'grab' } },
    modes: { grab: { distance: 150, links: { opacity: 0.25 } } },
  },
  detectRetina: true,
});

// ============================================================
// TYPEWRITER — role title cycles through three strings
// ============================================================
new Typed('#typed', {
  strings: ['DevOps Engineer', 'Platform Engineer', 'Systems Developer'],
  typeSpeed: 60,
  backSpeed: 30,
  backDelay: 2000,
  loop: true,
  showCursor: false,
});

// ============================================================
// GSAP SCROLL ANIMATIONS
// ============================================================
gsap.registerPlugin(ScrollTrigger);

gsap.from('#about .about-bio', {
  scrollTrigger: { trigger: '#about', start: 'top 80%' },
  opacity: 0, y: 24, duration: 0.7, ease: 'power2.out',
});

gsap.from('#about .stat', {
  scrollTrigger: { trigger: '#about .about-stats', start: 'top 85%' },
  opacity: 0, y: 16, stagger: 0.1, duration: 0.5, ease: 'power2.out',
});

gsap.from('#skills .skill-group', {
  scrollTrigger: { trigger: '#skills', start: 'top 80%' },
  opacity: 0, y: 16, stagger: 0.12, duration: 0.5, ease: 'power2.out',
});

gsap.from('#experience .timeline-entry', {
  scrollTrigger: { trigger: '#experience', start: 'top 80%' },
  opacity: 0, x: -24, stagger: 0.15, duration: 0.6, ease: 'power2.out',
});

gsap.from('#projects .project-card', {
  scrollTrigger: { trigger: '#projects', start: 'top 80%' },
  opacity: 0, y: 20, stagger: 0.1, duration: 0.5, ease: 'power2.out',
});

gsap.from('#contact .contact-grid', {
  scrollTrigger: { trigger: '#contact', start: 'top 80%' },
  opacity: 0, y: 20, duration: 0.7, ease: 'power2.out',
});

// ============================================================
// SCROLLSPY — highlight active nav link as user scrolls
// ============================================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const scrollSpy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) =>
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`)
        );
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((section) => scrollSpy.observe(section));

// ============================================================
// HAMBURGER MENU
// ============================================================
const hamburger = document.querySelector('.hamburger');
const overlay   = document.querySelector('.nav-overlay');
const overlayClose = document.querySelector('.nav-overlay-close');

function closeMenu() {
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  overlay.classList.remove('open');
}

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(open));
  overlay.classList.toggle('open', open);
});

overlayClose.addEventListener('click', closeMenu);

document.querySelectorAll('.nav-overlay a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

// ============================================================
// CONTACT FORM — async Formspree submission
// ============================================================
const form   = document.querySelector('.contact-form');
const status = document.querySelector('.form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.textContent = 'sending...';
  status.className = 'form-status';

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      status.textContent = 'done. message sent.';
      status.className = 'form-status form-status--success';
      form.reset();
    } else {
      throw new Error('non-ok response');
    }
  } catch {
    status.textContent = 'something went wrong. try emailing directly.';
    status.className = 'form-status form-status--error';
  }
});
