import Art from '@/components/art/Art';
import { PhoneG, ScreenHomeG } from '@/components/art/Devices';
import { AxisG, BackdropG, LayerG, MaterialDefs, SheenG, ShadowG } from '@/components/art/Mockup';
import { AppCardG, WorkCardCardG, OverallCardG } from './parts';

// Scene 1: the phone in front elevation, five data cards pulled out along the x axis to the left and right, each at
// its own depth (scale, haze, and where its shadow meets the floor). One light from the upper left; blue shadows.
const ID = 'showcase-s1';
const GROUND = 772;
const PH = { x: 650, y: 152, w: 300 };
const PHONE_BODY = 'M66 0H364a66 66 0 0 1 66 66V818a66 66 0 0 1-66 66H66A66 66 0 0 1 0 818V66A66 66 0 0 1 66 0Z';
const PHONE_GLASS = 'M68 20H362a48 48 0 0 1 48 48V816a48 48 0 0 1-48 48H68a48 48 0 0 1-48-48V68a48 48 0 0 1 48-48Z';

// cx: final centre on the x axis; y: top; s: scale; depth: 0 near .. 1 far
const CARDS = [
  { key: 'material', label: 'Material', cx: 205, y: 468, s: 0.8, depth: 0.9, draw: (id) => <AppCardG idp={id} k="material" /> },
  { key: 'details', label: 'Details', cx: 468, y: 196, s: 1.04, depth: 0.1, draw: (id) => <AppCardG idp={id} k="details" /> },
  { key: 'notes', label: 'Notes', cx: 1112, y: 452, s: 1.0, depth: 0.2, draw: (id) => <AppCardG idp={id} k="notes" /> },
  { key: 'workcard', label: 'Work card', cx: 1196, y: 140, s: 1.1, depth: 0.05, draw: (id) => <WorkCardCardG idp={id} /> },
  { key: 'overall', label: 'Overall Completion', cx: 1462, y: 372, s: 0.84, depth: 0.75, draw: (id) => <OverallCardG idp={id} /> },
];

export default function ScenePhone() {
  const axisPts = [[CARDS[0].cx, 852], [CARDS[1].cx, 852], [800, 852], [CARDS[2].cx, 852], [CARDS[3].cx, 852], [CARDS[4].cx, 852]];
  return (
    <Art viewBox="0 0 1600 900" title="Phone with data cards, exploded along the horizontal axis" exportName="showcase-phone-cards">
      <BackdropG w={1600} h={900} />
      <MaterialDefs idp={ID} />
      <defs>
        <filter id={`${ID}-drop`} x="-30%" y="-30%" width="160%" height="170%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <linearGradient id={`${ID}-body`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EFE9D6" />
          <stop offset="0.5" stopColor="#CFC8B4" />
          <stop offset="1" stopColor="#A9A28D" />
        </linearGradient>
        <linearGradient id={`${ID}-edge`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="0.4" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* The x axis: a dashed guide with a tick under every stop */}
      <AxisG points={axisPts} />
      {CARDS.map((c) => (
        <text key={c.key} x={c.cx} y="880" fontSize="12" fill="#5E5E5E" textAnchor="middle">{c.label}</text>
      ))}
      <text x="800" y="880" fontSize="12" fill="#5E5E5E" textAnchor="middle">Tectra</text>

      <ShadowG idp={`${ID}-ph`} cx={822} cy={GROUND} rx={215} ry={28} tone="blue" opacity={0.36} blur={13} />

      {/* Cards: drawn at the phone, pulled out along x on load */}
      {CARDS.map((c, i) => {
        const w = 270 * c.s;
        const dx = c.cx - 800;
        const sh = GROUND - 26 + (1 - c.depth) * 40;
        return (
          <LayerG key={c.key} i={i} dx={dx} dy={0}>
            <ShadowG idp={`${ID}-sh-${c.key}`} cx={800 + 12} cy={sh} rx={w * 0.46} ry={9 + (1 - c.depth) * 5} tone="blue" opacity={0.14 + (1 - c.depth) * 0.14} blur={9} />
            <g transform={`translate(${800 - w / 2} ${c.y}) scale(${c.s})`}>
              <rect width="270" height="190" rx="4" fill="#4093EC" opacity={0.2 + (1 - c.depth) * 0.12} filter={`url(#${ID}-drop)`} transform="translate(16 22)" />
              {c.draw(`${ID}-${c.key}`)}
              <rect width="270" height="190" rx="4" fill={`url(#${ID}-shade)`} opacity="0.6" />
              <path d="M0 186V4A4 4 0 0 1 4 0H266" fill="none" stroke="#FFFFFF" strokeOpacity="0.85" strokeWidth="1.5" />
              <rect width="270" height="190" rx="4" fill="#FFFFFF" opacity={c.depth * 0.22} />
            </g>
          </LayerG>
        );
      })}

      {/* The phone: turns to the light */}
      <g className="mock-lit">
        <PhoneG idp={`${ID}-phone`} x={PH.x} y={PH.y} w={PH.w}>
          <ScreenHomeG idp={`${ID}-home`} />
        </PhoneG>
        <g transform={`translate(${PH.x} ${PH.y}) scale(${PH.w / 430})`}>
          <path d={PHONE_BODY} fill={`url(#${ID}-shade)`} />
          <path d={PHONE_BODY} fill="none" stroke={`url(#${ID}-edge)`} strokeWidth="3" />
          <SheenG idp={ID} d={PHONE_GLASS} opacity={0.5} />
        </g>
      </g>
    </Art>
  );
}
