// Letterhead (sheet + print layer) and envelope (flap, letter, pocket), both exploded along the y axis.
import Art from '@/components/art/Art';
import { MarkG, LockupG, WordmarkG } from '@/components/art/Mark';
import { IsoSiteG } from '@/components/art/KeyArt';
import { BackdropG, ShadowG, MaterialDefs, LayerG, AxisG } from '@/components/art/Mockup';
import { C, Sheet, Ph, PhLines, Deboss } from './parts';

// The header of a letter: lockup left, three quiet contact lines right, a hairline. Box width w.
export function LetterHead({ x, y, w, mono, size = 44 }) {
  const blue = mono ? C.blue : C.ink;
  const g = mono ? C.blue : C.grey;
  return (
    <g>
      <LockupG x={x + 36} y={y + 36} size={size} fill={blue} markFill={C.blue} />
      <Ph x={x + w - 36 - 104} y={y + 40} w={104} fill={g} />
      <Ph x={x + w - 36 - 84} y={y + 56} w={84} fill={g} />
      <Ph x={x + w - 36 - 120} y={y + 72} w={120} fill={g} />
      <path d={`M${x + 36} ${y + 108}H${x + w - 36}`} stroke={C.blue} strokeWidth="1.4" opacity={mono ? 1 : 0.9} />
    </g>
  );
}

// The print layer of the letterhead (everything that is ink on the sheet).
function LetterInk({ x, y, w, h, mono }) {
  const g = mono ? C.blue : C.grey;
  const d = mono ? C.blue : C.greyD;
  return (
    <g>
      {!mono && <IsoSiteG tone="ghost" trees={false} scale={0.5} x={x + w - 296} y={y + h - 262} />}
      <LetterHead x={x} y={y} w={w} mono={mono} />
      <Ph x={x + 36} y={y + 148} w={90} fill={g} />
      <Ph x={x + 36} y={y + 188} w={150} fill={d} />
      <Ph x={x + 36} y={y + 204} w={118} fill={g} />
      <Ph x={x + 36} y={y + 220} w={136} fill={g} />
      <Ph x={x + 36} y={y + 268} w={230} h={9} fill={d} />
      <PhLines x={x + 36} y={y + 300} w={w - 72} rows={5} fill={g} />
      <PhLines x={x + 36} y={y + 391} w={w - 72} rows={6} fill={g} widths={[0.97, 1, 0.92, 0.99, 0.88, 0.45]} />
      <Ph x={x + 36} y={y + 500} w={104} fill={g} />
      <Ph x={x + 36} y={y + 522} w={132} h={8} fill={d} />
      <path d={`M${x + 36} ${y + h - 62}H${x + w - 36}`} stroke={C.blue} strokeWidth="1" opacity="0.7" />
      <Ph x={x + 36} y={y + h - 44} w={118} fill={g} />
      <Ph x={x + 170} y={y + h - 44} w={92} fill={g} />
      <MarkG x={x + w - 36 - 22} y={y + h - 50} size={22} fill={C.blue} />
    </g>
  );
}

export function Letterhead() {
  const idp = 'use-stationery-letter';
  const X = 140, Y = 90, W = 480, H = 679;
  return (
    <Art viewBox="0 0 760 880" title="Letterhead: paper sheet with the print layer lifted off" exportName="use-stationery-letterhead">
      <BackdropG w={760} h={880} />
      <MaterialDefs idp={idp} />
      <defs>
        <linearGradient id={`${idp}-crease`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset="0.42" stopColor="#000" stopOpacity="0.07" />
          <stop offset="0.56" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ShadowG idp={`${idp}-s`} cx={392} cy={806} rx={262} tone="blue" />
      <AxisG points={[[92, Y + H / 2 + 110], [92, Y + H / 2 - 46]]} />
      <g className="mock-lit">
        <LayerG i={0}>
          <Sheet idp={idp} x={X} y={Y} w={W} h={H} depth={4} lift={1.4}>
            {[1, 2].map((k) => (
              <rect key={k} x={X} y={Y + (H / 3) * k - 9} width={W} height="18" fill={`url(#${idp}-crease)`} />
            ))}
            <rect x={X} y={Y} width={W} height={H} fill={`url(#${idp}-shade)`} opacity="0.3" />
          </Sheet>
        </LayerG>
        <LayerG i={1} dx={-14} dy={-46}>
          <rect x={X + 12} y={Y + 18} width={W} height={H} rx="2" fill={C.blue} opacity="0.1" filter={`url(#${idp}-soft)`} />
          <rect x={X} y={Y} width={W} height={H} rx="2" fill="#fff" fillOpacity="0.55" stroke={C.sky} strokeWidth="1" />
          <path d={`M${X} ${Y + H}V${Y}H${X + W}`} stroke="#fff" strokeWidth="2" fill="none" />
          <LetterInk x={X} y={Y} w={W} h={H} />
          </LayerG>
      </g>
    </Art>
  );
}

// The folded letter that sits in the envelope: top third of the letterhead.
function FoldedLetter({ idp, x, y, w, h }) {
  return (
    <g>
      <Sheet idp={idp} x={x} y={y} w={w} h={h} depth={3}>
        <LetterHead x={x} y={y} w={w} size={40} />
        <PhLines x={x + 36} y={y + 138} w={w - 72} rows={3} fill={C.grey} />
        <rect x={x} y={y + h - 22} width={w} height="22" fill="#000" opacity="0.06" />
        <rect x={x} y={y} width={w} height={h} fill={`url(#${idp}-shade)`} opacity="0.5" />
      </Sheet>
    </g>
  );
}

export function Envelope() {
  const idp = 'use-stationery-envelope';
  const L = 100, R = 700, T = 560, B = 900, M = 400, V = 780;
  const flap = `M${L} ${T}L${R} ${T}L${M} ${V}Z`;
  const left = `M${L} ${T}L${M} ${V}L${L} ${B}Z`;
  const right = `M${R} ${T}L${M} ${V}L${R} ${B}Z`;
  const bottom = `M${L} ${B}L${M} ${V}L${R} ${B}Z`;
  return (
    <Art viewBox="0 0 800 960" title="Envelope: flap, letter and pocket pulled apart" exportName="use-stationery-envelope">
      <BackdropG w={800} h={960} />
      <MaterialDefs idp={idp} />
      <defs>
        <pattern id={`${idp}-liner`} width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill="#AFD0F6" />
          <path d="M0 7H14M7 0V14" stroke="#90C0F3" strokeWidth="1" />
        </pattern>
        <linearGradient id={`${idp}-inner`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0A2E63" stopOpacity="0.38" />
          <stop offset="0.5" stopColor="#0A2E63" stopOpacity="0.1" />
          <stop offset="1" stopColor="#0A2E63" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${idp}-flap`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6DB0F8" />
          <stop offset="0.5" stopColor="#53A2F7" />
          <stop offset="1" stopColor="#3F8DE6" />
        </linearGradient>
        <linearGradient id={`${idp}-fold`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <ShadowG idp={`${idp}-s`} cx={408} cy={924} rx={340} tone="blue" />
      <AxisG points={[[752, 160], [752, 470], [752, 730]]} />
      <LayerG i={0}>
        <rect x={L + 6} y={T + 10} width={R - L} height={B - T} fill={C.ink} opacity="0.16" filter={`url(#${idp}-soft)`} />
        <rect x={L + 2.4} y={T + 4} width={R - L} height={B - T} fill={C.edge} />
        <rect x={L} y={T} width={R - L} height={B - T} fill={`url(#${idp}-liner)`} filter={`url(#${idp}-paper)`} />
        <path d={flap} fill={`url(#${idp}-inner)`} />
      </LayerG>
      <LayerG i={1} dy={-205}>
        <FoldedLetter idp={idp} x={140} y={545} w={520} h={260} />
      </LayerG>
      <LayerG i={2}>
        {[left, right, bottom].map((d, i) => (
          <g key={i}>
            <path d={d} transform="translate(3 4)" fill={C.ink} opacity="0.2" filter={`url(#${idp}-soft)`} />
            <path d={d} fill={`url(#${idp}-card)`} filter={`url(#${idp}-paper)`} stroke="#D3D3D3" strokeWidth="0.8" strokeLinejoin="round" />
            <path d={d} fill={i === 0 ? '#fff' : '#000'} opacity={[0, 0.07, 0.11][i]} />
            <path d={d} fill={`url(#${idp}-fold)`} opacity="0.7" />
          </g>
        ))}
        <path d={`M${L} ${B}H${R}V${B + 1}H${L}Z`} fill="#BDBDBD" opacity="0.6" />
        <WordmarkG x={M} y={866} size={40} fill={C.ink} anchor="middle" />
        <MarkG x={M - 14} y={806} size={28} fill={C.blue} />
      </LayerG>
      <LayerG i={3} dy={-480}>
        <path d={flap} transform="translate(5 9)" fill={C.ink} opacity="0.2" filter={`url(#${idp}-soft)`} />
        <path d={flap} fill={`url(#${idp}-flap)`} filter={`url(#${idp}-paper)`} stroke="#2F7CD6" strokeWidth="0.8" strokeLinejoin="round" />
        <path d={flap} fill={`url(#${idp}-fold)`} opacity="0.8" />
        <path d={`M${L} ${T}H${R}`} stroke="#fff" strokeOpacity="0.7" strokeWidth="1.4" />
        <Deboss x={M - 36} y={T + 22} size={72} />
      </LayerG>
    </Art>
  );
}
