// Data for the dashboard page. Everything comes from the case study (src/lib/brand.js); nothing is invented.
import { KPI, CUT_FILL, WORKCARD } from '@/lib/brand';

// The six KPI cards, in the case study's order.
export const ROWS = Object.entries(KPI).map(([id, k]) => ({
  id, name: k.label, value: parseFloat(k.value), vText: k.value, trend: parseFloat(k.trend), tText: k.trend,
  dir: k.dir, tone: k.tone || 'blue', legend: k.legend,
}));

// The six Cut and Fill level markers (top row, bottom row).
const lv = (t, row) => ({ id: `${row}-${t}`, name: t, value: parseFloat(t), row });
export const LEVELS = [...CUT_FILL.top.map((t) => lv(t, 'Top')), ...CUT_FILL.bottom.map((t) => lv(t, 'Bottom'))];

// The one named work card, then the six cards.
export const WORK = [
  { id: 'workcard', name: WORKCARD.name, sub: WORKCARD.dates, value: 32, vText: WORKCARD.value, trend: null, tText: '', dir: null },
  ...ROWS,
];

export const TREND_CHIPS = [
  { label: 'All', test: () => true },
  { label: 'Up', test: (r) => r.dir === 'up' },
  { label: 'Down', test: (r) => r.dir === 'down' },
];
export const ROW_CHIPS = [
  { label: 'All', test: () => true },
  { label: 'Top', test: (r) => r.row === 'Top' },
  { label: 'Bottom', test: (r) => r.row === 'Bottom' },
];

export const SCREENS = [
  { id: 'overview', label: 'Overview' },
  { id: 'a', label: 'Option A' },
  { id: 'b', label: 'Option B' },
  { id: 'c', label: 'Option C' },
  { id: 'd', label: 'Option D' },
  { id: 'e', label: 'Option E' },
  { id: 'cutfill', label: 'Cut and Fill' },
  { id: 'work', label: 'Work areas' },
];

export const STRUCTS = [
  { id: 'a', name: 'Icon rail with a bento of widgets', nav: 'Icon rail', main: 'Bento of widgets' },
  { id: 'b', name: 'Top tab bar with one hero view and a strip of tiles', nav: 'Top tab bar', main: 'One hero site view' },
  { id: 'c', name: 'Split view: table left, detail panel right', nav: 'Top tab bar', main: 'Table and detail panel' },
  { id: 'd', name: 'Three stacked full-width timeline lanes', nav: 'Top tab bar', main: 'Timeline lanes' },
  { id: 'e', name: 'Map first: full-bleed site view with floating glass cards', nav: 'Floating glass tab bar', main: 'Full-bleed site view' },
];
