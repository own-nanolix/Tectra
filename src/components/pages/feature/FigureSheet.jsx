import Art from '@/components/art/Art';
import { GaugeG } from '@/components/art/KeyArt';
import { areaPath, curvePath, r2 } from '@/lib/charts';
import { KPI } from '@/lib/brand';
import s from './feature.module.css';

// The four app cards the pins show, as one exportable sheet: Details, Notes, Material (grey cards with the corner
// gauge) and Overall Completion (glass on the blue field with the area chart and its ring marker).
const CW = 290, CH = 210;
const CARDS = [
  { key: 'details', ...KPI.details, x: 0, y: 0 },
  { key: 'notes', ...KPI.notes, x: 310, y: 0 },
  { key: 'material', ...KPI.material, x: 0, y: 230 },
];
const AREA = [[22, 150], [64, 118], [92, 96], [124, 88], [150, 70], [176, 96], [208, 126], [240, 150], [268, 160]];

function GreyCard({ c, i }) {
  const up = c.dir === 'up';
  const tx = 24 + c.trend.length * 7.6 + 6;
  return (
    <g transform={`translate(${c.x} ${c.y})`}>
      <g className="slide-up" style={{ '--i': i }}>
      <clipPath id={`feature-fig-clip-${c.key}`}>
        <rect width={CW} height={CH} rx="4" />
      </clipPath>
      <rect width={CW} height={CH} rx="4" fill="#E9E9E9" />
      <text x="24" y="42" fontSize="20" fontWeight="500" fill="#2F2F2F">{c.label}</text>
      <path d={`M${CW - 36} 40l10-10m-7 0h7v7`} fill="none" stroke="#2F2F2F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="24" y={CH - 78} fontSize="13" fill="#2F2F2F">{c.trend}</text>
      <path d={up ? `M${tx} ${CH - 78}l6-7 6 7z` : `M${tx} ${CH - 85}l6 7 6-7z`} fill={up ? '#FFB83D' : '#E2383B'} />
      <text x="24" y={CH - 30} fontSize="40" fontWeight="300" fill="#2F2F2F">{c.value}</text>
      <g clipPath={`url(#feature-fig-clip-${c.key})`}>
        <GaugeG w={CW} h={CH} r={CH * 0.52} value={parseInt(c.value, 10) / 100} tone={c.tone} draw />
      </g>
      </g>
    </g>
  );
}

export default function FigureSheet() {
  const o = KPI.overall;
  return (
    <Art viewBox="0 0 600 440" title="Details, Notes, Material and Overall Completion cards" exportName="feature-figures" className={s.sheetSvg}>
      <rect width="600" height="440" fill="#DDDDDD" rx="6" />
      <g transform="translate(0 0)">
        {CARDS.map((c, i) => <GreyCard key={c.key} c={c} i={i} />)}
      </g>
      <g transform="translate(310 230)">
      <g className="slide-up" style={{ '--i': 3 }}>
        <defs>
          <linearGradient id="feature-fig-field" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5BA8F8" />
            <stop offset="1" stopColor="#4C9BF3" />
          </linearGradient>
          <linearGradient id="feature-fig-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.75" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width={CW} height={CH} rx="4" fill="url(#feature-fig-field)" />
        <rect x="14" y="14" width={CW - 28} height={CH - 28} rx="4" fill="#FFFFFF" fillOpacity="0.22" />
        <text x="28" y="44" fontSize="13" fill="#0A2E63">{o.label}</text>
        <text x="28" y="82" fontSize="32" fontWeight="300" fill="#FFFFFF">{o.value}</text>
        <text x={CW - 28} y="78" fontSize="12" fill="#0A2E63" textAnchor="end">{o.trend}</text>
        <path d={`M${CW - 66} 66l6-7 6 7z`} fill="#4093EC" transform="translate(0 -1)" />
        <path d={areaPath(AREA, 186, true)} fill="url(#feature-fig-area)" />
        <path d={curvePath(AREA)} fill="none" stroke="#FFFFFF" strokeWidth="2" className="draw" style={{ '--len': 420 }} />
        <circle cx={r2(AREA[4][0])} cy={r2(AREA[4][1])} r="6" fill="#FFFFFF" />
        <circle cx={r2(AREA[4][0])} cy={r2(AREA[4][1])} r="2.4" fill="#4093EC" />
      </g>
      </g>
    </Art>
  );
}
