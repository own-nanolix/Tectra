import { KOMATSU, KPI, CUT_FILL, VOLUME } from '@/lib/brand';
import { SITE_PINS, iso } from '@/components/art/KeyArt';

// The site artwork is drawn with the plan origin at (262, 118) and 20 px per grid unit (see KeyArt IsoSiteG).
// The hero crops the 560 x 400 box to this view; the pin buttons are placed from the same numbers.
export const VIEW = { x: 20, y: 40, w: 520, h: 360 };
export const pinAt = (name) => {
  const [px, py] = iso(...SITE_PINS[name], 20);
  const x = 262 + px, y = 118 + py;
  return { left: ((x - VIEW.x) / VIEW.w) * 100, top: ((y - VIEW.y) / VIEW.h) * 100 };
};

// The five pins of the site view and the work card each one opens (all printed in the case study).
export const PINS = [
  { id: 'komatsu', site: 'komatsu', name: KOMATSU.name, sub: KOMATSU.dates, value: KOMATSU.value },
  { id: 'details', site: 'ridge', name: KPI.details.label, value: KPI.details.value, trend: KPI.details.trend, dir: KPI.details.dir },
  { id: 'notes', site: 'wing', name: KPI.notes.label, value: KPI.notes.value, trend: KPI.notes.trend, dir: KPI.notes.dir },
  { id: 'material', site: 'yard', name: KPI.material.label, value: KPI.material.value, trend: KPI.material.trend, dir: KPI.material.dir, legend: KPI.material.legend },
  { id: 'cutfill', site: 'gate', name: CUT_FILL.title, sub: CUT_FILL.date, value: CUT_FILL.indicators[2].join(' ') },
];

const ind = (n) => CUT_FILL.indicators[n];
const parse = (v) => Number(v.replace(/[^0-9.]/g, '').replace(/\.(?=.*\.)/g, ''));
const cut = parse(ind(0)[1]);

// Cards of the 3-up. gauge = 0..1 draws the corner arc; bar = 0..1 draws a thin bar.
export const CARDS = {
  komatsu: { label: KOMATSU.name, value: KOMATSU.value, sub: KOMATSU.dates, gauge: 0.32, tone: 'blue' },
  overall: { label: KPI.overall.label, value: KPI.overall.value, trend: KPI.overall.trend, dir: 'up', gauge: 0.66, tone: 'blue' },
  cross: { label: KPI.cross.label, value: KPI.cross.value, trend: KPI.cross.trend, dir: 'up', gauge: 0.76, tone: 'blue', sub: KPI.cross.legend },
  details: { label: KPI.details.label, value: KPI.details.value, trend: KPI.details.trend, dir: 'up', gauge: 0.76, tone: 'blue' },
  notes: { label: KPI.notes.label, value: KPI.notes.value, trend: KPI.notes.trend, dir: 'down', gauge: 0.64, tone: 'yellow' },
  material: { label: KPI.material.label, value: KPI.material.value, trend: KPI.material.trend, dir: 'up', gauge: 0.32, tone: 'blue', chip: KPI.material.legend },
  volume: { label: `${VOLUME.from} →`, value: VOLUME.to, segs: [VOLUME.segments, VOLUME.filled], tone: 'blue' },
  cut: { label: 'Cut', value: ind(0)[1], bar: 1, tone: 'yellow' },
  fill: { label: 'Fill', value: ind(1)[1], bar: parse(ind(1)[1]) / cut, tone: 'blue' },
  net: { label: 'Net', value: ind(2)[1], bar: parse(ind(2)[1]) / cut, tone: 'blue' },
};

export const TRIOS = {
  komatsu: ['komatsu', 'overall', 'cross'],
  details: ['details', 'notes', 'material'],
  notes: ['notes', 'material', 'details'],
  material: ['material', 'volume', 'overall'],
  cutfill: ['cut', 'fill', 'net'],
};

export const CUT_VALUE = cut;
export const NUM = parse;
