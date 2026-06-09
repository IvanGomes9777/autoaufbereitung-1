/* ============================================================
   APEX DETAILING — hero-slider.js
   Vorher/Nachher-Slider (Pointer + Keyboard, A11y-konform)
   - kein eval / kein innerHTML mit user-input → XSS-safe
   - ES2020, kein Framework
   ============================================================ */
(() => {
  'use strict';

  const slider = document.querySelector('[data-slider]');
  if (!slider) return;

  const handle = slider.querySelector('[data-handle]');
  if (!handle) return;

  const STEP = 2;            // % je Tastendruck
  const STEP_LARGE = 10;     // % je PageUp/PageDown
  const MIN = 0;
  const MAX = 100;

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
    const x = clientX - rect.left;
    return (x / rect.width) * 100;
  };

  /* ---------- POINTER (Maus + Touch + Stift vereinheitlicht) ---------- */
  const onPointerDown = (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    activePointerId = event.pointerId;
    handle.setPointerCapture(activePointerId);
    setPosition(positionFromEvent(event.clientX));
    event.preventDefault();
  };

  const onPointerMove = (event) => {
    if (activePointerId !== event.pointerId) return;
    setPosition(positionFromEvent(event.clientX));
  };

  const onPointerUp = (event) => {
    if (activePointerId !== event.pointerId) return;
    try { handle.releasePointerCapture(activePointerId); } catch (_) { /* noop */ }
    activePointerId = null;
  };

  handle.addEventListener('pointerdown', onPointerDown);
  handle.addEventListener('pointermove', onPointerMove);
  handle.addEventListener('pointerup', onPointerUp);
  handle.addEventListener('pointercancel', onPointerUp);

  /* Klick auf den Slider-Hintergrund springt zur Position */
  slider.addEventListener('pointerdown', (event) => {
    if (event.target === handle || handle.contains(event.target)) return;
    if (event.button !== undefined && event.button !== 0) return;
    setPosition(positionFromEvent(event.clientX));
    handle.focus({ preventScroll: true });
  });

  /* ---------- KEYBOARD (A11y) ---------- */
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

  /* ---------- INIT ---------- */
  setPosition(50);
})();
