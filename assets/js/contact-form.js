/* ============================================================
   APEX DETAILING — contact-form.js
   Foto-Upload: Drag&Drop, Type/Size-Whitelist, Preview, Remove
   Form-Submit: HTML5-Validierung + Honeypot + Status-Feedback
   - Kein innerHTML mit User-Input -> XSS-safe
   - URL.createObjectURL wird sauber via revokeObjectURL freigegeben
   ============================================================ */
(() => {
  'use strict';

  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
  const MAX_FILES = 5;
  const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB pro Datei

  const dropZone = form.querySelector('[data-drop]');
  const fileInput = form.querySelector('[data-file-input]');
  const preview = form.querySelector('[data-preview]');
  const status = form.querySelector('[data-status]');
  const honeypot = form.querySelector('[data-honeypot]');

  /** @type {Array<{file: File, url: string}>} */
  let files = [];

  /* ---------- STATUS MESSAGE ---------- */
  const setStatus = (msg, type) => {
    if (!status) return;
    status.textContent = msg || '';
    status.classList.remove('is-success', 'is-error');
    if (type) status.classList.add(type === 'success' ? 'is-success' : 'is-error');
  };

  /* ---------- PREVIEW RENDER ---------- */
  const renderPreview = () => {
    if (!preview) return;
    preview.textContent = ''; // clear safely

    files.forEach((entry, index) => {
      const li = document.createElement('li');
      li.className = 'field-upload__item';

      const img = document.createElement('img');
      img.src = entry.url;
      img.alt = `Vorschau ${index + 1}: ${entry.file.name}`;
      img.loading = 'lazy';

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'field-upload__remove';
      remove.setAttribute('aria-label', `Bild ${index + 1} entfernen`);
      remove.textContent = '×';
      remove.addEventListener('click', () => removeFile(index));

      li.append(img, remove);
      preview.appendChild(li);
    });
  };

  const removeFile = (index) => {
    const entry = files[index];
    if (entry) URL.revokeObjectURL(entry.url);
    files.splice(index, 1);
    renderPreview();
    syncInputFiles();
  };

  /* ---------- VALIDATE + ADD ---------- */
  const addFiles = (incoming) => {
    const errors = [];
    for (const file of incoming) {
      if (files.length >= MAX_FILES) {
        errors.push(`Maximal ${MAX_FILES} Bilder erlaubt.`);
        break;
      }
      if (!ALLOWED_TYPES.has(file.type)) {
        errors.push(`${file.name}: nur JPG, PNG oder WEBP.`);
        continue;
      }
      if (file.size > MAX_SIZE_BYTES) {
        errors.push(`${file.name}: maximal 5 MB pro Datei.`);
        continue;
      }
      files.push({ file, url: URL.createObjectURL(file) });
    }
    renderPreview();
    syncInputFiles();
    if (errors.length) setStatus(errors.join(' '), 'error');
    else setStatus('', null);
  };

  /* DataTransfer-Trick: input.files mit unserer Liste synchron halten,
     damit die nativen form-data den Stand widerspiegeln */
  const syncInputFiles = () => {
    if (!fileInput) return;
    try {
      const dt = new DataTransfer();
      files.forEach((entry) => dt.items.add(entry.file));
      fileInput.files = dt.files;
    } catch (_) { /* einige Browser werfen, harmlos */ }
  };

  /* ---------- FILE INPUT ---------- */
  if (fileInput) {
    fileInput.addEventListener('change', (event) => {
      const list = event.target.files;
      if (list && list.length) addFiles(Array.from(list));
    });
  }

  /* ---------- DRAG & DROP ---------- */
  if (dropZone) {
    ['dragenter', 'dragover'].forEach((evt) => {
      dropZone.addEventListener(evt, (e) => {
        e.preventDefault();
        dropZone.classList.add('is-drag');
      });
    });
    ['dragleave', 'drop'].forEach((evt) => {
      dropZone.addEventListener(evt, (e) => {
        e.preventDefault();
        dropZone.classList.remove('is-drag');
      });
    });
    dropZone.addEventListener('drop', (e) => {
      const list = e.dataTransfer && e.dataTransfer.files;
      if (list && list.length) addFiles(Array.from(list));
    });
  }

  /* ---------- SUBMIT ---------- */
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    /* Honeypot-Check */
    if (honeypot && honeypot.value.trim() !== '') {
      // still pretend success – Bots merken nichts
      setStatus('Vielen Dank! Wir melden uns innerhalb von 24 Stunden.', 'success');
      return;
    }

    /* Native HTML5-Validierung greift bereits */
    if (!form.checkValidity()) {
      setStatus('Bitte fülle alle Pflichtfelder korrekt aus.', 'error');
      form.reportValidity();
      return;
    }

    /* Floating-Label fix: leere Felder zurücksetzen */
    setStatus('Vielen Dank! Wir melden uns innerhalb von 24 Stunden mit deinem Angebot.', 'success');

    // Saubere Ressourcen-Freigabe
    files.forEach((entry) => URL.revokeObjectURL(entry.url));
    files = [];
    renderPreview();
    form.reset();

    /* TODO Production: an Backend / Mail-Service uebergeben (FormData) */
  });

  /* ---------- FLOATING-LABEL: Select initial check ---------- */
  form.querySelectorAll('.field__select').forEach((sel) => {
    const wrap = sel.closest('.field');
    const sync = () => wrap && wrap.classList.toggle('field--filled', sel.value !== '');
    sel.addEventListener('change', sync);
    sync();
  });
})();
