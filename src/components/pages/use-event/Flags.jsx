import { MarkG, WordmarkG, LockupG } from '@/components/art/Mark';
import { PatternDefs, TreesG, IsoSiteG } from '@/components/art/KeyArt';
import { LayerG, AxisG, ShadowG } from '@/components/art/Mockup';
import { Scene, PAL, u } from './parts';

// Side elevation, one vertical axis: base, pole, sleeve. The pole sits at x = 0 inside each group.
const SLEEVE = 'M-12 900V560Q-12 544 4 544C90 548 176 612 178 716C180 810 130 880 60 900Z';

function Base({ idp }) {
  return (
    <g>
      <rect x="-92" y="976" width="184" height="12" rx="3" fill={u(idp, 'metal-dark')} />
      <rect x="-92" y="976" width="184" height="3" fill="#FFFFFF" opacity="0.25" />
      {[-80, 62].map((x) => <rect key={x} x={x} y="986" width="18" height="6" rx="2" fill="#000000" opacity="0.7" />)}
      <path d="M-13 976V932H13V976Z" fill={u(idp, 'metal-dark')} />
      <rect x="-16" y="928" width="32" height="10" rx="2" fill={u(idp, 'metal')} stroke="#8C8C8C" strokeWidth="0.6" />
      <path d="M-10 976V938" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="2" />
      <path d="M-92 986H92" stroke="#000000" strokeOpacity="0.2" />
    </g>
  );
}

// A three-part pole with ferrules and a bowed tip.
function Pole({ idp }) {
  return (
    <g>
      <rect x="-4.5" y="520" width="9" height="420" fill={u(idp, 'metal')} />
      <rect x="-4.5" y="520" width="3" height="420" fill="#FFFFFF" opacity="0.5" />
      <rect x="1.5" y="520" width="3" height="420" fill="#000000" opacity="0.14" />
      {[660, 800].map((y) => <rect key={y} x="-6.5" y={y} width="13" height="12" rx="2" fill={u(idp, 'metal')} stroke="#8C8C8C" strokeWidth="0.6" />)}
      <path d="M0 521C0 498 10 480 34 472" fill="none" stroke={u(idp, 'metal')} strokeWidth="9" strokeLinecap="round" />
      <path d="M-2 518C-2 497 9 480 33 470" fill="none" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="37" cy="471" r="5.5" fill={u(idp, 'plastic')} stroke="#BDBDBD" strokeWidth="0.8" />
    </g>
  );
}

function FlagArt({ idp, tone }) {
  if (tone === 'blue') {
    return (
      <>
        <MarkG x={44} y={600} size={98} fill="#FFFFFF" />
        <WordmarkG x={92} y={790} size={46} fill="#FFFFFF" anchor="middle" />
      </>
    );
  }
  if (tone === 'yellow') {
    return (
      <>
        <rect x="-12" y="544" width="200" height="360" fill={u(idp, 'pat-marks')} />
        <MarkG x={44} y={600} size={98} fill={PAL.ink} />
        <WordmarkG x={92} y={790} size={46} fill={PAL.ink} anchor="middle" />
      </>
    );
  }
  return (
    <>
      <TreesG x={-12} y={600} w={190} h={300} count={4} tone="paper" seed={31} minSize={90} maxSize={170} />
      <MarkG x={44} y={600} size={98} fill={PAL.blue} />
      <WordmarkG x={92} y={790} size={46} fill={PAL.ink} anchor="middle" />
    </>
  );
}

// Feather sleeve: pocket strip with stitching on the pole side, open mouth, pleats that follow the curve.
function Sleeve({ idp, tone }) {
  const fill = tone === 'white' ? '#FFFFFF' : PAL[tone];
  const clip = `${idp}-sleeve`;
  return (
    <g>
      <path d={SLEEVE} transform="translate(6 8)" fill={PAL[tone === 'white' ? 'sky' : tone]} opacity="0.4" filter={u(idp, 'soft')} />
      <clipPath id={clip}><path d={SLEEVE} /></clipPath>
      <path d={SLEEVE} fill={fill} filter={u(idp, 'fabric')} />
      <g clipPath={`url(#${clip})`}>
        <FlagArt idp={idp} tone={tone} />
        <path d="M44 556C100 640 120 770 60 898M104 566C150 650 160 790 110 880" fill="none" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="9" />
        <path d="M74 560C130 650 144 780 88 892M138 600C170 680 168 780 140 850" fill="none" stroke="#000000" strokeOpacity="0.09" strokeWidth="10" />
        <rect x="-12" y="544" width="28" height="360" fill="#000000" opacity="0.1" />
        <path d="M16 548V900" stroke={tone === 'blue' ? '#FFFFFF' : PAL.ink} strokeOpacity="0.55" strokeWidth="1" strokeDasharray="5 3" />
        <path d={SLEEVE} fill={u(idp, 'shade')} />
      </g>
      <path d={SLEEVE} fill="none" stroke="#000000" strokeOpacity={tone === 'white' ? 0.16 : 0.08} />
      <ellipse cx="2" cy="900" rx="14" ry="4" fill={PAL.ink} opacity="0.75" />
    </g>
  );
}

export const FLAGS = [
  { id: 'flag-blue', tone: 'blue', title: 'Feather flag, blue' },
  { id: 'flag-yellow', tone: 'yellow', title: 'Feather flag, yellow' },
  { id: 'flag-white', tone: 'white', title: 'Feather flag, white' },
];

export function FlagScene({ f }) {
  return (
    <Scene name={f.id} title={`${f.title}, sleeve lifted off the pole`} w={400} h={1040}>
      {(idp) => (
        <>
          <ShadowG idp={idp} cx={150} cy={1008} rx={120} ry={12} tone={f.tone === 'white' ? 'sky' : f.tone} opacity={0.4} />
          <g transform="translate(140 0)">
            <PatternDefs idp={idp} color={PAL.ink} opacity={0.14} />
            <AxisG points={[[0, 960], [0, 700], [0, 340], [0, 60]]} />
            <LayerG i={0}><Base idp={idp} /></LayerG>
            <LayerG i={1} dy={-60}><Pole idp={idp} /></LayerG>
            <LayerG i={2} dy={-520}><Sleeve idp={idp} tone={f.tone} /></LayerG>
          </g>
        </>
      )}
    </Scene>
  );
}

// Hanging banner, layers separated along y: rail with cables, the printed panel, the bottom pocket with its rod.
function Rail({ idp }) {
  return (
    <g>
      <path d="M70 120L220 26L370 120" fill="none" stroke={PAL.ink} strokeOpacity="0.7" strokeWidth="1.6" />
      <circle cx="220" cy="20" r="9" fill="none" stroke={u(idp, 'metal')} strokeWidth="3.4" />
      <rect x="52" y="118" width="336" height="10" rx="5" fill={u(idp, 'metal')} stroke="#8C8C8C" strokeWidth="0.6" />
      <rect x="56" y="119" width="328" height="2.6" fill="#FFFFFF" opacity="0.6" />
      {[52, 388].map((x) => <circle key={x} cx={x} cy="123" r="7" fill={u(idp, 'metal')} stroke="#8C8C8C" strokeWidth="0.6" />)}
    </g>
  );
}

function Panel({ idp }) {
  return (
    <g>
      <clipPath id={`${idp}-panel`}><rect x="70" y="130" width="300" height="630" /></clipPath>
      <rect x="70" y="130" width="300" height="630" transform="translate(6 8)" fill={PAL.blue} opacity="0.35" filter={u(idp, 'soft')} />
      <rect x="70" y="130" width="300" height="630" fill={PAL.blue} filter={u(idp, 'fabric')} />
      <g clipPath={`url(#${idp}-panel)`}>
        <TreesG x={70} y={130} w={300} h={630} count={8} tone="blue" seed={5} minSize={70} maxSize={150} clear={[0, 120, 300, 250]} />
        <LockupG x={96} y={172} size={44} fill="#FFFFFF" />
        <IsoSiteG x={70} y={260} scale={0.53} tone="blue" trees={false} />
        <text x="96" y="620" fontSize="46" fontWeight="300" fill="#FFFFFF">Smart</text>
        <text x="96" y="670" fontSize="46" fontWeight="300" fill="#FFFFFF">Construction</text>
        <rect x="70" y="130" width="300" height="34" fill="#000000" opacity="0.14" />
        <path d="M70 164H370" stroke="#FFFFFF" strokeOpacity="0.55" strokeDasharray="5 3" />
        <path d="M76 130V760M364 130V760" stroke="#FFFFFF" strokeOpacity="0.5" strokeDasharray="5 3" />
        <rect x="70" y="130" width="300" height="630" fill={u(idp, 'shade')} />
        <rect x="70" y="130" width="300" height="630" fill={u(idp, 'shade-v')} />
      </g>
      {[92, 348].map((x) => (
        <g key={x}>
          <circle cx={x} cy="147" r="8" fill={u(idp, 'metal')} stroke="#8C8C8C" strokeWidth="0.6" />
          <circle cx={x} cy="147" r="3.6" fill="#FFFFFF" />
        </g>
      ))}
    </g>
  );
}

function Rod({ idp }) {
  return (
    <g>
      <rect x="70" y="744" width="300" height="34" fill={PAL.blue} filter={u(idp, 'fabric')} />
      <rect x="70" y="744" width="300" height="34" fill="#000000" opacity="0.16" />
      <rect x="52" y="753" width="336" height="16" rx="8" fill={u(idp, 'metal')} stroke="#8C8C8C" strokeWidth="0.6" />
      <rect x="56" y="755" width="328" height="3" fill="#FFFFFF" opacity="0.6" />
      <rect x="52" y="753" width="336" height="16" rx="8" fill={u(idp, 'shade-v')} />
    </g>
  );
}

export function Banner() {
  return (
    <Scene name="banner" title="Hanging banner, layers separated along y" w={440} h={1050}>
      {(idp) => (
        <>
          <ShadowG idp={idp} cx={226} cy={1018} rx={170} ry={14} tone="blue" opacity={0.34} />
          <AxisG points={[[220, 60], [220, 420], [220, 970]]} />
          <LayerG i={0}><Rail idp={idp} /></LayerG>
          <LayerG i={1} dy={90}><Panel idp={idp} /></LayerG>
          <LayerG i={2} dy={190}><Rod idp={idp} /></LayerG>
        </>
      )}
    </Scene>
  );
}
