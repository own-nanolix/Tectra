// Data for the Site view page. Every word and figure comes from src/lib/brand.js (the case study).
import { iso, SITE_PINS } from '@/components/art/KeyArt';
import { r2, AXIS } from '@/lib/charts';
import { WORKCARD, KPI, FEATURES, MOBILE_SCREENS, CUT_FILL, VOLUME } from '@/lib/brand';

// The stage is one SVG of 1200 x 780. The isometric site is placed with this scale and offset.
export const STAGE = { w: 1200, h: 780, k: 2.1, x: 13, y: -100 };
const PLAN_ORIGIN = [262, 118]; // where IsoSiteG puts the plan inside its own 560 x 400 box
const GRID = 20; // px per grid unit, as in IsoSiteG

// Stage coordinates of a pin. Used for the pins drawn in the SVG and for the buttons laid over them.
export function pinPoint(name) {
  const [px, py] = iso(...SITE_PINS[name], GRID);
  return [r2(STAGE.x + STAGE.k * (PLAN_ORIGIN[0] + px)), r2(STAGE.y + STAGE.k * (PLAN_ORIGIN[1] + py))];
}
export function pinPercent(name) {
  const [x, y] = pinPoint(name);
  return { left: `${r2((x / STAGE.w) * 100)}%`, top: `${r2((y / STAGE.h) * 100)}%` };
}

// Five pins. The work card is the one named card of the case study; the other four show the app's own cards.
export const PINS = [
  { id: 'workcard', name: WORKCARD.name, meta: WORKCARD.dates, value: WORKCARD.value, line: FEATURES.rows[0][1], fill: 0.32 },
  { id: 'ridge', name: KPI.details.label, trend: KPI.details.trend, dir: KPI.details.dir, value: KPI.details.value, line: MOBILE_SCREENS[1].text, fill: 0.76 },
  { id: 'wing', name: KPI.notes.label, trend: KPI.notes.trend, dir: KPI.notes.dir, value: KPI.notes.value, line: FEATURES.rows[2][1], fill: 0.64 },
  { id: 'yard', name: KPI.material.label, trend: KPI.material.trend, dir: KPI.material.dir, value: KPI.material.value, line: MOBILE_SCREENS[2].text, fill: 0.32 },
  { id: 'gate', name: KPI.overall.label, trend: KPI.overall.trend, dir: KPI.overall.dir, value: KPI.overall.value, line: MOBILE_SCREENS[0].text, fill: 0.66 },
];

// The scripted walkthrough: one typed caption per pin, in the order of PINS.
export const STEPS = PINS.map((p) => ({
  pin: p.id,
  caption: `${p.name} ${p.value}${p.trend ? ` ${p.trend}` : ''}. ${p.line}`,
}));

// Cross section chart: 48 bars, the range handle sits on bar indices. The axis is the designer's own.
export const CROSS = { count: 48, start: 19, end: 28, title: KPI.cross.label, value: KPI.cross.value, trend: KPI.cross.trend, legend: KPI.cross.legend };
export const axisAt = (v) => AXIS[Math.round((v / (CROSS.count - 1)) * (AXIS.length - 1))];

// Cut and Fill markers in reading order: yellow cut markers alternate with blue fill markers.
// The bottom row of labels belongs to the cut markers, the top row to the fill markers (as the instrument is drawn).
export const MARKERS = [0, 1, 2].flatMap((i) => [
  { id: `cut-${i}`, kind: 'cut', level: CUT_FILL.bottom[i], slot: i * 2, strength: [1, 0.5, 0.32][i] },
  { id: `fill-${i}`, kind: 'fill', level: CUT_FILL.top[i], slot: i * 2 + 1, strength: [1, 0.5, 0.32][i] },
]);

export { WORKCARD, KPI, CUT_FILL, VOLUME };
