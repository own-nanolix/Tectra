import Art from '@/components/art/Art';
import { GaugeG } from '@/components/art/KeyArt';
import { CORE } from '@/components/site/icons';
import s from './icons.module.css';

const INK = '#2F2F2F';
const APP = '#DDDDDD';
const CARD = '#E9E9E9';

// An icon placed at x, y at a size, inside an exportable SVG (the path is copied, no sprite reference).
function Ic({ name, x, y, size = 24, color = INK }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size / 24})`} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={CORE[name]} />
    </g>
  );
}

const RAIL = ['layers', 'link', 'headset', 'gear', 'folder'];
const TABS = ['home', 'layers', 'note', 'chart', 'user'];

function Rail() {
  return (
    <Art viewBox="0 0 96 372" title="App left rail: five icons, link active, with sign-out and user" exportName="icons-use-rail" className={s.useSvg}>
      <rect width="96" height="372" rx="6" fill={APP} />
      {RAIL.map((name, i) => (
        <g key={name}>
          <rect x="26" y={20 + i * 52} width="44" height="44" rx="4" fill={i === 1 ? '#C2C2C2' : CARD} />
          <Ic name={name} x={36} y={30 + i * 52} />
        </g>
      ))}
      <rect x="26" y="262" width="44" height="44" rx="4" fill={CARD} />
      <Ic name="logout" x={36} y={272} />
      <rect x="26" y="314" width="44" height="44" rx="4" fill={CARD} />
      <Ic name="user" x={36} y={324} />
    </Art>
  );
}

function TabBar() {
  return (
    <Art viewBox="0 0 360 100" title="Mobile floating tab bar: five icons, second tab active in yellow" exportName="icons-use-tabbar" className={s.useSvg}>
      <rect width="360" height="100" rx="6" fill={APP} />
      <rect x="20" y="18" width="320" height="64" rx="6" fill="#F5F5F5" />
      {TABS.map((name, i) => (
        <g key={name}>
          {i === 1 && <rect x={38 + i * 58} y="28" width="52" height="44" rx="4" fill="#FFB83D" />}
          <Ic name={name} x={52 + i * 58} y={38} />
        </g>
      ))}
    </Art>
  );
}

function TopButtons() {
  return (
    <Art viewBox="0 0 140 80" title="Top right square buttons: briefcase and bell with a yellow dot" exportName="icons-use-topbar" className={s.useSvg}>
      <rect width="140" height="80" rx="6" fill={APP} />
      <rect x="16" y="16" width="48" height="48" rx="4" fill="#EFEFEF" />
      <Ic name="briefcase" x={28} y={28} />
      <rect x="76" y="16" width="48" height="48" rx="4" fill="#EFEFEF" />
      <Ic name="bell" x={88} y={28} />
      <circle cx="109" cy="30" r="4" fill="#FFB83D" />
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
  { id: 'rail', title: 'Left rail', note: 'Five icons, the active one filled darker', Art: Rail },
  { id: 'tabs', title: 'Floating tab bar', note: 'Five tabs, the active one yellow', Art: TabBar },
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
