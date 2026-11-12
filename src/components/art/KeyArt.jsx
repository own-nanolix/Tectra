// Key art built from the case study's own drawing language: the isometric cut-away building, line-drawn trees,
// the tower crane, location pins, the tick-bar instrument and the brand's patterns.
// Every component returns an SVG group (<g>) or <defs>. Wrap in <Art> for a standalone graphic.
// Components that create gradients, clips or filters take an `idp` (id prefix): use a different one each time.
import { seeded, r2, tickBars, ruler } from '@/lib/charts';
import { MARK_BODY, MARK } from './Mark';

// Paint sets. 'blue' sits on the blue field; 'paper' sits on white or tile; 'ghost' is a pale tint.
export const TONES = {
  blue: { line: '#0A3D91', roofA: '#006BEE', roofB: '#0A5ED0', wall: '#2F86EE', wallB: '#1F74E4', floor: '#6DB0F8', tree: '#0A3D91', treeFill: 'none' },
  paper: { line: '#8F8F8F', roofA: '#5DAEEB', roofB: '#4093EC', wall: '#EDEDED', wallB: '#E2E2E2', floor: '#F7F7F7', tree: '#9A9A9A', treeFill: 'none' },
  ghost: { line: '#C9D6E4', roofA: '#C4DCF7', roofB: '#B3D2F5', wall: '#F1F1F1', wallB: '#EAEAEA', floor: '#F7F7F7', tree: '#CBCBCB', treeFill: 'none' },
};

// ---- Isometric helpers ----
const COS = 0.866, SIN = 0.5;
export const iso = (x, y, z = 0, s = 1) => [r2((x - y) * COS * s), r2((x + y) * SIN * s - z * s)];
const poly = (pts) => 'M' + pts.map((p) => p.join(' ')).join('L') + 'Z';

function boards(a, b, h, s, n) {
  // vertical board lines on a wall from ground point a to ground point b (grid coords), height h
  let d = '';
  for (let i = 1; i < n; i++) {
    const t = i / n;
    const x = a[0] + (b[0] - a[0]) * t, y = a[1] + (b[1] - a[1]) * t;
    const p0 = iso(x, y, 0, s), p1 = iso(x, y, h, s);
    d += `M${p0.join(' ')}L${p1.join(' ')}`;
  }
  return d;
}

// An open room: floor, two back walls with boards, two low front wall outlines.
function room(k, { x, y, w, d, h }, s, T) {
  const x1 = x + w, y1 = y + d;
  const f = [iso(x, y, 0, s), iso(x1, y, 0, s), iso(x1, y1, 0, s), iso(x, y1, 0, s)];
  return (
    <g key={k}>
      <path d={poly(f)} fill={T.floor} stroke={T.line} strokeWidth="1" strokeLinejoin="round" />
      <path d={poly([iso(x, y, 0, s), iso(x1, y, 0, s), iso(x1, y, h, s), iso(x, y, h, s)])} fill={T.wall} stroke={T.line} strokeWidth="1" strokeLinejoin="round" />
      <path d={poly([iso(x, y, 0, s), iso(x, y1, 0, s), iso(x, y1, h, s), iso(x, y, h, s)])} fill={T.wallB} stroke={T.line} strokeWidth="1" strokeLinejoin="round" />
      <path d={boards([x, y], [x1, y], h, s, Math.round(w * 2)) + boards([x, y], [x, y1], h, s, Math.round(d * 2))} stroke={T.line} strokeWidth="0.6" opacity="0.45" fill="none" />
      <path d={poly([iso(x1, y, 0, s), iso(x1, y1, 0, s), iso(x1, y1, h * 0.55, s), iso(x1, y, h * 0.55, s)])} fill={T.wall} fillOpacity="0.35" stroke={T.line} strokeWidth="1" strokeLinejoin="round" />
      <path d={poly([iso(x, y1, 0, s), iso(x1, y1, 0, s), iso(x1, y1, h * 0.55, s), iso(x, y1, h * 0.55, s)])} fill={T.wallB} fillOpacity="0.35" stroke={T.line} strokeWidth="1" strokeLinejoin="round" />
    </g>
  );
}

// A roofed shed with an A-frame ridge. along: 'x' (ridge runs along x) or 'y'.
function shed(k, { x, y, w, d, h, rh, along }, s, T) {
  const x1 = x + w, y1 = y + d;
  if (along === 'x') {
    const ym = y + d / 2;
    return (
      <g key={k}>
        <path d={poly([iso(x, y, h, s), iso(x1, y, h, s), iso(x1, ym, h + rh, s), iso(x, ym, h + rh, s)])} fill={T.roofB} stroke={T.line} strokeWidth="1" strokeLinejoin="round" />
        <path d={poly([iso(x, y1, 0, s), iso(x1, y1, 0, s), iso(x1, y1, h, s), iso(x, y1, h, s)])} fill={T.wallB} stroke={T.line} strokeWidth="1" strokeLinejoin="round" />
        <path d={boards([x, y1], [x1, y1], h, s, Math.round(w * 2))} stroke={T.line} strokeWidth="0.6" opacity="0.45" fill="none" />
        <path d={poly([iso(x1, y, 0, s), iso(x1, y1, 0, s), iso(x1, y1, h, s), iso(x1, ym, h + rh, s), iso(x1, y, h, s)])} fill={T.wall} stroke={T.line} strokeWidth="1" strokeLinejoin="round" />
        <path d={poly([iso(x, y1, h, s), iso(x1, y1, h, s), iso(x1, ym, h + rh, s), iso(x, ym, h + rh, s)])} fill={T.roofA} stroke={T.line} strokeWidth="1" strokeLinejoin="round" />
      </g>
    );
  }
  const xm = x + w / 2;
  return (
    <g key={k}>
      <path d={poly([iso(x, y, h, s), iso(x, y1, h, s), iso(xm, y1, h + rh, s), iso(xm, y, h + rh, s)])} fill={T.roofB} stroke={T.line} strokeWidth="1" strokeLinejoin="round" />
      <path d={poly([iso(x1, y, 0, s), iso(x1, y1, 0, s), iso(x1, y1, h, s), iso(x1, y, h, s)])} fill={T.wall} stroke={T.line} strokeWidth="1" strokeLinejoin="round" />
      <path d={boards([x1, y], [x1, y1], h, s, Math.round(d * 2))} stroke={T.line} strokeWidth="0.6" opacity="0.45" fill="none" />
      <path d={poly([iso(x, y1, 0, s), iso(x1, y1, 0, s), iso(x1, y1, h, s), iso(xm, y1, h + rh, s), iso(x, y1, h, s)])} fill={T.wallB} stroke={T.line} strokeWidth="1" strokeLinejoin="round" />
      <path d={poly([iso(x1, y, h, s), iso(x1, y1, h, s), iso(xm, y1, h + rh, s), iso(xm, y, h + rh, s)])} fill={T.roofA} stroke={T.line} strokeWidth="1" strokeLinejoin="round" />
    </g>
  );
}

// The plan of the building, in grid units. Drawn back to front.
const PLAN = [
  { type: 'room', x: 2, y: 0, w: 5, d: 4, h: 2 },
  { type: 'shed', x: 0, y: 4, w: 15, d: 3, h: 2, rh: 1.7, along: 'x' },
  { type: 'room', x: 1, y: 7, w: 6, d: 4.5, h: 2 },
  { type: 'shed', x: 9, y: 7, w: 3, d: 7, h: 2, rh: 1.7, along: 'y' },
  { type: 'room', x: 12, y: 7, w: 4, d: 4, h: 2 },
];
// Where pins can sit: [gridX, gridY, gridZ]
export const SITE_PINS = { ridge: [5, 5.5, 3.7], wing: [10.5, 11, 3.7], yard: [14, 9, 0], gate: [4, 9, 0], komatsu: [8, 5.5, 3.7] };

// <IsoSiteG x y scale tone pins /> : the cut-away building. Its own box is about 560 x 400 at scale 1,
// with the origin at the top-left of that box. tone: 'blue' | 'paper' | 'ghost'.
// pins: array of names from SITE_PINS (white ring pins); yellowPin: one name for the yellow pin.
export const ISO_BOX = { w: 560, h: 400 };
export function IsoSiteG({ x = 0, y = 0, scale = 1, tone = 'blue', pins = [], yellowPin, trees = true, seed = 7, className, ...rest }) {
  const T = TONES[tone] || TONES.blue;
  const s = 20; // px per grid unit
  const ox = 262, oy = 118; // puts the plan inside the 560 x 400 box
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} className={className} {...rest}>
      {trees && <TreesG x={0} y={0} w={560} h={400} tone={tone} seed={seed} count={9} clear={[150, 120, 400, 260]} />}
      <g transform={`translate(${ox} ${oy})`}>
        {PLAN.map((p, i) => (p.type === 'room' ? room(i, p, s, T) : shed(i, p, s, T)))}
        {pins.map((name) => {
          const [px, py] = iso(...SITE_PINS[name], s);
          return <PinG key={name} x={px} y={py} />;
        })}
        {yellowPin && <PinG x={iso(...SITE_PINS[yellowPin], s)[0]} y={iso(...SITE_PINS[yellowPin], s)[1]} tone="yellow" />}
      </g>
    </g>
  );
}

// Location pin: a ring. tone 'white' (on the roof) or 'yellow' (the active work card). r is the outer radius.
export function PinG({ x = 0, y = 0, r = 7, tone = 'white', pulse = false, ...rest }) {
  const outer = tone === 'yellow' ? '#FFB83D' : '#FFFFFF';
  const inner = tone === 'yellow' ? '#FFFFFF' : '#2F2F2F';
  return (
    <g transform={`translate(${x} ${y})`} {...rest}>
      {pulse && <circle r={r} fill={outer} className="ring" />}
      <circle r={r} fill={outer} />
      <circle r={r * 0.36} fill={inner} />
    </g>
  );
}

// One line-drawn tree. kind 'round' is the scalloped cloud tree; 'fir' is the stepped conifer.
export function TreeG({ x = 0, y = 0, size = 60, kind = 'round', stroke = '#0A3D91', fill = 'none', seed = 1, strokeWidth = 1.1, ...rest }) {
  const rnd = seeded(seed * 97 + 13);
  let d = '';
  if (kind === 'fir') {
    const tiers = 5, w = size * 0.42;
    d = `M0 ${-size}`;
    for (let i = 1; i <= tiers; i++) {
      const yy = -size + (size * 0.82 * i) / tiers, ww = (w * i) / tiers;
      d += `L${r2(ww)} ${r2(yy)}L${r2(ww * 0.45)} ${r2(yy - size * 0.03)}`;
    }
    d += `L0 ${r2(-size * 0.16)}`;
    let left = '';
    for (let i = tiers; i >= 1; i--) {
      const yy = -size + (size * 0.82 * i) / tiers, ww = (w * i) / tiers;
      left += `L${r2(-ww * 0.45)} ${r2(yy - size * 0.03)}L${r2(-ww)} ${r2(yy)}`;
    }
    d = `M0 ${r2(-size * 0.16)}` + left + `L0 ${-size}` + d.slice(d.indexOf('L')) + `M0 ${r2(-size * 0.16)}L0 0`;
  } else {
    const bumps = 9, R = size * 0.34, cy = -size * 0.62;
    const pts = [];
    for (let i = 0; i < bumps; i++) {
      const a = (i / bumps) * Math.PI * 2 - Math.PI / 2;
      const rr = R * (0.86 + rnd() * 0.3);
      pts.push([Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.92]);
    }
    d = `M${r2(pts[0][0])} ${r2(pts[0][1])}`;
    for (let i = 0; i < bumps; i++) {
      const p = pts[(i + 1) % bumps];
      const br = R * 0.42;
      d += `A${r2(br)} ${r2(br)} 0 0 1 ${r2(p[0])} ${r2(p[1])}`;
    }
    d += `M${r2(-size * 0.03)} 0L${r2(-size * 0.02)} ${r2(cy + R * 0.5)}M${r2(size * 0.03)} 0L${r2(size * 0.02)} ${r2(cy + R * 0.5)}M0 ${r2(cy + R * 0.5)}L${r2(-size * 0.12)} ${r2(cy + R * 0.05)}M0 ${r2(cy + R * 0.35)}L${r2(size * 0.13)} ${r2(cy - R * 0.1)}`;
  }
  return <path transform={`translate(${x} ${y})`} d={d} fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" strokeLinecap="round" {...rest} />;
}

// A scatter of trees inside a box. clear = [x, y, w, h] keeps a zone empty (for the building or a headline).
export function TreesG({ x = 0, y = 0, w = 560, h = 400, count = 10, tone = 'blue', seed = 3, clear, minSize = 44, maxSize = 96, opacity = 1, ...rest }) {
  const T = TONES[tone] || TONES.blue;
  const rnd = seeded(seed);
  const items = [];
  let guard = 0;
  while (items.length < count && guard < count * 30) {
    guard += 1;
    const tx = rnd() * w, ty = h * 0.18 + rnd() * h * 0.82;
    if (clear && tx > clear[0] && tx < clear[0] + clear[2] && ty > clear[1] && ty < clear[1] + clear[3] + 30) continue;
    items.push({ tx: r2(tx), ty: r2(ty), size: r2(minSize + rnd() * (maxSize - minSize)), kind: rnd() > 0.45 ? 'round' : 'fir', seed: Math.floor(rnd() * 1000) });
  }
  items.sort((a, b) => a.ty - b.ty);
  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity} {...rest}>
      {items.map((t, i) => (
        <TreeG key={i} x={t.tx} y={t.ty} size={t.size} kind={t.kind} seed={t.seed} stroke={T.tree} fill={T.treeFill} />
      ))}
    </g>
  );
}

// The yellow tower crane from the light box. Box: about 200 x 320 at scale 1, origin top-left.
export function CraneG({ x = 0, y = 0, scale = 1, color = '#F2A71B', dark = '#B97A08', ...rest }) {
  const lattice = (x0, y0, x1, y1, n, wdt) => {
    // a lattice beam between two points with n zigzags and width wdt
    const dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy), nx = (-dy / len) * wdt, ny = (dx / len) * wdt;
    let d = `M${r2(x0)} ${r2(y0)}L${r2(x1)} ${r2(y1)}M${r2(x0 + nx)} ${r2(y0 + ny)}L${r2(x1 + nx)} ${r2(y1 + ny)}`;
    for (let i = 0; i < n; i++) {
      const t0 = i / n, t1 = (i + 1) / n;
      const ax = x0 + dx * t0, ay = y0 + dy * t0, bx = x0 + dx * t1 + nx, by = y0 + dy * t1 + ny;
      d += `M${r2(ax)} ${r2(ay)}L${r2(bx)} ${r2(by)}L${r2(x0 + dx * t1)} ${r2(y0 + dy * t1)}`;
    }
    return d;
  };
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill="none" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <path d={lattice(78, 318, 78, 120, 14, 16)} stroke={color} strokeWidth="2" />
      <path d={lattice(70, 170, 186, 12, 16, 9)} stroke={color} strokeWidth="1.8" />
      <path d={lattice(86, 120, 30, 190, 6, 7)} stroke={dark} strokeWidth="1.6" />
      <path d="M30 190L18 228M36 196L24 232" stroke={dark} strokeWidth="1.2" />
      <rect x="8" y="228" width="34" height="16" fill={color} stroke={dark} strokeWidth="1.2" />
      <path d="M70 120L82 92L94 120M82 92L186 12M82 92L30 190" stroke={dark} strokeWidth="1" />
      <rect x="92" y="126" width="22" height="20" fill={color} stroke={dark} strokeWidth="1.2" />
      <path d="M180 18V250M186 12V250" stroke={dark} strokeWidth="0.9" />
      <path d="M177 250h12l-2 14h-8zM183 264v8a6 6 0 1 1-6-6" stroke={color} strokeWidth="2" />
      <path d="M60 318h54M66 310h42" stroke={color} strokeWidth="3" />
    </g>
  );
}

// The tick-bar instrument as artwork: bars that fade down, fine ticks, a range handle.
// from / to are 0..1. tone 'blue' | 'yellow' | 'white'. Needs idp for its gradients.
export function TickBarsG({ idp, x = 0, y = 0, w = 600, h = 70, count = 48, from = 0.33, to = 0.6, tone = 'blue', base = '#DFDFDF', handle = true, rise = false, ...rest }) {
  const col = tone === 'yellow' ? '#FFB83D' : tone === 'white' ? '#FFFFFF' : '#4093EC';
  const bars = tickBars(count, w, from, to, 0.52);
  const on = bars.filter((b) => b.on);
  const hx0 = on.length ? on[0].x : 0, hx1 = on.length ? on[on.length - 1].x + on[on.length - 1].w : 0;
  return (
    <g transform={`translate(${x} ${y})`} {...rest}>
      <defs>
        <linearGradient id={`${idp}-tb-off`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={base} />
          <stop offset="1" stopColor={base} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${idp}-tb-on`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={col} />
          <stop offset="1" stopColor={col} stopOpacity="0" />
        </linearGradient>
      </defs>
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y="0" width={b.w} height={h} fill={`url(#${idp}-tb-${b.on ? 'on' : 'off'})`} className={rise ? 'rise' : undefined} style={rise ? { '--i': i } : undefined} />
      ))}
      <path d={ruler(count * 2, w).map((tx) => `M${tx} ${h + 14}v14`).join('')} stroke={base} strokeWidth="1" />
      {handle && on.length > 0 && (
        <g>
          <path d={`M${hx0} ${h + 21}H${hx1}`} stroke={col} strokeWidth="1.2" />
          <rect x={hx0 - 2} y={h + 17.5} width="10" height="7" rx="1" fill={col} />
          <rect x={hx1 - 8} y={h + 17.5} width="10" height="7" rx="1" fill={col} />
        </g>
      )}
    </g>
  );
}

// Brand patterns as <defs>. Use fill="url(#<idp>-pat-marks)", "-pat-ticks", "-pat-boards", "-pat-dots".
export function PatternDefs({ idp, color = '#4093EC', opacity = 1 }) {
  return (
    <defs>
      <pattern id={`${idp}-pat-marks`} width="56" height="56" patternUnits="userSpaceOnUse">
        <g transform="translate(14 14) scale(0.28)" fill={color} opacity={opacity}>
          <path d={MARK_BODY} />
          <circle cx={MARK.C.cx} cy={MARK.C.cy} r={MARK.C.r} />
        </g>
      </pattern>
      <pattern id={`${idp}-pat-ticks`} width="12" height="28" patternUnits="userSpaceOnUse">
        <path d="M2 4v20M8 9v10" stroke={color} strokeWidth="1" opacity={opacity} />
      </pattern>
      <pattern id={`${idp}-pat-boards`} width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M5 0v10" stroke={color} strokeWidth="0.8" opacity={opacity} />
      </pattern>
      <pattern id={`${idp}-pat-dots`} width="18" height="18" patternUnits="userSpaceOnUse">
        <circle cx="9" cy="9" r="1.6" fill={color} opacity={opacity} />
      </pattern>
      <pattern id={`${idp}-pat-fuse`} width="90" height="90" patternUnits="userSpaceOnUse">
        <g fill="none" stroke={color} strokeWidth="1" opacity={opacity}>
          <circle cx="26" cy="31" r="25" />
          <circle cx="60" cy="64" r="25" />
          <circle cx="73" cy="17" r="16.5" />
        </g>
      </pattern>
    </defs>
  );
}

// Quarter-arc corner gauge as artwork (the result and KPI cards). value 0..1, tone 'blue' | 'yellow'.
// Draws inside a w x h card box whose origin is the group origin; the arc leaves by the bottom-right corner.
export function GaugeG({ x = 0, y = 0, w = 340, h = 236, r = 120, value = 0.32, tone = 'blue', track = '#DFDFDF', draw = false, ...rest }) {
  const col = tone === 'yellow' ? '#FFB83D' : '#4093EC';
  const cx = w - r * 0.28, cy = h + r * 0.02;
  const a0 = -96, aEnd = 28;
  const av = a0 + (0 - a0) * (0.35 + value * 0.65);
  const pt = (deg) => [r2(cx + r * Math.cos(((deg - 90) * Math.PI) / 180)), r2(cy + r * Math.sin(((deg - 90) * Math.PI) / 180))];
  const [sx, sy] = pt(a0), [vx, vy] = pt(av), [ex, ey] = pt(aEnd);
  const len = r2((Math.abs(av - a0) * Math.PI * r) / 180);
  return (
    <g transform={`translate(${x} ${y})`} fill="none" strokeLinecap="round" {...rest}>
      <path d={`M${vx} ${vy}A${r} ${r} 0 0 1 ${ex} ${ey}`} stroke={track} strokeWidth="5" />
      <path d={`M${sx} ${sy}A${r} ${r} 0 0 1 ${vx} ${vy}`} stroke={col} strokeWidth="5" className={draw ? 'draw' : undefined} style={draw ? { '--len': len } : undefined} strokeDasharray={draw ? len : undefined} />
      <circle cx={vx} cy={vy} r="9" fill="#EFEFEF" stroke="none" />
      <circle cx={vx} cy={vy} r="3.6" fill={col} stroke="none" className={draw ? 'pop' : undefined} />
    </g>
  );
}
