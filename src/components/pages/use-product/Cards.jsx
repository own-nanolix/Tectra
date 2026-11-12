import Art from '@/components/art/Art';
import { LockupG, MARK } from '@/components/art/Mark';
import { BackdropG, ShadowG, MaterialDefs } from '@/components/art/Mockup';
import { r2 } from '@/lib/charts';

// The site access card in three colourways. 428 x 270 (an ID-1 proportion), top view, chip-less.
const W = 428;
const H = 270;
const R = 16;

export const WAYS = {
  blue: { name: 'Blue', bg: '#4093EC', fg: '#FFFFFF', mark: '#FFFFFF', line: '#FFFFFF', lineOp: 0.4, edge: '#0A2E63', shadow: 'blue', bar: '#FFFFFF', barOp: 0.38 },
  yellow: { name: 'Yellow', bg: '#FFB83D', fg: '#2F2F2F', mark: '#2F2F2F', line: '#2F2F2F', lineOp: 0.26, edge: '#7A5000', shadow: 'yellow', bar: '#2F2F2F', barOp: 0.28 },
  white: { name: 'White', bg: '#FFFFFF', fg: '#2F2F2F', mark: '#4093EC', line: '#90C0F3', lineOp: 0.7, edge: '#5E5E5E', shadow: 'sky', bar: '#2F2F2F', barOp: 0.16 },
};

// Contactless symbol: four arcs opening to the right.
function Contactless({ x, y, color }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke={color} strokeWidth="3.2" strokeLinecap="round">
      {[7, 15, 23, 31].map((r) => (
        <path key={r} d={`M${r2(r * 0.707)} ${r2(-r * 0.707)}A${r} ${r} 0 0 1 ${r2(r * 0.707)} ${r2(r * 0.707)}`} />
      ))}
    </g>
  );
}

// One face. Drawn at 0,0; the caller places and turns it.
function Face({ idp, k, side }) {
  const w = WAYS[k];
  const id = `${idp}-${side}`;
  return (
    <g>
      <clipPath id={`${id}-clip`}>
        <rect width={W} height={H} rx={R} />
      </clipPath>
      {/* card edge (thickness), then the face */}
      <rect y="4" width={W} height={H} rx={R} fill={w.edge} opacity="0.55" />
      <rect width={W} height={H} rx={R} fill={w.bg} />
      <g clipPath={`url(#${id}-clip)`}>
        {k === 'white' && <rect width={W} height={H} fill={`url(#${idp}-card)`} />}
        <rect width={W} height={H} fill={`url(#${idp}-shade-v)`} opacity={k === 'white' ? 0.4 : 0.9} />
        {side === 'front' ? (
          <g>
            {/* three-circle line drawing, cut by the card edge */}
            <g transform="translate(236 62) scale(2.7)" fill="none" stroke={w.line} strokeWidth="0.55" opacity={w.lineOp}>
              <circle cx={MARK.A.cx} cy={MARK.A.cy} r={MARK.A.r} />
              <circle cx={MARK.B.cx} cy={MARK.B.cy} r={MARK.B.r} />
              <circle cx={MARK.C.cx} cy={MARK.C.cy} r={MARK.C.r} />
            </g>
            <LockupG x={30} y={30} size={52} fill={w.fg} markFill={w.mark} />
            <Contactless x={352} y={60} color={w.fg} />
          </g>
        ) : (
          <g>
            <rect y="38" width={W} height="52" fill={`url(#${idp}-rubber)`} />
            <rect y="38" width={W} height="6" fill="#FFFFFF" opacity="0.14" />
            <rect x="28" y="112" width="262" height="34" rx="3" fill="#F5F5F5" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <rect key={i} x={36 + i * 32} y="112" width="14" height="34" fill="#DDDDDD" opacity="0.8" />
            ))}
            {[[28, 176, 170], [28, 198, 112], [28, 220, 214]].map(([x, y, bw], i) => (
              <rect key={i} x={x} y={y} width={bw} height="10" rx="5" fill={w.bar} opacity={w.barOp} />
            ))}
            <LockupG x={318} y={226} size={26} fill={w.fg} markFill={w.mark} />
          </g>
        )}
        {/* light from the upper left: broad gloss, a bright edge, the shade low right */}
        <path d={`M0 0H${W * 0.62}L0 ${H * 0.9}Z`} fill="#FFFFFF" opacity="0.13" />
        <path d={`M${W * 0.62} 0H${W * 0.7}L0 ${H * 1.02}V${H * 0.9}Z`} fill="#FFFFFF" opacity="0.07" />
        <rect width={W} height={H} fill={`url(#${idp}-shade)`} opacity={k === 'white' ? 0.3 : 0.6} />
      </g>
      <path d={`M${R} 0.75H${W - R}`} stroke="#FFFFFF" strokeWidth="1.5" opacity="0.7" />
      <path d={`M0.75 ${R}V${H - R}`} stroke="#FFFFFF" strokeWidth="1.5" opacity="0.5" />
      <path d={`M${W - 0.75} ${R + 8}V${H - R}Q${W - 0.75} ${H - 0.75} ${W - R} ${H - 0.75}H${R}`} fill="none" stroke={w.edge} strokeWidth="1.5" opacity="0.35" />
    </g>
  );
}

// One colourway: the front above the back, stepped along the diagonal.
export function CardArt({ k }) {
  const w = WAYS[k];
  const idp = `use-product-card-${k}`;
  return (
    <Art viewBox="0 0 580 760" title={`Access card, ${w.name.toLowerCase()}, front above back`} exportName={`use-product-card-${k}`}>
      <MaterialDefs idp={idp} />
      <BackdropG w={580} h={760} />
      <ShadowG idp={`${idp}-f`} cx={270} cy={352} rx={210} ry={30} tone={w.shadow} opacity={0.34} blur={13} />
      <ShadowG idp={`${idp}-b`} cx={318} cy={672} rx={210} ry={30} tone={w.shadow} opacity={0.34} blur={13} />
      <g transform="translate(66 106) rotate(-8 214 135)">
        <Face idp={idp} k={k} side="front" />
      </g>
      <g transform="translate(112 426) rotate(-8 214 135)">
        <Face idp={idp} k={k} side="back" />
      </g>
    </Art>
  );
}
