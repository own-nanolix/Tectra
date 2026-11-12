import Art from '@/components/art/Art';
import { LockupG, MarkG, WordmarkG } from '@/components/art/Mark';
import { BackdropG, ShadowG, MaterialDefs, LayerG, AxisG, CalloutG } from '@/components/art/Mockup';
import { IconUse } from '@/components/site/Icon';
import { NAV } from '@/lib/brand';
import { Ground, BlueDefs, Bolt } from './parts';

const P = 'use-world-rc';
const G = 720; // floor line of this plate
const LIFT = [48, -40]; // the depth diagonal: up and to the right
const WAY = { x: 830, y: 110, w: 290, h: 470 };
const PLQ = { x: 1170, y: 390, w: 120, h: 92 };
const ROWS = [
  ['home', 'arrow-left'],
  ['chart', 'arrow-up'],
  ['calendar', 'arrow-right'],
  ['crane', 'arrow-up-right'],
];

// Stacked copies give the letters their depth; the deepest copy is drawn first.
function Depth({ n = 9, children }) {
  return Array.from({ length: n }, (_, k) => (
    <g key={k} transform={`translate(${-(n - k) * 0.9} ${(n - k) * 0.9})`}>
      {children}
    </g>
  ));
}

function Letters() {
  return (
    <g>
      <Depth>
        <WordmarkG x={330} y={285} size={150} fill="#0F5BC4" stroke="#0F5BC4" strokeWidth="2" />
      </Depth>
      <WordmarkG x={330} y={285} size={150} fill={`url(#${P}-face)`} stroke={`url(#${P}-face)`} strokeWidth="2" />
      <WordmarkG x={329.4} y={284.4} size={150} fill="none" stroke="#FFFFFF" strokeWidth="0.9" opacity="0.55" />
    </g>
  );
}

function MarkSign() {
  return (
    <g>
      <Depth n={12}>
        <MarkG x={110} y={150} size={160} fill="#0F5BC4" />
      </Depth>
      <MarkG x={110} y={150} size={160} fill={`url(#${P}-face)`} />
      <MarkG x={109.4} y={149.4} size={160} fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
    </g>
  );
}

function WayBack() {
  const { x, y, w, h } = WAY;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="4" fill={`url(#${P}-metal)`} />
      <rect x={x} y={y} width={w} height={h} rx="4" fill={`url(#${P}-shade)`} />
      <path d={`M${x + 2} ${y + 2}H${x + w - 2}`} stroke="#FFFFFF" strokeWidth="2" />
      {[[16, 16], [w - 16, 16], [16, h - 16], [w - 16, h - 16]].map(([dx, dy]) => (
        <g key={`${dx}-${dy}`}>
          <path d={`M${x + dx} ${y + dy}l${LIFT[0] * 0.7} ${LIFT[1] * 0.7}`} stroke="#8A8A8A" strokeWidth="8" strokeLinecap="round" />
          <path d={`M${x + dx} ${y + dy}l${LIFT[0] * 0.7} ${LIFT[1] * 0.7}`} stroke="#E4E4E4" strokeWidth="3" strokeLinecap="round" transform="translate(-1 -1)" />
          <Bolt x={x + dx} y={y + dy} r={5} />
        </g>
      ))}
    </g>
  );
}

function WayFace() {
  const { x, y, w, h } = WAY;
  return (
    <g>
      <clipPath id={`${P}-way`}>
        <rect x={x} y={y} width={w} height={h} rx="4" />
      </clipPath>
      <rect x={x + w} y={y + 4} width="5" height={h} fill="#C4C4C4" />
      <rect x={x + 4} y={y + h} width={w} height="5" fill="#B4B4B4" />
      <g clipPath={`url(#${P}-way)`}>
        <rect x={x} y={y} width={w} height={h} fill={`url(#${P}-card)`} filter={`url(#${P}-paper)`} />
        <rect x={x} y={y} width={w} height="84" fill={`url(#${P}-field)`} />
        <LockupG x={x + 24} y={y + 22} size={40} fill="#FFFFFF" />
        {NAV.map((label, i) => {
          const ry = y + 100 + i * 88;
          return (
            <g key={label}>
              {i > 0 && <path d={`M${x + 20} ${ry}H${x + w - 20}`} stroke="#E2E2E2" strokeWidth="1" />}
              <rect x={x + 22} y={ry + 20} width="48" height="48" rx="5" fill="#F0F0F0" />
              <IconUse name={ROWS[i][0]} x={x + 32} y={ry + 30} size={28} color="#145CB8" />
              <text x={x + 86} y={ry + 52} fontSize="23" fontWeight="400" fill="#2F2F2F">
                {label}
              </text>
              <IconUse name={ROWS[i][1]} x={x + w - 58} y={ry + 30} size={28} color="#2F2F2F" />
            </g>
          );
        })}
        <rect x={x} y={y + h - 14} width={w} height="14" fill="#FFB83D" />
        <rect x={x} y={y} width={w} height={h} fill={`url(#${P}-glass)`} opacity="0.5" />
      </g>
    </g>
  );
}

function PlaqueBack() {
  const { x, y, w, h } = PLQ;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="3" fill={`url(#${P}-metal-dark)`} />
      <rect x={x} y={y} width={w} height={h} rx="3" fill={`url(#${P}-shade)`} />
      <path d={`M${x + 2} ${y + 1.5}H${x + w - 2}`} stroke="#FFFFFF" strokeWidth="1.4" opacity="0.7" />
      {[[10, 10], [w - 10, 10], [10, h - 10], [w - 10, h - 10]].map(([dx, dy]) => (
        <path key={`${dx}-${dy}`} d={`M${x + dx} ${y + dy}l${LIFT[0] * 0.45} ${LIFT[1] * 0.45}`} stroke="#8A8A8A" strokeWidth="5" strokeLinecap="round" />
      ))}
    </g>
  );
}

function PlaqueFace() {
  const { x, y, w, h } = PLQ;
  return (
    <g>
      <rect x={x + w} y={y + 3} width="4" height={h} fill="#C4C4C4" />
      <rect x={x + 3} y={y + h} width={w} height="4" fill="#B4B4B4" />
      <rect x={x} y={y} width={w} height={h} rx="3" fill={`url(#${P}-card)`} filter={`url(#${P}-paper)`} />
      <rect x={x} y={y} width="6" height={h} rx="3" fill="#4093EC" />
      <MarkG x={x + 18} y={y + 14} size={28} fill="#4093EC" />
      <text x={x + 18} y={y + 68} fontSize="19" fontWeight="400" fill="#2F2F2F">
        {NAV[3]}
      </text>
      <rect x={x} y={y} width={w} height={h} rx="3" fill={`url(#${P}-glass)`} opacity="0.45" />
      {[[w - 9, 9], [w - 9, h - 9]].map(([dx, dy]) => (
        <Bolt key={dy} x={x + dx} y={y + dy} r={3} />
      ))}
    </g>
  );
}

function Door() {
  const x = 1350, y = 190, w = 220;
  return (
    <g>
      <rect x={x - 14} y={y - 14} width={w + 28} height={G - y + 14} fill={`url(#${P}-metal)`} />
      <rect x={x} y={y} width={w} height={G - y} fill="#EDEDED" />
      <rect x={x} y={y} width={w} height={G - y} fill={`url(#${P}-shade)`} />
      <rect x={x + 156} y={y + 90} width="34" height="250" rx="4" fill="#90C0F3" opacity="0.55" />
      <rect x={x + 156} y={y + 90} width="34" height="250" rx="4" fill={`url(#${P}-glass)`} />
      <path d={`M${x + 16} ${y + 16}H${x + w - 16}V${G - y - 40}H${x + 16}Z`} fill="none" stroke="#CFCFCF" strokeWidth="1.2" />
      <rect x={x + 18} y={y + 270} width="46" height="9" rx="4.5" fill={`url(#${P}-metal-dark)`} />
      <circle cx={x + 24} cy={y + 274} r="12" fill={`url(#${P}-metal)`} stroke="#8A8A8A" strokeWidth="1" />
      <rect x={x} y={G - 12} width={w} height="12" fill="#DDDDDD" />
      <path d={`M${x - 14} ${y - 14}H${x + w + 14}`} stroke="#FFFFFF" strokeWidth="2" />
    </g>
  );
}

export default function Reception() {
  return (
    <Art viewBox="0 0 1600 900" title="Reception signage, exploded: letters, wayfinding panel and room plaque" exportName="use-world-reception">
      <MaterialDefs idp={P} />
      <BlueDefs idp={P} />
      <defs>
        <linearGradient id={`${P}-face`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6DB0F8" />
          <stop offset="0.5" stopColor="#4093EC" />
          <stop offset="1" stopColor="#2F7FDC" />
        </linearGradient>
        <filter id={`${P}-blur`} x="-10%" y="-20%" width="120%" height="140%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      <BackdropG w={1600} h={900} />
      <Ground y={G} />
      <rect x="0" y={G - 14} width="1600" height="14" fill="#F5F5F5" />
      <ShadowG idp={`${P}-s1`} cx={1460} cy={G + 4} rx={180} ry={12} tone="sky" opacity={0.32} />
      <ShadowG idp={`${P}-s2`} cx={420} cy={G + 4} rx={300} ry={12} tone="blue" opacity={0.2} />
      <Door />
      {/* soft shadows thrown onto the wall, lower right of each piece */}
      <g filter={`url(#${P}-blur)`} opacity="0.22" fill="#4093EC">
        <g transform="translate(16 20)">
          <WordmarkG x={330} y={285} size={150} fill="#4093EC" stroke="#4093EC" strokeWidth="2" />
          <MarkG x={110} y={150} size={160} fill="#4093EC" />
        </g>
        <rect x={WAY.x + 12} y={WAY.y + 14} width={WAY.w} height={WAY.h} rx="4" />
        <rect x={PLQ.x + 8} y={PLQ.y + 9} width={PLQ.w} height={PLQ.h} rx="3" />
      </g>
      <AxisG points={[[560, 380], [560 + LIFT[0], 380 + LIFT[1]], [560 + LIFT[0] * 2, 380 + LIFT[1] * 2]]} />
      <CalloutG x={560} y={380} tx={560} ty={416} label="Wall" />
      <CalloutG x={560 + LIFT[0]} y={380 + LIFT[1]} tx={560 + LIFT[0]} ty={376} label="Letters" />
      <CalloutG x={560 + LIFT[0] * 2} y={380 + LIFT[1] * 2} tx={560 + LIFT[0] * 2} ty={336} label="Mark" />
      <LayerG i={0} dx={LIFT[0]} dy={LIFT[1]}>
        <Letters />
      </LayerG>
      <LayerG i={1} dx={LIFT[0] * 2} dy={LIFT[1] * 2}>
        <MarkSign />
      </LayerG>
      <LayerG i={2}>
        <WayBack />
      </LayerG>
      <LayerG i={3} dx={30} dy={-28}>
        <WayFace />
      </LayerG>
      <LayerG i={2}>
        <PlaqueBack />
      </LayerG>
      <LayerG i={3} dx={22} dy={-20}>
        <PlaqueFace />
      </LayerG>
    </Art>
  );
}
