/* ============================================================
   APEX DETAILING — counters.js
   Scroll-getriggerte Counter-Animation + Section Reveal
   - IntersectionObserver, kein Polling
   - Respektiert prefers-reduced-motion
   ============================================================ */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- TRUST-SECTION REVEAL ---------- */
  const trustSection = document.querySelector('.trust');
  if (trustSection) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          trustSection.classList.add('is-visible');
          observer.disconnect();
        }
      });
    }, { threshold: 0.35 });
    obs.observe(trustSection);
  }

  /* ---------- COUNTER ANIMATION ---------- */
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = Number(el.dataset.counter);
    if (!Number.isFinite(target)) return;

    if (reduceMotion) {
      el.textContent = String(target);
      return;
    }

    const duration = 1600;
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(target * ease(progress));
      el.textContent = String(value);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const counterObs = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((c) => counterObs.observe(c));
})();
