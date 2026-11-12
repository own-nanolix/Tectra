import Art from '@/components/art/Art';
import { areaPath, curvePath, r2 } from '@/lib/charts';

// The mountain of the Overall Completion chart (relative heights, left to right).
export const AREA = [0.05, 0.08, 0.1, 0.14, 0.2, 0.26, 0.3, 0.36, 0.45, 0.55, 0.7, 0.86, 1, 0.92, 0.78, 0.62, 0.46, 0.3, 0.16, 0.05];

export const areaPoints = (w, h, pad = 10) => AREA.map((v, i) => [r2((i / (AREA.length - 1)) * w), r2(h - pad - v * (h - pad * 2))]);

// The area chart of the glass card: a soft fill fading down, one line, one ring marker.
// tone 'white' sits on the blue field; 'blue' sits on paper. marker is an index into AREA.
export function AreaChart({ idp, exportName, title, w = 300, h = 130, tone = 'white', marker = 10, className }) {
  const pts = areaPoints(w, h);
  const col = tone === 'white' ? '#FFFFFF' : '#4093EC';
  const [mx, my] = pts[marker];
  return (
    <Art viewBox={`0 0 ${w} ${h}`} title={title} exportName={exportName} className={className}>
      <defs>
        <linearGradient id={`${idp}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={col} stopOpacity={tone === 'white' ? 0.6 : 0.35} />
          <stop offset="1" stopColor={col} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath(pts, h, true)} fill={`url(#${idp}-fill)`} className="fade-in" />
      <path d={curvePath(pts)} fill="none" stroke={col} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" pathLength="1" className="draw" style={{ '--len': 1 }} />
      <circle cx={mx} cy={my} r="10" fill={col} opacity="0.3" />
      <circle cx={mx} cy={my} r="4.5" fill={tone === 'white' ? '#53A2F7' : '#FFFFFF'} stroke={col} strokeWidth="2" className="pop" />
    </Art>
  );
}
