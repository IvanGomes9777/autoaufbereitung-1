#!/usr/bin/env node
/**
 * lighthouse-check.mjs — Portable Lighthouse-Audit-Tool
 *
 * Nutzung:
 *   node lighthouse-check.mjs <url> [<url2> <url3> ...]
 *   node lighthouse-check.mjs https://example.com
 *   node lighthouse-check.mjs https://site.de/a https://site.de/b
 *   node lighthouse-check.mjs --mobile https://example.com
 *   node lighthouse-check.mjs --json https://example.com > report.json
 *
 * Voraussetzungen (einmalig pro Projekt):
 *   npm install --save-dev lighthouse chrome-launcher
 *
 * Funktioniert auf jeder URL: lokale Dev-Server (localhost:xxx) oder Produktion.
 */

import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';

const args = process.argv.slice(2);
const flags = new Set(args.filter(a => a.startsWith('--')));
const urls = args.filter(a => !a.startsWith('--'));

if (urls.length === 0) {
  console.error('\nNutzung: node lighthouse-check.mjs <url> [<url2> ...]');
  console.error('Flags: --mobile (statt Desktop), --json (Raw-JSON ausgeben)\n');
  process.exit(1);
}

const isMobile = flags.has('--mobile');
const jsonOnly = flags.has('--json');

const log = (...m) => { if (!jsonOnly) console.log(...m); };

const launchOpts = {
  chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu', '--ignore-certificate-errors'],
};
// Optional: CHROME_PATH Env-Var fuer Sandboxes / CI ohne Standard-Chrome
if (process.env.CHROME_PATH) launchOpts.chromePath = process.env.CHROME_PATH;

let chrome;
try {
  chrome = await launch(launchOpts);
} catch (e) {
  console.error(`\n✗ Chrome konnte nicht gestartet werden: ${e.message}`);
  console.error(`\nLoesungen:`);
  console.error(`  1. Chrome / Chromium installieren (https://www.google.com/chrome/)`);
  console.error(`  2. Oder Umgebungsvariable setzen:`);
  console.error(`     CHROME_PATH=/pfad/zu/chrome node tools/lighthouse-check.mjs ...\n`);
  process.exit(1);
}

const baseOpts = {
  port: chrome.port,
  output: 'json',
  logLevel: 'error',
  onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  formFactor: isMobile ? 'mobile' : 'desktop',
  screenEmulation: isMobile
    ? { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75, disabled: false }
    : { mobile: false, width: 1440, height: 900, deviceScaleFactor: 1, disabled: false },
  throttling: isMobile
    ? { rttMs: 150, throughputKbps: 1638, cpuSlowdownMultiplier: 4 } // Mobile 4G
    : { rttMs: 40,  throughputKbps: 10240, cpuSlowdownMultiplier: 1 }, // Desktop Cable
};

const COLORS = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  green: '\x1b[32m', yellow: '\x1b[33m', red: '\x1b[31m', cyan: '\x1b[36m',
};
const colorScore = (n) => {
  if (n === null || n === undefined) return COLORS.dim + '  —';
  const c = n >= 90 ? COLORS.green : n >= 50 ? COLORS.yellow : COLORS.red;
  return c + String(n).padStart(3) + COLORS.reset;
};

const allResults = [];
for (const url of urls) {
  log(`${COLORS.cyan}▸ ${url}${COLORS.reset}  (${isMobile ? 'Mobile' : 'Desktop'})`);
  try {
    const r = await lighthouse(url, baseOpts);
    const c = r.lhr.categories;
    const a = r.lhr.audits;
    const score = (k) => c[k]?.score == null ? null : Math.round(c[k].score * 100);

    const issues = [];
    for (const cat of ['accessibility', 'best-practices', 'seo']) {
      for (const ref of c[cat].auditRefs) {
        const audit = a[ref.id];
        if (audit?.score !== null && audit?.score < 1) {
          issues.push(`[${cat}] ${audit.title}`);
        }
      }
    }

    allResults.push({
      url,
      formFactor: isMobile ? 'mobile' : 'desktop',
      scores: {
        performance: score('performance'),
        accessibility: score('accessibility'),
        bestPractices: score('best-practices'),
        seo: score('seo'),
      },
      coreWebVitals: {
        FCP: a['first-contentful-paint']?.displayValue,
        LCP: a['largest-contentful-paint']?.displayValue,
        CLS: a['cumulative-layout-shift']?.displayValue,
        TBT: a['total-blocking-time']?.displayValue,
        SpeedIndex: a['speed-index']?.displayValue,
      },
      issues: issues.slice(0, 10),
    });
  } catch (e) {
    allResults.push({ url, error: e.message });
  }
}
await chrome.kill();

if (jsonOnly) {
  console.log(JSON.stringify(allResults, null, 2));
  process.exit(0);
}

// ───── Pretty CLI Output ─────
console.log('\n' + COLORS.bold + '═'.repeat(72) + COLORS.reset);
console.log(`${COLORS.bold}  LIGHTHOUSE AUDIT${COLORS.reset}   ${COLORS.dim}(${isMobile ? 'Mobile 4G' : 'Desktop Cable'})${COLORS.reset}`);
console.log(COLORS.bold + '═'.repeat(72) + COLORS.reset);

for (const r of allResults) {
  console.log(`\n${COLORS.cyan}${r.url}${COLORS.reset}`);
  if (r.error) {
    console.log(`  ${COLORS.red}✗ Fehler:${COLORS.reset} ${r.error}`);
    continue;
  }
  const s = r.scores;
  console.log(`  Performance:    ${colorScore(s.performance)}`);
  console.log(`  Accessibility:  ${colorScore(s.accessibility)}`);
  console.log(`  Best Practices: ${colorScore(s.bestPractices)}`);
  console.log(`  SEO:            ${colorScore(s.seo)}`);
  console.log(`  ${COLORS.dim}─ Core Web Vitals ─${COLORS.reset}`);
  console.log(`  FCP: ${r.coreWebVitals.FCP}    LCP: ${r.coreWebVitals.LCP}    CLS: ${r.coreWebVitals.CLS}`);
  console.log(`  TBT: ${r.coreWebVitals.TBT}    Speed Index: ${r.coreWebVitals.SpeedIndex}`);
  if (r.issues.length) {
    console.log(`  ${COLORS.yellow}⚠ Top-Issues:${COLORS.reset}`);
    r.issues.slice(0, 5).forEach(i => console.log(`    · ${i}`));
    if (r.issues.length > 5) console.log(`    ${COLORS.dim}… und ${r.issues.length - 5} weitere${COLORS.reset}`);
  } else {
    console.log(`  ${COLORS.green}✓ Keine Issues${COLORS.reset}`);
  }
}
console.log('\n' + COLORS.bold + '═'.repeat(72) + COLORS.reset + '\n');
