# 🚦 lighthouse-check.mjs

Portables Lighthouse-Audit-Tool — funktioniert in **jedem** Web-Projekt
(statisch, React, Next.js, WordPress, egal).

## Installation (einmalig pro Projekt)

```bash
npm install --save-dev lighthouse chrome-launcher
```

Wenn das Projekt kein npm hat: einfach `npm init -y` vorher.

## Datei kopieren

Lege `lighthouse-check.mjs` irgendwo ins Projekt (z. B. `tools/`).

## Nutzung

```bash
# Einzelne URL (Desktop, Standard)
node tools/lighthouse-check.mjs https://example.com

# Mehrere URLs
node tools/lighthouse-check.mjs \
  https://example.com \
  https://example.com/about \
  https://example.com/contact

# Mobile-Test (4G-Throttling)
node tools/lighthouse-check.mjs --mobile https://example.com

# Lokaler Dev-Server
node tools/lighthouse-check.mjs http://localhost:3000

# Raw JSON (für CI / Logging)
node tools/lighthouse-check.mjs --json https://example.com > report.json
```

## In package.json einbinden

```json
{
  "scripts": {
    "audit": "node tools/lighthouse-check.mjs",
    "audit:mobile": "node tools/lighthouse-check.mjs --mobile",
    "audit:prod": "node tools/lighthouse-check.mjs https://meine-domain.de"
  }
}
```

Dann:

```bash
npm run audit https://localhost:5173
npm run audit:prod
```

## Output

```
════════════════════════════════════════════════════════════════════════
  LIGHTHOUSE AUDIT   (Desktop Cable)
════════════════════════════════════════════════════════════════════════

https://example.com
  Performance:     93
  Accessibility:  100
  Best Practices: 100
  SEO:            100
  ─ Core Web Vitals ─
  FCP: 0.8 s    LCP: 1.4 s    CLS: 0
  TBT: 10 ms    Speed Index: 1.1 s
  ⚠ Top-Issues:
    · [seo] Page has structured data
    · [accessibility] Image elements have [alt] attributes
```

- **Grün** ≥ 90, **Gelb** 50–89, **Rot** < 50
- Issues sind die konkreten Audit-Punkte, die unter 100% gelandet sind
  (priorisierte Liste der nächsten Fixes)

## Warum nicht einfach Chrome DevTools nutzen?

DevTools-Lighthouse ist gut für Einzeltests, aber:
- Manuelle Klicks → nicht skripted
- Kein Multi-URL-Vergleich
- Nicht in CI/CD nutzbar

Dieses Script ist:
- ✅ Single-File, kopierbar
- ✅ Multi-URL in einem Lauf
- ✅ CI-tauglich (Exit-Code 0/1, JSON-Output)
- ✅ Headless (kein UI-Popup)

## Bekannte Fallstricke

- **Localhost mit HTTPS-Zertifikat-Warnung?** → Script ignoriert TLS-Fehler nicht
  by default. Erweitere `chromeFlags` mit `'--ignore-certificate-errors'`.
- **Single-Page-App ohne SSR?** → Mobile-Score wird niedriger sein (CPU-Throttling).
  Das ist realistisches Verhalten auf Mobile-Geräten.
- **Erste Messung schwankt** → Lauf 3× hintereinander für stabilen Mittelwert.
