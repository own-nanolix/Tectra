import { HEADINGS, HERO, OVERVIEW, FEATURES } from '@/lib/brand';

// The type scale of the case study (SOURCE.md "Type", measured at 1600 px) as set in globals.css (t-* classes).
// `cls` is the shared class; the hero line has no class and is set from the source values.
export const SCALE = [
  { id: 'figure-xl', cls: 't-figure-xl', size: 150, w: 300, lh: 0.95, ls: '-0.02em', sample: '66%', use: 'Giant figure' },
  { id: 'display', cls: 't-display', size: 88, w: 300, lh: 1.22, ls: '-0.01em', sample: HEADINGS.problem.text, hl: HEADINGS.problem.hl, use: 'Quotes and section headings' },
  { id: 'h1', cls: 't-h1', size: 72, w: 300, lh: 1.16, ls: '-0.01em', sample: HEADINGS.mobile.text, hl: HEADINGS.mobile.hl, use: 'Page title' },
  { id: 'hero', cls: '', size: 64, w: 300, lh: 1.05, ls: '-0.01em', sample: HERO.title.join(' '), use: 'App hero (source value)' },
  { id: 'h2', cls: 't-h2', size: 48, w: 300, lh: 1.18, ls: '-0.005em', sample: FEATURES.heading, hl: FEATURES.hl, use: 'Section subheading' },
  { id: 'figure', cls: 't-figure', size: 44, w: 300, lh: 1, ls: '0', sample: '76%', use: 'Card figures' },
  { id: 'quote', cls: 't-quote', size: 34, w: 300, lh: 1.3, ls: '0', sample: 'Real-time updates were missing.', use: 'Quote body' },
  { id: 'h3', cls: 't-h3', size: 30, w: 400, lh: 1.25, ls: '0', sample: 'Dashboard Overview', use: 'Card heading' },
  { id: 'lead', cls: 't-lead', size: 24, w: 300, lh: 1.4, ls: '0', sample: HERO.sub, use: 'Lead paragraph' },
  { id: 'title', cls: 't-title', size: 20, w: 500, lh: 1.3, ls: '0', sample: 'Cut and Fill', use: 'Card title, label voice' },
  { id: 'body', cls: 't-body', size: 18, w: 300, lh: 1.5, ls: '0', sample: OVERVIEW, use: 'Body' },
  { id: 'label', cls: 't-label', size: 14, w: 400, lh: 1.3, ls: '0', sample: 'UX Architect', use: 'Role lines, axis labels' },
  { id: 'small', cls: 't-small', size: 13, w: 400, lh: 1.4, ls: '0', sample: 'Date: 17 Dec, 2025 11:59PM', use: 'Captions' },
  { id: 'caps', cls: 't-caps', size: 11, w: 500, lh: 1.3, ls: '0.04em', sample: 'Resources', caps: true, use: 'Footer heads, upper case' },
];

// Break a line of words into lines of at most `max` characters, keeping the blue phrase flagged.
export function wrapHl(text, hl, max) {
  const i = hl ? text.indexOf(hl) : -1;
  const parts = i < 0 ? [[text, false]] : [[text.slice(0, i), false], [hl, true], [text.slice(i + hl.length), false]];
  const words = [];
  parts.forEach(([t, on]) => {
    t.split(/(?<= )/).forEach((w) => { if (w) words.push([w, on]); });
  });
  const lines = [[]];
  let len = 0;
  words.forEach(([w, on]) => {
    if (len + w.trim().length > max && lines[lines.length - 1].length) { lines.push([]); len = 0; }
    lines[lines.length - 1].push({ t: w, hl: on });
    len += w.length;
  });
  return lines;
}
