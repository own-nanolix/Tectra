// Hoodies: flat lay, top view. Hood, body and print are separate layers staggered left to right and spread
// along the vertical axis. hood(), hoodieBody() and cords() are the garment parts; hoodie() assembles them.
import Art from '@/components/art/Art';
import { BackdropG, ShadowG, MaterialDefs, LayerG, AxisG } from '@/components/art/Mockup';
import { CW, Print, Folds, CastShadow, PrintFilm, Guide, BLUE, WHITE, INK, YELLOW } from './parts';

export const HOODIE_BODY =
  'M110 10 L50 30 Q24 70 16 160 L8 296 L62 304 L78 182 L80 322 Q150 334 220 322 L222 182 L238 304 L292 296 L284 160 Q276 70 250 30 L190 10 Q150 34 110 10Z';
export const HOOD_OUTER = 'M2 128 C-6 50 34 2 86 2 C138 2 178 50 168 128 Q86 156 2 128Z';
const HOOD_OPEN = 'M30 126 C24 66 52 26 86 26 C120 26 148 66 142 126 Q86 144 30 126Z';

const BODY_FOLDS = [
  { k: 'l', d: 'M54 34 L110 14 L104 80 Q76 96 52 130Z', o: 0.3 },
  { k: 'l', d: 'M92 100 Q128 92 150 108 Q124 150 96 168Z', o: 0.18 },
  { k: 'd', d: 'M250 30 Q276 70 284 160 L292 296 L238 304 L222 182 Q226 100 250 30Z', o: 0.17 },
  { k: 'd', line: true, d: 'M104 186 Q150 176 196 188', w: 7, o: 0.1 },
  { k: 'l', line: true, d: 'M30 150 Q22 220 20 280', w: 9, o: 0.2 },
  { k: 'd', line: true, d: 'M62 200 Q56 240 70 280', w: 6, o: 0.12 },
  { k: 'd', line: true, d: 'M246 206 Q258 244 250 284', w: 7, o: 0.12 },
  { k: 'l', line: true, d: 'M96 288 Q90 306 100 318', w: 8, o: 0.16 },
];
const HOOD_FOLDS = [
  { k: 'l', d: 'M6 112 C0 56 30 8 80 6 C50 30 36 70 34 118Z', o: 0.34 },
  { k: 'd', d: 'M168 128 C178 50 138 2 92 4 C146 30 150 84 142 130Z', o: 0.18 },
  { k: 'd', line: true, d: 'M60 140 Q90 150 120 140', w: 8, o: 0.12 },
];

const rib = (a, b, c, d, n) =>
  Array.from({ length: n - 1 }, (_, i) => {
    const t = (i + 1) / n;
    const x1 = a[0] + (b[0] - a[0]) * t, y1 = a[1] + (b[1] - a[1]) * t;
    const x2 = d[0] + (c[0] - d[0]) * t, y2 = d[1] + (c[1] - d[1]) * t;
    return `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`;
  }).join('');

export function hoodieBody({ body, print, uid, m, tone = 'blue', guide, lining = false }) {
  const c = CW[body];
  const cid = `${uid}-body`;
  const seam = { stroke: c.sc, strokeOpacity: c.so, fill: 'none' };
  const cuffL = [[9.5, 274], [65, 282], [62, 304], [8, 296]];
  const cuffR = [[290.5, 274], [235, 282], [238, 304], [292, 296]];
  const cuffD = (q) => `M${q[0].join(' ')}L${q[1].join(' ')}L${q[2].join(' ')}L${q[3].join(' ')}Z`;
  return (
    <g>
      <defs>
        <clipPath id={cid}>
          <path d={HOODIE_BODY} />
        </clipPath>
      </defs>
      <CastShadow d={HOODIE_BODY} m={m} tone={tone} dx={10} dy={16} />
      {lining && (
        <g>
          <path d="M110 10 Q150 -8 190 10 Q150 34 110 10Z" fill={c.fill} filter={`url(#${m}-fabric)`} />
          <path d="M110 10 Q150 -8 190 10 Q150 34 110 10Z" fill="#000000" opacity={c.lining} />
        </g>
      )}
      <path d={HOODIE_BODY} fill={c.fill} filter={`url(#${m}-fabric)`} />
      <g clipPath={`url(#${cid})`}>
        {print && <Print kind={print.kind} w={print.w} fg={print.fg} mk={print.mk} tone={print.tone} id={uid} transform={`translate(150 ${print.cy})`} filter={`url(#${m}-fabric)`} />}
        <rect width="300" height="340" fill={`url(#${m}-shade)`} />
        <rect width="300" height="340" fill={`url(#${m}-shade-v)`} />
        <Folds m={m} list={BODY_FOLDS} />
        {/* ribbed cuffs and hem */}
        {[cuffL, cuffR].map((q, i) => (
          <g key={i}>
            <path d={cuffD(q)} fill={c.fill} filter={`url(#${m}-fabric)`} />
            <path d={cuffD(q)} fill="#000000" opacity={i ? 0.14 : 0.04} />
            <path d={rib(q[0], q[1], q[2], q[3], 9)} {...seam} strokeWidth="1" />
            <path d={`M${q[0].join(' ')}L${q[1].join(' ')}`} {...seam} strokeWidth="1.2" />
          </g>
        ))}
        <path d="M80 302 L220 302 L220 322 Q150 334 80 322Z" fill={c.fill} filter={`url(#${m}-fabric)`} />
        <path d="M80 302 L220 302 L220 322 Q150 334 80 322Z" fill="#000000" opacity="0.06" />
        <path d={Array.from({ length: 27 }, (_, i) => `M${(84 + i * 5.2).toFixed(1)} 302V${(325 + Math.sin(i / 26 * Math.PI) * 6).toFixed(1)}`).join('')} {...seam} strokeWidth="0.9" />
        <path d="M80 302 L220 302" {...seam} strokeWidth="1.2" />
        {/* neck, shoulder and armhole seams */}
        <path d="M110 10 Q150 34 190 10" transform="translate(0 6)" stroke={c.fill} strokeWidth="10" fill="none" filter={`url(#${m}-fabric)`} />
        <path d="M110 10 Q150 34 190 10" transform="translate(0 6)" stroke="#000000" strokeOpacity="0.1" strokeWidth="10" fill="none" />
        <path d="M110 10 Q150 34 190 10" transform="translate(0 11)" {...seam} strokeWidth="1" />
        <path d="M50 30 Q80 80 78 182" {...seam} strokeWidth="1.4" />
        <path d="M250 30 Q220 80 222 182" {...seam} strokeWidth="1.4" />
        <path d="M54 36 Q83 82 82 182" {...seam} strokeWidth="0.8" strokeDasharray="2 3" />
        <path d="M246 36 Q217 82 218 182" {...seam} strokeWidth="0.8" strokeDasharray="2 3" />
        {/* kangaroo pocket */}
        <path d="M98 204 L202 204 L220 290 Q150 298 80 290Z" fill={c.fill} filter={`url(#${m}-fabric)`} />
        <path d="M98 204 L202 204 L220 290 Q150 298 80 290Z" fill={`url(#${m}-shade)`} />
        <path d="M98 204 L202 204 L220 290 Q150 298 80 290Z" {...seam} strokeWidth="1.3" />
        <path d="M102 210 L198 210 L214 284 Q150 291 86 284Z" {...seam} strokeWidth="0.8" strokeDasharray="2 3" />
        <path d="M100 208 L86 262" stroke="#000000" strokeOpacity="0.32" strokeWidth="5" strokeLinecap="round" />
        <path d="M200 208 L214 262" stroke="#000000" strokeOpacity="0.32" strokeWidth="5" strokeLinecap="round" />
        <Folds m={m} list={[{ k: 'd', line: true, d: 'M110 262 Q150 276 190 262', w: 6, o: 0.12 }, { k: 'l', line: true, d: 'M104 222 Q112 250 106 276', w: 7, o: 0.2 }]} />
        {guide && !print && <Guide print={guide} cx={150} cy={guide.cy} />}
      </g>
      <path d={HOODIE_BODY} fill="none" stroke="#000000" strokeOpacity="0.16" strokeWidth="1" />
    </g>
  );
}

// The hood, 170 x 150. The opening shows the lining; the band around it is double stitched.
export function hood({ body, uid, m, tone = 'blue', withCords = true }) {
  const c = CW[body];
  const cid = `${uid}-hood`;
  const seam = { stroke: c.sc, strokeOpacity: c.so, fill: 'none' };
  return (
    <g>
      <defs>
        <clipPath id={cid}>
          <path d={HOOD_OUTER} />
        </clipPath>
      </defs>
      <CastShadow d={HOOD_OUTER} m={m} tone={tone} dx={8} dy={12} />
      <path d={HOOD_OUTER} fill={c.fill} filter={`url(#${m}-fabric)`} />
      <g clipPath={`url(#${cid})`}>
        <path d={HOOD_OPEN} fill={c.fill} filter={`url(#${m}-fabric)`} />
        <path d={HOOD_OPEN} fill="#000000" opacity={c.lining} />
        <path d="M30 126 C24 66 52 26 86 26 C120 26 148 66 142 126 Q86 144 30 126Z" fill="none" stroke="#000000" strokeOpacity="0.2" strokeWidth="8" transform="translate(0 0)" clipPath={`url(#${cid})`} />
        <path d="M34 120 C28 70 54 34 86 34 C112 34 130 52 138 80" fill="none" stroke="#000000" strokeOpacity="0.2" strokeWidth="10" filter={`url(#${m}-soft)`} />
        <rect width="170" height="150" fill={`url(#${m}-shade)`} />
        <Folds m={m} list={HOOD_FOLDS} />
        <path d={HOOD_OPEN} {...seam} strokeWidth="1.4" />
        <path d="M24 126 C18 62 48 18 86 18 C124 18 154 62 148 126" {...seam} strokeWidth="0.8" strokeDasharray="2 3" />
        <path d="M12 118 C6 56 40 10 86 10 C132 10 164 56 158 118" {...seam} strokeWidth="0.8" strokeDasharray="2 3" />
      </g>
      <path d={HOOD_OUTER} fill="none" stroke="#000000" strokeOpacity="0.16" strokeWidth="1" />
      {[40, 130].map((x) => (
        <g key={x}>
          <circle cx={x} cy="119" r="6" fill="#000000" opacity="0.28" />
          <circle cx={x} cy="119" r="5" fill={`url(#${m}-metal)`} />
          <circle cx={x} cy="119" r="2.6" fill="#2F2F2F" />
        </g>
      ))}
      {withCords && cords({ body, m })}
    </g>
  );
}

// Drawstrings: hang from the eyelets with plastic ends. Coordinates match the hood box.
export function cords({ body, m }) {
  const col = body === 'ink' ? '#E9E9E9' : body === 'white' || body === 'grey' ? '#90C0F3' : '#FFFFFF';
  const ds = ['M40 121 C32 160 52 190 42 230', 'M130 121 C140 160 120 192 132 230'];
  return (
    <g>
      {ds.map((d, i) => (
        <g key={d}>
          <path d={d} fill="none" stroke="#000000" strokeOpacity="0.2" strokeWidth="5" transform="translate(3 3)" />
          <path d={d} fill="none" stroke={col} strokeWidth="4" strokeLinecap="round" filter={`url(#${m}-fabric)`} />
          <path d={d} fill="none" stroke="#000000" strokeOpacity="0.1" strokeWidth="1.2" strokeDasharray="1 2" transform="translate(1 0)" />
          <rect x={i ? 128 : 38} y="226" width="8" height="18" rx="2.5" fill={`url(#${m}-plastic)`} stroke="#000000" strokeOpacity="0.25" transform={`rotate(${i ? 5 : -6} ${i ? 132 : 42} 230)`} />
        </g>
      ))}
    </g>
  );
}

// Assembled garment (front elevation or flat lay): hood behind, body, cords in front.
export function hoodie({ body, print, uid, m, tone = 'blue' }) {
  return (
    <g>
      <g transform="translate(65 -122)">{hood({ body, uid: `${uid}-h`, m, tone, withCords: false })}</g>
      {hoodieBody({ body, print, uid, m, tone })}
      <g transform="translate(65 -122)">{cords({ body, m })}</g>
    </g>
  );
}

export const HOODIES = [
  { id: 'sky', name: 'Hoodie, sky', body: 'sky', tone: 'blue', print: { kind: 'lockup', w: 152, cy: 118, fg: INK, mk: BLUE } },
  { id: 'yellow', name: 'Hoodie, yellow', body: 'yellow', tone: 'yellow', print: { kind: 'pattern', w: 128, cy: 120, fg: WHITE } },
  { id: 'ink', name: 'Hoodie, ink', body: 'ink', tone: 'sky', print: { kind: 'stack', w: 112, cy: 122, fg: WHITE, mk: YELLOW } },
];

const BX = 130;
const BY = 240;

export function HoodieView({ item }) {
  const idp = `use-apparel-hoodie-${item.id}`;
  const p = item.print;
  return (
    <Art viewBox="0 0 740 740" title={item.name} exportName={`use-apparel-hoodie-${item.id}`}>
      <MaterialDefs idp={idp} />
      <BackdropG w="740" h="740" />
      <ShadowG idp={`${idp}-sh`} cx={BX + 160} cy={BY + 345} rx="190" ry="18" tone={item.tone} opacity="0.3" blur="10" />
      <AxisG points={[[BX + 150, 24], [BX + 150, BY + 20], [BX + 150, BY + 320], [BX + 150, 716]]} />
      <LayerG i={0} dx={-60} dy={-100}>
        <g transform={`translate(${BX + 65} ${BY - 122})`}>
          <g className="mock-lit">{hood({ body: item.body, uid: `${idp}-h`, m: idp, tone: item.tone })}</g>
        </g>
      </LayerG>
      <LayerG i={1}>
        <g transform={`translate(${BX} ${BY})`}>{hoodieBody({ body: item.body, print: null, guide: p, uid: idp, m: idp, tone: item.tone, lining: true })}</g>
      </LayerG>
      <LayerG i={2} dx={150} dy={270}>
        <g transform={`translate(${BX + 150} ${BY + p.cy})`}>
          <PrintFilm print={p} uid={`${idp}-film`} m={idp} tone={item.tone} backing={CW[item.body].fill} />
        </g>
      </LayerG>
    </Art>
  );
}
