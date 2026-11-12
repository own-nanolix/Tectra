import Art from '@/components/art/Art';
import { LockupG, MarkG } from '@/components/art/Mark';
import { IsoSiteG, TreesG } from '@/components/art/KeyArt';
import { BackdropG, ShadowG, MaterialDefs, LayerG, AxisG, CalloutG, SheenG } from '@/components/art/Mockup';
import { HERO } from '@/lib/brand';
import { Ground, BlueDefs, Bolt, Lines } from './parts';

const P = 'use-world-ru';
const G = 800;
const SHEET = { w: 220, h: 560 };
const TOP = G - 44 - SHEET.h; // top of the graphic when assembled (cassette height 44)

// The base cassette: an aluminium cylinder on rubber feet with a pole standing out of it.
function Base({ cx }) {
  const x = cx - 125;
  return (
    <g>
      <rect x={cx - 3} y={TOP - 40} width="6" height={G - 44 - TOP + 44} fill={`url(#${P}-cyl)`} />
      <rect x={cx - 3} y={TOP + 40} width="6" height="6" fill="#4A4A4A" opacity="0.5" />
      <rect x={x} y={G - 52} width="250" height="46" rx="20" fill={`url(#${P}-metal)`} />
      <rect x={x} y={G - 52} width="250" height="46" rx="20" fill={`url(#${P}-shade-v)`} />
      <rect x={x + 20} y={G - 52} width="210" height="5" rx="2.5" fill="#6A6A6A" opacity="0.6" />
      <rect x={x + 26} y={G - 49} width="198" height="1.6" fill="#FFFFFF" opacity="0.7" />
      <path d={`M${x + 22} ${G - 52}V${G - 6}M${x + 228} ${G - 52}V${G - 6}`} stroke="#8A8A8A" strokeWidth="1" />
      <rect x={x} y={G - 52} width="22" height="46" rx="14" fill={`url(#${P}-metal-dark)`} />
      <rect x={x + 228} y={G - 52} width="22" height="46" rx="14" fill={`url(#${P}-metal-dark)`} />
      <rect x={x + 30} y={G - 6} width="34" height="6" rx="2" fill={`url(#${P}-rubber)`} />
      <rect x={x + 186} y={G - 6} width="34" height="6" rx="2" fill={`url(#${P}-rubber)`} />
      <Bolt x={x + 11} y={G - 29} r={3.2} />
      <Bolt x={x + 239} y={G - 29} r={3.2} />
    </g>
  );
}

// The sheet with its top bar. kind: 'blue' | 'white'.
function Sheet({ cx, kind }) {
  const x = cx - SHEET.w / 2, y = TOP;
  const blue = kind === 'blue';
  const clip = `${P}-clip-${kind}`;
  return (
    <g>
      <clipPath id={clip}>
        <rect x={x} y={y} width={SHEET.w} height={SHEET.h} />
      </clipPath>
      <rect x={x + 2} y={y + 4} width={SHEET.w} height={SHEET.h} fill="#000000" opacity="0.06" />
      <g clipPath={`url(#${clip})`}>
        <rect x={x} y={y} width={SHEET.w} height={SHEET.h} fill={blue ? `url(#${P}-field)` : `url(#${P}-card)`} filter={`url(#${P}-paper)`} />
        {blue ? (
          <g>
            <rect x={x} y={y} width={SHEET.w} height={SHEET.h} fill={`url(#${P}-glow)`} opacity="0.6" />
            <TreesG x={x} y={y + 170} w={SHEET.w} h={200} count={5} tone="blue" seed={31} minSize={46} maxSize={78} clear={[40, 120, 150, 60]} />
            <IsoSiteG x={x - 52} y={y + 310} scale={0.62} tone="blue" pins={['ridge', 'wing']} yellowPin="komatsu" trees={false} />
            <LockupG x={x + 22} y={y + 30} size={30} fill="#FFFFFF" />
            <Lines lines={HERO.title} x={x + 22} y={y + 122} size={31} lh={35} fill="#FFFFFF" />
          </g>
        ) : (
          <g>
            <MarkG x={x + 22} y={y + 28} size={34} fill="#4093EC" />
            <Lines lines={['Build Smarter,', 'Build Faster']} x={x + 22} y={y + 112} size={29} lh={33} fill="#2F2F2F" />
            <text x={x + 22} y={y + 178} fontSize="29" fontWeight="300" fill="#4093EC">
              with Tectra
            </text>
            <Lines
              lines={['Streamline project tracking,', 'enhance collaboration, and', 'minimize delays — all in one', 'mobile app for construction teams.']}
              x={x + 22}
              y={y + 214}
              size={9}
              lh={13}
              fill="#5E5E5E"
              weight="400"
            />
            <TreesG x={x} y={y + 230} w={SHEET.w} h={200} count={4} tone="paper" seed={33} minSize={46} maxSize={78} clear={[40, 120, 150, 60]} />
            <IsoSiteG x={x - 52} y={y + 310} scale={0.62} tone="paper" pins={['ridge']} trees={false} />
          </g>
        )}
        <rect x={x} y={y} width="14" height={SHEET.h} fill="#FFFFFF" opacity="0.18" />
        <rect x={x + SHEET.w - 22} y={y} width="22" height={SHEET.h} fill="#000000" opacity="0.07" />
        <rect x={x} y={y + SHEET.h - 30} width={SHEET.w} height="30" fill={`url(#${P}-shade-v)`} />
      </g>
      {!blue && <rect x={x} y={y} width={SHEET.w} height={SHEET.h} fill="none" stroke="#E2E2E2" strokeWidth="1.2" />}
      <SheenG idp={P} d={`M${x} ${y}h${SHEET.w}v${SHEET.h}h${-SHEET.w}z`} opacity={0.35} />
      <rect x={x - 4} y={y - 16} width={SHEET.w + 8} height="16" rx="3" fill={`url(#${P}-metal)`} />
      <rect x={x - 4} y={y - 16} width={SHEET.w + 8} height="16" rx="3" fill={`url(#${P}-shade-v)`} />
      <rect x={x + SHEET.w / 2 - 8} y={y - 24} width="16" height="9" rx="2" fill={`url(#${P}-metal-dark)`} />
    </g>
  );
}

export default function Rollups() {
  const xs = [{ cx: 230, kind: 'blue' }, { cx: 560, kind: 'white' }];
  return (
    <Art viewBox="0 0 760 900" title="Two roll-up banners, exploded: graphic lifted from the base cassette" exportName="use-world-rollups">
      <MaterialDefs idp={P} />
      <BlueDefs idp={P} />
      <BackdropG w={760} h={900} />
      <Ground y={G} />
      <AxisG points={[[395, 56], [395, 330], [395, G - 29]]} />
      <CalloutG x={xs[0].cx - 110} y={330} tx={100} ty={330} anchor="end" label="Graphic" />
      <CalloutG x={xs[0].cx - 125} y={G - 29} tx={100} ty={G - 29} anchor="end" label="Base" />
      {xs.map((r, i) => (
        <g key={r.kind}>
          <ShadowG idp={`${P}-s${i}`} cx={r.cx} cy={G + 1} rx={150} ry={11} tone={i ? 'sky' : 'blue'} opacity={0.34} />
          <LayerG i={i * 2}>
            <Base cx={r.cx} />
          </LayerG>
          <LayerG i={i * 2 + 1} dy={-120}>
            <Sheet cx={r.cx} kind={r.kind} />
          </LayerG>
        </g>
      ))}
    </Art>
  );
}
