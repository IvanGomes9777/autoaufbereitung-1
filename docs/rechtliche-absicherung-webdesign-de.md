# Rechtliche Absicherung für Webseiten (Deutschland) — Referenz

> ⚠️ **Kein Ersatz für anwaltliche Beratung.** Sorgfältig recherchierte Arbeitsgrundlage
> (Stand Juni 2026). Vor produktivem Einsatz von einem Fachanwalt für IT-/Medienrecht
> prüfen lassen. Datumsangaben und „beobachten"-Punkte vor jedem Projekt verifizieren.

Diese Datei ist die ausführliche Referenz zum Skill
[`.claude/skills/webdesign-recht-de/SKILL.md`](../.claude/skills/webdesign-recht-de/SKILL.md).
Sie gilt sowohl für Webdesigner-/Agentur-Websites als auch sinngemäß für jede
gewerbliche Website mit Kontaktformular und Dienstleistungs-Angebot (z. B. die
Autoaufbereitungs-Website in diesem Repo).

---

## 1. Impressum — § 5 DDG

Das **Digitale-Dienste-Gesetz (DDG)** hat zum **14.05.2024** das Telemediengesetz (TMG)
abgelöst. Pflichtangaben stehen jetzt in **§ 5 DDG** (früher § 5 TMG).

| Pflicht | Norm | Hinweis |
|---|---|---|
| Name / Firma + Rechtsform | § 5 Abs. 1 Nr. 1 DDG | bei Einzelunternehmer: Vor- und Nachname |
| Ladungsfähige Anschrift | § 5 Abs. 1 Nr. 1 DDG | **kein Postfach** |
| E-Mail **und** weiterer schneller Kontakt (Telefon) | § 5 Abs. 1 Nr. 2 DDG | reine E-Mail genügt nach EuGH nicht zwingend, Telefon empfohlen |
| USt-IdNr. | § 5 Abs. 1 Nr. 6 DDG, § 27a UStG | **nur falls vorhanden** |
| Steuernummer | — | **NICHT** angeben (keine Pflicht, kein Nutzen) |
| Aufsichtsbehörde / Register | § 5 Abs. 1 Nr. 3–4 DDG | falls einschlägig |
| Inhaltlich Verantwortlicher | **§ 18 Abs. 2 MStV** | **nicht** mehr § 55 Abs. 2 RStV — der RStV wurde zum 07.11.2020 vom **Medienstaatsvertrag (MStV)** abgelöst |
| Haftungs-/TMG-Verweise | **§§ 7–10 DDG** | nicht mehr §§ 7–10 TMG |

### OS-Plattform-Link (EU-Streitschlichtung)
Die **OS-Plattform** der EU-Kommission (`ec.europa.eu/consumers/odr/`) wurde durch
**VO (EU) 2024/3228** zum **20.07.2025 abgeschaltet**. Ein Link dorthin ist ein
**toter Link → Abmahnrisiko**. → **Entfernen.**

Der **VSBG-Hinweis** (Verbraucherstreitbeilegung nach § 36 VSBG, „wir sind nicht
bereit/verpflichtet, an einem Streitbeilegungsverfahren teilzunehmen") **bleibt** bestehen.

---

## 2. Datenschutzerklärung — Art. 13 DSGVO

- Vollständige Informationen nach **Art. 13 DSGVO**, erreichbar in **≤ 2 Klicks** von jeder Seite.
- **Muss den echten Datenfluss abbilden** — häufigster Fehler ist die Diskrepanz zwischen
  Erklärung und tatsächlicher Technik. Jeder Maildienst, jedes Backend, jeder Hoster ist als
  **Auftragsverarbeiter (Art. 28 DSGVO)** zu benennen.
- Übliche Bausteine: Verantwortlicher, Server-Logfiles (Art. 6 Abs. 1 lit. f), Cookies,
  Kontaktformular (Art. 6 Abs. 1 lit. b / lit. a), Schriftarten, Bildmaterial, Hosting,
  Betroffenenrechte (Art. 15–21), Beschwerderecht (Art. 77).

### Cookie-Banner — § 25 TDDDG
Das **TTDSG** heißt seit **14.05.2024 TDDDG** (Telekommunikation-Digitale-Dienste-
Datenschutz-Gesetz). Einwilligung nach **§ 25 Abs. 1 TDDDG** nur bei **nicht-notwendigen**
Cookies/Tracking. **Ausnahme § 25 Abs. 2 TDDDG** für technisch notwendige Cookies.
→ **Ohne Tracking kein Cookie-Banner.**

### Google Fonts
Dynamisch von Google nachgeladene Fonts übermitteln die IP an Google (USA) → unzulässig
ohne Einwilligung (**LG München I, Urteil v. 20.01.2022 – 3 O 17493/20**). → Fonts **lokal**
einbinden. Bei Next.js: `next/font/google` (selbst-hosting). Gleiches gilt für Maps, YouTube,
externe Icon-/JS-CDNs.

### US-Dienste (Hosting / Mail / CDN)
- **AVV (Art. 28 DSGVO)** mit dem Anbieter abschließen.
- Datentransfer in die USA nur auf Grundlage **EU-US Data Privacy Framework (DPF)** oder
  **Standardvertragsklauseln (SCC, Art. 46 DSGVO)**.
- **DPF-Status beobachten** (anhängig EuGH C-703/25 P) → bei Kippen SCC-Fallback bereithalten.
- TLS/SSL für alle Formulare (**Art. 32 DSGVO**), Datensparsamkeit (**Art. 5 DSGVO**).

---

## 3. AGB für Dienstleistungs-/Werkverträge

| Thema | Norm | Hinweis |
|---|---|---|
| Vertragstyp | §§ 631 ff. BGB | Werkvertrag (geschuldeter Erfolg) |
| Anzahlung | § 307 BGB | Teil-Anzahlung zulässig; **100 % Vorkasse ggü. Verbrauchern riskant** |
| Abnahme | **§ 640 BGB** | fiktive Abnahme nach Fristablauf (Abs. 2 S. 1); ggü. **Verbrauchern** nur mit **Hinweis in Textform** (Abs. 2 S. 2) |
| Form-Klauseln | **§ 309 Nr. 13 BGB** | **Textform statt Schriftform** verlangen (sonst unwirksam) |
| Haftung | § 309 Nr. 7 BGB | Beschränkung nur für leichte Fahrlässigkeit / Nicht-Kardinalpflichten; **Leben/Körper/Gesundheit + ProdHaftG + Garantien unberührt** |
| Nutzungsrechte | § 31 UrhG | Übertragung erst nach vollständiger Zahlung (relevant bei Webdesign) |
| Gerichtsstand | § 38 ZPO | Gerichtsstandvereinbarung **nur unter Kaufleuten** |
| Salvatorische Klausel | **§ 306 BGB** | greift automatisch; **Ersetzungs-/„geltungserhaltende Reduktion"-Klausel** gilt als unwirksam → besser nur auf § 306 verweisen |

---

## 4. Widerrufsrecht (B2C-Fernabsatz)

Bei Verträgen, die mit **Verbrauchern** ausschließlich über Fernkommunikationsmittel
(E-Mail, Webformular, Telefon) geschlossen werden, besteht ein **14-tägiges Widerrufsrecht**.

| Thema | Norm |
|---|---|
| Widerrufsrecht | § 312g BGB |
| Widerrufsfrist / -erklärung | § 355 BGB |
| Beginn/Erlöschen bei Dienstleistungen | § 356 Abs. 4 BGB |
| **Wertersatz** bei vorzeitigem Beginn | **§ 357a Abs. 2 BGB** (NICHT mehr veraltet § 357 Abs. 8) |
| Muster-Widerrufsbelehrung & -formular | Art. 246a § 1 Abs. 2 EGBGB, Anlagen 1 & 2 |

- Vorzeitiger Leistungsbeginn nur auf **ausdrückliches Verlangen** des Verbrauchers **und**
  nach Hinweis, dass das Widerrufsrecht bei vollständiger Vertragserfüllung erlischt.
- Belehrung in **Textform** spätestens bei Vertragsschluss.
- **Nur für Verbraucher** — nicht für Unternehmer (B2B).
- **„zahlungspflichtig bestellen"** (§ 312j Abs. 3 BGB): bei kostenpflichtigem Bestellbutton
  Pflicht-Beschriftung, sonst kommt kein Vertrag zustande.

---

## 5. B2B-Beschränkung (optional)
Wer nur an Unternehmer leisten will, braucht: Hinweis + **aktive Bestätigung** der
Unternehmereigenschaft + Abfrage **objektiver Merkmale**. Bloße Behauptung genügt nicht —
„im Zweifel Verbraucher" (**BGH VIII ZR 7/09**).

---

## 6. Top-Abmahnfallen (Kurzliste)
- Fehlendes/falsches Impressum (§ 5 **TMG** statt **DDG**)
- Toter OS-Plattform-Link
- Unvollständige Datenschutzerklärung / Diskrepanz zur Technik
- Dynamische Google Fonts
- Formular ohne SSL
- Cookies ohne Consent
- Fehlende Widerrufsbelehrung
- Bestellbutton ohne „zahlungspflichtig bestellen" (§ 312j BGB)
- Bilder/Fonts ohne Lizenz (UrhG)
- Newsletter ohne Einwilligung (§ 7 UWG)

---

*Quellen: DDG, MStV, TDDDG, DSGVO, BGB, EGBGB, UWG, UrhG, ZPO in den jeweils zitierten
Fassungen; LG München I 3 O 17493/20; BGH VIII ZR 7/09; VO (EU) 2024/3228. Stand Juni 2026.*
