import { LayerG, AxisG, ShadowG } from '@/components/art/Mockup';
import { Plate, MarkG, LockupStackG, K, mix } from './parts';
import { r2 } from '@/lib/charts';

// Shopping bags in front elevation. Three layers pulled apart along the depth diagonal (up and to the right):
// the front panel stays, the rear body with its gusset steps back, the rope handles go furthest.
const PX = 60, PY = 316, W = 230, H = 290, HEM = 28;
const STEP = [74, -56];

export const BAG_CFG = [
  { key: 'white', base: K.white, rope: K.blue, ropeEdge: '#2E78C9', shadow: 'blue', art: 'mark', ink: K.blue, title: 'White shopping bag with the blue mark, panel, gusset and handles pulled apart' },
  { key: 'blue', base: K.blue, rope: '#FFFFFF', ropeEdge: '#BFC8D2', shadow: 'sky', art: 'lockup', ink: '#FFFFFF', title: 'Blue shopping bag with the white lockup, panel, gusset and handles pulled apart' },
  { key: 'yellow', base: K.yellow, rope: K.ink, ropeEdge: '#171717', shadow: 'yellow', art: 'mark', ink: K.ink, title: 'Yellow shopping bag with the ink mark, panel, gusset and handles pulled apart' },
];

const Eyelet = ({ x, y }) => (
  <g>
    <circle cx={x} cy={y + 1.2} r="8.6" fill="#000000" opacity="0.16" />
    <circle cx={x} cy={y} r="8.2" fill="#F2F2F2" stroke="#B5B5B5" strokeWidth="0.8" />
    <circle cx={x} cy={y} r="4.3" fill="#2F2F2F" opacity="0.85" />
    <path d={`M${x - 6} ${y - 2.5}A6.6 6.6 0 0 1 ${x - 1.5} ${y - 6.2}`} fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
  </g>
);

function Rope({ x0, x1, y, rise, cfg, back }) {
  const col = back ? mix(cfg.rope, '#000000', 0.18) : cfg.rope;
  const edge = back ? mix(cfg.ropeEdge, '#000000', 0.15) : cfg.ropeEdge;
  const d = `M${x0} ${y}C${x0 - 6} ${y - rise} ${x1 + 6} ${y - rise} ${x1} ${y}`;
  return (
    <g fill="none" strokeLinecap="round">
      <path d={d} stroke={edge} strokeWidth="9" />
      <path d={d} stroke={col} strokeWidth="6.6" />
      <path d={d} stroke="#FFFFFF" strokeWidth="6.6" strokeDasharray="1.4 3.6" opacity="0.28" />
      <path d={d} stroke="#FFFFFF" strokeWidth="1.6" opacity="0.4" transform="translate(-1.2 -1.6)" />
      <circle cx={x0} cy={y} r="7" fill={edge} stroke="none" />
      <circle cx={x1} cy={y} r="7" fill={edge} stroke="none" />
      <circle cx={x0 - 1} cy={y - 1} r="2.2" fill="#FFFFFF" opacity="0.35" stroke="none" />
    </g>
  );
}

export function Bag({ idp, cfg }) {
  const dark = (k) => mix(cfg.base, '#000000', k);
  const edgeC = cfg.base === K.white ? '#CFCFCF' : dark(0.22);
  const eyeL = W * 0.27, eyeR = W * 0.73, eyeY = HEM / 2;

  const rear = (
    <g strokeLinejoin="round">
      <rect width={W} height={H} fill={dark(0.14)} stroke={edgeC} strokeWidth="0.8" filter={`url(#${idp}-paper)`} />
      <rect width={W} height={HEM} fill={dark(0.06)} />
      <path d={`M0 ${HEM}H${W}`} stroke={dark(0.3)} strokeWidth="1" />
      {/* the gusset: a side fold that pleats inward, with its crease lines */}
      <path d={`M${W} 0H${W + 66}V${H}H${W}Z`} fill={dark(0.26)} stroke={edgeC} strokeWidth="0.8" filter={`url(#${idp}-paper)`} />
      <path d={`M${W} 0H${W + 66}V${HEM}H${W}Z`} fill={dark(0.18)} />
      <path d={`M${W + 33} ${HEM}V${H}M${W} ${HEM}L${W + 33} ${HEM + 46}L${W + 66} ${HEM}M${W} ${H}L${W + 33} ${H - 46}L${W + 66} ${H}`} fill="none" stroke={dark(0.45)} strokeWidth="1" />
      <path d={`M${W + 34.5} ${HEM}V${H}`} stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
      <rect width={W + 66} height={H} fill={`url(#${idp}-shade)`} opacity="0.8" />
    </g>
  );

  const art = cfg.art === 'lockup' ? (
    <LockupStackG x={W / 2 - 82} y={H / 2 - 54} scale={0.55} fill={cfg.ink} />
  ) : (
    <MarkG x={W / 2 - 46} y={H / 2 - 58} size={92} fill={cfg.ink} />
  );
  const front = (
    <g strokeLinejoin="round">
      <rect width={W} height={H} fill={cfg.base} stroke={edgeC} strokeWidth="0.9" filter={`url(#${idp}-paper)`} />
      {art}
      <rect width={W} height={H} fill={`url(#${idp}-shade)`} />
      <rect width={W} height={H} fill={`url(#${idp}-glass)`} opacity="0.3" />
      {/* gusset crease lines at both sides and the pleated base */}
      <path d={`M16 ${HEM}V${H - 24}M${W - 16} ${HEM}V${H - 24}`} stroke="#000000" strokeWidth="1" opacity="0.1" />
      <path d={`M17.4 ${HEM}V${H - 24}M${W - 14.6} ${HEM}V${H - 24}`} stroke="#FFFFFF" strokeWidth="1" opacity="0.35" />
      <path d={`M0 ${H - 30}L16 ${H - 24}H${W - 16}L${W} ${H - 30}M16 ${H - 24}L0 ${H}M${W - 16} ${H - 24}L${W} ${H}`} fill="none" stroke="#000000" strokeWidth="1" opacity="0.13" />
      <path d={`M0 ${H - 29}L16 ${H - 23}H${W - 16}L${W} ${H - 29}`} fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
      {/* the folded top edge */}
      <rect width={W} height={HEM} fill="#FFFFFF" opacity="0.16" />
      <rect y={HEM} width={W} height="14" fill={`url(#${idp}-shade-v)`} opacity="0.85" />
      <path d={`M0 ${HEM}H${W}`} stroke="#000000" strokeWidth="1" opacity="0.2" />
      <path d={`M0 ${HEM + 1.2}H${W}`} stroke="#FFFFFF" strokeWidth="1" opacity="0.35" />
      <Eyelet x={eyeL} y={eyeY} />
      <Eyelet x={eyeR} y={eyeY} />
      <rect x={W - 3} width="3" height={H} fill="#000000" opacity="0.08" />
    </g>
  );

  const handles = (
    <g>
      <g transform="translate(24 -18)"><Rope x0={eyeL} x1={eyeR} y={eyeY} rise={118} cfg={cfg} back /></g>
      <Rope x0={eyeL} x1={eyeR} y={eyeY} rise={126} cfg={cfg} />
    </g>
  );

  const c = [PX + W / 2, PY + H / 2];
  return (
    <Plate idp={idp} w={640} h={720} title={cfg.title} exportName={`use-packaging-bag-${cfg.key}`} pattern={K.blue}>
      <ShadowG idp={`${idp}-sh`} cx={PX + W / 2 + 54} cy={PY + H + 14} rx={196} ry={34} tone={cfg.shadow} opacity={0.34} blur={13} />
      <AxisG points={[[c[0], c[1]], [c[0] + STEP[0], c[1] + STEP[1]], [c[0] + STEP[0] * 2, c[1] + STEP[1] * 2], [r2(c[0] + STEP[0] * 2.8), r2(c[1] + STEP[1] * 2.8)]]} />
      <g transform={`translate(${PX} ${PY})`}><g className={cfg.key === 'white' ? 'mock-lit' : undefined}>
        <LayerG i={0} dx={STEP[0]} dy={STEP[1]}>{rear}</LayerG>
        <LayerG i={1}>{front}</LayerG>
        <LayerG i={2} dx={STEP[0] * 2} dy={STEP[1] * 2}>{handles}</LayerG>
      </g></g>
    </Plate>
  );
}
