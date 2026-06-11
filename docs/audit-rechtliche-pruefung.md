# Audit: Rechtliche Absicherung — APEX Detailing

Durchgeführt mit dem Skill `webdesign-recht-de` (Stand Juni 2026).
Geprüfte Dateien: `impressum.html`, `datenschutz.html`, `agb.html`, `kontakt.html`,
`index.html`, `leistungen.html` sowie projektweite Font-/Tracking-Einbindung.

> ⚠️ Kein Ersatz für anwaltliche Beratung. Vor produktivem Einsatz von einem Fachanwalt
> (IT-/Medienrecht) prüfen lassen.

## ✅ Behoben

| # | Befund | Norm | Datei | Fix |
|---|---|---|---|---|
| 1 | Impressum verwies auf § 5 **TMG** | § 5 DDG | impressum.html | TMG → DDG (Titel, Meta, Hero, Haftung §§ 7–10) |
| 2 | „Inhaltlich Verantwortlich" nach § 55 Abs. 2 **RStV** | § 18 Abs. 2 MStV | impressum.html | RStV → MStV |
| 3 | Toter **OS-Plattform-Link** (seit 20.07.2025 abgeschaltet) | VO (EU) 2024/3228 | impressum.html | Link entfernt, VSBG-Hinweis behalten |
| 4 | **Steuernummer** im Impressum gelistet (nicht erforderlich) | § 5 DDG | impressum.html | Zeile entfernt, USt-IdNr behalten |
| 5 | Cookie-Einwilligung nach § 25 Abs. 2 **TTDSG** | § 25 Abs. 2 TDDDG | datenschutz.html | TTDSG → TDDDG |
| 6 | Kein Hinweis zu Drittland-Transfer beim Hosting | Art. 46 DSGVO | datenschutz.html | DPF/SCC-Absatz ergänzt |
| 7 | AGB: „ausdrücklich **schriftlich**" (Form-Klausel) | § 309 Nr. 13 BGB | agb.html | Schriftform → Textform |
| 8 | AGB: **keine Abnahme-Klausel** | § 640 BGB | agb.html | Neuer § 4 Abnahme inkl. Verbraucher-Hinweis (Textform, Abs. 2 S. 2) |
| 9 | **Keine Widerrufsbelehrung** für B2C-Fernabsatz | §§ 312g, 355, 356, 357a BGB | widerruf.html (neu) | Belehrung + Muster-Widerrufsformular angelegt, § 9 in AGB + Footer-Links |
| 10 | Salvatorische Klausel mit Ersetzungs-/Reduktionsklausel | § 306 BGB | agb.html | Auf § 306 Abs. 2 BGB gestützt |

## ✅ Bereits konform (keine Änderung nötig)

- **Google Fonts lokal** — Sora & Inter werden selbst gehostet, keine externen Font-CDNs.
- **Kein Cookie-Banner** — Website setzt nur technisch notwendige Cookies, kein Tracking
  (korrekt nach § 25 Abs. 2 TDDDG).
- **Kein Tracking/Analytics** — projektweit keine Google Analytics, GTM, Pixel o. Ä. eingebunden.
- **TLS/SSL** für das Kontaktformular dokumentiert; **Datensparsamkeit** & Honeypot vorhanden.
- **Datenschutz-Checkbox** (Einwilligung) im Kontaktformular vorhanden.
- **AGB-Haftung** — Kardinalpflichten-Konzept, Leben/Körper/Gesundheit & ProdHaftG unberührt.
- **Anzahlung** 20 % (keine 100 % Vorkasse ggü. Verbrauchern) — unkritisch (§ 307 BGB).

## ⚠️ Noch zu erledigen (Platzhalter & inhaltliche Prüfung)

- [ ] **Impressum:** USt-IdNr. eintragen (falls vorhanden), zuständige Aufsichtsbehörde/Ordnungsamt.
- [ ] **Datenschutz:** konkreten **Hosting-Anbieter + Server-Standort** eintragen; bei US-Hoster
      (z. B. Vercel Inc.) AVV nach Art. 28 abschließen und DPF/SCC sicherstellen.
- [ ] **Datenschutz:** Beim Live-Gang des Kontaktformulars den **tatsächlichen Datenfluss**
      (Backend/Mail-Service als Auftragsverarbeiter) ergänzen — aktuell sendet das Formular noch
      nicht (TODO in `contact-form.js`).
- [ ] **AGB:** Versicherungsnummer + Deckungssumme der Betriebshaftpflicht eintragen.
- [ ] **Vor vollständiger Vertragserfüllung vor Ablauf der Widerrufsfrist:** ausdrückliche
      Zustimmung + Kenntnisnahme des Verbrauchers in Textform einholen (§ 356 Abs. 4 BGB).
- [ ] Gesamtprüfung durch Fachanwalt für IT-/Medienrecht.
