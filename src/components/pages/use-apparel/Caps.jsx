// Caps: three-quarter front view, the cap turned to the lower left. Crown, peak and badge are pulled apart
// along a 30 degree diagonal. crown(), peak() and badge() draw in a 360 x 290 box; the badge is skewed onto
// the front panel and the peak is shaded as a curved board.
import Art from '@/components/art/Art';
import { BackdropG, ShadowG, MaterialDefs, LayerG, AxisG } from '@/components/art/Mockup';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { SHADOW_TONES } from '@/components/art/Mockup';
import { CW, Folds, BLUE, WHITE, INK, YELLOW } from './parts';

const CROWN = 'M46 196 C34 100 100 34 192 32 C284 30 336 100 326 196 C320 222 250 240 170 232 C110 226 66 214 46 196Z';
const PEAK = 'M46 196 C-14 204 -48 252 -18 280 C34 322 152 304 198 240 L170 232 C110 226 66 214 46 196Z';
// seams run from the button to the sweatband
const SEAMS = ['M192 34 Q110 100 100 222', 'M192 34 Q172 112 176 233', 'M192 34 Q262 110 250 228', 'M192 34 Q60 80 48 198'];

const CROWN_FOLDS = [
  { k: 'l', d: 'M52 190 C44 110 96 46 178 38 C120 70 92 130 96 214Z', o: 0.34 },
  { k: 'd', d: 'M326 196 C336 100 284 30 200 32 C268 60 292 130 286 212Z', o: 0.2 },
  { k: 'd', line: true, d: 'M110 214 Q180 232 250 222', w: 9, o: 0.16 },
  { k: 'l', line: true, d: 'M132 72 Q104 120 112 170', w: 8, o: 0.22 },
];

export function crown({ body, uid, m, tone }) {
  const c = CW[body];
  const cid = `${uid}-crown`;
  const seam = { stroke: c.sc, strokeOpacity: c.so, fill: 'none' };
  return (
    <g>
      <defs>
        <clipPath id={cid}>
          <path d={CROWN} />
        </clipPath>
      </defs>
      <path d={CROWN} transform="translate(12 16)" fill={SHADOW_TONES[tone]} opacity="0.2" filter={`url(#${m}-soft)`} />
      <path d={CROWN} fill={c.fill} filter={`url(#${m}-fabric)`} />
      <g clipPath={`url(#${cid})`}>
        <rect x="0" y="0" width="360" height="290" fill={`url(#${m}-shade)`} />
        <path d="M192 34 Q110 100 100 222 L176 233 Q172 112 192 34Z" fill="#FFFFFF" opacity="0.1" />
        <path d="M192 34 Q262 110 250 228 L326 196 L326 20Z" fill="#000000" opacity="0.1" />
        <Folds m={m} list={CROWN_FOLDS} />
        {SEAMS.slice(0, 3).map((d) => (
          <g key={d}>
            <path d={d} {...seam} strokeWidth="1.4" />
            <path d={d} transform="translate(5 0)" {...seam} strokeWidth="0.8" strokeDasharray="2 3" />
          </g>
        ))}
        {/* sweatband edge and stitching */}
        <path d="M46 196 C66 214 110 226 170 232 C250 240 320 222 326 196" fill="none" stroke="#000000" strokeOpacity="0.18" strokeWidth="9" filter={`url(#${m}-soft)`} />
        <path d="M49 186 C70 204 112 216 170 222 C246 230 314 214 322 188" {...seam} strokeWidth="0.8" strokeDasharray="2 3" />
        <path d="M48 192 C68 210 112 221 170 227 C248 235 316 219 324 193" {...seam} strokeWidth="1" />
      </g>
      {/* eyelets */}
      {[[150, 74, -24], [230, 70, 22]].map(([x, y, r]) => (
        <g key={x} transform={`rotate(${r} ${x} ${y})`}>
          <ellipse cx={x} cy={y + 1} rx="6" ry="3.8" fill="#000000" opacity="0.28" />
          <ellipse cx={x} cy={y} rx="5.5" ry="3.4" fill={`url(#${m}-metal)`} />
          <ellipse cx={x} cy={y} rx="2.2" ry="1.3" fill="#2F2F2F" />
        </g>
      ))}
      {/* top button: cloth covered, gloss over it */}
      <ellipse cx="192" cy="36" rx="15" ry="9" fill="#000000" opacity="0.2" transform="translate(2 3)" />
      <ellipse cx="192" cy="34" rx="14" ry="8.4" fill={c.fill} filter={`url(#${m}-fabric)`} />
      <ellipse cx="192" cy="34" rx="14" ry="8.4" fill={`url(#${m}-plastic)`} opacity="0.5" />
      <ellipse cx="192" cy="34" rx="14" ry="8.4" fill="none" stroke="#000000" strokeOpacity="0.2" />
      <path d={CROWN} fill="none" stroke="#000000" strokeOpacity="0.16" strokeWidth="1" />
    </g>
  );
}

export function peak({ body, uid, m, tone }) {
  const c = CW[body];
  const cid = `${uid}-peak`;
  const seam = { stroke: c.sc, strokeOpacity: c.so, fill: 'none' };
  return (
    <g>
      <defs>
        <clipPath id={cid}>
          <path d={PEAK} />
        </clipPath>
      </defs>
      <path d={PEAK} transform="translate(12 18)" fill={SHADOW_TONES[tone]} opacity="0.24" filter={`url(#${m}-soft)`} />
      <path d={PEAK} fill={c.fill} filter={`url(#${m}-fabric)`} />
      <g clipPath={`url(#${cid})`}>
        <rect x="-10" y="190" width="220" height="110" fill={`url(#${m}-shade-v)`} />
        <rect x="-10" y="190" width="220" height="110" fill={`url(#${m}-shade)`} />
        <path d="M30 206 C6 224 4 244 22 256 C14 238 28 222 52 214Z" fill="#FFFFFF" opacity="0.32" filter={`url(#${m}-soft)`} />
        <path d="M60 280 C120 290 180 262 196 236 C170 262 120 276 60 270Z" fill="#000000" opacity="0.2" filter={`url(#${m}-soft)`} />
        {[10, 18, 26].map((o) => (
          <path key={o} d={`M${48 - o * 0.2} ${196 + o * 0.15} C${12 - o * 0.6} ${208 + o * 0.4} ${-4 - o * 0.5} ${236 - o * 0.2} ${16 + o * 0.2} ${256 - o * 0.7} C${54 + o * 0.3} ${290 - o * 1.1} ${140 - o * 0.2} ${284 - o * 1.1} ${190 - o * 0.2} ${238 - o * 0.1}`} {...seam} strokeWidth="0.8" strokeDasharray="2 3" />
        ))}
        {/* where the peak meets the crown */}
        <path d="M46 196 C66 214 110 226 170 232" fill="none" stroke="#000000" strokeOpacity="0.28" strokeWidth="5" filter={`url(#${m}-soft)`} />
      </g>
      <path d="M-18 280 C34 322 152 304 198 240" fill="none" stroke="#000000" strokeOpacity="0.22" strokeWidth="3" transform="translate(0 2)" />
      <path d={PEAK} fill="none" stroke="#000000" strokeOpacity="0.18" strokeWidth="1" />
    </g>
  );
}

// The badge, drawn flat then skewed onto the front panel. kind: 'round' (embroidered patch with the mark) or
// 'label' (a woven label with the word-mark, stitched at its ends).
export function badge({ body, uid, m, patch = WHITE, mk = BLUE, kind = 'round' }) {
  const cid = `${uid}-badge`;
  const round = kind === 'round';
  const shape = round ? <ellipse rx="40" ry="38" /> : <rect x="-54" y="-21" width="108" height="42" rx="3" />;
  return (
    <g transform="translate(138 128) rotate(-14) skewY(9) scale(0.92 1)">
      <defs>
        <clipPath id={cid}>{shape}</clipPath>
      </defs>
      <g transform="translate(4 7)" fill="#000000" opacity="0.22" filter={`url(#${m}-soft)`}>{shape}</g>
      <g fill={patch} filter={`url(#${m}-fabric)`}>{shape}</g>
      <g clipPath={`url(#${cid})`}>
        {round ? <MarkG x={-26} y={-26} size={52} fill={mk} /> : <WordmarkG x={0} y={11} size={32} fill={mk} anchor="middle" />}
        <rect x="-60" y="-44" width="120" height="88" fill={`url(#${m}-shade)`} />
        <ellipse cx="-16" cy="-20" rx="28" ry="12" fill="#FFFFFF" opacity="0.26" transform="rotate(-24 -16 -20)" />
        {/* thickness of the patch on its lower-right edge */}
        <g transform="translate(-2 -2)" fill="none" stroke="#000000" strokeOpacity="0.22" strokeWidth="3">{shape}</g>
      </g>
      {round ? (
        <ellipse rx="35" ry="33" fill="none" stroke={mk} strokeOpacity="0.55" strokeWidth="1" strokeDasharray="2 2.4" />
      ) : (
        <path d="M-48 -16V16M48 -16V16" stroke={mk} strokeOpacity="0.6" strokeWidth="1" strokeDasharray="2 2.4" />
      )}
      <g fill="none" stroke="#000000" strokeOpacity="0.2">{shape}</g>
    </g>
  );
}

// Assembled cap, used in the collection scene if needed.
export function cap({ body, uid, m, tone = 'blue', patch, mk, kind, peakBody }) {
  return (
    <g>
      {crown({ body, uid: `${uid}-c`, m, tone })}
      {peak({ body: peakBody || body, uid: `${uid}-p`, m, tone })}
      {badge({ body, uid: `${uid}-b`, m, patch, mk, kind })}
    </g>
  );
}

// Three caps, each a different build: a round mark patch; a woven word-mark label; a white crown with a blue peak.
export const CAPS = [
  { id: 'blue', name: 'Cap, blue', body: 'blue', tone: 'blue', patch: WHITE, mk: BLUE, kind: 'round' },
  { id: 'yellow', name: 'Cap, yellow', body: 'yellow', tone: 'yellow', patch: INK, mk: WHITE, kind: 'label' },
  { id: 'white', name: 'Cap, white with blue peak', body: 'white', tone: 'sky', patch: BLUE, mk: WHITE, kind: 'round', peakBody: 'blue' },
];

const OX = 236;
const OY = 64;
// One 30 degree diagonal (up-right is +t): crown pulled up and right, badge and peak down and left, each far
// enough that the three parts never touch.
const U = [0.866, -0.5];
const at = (t) => [Math.round(U[0] * t), Math.round(U[1] * t)];
const STEP = { crown: at(110), badge: at(-60), peak: at(-180) };

export function CapView({ item }) {
  const idp = `use-apparel-cap-${item.id}`;
  // the axis runs through the badge centre (front panel point 138,128 in the cap's own box)
  const base = [OX + 138, OY + 128];
  const pts = [-90, -60, 0, 110, 190].map((t) => [base[0] + Math.round(U[0] * t), base[1] + Math.round(U[1] * t)]);
  return (
    <Art viewBox="0 0 680 500" title={item.name} exportName={`use-apparel-cap-${item.id}`}>
      <MaterialDefs idp={idp} />
      <BackdropG w="680" h="500" />
      <ShadowG idp={`${idp}-sh`} cx="340" cy="478" rx="250" ry="14" tone={item.tone} opacity="0.3" blur="10" />
      <AxisG points={pts} />
      {/* the peak travels the same diagonal: a parallel guide from where it sat to where it lies */}
      <AxisG points={[[OX + 110, OY + 236], [OX + 110 + STEP.peak[0], OY + 236 + STEP.peak[1]]]} />
      <LayerG i={0} dx={STEP.peak[0]} dy={STEP.peak[1]}>
        <g transform={`translate(${OX} ${OY})`}>{peak({ body: item.peakBody || item.body, uid: idp, m: idp, tone: item.tone })}</g>
      </LayerG>
      <LayerG i={1} dx={STEP.crown[0]} dy={STEP.crown[1]}>
        <g transform={`translate(${OX} ${OY})`}>
          <g className="mock-lit">{crown({ body: item.body, uid: idp, m: idp, tone: item.tone })}</g>
        </g>
      </LayerG>
      <LayerG i={2} dx={STEP.badge[0]} dy={STEP.badge[1]}>
        <g transform={`translate(${OX} ${OY})`}>{badge({ body: item.body, uid: idp, m: idp, patch: item.patch, mk: item.mk, kind: item.kind })}</g>
      </LayerG>
    </Art>
  );
}
