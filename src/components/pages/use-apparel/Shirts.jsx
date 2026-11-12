// T-shirts: flat lay, top view. shirt() draws one garment in a 300 x 340 box; the exploded mockup lifts the
// print layer straight up (y axis) above it. Front and back are separate views of the same function.
import Art from '@/components/art/Art';
import { BackdropG, ShadowG, MaterialDefs, LayerG, AxisG } from '@/components/art/Mockup';
import { CW, Print, Folds, CastShadow, PrintFilm, Guide, printH, BLUE, WHITE, INK } from './parts';

export const SHIRT_FRONT = 'M108 14 L48 36 L4 96 L52 126 L68 104 L68 330 Q150 340 232 330 L232 104 L248 126 L296 96 L252 36 L192 14 Q150 46 108 14Z';
export const SHIRT_BACK = 'M108 14 L48 36 L4 96 L52 126 L68 104 L68 330 Q150 340 232 330 L232 104 L248 126 L296 96 L252 36 L192 14 Q150 26 108 14Z';

const FRONT_FOLDS = [
  { k: 'l', d: 'M60 44 L112 22 L108 70 Q84 80 62 100Z', o: 0.3 },
  { k: 'l', d: 'M80 118 Q116 104 146 124 Q122 160 88 178Z', o: 0.2 },
  { k: 'd', d: 'M232 104 Q204 140 212 206 Q228 150 232 104Z', o: 0.18 },
  { k: 'd', d: 'M252 36 L296 96 L248 126 L232 104 Q236 60 252 36Z', o: 0.16 },
  { k: 'd', d: 'M150 46 Q176 54 192 14 L196 40 Q170 66 150 62Z', o: 0.1 },
  { k: 'd', line: true, d: 'M96 236 Q130 226 156 244', w: 6, o: 0.12 },
  { k: 'd', line: true, d: 'M206 252 Q186 274 196 318', w: 7, o: 0.12 },
  { k: 'l', line: true, d: 'M118 262 Q108 288 120 320', w: 9, o: 0.2 },
  { k: 'd', line: true, d: 'M92 160 Q84 200 90 250', w: 5, o: 0.08 },
];
const BACK_FOLDS = [
  { k: 'l', d: 'M60 44 L112 22 L108 66 Q84 80 62 100Z', o: 0.3 },
  { k: 'l', d: 'M82 110 Q120 98 150 112 Q124 160 90 186Z', o: 0.18 },
  { k: 'd', d: 'M232 104 Q206 150 214 214 Q228 156 232 104Z', o: 0.18 },
  { k: 'd', d: 'M252 36 L296 96 L248 126 L232 104 Q236 60 252 36Z', o: 0.16 },
  { k: 'd', line: true, d: 'M100 246 Q136 236 160 254', w: 6, o: 0.12 },
  { k: 'd', line: true, d: 'M200 262 Q184 286 194 320', w: 7, o: 0.12 },
  { k: 'l', line: true, d: 'M116 268 Q106 292 118 322', w: 9, o: 0.2 },
];

// One shirt. body: colourway key; print: { kind, w, cy, fg, mk, tone } or null; guide: show the placement
// outline for a print that is lifted off. uid is unique per garment, m is the MaterialDefs prefix of the SVG.
export function shirt({ body, print, view = 'front', uid, m, guide, tone = 'blue', shadow = true }) {
  const c = CW[body];
  const back = view === 'back';
  const d = back ? SHIRT_BACK : SHIRT_FRONT;
  const neck = back ? 'M108 14 Q150 26 192 14' : 'M108 14 Q150 46 192 14';
  const cid = `${uid}-body`;
  const seam = { stroke: c.sc, strokeOpacity: c.so, fill: 'none' };
  return (
    <g>
      <defs>
        <clipPath id={cid}>
          <path d={d} />
        </clipPath>
      </defs>
      {shadow && <CastShadow d={d} m={m} tone={tone} />}
      {!back && (
        <g>
          <path d="M108 14 Q150 0 192 14 Q150 46 108 14Z" fill={c.fill} filter={`url(#${m}-fabric)`} />
          <path d="M108 14 Q150 0 192 14 Q150 46 108 14Z" fill="#000000" opacity={c.lining} />
          <path d="M108 14 Q150 0 192 14" fill="none" stroke={c.sc} strokeOpacity={c.so} strokeWidth="5" />
        </g>
      )}
      <path d={d} fill={c.fill} filter={`url(#${m}-fabric)`} />
      <g clipPath={`url(#${cid})`}>
        {print && <Print kind={print.kind} w={print.w} fg={print.fg} mk={print.mk} tone={print.tone} id={uid} transform={`translate(150 ${print.cy})`} filter={`url(#${m}-fabric)`} />}
        <rect width="300" height="340" fill={`url(#${m}-shade)`} />
        <rect width="300" height="340" fill={`url(#${m}-shade-v)`} />
        <Folds m={m} list={back ? BACK_FOLDS : FRONT_FOLDS} />
        {/* sleeve undersides: left is lit, right is in shade */}
        <path d="M4 96 L52 126 L68 104 L48 36Z" fill="#000000" opacity="0.05" />
        {/* collar rib */}
        <path d={neck} transform="translate(0 5)" stroke={c.fill} strokeWidth="10" fill="none" filter={`url(#${m}-fabric)`} />
        <path d={neck} transform="translate(0 5)" stroke="#000000" strokeOpacity="0.1" strokeWidth="10" fill="none" />
        <path d={neck} transform="translate(0 10)" {...seam} strokeWidth="1" />
        <path d={neck} transform="translate(0 6)" {...seam} strokeWidth="0.8" strokeDasharray="2 3" />
        {/* shoulder, armhole, side seams */}
        <path d="M48 36 Q76 64 68 104" {...seam} strokeWidth="1.4" />
        <path d="M252 36 Q224 64 232 104" {...seam} strokeWidth="1.4" />
        <path d="M51 41 Q78 66 71 104" {...seam} strokeWidth="0.8" strokeDasharray="2 3" />
        <path d="M249 41 Q222 66 229 104" {...seam} strokeWidth="0.8" strokeDasharray="2 3" />
        <path d="M68 104 L68 330" {...seam} strokeWidth="0.8" strokeOpacity={c.so * 0.6} />
        <path d="M232 104 L232 330" {...seam} strokeWidth="0.8" strokeOpacity={c.so * 0.6} />
        {back && <path d="M52 56 Q150 84 248 56" {...seam} strokeWidth="1.2" />}
        {/* cuffs and hem */}
        <path d="M11 86 L59 116" {...seam} strokeWidth="1.2" />
        <path d="M289 86 L241 116" {...seam} strokeWidth="1.2" />
        <path d="M17 97 L55 120" {...seam} strokeWidth="0.8" strokeDasharray="2 3" />
        <path d="M283 97 L245 120" {...seam} strokeWidth="0.8" strokeDasharray="2 3" />
        <path d="M68 312 Q150 322 232 312" {...seam} strokeWidth="1.2" />
        <path d="M68 317 Q150 327 232 317" {...seam} strokeWidth="0.8" strokeDasharray="2 3" />
        {guide && !print && <Guide print={guide} cx={150} cy={guide.cy} />}
      </g>
      <path d={d} fill="none" stroke="#000000" strokeOpacity="0.16" strokeWidth="1" />
    </g>
  );
}

// Three shirt designs. Artwork comes from the shared catalogue; nothing else is printed.
export const SHIRTS = [
  {
    id: 'blue',
    name: 'T-shirt, blue',
    body: 'blue',
    tone: 'blue',
    front: { kind: 'stack', w: 112, cy: 82, fg: WHITE },
    back: { kind: 'mark', w: 96, cy: 96, fg: WHITE },
  },
  {
    id: 'white',
    name: 'T-shirt, white',
    body: 'white',
    tone: 'sky',
    front: { kind: 'mark', w: 58, cy: 74, fg: BLUE },
    back: { kind: 'hero', w: 180, cy: 104, fg: INK },
  },
  {
    id: 'ink',
    name: 'T-shirt, ink',
    body: 'ink',
    tone: 'yellow',
    front: { kind: 'word', w: 130, cy: 78, fg: WHITE },
    back: { kind: 'iso', w: 170, cy: 120, tone: 'ghost', fg: WHITE },
  },
];

// One exploded view: shirt at the bottom, its print layer lifted straight up above it.
export function ShirtView({ item, view }) {
  const p = item[view];
  const idp = `use-apparel-shirt-${item.id}-${view}`;
  const title = `${item.name} ${view}`;
  // lift far enough that the film clears the collar (taller prints go higher)
  const lift = Math.min(-170, Math.round(-12 - p.cy - (printH(p.kind, p.w) + 28) / 2));
  return (
    <Art viewBox="0 0 400 560" title={title} exportName={`use-apparel-shirt-${item.id}-${view}`}>
      <MaterialDefs idp={idp} />
      <BackdropG w="400" h="560" />
      <ShadowG idp={`${idp}-sh`} cx="200" cy="528" rx="150" ry="16" tone={item.tone} opacity="0.3" blur="9" />
      <AxisG points={[[200, 186], [200, 24]]} />
      <LayerG i={0}>
        <g transform="translate(50 190)">
          <g className="mock-lit">{shirt({ body: item.body, print: null, guide: p, view, uid: idp, m: idp, tone: item.tone })}</g>
        </g>
      </LayerG>
      <LayerG i={1} dy={lift}>
        <g transform={`translate(200 ${190 + p.cy})`}>
          <PrintFilm print={p} uid={`${idp}-film`} m={idp} tone={item.tone} backing={CW[item.body].fill} />
        </g>
      </LayerG>
    </Art>
  );
}
