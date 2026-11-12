// Report cover with spine, three-quarter view: spine, pages block and cover board pulled apart along the depth diagonal.
import Art from '@/components/art/Art';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { PatternDefs } from '@/components/art/KeyArt';
import { BackdropG, ShadowG, MaterialDefs, LayerG, AxisG } from '@/components/art/Mockup';
import { BILLBOARD } from '@/lib/brand';
import { C, wrap, PhLines } from './parts';

const W = 360, H = 480;
const U = [-0.8, -0.5125]; // one unit of depth, up-left (away from the viewer)
const O = [440, 300];
const pt = (x, y) => `${Math.round(x * 100) / 100} ${Math.round(y * 100) / 100}`;
const poly = (pts) => `M${pts.map((p) => pt(p[0], p[1])).join('L')}Z`;
const along = (n) => [U[0] * n, U[1] * n];

// A slab seen from the front-top-left: front face (drawn by the caller), top face and left face of depth n.
function Edges({ x, y, w, h, n, top, left, topLines = 0 }) {
  const [dx, dy] = along(n);
  const t = poly([[x, y], [x + w, y], [x + w + dx, y + dy], [x + dx, y + dy]]);
  const l = poly([[x, y], [x + dx, y + dy], [x + dx, y + h + dy], [x, y + h]]);
  const lines = Array.from({ length: topLines }, (_, i) => {
    const f = (i + 1) / (topLines + 1);
    return `M${pt(x + dx * f, y + dy * f)}H${Math.round((x + w + dx * f) * 100) / 100}`;
  }).join('');
  return (
    <g>
      <path d={l} fill={left} />
      <path d={t} fill={top} />
      {topLines > 0 && <path d={lines} stroke="#C9C9C9" strokeWidth="0.7" />}
      <path d={`${t}${l}`} fill="none" stroke="#000" strokeOpacity="0.1" strokeLinejoin="round" />
    </g>
  );
}

const shadowOf = (idp, pts) => <path d={poly(pts)} fill={C.ink} opacity="0.17" transform="translate(9 13)" filter={`url(#${idp}-soft)`} />;

export function Report() {
  const idp = 'use-stationery-report';
  const [cx, cy] = O;
  const title = wrap(BILLBOARD.title, 21);
  // pages block: starts 12 units behind the cover, inset a little, 56 units deep
  const [p0x, p0y] = along(12);
  const px = cx + p0x + 6, py = cy + p0y + 6, pw = W - 14, ph = H - 12;
  // spine: left face of the whole book, 80 units deep, one board thick
  const [sx, sy] = along(80);
  const mid = along(40);
  const step = [0.8 * 240, 0.5125 * 240];
  return (
    <Art viewBox="0 0 1100 1000" title="Report cover: spine, pages block and cover board pulled apart along the depth diagonal" exportName="use-stationery-report">
      <BackdropG w={1100} h={1000} />
      <MaterialDefs idp={idp} />
      <PatternDefs idp={`${idp}-p`} color="#FFFFFF" opacity={0.55} />
      <defs>
        <linearGradient id={`${idp}-field`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5BA8F8" />
          <stop offset="1" stopColor="#3F8DE6" />
        </linearGradient>
        <linearGradient id={`${idp}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4C9BF3" stopOpacity="0" />
          <stop offset="0.6" stopColor="#4C9BF3" stopOpacity="0.95" />
          <stop offset="1" stopColor="#4C9BF3" />
        </linearGradient>
        <linearGradient id={`${idp}-spine`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6DB0F8" />
          <stop offset="1" stopColor="#2F7CD6" />
        </linearGradient>
        <linearGradient id={`${idp}-hinge`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.22" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${idp}-face`}>
          <rect x={cx} y={cy} width={W} height={H} />
        </clipPath>
      </defs>
      <ShadowG idp={`${idp}-s`} cx={620} cy={930} rx={470} tone="blue" />
      <AxisG points={[[cx + 150 - step[0], cy + H + 52 - step[1]], [cx + 150, cy + H + 52], [cx + 150 + step[0], cy + H + 52 + step[1]]]} />

      <LayerG i={0} dx={-step[0]} dy={-step[1]}>
        {shadowOf(idp, [[cx, cy], [cx + sx, cy + sy], [cx + sx, cy + H + sy], [cx, cy + H]])}
        <path d={poly([[cx, cy], [cx + sx, cy + sy], [cx + sx, cy + H + sy], [cx, cy + H]])} fill={`url(#${idp}-spine)`} filter={`url(#${idp}-paper)`} />
        <path d={poly([[cx, cy], [cx + sx, cy + sy], [cx + sx, cy + H + sy], [cx, cy + H]])} fill={`url(#${idp}-shade-v)`} />
        <g transform={`matrix(0.8 0.5125 0 1 ${pt(cx + mid[0] - 0.8 * 17, cy + mid[1] - 0.5125 * 17 + 40)})`}>
          <MarkG x={0} y={0} size={34} fill="#fff" />
        </g>
        <g transform={`matrix(0 1 -0.8 -0.5125 ${pt(cx + mid[0] - 0.8 * 13, cy + mid[1] - 0.5125 * 13 + 150)})`}>
          <WordmarkG x={0} y={0} size={34} fill="#fff" />
        </g>
        <path d={poly([[cx, cy], [cx + sx, cy + sy], [cx + sx + 10, cy + sy], [cx + 10, cy]])} fill="#9CCBFA" />
        <path d={poly([[cx, cy], [cx + 10, cy], [cx + 10, cy + H], [cx, cy + H]])} fill="#2F7CD6" />
        <path d={`M${pt(cx, cy)}L${pt(cx + sx, cy + sy)}`} stroke="#fff" strokeOpacity="0.7" strokeWidth="1.2" />
      </LayerG>

      <LayerG i={1}>
        {shadowOf(idp, [[px, py], [px + pw, py], [px + pw, py + ph], [px, py + ph]])}
        <Edges x={px} y={py} w={pw} h={ph} n={56} top="#FFFFFF" left="#E3E3E3" topLines={14} />
        <rect x={px} y={py} width={pw} height={ph} fill={`url(#${idp}-card)`} filter={`url(#${idp}-paper)`} />
        <MarkG x={px + 40} y={py + 40} size={40} fill={C.blue} />
        <PhLines x={px + 40} y={py + 130} w={pw - 80} rows={3} gap={16} />
        <PhLines x={px + 40} y={py + 200} w={pw - 80} rows={8} gap={16} />
        <rect x={px} y={py} width={pw} height={ph} fill={`url(#${idp}-shade)`} opacity="0.6" />
        <path d={`M${px} ${py + ph}V${py}H${px + pw}`} stroke="#fff" strokeOpacity="0.9" fill="none" />
      </LayerG>

      <LayerG i={2} dx={step[0]} dy={step[1]}>
        {shadowOf(idp, [[cx, cy], [cx + W, cy], [cx + W, cy + H], [cx, cy + H]])}
        <Edges x={cx} y={cy} w={W} h={H} n={12} top="#8EC1FA" left="#3F8DE6" />
        <rect x={cx} y={cy} width={W} height={H} fill={`url(#${idp}-field)`} filter={`url(#${idp}-paper)`} />
        <g clipPath={`url(#${idp}-face)`}>
          <rect x={cx} y={cy} width={W} height={H * 0.62} fill={`url(#${idp}-p-pat-fuse)`} />
          <rect x={cx} y={cy} width={W} height={H} fill={`url(#${idp}-fade)`} />
        </g>
        <MarkG x={cx + 36} y={cy + 36} size={52} fill="#fff" />
        <WordmarkG x={cx + 100} y={cy + 79} size={44} fill="#fff" />
        <g fontSize="30" fontWeight="300" fill="#fff">
          {title.map((l, k) => <text key={k} x={cx + 36} y={cy + H - 36 - (title.length - 1 - k) * 38}>{l}</text>)}
        </g>
        <rect x={cx + 14} y={cy} width="30" height={H} fill={`url(#${idp}-hinge)`} />
        <rect x={cx} y={cy} width={W} height={H} fill={`url(#${idp}-shade)`} />
        <path d={`M${cx} ${cy + H}V${cy}H${cx + W}`} stroke="#fff" strokeOpacity="0.8" fill="none" />
      </LayerG>
    </Art>
  );
}
