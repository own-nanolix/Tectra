// Saves every <svg data-export="name"> as a standalone file in export/svg/<name>.svg.
// Built site:  npm run build, node tools/serve-out.mjs (keep it running), then node tools/export-svg.mjs
// Options:     --dry (count and check only)   --base=http://localhost:3000   page ids to do only some pages
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const dry = args.includes('--dry');
const base = (args.find((a) => a.startsWith('--base=')) || '--base=http://localhost:4173').slice(7).replace(/\/+$/, '');
const only = args.filter((a) => !a.startsWith('--'));
const pages = JSON.parse(readFileSync(join(dir, 'pages.json'), 'utf8')).filter((p) => !only.length || only.includes(p.id));

async function exportPage({ id, minExports }) {
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const NS = 'http://www.w3.org/2000/svg';
  const PAINT = ['color', 'fill', 'fill-opacity', 'fill-rule', 'clip-rule', 'stroke', 'stroke-width', 'stroke-opacity', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-dasharray', 'stroke-dashoffset', 'opacity', 'mix-blend-mode', 'paint-order', 'vector-effect', 'stop-color', 'stop-opacity', 'flood-color', 'flood-opacity', 'clip-path', 'mask', 'filter', 'display', 'visibility'];
  const TEXT = ['font-family', 'font-size', 'font-weight', 'font-style', 'letter-spacing', 'word-spacing', 'text-anchor', 'dominant-baseline', 'text-decoration-line', 'text-transform'];
  const SKIP = { 'fill-opacity': '1', 'stroke-opacity': '1', 'stop-opacity': '1', 'flood-opacity': '1', opacity: '1', 'fill-rule': 'nonzero', 'clip-rule': 'nonzero', 'stroke-dasharray': 'none', 'stroke-dashoffset': '0px', 'stroke-miterlimit': '4', 'mix-blend-mode': 'normal', 'paint-order': 'normal', 'vector-effect': 'none', 'clip-path': 'none', mask: 'none', filter: 'none', display: 'inline', visibility: 'visible', 'letter-spacing': 'normal', 'word-spacing': '0px', 'font-style': 'normal', 'text-decoration-line': 'none', 'text-transform': 'none', 'dominant-baseline': 'auto', 'text-anchor': 'start', 'stroke-linecap': 'butt', 'stroke-linejoin': 'miter' };
  const isText = (el) => /^(text|tspan|textPath)$/.test(el.localName);
  // next/font gives fonts hashed names such as __Inter_1a2b3c: write the real family names instead.
  const cleanFont = (v) => [...new Set(v.split(',').map((f) => f.trim().replace(/^['"]|['"]$/g, ''))
    .filter((f) => f && !/fallback/i.test(f))
    .map((f) => (f.startsWith('__') ? f.slice(2).replace(/_[0-9a-f]{5,}$/i, '').replace(/_/g, ' ') : f)))]
    .map((f) => (/[\s\d]/.test(f) ? "'" + f + "'" : f)).join(', ');
  // Write the computed paint of every live element onto its clone, so the file needs no stylesheet.
  const inline = (live, copy) => {
    const A = [live, ...live.querySelectorAll('*')], B = [copy, ...copy.querySelectorAll('*')];
    A.forEach((el, i) => {
      if (/^(title|desc|metadata|style|script)$/.test(el.localName)) return;
      const cs = getComputedStyle(el); let st = '';
      for (const k of isText(el) ? PAINT.concat(TEXT) : PAINT) {
        let v = cs.getPropertyValue(k).trim();
        if (!v || SKIP[k] === v) continue;
        if (k === 'display' && v !== 'none') continue;
        if ((k === 'stop-color' || k === 'stop-opacity') && el.localName !== 'stop') continue;
        if ((k === 'flood-color' || k === 'flood-opacity') && !/^fe/.test(el.localName)) continue;
        if (k === 'font-family') v = cleanFont(v);
        st += k + ':' + v.replace(/url\("([^"]+)"\)/g, 'url($1)').replace(/"/g, "'") + ';';
      }
      if (st) B[i].setAttribute('style', st); else B[i].removeAttribute('style');
      B[i].removeAttribute('class');
      for (const at of [...B[i].attributes]) if (/^data-(?!export)/.test(at.name)) B[i].removeAttribute(at.name);
    });
  };
  const refs = (root) => {
    const found = new Set();
    for (const el of [root, ...root.querySelectorAll('*')]) for (const at of el.attributes) {
      if ((at.name === 'href' || at.name === 'xlink:href') && at.value[0] === '#') found.add(at.value.slice(1));
      for (const m of at.value.matchAll(/url\(["']?#([^"')]+)["']?\)/g)) found.add(m[1]);
    }
    return found;
  };

  document.documentElement.classList.add('exporting');
  const s = document.querySelector('#p-' + id);
  if (!s) return { files: [], warnings: [id + ': page missing'] };
  for (let y = 0; y < s.scrollHeight; y += 700) { scrollTo(0, y); await wait(60); }
  scrollTo(0, 0); await wait(400);
  const files = [], warn = [], seen = new Set();
  const list = [...s.querySelectorAll('svg[data-export]')];
  if (minExports && list.length < minExports) warn.push(id + ': ' + list.length + ' exportable SVGs, minimum is ' + minExports);
  for (const svg of list) {
    const name = svg.getAttribute('data-export');
    if (!/^[a-z0-9][a-z0-9-]{0,100}$/.test(name) || !name.startsWith(id + '-')) { warn.push('bad name: ' + name); continue; }
    if (seen.has(name)) { warn.push('duplicate name: ' + name); continue; } seen.add(name);
    const vb = svg.viewBox && svg.viewBox.baseVal;
    if (!vb || !vb.width || !vb.height) { warn.push(name + ': no viewBox'); continue; }
    if (svg.querySelector('foreignObject')) warn.push(name + ': contains foreignObject');
    if (!svg.querySelector(':scope > title')) warn.push(name + ': no <title>');
    const copy = svg.cloneNode(true); inline(svg, copy);
    // Pull in symbols, gradients, clips, masks and filters that live elsewhere in the document.
    let defs = copy.querySelector(':scope > defs');
    if (!defs) { defs = document.createElementNS(NS, 'defs'); copy.insertBefore(defs, copy.firstChild); }
    for (let pass = 0; pass < 6; pass++) {
      let added = 0;
      for (const rid of refs(copy)) {
        if (copy.querySelector('#' + CSS.escape(rid))) continue;
        const src = document.getElementById(rid);
        if (!src) { warn.push(name + ': missing #' + rid); continue; }
        const c = src.cloneNode(true);
        if (src.localName !== 'symbol') inline(src, c); // symbols keep currentColor so they take the colour of each use
        defs.appendChild(c); added++;
      }
      if (!added) break;
    }
    if (!defs.childNodes.length) defs.remove();
    copy.setAttribute('xmlns', NS); copy.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    copy.setAttribute('width', vb.width); copy.setAttribute('height', vb.height);
    const text = '<?xml version="1.0" encoding="UTF-8"?>\n' + new XMLSerializer().serializeToString(copy);
    if (/var\(--/.test(text)) warn.push(name + ': unresolved CSS variable');
    if (/<image\b/.test(text)) warn.push(name + ': contains <image>');
    files.push({ name, text });
  }
  return { files, warnings: warn };
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const all = new Map(), warnings = [], counts = {};
for (const p of pages) {
  try {
    await page.goto(`${base}/${p.id}/?export=1`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(500);
    const r = await page.evaluate(exportPage, { id: p.id, minExports: p.minExports || 0 });
    counts[p.id] = r.files.length; warnings.push(...r.warnings);
    for (const f of r.files) { if (all.has(f.name)) warnings.push('name used on two pages: ' + f.name); else all.set(f.name, f.text); }
  } catch (e) { warnings.push(p.id + ': did not load (' + String(e.message).slice(0, 160) + ')'); }
}
await browser.close();
if (!dry) {
  const target = join(dir, 'export', 'svg');
  if (!only.length) rmSync(target, { recursive: true, force: true }); // full run: start clean so renamed files do not linger
  mkdirSync(target, { recursive: true });
  for (const [n, t] of all) writeFileSync(join(target, n + '.svg'), t, 'utf8');
}
console.log(Object.entries(counts).map(([k, v]) => `${k}: ${v}`).join('\n'));
console.log(`\n${all.size} SVGs ${dry ? 'checked (dry run)' : 'written to export/svg/'}`);
if (warnings.length) { console.log(`\n${warnings.length} warnings:\n` + warnings.join('\n')); process.exitCode = 1; }
