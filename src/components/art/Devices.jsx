// Device frames and product screens as SVG groups, for mockups and showcase scenes (one SVG per scene).
// For live, interactive screens use the HTML frames in components/ui (Phone, Tablet, Laptop, Monitor, Watch).
// Each frame takes `w` (its width in the parent SVG) and `idp`, and draws `children` on its screen in the
// screen's own coordinate space:
//   PhoneG   screen 390 x 844      MonitorG screen 1600 x 1000     LaptopG screen 1440 x 900
//   TabletG  screen 1180 x 820     WatchG   screen 184 x 224
import { MarkG, AppIconG } from './Mark';
import { IsoSiteG, PinG, TickBarsG, GaugeG } from './KeyArt';
import { segments } from '@/lib/charts';

export const SCREEN = { phone: [390, 844], monitor: [1600, 1000], laptop: [1440, 900], tablet: [1180, 820], watch: [184, 224] };

export function PhoneG({ idp, x = 0, y = 0, w = 300, children, screenFill = '#DDDDDD', ...rest }) {
  const k = w / 430; // frame is 430 x 884 around a 390 x 844 screen
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`} {...rest}>
      <clipPath id={`${idp}-ph`}>
        <rect x="20" y="20" width="390" height="844" rx="48" />
      </clipPath>
      <rect x="-3" y="150" width="6" height="34" rx="2" fill="#B9B29F" />
      <rect x="-3" y="210" width="6" height="62" rx="2" fill="#B9B29F" />
      <rect x="427" y="230" width="6" height="96" rx="2" fill="#B9B29F" />
      <rect width="430" height="884" rx="66" fill="#CFC8B4" />
      <rect x="4" y="4" width="422" height="876" rx="62" fill="#111111" />
      <rect x="20" y="20" width="390" height="844" rx="48" fill={screenFill} />
      <g clipPath={`url(#${idp}-ph)`}>
        <g transform="translate(20 20)">{children}</g>
      </g>
      <rect x="153" y="34" width="124" height="34" rx="17" fill="#000000" />
      <circle cx="254" cy="51" r="6" fill="#16161E" />
      <path d="M66 6h298a60 60 0 0 1 60 60v60" fill="none" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="2" />
    </g>
  );
}

export function MonitorG({ idp, x = 0, y = 0, w = 800, children, screenFill = '#DDDDDD', stand = true, ...rest }) {
  const k = w / 1640; // frame 1640 x 1040 around a 1600 x 1000 screen; stand adds 300 below
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`} {...rest}>
      <clipPath id={`${idp}-mo`}>
        <rect x="20" y="20" width="1600" height="1000" rx="4" />
      </clipPath>
      {stand && (
        <g>
          <path d="M700 1040h240v230H700z" fill="#3A3A3A" />
          <path d="M700 1040h240v60H700z" fill="#000000" opacity="0.35" />
          <path d="M540 1270h560l40 30H500z" fill="#2B2B2B" />
          <path d="M700 1040h70v230h-70z" fill="#FFFFFF" opacity="0.08" />
        </g>
      )}
      <rect width="1640" height="1040" rx="18" fill="#0C0C0C" />
      <rect x="20" y="20" width="1600" height="1000" rx="4" fill={screenFill} />
      <g clipPath={`url(#${idp}-mo)`}>
        <g transform="translate(20 20)">{children}</g>
      </g>
      <path d="M18 2h1604a16 16 0 0 1 16 16v300" fill="none" stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="2" />
    </g>
  );
}

export function LaptopG({ idp, x = 0, y = 0, w = 800, children, screenFill = '#DDDDDD', ...rest }) {
  const k = w / 1840; // lid 1500 x 960 centred on a 1840-wide base
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`} {...rest}>
      <clipPath id={`${idp}-la`}>
        <rect x="200" y="30" width="1440" height="900" rx="6" />
      </clipPath>
      <rect x="170" y="0" width="1500" height="960" rx="30" fill="#1B1B1F" />
      <rect x="200" y="30" width="1440" height="900" rx="6" fill={screenFill} />
      <g clipPath={`url(#${idp}-la)`}>
        <g transform="translate(200 30)">{children}</g>
      </g>
      <path d="M830 30h180v16a12 12 0 0 1-12 12H842a12 12 0 0 1-12-12z" fill="#1B1B1F" />
      <path d="M0 960h1840v26a30 30 0 0 1-30 30H30a30 30 0 0 1-30-30z" fill="#2A2A2F" />
      <path d="M0 960h1840v8H0z" fill="#4A4A50" />
      <path d="M780 960h280v10a10 10 0 0 1-10 10H790a10 10 0 0 1-10-10z" fill="#17171A" />
      <path d="M200 4h1440" stroke="#FFFFFF" strokeOpacity="0.2" strokeWidth="2" />
    </g>
  );
}

export function TabletG({ idp, x = 0, y = 0, w = 600, children, screenFill = '#DDDDDD', rugged = false, ...rest }) {
  const k = w / 1260; // frame 1260 x 900 around a 1180 x 820 screen
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`} {...rest}>
      <clipPath id={`${idp}-ta`}>
        <rect x="40" y="40" width="1180" height="820" rx="14" />
      </clipPath>
      {rugged && (
        <g fill="#2F2F2F">
          <rect x="-26" y="-26" width="1312" height="952" rx="70" />
          <path d="M-26 60h30v120h-30zM1256 60h30v120h-30zM-26 720h30v120h-30zM1256 720h30v120h-30z" fill="#FFB83D" />
        </g>
      )}
      <rect width="1260" height="900" rx="46" fill="#101012" />
      <rect x="40" y="40" width="1180" height="820" rx="14" fill={screenFill} />
      <g clipPath={`url(#${idp}-ta)`}>
        <g transform="translate(40 40)">{children}</g>
      </g>
      <circle cx="630" cy="20" r="5" fill="#26262B" />
    </g>
  );
}

export function WatchG({ idp, x = 0, y = 0, w = 120, children, band = '#4093EC', ...rest }) {
  const k = w / 240; // case 240 x 290 around a 184 x 224 screen; band above and below
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`} {...rest}>
      <clipPath id={`${idp}-wa`}>
        <rect x="28" y="133" width="184" height="224" rx="44" />
      </clipPath>
      <path d="M50 0h140l10 110H40z" fill={band} />
      <path d="M40 380h160l-10 110H50z" fill={band} />
      <path d="M50 0h140l10 110H40z" fill="#000000" opacity="0.12" />
      <rect x="236" y="190" width="12" height="46" rx="5" fill="#8F8F8F" />
      <rect y="100" width="240" height="290" rx="70" fill="#C9C9C9" />
      <rect x="8" y="108" width="224" height="274" rx="62" fill="#0E0E10" />
      <rect x="28" y="133" width="184" height="224" rx="44" fill="#1A1A1D" />
      <g clipPath={`url(#${idp}-wa)`}>
        <g transform="translate(28 133)">{children}</g>
      </g>
    </g>
  );
}

// ---------- Screens (artwork versions of the product, for use inside the frames above) ----------

// Phone screen 1 of the case study: the blue home. 390 x 844.
export function ScreenHomeG({ idp }) {
  const segs = segments(8, 322, 4, 4);
  return (
    <g>
      <linearGradient id={`${idp}-sh-bg`} x1="0" y1="0" x2="0.4" y2="1">
        <stop offset="0" stopColor="#4C9BF3" />
        <stop offset="1" stopColor="#3E93EE" />
      </linearGradient>
      <rect width="390" height="844" fill={`url(#${idp}-sh-bg)`} />
      <text x="56" y="45" fontSize="16" fontWeight="500" fill="#FFFFFF">9:41</text>
      <AppIconG x={20} y={72} size={50} />
      <rect x="205" y="72" width="165" height="50" rx="4" fill="#FFFFFF" fillOpacity="0.28" />
      <path d="M329 72v50" stroke="#FFFFFF" strokeOpacity="0.35" />
      <text x="234" y="102" fontSize="14" fontWeight="400" fill="#FFFFFF">Overall</text>
      <path d="M292 94l5 5 5-5" fill="none" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <g fill="none" stroke="#FFFFFF" strokeWidth="1.2">
        <circle cx="341" cy="97" r="2.4" />
        <circle cx="349" cy="97" r="2.4" />
        <circle cx="357" cy="97" r="2.4" />
      </g>
      <text x="20" y="206" fontSize="54" fontWeight="300" fill="#FFFFFF" letterSpacing="-0.5">Smart</text>
      <text x="20" y="260" fontSize="54" fontWeight="300" fill="#FFFFFF" letterSpacing="-0.5">Construction</text>
      <text fontSize="11.5" fontWeight="400" fill="#FFFFFF" fillOpacity="0.72">
        <tspan x="20" y="290">Smart construction uses technology like AI and IoT to</tspan>
        <tspan x="20" y="307">improve efficiency, safety, and sustainability.</tspan>
      </text>
      <IsoSiteG x={-150} y={300} scale={1.25} tone="blue" seed={11} />
      <rect x="62" y="410" width="205" height="128" rx="4" fill="#FFFFFF" fillOpacity="0.24" />
      <text x="84" y="446" fontSize="14" fontWeight="500" fill="#FFFFFF">Komatsu</text>
      <text x="84" y="466" fontSize="11.5" fontWeight="400" fill="#FFFFFF" fillOpacity="0.72">10 - 14 Jan, 2025</text>
      <text x="84" y="514" fontSize="27" fontWeight="300" fill="#FFFFFF">32%</text>
      <path d="M236 443h10m-4-4 4 4-4 4" fill="none" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <PinG x={254} y={523} r={10} tone="yellow" />
      <rect x="20" y="652" width="350" height="86" rx="4" fill="#FFFFFF" fillOpacity="0.24" />
      <text x="40" y="686" fontSize="13" fontWeight="400" fill="#FFFFFF">15.837 cu yd</text>
      <text x="350" y="686" fontSize="13" fontWeight="400" fill="#FFFFFF" textAnchor="end">75.484 cu yd</text>
      <path d="M165 681h64m-4-3 4 3-4 3" fill="none" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="1" />
      <rect x="34" y="708" width="322" height="12" rx="2" fill="#FFFFFF" fillOpacity="0.25" />
      {segs.map((s, i) => (
        <rect key={i} x={36 + s.x * (318 / 322)} y="712" width={s.w * (318 / 322)} height="4" rx="1" fill={s.on ? '#2F7FE0' : '#FFFFFF'} fillOpacity={s.on ? 1 : 0.55} />
      ))}
      <rect x="20" y="750" width="350" height="120" rx="4" fill="#FFFFFF" fillOpacity="0.24" />
      <text x="40" y="784" fontSize="13" fontWeight="400" fill="#FFFFFF" fillOpacity="0.8">Overall Completion</text>
      <text x="40" y="822" fontSize="27" fontWeight="300" fill="#FFFFFF">66%</text>
      <text x="336" y="816" fontSize="12" fontWeight="400" fill="#FFFFFF" textAnchor="end">+2.4%</text>
      <path d="M342 815l6-7 6 7z" fill="#4093EC" />
    </g>
  );
}

function miniCard(idp, key, x, y, w, h, title, trend, dir, value, tone) {
  return (
    <g key={key} transform={`translate(${x} ${y})`}>
      <clipPath id={`${idp}-mc-${key}`}>
        <rect width={w} height={h} rx="4" />
      </clipPath>
      <rect width={w} height={h} rx="4" fill="#E9E9E9" />
      <text x="24" y="42" fontSize="20" fontWeight="500" fill="#2F2F2F">{title}</text>
      <path d={`M${w - 36} 40l10-10m-7 0h7v7`} fill="none" stroke="#2F2F2F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="24" y={h - 78} fontSize="13" fontWeight="400" fill="#2F2F2F">{trend}</text>
      {dir === 'up' ? <path d={`M${24 + trend.length * 7.6 + 6} ${h - 78}l6-7 6 7z`} fill="#FFB83D" /> : <path d={`M${24 + trend.length * 7.6 + 6} ${h - 85}l6 7 6-7z`} fill="#E2383B" />}
      <text x="24" y={h - 30} fontSize="36" fontWeight="300" fill="#2F2F2F">{value}</text>
      <g clipPath={`url(#${idp}-mc-${key})`}>
        <GaugeG w={w} h={h} r={Math.min(w, h) * 0.52} value={parseInt(value, 10) / 100} tone={tone} />
      </g>
    </g>
  );
}

// The desktop app (Progress tab) as artwork. 1600 x 1000.
export function ScreenAppG({ idp }) {
  const tabs = ['Dashboard', 'Progress', 'Timeline', 'Work areas'];
  const rail = ['layers', 'link', 'headset', 'gear', 'folder'];
  const segs = segments(8, 300, 4, 5);
  return (
    <g>
      <rect width="1600" height="1000" fill="#DDDDDD" />
      <AppIconG x={24} y={24} size={58} />
      {rail.map((n, i) => (
        <g key={n} transform={`translate(27 ${330 + i * 58})`}>
          <rect width="52" height="52" rx="4" fill={i === 1 ? '#C9C9C9' : '#E4E4E4'} />
          <use href={`#site-icon-${n}`} x="14" y="14" width="24" height="24" color="#2F2F2F" />
        </g>
      ))}
      <g transform="translate(27 900)">
        <rect width="52" height="52" rx="4" fill="#E4E4E4" />
        <use href="#site-icon-logout" x="14" y="14" width="24" height="24" color="#2F2F2F" />
      </g>
      <linearGradient id={`${idp}-sa-bg`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#5BA8F8" />
        <stop offset="1" stopColor="#4C9BF3" />
      </linearGradient>
      <clipPath id={`${idp}-sa-hero`}>
        <rect x="110" y="110" width="1466" height="520" rx="4" />
      </clipPath>
      <rect x="110" y="110" width="1466" height="520" rx="4" fill={`url(#${idp}-sa-bg)`} />
      <g clipPath={`url(#${idp}-sa-hero)`}>
        <IsoSiteG x={500} y={70} scale={1.6} tone="blue" pins={['ridge', 'wing']} seed={5} />
      </g>
      <rect x="560" y="24" width="470" height="58" rx="4" fill="#E9E9E9" />
      {tabs.map((t, i) => (
        <g key={t}>
          {i === 1 && <rect x={560 + 118} y="24" width="112" height="58" rx="4" fill="#CFCFCF" />}
          <text x={[590, 700, 818, 920][i]} y="59" fontSize="16" fontWeight="500" fill="#2F2F2F">{t}</text>
        </g>
      ))}
      <rect x="1456" y="24" width="56" height="56" rx="4" fill="#E9E9E9" />
      <use href="#site-icon-briefcase" x="1472" y="40" width="24" height="24" color="#2F2F2F" />
      <rect x="1520" y="24" width="56" height="56" rx="4" fill="#E9E9E9" />
      <use href="#site-icon-bell" x="1536" y="40" width="24" height="24" color="#2F2F2F" />
      <circle cx="1554" cy="42" r="4" fill="#FFB83D" />
      <text x="140" y="216" fontSize="76" fontWeight="300" fill="#FFFFFF" letterSpacing="-1">Smart</text>
      <text x="140" y="294" fontSize="76" fontWeight="300" fill="#FFFFFF" letterSpacing="-1">Construction</text>
      <text fontSize="14" fontWeight="400" fill="#FFFFFF" fillOpacity="0.72">
        <tspan x="140" y="330">Smart construction uses technology like AI and IoT</tspan>
        <tspan x="140" y="350">to improve efficiency, safety, and sustainability.</tspan>
      </text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${140 + i * 58} 548)`}>
          <rect width="50" height="50" rx="4" fill="#FFFFFF" fillOpacity="0.3" />
          <use href="#site-icon-hardhat" x="13" y="12" width="24" height="24" color="#0A2E63" />
          <circle cx="25" cy="50" r="5" fill={i === 1 || i === 2 ? '#E2383B' : '#FFB83D'} />
        </g>
      ))}
      <rect x="640" y="330" width="200" height="130" rx="4" fill="#FFFFFF" fillOpacity="0.24" />
      <text x="662" y="366" fontSize="15" fontWeight="500" fill="#FFFFFF">Komatsu</text>
      <text x="662" y="388" fontSize="12" fontWeight="400" fill="#FFFFFF" fillOpacity="0.72">10 - 14 Jan, 2025</text>
      <text x="662" y="436" fontSize="28" fontWeight="300" fill="#FFFFFF">32%</text>
      <PinG x={826} y={446} r={10} tone="yellow" />
      <rect x="1220" y="250" width="332" height="356" rx="4" fill="#FFFFFF" fillOpacity="0.24" />
      <rect x="1352" y="226" width="200" height="54" rx="4" fill="#FFFFFF" fillOpacity="0.3" />
      <text x="1380" y="259" fontSize="15" fontWeight="500" fill="#FFFFFF">Overall</text>
      <text x="1244" y="300" fontSize="13" fontWeight="400" fill="#FFFFFF" fillOpacity="0.8">Overall Completion</text>
      <text x="1244" y="342" fontSize="32" fontWeight="300" fill="#FFFFFF">66%</text>
      <linearGradient id={`${idp}-sa-area`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.75" />
        <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
      <path d="M1244 500C1290 470 1300 440 1330 430C1350 424 1360 404 1380 392C1400 402 1420 440 1450 470C1480 500 1500 520 1530 540V560H1244Z" fill={`url(#${idp}-sa-area)`} />
      <path d="M1244 500C1290 470 1300 440 1330 430C1350 424 1360 404 1380 392C1400 402 1420 440 1450 470C1480 500 1500 520 1530 540" fill="none" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="1380" cy="392" r="6" fill="#FFFFFF" />
      <circle cx="1380" cy="392" r="2.4" fill="#4093EC" />
      <text x="1244" y="574" fontSize="12" fontWeight="400" fill="#FFFFFF">15.837 cu yd</text>
      <text x="1528" y="574" fontSize="12" fontWeight="400" fill="#FFFFFF" textAnchor="end">75.484 cu yd</text>
      {segs.map((s, i) => (
        <rect key={i} x={1236 + s.x} y="586" width={s.w} height="5" rx="1" fill={s.on ? '#2F7FE0' : '#FFFFFF'} fillOpacity={s.on ? 1 : 0.55} />
      ))}
      <rect x="110" y="646" width="620" height="230" rx="4" fill="#E9E9E9" />
      <text x="138" y="690" fontSize="20" fontWeight="500" fill="#2F2F2F">2D Cross Section Z (ft)</text>
      <text x="138" y="744" fontSize="36" fontWeight="300" fill="#2F2F2F">76%</text>
      <text x="212" y="742" fontSize="13" fontWeight="400" fill="#2F2F2F">+2.4%</text>
      <path d="M258 741l6-7 6 7z" fill="#FFB83D" />
      <TickBarsG idp={`${idp}-sa-tb`} x={138} y={770} w={564} h={58} count={56} from={0.31} to={0.56} tone="yellow" base="#CFCFCF" />
      <rect x="110" y="888" width="620" height="88" rx="4" fill="#E9E9E9" />
      <text x="138" y="944" fontSize="36" fontWeight="300" fill="#2F2F2F">24%</text>
      <text x="212" y="942" fontSize="13" fontWeight="400" fill="#2F2F2F">-1.9%</text>
      <path d="M254 934l6 7 6-7z" fill="#E2383B" />
      <rect x="300" y="940" width="130" height="5" fill="#4093EC" />
      <rect x="436" y="936" width="266" height="12" fill={`url(#${idp}-sa-ticks)`} />
      <pattern id={`${idp}-sa-ticks`} width="4" height="12" patternUnits="userSpaceOnUse">
        <path d="M1 0v12" stroke="#BDBDBD" strokeWidth="1" />
      </pattern>
      {miniCard(idp, 'details', 742, 646, 270, 190, 'Details', '+2.4%', 'up', '76%', 'blue')}
      {miniCard(idp, 'notes', 1024, 646, 270, 190, 'Notes', '-1.9%', 'down', '64%', 'yellow')}
      {miniCard(idp, 'material', 1306, 646, 270, 190, 'Material', '+8.1%', 'up', '32%', 'blue')}
      <rect x="742" y="848" width="834" height="128" rx="4" fill="#E9E9E9" />
      <text x="770" y="890" fontSize="20" fontWeight="500" fill="#2F2F2F">Cut and Fill</text>
      <text x="770" y="914" fontSize="12" fontWeight="400" fill="#5E5E5E">Date: 17 Dec, 2025 11:59PM</text>
      <CutFillG x={1010} y={872} w={520} h={84} />
    </g>
  );
}

// The Cut and Fill instrument: three yellow cut markers (bar on top, stem down) alternating with three blue
// fill markers (bar at the bottom, stem up); the first of each is full strength, the others fade.
export function CutFillG({ x = 0, y = 0, w = 370, h = 92, labels = true, top = ['-15 ft', '-4.88 ft', '14 ft'], bottom = ['-20 ft', '-9.77 ft', '00 ft'], ...rest }) {
  const step = w / 6;
  const bar = step * 0.98;
  const op = [1, 0.5, 0.32];
  return (
    <g transform={`translate(${x} ${y})`} {...rest}>
      {[0, 1, 2].map((i) => {
        const cx = step * (i * 2) + bar / 2;
        const fx = step * (i * 2 + 1) + bar / 2;
        return (
          <g key={i}>
            <rect x={cx - bar / 2} y="0" width={bar} height="5" rx="1" fill="#FFB83D" fillOpacity={op[i]} />
            <path d={`M${cx} 5V${h * 0.62}`} stroke="#FFB83D" strokeOpacity={Math.max(op[i], 0.6)} strokeWidth="1.2" />
            <circle cx={cx} cy="8" r="2.6" fill="#FFB83D" />
            {labels && <text x={cx} y={h - 2} fontSize="13" fontWeight="400" fill="#2F2F2F" textAnchor="middle">{bottom[i]}</text>}
            <rect x={fx - bar / 2} y={h - 5} width={bar} height="5" rx="1" fill="#4093EC" fillOpacity={op[i]} />
            <path d={`M${fx} ${h - 5}V${h * 0.32}`} stroke="#4093EC" strokeOpacity={Math.max(op[i], 0.6)} strokeWidth="1.2" />
            <circle cx={fx} cy={h - 8} r="2.6" fill="#4093EC" />
            {labels && <text x={fx} y="12" fontSize="13" fontWeight="400" fill="#2F2F2F" textAnchor="middle">{top[i]}</text>}
          </g>
        );
      })}
    </g>
  );
}

// A small glanceable screen for the watch: 184 x 224.
export function ScreenWatchG() {
  return (
    <g>
      <rect width="184" height="224" fill="#3E93EE" />
      <MarkG x={18} y={20} size={26} fill="#FFFFFF" />
      <text x="18" y="96" fontSize="15" fontWeight="500" fill="#FFFFFF">Komatsu</text>
      <text x="18" y="150" fontSize="48" fontWeight="300" fill="#FFFFFF">32%</text>
      <rect x="18" y="176" width="148" height="6" rx="2" fill="#FFFFFF" fillOpacity="0.3" />
      <rect x="18" y="176" width="48" height="6" rx="2" fill="#FFB83D" />
    </g>
  );
}
