import { HEX } from '@/lib/brand';
import { contrast, hexToRgb } from '@/lib/site';

// Mix two hex colours: t = 0 gives a, t = 1 gives b.
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

// Source: published (printed in the case study), sampled (read from the images), extension (computed here).
export const BLUES = [
  { token: 'blue-100', name: 'Tint toward Paper', hex: mix(HEX.blue, HEX.paper, 0.85), source: 'Extension', css: '' },
  { token: 'blue-200', name: 'Tint toward Sky', hex: mix(HEX.sky, HEX.paper, 0.4), source: 'Extension', css: '' },
  { token: 'blue-300', name: 'Sky', hex: HEX.sky, source: 'Published', css: '--sky' },
  { token: 'blue-400', name: 'Sky to Tectra Blue', hex: mix(HEX.sky, HEX.blue, 0.5), source: 'Extension', css: '' },
  { token: 'blue-500', name: 'Tectra Blue', hex: HEX.blue, source: 'Published', css: '--blue' },
  { token: 'blue-600', name: 'Structure Blue', hex: HEX.deep, source: 'Sampled', css: '--blue-deep' },
  { token: 'blue-700', name: 'Blue ink', hex: HEX.blueInk, source: 'Extension', css: '--blue-ink' },
  { token: 'blue-800', name: 'Blue ink to Navy', hex: mix(HEX.blueInk, HEX.navy, 0.5), source: 'Extension', css: '' },
  { token: 'blue-900', name: 'Navy', hex: HEX.navy, source: 'Extension', css: '--navy' },
];

export const YELLOWS = [
  { token: 'yellow-100', name: 'Tint toward Paper', hex: mix(HEX.yellow, HEX.paper, 0.8), source: 'Extension', css: '' },
  { token: 'yellow-300', name: 'Mid tint', hex: mix(HEX.yellow, HEX.paper, 0.4), source: 'Extension', css: '' },
  { token: 'yellow-500', name: 'Signal Yellow', hex: HEX.yellow, source: 'Published', css: '--yellow' },
  { token: 'yellow-700', name: 'Shade toward ink', hex: mix(HEX.yellow, HEX.yellowInk, 0.5), source: 'Extension', css: '' },
  { token: 'yellow-900', name: 'Yellow ink', hex: HEX.yellowInk, source: 'Extension', css: '--yellow-ink' },
];

export const NEUTRALS = [
  { token: 'neutral-0', name: 'White', hex: HEX.white, source: 'Published', css: '--white' },
  { token: 'neutral-50', name: 'Paper', hex: HEX.paper, source: 'Sampled', css: '--paper' },
  { token: 'neutral-100', name: 'Tile', hex: HEX.tile, source: 'Sampled', css: '--tile' },
  { token: 'neutral-150', name: 'Chip', hex: HEX.chip, source: 'Sampled', css: '--chip' },
  { token: 'neutral-200', name: 'Card', hex: HEX.card, source: 'Sampled', css: '--card' },
  { token: 'neutral-250', name: 'Track', hex: HEX.track, source: 'Sampled', css: '--track' },
  { token: 'neutral-300', name: 'App grey', hex: HEX.app, source: 'Sampled', css: '--app' },
  { token: 'neutral-700', name: 'Muted', hex: HEX.muted, source: 'Extension', css: '--muted' },
  { token: 'neutral-800', name: 'Ink', hex: HEX.ink, source: 'Sampled', css: '--ink' },
  { token: 'neutral-900', name: 'Black', hex: HEX.black, source: 'Published', css: '--black' },
];

// Colour rings (m11): angles in degrees, 0 = 12 o'clock, clockwise.
export const RINGS = [
  { id: 'blue', hex: HEX.blue, cx: 275, cy: 225, r: 195, a0: -110, a1: -14, size: 22, w: 10, big: true },
  { id: 'yellow', hex: HEX.yellow, cx: 694, cy: 215, r: 150, a0: 180, a1: 265, size: 17, w: 9 },
  { id: 'sky', hex: HEX.sky, cx: 1068, cy: 222, r: 150, a0: 228, a1: 265, size: 17, w: 9 },
  { id: 'black', hex: HEX.black, cx: 467, cy: 639, r: 155, a0: 154, a1: 265, size: 17, w: 9 },
  { id: 'white', hex: HEX.white, cx: 846, cy: 639, r: 150, a0: 228, a1: 265, size: 17, w: 9 },
];

export const PROPORTION = [
  { id: 'neutrals', label: 'Neutrals', pct: 60, colors: [HEX.paper, HEX.tile, HEX.card, HEX.app, HEX.muted, HEX.ink] },
  { id: 'blues', label: 'Blues', pct: 30, colors: [HEX.sky, HEX.field, HEX.blue, HEX.deep] },
  { id: 'yellow', label: 'Yellow', pct: 8, colors: [HEX.yellow] },
  { id: 'red', label: 'Red', pct: 2, colors: [HEX.red] },
];

export const PAIRS = [
  { id: 'ink-paper', label: 'Ink on Paper', fg: HEX.ink, bg: HEX.paper },
  { id: 'white-ink', label: 'White on Ink', fg: HEX.white, bg: HEX.ink },
  { id: 'navy-field', label: 'Navy on Field Blue', fg: HEX.navy, bg: HEX.field },
  { id: 'ink-yellow', label: 'Ink on Signal Yellow', fg: HEX.ink, bg: HEX.yellow },
  { id: 'blueink-paper', label: 'Blue ink on Paper', fg: HEX.blueInk, bg: HEX.paper },
  { id: 'white-deep', label: 'White on Structure Blue', fg: HEX.white, bg: HEX.deep },
];

// Semantic roles per mode. Positive is the yellow up triangle and negative the red down triangle of the app.
const INK_SURFACE = mix(HEX.ink, HEX.white, 0.1);
const FIELD_SURFACE = mix(HEX.field, HEX.white, 0.18);
export const MODES = [
  { id: 'light', label: 'Light', note: 'Paper page', bg: HEX.paper, surface: HEX.tile, text: HEX.ink, accent: HEX.blue, signal: HEX.yellow, positive: HEX.yellow, negative: HEX.red },
  { id: 'dark', label: 'Dark: ink', note: 'The app on ink', bg: HEX.ink, surface: INK_SURFACE, text: HEX.white, accent: HEX.sky, signal: HEX.yellow, positive: HEX.yellow, negative: HEX.red },
  { id: 'field', label: 'Dark: blue field', note: 'The app on Field Blue', bg: HEX.field, surface: FIELD_SURFACE, text: HEX.white, accent: HEX.deep, signal: HEX.yellow, positive: HEX.yellow, negative: HEX.red },
];
export const ROLES = ['bg', 'surface', 'text', 'accent', 'signal', 'positive', 'negative'];
export const ROLE_LABEL = { bg: 'Background', surface: 'Surface', text: 'Text', accent: 'Accent', signal: 'Signal', positive: 'Positive', negative: 'Negative' };
