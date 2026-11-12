import Art from '@/components/art/Art';
import { GaugeG } from '@/components/art/KeyArt';
import { CORE } from '@/components/site/icons';
import { HEX } from '@/lib/brand';
import s from './icons.module.css';

const INK = HEX.ink;
const CARD = HEX.card;

// An icon placed at x, y at a size, inside an exportable SVG (the path is copied, no sprite reference).
function Ic({ name, x, y, size = 24, color = INK }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size / 24})`} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={CORE[name]} />
    </g>
  );
}

// The case study's own sets: the app rail (m01) and the floating tab bar (m09) carry the same five icons,
// the second (link) active.
const FIVE = ['layers', 'link', 'headset', 'gear', 'folder'];

function Rail() {
  return (
    <Art viewBox="0 0 96 520" title="App left rail: five icons with link active, then sign-out and the user tile" exportName="icons-use-rail" className={s.useSvg}>
      <defs>
        <linearGradient id="icons-use-who" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={HEX.blue} />
          <stop offset="1" stopColor={HEX.sky} />
        </linearGradient>
      </defs>
      <rect width="96" height="520" rx="6" fill={HEX.card} />
      {FIVE.map((name, i) => (
        <g key={name}>
          {i === 1 && <rect x="26" y={24 + i * 56} width="44" height="44" rx="4" fill={HEX.app} />}
          <Ic name={name} x={36} y={34 + i * 56} />
        </g>
      ))}
      <rect x="26" y="404" width="44" height="44" rx="4" fill={HEX.chip} />
      <Ic name="logout" x={36} y={414} />
      <rect x="26" y="456" width="44" height="44" rx="4" fill="url(#icons-use-who)" />
      <Ic name="user" x={36} y={466} color={HEX.white} />
    </Art>
  );
}

function TabBar() {
  const x0 = 20, tw = 64;
  return (
    <Art viewBox="0 0 360 100" title="Mobile floating tab bar: layers, link (active, yellow), headset, gear, folder" exportName="icons-use-tabbar" className={s.useSvg}>
      <rect width="360" height="100" rx="6" fill={HEX.card} />
      <rect x={x0} y="22" width={tw * 5} height="56" rx="6" fill={HEX.app} />
      {FIVE.map((name, i) => (
        <g key={name}>
          {i === 1 && <rect x={x0 + i * tw} y="22" width={tw} height="56" rx="4" fill={HEX.yellow} />}
          <Ic name={name} x={x0 + i * tw + 20} y={38} color={i === 1 ? HEX.white : INK} />
        </g>
      ))}
    </Art>
  );
}

function TopButtons() {
  return (
    <Art viewBox="0 0 140 80" title="Top right square buttons: briefcase and bell with a yellow dot" exportName="icons-use-topbar" className={s.useSvg}>
      <rect width="140" height="80" rx="6" fill={HEX.card} />
      <rect x="16" y="16" width="48" height="48" rx="4" fill={HEX.tile} />
      <Ic name="briefcase" x={28} y={28} />
      <rect x="76" y="16" width="48" height="48" rx="4" fill={HEX.tile} />
      <Ic name="bell" x={88} y={28} />
      <circle cx="109" cy="30" r="4" fill={HEX.yellow} />
    </Art>
  );
}

function CardHead() {
  return (
    <Art viewBox="0 0 340 236" title="Card header: Details with arrow-up-right, trend and quarter-arc gauge" exportName="icons-use-card" className={s.useSvg}>
      <defs>
        <clipPath id="icons-use-card-clip">
          <rect width="340" height="236" rx="4" />
        </clipPath>
      </defs>
      <rect width="340" height="236" rx="4" fill={CARD} />
      <g clipPath="url(#icons-use-card-clip)">
        <GaugeG w={340} h={236} r={120} value={0.76} tone="blue" />
      </g>
      <text x="24" y="42" fontSize="20" fontWeight="500" fill={INK}>Details</text>
      <Ic name="arrow-up-right" x={296} y={22} size={20} />
      <text x="24" y="168" fontSize="13" fill={INK}>+2.4%</text>
      <path d="M68 166l6-9 6 9Z" fill="#FFB83D" />
      <text x="24" y="212" fontSize="40" fontWeight="300" fill={INK}>76%</text>
    </Art>
  );
}

const ITEMS = [
  { id: 'rail', title: 'Left rail', note: 'Five icons, the active one filled darker; sign-out and user below', Art: Rail },
  { id: 'tabs', title: 'Floating tab bar', note: 'The same five icons, the active one yellow', Art: TabBar },
  { id: 'top', title: 'Top right buttons', note: 'Briefcase and bell as square buttons', Art: TopButtons },
  { id: 'card', title: 'Card header', note: 'Arrow-up-right, trend line and figure', Art: CardHead },
];

export default function InUse() {
  return (
    <div className={s.uses}>
      {ITEMS.map(({ id, title, note, Art: Comp }) => (
        <figure className={s.use} key={id} style={{ margin: 0 }}>
          <div className={s.useArt}><Comp /></div>
          <figcaption>
            <span className="t-title" style={{ display: 'block' }}>{title}</span>
            <span className="t-small">{note}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
