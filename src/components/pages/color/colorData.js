import { HEX } from '@/lib/brand';
import { contrast, hexToRgb } from '@/lib/site';

// Mix two hex colours: t = 0 gives a, t = 1 gives b. Every in-between step on this page is computed here.
export function mix(a, b, t) {
  const pa = hexToRgb(a).split(', ').map(Number);
  const pb = hexToRgb(b).split(', ').map(Number);
  const out = pa.map((v, i) => Math.round(v + (pb[i] - v) * t));
  return '#' + out.map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase();
}

export const LIGHT = HEX.paper;
export const DARK = HEX.ink;

// Readable text colour for a given fill.
export const textOn = (hex) => (contrast(hex, HEX.ink) >= contrast(hex, HEX.white) ? HEX.ink : HEX.white);

export const rgbOf = (hex) => `rgb(${hexToRgb(hex)})`;

export function rating(ratio) {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'Large text only';
  return 'Decoration only';
}

export const fmtRatio = (r) => `${r.toFixed(2)}:1`;

// The case study's muted grey for role lines and axis labels (approximate, read from thin text).
const MUTED_SAMPLED = '#8F8F8F';

// A step mixed in code between two named colours. `pct` is the share of the first colour.
const step = (token, a, aName, b, bName, pct) => ({
  token,
  name: `${aName} ${pct}%`,
  hex: mix(a, b, 1 - pct / 100),
  source: `${pct}% ${aName}, ${100 - pct}% ${bName}`,
  css: '',
});

// Source: Published (printed in the case study), Sampled (read from the images), Small-text ink (the site's
// darker inks for text under 24 px), or the mix it is computed from.
export const BLUES = [
  step('blue-100', HEX.blue, 'Tectra Blue', HEX.paper, 'Paper', 15),
  step('blue-200', HEX.sky, 'Sky', HEX.paper, 'Paper', 60),
  { token: 'blue-300', name: 'Sky', hex: HEX.sky, source: 'Published', css: '--sky' },
  { token: 'blue-400', name: 'Field Blue', hex: HEX.field, source: 'Sampled', css: '--blue-field' },
  { token: 'blue-500', name: 'Tectra Blue', hex: HEX.blue, source: 'Published', css: '--blue' },
  { token: 'blue-600', name: 'Structure Blue', hex: HEX.deep, source: 'Sampled', css: '--blue-deep' },
  { token: 'blue-700', name: 'Blue ink', hex: HEX.blueInk, source: 'Small-text ink', css: '--blue-ink' },
  step('blue-800', HEX.blueInk, 'Blue ink', HEX.navy, 'Navy', 50),
  { token: 'blue-900', name: 'Navy', hex: HEX.navy, source: 'Small-text ink', css: '--navy' },
];

export const SIGNALS = [
  step('yellow-100', HEX.yellow, 'Signal Yellow', HEX.paper, 'Paper', 20),
  step('yellow-300', HEX.yellow, 'Signal Yellow', HEX.paper, 'Paper', 60),
  { token: 'yellow-500', name: 'Signal Yellow', hex: HEX.yellow, source: 'Published', css: '--yellow' },
  step('yellow-700', HEX.yellow, 'Signal Yellow', HEX.yellowInk, 'Yellow ink', 50),
  { token: 'yellow-900', name: 'Yellow ink', hex: HEX.yellowInk, source: 'Small-text ink', css: '--yellow-ink' },
  { token: 'red-500', name: 'Alert Red', hex: HEX.red, source: 'Sampled', css: '--red' },
  { token: 'red-700', name: 'Red ink', hex: HEX.redInk, source: 'Small-text ink', css: '--red-ink' },
];

export const NEUTRALS = [
  { token: 'neutral-0', name: 'White', hex: HEX.white, source: 'Published', css: '--white' },
  { token: 'neutral-50', name: 'Paper', hex: HEX.paper, source: 'Sampled', css: '--paper' },
  { token: 'neutral-100', name: 'Tile', hex: HEX.tile, source: 'Sampled', css: '--tile' },
  { token: 'neutral-150', name: 'Chip', hex: HEX.chip, source: 'Sampled', css: '--chip' },
  { token: 'neutral-200', name: 'Card', hex: HEX.card, source: 'Sampled', css: '--card' },
  { token: 'neutral-250', name: 'Track', hex: HEX.track, source: 'Sampled', css: '--track' },
  { token: 'neutral-300', name: 'App grey', hex: HEX.app, source: 'Sampled', css: '--app' },
  { token: 'neutral-500', name: 'Muted', hex: MUTED_SAMPLED, source: 'Sampled', css: '' },
  { token: 'neutral-700', name: 'Muted ink', hex: HEX.muted, source: 'Small-text ink', css: '--muted' },
  { token: 'neutral-800', name: 'Ink', hex: HEX.ink, source: 'Sampled', css: '--ink' },
  { token: 'neutral-900', name: 'Black', hex: HEX.black, source: 'Published', css: '--black' },
];

// Every scale step as CSS custom properties, for the "copy all" button.
export const CSS_ALL = `:root {\n${[...BLUES, ...SIGNALS, ...NEUTRALS].map((r) => `  --${r.token}: ${r.hex};`).join('\n')}\n}`;
export const STEP_COUNT = BLUES.length + SIGNALS.length + NEUTRALS.length;

// Colour rings (m11), measured on the case study at 1600 px: radius, arc from a0 to a1 in degrees
// (0 = 12 o'clock, clockwise), the dots at both ends. `label` is the hex as shown here.
export const RINGS = [
  { id: 'blue', name: 'Tectra Blue', hex: HEX.blue, label: HEX.blue, r: 195, a0: -110, a1: -14, big: true },
  { id: 'yellow', name: 'Signal Yellow', hex: HEX.yellow, label: HEX.yellow, r: 155, a0: 180, a1: 276 },
  { id: 'sky', name: 'Sky', hex: HEX.sky, label: HEX.sky, r: 155, a0: 228, a1: 275 },
  { id: 'black', name: 'Black', hex: HEX.black, label: HEX.black, r: 155, a0: 154, a1: 275 },
  { id: 'white', name: 'White', hex: HEX.white, label: HEX.white, r: 152, a0: 228, a1: 275 },
];

// Shares as estimated in SOURCE.md: neutrals about 60%, blues about 30%, yellow about 8%, red under 2%.
export const PROPORTION = [
  { id: 'neutrals', label: 'Neutrals about 60%', pct: 60, colors: [HEX.paper, HEX.tile, HEX.card, HEX.app, MUTED_SAMPLED, HEX.ink] },
  { id: 'blues', label: 'Blues about 30%', pct: 30, colors: [HEX.sky, HEX.field, HEX.blue, HEX.deep] },
  { id: 'yellow', label: 'Yellow about 8%', pct: 8, colors: [HEX.yellow] },
  { id: 'red', label: 'Red under 2%', pct: 2, colors: [HEX.red] },
];

export const PAIRS = [
  { id: 'ink-paper', label: 'Ink on Paper', fg: HEX.ink, bg: HEX.paper },
  { id: 'white-ink', label: 'White on Ink', fg: HEX.white, bg: HEX.ink },
  { id: 'navy-field', label: 'Navy on Field Blue', fg: HEX.navy, bg: HEX.field },
  { id: 'ink-yellow', label: 'Ink on Signal Yellow', fg: HEX.ink, bg: HEX.yellow },
  { id: 'blueink-paper', label: 'Blue ink on Paper', fg: HEX.blueInk, bg: HEX.paper },
  { id: 'white-deep', label: 'White on Structure Blue', fg: HEX.white, bg: HEX.deep },
];

// Semantic roles for light and dark mode. Positive and negative are the app's trend triangles: yellow up, red down.
// The dark surface is mixed in code: 90% Ink, 10% White.
const INK_SURFACE = mix(HEX.ink, HEX.white, 0.1);
export const MODES = [
  { id: 'light', label: 'Light', bg: HEX.paper, surface: HEX.tile, text: HEX.ink, muted: HEX.muted, accent: HEX.blue, signal: HEX.yellow, positive: HEX.yellow, negative: HEX.red },
  { id: 'dark', label: 'Dark', bg: HEX.ink, surface: INK_SURFACE, text: HEX.white, muted: HEX.app, accent: HEX.sky, signal: HEX.yellow, positive: HEX.yellow, negative: HEX.red },
];
export const ROLES = ['bg', 'surface', 'text', 'muted', 'accent', 'signal', 'positive', 'negative'];
export const ROLE_LABEL = { bg: 'Background', surface: 'Surface', text: 'Text', muted: 'Secondary text', accent: 'Accent', signal: 'Signal', positive: 'Positive', negative: 'Negative' };
