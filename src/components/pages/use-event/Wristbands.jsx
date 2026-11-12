import { MarkG, WordmarkG } from '@/components/art/Mark';
import { PatternDefs } from '@/components/art/KeyArt';
import { LayerG, AxisG, ShadowG } from '@/components/art/Mockup';
import { ruler } from '@/lib/charts';
import { Scene, PAL, u } from './parts';

// Top view. A band lies as one rung of a ladder; its lock pieces are pulled off to the right along the x axis.
const BAND = 'M56 68H600V132H40Z';
const Y = 68;

function FabricArt({ idp, art }) {
  const clip = `${idp}-clip`;
  return (
    <g>
      <clipPath id={clip}><path d={BAND} /></clipPath>
      <g clipPath={`url(#${clip})`}>
        {art === 'marks' && <rect x="40" y={Y} width="560" height="64" fill={u(idp, 'pat-marks')} transform="translate(0 0)" />}
        {art === 'rings' && <rect x="40" y={Y} width="560" height="64" fill={u(idp, 'pat-fuse')} />}
        {art === 'ticks' && (
          <g>
            <rect x="250" y={Y} width="130" height="64" fill={PAL.yellow} opacity="0.9" />
            <path d={ruler(70, 560).map((x, i) => `M${x + 40} ${Y + 64}v${i % 5 === 0 ? -30 : i % 2 ? -12 : -19}`).join('')} stroke={PAL.blue} strokeWidth="1.6" />
            <path d={ruler(70, 560).map((x, i) => `M${x + 40} ${Y}v${i % 5 === 0 ? 24 : 11}`).join('')} stroke={PAL.ink} strokeWidth="1" opacity="0.5" />
          </g>
        )}
        {art === 'word' && [0, 1, 2, 3, 4].map((i) => <WordmarkG key={i} x={64 + i * 114} y={Y + 42} size={34} fill="#FFFFFF" />)}
      </g>
    </g>
  );
}

function FabricBand({ idp, tone, art }) {
  const base = tone === 'white' ? '#FFFFFF' : PAL[tone];
  const pat = tone === 'yellow' ? PAL.ink : '#FFFFFF';
  return (
    <g>
      <PatternDefs idp={idp} color={pat} opacity={tone === 'yellow' ? 0.35 : 0.9} />
      <path d={BAND} transform="translate(4 7)" fill={PAL.sky} opacity="0.45" filter={u(idp, 'soft')} />
      <path d={BAND} fill={base} filter={u(idp, 'fabric')} />
      <FabricArt idp={idp} art={art} />
      <path d={`M60 ${Y + 6}H596M48 ${Y + 58}H596`} stroke={tone === 'yellow' || tone === 'white' ? PAL.ink : '#FFFFFF'} strokeOpacity="0.45" strokeWidth="1" strokeDasharray="5 3" />
      <path d={BAND} fill={u(idp, 'shade-v')} />
      <path d={BAND} fill="none" stroke="#000000" strokeOpacity={tone === 'white' ? 0.14 : 0.08} />
      <path d={`M58 ${Y + 1}H598`} stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="1.4" />
    </g>
  );
}

// Lock base: white plastic, strap slot, two pegs. Cap: brushed metal with the mark pressed in.
function LockBase({ idp }) {
  return (
    <g>
      <rect x="578" y="58" width="68" height="84" rx="9" transform="translate(4 7)" fill={PAL.sky} opacity="0.45" filter={u(idp, 'soft')} />
      <rect x="578" y="58" width="68" height="84" rx="9" fill={u(idp, 'plastic')} stroke="#CFCFCF" />
      <rect x="590" y="90" width="44" height="20" rx="5" fill="#9E9E9E" />
      <rect x="590" y="90" width="44" height="6" rx="3" fill="#000000" opacity="0.25" />
      {[70, 130].map((y) => <circle key={y} cx="612" cy={y} r="5" fill="#E4E4E4" stroke="#BDBDBD" />)}
      <path d="M581 66V134" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
      <rect x="578" y="58" width="68" height="84" rx="9" fill={u(idp, 'shade')} />
    </g>
  );
}

function LockCap({ idp }) {
  return (
    <g>
      <rect x="580" y="66" width="64" height="68" rx="7" transform="translate(4 7)" fill={PAL.sky} opacity="0.45" filter={u(idp, 'soft')} />
      <rect x="580" y="66" width="64" height="68" rx="7" fill={u(idp, 'metal')} stroke="#9A9A9A" strokeWidth="0.8" />
      <MarkG x={597} y={83} size={30} fill="#2F2F2F" opacity="0.4" />
      {[74, 126].map((y) => <circle key={y} cx="612" cy={y} r="3" fill="#8C8C8C" />)}
      <rect x="580" y="66" width="64" height="68" rx="7" fill={u(idp, 'glass')} opacity="0.7" />
    </g>
  );
}

function Locks({ idp, i0 }) {
  return (
    <>
      <LayerG i={i0} dx={140}><LockBase idp={idp} /></LayerG>
      <LayerG i={i0 + 1} dx={270}><LockCap idp={idp} /></LayerG>
    </>
  );
}

export const FABRIC = [
  { id: 'fabric-marks', tone: 'blue', art: 'marks', title: 'Fabric wristband, repeated mark' },
  { id: 'fabric-rings', tone: 'yellow', art: 'rings', title: 'Fabric wristband, three-circle pattern' },
  { id: 'fabric-ticks', tone: 'white', art: 'ticks', title: 'Fabric wristband, tick ruler' },
  { id: 'fabric-word', tone: 'ink', art: 'word', title: 'Fabric wristband, Tectra word' },
];

export function FabricScene({ f }) {
  return (
    <Scene name={f.id} title={f.title} w={960} h={200}>
      {(idp) => (
        <>
          <ShadowG idp={idp} cx={420} cy={150} rx={330} ry={10} tone={f.tone === 'yellow' ? 'yellow' : 'blue'} opacity={0.3} />
          <AxisG points={[[330, 100], [750, 100], [880, 100]]} />
          <LayerG i={0}><FabricBand idp={idp} tone={f.tone} art={f.art} /></LayerG>
          <Locks idp={idp} i0={1} />
        </>
      )}
    </Scene>
  );
}

// Silicone: a moulded band with a raised rim, holes along the tail and a debossed word-mark.
const SIL = 'M30 78Q30 68 40 68H574Q614 68 614 100Q614 132 574 132H40Q30 132 30 122Z';

function SiliconeBand({ idp, tone }) {
  const col = PAL[tone];
  const dark = tone === 'ink';
  return (
    <g>
      <path d={SIL} transform="translate(5 8)" fill={PAL[tone === 'ink' ? 'blue' : tone]} opacity="0.35" filter={u(idp, 'soft')} />
      <path d={SIL} fill={dark ? u(idp, 'rubber') : col} />
      <path d={SIL} fill={u(idp, 'shade-v')} />
      <rect x="44" y="76" width="540" height="48" rx="22" fill="none" stroke="#000000" strokeOpacity="0.16" strokeWidth="1.5" />
      <rect x="45" y="77" width="540" height="48" rx="22" fill="none" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <circle cx={74 + i * 26} cy="100" r="6.5" fill="#FFFFFF" />
          <circle cx={74 + i * 26} cy="100" r="6.5" fill="none" stroke="#000000" strokeOpacity="0.25" />
        </g>
      ))}
      <g transform="translate(230 0)">
        <WordmarkG x={1.2} y={113.2} size={44} fill="#FFFFFF" opacity="0.5" />
        <WordmarkG x={0} y={112} size={44} fill="#000000" opacity="0.32" />
        <MarkG x={178} y={80} size={38} fill="#FFFFFF" opacity="0.5" transform="translate(1.2 1.2)" />
        <MarkG x={178} y={80} size={38} fill="#000000" opacity="0.32" />
      </g>
      <path d="M44 70H570" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1.6" strokeLinecap="round" />
    </g>
  );
}

function SiliconeLock({ idp, tone, cap }) {
  const col = PAL[tone];
  return (
    <g>
      <rect x="590" y="62" width="60" height="76" rx={cap ? 30 : 10} transform="translate(4 7)" fill={PAL[tone === 'ink' ? 'blue' : tone]} opacity="0.35" filter={u(idp, 'soft')} />
      <rect x="590" y="62" width="60" height="76" rx={cap ? 30 : 10} fill={tone === 'ink' ? u(idp, 'rubber') : col} />
      {cap ? <circle cx="620" cy="100" r="16" fill="#000000" opacity="0.18" /> : [82, 118].map((y) => <circle key={y} cx="620" cy={y} r="7" fill="#000000" opacity="0.22" />)}
      <rect x="590" y="62" width="60" height="76" rx={cap ? 30 : 10} fill={u(idp, 'shade')} />
      <path d="M598 70V130" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

export const SILICONE = [
  { id: 'silicone-blue', tone: 'blue', title: 'Silicone wristband, blue' },
  { id: 'silicone-yellow', tone: 'yellow', title: 'Silicone wristband, yellow' },
  { id: 'silicone-ink', tone: 'ink', title: 'Silicone wristband, ink' },
];

export function SiliconeScene({ f }) {
  return (
    <Scene name={f.id} title={f.title} w={960} h={200}>
      {(idp) => (
        <>
          <ShadowG idp={idp} cx={420} cy={152} rx={330} ry={10} tone={f.tone === 'ink' ? 'blue' : f.tone} opacity={0.3} />
          <AxisG points={[[330, 100], [750, 100], [880, 100]]} />
          <LayerG i={0}><SiliconeBand idp={idp} tone={f.tone} /></LayerG>
          <LayerG i={1} dx={140}><SiliconeLock idp={idp} tone={f.tone} /></LayerG>
          <LayerG i={2} dx={270}><SiliconeLock idp={idp} tone={f.tone} cap /></LayerG>
        </>
      )}
    </Scene>
  );
}
