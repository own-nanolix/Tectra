// Small helpers shared by every page.

// Copy text to the clipboard. Resolves true when it worked.
export async function copy(text) {
  try {
    await navigator.clipboard.writeText(String(text));
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = String(text);
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

// fmt(250395) -> "250,395"; fmt(4.88, 2) -> "4.88"; fmt(0.32, 0, '%') -> "32%"
export function fmt(n, decimals = 0, unit = '') {
  const v = unit === '%' && Math.abs(n) <= 1 ? n * 100 : n;
  return v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + unit;
}

// uid('logo-grad') -> "logo-grad-1": stable within a render pass; for ids prefer the page id prefix.
let n = 0;
export function uid(prefix = 'id') {
  n += 1;
  return `${prefix}-${n}`;
}

export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const range = (count, fn = (i) => i) => Array.from({ length: count }, (_, i) => fn(i));

// hex "#4093EC" -> "64, 147, 236"
export function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).join(', ');
}

// WCAG contrast ratio of two hex colours, as a number with two decimals.
export function contrast(a, b) {
  const lum = (hex) => {
    const c = hex.replace('#', '');
    const v = [0, 2, 4].map((i) => parseInt(c.slice(i, i + 2), 16) / 255).map((x) => (x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)));
    return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
  };
  const [x, y] = [lum(a), lum(b)];
  return Math.round(((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)) * 100) / 100;
}

// True when animations should be skipped (reduced motion or SVG export mode).
export function still() {
  if (typeof window === 'undefined') return false;
  return document.documentElement.classList.contains('exporting') || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
