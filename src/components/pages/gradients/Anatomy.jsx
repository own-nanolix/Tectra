// Anatomy of two gradients: Field (angle and two stops) and Blue fade (stops, offsets, alpha samples).
// Drawn with dimension lines and labels; callouts sit in the left and right margins of the drawing.
import Art from '@/components/art/Art';
import { arcPath, polar, r2 } from '@/lib/charts';
import { Linear, gradById } from './kit';

const INK = '#2F2F2F', MUT = '#5E5E5E', LINE = '#8F8F8F';

function Dim({ x1, y1, x2, y2, label, lx, ly, anchor = 'middle', vertical = false }) {
  const t = 6;
  return (
    <g stroke={LINE} strokeWidth="1" fill="none">
      <path d={`M${x1} ${y1}L${x2} ${y2}`} />
      {vertical ? <path d={`M${x1 - t} ${y1}h${2 * t}M${x2 - t} ${y2}h${2 * t}`} /> : <path d={`M${x1} ${y1 - t}v${2 * t}M${x2} ${y2 - t}v${2 * t}`} />}
      <text x={lx} y={ly} fontSize="18" fill={MUT} stroke="none" textAnchor={anchor}>{label}</text>
    </g>
  );
}

function Callout({ x, y, tx, ty, lines, anchor }) {
  return (
    <g>
      <path d={`M${x} ${y}L${tx + (anchor === 'end' ? 8 : -8)} ${ty - 6}`} stroke={LINE} strokeWidth="1" fill="none" />
      {lines.map((l, i) => (
        <text key={i} x={tx} y={ty + i * 26} fontSize={i === 0 ? 26 : 19} fontWeight={i === 0 ? 500 : 400} fill={i === 0 ? INK : MUT} textAnchor={anchor}>{l}</text>
      ))}
    </g>
  );
}

export function FieldAnatomy() {
  const g = gradById('field');
  // The CSS gradient line runs through the centre and is longer than the box: its ends are the projections of
  // the top-left and bottom-right corners, drawn here as dashed perpendiculars.
  const sx = 400, sy = 170, w = 800, h = 420, deg = 160;
  const a = (deg * Math.PI) / 180, dx = Math.sin(a), dy = -Math.cos(a);
  const len = Math.abs(w * dx) + Math.abs(h * dy);
  const cx = sx + w / 2, cy = sy + h / 2;
  const p0 = [r2(cx - (dx * len) / 2), r2(cy - (dy * len) / 2)], p1 = [r2(cx + (dx * len) / 2), r2(cy + (dy * len) / 2)];
  const R = 80;
  const arc = arcPath(cx, cy, R, 0, deg);
  const lab = polar(cx, cy, R + 26, 70);
  return (
    <Art viewBox="0 0 1600 760" title="Anatomy of the Field gradient: two stops, 160 degrees" exportName="gradients-anatomy-field">
      <defs><Linear id="gradients-an-field" x={sx} y={sy} w={w} h={h} deg={deg} stops={g.stops} /></defs>
      <rect width="1600" height="760" fill="#FAFAFA" />
      <rect x={sx} y={sy} width={w} height={h} rx="4" fill="url(#gradients-an-field)" />
      <path d={`M${sx} ${sy}L${p0[0]} ${p0[1]}M${sx + w} ${sy + h}L${p1[0]} ${p1[1]}`} stroke={LINE} strokeWidth="1" strokeDasharray="4 5" />
      <path d={`M${cx} ${cy}V${cy - 130}`} stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="4 5" />
      <path d={arc} fill="none" stroke="#FFFFFF" strokeWidth="2" />
      <text x={lab[0]} y={lab[1]} fontSize="22" fontWeight="500" fill="#0A2E63">160°</text>
      <path d={`M${p0[0]} ${p0[1]}L${p1[0]} ${p1[1]}`} stroke="#0A2E63" strokeWidth="2" />
      <path d={`M${p1[0]} ${p1[1]}l${r2(-dx * 14 - dy * 7)} ${r2(-dy * 14 + dx * 7)}M${p1[0]} ${p1[1]}l${r2(-dx * 14 + dy * 7)} ${r2(-dy * 14 - dx * 7)}`} stroke="#0A2E63" strokeWidth="2" strokeLinecap="round" />
      {[p0, p1].map((p, i) => (
        <g key={i}>
          <circle cx={p[0]} cy={p[1]} r="13" fill="#FFFFFF" stroke={LINE} />
          <circle cx={p[0]} cy={p[1]} r="8" fill={g.stops[i][0]} />
        </g>
      ))}
      <Dim x1={sx} y1={sy + h + 40} x2={sx + w} y2={sy + h + 40} label="800" lx={sx + 160} ly={sy + h + 72} />
      <Dim x1={sx + w + 40} y1={sy} x2={sx + w + 40} y2={sy + h} label="420" lx={sx + w + 56} ly={cy + 6} anchor="start" vertical />
      <Callout x={p0[0] - 16} y={p0[1]} tx={330} ty={90} anchor="end" lines={['Stop 1', g.stops[0][0], 'offset 0%', 'opacity 100%']} />
      <Callout x={p1[0] + 16} y={p1[1]} tx={1300} ty={620} anchor="start" lines={['Stop 2', g.stops[1][0], 'offset 100%', 'opacity 100%']} />
      <Callout x={cx - 6} y={cy - 6} tx={330} ty={400} anchor="end" lines={['Angle', '160 degrees, clockwise', `line length ${r2(len)}`]} />
    </Art>
  );
}

export function FadeAnatomy() {
  const g = gradById('blue-fade');
  const bx = 700, by = 60, bw = 200, bh = 420;
  const marks = [0, 25, 50, 75, 100];
  return (
    <Art viewBox="0 0 1600 580" title="Anatomy of the Blue fade: full colour to transparent, top to bottom" exportName="gradients-anatomy-fade">
      <defs>
        <pattern id="gradients-an-check" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#FFFFFF" />
          <rect width="10" height="10" fill="#E9E9E9" />
          <rect x="10" y="10" width="10" height="10" fill="#E9E9E9" />
        </pattern>
        <linearGradient id="gradients-an-fade" x1="0" y1="0" x2="0" y2="1">
          {g.stops.map(([c, o, p], i) => <stop key={i} offset={`${p}%`} stopColor={c} stopOpacity={o} />)}
        </linearGradient>
      </defs>
      <rect width="1600" height="580" fill="#FAFAFA" />
      <rect x={bx} y={by} width={bw} height={bh} fill="url(#gradients-an-check)" />
      <rect x={bx} y={by} width={bw} height={bh} fill="url(#gradients-an-fade)" />
      <path d={`M${bx - 40} ${by}V${by + bh}`} stroke={LINE} strokeWidth="1" />
      {marks.map((m) => {
        const y = r2(by + (m / 100) * bh);
        return (
          <g key={m}>
            <path d={`M${bx - 48} ${y}h16M${bx} ${y}h${bw}`} stroke={LINE} strokeWidth="1" strokeDasharray={m === 0 || m === 100 ? undefined : '3 5'} />
            <text x={bx - 60} y={y + 6} fontSize="18" fill={MUT} textAnchor="end">{m}%</text>
            <text x={bx + bw + 24} y={y + 6} fontSize="18" fill={MUT}>{`alpha ${100 - m}%`}</text>
          </g>
        );
      })}
      <Dim x1={bx + bw + 190} y1={by} x2={bx + bw + 190} y2={by + bh} label="vertical, 180 degrees" lx={bx + bw + 210} ly={by + bh / 2 + 6} anchor="start" vertical />
      <Callout x={bx - 6} y={by + 4} tx={330} ty={110} anchor="end" lines={['Stop 1', g.stops[0][0], 'offset 0%', 'opacity 100%']} />
      <Callout x={bx - 6} y={by + bh - 4} tx={330} ty={400} anchor="end" lines={['Stop 2', g.stops[1][0], 'offset 100%', 'opacity 0%']} />
      <Callout x={bx + bw / 2} y={by + bh / 2} tx={1290} ty={150} anchor="start" lines={['Hue', 'Same at both stops;', 'only opacity changes']} />
    </Art>
  );
}
