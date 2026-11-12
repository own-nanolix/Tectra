// Shared pieces for the In the world scenes: ground line, gradients, QR-like tile, bolts, steel shading.
import { seeded, r2 } from '@/lib/charts';

export const PLATE = { w: 1600, h: 900 };
export const STEEL = { hi: '#F2F2F2', mid: '#C9C9C9', lo: '#8A8A8A', dark: '#5A5A5A', ink: '#2F2F2F' };

// The thin horizon / ground line of a plate, with small ticks. Every plate draws it at its own height.
export function Ground({ y, x0 = 0, x1 = 1600 }) {
  const ticks = [];
  for (let x = x0 + 20; x < x1; x += 40) ticks.push(`M${x} ${y}v5`);
  return (
    <g fill="none">
      <path d={`M${x0} ${y}H${x1}`} stroke="#DDDDDD" strokeWidth="1.2" />
      <path d={ticks.join('')} stroke="#E9E9E9" strokeWidth="1" />
    </g>
  );
}

// Brand gradients used by several scenes: the blue field, a lit glow, a sky tone for windows.
export function BlueDefs({ idp }) {
  return (
    <defs>
      <linearGradient id={`${idp}-field`} x1="0" y1="0" x2="0.4" y2="1">
        <stop offset="0" stopColor="#5BA8F8" />
        <stop offset="1" stopColor="#4C9BF3" />
      </linearGradient>
      <linearGradient id={`${idp}-deep`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#1F74E4" />
        <stop offset="1" stopColor="#006BEE" />
      </linearGradient>
      <linearGradient id={`${idp}-sky`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#90C0F3" />
        <stop offset="1" stopColor="#FFFFFF" />
      </linearGradient>
      <radialGradient id={`${idp}-glow`} cx="0.5" cy="0.4" r="0.75">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.4" />
        <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${idp}-cyl`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#8E8E8E" />
        <stop offset="0.2" stopColor="#F4F4F4" />
        <stop offset="0.45" stopColor="#CFCFCF" />
        <stop offset="0.8" stopColor="#8A8A8A" />
        <stop offset="1" stopColor="#6A6A6A" />
      </linearGradient>
    </defs>
  );
}

// A QR-like tile. It is a generic pattern made with seeded(): it encodes nothing.
export function QrG({ x = 0, y = 0, size = 60, seed = 11, n = 21, fg = '#0A2E63', bg = '#FFFFFF', pad = 5 }) {
  const rnd = seeded(seed);
  const c = size / n;
  const inFinder = (i, j) => (i < 8 && j < 8) || (i >= n - 8 && j < 8) || (i < 8 && j >= n - 8);
  let d = '';
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      if (!inFinder(i, j) && rnd() > 0.52) d += `M${r2(i * c)} ${r2(j * c)}h${r2(c)}v${r2(c)}h${r2(-c)}z`;
    }
  }
  const finder = (fx, fy) => (
    <g key={`${fx}-${fy}`} transform={`translate(${r2(fx * c)} ${r2(fy * c)})`}>
      <rect width={r2(7 * c)} height={r2(7 * c)} fill={fg} />
      <rect x={r2(c)} y={r2(c)} width={r2(5 * c)} height={r2(5 * c)} fill={bg} />
      <rect x={r2(2 * c)} y={r2(2 * c)} width={r2(3 * c)} height={r2(3 * c)} fill={fg} />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-pad} y={-pad} width={size + pad * 2} height={size + pad * 2} rx="3" fill={bg} />
      <path d={d} fill={fg} />
      {finder(0, 0)}
      {finder(n - 7, 0)}
      {finder(0, n - 7)}
    </g>
  );
}

// A bolt head: a small steel disc with a highlight upper left.
export function Bolt({ x, y, r = 4 }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#9A9A9A" />
      <circle cx={x - r * 0.2} cy={y - r * 0.2} r={r * 0.7} fill="#D9D9D9" />
      <path d={`M${x - r * 0.5} ${y}h${r}`} stroke="#6A6A6A" strokeWidth="0.8" />
    </g>
  );
}

// Several short text lines. lh is the line height.
export function Lines({ lines, x, y, size, lh, fill, weight = 300, anchor = 'start', ...rest }) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor} {...rest}>
      {lines.map((t, i) => (
        <tspan key={i} x={x} dy={i ? lh : 0}>
          {t}
        </tspan>
      ))}
    </text>
  );
}

// Grey for a ribbed fin: lit on the left, dark on the right, every second fin a little brighter.
export const finGrey = (u, i) => {
  const g = Math.round(214 - 120 * u + (i % 2 ? 12 : -8));
  return `rgb(${g},${g},${g})`;
};

// A pair of soft corrugation stripes as a path of vertical lines (container, roll-up edges).
export function stripes(x0, x1, step) {
  let d = '';
  for (let x = x0; x <= x1; x += step) d += `M${r2(x)} 0v1`;
  return d;
}
