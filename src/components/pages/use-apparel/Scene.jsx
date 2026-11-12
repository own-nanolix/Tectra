// Collection scene: front elevation of a rail. Five garments hang on cords of different lengths, so they sit
// at different heights; the print layer is lifted off two of them along the x axis.
import Art from '@/components/art/Art';
import { BackdropG, ShadowG, MaterialDefs, LayerG, AxisG } from '@/components/art/Mockup';
import { shirt } from './Shirts';
import { hoodie } from './Hoodies';
import { CW, PrintFilm, BLUE, WHITE, INK, YELLOW } from './parts';

const M = 'use-apparel-scene';
const S = 0.9;
const RAIL_Y = 112;

// cord: length of the hanging cord (the height difference); lift: print layer moves along x by this much.
const ITEMS = [
  { type: 'shirt', body: 'blue', tone: 'blue', cx: 400, cord: 76, print: { kind: 'stack', w: 112, cy: 82, fg: WHITE }, lift: -212 },
  { type: 'hoodie', body: 'yellow', tone: 'yellow', cx: 712, cord: 40, print: { kind: 'pattern', w: 128, cy: 120, fg: WHITE } },
  { type: 'shirt', body: 'white', tone: 'sky', cx: 1000, cord: 118, print: { kind: 'mark', w: 58, cy: 74, fg: BLUE }, hero: true },
  { type: 'hoodie', body: 'ink', tone: 'sky', cx: 1290, cord: 62, print: { kind: 'stack', w: 112, cy: 122, fg: WHITE, mk: YELLOW } },
  { type: 'shirt', body: 'sky', tone: 'blue', cx: 1582, cord: 92, print: { kind: 'lockup', w: 130, cy: 80, fg: INK, mk: BLUE }, lift: 196 },
];

const HOOK = { shirt: -34, hoodie: -150 };

function Hanger({ type }) {
  const top = HOOK[type];
  return (
    <g>
      <path d={`M150 ${top + 8}V${type === 'shirt' ? -8 : -118}`} stroke="#BDBDBD" strokeWidth="3" fill="none" />
      <circle cx="150" cy={top + 4} r="5" fill="none" stroke="#9A9A9A" strokeWidth="2" />
      {type === 'shirt' && (
        <g fill="none" strokeLinecap="round">
          <path d="M150 -8L36 42" stroke="#000000" strokeOpacity="0.1" strokeWidth="5" transform="translate(2 3)" />
          <path d="M150 -8L264 42" stroke="#000000" strokeOpacity="0.1" strokeWidth="5" transform="translate(2 3)" />
          <path d="M150 -8L36 42M150 -8L264 42" stroke="#C9C9C9" strokeWidth="4" />
          <path d="M150 -9L40 39" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.8" />
        </g>
      )}
    </g>
  );
}

function Garment({ it, i }) {
  const uid = `${M}-g${i}`;
  const yTop = RAIL_Y + 6 + it.cord - HOOK[it.type] * S;
  const x0 = it.cx - 150 * S;
  const chestY = yTop + it.print.cy * S;
  const body =
    it.type === 'shirt'
      ? shirt({ body: it.body, print: it.lift ? null : it.print, guide: it.lift ? it.print : null, uid, m: M, tone: it.tone })
      : hoodie({ body: it.body, print: it.lift ? null : it.print, uid, m: M, tone: it.tone });
  return (
    <g>
      <path d={`M${it.cx} ${RAIL_Y + 6}V${yTop + HOOK[it.type] * S}`} stroke="#9A9A9A" strokeWidth="1.4" />
      <g transform={`translate(${x0} ${yTop}) scale(${S})`}>
        <Hanger type={it.type} />
        <g transform={`rotate(${i % 2 ? 0.8 : -0.8} 150 20)`}>{it.hero ? <g className="mock-lit">{body}</g> : body}</g>
      </g>
      {it.lift && (
        <g>
          <AxisG points={[[it.cx + (it.lift > 0 ? 30 : -30), chestY], [it.cx + it.lift, chestY]]} />
          <LayerG i={2} dx={it.lift}>
            <g transform={`translate(${it.cx} ${chestY}) scale(${S * 1.05})`}>
              <PrintFilm print={it.print} uid={`${uid}-film`} m={M} tone={it.tone} backing={CW[it.body].fill} />
            </g>
          </LayerG>
        </g>
      )}
    </g>
  );
}

export default function Scene() {
  return (
    <Art viewBox="0 0 1960 700" title="Collection on a rail" exportName="use-apparel-collection">
      <MaterialDefs idp={M} />
      <BackdropG w="1960" h="700" />
      <ShadowG idp={`${M}-floor`} cx="980" cy="672" rx="900" ry="20" tone="blue" opacity="0.28" blur="12" />
      {/* uprights and feet */}
      {[40, 1920].map((x) => (
        <g key={x}>
          <rect x={x - 6} y={RAIL_Y - 6} width="12" height={672 - RAIL_Y + 6} fill={`url(#${M}-metal)`} />
          <rect x={x - 38} y="664" width="76" height="9" rx="4" fill={`url(#${M}-metal-dark)`} />
          <rect x={x - 6} y={RAIL_Y - 6} width="12" height={672 - RAIL_Y} fill={`url(#${M}-shade)`} />
        </g>
      ))}
      {/* the rail */}
      <rect x="34" y={RAIL_Y - 5} width="1892" height="12" rx="6" fill={`url(#${M}-metal)`} />
      <rect x="34" y={RAIL_Y - 5} width="1892" height="12" rx="6" fill={`url(#${M}-shade-v)`} />
      <rect x="40" y={RAIL_Y - 3} width="1880" height="2" rx="1" fill="#FFFFFF" opacity="0.7" />
      {ITEMS.map((it, i) => (
        <ShadowG key={`fs${i}`} idp={`${M}-fs${i}`} cx={it.cx + 24} cy={668} rx={it.type === 'hoodie' ? 150 : 120} ry={11} tone={it.tone} opacity={0.32} blur={8} />
      ))}
      {ITEMS.map((it, i) => (
        <Garment key={i} it={it} i={i} />
      ))}
    </Art>
  );
}
