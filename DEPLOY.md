# 🚀 Deployment-Guide

Diese Website ist eine **statische Seite** (HTML/CSS/Vanilla-JS, kein Build-Step).
Sie kann auf jedem statischen Hoster laufen — empfohlen: **Vercel** (kostenlos für
diesen Use-Case, HTTPS automatisch, Edge-CDN, perfekt für deutsche Nutzer).

---

## Variante A — Vercel (empfohlen, 5 Min)

### 1. Account
- Erstelle einen Account auf [vercel.com](https://vercel.com) (kostenlos)

### 2. Repo verbinden
```bash
# Falls du Vercel-CLI lokal nutzen willst:
npm i -g vercel
vercel login
vercel link
vercel deploy --prod
```

Alternativ via Web-UI:
- Vercel-Dashboard → „Add New Project"
- GitHub-Repo `ivangomes9777/autoaufbereitung-1` auswählen
- Branch `main` (oder Production-Branch) → Deploy

Vercel erkennt automatisch:
- ✅ Statisches Projekt (kein Framework-Preset nötig)
- ✅ Output: Root `/`
- ✅ Headers aus `vercel.json` (CSP, HSTS, Cache-Control)

### 3. Domain verbinden
- Vercel-Dashboard → Projekt → Settings → Domains
- Eigene Domain (`apex-detailing.de` + `www.apex-detailing.de`) hinzufügen
- DNS-Records bei deinem Registrar setzen (Vercel zeigt die Werte)
- HTTPS-Zertifikat wird automatisch ausgestellt (Let's Encrypt)

### 4. Backend für Kontaktformular
Aktuell sendet das Formular **nichts** — nur Client-Side-Validierung.
Optionen (sortiert von einfach → komplex):

#### Option A1: Formspree (einfachste Lösung, ~15 Min)
- Account auf [formspree.io](https://formspree.io) erstellen
- Form-Endpoint kopieren (`https://formspree.io/f/xxxxxxx`)
- In `kontakt.html` das `action="#"` ersetzen durch den Endpoint
- In `assets/js/contact-form.js` den `event.preventDefault()` entfernen
  ODER per `fetch()` posten:

```js
const fd = new FormData(form);
const res = await fetch(form.action, { method: 'POST', body: fd, headers: { 'Accept': 'application/json' } });
if (res.ok) setStatus('Vielen Dank! ...', 'success');
else setStatus('Fehler beim Senden, bitte rufen Sie uns an.', 'error');
```

#### Option A2: Vercel Serverless Function + Resend (eigene Domain als Absender)
- `npm i resend` lokal
- Erstelle `/api/contact.js`:
```js
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const form = req.body;
  if (form.website) return res.json({ ok: true }); // Honeypot
  await resend.emails.send({
    from: 'website@apex-detailing.de',
    to: 'info@apex-detailing.de',
    subject: `Anfrage: ${form.fahrzeug} – ${form.leistung}`,
    text: JSON.stringify(form, null, 2),
  });
  res.json({ ok: true });
}
```
- Vercel-Env-Variable `RESEND_API_KEY` setzen
- In `contact-form.js` `fetch('/api/contact', ...)` aufrufen
- Foto-Upload separat behandeln (multipart oder S3-Upload)

---

## Variante B — Netlify
Sehr ähnlich. `vercel.json` durch `netlify.toml` ersetzen oder die Headers ins
Netlify-UI eintragen. Netlify Forms ist eine native Formular-Lösung.

## Variante C — Eigener Webserver (Apache/Nginx)
Statische Files einfach in den Webroot kopieren. Headers manuell konfigurieren
(siehe `vercel.json` als Vorlage für CSP, HSTS, X-Frame-Options).

Beispiel Nginx:
```nginx
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
add_header Content-Security-Policy "default-src 'self'; img-src 'self' data: https://images.unsplash.com; style-src 'self' 'unsafe-inline'; font-src 'self'; script-src 'self'; form-action 'self'; frame-ancestors 'none';" always;

location /assets/fonts/ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
```

---

## Vor jedem Deploy: Quick-Check

```
[ ] git status: nichts uncommitted
[ ] Lokal testen: python3 -m http.server 8000 → http://localhost:8000
[ ] Lighthouse-Score lokal prüfen (mind. 95 in allen Kategorien)
[ ] Alle TODO.md Punkte aus 🔴-Block erledigt
[ ] Sitemap-Domain aktualisiert (sitemap.xml + robots.txt)
[ ] Alle OG-/canonical-URLs zeigen auf echte Produktions-Domain
[ ] Favicon prüfen (favicon.svg sichtbar im Browser-Tab)
[ ] Test-Submission auf das Formular (echte E-Mail kommt an)
```

---

## Nach erstem Deploy

- [ ] **Google Search Console** verifizieren + Sitemap einreichen
- [ ] **Google Business Profile** anlegen (Adresse, Öffnungszeiten, Fotos)
- [ ] HTTPS-Test: [SSL Labs](https://www.ssllabs.com/ssltest/) (Ziel: A+)
- [ ] Security-Header: [securityheaders.com](https://securityheaders.com) (Ziel: A+)
- [ ] Rich-Results-Test: [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
  - LocalBusiness-Schema (Startseite)
  - FAQPage-Schema (Leistungen)
- [ ] Mobile-Friendly-Test: [search.google.com/test/mobile-friendly](https://search.google.com/test/mobile-friendly)

---

## Rollback

Bei Problemen einfach den vorherigen Vercel-Deployment-Snapshot als
Production-Deployment promoten (Vercel-Dashboard → Deployments → „Promote to Production").
Kein Daten- oder Code-Verlust möglich.
