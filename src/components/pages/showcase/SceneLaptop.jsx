import Art from '@/components/art/Art';
import { LaptopG, ScreenAppG } from '@/components/art/Devices';
import { AxisG, BackdropG, CalloutG, LayerG, MaterialDefs, SheenG, ShadowG } from '@/components/art/Mockup';

// Scene 3: a laptop on a plinth in front elevation. Plinth, laptop, screen glass and the UI layer are separated along
// the vertical axis (AxisG at the right). The lid is dark where the UI layer has lifted out of it. Sky shadow.
const ID = 'showcase-s3';
const CX = 520; // centre line of the object
const BASE = 866; // floor
const PLINTH = { w: 520, h: 66 };
const TOP = BASE - PLINTH.h; // top of the plinth
const LW = 420; // laptop width
const LK = LW / 1840;
const LH = 1016 * LK; // laptop height
const SCR = { w: 1440 * LK, h: 900 * LK }; // screen area
const LAP_Y = TOP - LH; // assembled: sits on the plinth
const SCR_X = CX - LW / 2 + 200 * LK, SCR_Y = LAP_Y + 30 * LK;
const GAP = 36;
const LAP_DY = -GAP;
const GLASS_DY = LAP_DY - GAP - SCR.h;
const UI_DY = GLASS_DY - GAP - SCR.h;
const R = (n) => Math.round(n * 10) / 10;
const UI_SX = Math.round((SCR.w / 1600) * 1e4) / 1e4;
const UI_SY = Math.round((SCR.h / 1000) * 1e4) / 1e4;

export default function SceneLaptop() {
  const glass = `M${R(SCR_X + 6)} ${R(SCR_Y)}h${R(SCR.w - 12)}a6 6 0 0 1 6 6v${R(SCR.h - 12)}a6 6 0 0 1-6 6h${-R(SCR.w - 12)}a6 6 0 0 1-6-6v${-R(SCR.h - 12)}a6 6 0 0 1 6-6Z`;
  const stops = [
    { y: TOP + PLINTH.h / 2, label: 'Plinth' },
    { y: LAP_Y + LH / 2 + LAP_DY, label: 'Laptop' },
    { y: SCR_Y + SCR.h / 2 + GLASS_DY, label: 'Screen glass' },
    { y: SCR_Y + SCR.h / 2 + UI_DY, label: 'UI layer' },
  ];
  return (
    <Art viewBox="0 0 1200 900" title="Laptop on a plinth, exploded along the vertical axis" exportName="showcase-laptop-plinth">
      <BackdropG w={1200} h={900} />
      <MaterialDefs idp={ID} />
      <defs>
        <linearGradient id={`${ID}-plinth`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.55" stopColor="#E4E8EE" />
          <stop offset="1" stopColor="#BFC7D2" />
        </linearGradient>
        <linearGradient id={`${ID}-lid`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.28" />
          <stop offset="0.45" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.28" />
        </linearGradient>
        <clipPath id={`${ID}-ui-clip`}>
          <rect x={R(SCR_X)} y={R(SCR_Y)} width={R(SCR.w)} height={R(SCR.h)} rx="3" />
        </clipPath>
      </defs>

      <ShadowG idp={`${ID}-floor`} cx={CX + 22} cy={BASE + 10} rx={330} ry={22} tone="sky" opacity={0.7} blur={12} />

      {/* Plinth */}
      <LayerG i={0}>
        <rect x={CX - PLINTH.w / 2} y={TOP} width={PLINTH.w} height={PLINTH.h} fill={`url(#${ID}-plinth)`} />
        <rect x={CX - PLINTH.w / 2} y={TOP} width={PLINTH.w} height="7" fill="#FFFFFF" />
        <rect x={CX - PLINTH.w / 2} y={TOP + 7} width={PLINTH.w} height="2" fill="#90C0F3" opacity="0.7" />
        <rect x={CX - PLINTH.w / 2} y={TOP} width={PLINTH.w} height={PLINTH.h} fill={`url(#${ID}-shade)`} opacity="0.5" />
        <path d={`M${CX - PLINTH.w / 2} ${BASE - 1}H${CX + PLINTH.w / 2}`} stroke="#9AA6B6" strokeWidth="2" opacity="0.6" />
      </LayerG>

      {/* Laptop base and lid, screen dark: it turns to the light */}
      <LayerG i={1} dy={LAP_DY}>
        <ShadowG idp={`${ID}-lap-sh`} cx={CX + 16} cy={TOP + 4} rx={LW * 0.5} ry={8} tone="sky" opacity={0.55} blur={6} />
        <g className="mock-lit">
          <LaptopG idp={`${ID}-lap`} x={CX - LW / 2} y={LAP_Y} w={LW}>
            <rect width="1440" height="900" fill="#0D0E12" />
          </LaptopG>
          <g transform={`translate(${CX - LW / 2} ${LAP_Y}) scale(${LK})`}>
            <rect x="170" width="1500" height="960" rx="30" fill={`url(#${ID}-lid)`} />
            <rect y="960" width="1840" height="56" rx="20" fill={`url(#${ID}-shade-v)`} />
          </g>
        </g>
      </LayerG>

      {/* Screen glass */}
      <LayerG i={2} dy={GLASS_DY}>
        <ShadowG idp={`${ID}-glass-sh`} cx={SCR_X + SCR.w / 2 + 14} cy={SCR_Y + SCR.h + 16} rx={SCR.w * 0.46} ry={7} tone="sky" opacity={0.6} blur={6} />
        <rect x={R(SCR_X + 6)} y={R(SCR_Y + SCR.h)} width={R(SCR.w - 12)} height="5" rx="1" fill="#9DB8D6" />
        <path d={glass} fill="#BFDDFB" fillOpacity="0.18" stroke="#90C0F3" strokeWidth="1.2" />
        <SheenG idp={ID} d={glass} opacity={0.9} />
        <path d={`M${R(SCR_X + 8)} ${R(SCR_Y + 1)}h${R(SCR.w - 16)}`} stroke="#FFFFFF" strokeWidth="1.5" />
      </LayerG>

      {/* UI layer */}
      <LayerG i={3} dy={UI_DY}>
        <ShadowG idp={`${ID}-ui-sh`} cx={SCR_X + SCR.w / 2 + 14} cy={SCR_Y + SCR.h + 16} rx={SCR.w * 0.46} ry={7} tone="sky" opacity={0.6} blur={6} />
        <rect x={R(SCR_X + 2)} y={R(SCR_Y + SCR.h)} width={R(SCR.w - 4)} height="5" rx="1" fill="#B9B9B9" />
        <g clipPath={`url(#${ID}-ui-clip)`}>
          <g transform={`translate(${R(SCR_X)} ${R(SCR_Y)}) scale(${UI_SX} ${UI_SY})`}>
            <ScreenAppG idp={`${ID}-app`} />
          </g>
        </g>
        <rect x={R(SCR_X)} y={R(SCR_Y)} width={R(SCR.w)} height={R(SCR.h)} rx="3" fill="none" stroke="#90C0F3" strokeWidth="1" />
        <path d={glass} fill={`url(#${ID}-glass)`} opacity="0.35" />
      </LayerG>

      {/* The vertical axis and its stops */}
      <AxisG points={stops.map((s) => [880, R(s.y)])} />
      {stops.map((s, i) => (
        <CalloutG key={s.label} x={880} y={R(s.y)} tx={918} ty={R(s.y)} label={s.label} className="slide-up" style={{ '--i': i + 4 }} />
      ))}
    </Art>
  );
}
