/* ============================================================
   APEX DETAILING — hero-slider.js
   Vorher/Nachher-Slider (generisch, wiederverwendbar)
   - Pointer + Keyboard + Click-to-jump
   - A11y (role=slider, aria-valuenow)
   - kein eval / kein innerHTML mit user-input → XSS-safe
   ============================================================ */
(() => {
  'use strict';

  const STEP = 2;
  const STEP_LARGE = 10;
  const MIN = 0;
  const MAX = 100;

  const initSlider = (slider) => {
    const handle = slider.querySelector('[data-handle]');
    if (!handle) return;

    let position = 50;
    let activePointerId = null;

    const setPosition = (value) => {
      const clamped = Math.max(MIN, Math.min(MAX, value));
      if (clamped === position) return;
      position = clamped;
      slider.style.setProperty('--reveal', `${clamped}%`);
      handle.setAttribute('aria-valuenow', String(Math.round(clamped)));
    };

    const positionFromEvent = (clientX) => {
      const rect = slider.getBoundingClientRect();
      if (rect.width === 0) return position;
      return ((clientX - rect.left) / rect.width) * 100;
    };

    /* Pointer auf Handle */
    handle.addEventListener('pointerdown', (event) => {
      if (event.button !== undefined && event.button !== 0) return;
      activePointerId = event.pointerId;
      handle.setPointerCapture(activePointerId);
      setPosition(positionFromEvent(event.clientX));
      event.preventDefault();
    });
    handle.addEventListener('pointermove', (event) => {
      if (activePointerId !== event.pointerId) return;
      setPosition(positionFromEvent(event.clientX));
    });
    const release = (event) => {
      if (activePointerId !== event.pointerId) return;
      try { handle.releasePointerCapture(activePointerId); } catch (_) { /* noop */ }
      activePointerId = null;
    };
    handle.addEventListener('pointerup', release);
    handle.addEventListener('pointercancel', release);

    /* Klick auf Slider-Fläche → Handle springt */
    slider.addEventListener('pointerdown', (event) => {
      if (event.target === handle || handle.contains(event.target)) return;
      if (event.button !== undefined && event.button !== 0) return;
      setPosition(positionFromEvent(event.clientX));
      handle.focus({ preventScroll: true });
    });

    /* Keyboard */
    handle.addEventListener('keydown', (event) => {
      let handled = true;
      switch (event.key) {
        case 'ArrowLeft':  setPosition(position - STEP); break;
        case 'ArrowRight': setPosition(position + STEP); break;
        case 'PageDown':   setPosition(position - STEP_LARGE); break;
        case 'PageUp':     setPosition(position + STEP_LARGE); break;
        case 'Home':       setPosition(MIN); break;
        case 'End':        setPosition(MAX); break;
        default:           handled = false;
      }
      if (handled) event.preventDefault();
    });

    setPosition(50);
  };

  document.querySelectorAll('[data-slider]').forEach(initSlider);
})();
