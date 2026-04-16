/* ============================================================
   main.js — Portfolio Script
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar: add bg on scroll ───────────────────────────── */
  const nav = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const themeToggle = document.getElementById('theme-toggle');
  const heroAvatar = document.getElementById('hero-avatar');

  const setAvatarTheme = theme => {
    if (heroAvatar) {
      const nextSrc = theme === 'light' ? heroAvatar.dataset.light : heroAvatar.dataset.dark;
      if (nextSrc) heroAvatar.src = nextSrc;
    }
  };

  const applyTheme = theme => {
    document.body.classList.toggle('light-mode', theme === 'light');
    document.body.classList.toggle('dark-mode', theme === 'dark');
    setAvatarTheme(theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    }
  };

  const storedTheme = localStorage.getItem('theme');
  const initialTheme = storedTheme || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
      applyTheme(nextTheme);
      localStorage.setItem('theme', nextTheme);
    });
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        if (nav.classList.contains('nav-open')) {
          nav.classList.remove('nav-open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });


  /* ── AOS — Animate On Scroll ────────────────────────────── */
  if (window.AOS) {
    AOS.init({
      once:     true,
      duration: 700,
      easing:   'ease-out-cubic',
      offset:   60,
    });
  }


  /* ── Typed.js — Hero typewriter ─────────────────────────── */
  if (window.Typed) {
    new Typed('#typed-text', {
      strings: [
        'AI-first products with real business impact.',
        'From trained model to production-ready solution.',
        'Data science workflows for smarter insights.',
        'Bringing models, data, and design together.',
      ],
      typeSpeed:  45,
      backSpeed:  25,
      backDelay:  2200,
      loop:       true,
    });
  }


  /* ── Vanilla Tilt — Avatar 3D parallax ──────────────────── */
  if (window.VanillaTilt) {
    VanillaTilt.init(document.getElementById('avatar-tilt'), {
      max:        10,
      speed:      600,
      glare:      true,
      'max-glare': 0.12,
    });
  }


  /* ── Animated Counters ──────────────────────────────────── */
  const counters = document.querySelectorAll('[data-count]');

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el  = entry.target;
      const end = Number(el.dataset.count);
      let   cur = 0;
      const step  = end / 50;

      const timer = setInterval(() => {
        cur = Math.min(cur + step, end);
        el.textContent = Math.floor(cur);
        if (cur >= end) clearInterval(timer);
      }, 30);

      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  /* ── Resume Overlay ─────────────────────────────────────── */
  const resumeOpenBtn = document.getElementById('resume-open-btn');
  const resumeOverlay = document.getElementById('resume-overlay');
  const resumeOverlayClose = document.getElementById('resume-overlay-close');
  const resumeOverlayBackdrop = document.querySelector('.resume-overlay-backdrop');

  const setResumeOverlayVisible = visible => {
    if (!resumeOverlay) return;
    resumeOverlay.classList.toggle('open', visible);
    resumeOverlay.setAttribute('aria-hidden', visible ? 'false' : 'true');
    document.body.style.overflow = visible ? 'hidden' : '';
  };

  if (resumeOpenBtn) {
    resumeOpenBtn.addEventListener('click', () => {
      setResumeOverlayVisible(true);
    });
  }

  [resumeOverlayClose, resumeOverlayBackdrop].forEach(element => {
    if (element) {
      element.addEventListener('click', () => setResumeOverlayVisible(false));
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && resumeOverlay && resumeOverlay.classList.contains('open')) {
      setResumeOverlayVisible(false);
    }
  });

});