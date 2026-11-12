import Art from '@/components/art/Art';
import { BackdropG, MaterialDefs } from '@/components/art/Mockup';
import { TreesG } from '@/components/art/KeyArt';
import { MarkG } from '@/components/art/Mark';
import { HEX } from '@/lib/brand';
import { seeded, r2 } from '@/lib/charts';

export const PAL = { blue: HEX.blue, yellow: HEX.yellow, white: HEX.white, ink: HEX.ink, sky: HEX.sky, deep: HEX.deep, field: HEX.field };
export const u = (idp, k) => `url(#${idp}-${k})`;

// One exportable mockup: white plate, material library, children(idp). Every id starts with use-event-.
export function Scene({ name, title, w, h, children }) {
  const idp = `use-event-${name}`;
  return (
    <Art viewBox={`0 0 ${w} ${h}`} title={title} exportName={idp}>
      <BackdropG w={w} h={h} />
      <MaterialDefs idp={idp} />
      {children(idp)}
    </Art>
  );
}

// A quiet placeholder bar: stands where a date, seat or code would be (no facts invented).
export function Bar({ x, y, w, h = 4, fill = '#FFFFFF', o = 0.5 }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} opacity={o} />;
}

// A generic barcode of plain bars. It encodes nothing.
export function Barcode({ x, y, w, h, fill = PAL.ink, seed = 5, o = 1 }) {
  const rnd = seeded(seed);
  const unit = w / 44;
  const bars = [];
  let cx = 0;
  while (cx < w - unit * 3) {
    const bw = (1 + Math.floor(rnd() * 3)) * unit;
    if (cx + bw > w) break;
    bars.push([r2(cx), r2(bw)]);
    cx += bw + unit * (1 + Math.floor(rnd() * 2));
  }
  return (
    <g transform={`translate(${x} ${y})`} fill={fill} opacity={o}>
      {bars.map(([bx, bw], i) => <rect key={i} x={bx} y="0" width={bw} height={h} />)}
    </g>
  );
}

// The brand gradient that stands in for the photograph, with line-drawn trees.
export function PhotoG({ id, x, y, w, h, seed = 3 }) {
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={PAL.sky} />
          <stop offset="1" stopColor={PAL.blue} />
        </linearGradient>
        <clipPath id={`${id}-c`}><rect x={x} y={y} width={w} height={h} /></clipPath>
      </defs>
      <rect x={x} y={y} width={w} height={h} fill={`url(#${id}-g)`} />
      <g clipPath={`url(#${id}-c)`}>
        <TreesG x={x} y={y} w={w} h={h} count={4} tone="blue" seed={seed} minSize={h * 0.3} maxSize={h * 0.55} />
      </g>
    </g>
  );
}

// The case study's badge card: photo area above, colour block below with name, role, two quiet bars, white mark.
// Drawn in its own space, 190 x 296, origin top-left.
export function CardFace({ idp, id, tone, name, role, w = 190, h = 296, seed = 3 }) {
  const ph = Math.round(h * 0.57);
  return (
    <g>
      <clipPath id={`${id}-clip`}><rect width={w} height={h} rx="6" /></clipPath>
      <g clipPath={`url(#${id}-clip)`}>
        <rect width={w} height={h} fill="#FFFFFF" />
        <PhotoG id={`${id}-ph`} x={0} y={0} w={w} h={ph} seed={seed} />
        <rect y={ph} width={w} height={h - ph} fill={PAL[tone]} filter={u(idp, 'paper')} />
        <text x="12" y={ph + 34} fontSize="25" fontWeight="300" fill="#FFFFFF">{name}</text>
        <text x="12" y={ph + 54} fontSize="13" fontWeight="300" fill="#FFFFFF" fillOpacity="0.85">{role}</text>
        <Bar x={12} y={h - 27} w={62} h={3.5} o={0.6} />
        <Bar x={12} y={h - 18} w={48} h={3.5} o={0.6} />
        <MarkG x={w - 44} y={h - 44} size={30} fill="#FFFFFF" />
        <rect width={w} height={h} fill={u(idp, 'shade')} />
        <path d={`M0 ${ph}H${w}`} stroke="#000000" strokeOpacity="0.08" />
      </g>
      <rect width={w} height={h} rx="6" fill="none" stroke="#000000" strokeOpacity="0.1" />
    </g>
  );
}
