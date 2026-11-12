import Art from '@/components/art/Art';
import { AppIconG } from '@/components/art/Mark';
import { IsoSiteG, PinG, GaugeG } from '@/components/art/KeyArt';
import { HEX, HERO, WORKCARD, KPI } from '@/lib/brand';
import { contrast } from '@/lib/site';

// Where each colour goes, drawn from the case study's own screens: the landing hero on Field Blue (m12) and two
// app cards on the grey app background (m01). Callouts name the colour and its hex.
const W = 1600;
const H = 640;

// A tag next to the colour it names: a short leader from the point, then a paper tile with swatch, name and hex.
function Callout({ x, y, bx, by, name, hex, i = 0 }) {
  const light = contrast(hex, HEX.paper) < 1.3;
  const lx = bx > x ? bx : bx + 176;
  return (
    <g className="fade-in" style={{ '--i': 6 + i }}>
      <path d={`M${x} ${y}L${lx} ${by + 22}`} stroke={HEX.ink} strokeWidth="1" fill="none" />
      <circle cx={x} cy={y} r="4" fill={HEX.ink} stroke={HEX.paper} strokeWidth="1.5" />
      <rect x={bx} y={by} width="176" height="44" rx="4" fill={HEX.paper} />
      <rect x={bx + 10} y={by + 11} width="22" height="22" rx="4" fill={hex} stroke={light ? HEX.app : 'none'} />
      <text x={bx + 42} y={by + 20} fontSize="14" fontWeight="500" fill={HEX.ink}>{name}</text>
      <text x={bx + 42} y={by + 36} fontSize="12" fontWeight="400" fill={HEX.muted}>{hex}</text>
    </g>
  );
}

function AppCard({ x, y, k, tone, value }) {
  const up = k.dir === 'up';
  return (
    <g transform={`translate(${x} ${y})`}>
      <clipPath id={`color-inuse-${k.label.toLowerCase()}`}><rect width="340" height="236" rx="4" /></clipPath>
      <rect width="340" height="236" rx="4" fill={HEX.card} />
      <text x="24" y="44" fontSize="20" fontWeight="500" fill={HEX.ink}>{k.label}</text>
      <text x="24" y="98" fontSize="13" fontWeight="400" fill={HEX.ink}>{k.trend}</text>
      <path d={up ? 'M74 95l5 -8l5 8z' : 'M74 88l5 8l5 -8z'} fill={up ? HEX.yellow : HEX.red} />
      <text x="24" y="146" fontSize="40" fontWeight="300" fill={HEX.ink}>{k.value}</text>
      <g clipPath={`url(#color-inuse-${k.label.toLowerCase()})`}>
        <GaugeG w={340} h={236} r={120} value={value} tone={tone} draw />
      </g>
    </g>
  );
}

export default function InUse() {
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Colour in use: the landing hero on Field Blue and two app cards on the grey app background, each colour named with its hex" exportName="color-in-use">
      <rect width={W} height={H} rx="6" fill={HEX.paper} />

      {/* the hero on Field Blue */}
      <g>
        <rect x="40" y="40" width="900" height="560" rx="6" fill={HEX.field} />
        <IsoSiteG x={420} y={170} scale={0.95} tone="blue" pins={['ridge', 'wing']} yellowPin="workcard" seed={9} />
        <AppIconG x={72} y={72} size={52} radius={6} />
        <text x="72" y="220" fontSize="64" fontWeight="300" fill={HEX.white} letterSpacing="-0.6">{HERO.title[0]}</text>
        <text x="72" y="290" fontSize="64" fontWeight="300" fill={HEX.white} letterSpacing="-0.6">{HERO.title[1]}</text>
        <rect x="72" y="420" width="132" height="50" rx="4" fill={HEX.yellow} />
        <text x="138" y="451" textAnchor="middle" fontSize="16" fontWeight="400" fill={HEX.ink}>{HERO.cta[0]}</text>
        <rect x="214" y="420" width="140" height="50" rx="4" fill={HEX.sky} />
        <text x="284" y="451" textAnchor="middle" fontSize="16" fontWeight="400" fill={HEX.ink}>{HERO.cta[1]}</text>
        <g>
          <rect x="660" y="88" width="220" height="120" rx="4" fill={HEX.white} opacity="0.22" />
          <text x="680" y="122" fontSize="16" fontWeight="500" fill={HEX.white}>{WORKCARD.name}</text>
          <text x="680" y="144" fontSize="12" fontWeight="400" fill={HEX.white}>{WORKCARD.dates}</text>
          <text x="680" y="188" fontSize="30" fontWeight="300" fill={HEX.white}>{WORKCARD.value}</text>
          <PinG x={856} y={186} r={8} tone="yellow" />
        </g>
      </g>

      {/* two app cards on the app background */}
      <rect x="980" y="40" width="580" height="560" rx="6" fill={HEX.app} />
      <AppCard x={1000} y={66} k={KPI.details} tone="blue" value={0.76} />
      <AppCard x={1200} y={340} k={KPI.notes} tone="yellow" value={0.64} />

      <Callout x={60} y={575} bx={90} by={540} name="Field Blue" hex={HEX.field} i={0} />
      <Callout x={138} y={470} bx={110} by={486} name="Signal Yellow" hex={HEX.yellow} i={1} />
      <Callout x={300} y={470} bx={320} by={486} name="Sky" hex={HEX.sky} i={2} />
      <Callout x={268} y={200} bx={300} by={130} name="White" hex={HEX.white} i={3} />
      <Callout x={735} y={410} bx={740} by={520} name="Structure Blue" hex={HEX.deep} i={4} />
      <Callout x={1290} y={110} bx={1360} by={86} name="Card" hex={HEX.card} i={5} />
      <Callout x={1279} y={436} bx={1360} by={356} name="Alert Red" hex={HEX.red} i={6} />
      <Callout x={990} y={322} bx={1004} by={334} name="App grey" hex={HEX.app} i={7} />
    </Art>
  );
}
