import Art from '@/components/art/Art';
import { IconUse } from '@/components/site/Icon';
import { MarkG } from '@/components/art/Mark';
import { GaugeG } from '@/components/art/KeyArt';
import { HEX, KPI, FAQ, CUT_FILL } from '@/lib/brand';
import { MarkersG, RangeChartG } from './Charts';

// Component specimens as exportable SVG, each with its states. Units are the 390-wide phone screen.
const ID = 'mobile-b-spec';

const T = ({ x, y, children, size = 14, w = 400, fill = HEX.ink, anchor }) => (
  <text x={x} y={y} fontSize={size} fontWeight={w} fill={fill} textAnchor={anchor}>{children}</text>
);
const Cap = ({ x = 24, y, children }) => <T x={x} y={y} size={12} fill={HEX.muted}>{children}</T>;
const Plate = ({ w = 390, h, fill = HEX.app }) => <rect width={w} height={h} fill={fill} />;
const Ic = ({ name, x, y, size = 22 }) => <IconUse name={name} x={x} y={y} size={size} color={HEX.ink} />;
const wrap = (text, n) => text.split(' ').reduce((a, w) => { const l = a[a.length - 1]; if (l && (l + ' ' + w).length <= n) a[a.length - 1] = l + ' ' + w; else a.push(w); return a; }, []);
const Tri = ({ x, y, up }) => <path d={up ? `M${x} ${y + 6}l5 -6l5 6z` : `M${x} ${y}l5 6l5 -6z`} fill={up ? HEX.yellow : HEX.red} />;

function StatusG({ y, color }) {
  return (
    <g transform={`translate(0 ${y})`} fill={color}>
      <T x={34} y={36} size={15} w={500} fill={color}>9:41</T>
      <rect x="133" y="14" width="124" height="34" rx="17" fill="#000" />
      <g transform="translate(292 24)">
        {[0, 1, 2, 3].map((i) => <rect key={i} x={i * 5} y={10 - i * 3} width="3" height={4 + i * 3} rx="1" />)}
        <path d="M26 5.5a8 8 0 0 1 11 0M28.5 8.2a4.6 4.6 0 0 1 6 0" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <circle cx="31.5" cy="11" r="1.3" /><rect x="43" y="2" width="21" height="10" rx="3" />
      </g>
    </g>
  );
}
const Btn = ({ x, y, icon, on, dot }) => (
  <g>
    <rect x={x} y={y} width="48" height="48" rx="4" fill={on ? HEX.ink : HEX.card} />
    <IconUse name={icon} x={x + 13} y={y + 13} size={22} color={on ? '#fff' : HEX.ink} />
    {dot && <circle cx={x + 39} cy={y + 9} r="4" fill={HEX.yellow} />}
  </g>
);
const Logo = ({ x, y }) => (
  <g><rect x={x} y={y} width="48" height="48" rx="4" fill={HEX.yellow} /><MarkG x={x + 9} y={y + 9} size={30} fill="#F5F5F5" /></g>
);
const TAB = ['layers', 'link', 'headset', 'gear', 'folder'];
function TabG({ y, active }) {
  const w = 340 / 5;
  return (
    <g transform={`translate(21 ${y})`}>
      <rect width="348" height="56" rx="4" fill="#C6C6C6" />
      <rect x={4 + active * w} y="4" width={w} height="48" rx="3" fill={HEX.yellow} />
      {TAB.map((n, i) => <Ic key={n} name={n} x={4 + i * w + w / 2 - 11} y={17} />)}
    </g>
  );
}
function StatG({ x, y, k, id }) {
  const tone = k.tone || 'blue';
  return (
    <g transform={`translate(${x} ${y})`}>
      <clipPath id={`${ID}-${id}`}><rect width="165" height="155" rx="4" /></clipPath>
      <rect width="165" height="155" rx="4" fill={HEX.card} />
      <g clipPath={`url(#${ID}-${id})`}><GaugeG w={165} h={155} r={78} value={parseInt(k.value, 10) / 100} tone={tone} /></g>
      <T x={18} y={32} size={17} w={500}>{k.label}</T>
      <Ic name="arrow-up-right" x={131} y={17} size={16} />
      <T x={18} y={112} size={13}>{k.trend}</T>
      <Tri x={58} y={106} up={k.dir === 'up'} />
      <T x={18} y={140} size={36} w={300}>{k.value}</T>
    </g>
  );
}

export function SpecStatus() {
  return (
    <Art viewBox="0 0 390 170" title="Status bar, on grey and on blue" exportName="mobile-b-spec-status-bar">
      <Plate h="170" />
      <Cap y="14">On grey</Cap><StatusG y={18} color={HEX.ink} />
      <rect y="92" width="390" height="78" fill={HEX.field} />
      <T x={24} y={86} size={12} fill={HEX.muted}>On blue</T><StatusG y={96} color={HEX.navy} />
    </Art>
  );
}
export function SpecNav() {
  return (
    <Art viewBox="0 0 390 190" title="Top bar with logo tile and icon buttons" exportName="mobile-b-spec-nav">
      <Plate h="190" />
      <Cap y="16">Home</Cap><Logo x={24} y={24} /><Btn x={270} y={24} icon="bell" dot /><Btn x={318} y={24} icon="user" />
      <Cap y="104">Detail, share active</Cap><Btn x={24} y={112} icon="arrow-left" /><Btn x={270} y={112} icon="briefcase" /><Btn x={318} y={112} icon="share" on />
    </Art>
  );
}
export function SpecTabBar() {
  return (
    <Art viewBox="0 0 390 190" title="Floating tab bar, two active states" exportName="mobile-b-spec-tab-bar">
      <Plate h="190" />
      <Cap y="18">Active: link</Cap><TabG y={28} active={1} />
      <Cap y="110">Active: gear</Cap><TabG y={120} active={3} />
    </Art>
  );
}
export function SpecRows() {
  const row = (y, fill) => <rect x="24" y={y} width="342" height="62" rx="4" fill={fill} />;
  return (
    <Art viewBox="0 0 390 330" title="List row and menu row with states" exportName="mobile-b-spec-list-row">
      <Plate h="330" />
      <Cap y="16">List row</Cap>{row(22, HEX.card)}
      <rect x="33" y="31" width="44" height="44" rx="4" fill={HEX.app} /><Ic name="folder" x={44} y={42} /><T x={91} y={58} size={16} w={500}>Cut and Fill</T><Ic name="arrow-up-right" x={332} y={45} size={16} />
      <Cap y="108">Pressed, selected</Cap>{row(114, HEX.tile)}
      <rect x="33" y="123" width="44" height="44" rx="4" fill={HEX.app} /><Ic name="folder" x={44} y={134} /><T x={91} y={150} size={16} w={500}>Notes</T><circle cx="322" cy="145" r="4" fill={HEX.yellow} /><Ic name="arrow-up-right" x={332} y={137} size={16} />
      <Cap y="200">Menu row</Cap><rect x="24" y="206" width="342" height="54" rx="4" fill={HEX.card} />
      <Ic name="briefcase" x={42} y={222} /><T x={78} y={238} size={16} w={500}>Plans</T><Ic name="chevron-right" x={334} y={225} size={18} />
      <Cap y="278">Menu row with switch</Cap><rect x="24" y="284" width="342" height="42" rx="4" fill={HEX.card} />
      <T x={42} y={310} size={16} w={500}>Notifications</T>
      <rect x="314" y="294" width="44" height="24" rx="3" fill={HEX.blueInk} /><rect x="337" y="297" width="18" height="18" rx="2" fill="#fff" />
    </Art>
  );
}
export function SpecCard() {
  return (
    <Art viewBox="0 0 390 330" title="Card, closed and open" exportName="mobile-b-spec-card">
      <Plate h="330" />
      <Cap y="16">Closed</Cap><rect x="24" y="22" width="342" height="62" rx="4" fill={HEX.card} />
      <T x={42} y={59} size={17} w={500}>{KPI.material.label}</T><Ic name="arrow-up-right" x={332} y={45} size={16} />
      <Cap y="106">Open: arrow turned, figure and gauge</Cap>
      <clipPath id={`${ID}-card-clip`}><rect x="24" y="112" width="342" height="200" rx="4" /></clipPath>
      <rect x="24" y="112" width="342" height="200" rx="4" fill={HEX.card} />
      <g clipPath={`url(#${ID}-card-clip)`}><GaugeG x={24} y={112} w={342} h={200} r={110} value={0.32} /></g>
      <T x={42} y={147} size={17} w={500}>{KPI.material.label}</T>
      <g transform="translate(340 140) rotate(45)"><Ic name="arrow-up-right" x={-8} y={-8} size={16} /></g>
      <T x={42} y={254} size={13}>{KPI.material.trend}</T><Tri x={90} y={248} up />
      <T x={42} y={296} size={38} w={300}>{KPI.material.value}</T>
      <circle cx="282" cy="290" r="3.5" fill={HEX.blue} /><T x={292} y={294} size={13} fill={HEX.blueInk}>{KPI.material.legend}</T>
    </Art>
  );
}
export function SpecStat() {
  return (
    <Art viewBox="0 0 390 195" title="Stat cards, blue and yellow gauge" exportName="mobile-b-spec-stat-card">
      <Plate h="195" />
      <StatG x={24} y={20} k={KPI.details} id="stat-a" /><StatG x={201} y={20} k={KPI.notes} id="stat-b" />
    </Art>
  );
}
export function SpecInput() {
  const field = (y, label, state) => (
    <g>
      <T x={24} y={y + 14} size={13} fill={HEX.muted}>{label}</T>
      <rect x="24" y={y + 22} width="342" height="50" rx="4" fill={state === 'focus' ? HEX.tile : HEX.chip} />
      <rect x="24" y={y + (state === 'focus' ? 69 : 71)} width="342" height={state === 'focus' ? 3 : 1} fill={state === 'focus' ? HEX.blueInk : HEX.track} />
      {state === 'filled' && <rect x="40" y={y + 44} width="150" height="6" rx="3" fill="#9A9A9A" />}
    </g>
  );
  return (
    <Art viewBox="0 0 390 280" title="Input field states" exportName="mobile-b-spec-input">
      <Plate h="280" />
      {field(14, 'Email', 'rest')}{field(100, 'Email, focused', 'focus')}{field(186, 'Email, filled', 'filled')}
    </Art>
  );
}
export function SpecAccordion() {
  const lines = wrap(FAQ.answers[0], 40);
  return (
    <Art viewBox="0 0 390 280" title="Accordion row, closed and open" exportName="mobile-b-spec-accordion">
      <Plate h="280" />
      <Cap y="16">Closed</Cap><rect x="24" y="22" width="342" height="52" rx="4" fill={HEX.card} />
      <T x={40} y={54} size={12} fill={HEX.muted}>01</T><T x={68} y={54} size={15} w={500}>{FAQ.rows[0]}</T><Ic name="chevron-down" x={332} y={40} size={18} />
      <Cap y="96">Open</Cap><rect x="24" y="102" width="342" height={52 + lines.length * 21 + 16} rx="4" fill={HEX.card} />
      <T x={40} y={134} size={12} fill={HEX.muted}>01</T><T x={68} y={134} size={15} w={500}>{FAQ.rows[0]}</T>
      <g transform="rotate(180 350 129)"><Ic name="chevron-down" x={341} y={120} size={18} /></g>
      {lines.map((l, i) => <T key={l} x={68} y={166 + i * 21} size={14} w={300}>{l}</T>)}
    </Art>
  );
}
export function SpecSheet() {
  const rows = ['Overall', 'Dashboard', 'Progress'];
  return (
    <Art viewBox="0 0 390 330" title="Bottom sheet with drag handle" exportName="mobile-b-spec-sheet">
      <Plate h="330" />
      <rect x="24" y="20" width="165" height="70" rx="4" fill={HEX.card} /><rect x="201" y="20" width="165" height="70" rx="4" fill={HEX.card} />
      <rect width="390" height="330" fill="#2F2F2F" opacity="0.35" />
      <path d="M0 330V86a6 6 0 0 1 6 -6h378a6 6 0 0 1 6 6V330z" fill={HEX.tile} />
      <rect x="173" y="92" width="44" height="4" rx="2" fill={HEX.track} />
      <T x={24} y={130} size={20} w={500}>Overall</T><Ic name="chevron-down" x={104} y={113} size={20} />
      {rows.map((r, i) => (
        <g key={r}><rect x="24" y={146 + i * 58} width="342" height="50" rx="4" fill={HEX.card} /><T x={44} y={176 + i * 58} size={16} w={500}>{r}</T>
          {i === 0 && <circle cx="344" cy={171} r="4" fill={HEX.yellow} />}</g>
      ))}
    </Art>
  );
}
export function SpecTicks() {
  return (
    <Art viewBox="0 0 390 170" title="Tick-bar chart with range handle" exportName="mobile-b-chart-tick-bars">
      <Plate h="170" fill={HEX.card} />
      <T x={24} y={32} size={36} w={300}>{KPI.cross.value}</T><T x={104} y={32} size={13}>{KPI.cross.trend}</T><Tri x={150} y={26} up />
      <RangeChartG idp={`${ID}-ticks`} x={24} y={52} w={342} h={64} lo={35} hi={45} tone="yellow" />
    </Art>
  );
}
export function SpecMarkers() {
  return (
    <Art viewBox="0 0 342 200" title="Cut and Fill markers" exportName="mobile-b-chart-cut-fill">
      <Plate w="342" h="200" fill={HEX.card} />
      <T x={20} y={34} size={17} w={500}>{CUT_FILL.title}</T><T x={20} y={52} size={12} fill={HEX.muted}>{CUT_FILL.date}</T>
      <MarkersG x={20} y={62} />
    </Art>
  );
}
