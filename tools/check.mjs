// Checks the static export in out/ against pages.json.   npm run build, then: node tools/check.mjs [--strict]
import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const strict = process.argv.includes('--strict');
const dir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const list = JSON.parse(readFileSync(join(dir, 'pages.json'), 'utf8')); // [{ id, title, group, minExports }]
const out = join(dir, 'out');
if (!existsSync(out)) { console.error('out/ not found: run npm run build first (next.config needs output: "export").'); process.exit(1); }

// Returns the <section> starting at `start`, with nested sections balanced.
const sectionAt = (html, start) => {
  const re = /<(\/?)section\b[^>]*>/gi; re.lastIndex = start; let depth = 0, m;
  while ((m = re.exec(html))) { depth += m[1] ? -1 : 1; if (depth === 0) return html.slice(start, re.lastIndex); }
  return html.slice(start);
};

let bad = 0, okCount = 0;
const report = [], exportNames = new Map();
for (const { id, minExports = 0 } of list) {
  const file = [join(out, id, 'index.html'), join(out, id + '.html')].find((f) => existsSync(f));
  if (!file) { report.push(`MISSING  ${id}`); bad++; continue; }
  // Markup only: drop scripts (the React payload) and styles.
  const html = readFileSync(file, 'utf8').replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<style\b[\s\S]*?<\/style>/gi, '');
  const start = html.search(new RegExp(`<section\\b[^>]*\\sid="p-${id}"`));
  if (start < 0) { report.push(`WARN     ${id.padEnd(18)} no <section id="p-${id}">`); bad++; continue; }
  const sec = sectionAt(html, start);
  const problems = [];
  if (/\sdata-stub\b/.test(sec)) problems.push('still a stub');
  if (/<img\b/i.test(sec)) problems.push('contains <img> (assets must be code)');
  if (/data:image\/(png|jpe?g|gif|webp)/i.test(sec)) problems.push('embedded raster image');
  if (/<foreignObject\b/i.test(sec)) problems.push('contains <foreignObject>');
  if (/https?:\/\//i.test(sec.replace(/xmlns(:\w+)?="[^"]*"/g, ''))) problems.push('external URL');
  const h1 = (html.match(/<h1\b/gi) || []).length;
  if (h1 !== 1) problems.push(`${h1} <h1> on the page (need exactly 1)`);
  const ids = {}; for (const m of sec.matchAll(/\sid="([^"]+)"/g)) ids[m[1]] = (ids[m[1]] || 0) + 1;
  const dup = Object.keys(ids).filter((k) => ids[k] > 1);
  if (dup.length) problems.push('duplicate ids: ' + dup.slice(0, 5).join(', '));
  const loose = Object.keys(ids).filter((k) => k !== `p-${id}` && !k.startsWith(id + '-'));
  if (loose.length) problems.push(`ids without "${id}-" prefix: ` + loose.slice(0, 5).join(', '));
  let exp = 0;
  for (const m of sec.matchAll(/\sdata-export="([^"]*)"/g)) {
    const n = m[1]; exp++;
    if (!/^[a-z0-9][a-z0-9-]*$/.test(n) || !n.startsWith(id + '-')) problems.push('bad export name: ' + n);
    else if (exportNames.has(n)) problems.push('export name used twice: ' + n + ' (also on ' + exportNames.get(n) + ')');
    else exportNames.set(n, id);
  }
  if (exp < minExports) problems.push(`${exp} exportable SVGs, minimum is ${minExports}`);
  if (problems.length) bad++; else okCount++;
  report.push(`${problems.length ? 'WARN   ' : 'ok     '}  ${id.padEnd(18)} exp ${String(exp).padStart(3)}/${String(minExports).padEnd(3)} ${problems.join('; ')}`);
}
if (!existsSync(join(out, 'index.html'))) { report.push('WARN     "/" (out/index.html) is missing'); bad++; }
console.log(report.join('\n'));
console.log(`\n${okCount} of ${list.length} pages ok`);
if (strict && bad) process.exit(1);
