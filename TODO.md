# ✅ TODO — Vor Go-Live

Diese Liste fasst alle offenen Punkte zusammen, die **vor** dem produktiven
Launch der APEX-Detailing-Website erledigt werden müssen.

Reihenfolge spielt nur dort eine Rolle, wo es markiert ist.
Alle Punkte sind atomar — kann nach Belieben aufgeteilt werden.

---

## 🔴 KRITISCH — ohne diese darf die Seite nicht online

### 1. Rechtliche Pflichtangaben ergänzen
Alle gelben `[Platzhalter]`-Pills auf den Legal-Seiten durch echte Daten ersetzen.

> ✅ Rechts-Audit (Skill `webdesign-recht-de`) durchgeführt — Normfehler behoben
> (TMG→DDG, RStV→MStV, TTDSG→TDDDG, toter OS-Link, Abnahme § 640, Widerrufsbelehrung,
> § 306). Details: `docs/audit-rechtliche-pruefung.md`. Verbleibende Platzhalter & Aufgaben:

- [ ] **Impressum** (`impressum.html`)
  - [ ] USt-IdNr. (sobald vom Finanzamt vergeben) eintragen — nur falls vorhanden
  - [ ] Zuständiges Ordnungsamt / Aufsichtsbehörde benennen
  - [x] ~~Steuernummer~~ — entfernt (im Impressum nicht erforderlich)
- [ ] **Datenschutzerklärung** (`datenschutz.html`)
  - [ ] Hosting-Anbieter konkret benennen (z. B. Vercel Inc., Hetzner)
  - [ ] Server-Standort (Land) eintragen
  - [ ] AV-Vertrag mit Hoster nachweislich abschließen; bei US-Hoster DPF/SCC sicherstellen
  - [ ] Beim Live-Gang des Formulars echten Datenfluss (Backend/Mail-Dienst als
        Auftragsverarbeiter) ergänzen — Formular sendet aktuell noch nichts
        (TODO in `contact-form.js`)
- [ ] **AGB** (`agb.html`)
  - [ ] Versicherungsnummer + Deckungssumme der Betriebshaftpflicht eintragen
  - [ ] AGB von einem Anwalt prüfen lassen (Schutzklausel-Check)
- [ ] **Widerruf** (`widerruf.html`)
  - [ ] Vor vorzeitigem Leistungsbeginn ausdrückliche Zustimmung + Kenntnisnahme
        des Verbrauchers in Textform einholen (§ 356 Abs. 4 BGB)
- [x] **Datum „Stand: …"** auf den Legal-Seiten aktualisiert (Juni 2026)
- [ ] Abschließende Gesamtprüfung durch Fachanwalt für IT-/Medienrecht

### 2. Geschäftsdaten überall einheitlich ersetzen
Die Demo-Daten von „APEX Detailing" durch die echten Daten ersetzen.
Betroffene Felder: Firmenname, Inhaber, Adresse, Telefon, E-Mail, USt-IdNr.

- [ ] Suchen-und-Ersetzen über alle HTML-Dateien:
  - `APEX Detailing` → richtiger Firmenname
  - `Daniel Krüger` → echter Inhaber
  - `Industriestraße 12, 10115 Berlin` → echte Adresse
  - `+49 30 444-5555` → echte Telefonnummer
  - `info@apex-detailing.de` → echte E-Mail
- [ ] `<meta name="description">` in jeder HTML auf die echte Firma anpassen
- [ ] `<title>` jeder Seite mit echtem Firmenname

### 3. Lokale Fonts aktivieren (DSGVO-Pflicht)
✅ **ERLEDIGT** — Inter (rsms.me, SIL OFL) + Sora (Fontsource, SIL OFL) liegen
in `/assets/fonts/`, `@font-face` aktiv, Preloads in allen HTML-Seiten.

- [x] `sora-variable.woff2` und `inter-variable.woff2` heruntergeladen
- [x] Beide Dateien in `/assets/fonts/` abgelegt
- [x] `@font-face` in `base.css` aktiv
- [x] `<link rel="preload">` in allen 6 HTML-Seiten gesetzt

### 4. Bild-Platzhalter durch echte Fotos ersetzen
✅ **TEILWEISE ERLEDIGT** — aktuell laufen 20 kuratierte Pexels-Fotos lokal
(`/assets/img/*.jpg`, 1920px max, optimiert auf ~5,5 MB Gesamtgewicht,
JPEG q=78 progressive). Pexels-Lizenz erlaubt kommerzielle Nutzung ohne
Namensnennung — siehe neuer Abschnitt „Bildmaterial" in `datenschutz.html`.

Vor Produktivstart wenn möglich:
- [ ] Eigene Vorher-/Nachher-Fotos der echten Aufträge produzieren (matched pairs:
      gleicher Winkel, gleiche Lichtsituation, Studio-Setup) und Pexels-Bilder ersetzen
- [ ] Optional als `.webp` exportieren (~30 % kleiner als JPEG)
- [ ] Pexels-Hinweis im Datenschutz entfernen, sobald keine Stock-Fotos mehr genutzt

**Hinweis (DSGVO):** Kfz-Kennzeichen auf allen Vorher/Nachher-Fotos **unkenntlich
machen** (oder schriftliche Einwilligung des Halters einholen). Steht so auch
im Datenschutz.

### 5. Team-Portraits (auf `/kontakt.html`)
- [ ] 3 Portraitfotos schießen oder durch eigene Fotos ersetzen
- [ ] Falls nicht alle 3 Team-Mitglieder existieren: Cards auf 1-2 reduzieren
      (CSS reagiert automatisch responsive)

### 6. Kontaktformular-Backend
Das Formular validiert clientseitig, aber **versendet aktuell nichts**.

- [ ] Backend-Endpoint einrichten — Optionen:
  - **Vercel:** Serverless Function (`/api/contact.ts`) → SMTP via Resend/Postmark
  - **Statisch:** Formspree, Basin, oder Netlify Forms (kostenlose Pläne)
  - **Eigener Server:** PHP-Mailer, Node-Express o.ä.
- [ ] In `kontakt.html` das `action="#"` des Formulars auf den echten Endpoint setzen
- [ ] In `assets/js/contact-form.js` (Marker `TODO Production`) den
      `fetch()`-Aufruf einbauen, der `new FormData(form)` sendet
- [ ] **Mail-Empfänger-Adresse**, Betreff, From-Header konfigurieren
- [ ] Spam-Schutz prüfen: Honeypot ist drin, aber für Produktion zusätzlich:
  - reCAPTCHA v3 oder hCaptcha (DSGVO: in Datenschutz erwähnen!)
  - Oder Rate-Limiting im Backend (pro IP, 5 Anfragen/Stunde)

### 7. Hosting & Domain
- [ ] Domain wählen & registrieren (z. B. `apex-detailing.de`)
- [ ] Hosting auswählen (Vercel ist für statische Seiten ideal)
- [ ] **HTTPS aktivieren** (bei Vercel/Netlify automatisch)
- [ ] DNS einrichten, Domain mit Hosting verbinden
- [ ] In allen Legal-Seiten den Hosting-Anbieter aktualisieren (siehe Punkt 1)

---

## 🟡 WICHTIG — sollte beim Launch da sein

### 8. SEO-Grundlagen
✅ **ERLEDIGT** (bis auf Google Business Profile)

- [x] `<meta name="description">` pro Seite individuell
- [x] Open-Graph-Tags auf allen 6 Seiten
- [x] Twitter-Card-Tags auf allen 6 Seiten
- [x] `robots.txt` im Root
- [x] `sitemap.xml` im Root (alle 6 Seiten mit Prioritäten)
- [x] Favicon (`favicon.svg`) + Web-Manifest (`site.webmanifest`)
- [x] `<link rel="canonical">` auf jeder Seite
- [x] OG-Cover-Bild gerendert (`/assets/img/og-cover.jpg`, 1200×630)
- [ ] Google Business Profile anlegen + verifizieren (vor Ort)

### 9. Strukturierte Daten (Rich Results bei Google)
✅ **ERLEDIGT**

- [x] `AutomotiveBusiness`-Schema (LocalBusiness) als JSON-LD auf Startseite
- [x] `OfferCatalog` mit allen 6 Services + Preisen
- [x] `FAQPage`-Schema für FAQ-Sektion (Leistungen)
- [x] `BreadcrumbList`-Schema (Leistungen)

### 10. Security-Header beim Hosting
✅ **ERLEDIGT** via `vercel.json`

- [x] `Content-Security-Policy` (CSP)
- [x] `Strict-Transport-Security` (HSTS, 2 Jahre, preload-ready)
- [x] `X-Frame-Options: DENY`
- [x] `Permissions-Policy` (Kamera/Mikro/Geo/FLoC blockiert)
- [x] `Cache-Control` immutable für Fonts/CSS/JS (1 Jahr)

### 11. Letzte Browser-Tests
Aktuell visuell geprüft: Chromium-basierte Browser, Desktop + Mobile.
Vor Launch zusätzlich testen:

- [ ] Safari (Desktop + iOS) — Glassmorphism, `backdrop-filter`
- [ ] Firefox — `aspect-ratio`, `clip-path`
- [ ] Echte Geräte: iPhone, Android-Smartphone, Tablet
- [ ] Tastatur-Navigation komplett durchspielen (Tab, Pfeile, Enter)
- [ ] Screen-Reader-Test (NVDA, VoiceOver) auf Startseite

### 12. Analytics (optional, DSGVO-bewusst)
Falls Statistiken gewünscht — **nur** cookiefreie/anonyme Lösungen:

- [ ] **Plausible** oder **Umami** self-hosted (beide DSGVO-konform, ohne Cookies)
- [ ] In Datenschutzerklärung Abschnitt „Reichweitenmessung" ergänzen

---

## 🟢 NICE-TO-HAVE — kann nach Launch nachgezogen werden

### 13. Inhaltliche Erweiterungen
- [ ] Blog/Magazin-Bereich für SEO (Detailing-Tipps, Pflege-Guides)
- [ ] Mehr Galerie-Einträge (idealerweise 12-20 statt 6)
- [ ] Kundenbewertungen / Testimonials sammeln und einbinden
  (z. B. nach Google Reviews verlinken)
- [ ] Geschenkgutschein-Sektion
- [ ] Newsletter-Anmeldung (DSGVO: Double-Opt-In!)

### 14. Performance-Feinschliff
- [ ] Bilder als `.avif` bereitstellen (~30% kleiner als webp)
- [ ] `<link rel="preload">` für Hero-Bilder
- [ ] HTTP/2 Server Push für CSS (Hosting-abhängig)
- [ ] Cache-Header für statische Assets (1 Jahr)

### 15. Conversion-Optimierung
- [ ] A/B-Test der Hero-Headline („Perfektion ist kein Detail." vs. Alternativen)
- [ ] WhatsApp-Business-Button als zusätzlicher Kontakt-Kanal
- [ ] Online-Buchungs-Kalender (z. B. Calendly-Embed mit DSGVO-Hinweis)

### 16. Wartung
- [ ] Backup-Strategie für Kunden-Anfragen / Auftragsfotos
- [ ] Monitoring (z. B. UptimeRobot) für Erreichbarkeit
- [ ] Plan für jährlichen DSGVO-Review

---

## 📋 Quick-Check vor jedem Launch-Versuch

```
[ ] Echter Firmenname überall (kein "APEX Detailing" mehr)
[ ] Echte Telefonnummer + E-Mail
[ ] USt-IdNr, Steuernummer, Versicherungsnummer im Impressum/AGB
[ ] Hosting-Anbieter in Datenschutz benannt + AV-Vertrag geschlossen
[ ] Eigene Fotos (mit unkenntlichen Kennzeichen!)
[ ] Lokale Fonts geladen (assets/fonts/ befüllt + @font-face aktiv)
[ ] Kontaktformular-Backend live + Test-Submission erfolgreich
[ ] HTTPS aktiv
[ ] Lighthouse erneut prüfen → mind. 95+ in allen Kategorien
[ ] Safari + Firefox + Mobile testen
[ ] AGB von Anwalt geprüft
```

---

**Letztes Update dieser Liste:** Juni 2025
**Status der Codebasis:** funktionsfertig & QA-geprüft (Lighthouse 100/100/96/100)
**Branch:** `claude/upbeat-sagan-q2wq28`
