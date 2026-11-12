import Art from '@/components/art/Art';
import { HEADINGS, HEX, QUOTES, STRATEGY_CHIPS } from '@/lib/brand';
import { wrapHl } from './typoData';

// A type-role annotation: leader line from (ax, ay) on the layout to the note at (x, y).
function Ann({ x, y, ax, ay, lines }) {
  return (
    <g className="fade-in" style={{ '--i': 6 }}>
      <path d={`M${ax} ${ay}L${x - 10} ${y - 5}`} stroke={HEX.blueInk} strokeWidth="1" fill="none" />
      <circle cx={ax} cy={ay} r="4" fill={HEX.blueInk} />
      {lines.map((t, i) => (
        <text key={t} x={x} y={y + i * 19} fontSize="14" fontWeight={i ? 400 : 500} fill={HEX.blueInk}>{t}</text>
      ))}
    </g>
  );
}

// The "Strategic plan" layout of the case study (m04) with the type roles annotated.
export function HierarchySvg() {
  const H = HEADINGS.strategic;
  const q = QUOTES.fragmented;
  const head = wrapHl(H.text, H.hl, 26).map((ln) => ln.map((p, i) => (i === ln.length - 1 ? { ...p, t: p.t.trimEnd() } : p)));
  const quote = wrapHl(q.text, q.hl, 28);
  return (
    <Art viewBox="0 0 1600 960" title="Strategic plan layout with the type roles annotated: chip, display heading, chips, quote, name and role" exportName="typography-hierarchy">
      <defs>
        <linearGradient id="typography-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={HEX.sky} />
          <stop offset="1" stopColor={HEX.field} />
        </linearGradient>
      </defs>
      <rect width="1600" height="960" fill={HEX.paper} />

      <g className="fade-in">
        <rect x="706" y="40" width="187" height="62" rx="4" fill={HEX.chip} />
        <text x="799.5" y="80" textAnchor="middle" fontSize="20" fontWeight="400" fill={HEX.ink}>{H.chip}</text>
      </g>

      <text textAnchor="middle" fontSize="88" fontWeight="300" letterSpacing="-0.88" fill={HEX.ink} className="slide-up" style={{ '--i': 1, whiteSpace: 'pre' }}>
        {head.map((ln, k) => (
          <tspan key={k} x="800" y={220 + k * 108}>
            {ln.map((p, j) => (p.hl ? <tspan key={j} fill={HEX.blue}>{p.t}</tspan> : <tspan key={j}>{p.t}</tspan>))}
          </tspan>
        ))}
      </text>

      {STRATEGY_CHIPS.map((c, i) => {
        const x = [70, 277, 70][i];
        const y = [560, 560, 616][i];
        const w = [206, 106, 188][i];
        return (
          <g key={c} className="slide-up" style={{ '--i': 2 + i }}>
            <rect x={x} y={y} width={w} height="52" rx="4" fill={HEX.chip} />
            <text x={x + 16} y={y + 33} fontSize="19" fontWeight="400" fill={HEX.ink}>{c}</text>
          </g>
        );
      })}

      {[0, 1, 2].map((i) => (
        <rect key={i} className="grow-x" style={{ '--i': i }} x={656 + i * 140} y="560" width="131" height="8" rx="2" fill={i < q.steps ? HEX.blue : HEX.chip} />
      ))}
      <text fontSize="30" fontWeight="300" fill={HEX.ink} style={{ whiteSpace: 'pre' }}>
        {quote.map((ln, k) => (
          <tspan key={k} x="656" y={650 + k * 35}>
            {ln.map((p, j) => (p.hl ? <tspan key={j} fill={HEX.blue}>{p.t}</tspan> : <tspan key={j}>{p.t}</tspan>))}
          </tspan>
        ))}
      </text>
      <g>
        <rect x="656" y="826" width="112" height="64" rx="4" fill={HEX.chip} />
        <rect x="712" y="826" width="56" height="64" rx="4" fill="url(#typography-face)" />
        <text x="684" y="864" textAnchor="middle" fontSize="15" fontWeight="500" fill={HEX.ink}>{'//'}</text>
        <text x="740" y="864" textAnchor="middle" fontSize="15" fontWeight="500" fill={HEX.navy}>{q.initials}</text>
        <circle cx="740" cy="890" r="5" fill={HEX.yellow} stroke={HEX.paper} strokeWidth="2" />
        <text x="789" y="853" fontSize="18" fontWeight="400" fill={HEX.ink}>{q.name}</text>
        <text x="789" y="877" fontSize="14" fontWeight="400" fill={HEX.muted}>{q.role}</text>
      </g>

      <Ann x={1390} y={150} ax={1250} ay={190} lines={['Display', 'Light 88 / 1.22', 'One phrase in Tectra Blue']} />
      <Ann x={940} y={72} ax={893} ay={72} lines={['Chip: Regular 20']} />
      <Ann x={110} y={706} ax={140} ay={668} lines={['Chips: Regular, on #F0F0F0']} />
      <Ann x={1140} y={690} ax={1086} ay={686} lines={['Quote: Light 30 / 35', 'One phrase in blue,', 'opening quote only']} />
      <Ann x={1010} y={850} ax={880} ay={848} lines={['Name: Regular 18']} />
      <Ann x={1010} y={890} ax={890} ay={872} lines={['Role: Regular 14, muted']} />
    </Art>
  );
}

// Metrics study. The line positions are measured from the Urbanist font in the browser (canvas text metrics at
// 1000 px, the same in all three weights): cap height 703, x-height 500, ascender 750, descender 250 units;
// round letters overshoot the baseline and x-height by 16 units.
const FS = 380;
const BASE = 500;
const OVERSHOOT = 0.016;
export const METRIC_LINES = [
  { id: 'ascender', label: 'Ascender', k: 0.75, color: HEX.deep, dy: -4, note: 'The top of b and d.' },
  { id: 'cap', label: 'Cap height', k: 0.703, color: HEX.blue, dy: 14, note: 'The top of H.' },
  { id: 'xh', label: 'x-height', k: 0.5, color: HEX.blue, dy: 5, note: 'The flat top of x; round letters rise 0.016 em above it.' },
  { id: 'base', label: 'Baseline', k: 0, color: HEX.ink, dy: 5, note: 'The line the letters stand on.' },
  { id: 'desc', label: 'Descender', k: -0.25, color: HEX.deep, dy: 5, note: 'The foot of p and g.' },
];
const GLYPHS = [['H', 165], ['b', 435], ['a', 695], ['p', 955], ['o', 1215]];

export function MetricsSvg() {
  const ocx = 1215;
  const top = 0.5 + OVERSHOOT;
  const oy = BASE - (FS * (top - OVERSHOOT)) / 2;
  return (
    <Art viewBox="0 0 1500 720" title="Urbanist metrics, measured: ascender, cap height, x-height, baseline and descender over large letters, with the near-circular bowl of the o" exportName="typography-metrics">
      <rect width="1500" height="720" rx="6" fill={HEX.tile} />
      {METRIC_LINES.map((m, i) => {
        const y = BASE - FS * m.k;
        return (
          <g key={m.id} className="grow-x" style={{ '--i': i }}>
            <line x1="40" x2="1370" y1={y} y2={y} stroke={m.color} strokeWidth="1.4" strokeDasharray={m.id === 'base' ? '0' : '6 6'} />
            <text x="1384" y={y + m.dy} fontSize="14" fontWeight="500" fill={m.id === 'base' ? HEX.ink : HEX.blueInk}>{`${m.label} ${m.k.toFixed(3)}`}</text>
          </g>
        );
      })}
      {GLYPHS.map(([g, x]) => (
        <text key={g} x={x} y={BASE} textAnchor="middle" fontSize={FS} fontWeight="300" fill={HEX.ink} className="fade-in">{g}</text>
      ))}
      <ellipse className="pop" cx={ocx} cy={oy} rx={(FS * 0.56) / 2} ry={(FS * (top + OVERSHOOT)) / 2} fill="none" stroke={HEX.blue} strokeWidth="2" strokeDasharray="5 6" />
      <circle cx={ocx} cy={oy} r="4" fill={HEX.blue} />
      <text x={ocx} y={BASE + 150} textAnchor="middle" fontSize="15" fontWeight="500" fill={HEX.blueInk}>o: 560 by 532 units</text>
      <text x="40" y="690" fontSize="15" fontWeight="400" fill={HEX.muted}>Measured from Urbanist at 1000 units per em. The same in Light, Regular and Medium.</text>
    </Art>
  );
}
