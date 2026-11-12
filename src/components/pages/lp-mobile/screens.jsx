// Artwork for the mobile page: phone screens 2 and 3 of the case study (390 x 844 screen space), the floating
// cards and the 3-segment step bar. Everything returns SVG groups; wrap in <Art> to export.
import { IconUse } from '@/components/site/Icon';
import { AppIconG } from '@/components/art/Mark';
import { GaugeG, TickBarsG } from '@/components/art/KeyArt';
import { CutFillG } from '@/components/art/Devices';
import { CUT_FILL, KPI } from '@/lib/brand';
import { axisLabels, r2 } from '@/lib/charts';

const INK = '#2F2F2F';
const MUTED = '#5E5E5E';

function Trend({ x, y, text, dir }) {
  const tx = x + text.length * 7.4 + 8;
  return (
    <g>
      <text x={x} y={y} fontSize="13" fontWeight="400" fill={INK}>{text}</text>
      {dir === 'up' ? <path d={`M${r2(tx)} ${y - 1}l6-7 6 7z`} fill="#FFB83D" /> : <path d={`M${r2(tx)} ${y - 8}l6 7 6-7z`} fill="#E2383B" />}
    </g>
  );
}

// An app card: title, arrow, trend, figure and the corner gauge. Origin top-left of the card.
export function MiniCardG({ idp, id, x = 0, y = 0, w = 171, h = 150, k, children }) {
  const val = parseInt(k.value, 10) / 100;
  return (
    <g transform={`translate(${x} ${y})`}>
      <clipPath id={`${idp}-mc-${id}`}>
        <rect width={w} height={h} rx="4" />
      </clipPath>
      <rect width={w} height={h} rx="4" fill="#E9E9E9" />
      <text x="18" y="34" fontSize="17" fontWeight="500" fill={INK}>{k.label}</text>
      <path d={`M${w - 30} 32l9-9m-6.5 0h6.5v6.5`} fill="none" stroke={INK} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <Trend x={18} y={h - 58} text={k.trend} dir={k.dir} />
      <text x="18" y={h - 20} fontSize="34" fontWeight="300" fill={INK}>{k.value}</text>
      <g clipPath={`url(#${idp}-mc-${id})`}>
        <GaugeG w={w} h={h} r={Math.min(w, h) * 0.55} value={val} tone={k.tone} />
      </g>
      {children}
    </g>
  );
}

function Tile({ x, y, icon, fill = '#E9E9E9' }) {
  return (
    <g>
      <rect x={x} y={y} width="50" height="50" rx="4" fill={fill} />
      <IconUse name={icon} x={x + 13} y={y + 13} size={24} color={INK} />
    </g>
  );
}

// Phone screen 2: the grey cards screen.
export function ScreenCardsG({ idp }) {
  const tabs = ['layers', 'link', 'headset', 'gear', 'folder'];
  const ax = axisLabels(310);
  return (
    <g>
      <rect width="390" height="844" fill="#DDDDDD" />
      <text x="56" y="45" fontSize="16" fontWeight="500" fill={INK}>9:41</text>
      <AppIconG x={20} y={72} size={50} />
      <Tile x={262} y={72} icon="bell" />
      <circle cx="304" cy="80" r="4" fill="#FFB83D" />
      <rect x="320" y="72" width="50" height="50" rx="4" fill="#E9E9E9" />
      <IconUse name="hardhat" x={333} y={85} size={24} color="#0A2E63" />
      <MiniCardG idp={idp} id="details" x={20} y={142} w={171} h={150} k={KPI.details} />
      <MiniCardG idp={idp} id="notes" x={199} y={142} w={171} h={150} k={KPI.notes} />
      <MiniCardG idp={idp} id="material" x={20} y={304} w={350} h={140} k={KPI.material}>
        <circle cx="236" cy="108" r="4" fill="#4093EC" />
        <text x="248" y="112" fontSize="13" fontWeight="400" fill={INK}>Normal</text>
      </MiniCardG>
      <g transform="translate(20 456)">
        <rect width="350" height="300" rx="4" fill="#E9E9E9" />
        <text x="18" y="34" fontSize="17" fontWeight="500" fill={INK}>{KPI.cross.label}</text>
        <path d="M320 32l9-9m-6.5 0h6.5v6.5" fill="none" stroke={INK} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <text x="18" y="86" fontSize="34" fontWeight="300" fill={INK}>{KPI.cross.value}</text>
        <Trend x={90} y={84} text={KPI.cross.trend} dir="up" />
        <rect x="262" y="70" width="10" height="7" rx="1" fill="#FFB83D" />
        <path d="M272 73.5h14" stroke="#FFB83D" strokeWidth="1.2" />
        <rect x="286" y="70" width="10" height="7" rx="1" fill="#FFB83D" />
        <text x="302" y="78" fontSize="11" fontWeight="400" fill={INK}>{KPI.cross.legend}</text>
        <TickBarsG idp={`${idp}-tb`} x={20} y={112} w={310} h={86} count={44} from={0.31} to={0.56} tone="yellow" base="#CFCFCF" />
        {ax.map((a) => (
          <text key={a.label + a.x} x={a.x + 20} y="262" fontSize="10" fontWeight="400" fill={MUTED} textAnchor="middle">{a.label}</text>
        ))}
      </g>
      <rect x="36" y="746" width="318" height="62" rx="4" fill="#D0D0D0" />
      <rect x="98" y="750" width="58" height="54" rx="3" fill="#FFB83D" />
      {tabs.map((n, i) => (
        <IconUse key={n} name={n} x={36 + 31 + i * 63.6 - 12} y={767} size={24} color={INK} />
      ))}
    </g>
  );
}

// Phone screen 3: Cut and Fill.
export function ScreenCutFillG({ idp }) {
  const ax = axisLabels(310);
  return (
    <g>
      <rect width="390" height="844" fill="#DDDDDD" />
      <text x="56" y="45" fontSize="16" fontWeight="500" fill="#9A9A9A">9:41</text>
      <Tile x={20} y={72} icon="arrow-left" fill="#E4E4E4" />
      <Tile x={262} y={72} icon="briefcase" fill="#E4E4E4" />
      <Tile x={320} y={72} icon="share" fill="#E4E4E4" />
      <g transform="translate(20 150)">
        <rect width="350" height="372" rx="4" fill="#E9E9E9" />
        <text x="18" y="36" fontSize="18" fontWeight="500" fill={INK}>{CUT_FILL.title}</text>
        <path d="M320 34l9-9m-6.5 0h6.5v6.5" fill="none" stroke={INK} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <text x="18" y="58" fontSize="12" fontWeight="400" fill={MUTED}>
          Date:<tspan fill={INK} dx="5">{CUT_FILL.date.replace('Date: ', '')}</tspan>
        </text>
        <CutFillG x={20} y={104} w={310} h={118} top={CUT_FILL.top} bottom={CUT_FILL.bottom} />
        <text x="18" y="274" fontSize="14" fontWeight="500" fill={INK}>Indicators</text>
        {CUT_FILL.indicators.slice(0, 2).map(([k, v], i) => (
          <text key={k} x={18 + i * 150} y="306" fontSize="13" fontWeight="400" fill={MUTED}>
            {k}<tspan fill={INK} dx="6">{v}</tspan>
          </text>
        ))}
        <text x="18" y="336" fontSize="13" fontWeight="400" fill={MUTED}>
          {CUT_FILL.indicators[2][0]}<tspan fill={INK} dx="6">{CUT_FILL.indicators[2][1]}</tspan>
        </text>
      </g>
      <g transform="translate(20 534)">
        <rect width="350" height="170" rx="4" fill="#E9E9E9" />
        <text x="18" y="34" fontSize="17" fontWeight="500" fill={INK}>{KPI.progress.label}</text>
        <text x="18" y="86" fontSize="34" fontWeight="300" fill={INK}>{KPI.progress.value}</text>
        <Trend x={90} y={84} text={KPI.progress.trend} dir="down" />
        <rect x="262" y="72" width="22" height="4" fill="#4093EC" />
        <text x="292" y="78" fontSize="11" fontWeight="400" fill={INK}>{KPI.progress.legend}</text>
        <rect x="18" y="108" width="130" height="5" fill="#4093EC" />
        <path d={Array.from({ length: 53 }, (_, i) => `M${152 + i * 3.6} 104v14`).join('')} stroke="#BDBDBD" strokeWidth="1" />
        {ax.map((a) => (
          <text key={a.label + a.x} x={a.x + 20} y="146" fontSize="10" fontWeight="400" fill={MUTED} textAnchor="middle">{a.label}</text>
        ))}
      </g>
      <g transform="translate(20 716)">
        <path d="M0 128V10a6 6 0 0 1 6-6h160a6 6 0 0 1 6 6v118z" fill="#E9E9E9" />
        <path d="M178 128V10a6 6 0 0 1 6-6h160a6 6 0 0 1 6 6v118z" fill="#E9E9E9" />
        <text x="18" y="40" fontSize="15" fontWeight="500" fill={INK}>Cross</text>
        <path d="M130 38l8-8m-6 0h6v6" fill="none" stroke={INK} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="196" y="40" fontSize="15" fontWeight="500" fill={INK}>Timeline</text>
        <path d="M290 38l8-8m-6 0h6v6" fill="none" stroke={INK} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
}

// The 3-segment step bar of the case study: `on` segments filled (1, 2 or 3). Origin top-left; width w.
export function StepBarG({ x = 0, y = 0, w = 300, on = 1, animate = true, delay = 0 }) {
  const gap = 8;
  const sw = (w - gap * 2) / 3;
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={r2(i * (sw + gap))} y="0" width={r2(sw)} height="5" rx="1" fill="#E9E9E9" />
          {i < on && (
            <rect x={r2(i * (sw + gap))} y="0" width={r2(sw)} height="5" rx="1" fill="#4093EC" className={animate ? 'grow-x' : undefined} style={animate ? { '--i': i + delay } : undefined} />
          )}
        </g>
      ))}
    </g>
  );
}
