// Runs after `next build` (see "postbuild" in package.json).
// The static export writes per-segment prefetch files in nested folders, for example
//   out/logo/__next.!KHNpdGUp/logo/__PAGE__.txt
// but the browser asks for them with dots:
//   /logo/__next.!KHNpdGUp.logo.__PAGE__.txt
// On a plain static host that request is a 404 (pages still work, but the console shows errors and link
// prefetch is lost). This copies each nested file to the dotted name so both addresses exist.
import { readdirSync, statSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'out');
if (!existsSync(out)) process.exit(0);

let copied = 0;
function flatten(dir, base, prefix) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) flatten(full, base, `${prefix}.${name}`);
    else {
      const target = join(base, `${prefix}.${name}`);
      if (!existsSync(target)) { copyFileSync(full, target); copied += 1; }
    }
  }
}
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    if (name.startsWith('__next.')) flatten(full, dir, name);
    else if (name !== '_next') walk(full);
  }
}
walk(out);
console.log(`flatten-prefetch: ${copied} prefetch files copied to dotted names`);
