import Art from '@/components/art/Art';
import { LockupG, MarkG, MarkWindowG } from '@/components/art/Mark';
import { IsoSiteG, CraneG, TreesG, PatternDefs } from '@/components/art/KeyArt';
import { BackdropG, ShadowG, MaterialDefs, LayerG, AxisG, CalloutG, SheenG } from '@/components/art/Mockup';
import { BILLBOARD } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { Ground, BlueDefs, QrG, Bolt, Lines, finGrey } from './parts';

const P = 'use-world-bb';
const FACE = { x: 350, y: 110, w: 900, h: 400 };

// A ribbed collar: fins that flare from one width to another. up = wide at the top.
function Collar({ cx, y, topW, botW, h, n }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const u0 = i / n, u1 = (i + 1) / n;
        const pts = [
          [cx - topW / 2 + topW * u0, y],
          [cx - topW / 2 + topW * u1, y],
          [cx - botW / 2 + botW * u1, y + h],
          [cx - botW / 2 + botW * u0, y + h],
        ];
        return <path key={i} d={'M' + pts.map((p) => `${r2(p[0])} ${r2(p[1])}`).join('L') + 'Z'} fill={finGrey(u0, i)} stroke="#6A6A6A" strokeWidth="0.5" />;
      })}
      <path d={`M${cx - topW / 2} ${y}H${cx + topW / 2}`} stroke="#FFFFFF" strokeWidth="1.4" opacity="0.6" />
      <rect x={cx - botW / 2} y={y + h - 3} width={botW} height="3" fill="#4A4A4A" opacity="0.5" />
    </g>
  );
}

function Column() {
  const cx = 800;
  return (
    <g>
      <rect x={cx - 62} y="636" width="124" height="150" fill={`url(#${P}-cyl)`} />
      <rect x={cx - 62} y="636" width="124" height="150" fill={`url(#${P}-shade)`} />
      <rect x={cx - 38} y="636" width="8" height="150" fill="#FFFFFF" opacity="0.4" />
      <path d={`M${cx - 62} 736H${cx + 62}M${cx - 62} 640H${cx + 62}`} stroke="#6A6A6A" strokeWidth="1" opacity="0.5" />
      <Collar cx={cx} y={588} topW={214} botW={124} h={50} n={18} />
      <Collar cx={cx} y={692} topW={124} botW={216} h={46} n={18} />
      <rect x={cx - 118} y="786" width="236" height="12" rx="2" fill={`url(#${P}-metal)`} />
      <rect x={cx - 118} y="786" width="236" height="12" rx="2" fill={`url(#${P}-shade-v)`} />
      {[-96, -56, 56, 96].map((dx) => (
        <Bolt key={dx} x={cx + dx} y={792} r={3.6} />
      ))}
    </g>
  );
}

function Frame() {
  const { x, y, w, h } = FACE;
  const top = [350, 1250], bot = [680, 920];
  const n = 12;
  const warren = Array.from({ length: n }, (_, k) => {
    const t0 = top[0] + ((top[1] - top[0]) * k) / n, b0 = bot[0] + ((bot[1] - bot[0]) * k) / n;
    const b1 = bot[0] + ((bot[1] - bot[0]) * (k + 1)) / n;
    return `M${r2(t0)} 522L${r2(b0)} 598M${r2(t0)} 522L${r2(b1)} 598`;
  }).join('');
  return (
    <g>
      <rect x={x - 10} y={y - 10} width={w + 20} height={h + 20} fill={`url(#${P}-metal)`} />
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x={x + 40 + i * 100} y={y + 8} width="7" height={h - 16} fill="#8A8A8A" opacity="0.55" />
      ))}
      <path d={`M${x - 10} ${y + 330}H${x + w + 10}M${x - 10} ${y + 360}H${x + w + 10}`} stroke="#6A6A6A" strokeWidth="1.4" opacity="0.6" />
      <rect x={x - 10} y={y - 10} width={w + 20} height={h + 20} fill={`url(#${P}-shade)`} />
      <path d={`M${x - 10} ${y - 10}H${x + w + 10}`} stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />
      <path d="M340 510H1260L930 600H670Z" fill={`url(#${P}-metal-dark)`} />
      <path d={warren} stroke="#B4B4B4" strokeWidth="1.6" fill="none" />
      <path d="M680 598H920" stroke="#D8D8D8" strokeWidth="3" />
      <rect x="340" y="510" width="920" height="14" fill={`url(#${P}-metal)`} />
      <path d="M340 510H1260L930 600H670Z" fill={`url(#${P}-shade)`} opacity="0.7" />
      {Array.from({ length: 19 }, (_, i) => (
        <Bolt key={i} x={360 + i * 48.9} y={517} r={3.2} />
      ))}
      <path d="M340 524L670 600M1260 524L930 600" stroke="#6A6A6A" strokeWidth="1" />
    </g>
  );
}

function Posting() {
  const { x, y, w, h } = FACE;
  const d = `M${x} ${y}h${w}v${h}h${-w}z`;
  const w6 = BILLBOARD.title.split(' ');
  const l = [w6.slice(0, 2).join(' '), w6.slice(2, 5).join(' '), w6.slice(5).join(' ')];
  return (
    <g className="mock-lit">
      <clipPath id={`${P}-face`}>
        <path d={d} />
      </clipPath>
      <g clipPath={`url(#${P}-face)`}>
        <rect x={x} y={y} width={w} height={h} fill={`url(#${P}-field)`} filter={`url(#${P}-paper)`} />
        <rect x={x} y={y} width="150" height={h} fill={`url(#${P}-deep)`} />
        <rect x={x} y={y} width="150" height={h} fill={`url(#${P}-pat-ticks)`} />
        <TreesG x={x - 10} y={y + 60} w={160} h={340} count={4} tone="blue" seed={21} minSize={50} maxSize={90} />
        <MarkWindowG idp={`${P}-win`} x={505} y={126} size={360}>
          <rect width="100" height="100" fill={`url(#${P}-sky)`} />
          <g transform="translate(-9 22) scale(0.205)">
            <IsoSiteG tone="paper" pins={['ridge']} trees={false} />
          </g>
          <CraneG x={66} y={2} scale={0.105} />
        </MarkWindowG>
        <LockupG x={1084} y={142} size={40} fill="#FFFFFF" />
        <Lines lines={l} x={880} y={352} size={31} lh={38} fill="#FFFFFF" weight="300" />
        <Lines
          lines={['Streamline your project management, enhance team efficiency,', 'and reduce delays with Tectra — the mobile-first solution for', 'modern construction.']}
          x={880}
          y={456}
          size={11}
          lh={15}
          fill="#FFFFFF"
          weight="300"
        />
        <QrG x={512} y={430} size={52} seed={17} />
        <rect x={x} y={y} width={w} height={h} fill={`url(#${P}-glow)`} opacity="0.5" />
      </g>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke="#FFFFFF" strokeWidth="1.4" opacity="0.5" />
      <SheenG idp={P} d={d} opacity={0.5} />
    </g>
  );
}

export default function Billboard() {
  return (
    <Art viewBox="0 0 1600 900" title="Billboard, exploded: posting, frame and column" exportName="use-world-billboard">
      <MaterialDefs idp={P} />
      <BlueDefs idp={P} />
      <PatternDefs idp={P} color="#FFFFFF" opacity={0.28} />
      <BackdropG w={1600} h={900} />
      <Ground y={848} />
      <ShadowG idp={`${P}-s1`} cx={800} cy={848} rx={300} ry={18} tone="blue" opacity={0.32} />
      <ShadowG idp={`${P}-s2`} cx={900} cy={570} rx={380} ry={26} tone="sky" opacity={0.3} blur={14} />
      <AxisG points={[[1330, 220], [1330, 480], [1330, 760]]} />
      <CalloutG x={1262} y={220} tx={1330} ty={220} label="Posting" />
      <CalloutG x={1262} y={480} tx={1330} ty={480} label="Frame" />
      <CalloutG x={862} y={760} tx={1330} ty={760} label="Column" />
      <LayerG i={2} dy={50}>
        <Column />
      </LayerG>
      <LayerG i={1}>
        <Frame />
      </LayerG>
      <LayerG i={0} dy={-90}>
        <Posting />
      </LayerG>
    </Art>
  );
}
