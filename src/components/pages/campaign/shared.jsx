// Small helpers shared by the campaign artwork: text lines, a field background, a person chip, a QR-like tile.
import { HEX } from '@/lib/brand';
import { seeded, r2 } from '@/lib/charts';
import { MarkG } from '@/components/art/Mark';

export const SZ = { post: '0 0 1080 1080', poster: '0 0 1080 1350', story: '0 0 1080 1920' };
export const ART = 'campaign-';

// Lines of text. A line is a string, or an array of strings and { h: 'phrase' } (the one highlighted phrase).
// Each line is a <tspan> at the same x; `dy` steps down by lh. anchor: start | middle | end.
export function Lines({ x, y, lines, size, lh = size * 1.12, fill = HEX.ink, hl = HEX.blue, weight = 300, anchor = 'start', ls, cls, i, ...rest }) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor} letterSpacing={ls ?? (size >= 40 ? -size * 0.012 : 0)} className={cls} style={i !== undefined ? { '--i': i } : undefined} {...rest}>
      {lines.map((ln, k) => (
        <tspan key={k} x={x} dy={k ? lh : 0}>
          {(Array.isArray(ln) ? ln : [ln]).map((seg, j) => (typeof seg === 'string' ? seg : <tspan key={j} fill={hl}>{seg.h}</tspan>))}
        </tspan>
      ))}
    </text>
  );
}

// The ground of an artboard. kind: blue (the hero blue, soft), paper, tile, yellow, deep.
const GROUND = {
  blue: ['#5BA8F8', '#4C9BF3'],
  paper: ['#FFFFFF', '#F3F3F3'],
  tile: ['#F5F5F5', '#EDEDED'],
  yellow: ['#FFC04E', '#FFB83D'],
  deep: ['#4093EC', '#2F86EE'],
};
export function GroundG({ idp, w, h, kind = 'blue' }) {
  const [a, b] = GROUND[kind];
  return (
    <g>
      <defs>
        <linearGradient id={`${idp}-bg`} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill={`url(#${idp}-bg)`} />
    </g>
  );
}

// A quote chip: initials on a blue-to-sky tile with a yellow dot on its bottom edge, then name and role.
export function PersonG({ idp, x, y, size = 96, initials, name, role, nameFill = HEX.ink, roleFill = HEX.muted, fs = 30 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <linearGradient id={`${idp}-av`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={HEX.blue} />
          <stop offset="1" stopColor={HEX.sky} />
        </linearGradient>
      </defs>
      <rect width={size} height={size} rx="4" fill={`url(#${idp}-av)`} />
      <text x={size / 2} y={size * 0.62} fontSize={size * 0.34} fontWeight="500" fill={HEX.navy} textAnchor="middle">{initials}</text>
      <circle cx={size / 2} cy={size} r={size * 0.09} fill={HEX.yellow} className="pop" />
      <text x={size + 24} y={size * 0.44} fontSize={fs} fontWeight="500" fill={nameFill}>{name}</text>
      <text x={size + 24} y={size * 0.44 + fs * 1.3} fontSize={fs * 0.85} fontWeight="400" fill={roleFill}>{role}</text>
    </g>
  );
}

// A QR-like tile. It is a generic square pattern drawn with seeded(): it encodes nothing.
export function QrG({ x = 0, y = 0, size = 150, ink = HEX.navy, bg = '#FFFFFF', seed = 11, n = 21 }) {
  const rnd = seeded(seed);
  const pad = size * 0.08, m = (size - pad * 2) / n;
  const finder = (cx, cy) => (
    <g key={`${cx}-${cy}`}>
      <rect x={r2(pad + cx * m)} y={r2(pad + cy * m)} width={r2(7 * m)} height={r2(7 * m)} fill={ink} />
      <rect x={r2(pad + (cx + 1) * m)} y={r2(pad + (cy + 1) * m)} width={r2(5 * m)} height={r2(5 * m)} fill={bg} />
      <rect x={r2(pad + (cx + 2) * m)} y={r2(pad + (cy + 2) * m)} width={r2(3 * m)} height={r2(3 * m)} fill={ink} />
    </g>
  );
  const cells = [];
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      const inFinder = (i < 8 && j < 8) || (i > n - 9 && j < 8) || (i < 8 && j > n - 9);
      if (!inFinder && rnd() > 0.52) cells.push([i, j]);
    }
  }
  return (
    <g transform={`translate(${x} ${y})`} className="fade-in">
      <rect width={size} height={size} rx="4" fill={bg} />
      {cells.map(([i, j]) => (
        <rect key={`${i}-${j}`} x={r2(pad + i * m)} y={r2(pad + j * m)} width={r2(m)} height={r2(m)} fill={ink} />
      ))}
      {finder(0, 0)}
      {finder(n - 7, 0)}
      {finder(0, n - 7)}
    </g>
  );
}

// The mark that assembles (two circles slide together, the third lands).
export function FuseMark({ x, y, size, fill }) {
  return <MarkG x={x} y={y} size={size} fill={fill} bodyClass="fuse-a" dotClass="fuse-c" />;
}

