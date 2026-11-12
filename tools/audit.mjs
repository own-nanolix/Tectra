// Measures every page in a real browser at 1440 and 390 px: overflow, contrast, names, links, ids, exports, errors.
// Built site:  npm run build, node tools/serve-out.mjs (keep it running), then node tools/audit.mjs
// Dev server:  node tools/audit.mjs --base=http://localhost:3000 logo color
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const base = (args.find((a) => a.startsWith('--base=')) || '--base=http://localhost:4173').slice(7).replace(/\/+$/, '');
const only = args.filter((a) => !a.startsWith('--'));
const pages = JSON.parse(readFileSync(join(dir, 'pages.json'), 'utf8')).filter((p) => !only.length || only.includes(p.id));

async function auditPage({ id, minExports }) {
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const lum = (c) => { const a = c.slice(0, 3).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]; };
  const parse = (s) => { const m = s.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[, /]+/).map(Number); return [p[0], p[1], p[2], p[3] === undefined || isNaN(p[3]) ? 1 : p[3]]; };
  const bgOf = (el) => { let e = el; while (e && e !== document.documentElement) { const cs = getComputedStyle(e); if (cs.backgroundImage && cs.backgroundImage !== 'none') return 'grad'; const c = parse(cs.backgroundColor); if (c && c[3] > 0.9) return c; e = e.parentElement; } return [255, 255, 255, 1]; };
  const s = document.querySelector('#p-' + id);
  if (!s) return { missing: true };
  for (let y = 0; y < s.scrollHeight; y += 700) { scrollTo(0, y); await wait(60); }
  scrollTo(0, 0); await wait(300);
  const vw = document.documentElement.clientWidth, ovf = document.documentElement.scrollWidth - vw;
  const wide = [];
  if (ovf > 0) for (const el of s.querySelectorAll('*')) {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.right > vw + 2 && r.left < vw) {
      let clipped = false, e = el.parentElement;
      while (e && e !== s) { if (getComputedStyle(e).overflowX !== 'visible') { clipped = true; break; } e = e.parentElement; }
      if (!clipped) wide.push(((el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className) || el.tagName).toString().slice(0, 40) + ':' + Math.round(r.right - vw));
    }
  }
  const low = []; let lowN = 0, gradText = 0;
  for (const el of s.querySelectorAll('*')) {
    if (el.closest('svg') || !el.childNodes.length) continue;
    const t = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim().length > 1).map((n) => n.textContent.trim()).join(' ');
    if (!t) continue; const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) continue;
    const r = el.getBoundingClientRect(); if (!r.width) continue;
    const fs = parseFloat(cs.fontSize); if (fs >= 24) continue;
    const fg = parse(cs.color), bg = bgOf(el); if (!fg) continue;
    if (bg === 'grad') { gradText++; continue; }
    const L1 = lum(fg), L2 = lum(bg), cr = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    if (cr < 4.5) { lowN++; if (low.length < 6) low.push(t.slice(0, 28) + '|' + fs + 'px|' + cr.toFixed(1)); }
  }
  const noName = [...s.querySelectorAll('button,a,[role=button],[role=tab],[role=switch],input,select')].filter((b) => !(b.textContent.trim() || b.getAttribute('aria-label') || b.getAttribute('aria-labelledby') || b.title || (b.id && s.querySelector('label[for="' + b.id + '"]')) || b.closest('label'))).length;
  const badHref = [...s.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')).filter((h) => !(h.startsWith('/') && !h.startsWith('//'))).slice(0, 4);
  const svgNoRole = [...s.querySelectorAll('svg')].filter((v) => !v.parentElement.closest('svg') && !v.getAttribute('aria-hidden') && !v.getAttribute('role') && !v.closest('[aria-hidden=true]') && !v.closest('button,a')).length;
  const ids = {}; document.querySelectorAll('[id]').forEach((e) => (ids[e.id] = (ids[e.id] || 0) + 1));
  const dupIds = Object.entries(ids).filter(([, v]) => v > 1).map(([k, v]) => k + 'x' + v).slice(0, 10);
  return { ovf, wide: wide.slice(0, 5), lowN, low, gradText, noName, badHref, svgNoRole, h1: document.querySelectorAll('h1').length, exp: s.querySelectorAll('svg[data-export]').length, expMin: minExports, dupIds };
}

const browser = await chromium.launch();
const results = {};
for (const width of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  let errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  for (const p of pages) {
    errors = [];
    try {
      await page.goto(`${base}/${p.id}/`, { waitUntil: 'networkidle', timeout: 60000 });
      const r = await page.evaluate(auditPage, { id: p.id, minExports: p.minExports || 0 });
      r.errors = errors.slice(0, 3);
      (results[p.id] ||= {})[width] = r;
    } catch (e) { (results[p.id] ||= {})[width] = { failed: String(e.message).slice(0, 200) }; }
  }
  await page.close();
}
await browser.close();
writeFileSync(join(dir, 'audit.json'), JSON.stringify(results, null, 2));

let clean = 0; const lines = [];
for (const p of pages) {
  const issues = new Set(), notes = new Set();
  for (const [w, r] of Object.entries(results[p.id] || {})) {
    if (r.failed) { issues.add(`${w}px did not load: ${r.failed}`); continue; }
    if (r.missing) { issues.add(`no <section id="p-${p.id}">`); continue; }
    if (r.ovf > 0) issues.add(`${w}px overflow ${r.ovf}px: ${r.wide.join(', ')}`);
    if (r.lowN) issues.add(`${w}px low contrast x${r.lowN}: ${r.low.join(' / ')}`);
    if (r.noName) issues.add(`unnamed controls x${r.noName}`);
    if (r.badHref.length) issues.add(`bad links: ${r.badHref.join(', ')}`);
    if (r.svgNoRole) issues.add(`svg without role or aria-hidden x${r.svgNoRole}`);
    if (r.h1 !== 1) issues.add(`${r.h1} <h1>`);
    if (r.exp < r.expMin) issues.add(`exportable SVGs ${r.exp} of ${r.expMin}`);
    if (r.dupIds.length) issues.add(`duplicate ids: ${r.dupIds.join(', ')}`);
    if (r.errors.length) issues.add(`console errors: ${r.errors.join(' | ')}`);
    if (r.gradText) notes.add(`${r.gradText} small texts on gradients (check by eye)`);
  }
  if (!issues.size) clean++;
  lines.push(`${issues.size ? 'FIX ' : 'ok  '} ${p.id.padEnd(18)} ${[...issues, ...notes].join('; ')}`);
}
console.log(lines.join('\n'));
console.log(`\n${clean} of ${pages.length} pages clean at 1440 and 390 px. Full results in audit.json`);
