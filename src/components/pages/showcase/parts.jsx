// Shared drawing pieces of the four showcase scenes. All of it is SVG artwork (groups) in the app's own language.
import { GaugeG } from '@/components/art/KeyArt';
import { AppIconG } from '@/components/art/Mark';
import { areaPath, curvePath, r2 } from '@/lib/charts';
import { KPI, WORKCARD } from '@/lib/brand';

// A grey app card with title, trend, figure and the corner gauge: Details, Notes, Material. Origin top-left.
// `idp` must be unique (it names the clip path).
export function AppCardG({ idp, k, w = 270, h = 190, ...rest }) {
  const c = KPI[k];
  const up = c.dir === 'up';
  const tx = 24 + c.trend.length * 7.6 + 6;
  const fs = h > 260 ? 1.25 : 1;
  return (
    <g {...rest}>
      <clipPath id={`${idp}-clip`}>
        <rect width={w} height={h} rx="4" />
      </clipPath>
      <rect width={w} height={h} rx="4" fill="#E9E9E9" />
      <text x="24" y={42 * fs} fontSize={20 * fs} fontWeight="500" fill="#2F2F2F">{c.label}</text>
      <path d={`M${w - 36} ${40 * fs}l10-10m-7 0h7v7`} fill="none" stroke="#2F2F2F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="24" y={h - 78} fontSize={13 * fs} fill="#2F2F2F">{c.trend}</text>
      <path d={up ? `M${tx * fs} ${h - 78}l6-7 6 7z` : `M${tx * fs} ${h - 85}l6 7 6-7z`} fill={up ? '#FFB83D' : '#E2383B'} />
      <text x="24" y={h - 30} fontSize={40 * fs} fontWeight="300" fill="#2F2F2F">{c.value}</text>
      <g clipPath={`url(#${idp}-clip)`}>
        <GaugeG w={w} h={h} r={Math.min(w, h) * 0.52} value={parseInt(c.value, 10) / 100} tone={c.tone} />
      </g>
    </g>
  );
}

// The work card (glass on a blue card) with the yellow pin. 270 x 190.
export function WorkCardCardG({ idp, ...rest }) {
  return (
    <g {...rest}>
      <linearGradient id={`${idp}-kb`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#5BA8F8" />
        <stop offset="1" stopColor="#3E93EE" />
      </linearGradient>
      <rect width="270" height="190" rx="4" fill={`url(#${idp}-kb)`} />
      <rect x="22" y="24" width="226" height="142" rx="4" fill="#FFFFFF" fillOpacity="0.24" />
      <text x="44" y="62" fontSize="18" fontWeight="500" fill="#FFFFFF">{WORKCARD.name}</text>
      <text x="44" y="84" fontSize="13" fill="#FFFFFF" fillOpacity="0.8">{WORKCARD.dates}</text>
      <text x="44" y="144" fontSize="40" fontWeight="300" fill="#FFFFFF">{WORKCARD.value}</text>
      <path d="M204 56h12m-5-5 5 5-5 5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="222" cy="140" r="11" fill="#FFB83D" />
      <circle cx="222" cy="140" r="4" fill="#FFFFFF" />
    </g>
  );
}

// Overall Completion: glass on the blue field with the area chart and its ring marker. 270 x 190.
const AREA = [[18, 150], [58, 122], [86, 100], [116, 92], [140, 76], [164, 98], [194, 126], [224, 148], [252, 158]];
export function OverallCardG({ idp, ...rest }) {
  const o = KPI.overall;
  return (
    <g {...rest}>
      <linearGradient id={`${idp}-ob`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#5BA8F8" />
        <stop offset="1" stopColor="#3E93EE" />
      </linearGradient>
      <linearGradient id={`${idp}-oa`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.75" />
        <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
      <clipPath id={`${idp}-oc`}>
        <rect x="14" y="14" width="242" height="162" rx="4" />
      </clipPath>
      <rect width="270" height="190" rx="4" fill={`url(#${idp}-ob)`} />
      <rect x="14" y="14" width="242" height="162" rx="4" fill="#FFFFFF" fillOpacity="0.22" />
      <text x="30" y="42" fontSize="13" fill="#FFFFFF" fillOpacity="0.85">{o.label}</text>
      <text x="30" y="76" fontSize="30" fontWeight="300" fill="#FFFFFF">{o.value}</text>
      <text x="236" y="72" fontSize="12" fill="#FFFFFF" textAnchor="end">{o.trend}</text>
      <path d="M200 63l6-7 6 7z" fill="#4093EC" />
      <g clipPath={`url(#${idp}-oc)`}>
        <path d={areaPath(AREA, 176, true)} fill={`url(#${idp}-oa)`} />
        <path d={curvePath(AREA)} fill="none" stroke="#FFFFFF" strokeWidth="2" />
      </g>
      <circle cx={r2(AREA[4][0])} cy={r2(AREA[4][1])} r="6" fill="#FFFFFF" />
      <circle cx={r2(AREA[4][0])} cy={r2(AREA[4][1])} r="2.4" fill="#4093EC" />
    </g>
  );
}

// A grey phone screen (the case study's second screen) drawn in 390 x 844: logo tile, three app cards, tab bar.
export function GreyScreenG({ idp }) {
  return (
    <g>
      <rect width="390" height="844" fill="#DDDDDD" />
      <AppIconG x={20} y={62} size={50} />
      {['details', 'notes', 'material'].map((k, i) => (
        <AppCardG key={k} idp={`${idp}-g${i}`} k={k} w={350} h={196} transform={`translate(20 ${112 + i * 212})`} />
      ))}
      <rect x="40" y="768" width="310" height="56" rx="6" fill="#FFFFFF" fillOpacity="0.85" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={58 + i * 58} y="780" width="44" height="32" rx="4" fill={i === 1 ? '#FFB83D' : '#E9E9E9'} />
      ))}
    </g>
  );
}
