import Art from '@/components/art/Art';
import { LockupG } from '@/components/art/Mark';
import { IsoSiteG, TreesG } from '@/components/art/KeyArt';
import { BackdropG, ShadowG, MaterialDefs, LayerG, AxisG, CalloutG, SheenG } from '@/components/art/Mockup';
import { HERO } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { Ground, BlueDefs, Bolt, Lines } from './parts';

const P = 'use-world-vn';
const G = 760; // ground line of this plate
const BODY =
  'M400 440Q400 410 430 410H1085Q1105 410 1118 428L1175 540Q1182 552 1196 558L1204 575V668Q1204 702 1170 702H430Q400 702 400 672Z';
const FIELD = 'M395 400V720H1210V600C1100 585 1000 560 880 525C740 480 560 440 395 438Z';
const WINDOW = 'M1004 432H1090L1148 536H1004Z';
const WHEELS = [560, 1085];

// The wrap artwork, drawn once in van space. k keeps the clip ids apart between the film and the van.
function Wrap({ k }) {
  return (
    <g>
      <clipPath id={`${P}-body-${k}`}>
        <path d={BODY} />
      </clipPath>
      <clipPath id={`${P}-field-${k}`}>
        <path d={FIELD} />
      </clipPath>
      <g clipPath={`url(#${P}-body-${k})`}>
        <rect x="395" y="405" width="820" height="300" fill="#FAFAFA" filter={`url(#${P}-paper)`} />
        <TreesG x={720} y={420} w={300} h={170} count={5} tone="paper" seed={41} minSize={44} maxSize={74} />
        <path d={FIELD} fill={`url(#${P}-field)`} />
        <g clipPath={`url(#${P}-field-${k})`}>
          <IsoSiteG x={455} y={520} scale={0.66} tone="blue" pins={['ridge']} yellowPin="komatsu" trees={false} />
          <TreesG x={780} y={560} w={420} h={160} count={4} tone="blue" seed={43} minSize={40} maxSize={60} />
        </g>
        <LockupG x={432} y={452} size={54} fill="#FFFFFF" />
        <Lines lines={HERO.title} x={1004} y={588} size={19} lh={22} fill="#FFFFFF" weight="400" />
      </g>
    </g>
  );
}

function Wheel({ cx }) {
  const cy = G - 66;
  const tread = Array.from({ length: 30 }, (_, i) => {
    const a = (i / 30) * Math.PI * 2;
    return `M${r2(cx + Math.cos(a) * 59)} ${r2(cy + Math.sin(a) * 59)}L${r2(cx + Math.cos(a) * 65)} ${r2(cy + Math.sin(a) * 65)}`;
  }).join('');
  const spokes = Array.from({ length: 5 }, (_, i) => {
    const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
    return [r2(cx + Math.cos(a) * 28), r2(cy + Math.sin(a) * 28)];
  });
  return (
    <g>
      <circle cx={cx} cy={cy} r="66" fill={`url(#${P}-rubber)`} />
      <path d={tread} stroke="#1C1C1C" strokeWidth="2" opacity="0.7" />
      <circle cx={cx} cy={cy} r="57" fill="none" stroke="#1C1C1C" strokeWidth="1" opacity="0.6" />
      <path d={`M${cx - 54} ${cy - 20}A58 58 0 0 1 ${cx - 20} ${cy - 54}`} stroke="#FFFFFF" strokeWidth="3" fill="none" opacity="0.18" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="42" fill={`url(#${P}-metal)`} stroke="#8A8A8A" strokeWidth="1.2" />
      <circle cx={cx} cy={cy} r="36" fill="#6A6A6A" />
      {spokes.map(([sx, sy], i) => (
        <path key={i} d={`M${cx} ${cy}L${sx} ${sy}`} stroke={`url(#${P}-metal)`} strokeWidth="11" strokeLinecap="round" />
      ))}
      <circle cx={cx} cy={cy} r="42" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.5" />
      <circle cx={cx} cy={cy} r="12" fill={`url(#${P}-metal-dark)`} />
      {spokes.map(([sx, sy], i) => (
        <circle key={i} cx={r2(cx + (sx - cx) * 0.3)} cy={r2(cy + (sy - cy) * 0.3)} r="2.6" fill="#C9C9C9" />
      ))}
    </g>
  );
}

function Van() {
  return (
    <g>
      <clipPath id={`${P}-bodyclip`}>
        <path d={BODY} />
      </clipPath>
      <path d={BODY} fill="#EDEDED" />
      <Wrap k="van" />
      <g clipPath={`url(#${P}-bodyclip)`}>
        <path d={BODY} fill={`url(#${P}-shade)`} />
        <path d={BODY} fill={`url(#${P}-shade-v)`} />
        <path d="M410 412H1085" stroke="#FFFFFF" strokeWidth="2.4" opacity="0.8" />
        <path d="M400 692H1204" stroke="#000000" strokeWidth="14" opacity="0.1" />
        {/* door and panel lines, all depth cuts */}
        <path d="M470 430V690M700 430V690M930 430V690M990 430V690M1135 430V690" stroke="#000000" strokeWidth="1.3" opacity="0.28" fill="none" />
        <path d="M471.5 430V690M701.5 430V690M991.5 430V690" stroke="#FFFFFF" strokeWidth="1" opacity="0.5" fill="none" />
        <path d="M470 560H400M700 690H930" stroke="#000000" strokeWidth="1" opacity="0.2" />
        <rect x="684" y="408" width="90" height="6" rx="3" fill="#C4C4C4" />
        {WHEELS.map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy={G - 66} r="82" fill="#2A2A2A" />
            <circle cx={cx} cy={G - 66} r="82" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.35" />
            <path d={`M${cx - 78} ${G - 80}A80 80 0 0 1 ${cx + 78} ${G - 80}`} stroke="#000000" strokeWidth="6" fill="none" opacity="0.25" />
          </g>
        ))}
      </g>
      {/* windows, handles, lights, mirror */}
      <path d={WINDOW} fill="#0A2E63" />
      <path d={WINDOW} fill="none" stroke="#C9C9C9" strokeWidth="3" strokeLinejoin="round" />
      <SheenG idp={P} d={WINDOW} opacity={0.65} />
      <path d="M1012 432L1070 536" stroke="#FFFFFF" strokeWidth="7" opacity="0.14" />
      <rect x="905" y="540" width="22" height="8" rx="4" fill={`url(#${P}-metal-dark)`} />
      <rect x="1100" y="566" width="22" height="8" rx="4" fill={`url(#${P}-metal-dark)`} />
      <rect x="396" y="552" width="9" height="64" rx="3" fill="#E2383B" />
      <rect x="397" y="554" width="3" height="60" fill="#FFFFFF" opacity="0.5" />
      <path d="M1196 562L1206 576V596H1196Z" fill="#FFFFFF" stroke="#FFB83D" strokeWidth="2" />
      <rect x="1170" y="652" width="40" height="22" rx="6" fill={`url(#${P}-metal-dark)`} />
      <rect x="388" y="664" width="26" height="22" rx="5" fill={`url(#${P}-metal-dark)`} />
      <path d="M1150 478L1170 470" stroke="#4A4A4A" strokeWidth="5" strokeLinecap="round" />
      <rect x="1163" y="446" width="20" height="46" rx="8" fill={`url(#${P}-metal-dark)`} />
      <rect x="1166" y="450" width="5" height="36" rx="2.5" fill="#FFFFFF" opacity="0.35" />
      {WHEELS.map((cx) => (
        <Wheel key={cx} cx={cx} />
      ))}
      <Bolt x={1195} y={640} r={3} />
    </g>
  );
}

function Film() {
  return (
    <g>
      <path d={BODY} fill="#000000" opacity="0.07" transform="translate(5 8)" />
      <Wrap k="film" />
      <path d={BODY} fill={`url(#${P}-shade)`} opacity="0.7" />
      <path d={BODY} fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.7" />
      <path d={BODY} fill="none" stroke="#2F2F2F" strokeWidth="0.8" opacity="0.25" />
      <SheenG idp={P} d={BODY} opacity={0.3} />
    </g>
  );
}

export default function Vehicle() {
  return (
    <Art viewBox="0 0 1600 900" title="Vehicle wrap, exploded: wrap film lifted off the van body" exportName="use-world-vehicle">
      <MaterialDefs idp={P} />
      <BlueDefs idp={P} />
      <BackdropG w={1600} h={900} />
      <Ground y={G} />
      <ShadowG idp={`${P}-s1`} cx={800} cy={G + 2} rx={480} ry={20} tone="blue" opacity={0.32} />
      <ShadowG idp={`${P}-s2`} cx={800} cy={402} rx={400} ry={12} tone="yellow" opacity={0.38} blur={9} />
      <AxisG points={[[1300, 246], [1300, 556]]} />
      <CalloutG x={1212} y={246} tx={1300} ty={246} label="Wrap" />
      <CalloutG x={1212} y={556} tx={1300} ty={556} label="Body" />
      <LayerG i={0}>
        <Van />
      </LayerG>
      <LayerG i={1} dy={-310}>
        <Film />
      </LayerG>
    </Art>
  );
}
