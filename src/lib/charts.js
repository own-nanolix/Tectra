// Tectra's chart helpers: scales, paths, ticks. Pure functions that return numbers and SVG path strings.
// Charts are drawn as inline SVG by the pages; geometry goes in attributes, never in CSS.

// The designer's own axis, kept in the order printed in the case study.
export const AXIS = [0, 10, 20, 60, 70, 80, 90, 100, 30, 40, 50];

export const scale = (d0, d1, r0, r1) => (v) => r0 + ((v - d0) / (d1 - d0 || 1)) * (r1 - r0);
export const r2 = (n) => Math.round(n * 100) / 100;

// linePath([[x,y],...]) -> "M..L.." (straight segments: the brand's polylines are angular, not curved)
export function linePath(points) {
  return points.map(([x, y], i) => `${i ? 'L' : 'M'}${r2(x)} ${r2(y)}`).join('');
}

// Smooth variant for the one soft chart (the glass area chart).
export function curvePath(points, tension = 0.5) {
  if (points.length < 3) return linePath(points);
  let d = `M${r2(points[0][0])} ${r2(points[0][1])}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i], p1 = points[i], p2 = points[i + 1], p3 = points[i + 2] || p2;
    const c1 = [p1[0] + ((p2[0] - p0[0]) / 6) * tension * 2, p1[1] + ((p2[1] - p0[1]) / 6) * tension * 2];
    const c2 = [p2[0] - ((p3[0] - p1[0]) / 6) * tension * 2, p2[1] - ((p3[1] - p1[1]) / 6) * tension * 2];
    d += `C${r2(c1[0])} ${r2(c1[1])} ${r2(c2[0])} ${r2(c2[1])} ${r2(p2[0])} ${r2(p2[1])}`;
  }
  return d;
}

// Closes a line down to a baseline: areaPath(points, baseY)
export function areaPath(points, baseY, smooth = false) {
  const top = smooth ? curvePath(points) : linePath(points);
  return `${top}L${r2(points[points.length - 1][0])} ${r2(baseY)}L${r2(points[0][0])} ${r2(baseY)}Z`;
}

export const polar = (cx, cy, r, deg) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [r2(cx + r * Math.cos(a)), r2(cy + r * Math.sin(a))];
};

// Arc from angle a0 to a1 in degrees, 0 = 12 o'clock, clockwise.
export function arcPath(cx, cy, r, a0, a1) {
  const [x0, y0] = polar(cx, cy, r, a0);
  const [x1, y1] = polar(cx, cy, r, a1);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  const sweep = a1 > a0 ? 1 : 0;
  return `M${x0} ${y0}A${r} ${r} 0 ${large} ${sweep} ${x1} ${y1}`;
}

// Length of an arc, for stroke-dasharray draw-on animations.
export const arcLength = (r, a0, a1) => r2((Math.abs(a1 - a0) * Math.PI * r) / 180);

// The brand's corner gauge: a quarter circle that rises out of a card's bottom edge and leaves by its right edge.
// For a card corner at (w, h), radius r and value 0..1 it returns
// { track, value, dot: [x, y], len } where track and value are path strings and len is the value arc's length.
export function cornerGauge(w, h, r, value) {
  const cx = w - r * 0.18, cy = h + r * 0.1;
  const a0 = -96, a1 = 0;
  const av = a0 + (a1 - a0) * Math.max(0, Math.min(1, value));
  return { track: arcPath(cx, cy, r, a0, 30), value: arcPath(cx, cy, r, a0, av), dot: polar(cx, cy, r, av), len: arcLength(r, a0, av) };
}

// Tick-bar chart: `count` thin bars across width w; bars whose centre lies inside [from, to] (0..1) are on.
// Returns [{ x, w, on, t }]. Draw each as a rect filled with a vertical gradient that fades to nothing.
export function tickBars(count, w, from, to, gap = 0.5) {
  const step = w / count;
  const bw = step * (1 - gap);
  return Array.from({ length: count }, (_, i) => {
    const t = (i + 0.5) / count;
    return { x: r2(i * step + (step - bw) / 2), w: r2(bw), on: t >= from && t <= to, t };
  });
}

// Fine ruler ticks: returns x positions.
export const ruler = (count, w) => Array.from({ length: count + 1 }, (_, i) => r2((i / count) * w));

// Positions for the AXIS labels across width w: [{ label, x }]
export const axisLabels = (w, labels = AXIS) => labels.map((label, i) => ({ label, x: r2((i / (labels.length - 1)) * w) }));

// Nice ticks for ordinary axes.
export function ticks(d0, d1, n = 5) {
  const span = d1 - d0, step0 = span / n, mag = Math.pow(10, Math.floor(Math.log10(step0)));
  const step = [1, 2, 5, 10].map((m) => m * mag).find((s) => span / s <= n) || mag * 10;
  const out = [];
  for (let v = Math.ceil(d0 / step) * step; v <= d1 + 1e-9; v += step) out.push(r2(v));
  return out;
}

// Donut / share segments: returns [{ d, mid: [x, y], value }]
export function shares(values, cx, cy, r, gapDeg = 2) {
  const total = values.reduce((a, b) => a + b, 0);
  let a = 0;
  return values.map((value) => {
    const span = (value / total) * 360;
    const seg = { d: arcPath(cx, cy, r, a + gapDeg / 2, a + span - gapDeg / 2), mid: polar(cx, cy, r, a + span / 2), value };
    a += span;
    return seg;
  });
}

// Segmented progress: n segments across w with a gap; returns [{ x, w, on }]
export function segments(n, w, filled, gap = 6) {
  const sw = (w - gap * (n - 1)) / n;
  return Array.from({ length: n }, (_, i) => ({ x: r2(i * (sw + gap)), w: r2(sw), on: i < filled }));
}

// Deterministic pseudo-random numbers, so the server and the browser draw the same artwork.
export function seeded(seed = 1) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}
