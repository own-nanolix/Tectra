// Six key-art plates built from the brand's own geometry: the mark, the isometric site, line trees,
// the tick-bar instrument, the crane, pins and rulers.
import Art from '@/components/art/Art';
import { MarkG, MarkWindowG, LockupG, WordmarkG } from '@/components/art/Mark';
import { IsoSiteG, TreesG, TickBarsG, CraneG, PinG, PatternDefs } from '@/components/art/KeyArt';
import { polar } from '@/lib/charts';
import { HERO } from '@/lib/brand';
import { Linear, GrainDefs, Plate, gradById } from './kit';
import s from './gradients.module.css';

const FIELD = gradById('field').stops;

// 1. Giant fused circles cropped off the blue field, the site drawn inside the body.
function Fused() {
  return (
    <Art viewBox="0 0 1200 800" title="Fused circles cropped off the blue field, with the site drawn inside" exportName="gradients-key-fused">
      <defs>
        <Linear id="gradients-k1-g" w={1200} h={800} deg={160} stops={FIELD} />
        <GrainDefs id="gradients-k1-grain" amount={0.5} />
      </defs>
      <rect width="1200" height="800" fill="url(#gradients-k1-g)" />
      <MarkWindowG idp="gradients-k1" x={300} y={-150} size={1100}>
        <rect width="100" height="100" fill="#FAFAFA" />
        <IsoSiteG x={-8} y={4} scale={0.2} tone="paper" pins={['ridge', 'wing']} trees={false} />
        <rect x="60" y="0" width="40" height="40" fill="#4093EC" />
        <PinG x={81.2} y={19.2} r={4.6} tone="yellow" />
      </MarkWindowG>
      <rect width="1200" height="800" fill="#000000" filter="url(#gradients-k1-grain)" />
    </Art>
  );
}

// 2. A horizon of tick bars under line trees.
function Horizon() {
  return (
    <Art viewBox="0 0 1800 600" title="A horizon of tick bars under line trees" exportName="gradients-key-horizon">
      <defs><Linear id="gradients-k2-g" w={1800} h={600} deg={160} stops={FIELD} /></defs>
      <rect width="1800" height="600" fill="url(#gradients-k2-g)" />
      <TreesG x={0} y={-40} w={1800} h={400} count={14} tone="blue" seed={11} minSize={110} maxSize={190} />
      <path d="M0 372H1800" stroke="#0A3D91" strokeWidth="1.2" />
      <TickBarsG idp="gradients-k2" x={0} y={372} w={1800} h={150} count={90} from={0.55} to={0.7} tone="yellow" base="#FFFFFF" />
    </Art>
  );
}

// 3. The mark as a row of three windows.
function Windows() {
  const x = [90, 580, 1070];
  return (
    <Art viewBox="0 0 1600 900" title="The mark as a row of windows: line trees, tick bars, the crane" exportName="gradients-key-windows">
      <defs>
        <Linear id="gradients-k3-g" w={100} h={100} deg={160} stops={FIELD} />
        <linearGradient id="gradients-k3-yellow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFB83D" /><stop offset="1" stopColor="#FFB83D" stopOpacity="0.55" /></linearGradient>
      </defs>
      <rect width="1600" height="900" fill="#F5F5F5" />
      <MarkWindowG idp="gradients-k3a" x={x[0]} y={230} size={440}>
        <rect width="100" height="100" fill="url(#gradients-k3-g)" />
        <g transform="scale(0.2)"><TreesG w={500} h={500} count={8} tone="blue" seed={5} /></g>
      </MarkWindowG>
      <MarkWindowG idp="gradients-k3b" x={x[1]} y={230} size={440}>
        <rect width="100" height="100" fill="#FAFAFA" />
        <g transform="translate(6 18) scale(0.15)"><TickBarsG idp="gradients-k3b" w={600} h={380} count={30} from={0.3} to={0.6} /></g>
      </MarkWindowG>
      <MarkWindowG idp="gradients-k3c" x={x[2]} y={230} size={440}>
        <rect width="100" height="100" fill="url(#gradients-k3-yellow)" />
        <g transform="translate(12 -2) scale(0.32)"><CraneG color="#FFFFFF" dark="#0A2E63" /></g>
      </MarkWindowG>
      <path d="M90 780H1510" stroke="#DFDFDF" />
      <LockupG x={90} y={80} size={72} fill="#2F2F2F" markFill="#4093EC" />
    </Art>
  );
}

// 4. Concentric survey rings around a pin.
function Rings() {
  const c = 500;
  const rings = [90, 170, 250, 330, 410, 480];
  const ticks = Array.from({ length: 72 }, (_, i) => i * 5);
  const pins = [[205, 250, 'white'], [20, 410, 'white']];
  return (
    <Art viewBox="0 0 1000 1000" title="Concentric survey rings around a pin" exportName="gradients-key-rings">
      <defs><Linear id="gradients-k4-g" w={1000} h={1000} deg={160} stops={FIELD} /></defs>
      <rect width="1000" height="1000" fill="url(#gradients-k4-g)" />
      <g fill="none" stroke="#FFFFFF">
        {rings.map((r, i) => <circle key={r} cx={c} cy={c} r={r} strokeWidth="1.2" strokeOpacity={0.75 - i * 0.1} strokeDasharray={i % 2 ? '2 8' : undefined} />)}
        <path d={`M${c} 20V980M20 ${c}H980`} strokeWidth="1" strokeOpacity="0.35" />
      </g>
      <path d={ticks.map((a) => { const p = polar(c, c, 480, a), q = polar(c, c, a % 15 === 0 ? 456 : 468, a); return `M${p[0]} ${p[1]}L${q[0]} ${q[1]}`; }).join('')} stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.8" />
      {pins.map(([deg, r, tone], i) => {
        const p = polar(c, c, r === 410 ? 330 : 170, deg);
        return <PinG key={i} x={p[0]} y={p[1]} r={11} tone={tone} />;
      })}
      <circle cx={c} cy={c} r="40" fill="#FFB83D" opacity="0.28" />
      <PinG x={c} y={c} r={24} tone="yellow" />
    </Art>
  );
}

// 5. A site read like an instrument: the building above its own tick bars.
function Instrument() {
  return (
    <Art viewBox="0 0 800 1000" title="The isometric site above a tick-bar instrument" exportName="gradients-key-instrument">
      <rect width="800" height="1000" fill="#FAFAFA" />
      <IsoSiteG x={36} y={50} scale={1.3} tone="paper" pins={['ridge']} yellowPin="komatsu" seed={3} />
      <path d="M36 610H764" stroke="#DFDFDF" />
      <TickBarsG idp="gradients-k5" x={36} y={640} w={728} h={170} count={48} from={0.33} to={0.6} />
      <LockupG x={36} y={900} size={56} fill="#2F2F2F" markFill="#4093EC" />
    </Art>
  );
}

// 6. Tall: the crane over the fusing circle pattern, with the hero line.
function Crane() {
  return (
    <Art viewBox="0 0 600 1000" title="The crane over the fusing circles" exportName="gradients-key-crane">
      <PatternDefs idp="gradients-k6" color="#FFFFFF" opacity={0.28} />
      <defs><Linear id="gradients-k6-g" w={600} h={1000} deg={160} stops={FIELD} /></defs>
      <rect width="600" height="1000" fill="url(#gradients-k6-g)" />
      <rect width="600" height="1000" fill="url(#gradients-k6-pat-fuse)" />
      {HERO.title.map((t, i) => <text key={t} x="44" y={104 + i * 68} fontSize="64" fontWeight="300" fill="#FFFFFF">{t}</text>)}
      <CraneG x={110} y={250} scale={2.1} />
      <TreesG x={0} y={780} w={600} h={220} count={6} tone="blue" seed={9} minSize={60} maxSize={110} />
      <WordmarkG x={44} y={960} size={44} fill="#FFFFFF" />
    </Art>
  );
}

export default function KeyPlates() {
  return (
    <div className={s.wall}>
      <Plate span={7} name="Fused" spec="1200 x 800, 3:2"><Fused /></Plate>
      <Plate span={5} name="Rings" spec="1000 x 1000, 1:1"><Rings /></Plate>
      <Plate span={12} name="Horizon" spec="1800 x 600, 3:1"><Horizon /></Plate>
      <Plate span={4} name="Instrument" spec="800 x 1000, 4:5"><Instrument /></Plate>
      <Plate span={3} name="Crane" spec="600 x 1000, 3:5"><Crane /></Plate>
      <Plate span={5} name="Windows" spec="1600 x 900, 16:9"><Windows /></Plate>
    </div>
  );
}
