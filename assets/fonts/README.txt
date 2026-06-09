FONTS – LOKALE EINBINDUNG (DSGVO-konform)
==========================================

In diesem Ordner gehoeren die Variable-Font-Dateien:

  - sora-variable.woff2   (Display-Font, 100-900)
  - inter-variable.woff2  (Body-Font, 100-900)

WICHTIG:
- KEINE Einbindung ueber Google Fonts CDN!
- Beide Fonts liegen unter SIL Open Font License v1.1 und duerfen
  selbst gehostet werden.

Bezugsquellen:
  Sora:  https://fonts.google.com/specimen/Sora        (Download als ZIP, Variable extrahieren)
  Inter: https://rsms.me/inter/                        (Inter-Variable.woff2 direkt verfuegbar)

Dateinamen unveraendert lassen (sora-variable.woff2 / inter-variable.woff2),
da @font-face in /assets/css/base.css genau diese Pfade erwartet.

Solange die Dateien fehlen, faellt der Browser dank `font-display: swap`
und Systemschrift-Fallback (system-ui, -apple-system, sans-serif) automatisch
zurueck. Die Seite bleibt voll funktionsfaehig.
