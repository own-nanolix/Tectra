// Shared parts for the packaging mockups: palette, one fixed three-quarter projection (iso), lit faces
// (top lightest, left mid, right darkest: one light from the upper left), solids, open interiors and flaps.
import Art from '@/components/art/Art';
import { BackdropG, MaterialDefs } from '@/components/art/Mockup';
import { iso, PatternDefs } from '@/components/art/KeyArt';
import { LockupG, LockupStackG, MarkG } from '@/components/art/Mark';
import { r2, seeded } from '@/lib/charts';

export const K = { white: '#FFFFFF', kraft: '#E9E9E9', kraftD: '#DDDDDD', blue: '#4093EC', yellow: '#FFB83D', sky: '#90C0F3', ink: '#2F2F2F', grey: '#8F8F8F' };

// ---- colour ----
const hx = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
export function mix(a, b, t) {
  const A = hx(a), B = hx(b);
  return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join('');
}
// The light travels from the upper left: top 0.87, left face 0.46, right face 0.20.
const LV = [0.2, 0.46, 0.87];
export function tone(base, n) {
  const l = Math.hypot(n[0], n[1], n[2]) || 1;
  const b = (n[0] * LV[0] + n[1] * LV[1] + n[2] * LV[2]) / l;
  return b >= 0.46 ? mix(base, '#FFFFFF', (b - 0.46) * 0.95) : mix(base, '#000000', (0.46 - b) * 0.8);
}
export const TOP = [0, 0, 1], LEFT = [0, 1, 0], RIGHT = [1, 0, 0];

// ---- projection ----
export const proj = (s, ox, oy) => (x, y, z = 0) => {
  const [a, b] = iso(x, y, z, s);
  return [r2(a + ox), r2(b + oy)];
};
export const pd = (pts) => 'M' + pts.map((p) => p.join(' ')).join('L') + 'Z';
export function faceM(P, s, face, W, D, H) {
  const k = r2(0.866 * s), h = r2(0.5 * s);
  if (face === 'left') { const o = P(0, D, H); return [k, h, 0, s, o[0], o[1]]; }
  if (face === 'right') { const o = P(W, D, H); return [k, -h, 0, s, o[0], o[1]]; }
  const o = P(0, 0, H);
  return [k, h, -k, h, o[0], o[1]];
}
// screen vector of a move of `d` units along iso x / y
export const alongX = (s, d) => [r2(0.866 * s * d), r2(0.5 * s * d)];
export const alongY = (s, d) => [r2(-0.866 * s * d), r2(0.5 * s * d)];

// ---- the plate ----
export function Plate({ idp, w, h, title, exportName, children, pattern = K.blue, patternOpacity = 1 }) {
  return (
    <Art viewBox={`0 0 ${w} ${h}`} title={title} exportName={exportName}>
      <BackdropG w={w} h={h} />
      <MaterialDefs idp={idp} />
      <PatternDefs idp={idp} color={pattern} opacity={patternOpacity} />
      {children}
    </Art>
  );
}

// ---- a face with artwork clipped to it ----
export function FaceG({ id, m, w, h, fill, filter, shade, shadeOpacity = 1, clip, children }) {
  const c = clip || [0, 0, w, h];
  return (
    <g transform={`matrix(${m.join(' ')})`}>
      <clipPath id={id}><rect x={c[0]} y={c[1]} width={c[2]} height={c[3]} /></clipPath>
      <rect width={w} height={h} fill={fill} filter={filter} />
      <g clipPath={`url(#${id})`}>{children}</g>
      {shade && <rect width={w} height={h} fill={shade} opacity={shadeOpacity} />}
    </g>
  );
}

// ---- a solid block in three-quarter view ----
// art = { left, right, top } render functions or nodes in face coordinates: left (0..W x 0..H),
// right (0..D x 0..H), top (0..W x 0..D). holeT: leave the +x end open (a sleeve) with that wall thickness.
export function Solid({ P, s, idp, id, W, D, H, base, art = {}, top = true, holeT = 0, line, grain = true }) {
  const lc = line || mix(base, '#000000', 0.28);
  const f = grain ? `url(#${idp}-paper)` : undefined;
  const L = [P(0, D, H), P(W, D, H), P(W, D, 0), P(0, D, 0)];
  const R = [P(W, D, H), P(W, 0, H), P(W, 0, 0), P(W, D, 0)];
  const T = [P(0, 0, H), P(W, 0, H), P(W, D, H), P(0, D, H)];
  const rightFill = tone(base, RIGHT);
  let rightHole = null;
  if (holeT) {
    const t = holeT;
    rightHole = pd([P(W, D - t, H - t), P(W, t, H - t), P(W, t, t), P(W, D - t, t)]);
  }
  return (
    <g strokeLinejoin="round">
      <FaceG id={`${id}-fl`} m={faceM(P, s, 'left', W, D, H)} w={W} h={H} fill={tone(base, LEFT)} filter={f} shade={`url(#${idp}-shade)`} shadeOpacity={0.9}>{art.left}</FaceG>
      {holeT ? (
        <path d={pd(R) + rightHole} fillRule="evenodd" fill={rightFill} />
      ) : (
        <FaceG id={`${id}-fr`} m={faceM(P, s, 'right', W, D, H)} w={D} h={H} fill={rightFill} filter={f} shade={`url(#${idp}-shade)`} shadeOpacity={0.7}>{art.right}</FaceG>
      )}
      {top && (
        <FaceG id={`${id}-ft`} m={faceM(P, s, 'top', W, D, H)} w={W} h={D} fill={tone(base, TOP)} filter={f} shade={`url(#${idp}-shade-v)`} shadeOpacity={0.8}>{art.top}</FaceG>
      )}
      <path d={pd(L)} fill="none" stroke={lc} strokeWidth="0.8" />
      <path d={pd(R)} fill="none" stroke={lc} strokeWidth="0.8" />
      {top && <path d={pd(T)} fill="none" stroke={lc} strokeWidth="0.8" />}
      {/* corner creases: a lit front edge and a soft shadow line beside it */}
      <path d={`M${P(W, D, 0).join(' ')}L${P(W, D, H).join(' ')}`} stroke="#FFFFFF" strokeWidth="1.4" opacity="0.55" />
      <path d={`M${P(W, D, 0)[0] + 2} ${P(W, D, 0)[1] - 1}L${P(W, D, H)[0] + 2} ${P(W, D, H)[1]}`} stroke="#000000" strokeWidth="1" opacity="0.1" />
    </g>
  );
}

// ---- an open top: interior, then (after the outer faces) the rim ----
export function Interior({ P, s, idp, id, W, D, H, t = 3, floorZ = 0, base, floorArt }) {
  const wallB = tone(base, LEFT), wallR = tone(base, RIGHT);
  const floor = [P(t, t, floorZ), P(W - t, t, floorZ), P(W - t, D - t, floorZ), P(t, D - t, floorZ)];
  const wallY = [P(t, t, H), P(W - t, t, H), P(W - t, t, floorZ), P(t, t, floorZ)];
  const wallX = [P(t, t, H), P(t, D - t, H), P(t, D - t, floorZ), P(t, t, floorZ)];
  return (
    <g>
      <path d={pd(floor)} fill={mix(tone(base, TOP), '#000000', 0.1)} />
      <FaceG id={`${id}-fa`} m={faceM(P, s, 'top', W, D, floorZ)} w={W} h={D} fill="none" clip={[t, t, W - 2 * t, D - 2 * t]}>{floorArt}</FaceG>
      <path d={pd(wallY)} fill={mix(wallB, '#000000', 0.06)} />
      <path d={pd(wallX)} fill={mix(wallR, '#000000', 0.04)} />
      <path d={pd(wallY)} fill={`url(#${idp}-shade-v)`} opacity="0.9" />
      <path d={pd(wallX)} fill={`url(#${idp}-shade-v)`} opacity="0.9" />
      <path d={pd(floor)} fill={`url(#${idp}-shade)`} opacity="0.5" />
    </g>
  );
}
export function Rim({ P, W, D, H, t = 3, base }) {
  const outer = [P(0, 0, H), P(W, 0, H), P(W, D, H), P(0, D, H)];
  const inner = [P(t, t, H), P(W - t, t, H), P(W - t, D - t, H), P(t, D - t, H)];
  const c = mix(base, '#000000', 0.28);
  return (
    <g strokeLinejoin="round">
      <path d={pd(outer) + pd(inner)} fillRule="evenodd" fill={tone(base, TOP)} stroke={c} strokeWidth="0.8" />
      <path d={`M${P(t, t, H).join(' ')}L${P(W - t, t, H)[0]} ${P(W - t, t, H)[1]}`} stroke={c} strokeWidth="0.6" opacity="0.6" />
    </g>
  );
}

// ---- a board flap hinged on the rim, opened by `a` degrees, with visible board thickness ----
export function Flap({ P, p0, p1, out, L, a, base, tk = 3, tape }) {
  const ar = (a * Math.PI) / 180, up = L * Math.sin(ar), ou = L * Math.cos(ar);
  const q0 = [p0[0] + out[0] * ou, p0[1] + out[1] * ou, p0[2] + up];
  const q1 = [p1[0] + out[0] * ou, p1[1] + out[1] * ou, p1[2] + up];
  const hv = [p1[0] - p0[0], p1[1] - p0[1], 0], fv = [out[0] * ou, out[1] * ou, up];
  let n = [hv[1] * fv[2] - hv[2] * fv[1], hv[2] * fv[0] - hv[0] * fv[2], hv[0] * fv[1] - hv[1] * fv[0]];
  if (n[0] + n[1] + n[2] < 0) n = n.map((v) => -v);
  const fill = tone(base, n);
  const A = P(...p0), B = P(...p1), C = P(...q1), Dd = P(...q0);
  const poly = pd([A, B, C, Dd]);
  const bil = (u, v) => {
    const ax = A[0] + (B[0] - A[0]) * u, ay = A[1] + (B[1] - A[1]) * u;
    const bx = Dd[0] + (C[0] - Dd[0]) * u, by = Dd[1] + (C[1] - Dd[1]) * u;
    return [r2(ax + (bx - ax) * v), r2(ay + (by - ay) * v)];
  };
  const edge = mix(base, '#000000', 0.3);
  return (
    <g strokeLinejoin="round">
      <path d={poly} transform={`translate(0 ${tk})`} fill={mix(fill, '#000000', 0.3)} stroke={edge} strokeWidth="0.6" />
      <path d={poly} fill={fill} stroke={edge} strokeWidth="0.8" />
      <path d={`M${Dd.join(' ')}L${C.join(' ')}`} stroke="#FFFFFF" strokeWidth="1" opacity="0.7" />
      {tape && (
        <g>
          <path d={pd([bil(tape.u0, tape.v0), bil(tape.u1, tape.v0), bil(tape.u1, tape.v1), bil(tape.u0, tape.v1)])} fill={tape.color} />
          <path d={`M${bil(tape.u0, tape.v0).join(' ')}L${bil(tape.u1, tape.v0).join(' ')}`} stroke="#FFFFFF" strokeWidth="1" opacity="0.5" />
        </g>
      )}
    </g>
  );
}

// ---- shared artwork pieces ----
// A generic bar code: plain bars that encode nothing.
export function BarsG({ x = 0, y = 0, w = 100, h = 30, seed = 5, fill = K.ink }) {
  const rnd = seeded(seed);
  const bars = [];
  let cx = 0, i = 0;
  while (cx < w - 2) {
    const bw = 1 + Math.floor(rnd() * 3) * 0.9;
    if (i % 2 === 0) bars.push(<rect key={i} x={r2(x + cx)} y={y} width={r2(bw)} height={h} fill={fill} />);
    cx += bw + 0.4;
    i += 1;
  }
  return <g>{bars}</g>;
}
// Quiet placeholder bars where an address would sit.
export function LinesG({ x = 0, y = 0, w = 100, rows = 3, gap = 9, th = 4, fill = K.kraftD, last = 0.6 }) {
  return (
    <g fill={fill}>
      {Array.from({ length: rows }, (_, i) => (
        <rect key={i} x={x} y={y + i * gap} width={r2(i === rows - 1 ? w * last : w)} height={th} rx={th / 2} />
      ))}
    </g>
  );
}
// The shipping label: lockup, quiet placeholder bars and a plain generic bar code. Box 150 x 96.
export function LabelArt({ seed = 3, accent = K.blue }) {
  return (
    <g>
      <rect width="150" height="96" fill="#FFFFFF" />
      <rect width="150" height="4" fill={accent} />
      <LockupG x={10} y={12} size={14} fill={K.ink} markFill={accent} />
      <LinesG x={10} y={38} w={96} rows={3} gap={9} />
      <rect x="116" y="36" width="24" height="24" rx="2" fill={K.kraft} />
      <MarkG x={121} y={41} size={14} fill={K.sky} />
      <BarsG x={10} y={68} w={92} h={20} seed={seed} />
      <rect x="112" y="68" width="28" height="20" rx="2" fill={K.kraft} />
    </g>
  );
}
export { LockupG, LockupStackG, MarkG };
