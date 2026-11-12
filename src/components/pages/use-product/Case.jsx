import Art from '@/components/art/Art';
import { TabletG } from '@/components/art/Devices';
import { LockupG } from '@/components/art/Mark';
import { BackdropG, ShadowG, MaterialDefs, LayerG, AxisG, CalloutG } from '@/components/art/Mockup';
import { r2 } from '@/lib/charts';
import { TabletScreen } from './Tablet';

// The site tablet with its transport case and charging cable, pulled apart along the vertical axis:
// base with foam insert, then tablet and cable, then the lid. Every layer lies in one plane (a matrix),
// seen from above and to the right, lit from the upper left.
const F = 0.95;
const mat = `matrix(${r2(0.4 * F)} ${r2(0.1 * F)} ${r2(-0.24 * F)} ${r2(0.36 * F)} 0 0)`;
const W = 1000, H = 640, R = 48;
const LIFT = [0, -215, -440];
const OX = 290, OY = 480;
const TW = 652; // tablet width in plane units
const K = TW / 1260;

// The thickness of a plate: the same shape stacked downwards, darker towards the bottom.
function Slab({ n }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(0 ${r2((n - i) * 1.4)})`}>
          <g transform={mat}>
            <rect width={W} height={H} rx={R} fill={i < n - 4 ? '#161616' : '#232323'} />
          </g>
        </g>
      ))}
    </g>
  );
}

function Latch({ x, idp }) {
  return (
    <g>
      <rect x={x} y={H - 34} width="130" height="46" rx="10" fill={`url(#${idp}-metal-dark)`} />
      <rect x={x + 14} y={H - 20} width="102" height="18" rx="6" fill="#0C0C0D" />
      <rect x={x} y={H - 34} width="130" height="4" rx="2" fill="#FFFFFF" opacity="0.3" />
    </g>
  );
}

// Light from the upper left: a bright edge top-left, shade towards the lower right.
function Shading({ idp }) {
  return (
    <g>
      <rect width={W} height={H} rx={R} fill={`url(#${idp}-shade)`} />
      <rect width={W} height={H} rx={R} fill={`url(#${idp}-shade-v)`} opacity="0.7" />
      <path d={`M2 ${R + 8}Q2 2 ${R + 8} 2H${W - 70}`} fill="none" stroke="#FFFFFF" strokeWidth="5" opacity="0.28" />
    </g>
  );
}

function BaseLayer({ idp }) {
  return (
    <g>
      <Slab n={22} />
      <g transform={mat}>
        <rect width={W} height={H} rx={R} fill={`url(#${idp}-rubber)`} />
        <rect x="28" y="28" width={W - 56} height={H - 56} rx="30" fill="#141415" />
        <rect x="44" y="44" width={W - 88} height={H - 88} rx="22" fill="#2B2B2E" />
        {/* tablet cutout and cable well, cut into the foam */}
        <rect x="70" y="82" width="668" height="486" rx="18" fill="#101011" />
        <rect x="70" y="82" width="668" height="12" rx="6" fill="#000000" opacity="0.55" />
        <rect x="764" y="82" width="170" height="486" rx="44" fill="#101011" />
        <rect x="764" y="82" width="170" height="12" rx="6" fill="#000000" opacity="0.55" />
        <Latch x={230} idp={idp} />
        <Latch x={640} idp={idp} />
        <Shading idp={idp} />
      </g>
    </g>
  );
}

function TabletLayer({ idp }) {
  return (
    <g transform={mat}>
      <TabletG idp={`${idp}-tab`} x={80} y={92} w={TW} rugged>
        <TabletScreen idp={`${idp}-app`} />
      </TabletG>
      <rect x={80 + 40 * K} y={92 + 40 * K} width={1180 * K} height={820 * K} rx="7" fill={`url(#${idp}-glass)`} opacity="0.7" />
    </g>
  );
}

// A charging cable coiled in its well: three loops, a tie strap and a plug.
function CableLayer({ idp }) {
  return (
    <g transform={mat}>
      {[0, 24, 48].map((o) => (
        <g key={o}>
          <rect x={780 + o} y={104 + o} width={138 - o * 2} height={442 - o * 2} rx={56 - o * 0.8} fill="none" stroke="#2F2F2F" strokeWidth="16" />
          <rect x={780 + o} y={104 + o} width={138 - o * 2} height={442 - o * 2} rx={56 - o * 0.8} fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.2" transform="translate(-4 -4)" />
        </g>
      ))}
      <rect x="760" y="318" width="178" height="22" rx="4" fill="#FFB83D" />
      <rect x="760" y="318" width="178" height="5" rx="2" fill="#FFFFFF" opacity="0.4" />
      <path d="M850 104V64" stroke="#2F2F2F" strokeWidth="16" />
      <rect x="822" y="0" width="56" height="70" rx="12" fill="#1B1B1B" />
      <rect x="832" y="-36" width="36" height="42" rx="6" fill={`url(#${idp}-metal)`} />
      <rect x="842" y="-24" width="16" height="5" rx="2" fill="#2F2F2F" opacity="0.6" />
      <rect x="822" y="0" width="56" height="6" rx="3" fill="#FFFFFF" opacity="0.25" />
    </g>
  );
}

function LidLayer({ idp }) {
  return (
    <g>
      <Slab n={26} />
      <g transform={mat}>
        <rect width={W} height={H} rx={R} fill={`url(#${idp}-rubber)`} />
        <rect x="40" y="40" width={W - 80} height={H - 80} rx="26" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.14" />
        <rect x="400" y="18" width="200" height="22" rx="11" fill="#141415" />
        <rect x="40" y="540" width={W - 80} height="14" rx="3" fill="#4093EC" />
        <LockupG x={290} y={270} size={105} fill="#FFFFFF" markFill="#4093EC" />
        <Latch x={230} idp={idp} />
        <Latch x={640} idp={idp} />
        <Shading idp={idp} />
      </g>
    </g>
  );
}

export function CaseArt() {
  const idp = 'use-product-case';
  const cx = OX + 0.4 * F * 500 - 0.24 * F * 320;
  const cy = OY + 0.1 * F * 500 + 0.36 * F * 320;
  const pts = [20, ...LIFT, -500].map((l) => [r2(cx), r2(cy + l)]);
  return (
    <Art viewBox="0 0 980 900" title="Site tablet, case and charging cable, exploded: base with foam insert, tablet and cable, lid" exportName="use-product-case-exploded">
      <MaterialDefs idp={idp} />
      <BackdropG w={980} h={900} />
      <ShadowG idp={idp} cx={cx + 40} cy={820} rx={330} ry={38} tone="blue" opacity={0.32} blur={14} />
      <AxisG points={pts} />
      <g transform={`translate(${OX} ${OY})`}>
        <LayerG i={0} dx={0} dy={LIFT[0]}>
          <BaseLayer idp={idp} />
        </LayerG>
        <LayerG i={1} dx={0} dy={LIFT[1]}>
          <TabletLayer idp={idp} />
          <CableLayer idp={idp} />
        </LayerG>
        <LayerG i={2} dx={0} dy={LIFT[2]}>
          <LidLayer idp={idp} />
        </LayerG>
      </g>
      <CalloutG x={cx - 190} y={cy + 90} tx={230} ty={cy + 150} label="Case base and foam" anchor="end" />
      <CalloutG x={cx - 140} y={cy - 150} tx={170} ty={cy - 200} label="Tablet" anchor="end" />
      <CalloutG x={cx + 190} y={cy - 215} tx={760} ty={cy - 270} label="Charging cable" />
      <CalloutG x={cx + 150} y={cy - 400} tx={760} ty={cy - 440} label="Lid" />
    </Art>
  );
}
