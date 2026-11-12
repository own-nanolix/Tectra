'use client';

// Charts and illustrations of the dashboard. Every chart is one inline SVG. Pass `name` to make it an exportable
// <Art> (data-export); without it the same drawing is a plain labelled SVG inside a screen. Hover and keyboard focus
// show a tooltip through <Tip>, which lays transparent buttons (HTML, outside the SVG) over the chart.
import { useState } from 'react';
import Art from '@/components/art/Art';
import { IsoSiteG, PinG, TickBarsG, GaugeG, SITE_PINS, iso } from '@/components/art/KeyArt';
import { CutFillG } from '@/components/art/Devices';
import { AXIS, axisLabels, segments, r2 } from '@/lib/charts';
import { KPI, VOLUME, CUT_FILL } from '@/lib/brand';
import s from './dashboard.module.css';

export function Plot({ vb, title, name, children, ...rest }) {
  if (name) return <Art viewBox={vb} title={title} exportName={name} {...rest}>{children}</Art>;
  return (
    <svg viewBox={vb} role="img" aria-label={title} {...rest}>
      <title>{title}</title>
      {children}
    </svg>
  );
}

// zones: [{ x, w, text }] as fractions of the width.
export function Tip({ zones, children, className = '' }) {
  const [on, setOn] = useState(-1);
  const z = zones[on];
  return (
    <div className={`${s.tip} ${className}`} onMouseLeave={() => setOn(-1)}>
      {children}
      {zones.map((zn, i) => (
        <button key={zn.text} type="button" className={s.zone} style={{ left: `${zn.x * 100}%`, width: `${zn.w * 100}%` }} aria-label={zn.text}
          onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)} onBlur={() => setOn(-1)} />
      ))}
      {z && <span className={s.bubble} style={{ left: `${Math.min(86, Math.max(14, (z.x + z.w / 2) * 100))}%` }}>{z.text}</span>}
    </div>
  );
}

const MUTED = '#5E5E5E';
const handle = (x, y, col) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M5 3.5H31" stroke={col} strokeWidth="1.2" />
    <rect width="10" height="7" rx="1" fill={col} />
    <rect x="26" width="10" height="7" rx="1" fill={col} />
  </g>
);

// Tick-bar chart: bars fade downward, a yellow or blue band, ruler, range handle and the designer's axis order.
export function TickChart({ idp, name, w = 600, H = 60, tone = 'yellow', from = 0.36, to = 0.6, legend = KPI.cross.legend, axis = true }) {
  const col = tone === 'yellow' ? '#FFB83D' : '#4093EC';
  const c = KPI.cross;
  const zones = [{ x: from, w: to - from, text: `${c.label} ${c.value}, ${c.trend}` }];
  return (
    <Tip zones={zones}>
      <Plot vb={`0 -24 ${w} ${H + (axis ? 78 : 50)}`} title={`${c.label} tick-bar chart, axis ${AXIS.join(' ')}`} name={name}>
        <TickBarsG idp={idp} w={w} h={H} count={Math.round(w / 10.7)} from={from} to={to} tone={tone} base="#CFCFCF" rise />
        {handle(w - 78, -20, col)}
        <text x={w} y="-12" fontSize="12" textAnchor="end" fill={MUTED}>{legend}</text>
        {axis && axisLabels(w).map((a, i) => (
          <text key={i} x={a.x} y={H + 46} fontSize="12" textAnchor={i === 0 ? 'start' : i === 10 ? 'end' : 'middle'} fill={MUTED}>{a.label}</text>
        ))}
      </Plot>
    </Tip>
  );
}

// Progress bar: a solid blue run, then grey ticks. Used for "Progres" and for the work card.
export function ProgressBar({ idp, name, w = 600, value = 0.24, legend = KPI.progress.legend, date = KPI.progress.date, tip }) {
  const bw = r2(value * w * 0.9);
  const text = tip || `${KPI.progress.label} ${KPI.progress.value}, ${KPI.progress.trend}`;
  return (
    <Tip zones={[{ x: 0, w: 1, text }]}>
      <Plot vb={`0 0 ${w} 44`} title={`${text}${legend ? `, ${legend}` : ''}`} name={name}>
        <pattern id={`${idp}-pb-t`} width="4" height="14" patternUnits="userSpaceOnUse"><path d="M1 0v14" stroke="#BDBDBD" strokeWidth="1" /></pattern>
        <text x="0" y="12" fontSize="12" fill={MUTED}>{date}</text>
        {legend && <text x={w} y="12" fontSize="12" textAnchor="end" fill={MUTED}>{legend}</text>}
        {legend && handle(w - 84, 4, '#4093EC')}
        <rect x="0" y="26" width={bw} height="5" fill="#4093EC" className="grow-x" />
        <rect x={bw + 6} y="22" width={w - bw - 6} height="14" fill={`url(#${idp}-pb-t)`} />
      </Plot>
    </Tip>
  );
}

const AREA = 'M0 120C46 90 56 60 86 50C106 44 116 24 136 12C156 22 176 60 206 90C236 120 256 140 286 160';
// The glass panel's area chart with one ring marker.
export function AreaChart({ idp, name }) {
  const o = KPI.overall;
  return (
    <Tip zones={[{ x: 0.36, w: 0.24, text: `${o.label} ${o.value}, ${o.trend}` }]}>
      <Plot vb="0 0 286 190" title={`${o.label} area chart, ${o.value}, ${o.trend}`} name={name}>
        <linearGradient id={`${idp}-ar`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.75" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        {name && <rect width="286" height="190" rx="4" fill="#53A2F7" />}
        <path d={`${AREA}V190H0Z`} fill={`url(#${idp}-ar)`} className="fade-in" />
        <path d={AREA} fill="none" stroke="#FFFFFF" strokeWidth="2" pathLength="1000" className="draw" />
        <circle cx="136" cy="12" r="6" fill="#FFFFFF" className="ring" />
        <g className="pop"><circle cx="136" cy="12" r="6" fill="#FFFFFF" /><circle cx="136" cy="12" r="2.4" fill="#4093EC" /></g>
      </Plot>
    </Tip>
  );
}

// "15.837 cu yd" to "75.484 cu yd" with the 8-segment bar (4 filled).
export function VolumeBar({ name }) {
  const segs = segments(VOLUME.segments, 286, VOLUME.filled, 5);
  const text = `${VOLUME.from} to ${VOLUME.to}, ${VOLUME.filled} of ${VOLUME.segments} segments`;
  return (
    <Tip zones={[{ x: 0, w: 1, text }]}>
      <Plot vb={name ? '-16 -14 318 68' : '0 0 286 40'} title={text} name={name}>
        {name && <rect x="-16" y="-14" width="318" height="68" rx="4" fill="#53A2F7" />}
        <text x="0" y="12" fontSize="12" fill="#0A2E63">{VOLUME.from}</text>
        <text x="286" y="12" fontSize="12" textAnchor="end" fill="#0A2E63">{VOLUME.to}</text>
        <path d="M116 8h50m-4-3 4 3-4 3" fill="none" stroke="#0A2E63" strokeWidth="1" />
        {segs.map((g, i) => (
          <rect key={i} x={g.x} y="24" width={g.w} height="6" rx="1" fill={g.on ? '#2F7FE0' : '#FFFFFF'} fillOpacity={g.on ? 1 : 0.55} className="grow-x" style={{ '--i': i }} />
        ))}
      </Plot>
    </Tip>
  );
}

// Quarter-arc gauge cut by the card corner. `k` is a key of KPI (details, notes, material, ...).
// The radius is capped so the arc never runs into the figure at the card's bottom left (about 104 px wide).
function GaugeLayer({ idp, k, w, h }) {
  const d = KPI[k];
  const r = r2(Math.min(Math.min(w, h) * 0.52, (w - 104) / 1.28));
  return (
    <>
      <clipPath id={`${idp}-gc-${k}`}><rect width={w} height={h} rx="4" /></clipPath>
      <g clipPath={`url(#${idp}-gc-${k})`}>
        <GaugeG w={w} h={h} r={r} value={parseFloat(d.value) / 100} tone={d.tone === 'yellow' ? 'yellow' : 'blue'} track="#D2D2D2" draw />
      </g>
    </>
  );
}

// Bare gauge that fills an HTML card.
export function Gauge({ idp, k, w = 270, h = 190 }) {
  const d = KPI[k];
  return (
    <Plot vb={`0 0 ${w} ${h}`} title={`${d.label} gauge, ${d.value}`} preserveAspectRatio="xMaxYMax slice" className={s.fillSvg}>
      <GaugeLayer idp={idp} k={k} w={w} h={h} />
    </Plot>
  );
}

// The full gauge card as exportable artwork.
export function GaugeArt({ idp, k, name }) {
  const d = KPI[k], w = 270, h = 190;
  return (
    <Plot vb={`0 0 ${w} ${h}`} title={`${d.label} card, ${d.value}, ${d.trend}`} name={name}>
      <rect width={w} height={h} rx="4" fill="#E9E9E9" />
      <text x="24" y="42" fontSize="20" fontWeight="500" fill="#2F2F2F">{d.label}</text>
      <path d={`M${w - 36} 40l10-10m-7 0h7v7`} fill="none" stroke="#2F2F2F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="24" y={h - 78} fontSize="13" fill="#2F2F2F">{d.trend}</text>
      <path d={d.dir === 'up' ? `M${24 + d.trend.length * 7.6 + 6} ${h - 78}l6-7 6 7z` : `M${24 + d.trend.length * 7.6 + 6} ${h - 85}l6 7 6-7z`} fill={d.dir === 'up' ? '#FFB83D' : '#E2383B'} />
      <text x="24" y={h - 30} fontSize="36" fontWeight="300" fill="#2F2F2F">{d.value}</text>
      {d.legend && (<g><circle cx={w - 74} cy="68" r="4" fill="#4093EC" /><text x={w - 24} y="72" fontSize="12" textAnchor="end" fill={MUTED}>{d.legend}</text></g>)}
      <GaugeLayer idp={idp} k={k} w={w} h={h} />
    </Plot>
  );
}

// The isometric site with two white pins; the yellow pin sits on the work card (drawn in HTML on screens).
export function Site({ idp, name, yellow = false, ...rest }) {
  const pin = (p, i, extra) => {
    const [x, y] = iso(...SITE_PINS[p], 20);
    return <g key={p} className="pop" style={{ '--i': i }}><PinG x={x} y={y} {...extra} /></g>;
  };
  return (
    <Plot vb="0 0 560 400" title="Isometric site with two location pins" name={name} {...rest}>
      {name && (
        <>
          <linearGradient id={`${idp}-sb`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5BA8F8" /><stop offset="1" stopColor="#4C9BF3" /></linearGradient>
          <rect width="560" height="400" fill={`url(#${idp}-sb)`} />
        </>
      )}
      <IsoSiteG tone="blue" seed={5} />
      <g transform="translate(262 118)">
        {['ridge', 'wing'].map((p, i) => pin(p, i))}
        {yellow && pin('workcard', 2, { tone: 'yellow', pulse: true, r: 8 })}
      </g>
    </Plot>
  );
}

// The Cut and Fill instrument: six level markers.
export function CutFillChart({ name, w = 370 }) {
  const zones = [0, 1, 2, 3, 4, 5].map((j) => ({ x: j / 6, w: 1 / 6, text: `Level ${j % 2 ? CUT_FILL.top[(j - 1) / 2] : CUT_FILL.bottom[j / 2]}` }));
  return (
    <Tip zones={zones}>
      <Plot vb={`0 0 ${w} 92`} title={`${CUT_FILL.title}, six level markers`} name={name}><CutFillG w={w} h={92} /></Plot>
    </Tip>
  );
}

// Thumbnail diagrams of the five dashboard structures (rect lists on a 320 x 200 board).
const G = '#E9E9E9', B = '#53A2F7', Y = '#FFB83D', W = 'rgba(255,255,255,0.5)', D = '#C9C9C9';
const bar = [[8, 8, 14, 14, Y], [110, 8, 100, 14, G], [280, 8, 14, 14, G], [298, 8, 14, 14, G]];
const STRUCT = {
  a: [[8, 8, 14, 14, Y], [110, 8, 100, 14, G], [280, 8, 14, 14, G], [298, 8, 14, 14, G], ...[0, 1, 2, 3, 4].map((i) => [8, 56 + i * 18, 14, 14, i === 1 ? D : G]),
    [30, 28, 282, 100, B], [214, 40, 44, 60, W], [266, 40, 40, 80, W], [90, 52, 40, 24, W], [30, 134, 120, 60, G], [156, 134, 50, 28, G], [210, 134, 50, 28, G], [264, 134, 48, 28, G], [156, 166, 156, 28, G]],
  b: [...bar, [8, 28, 304, 108, B], [200, 40, 46, 70, W], [254, 40, 50, 90, W], [90, 56, 40, 24, W], ...[0, 1, 2, 3, 4, 5].map((i) => [8 + i * 51.3, 144, 47, 48, G])],
  c: [...bar, [8, 28, 176, 12, D], ...[0, 1, 2, 3, 4, 5].map((i) => [8, 46 + i * 24, 176, 18, G]), [194, 28, 118, 164, G], [200, 34, 106, 52, B], [200, 92, 106, 6, D], [200, 104, 60, 6, Y]],
  d: [...bar, ...[0, 1, 2].map((i) => [8, 28 + i * 56, 304, 50, G]), ...[0, 1, 2].map((i) => [16, 36 + i * 56, 56, 8, D]), [90, 40, 120, 30, Y], [100, 96, 90, 30, B], [140, 152, 150, 30, B]],
  e: [[0, 0, 320, 200, B], [14, 8, 292, 18, W], [14, 40, 110, 12, W], [14, 58, 80, 8, W], [214, 40, 92, 70, W], [130, 90, 56, 40, W], [14, 136, 100, 52, W], [122, 136, 60, 52, W], [190, 136, 60, 52, W], [258, 136, 48, 52, W]],
};
export function Struct({ k, name }) {
  return (
    <Plot vb="0 0 320 200" title={`Structure ${k.toUpperCase()} diagram`} name={name}>
      {k !== 'e' && <rect width="320" height="200" fill="#DDDDDD" />}
      {STRUCT[k].map(([x, y, w, h, f], i) => <rect key={i} x={r2(x)} y={y} width={w} height={h} rx="2" fill={f} />)}
    </Plot>
  );
}
