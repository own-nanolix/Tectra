// Shared pieces of the nine mobile screens: status bar, gauge cards, tick chart, tab bar, site drawing, timeline.
// The `*G` functions return SVG groups so the same artwork serves the live screens and the exportable parts.
import Icon from '@/components/site/Icon';
import { AppIconG } from '@/components/art/Mark';
import { IsoSiteG, PinG, TickBarsG, SITE_PINS, iso } from '@/components/art/KeyArt';
import { cornerGauge, axisLabels, arcPath, polar, arcLength, r2 } from '@/lib/charts';
import { ROADMAP } from '@/lib/brand';
import s from './mobile-a.module.css';

const BLUE = '#4093EC';
const YELLOW = '#FFB83D';
const INK = '#2F2F2F';
const MUTED = '#5E5E5E';

// ---------- App chrome (HTML) ----------
export function StatusBar({ tone = 'grey' }) {
  const c = tone === 'blue' ? '#FFFFFF' : INK;
  return (
    <div className={s.status} style={{ color: c }} aria-hidden="true">
      <span>9:41</span>
      <span className={s.statusIcons}>
        <svg width="18" height="12" viewBox="0 0 18 12" fill={c}><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5" width="3" height="7" rx="1" /><rect x="10" y="2" width="3" height="10" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round"><path d="M1.5 4.2a9.5 9.5 0 0 1 13 0M4 7a6 6 0 0 1 8 0" /><circle cx="8" cy="10" r="1" fill={c} /></svg>
        <svg width="26" height="12" viewBox="0 0 26 12"><rect x="0.5" y="0.5" width="22" height="11" rx="3" fill="none" stroke={c} opacity="0.5" /><rect x="2" y="2" width="19" height="8" rx="2" fill={c} /><rect x="24" y="4" width="2" height="4" rx="1" fill={c} opacity="0.5" /></svg>
      </span>
    </div>
  );
}

export function LogoTile() {
  return (
    <svg className={s.logo} viewBox="0 0 50 50" aria-hidden="true"><AppIconG size={50} /></svg>
  );
}

// Top bar of the inner screens: back left, briefcase and share right.
export function InnerHead() {
  return (
    <>
      <span className={`${s.sq} ${s.headL}`} aria-hidden="true"><Icon name="arrow-left" size={20} /></span>
      <span className={s.headR} aria-hidden="true">
        <span className={s.sq}><Icon name="briefcase" size={22} /></span>
        <span className={s.sq}><Icon name="share" size={22} /></span>
      </span>
    </>
  );
}

const TABS = ['layers', 'link', 'headset', 'gear', 'folder'];
export function TabBar({ active = 1 }) {
  return (
    <div className={s.tabbar} aria-hidden="true">
      {TABS.map((n, i) => <span key={n} data-active={i === active}><Icon name={n} size={22} /></span>)}
    </div>
  );
}

// ---------- Corner gauge ----------
// The arc of the case study's cards, measured on m09: a circle whose centre sits near the card's bottom-right
// corner (`c` = [cx, cy] in card space). Without `c` the shared cornerGauge geometry is used.
function gaugeGeom(w, h, r, value, c) {
  if (!c) return cornerGauge(w, h, r, value);
  const [cx, cy] = c;
  const a0 = -96;
  const av = r2(a0 + 96 * Math.max(0, Math.min(1, value)));
  return { track: arcPath(cx, cy, r, a0, 40), value: arcPath(cx, cy, r, a0, av), dot: polar(cx, cy, r, av), len: arcLength(r, a0, av) };
}
// Card sizes on the 390-wide screen, measured on m09: half cards (Details, Notes) and full-width cards (Material).
export const HALF = { w: 181, h: 188, r: 90, c: [190, 180] };
export const FULL = { w: 367, h: 187, r: 150, c: [284, 229] };

export function GaugeBody({ w, h, r, value, tone = 'blue', c }) {
  const g = gaugeGeom(w, h, r, value, c);
  const col = tone === 'yellow' ? YELLOW : BLUE;
  return (
    <g fill="none" strokeLinecap="round">
      <path d={g.track} stroke="#F2F2F2" strokeWidth="4.5" />
      <path d={g.value} stroke={col} strokeWidth="4.5" className="draw" style={{ '--len': g.len }} />
      <circle cx={g.dot[0]} cy={g.dot[1]} r="6" fill="#F2F2F2" stroke="none" />
      <g className="pop" style={{ '--i': 6 }}><circle cx={g.dot[0]} cy={g.dot[1]} r="3" fill={col} stroke="none" /></g>
    </g>
  );
}

function Tri({ dir }) {
  return <i className={`${s.tri} ${dir === 'up' ? s.triUp : s.triDown}`} />;
}

// The live HTML gauge card. `pos` places it inside an artboard.
export function GaugeCard({ title, value, trend, dir, tone, w, h, r, c, legend, pos, className = '' }) {
  const n = parseInt(value, 10) / 100;
  return (
    <div className={`${s.gc} ${className}`} style={{ width: w, height: h, ...pos }}>
      <svg className={s.gcSvg} viewBox={`0 0 ${w} ${h}`} aria-hidden="true"><GaugeBody w={w} h={h} r={r} c={c} value={n} tone={tone} /></svg>
      <div className={s.gcHead}><span>{title}</span><Icon name="arrow-up-right" size={16} /></div>
      <div className={s.gcFoot}>
        <span className={s.gcTrend}>{trend}<Tri dir={dir} /></span>
        <span className={s.gcVal}>{value}</span>
      </div>
      {legend && <span className={s.gcLegend}><i />{legend}</span>}
    </div>
  );
}

// The same card as exportable artwork (a group in a w x h box).
export function GaugeCardG({ idp, w, h, r, title, value, trend, dir, tone, legend }) {
  const tw = trend.length * 7.4;
  return (
    <g>
      <clipPath id={`${idp}-clip`}><rect width={w} height={h} rx="4" /></clipPath>
      <rect width={w} height={h} rx="4" fill="#E9E9E9" />
      <g clipPath={`url(#${idp}-clip)`}><GaugeBody w={w} h={h} r={r} value={parseInt(value, 10) / 100} tone={tone} /></g>
      <text x="20" y="38" fontSize="18" fontWeight="500" fill={INK}>{title}</text>
      <path d={`M${w - 34} 34l9-9m-6.5 0h6.5v6.5`} fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="20" y={h - 56} fontSize="13" fill={INK}>{trend}</text>
      <path d={dir === 'up' ? `M${20 + tw + 6} ${h - 57}l5-7 5 7z` : `M${20 + tw + 6} ${h - 66}l5 7 5-7z`} fill={dir === 'up' ? YELLOW : '#E2383B'} />
      <text x="20" y={h - 18} fontSize="36" fontWeight="300" fill={INK}>{value}</text>
      {legend && <g><circle cx={w - 74} cy={h - 29} r="3.5" fill={BLUE} /><text x={w - 64} y={h - 24} fontSize="13" fill={INK}>{legend}</text></g>}
    </g>
  );
}

// ---------- Tick chart ----------
export function AxisRow({ w, y }) {
  const labels = axisLabels(w);
  return (
    <g fontSize="12" fill={MUTED}>
      {labels.map((l, i) => <text key={i} x={l.x} y={y} textAnchor={i === 0 ? 'start' : i === labels.length - 1 ? 'end' : 'middle'}>{l.label}</text>)}
    </g>
  );
}

export function TickChart({ idp, w, h, from, to, tone, rise = true, axis = 50 }) {
  return (
    <svg className={s.chartSvg} width={w} height={h + axis + 10} viewBox={`0 0 ${w} ${h + axis + 10}`} aria-hidden="true">
      <TickBarsG idp={idp} w={w} h={h} from={from} to={to} tone={tone} rise={rise} />
      <AxisRow w={w} y={h + axis} />
    </svg>
  );
}

// ---------- Site drawing and pins ----------
export function SitePins({ x = 0, y = 0, scale = 1, names = [], yellow }) {
  const all = [...names.map((n) => [n, 'white']), ...(yellow ? [[yellow, 'yellow']] : [])];
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g transform="translate(262 118)">
        {all.map(([n, tone], i) => {
          const [px, py] = iso(...SITE_PINS[n], 20);
          return (
            <g key={n} transform={`translate(${px} ${py})`}>
              <g className="pop" style={{ '--i': i + 2 }}><PinG r={7} tone={tone} pulse={tone === 'yellow'} /></g>
            </g>
          );
        })}
      </g>
    </g>
  );
}

export function SiteG({ x = 0, y = 0, scale = 1, tone = 'paper', names = ['ridge', 'wing', 'yard', 'gate'], yellow = 'workcard', seed = 5 }) {
  return (
    <g>
      <IsoSiteG x={x} y={y} scale={scale} tone={tone} seed={seed} />
      <SitePins x={x} y={y} scale={scale} names={names} yellow={yellow} />
    </g>
  );
}

// ---------- Volume bar (15.837 to 75.484, 8 segments, 4 filled) as artwork ----------
export function VolumeG({ w = 310, from, to, filled = 4 }) {
  const gap = 4, sw = (w - 36 - gap * 7) / 8;
  return (
    <g>
      <rect width={w} height="96" rx="4" fill="#E9E9E9" />
      <text x="20" y="38" fontSize="14" fill={INK}>{from}</text>
      <text x={w - 20} y="38" fontSize="14" fill={INK} textAnchor="end">{to}</text>
      <path d={`M${w / 2 - 28} 34h56m-4-3 4 3-4 3`} fill="none" stroke={MUTED} strokeWidth="1" />
      <rect x="14" y="54" width={w - 28} height="16" rx="2" fill="#DFDFDF" />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={r2(18 + i * (sw + gap))} y="58" width={r2(sw)} height="8" rx="1" fill={i < filled ? BLUE : '#FFFFFF'} fillOpacity={i < filled ? 1 : 0.8} className={i < filled ? 'grow-x' : undefined} style={{ '--i': i }} />
      ))}
    </g>
  );
}

// ---------- Roadmap as a vertical stepped list ----------
export function TimelineG() {
  const rows = [...ROADMAP.done.map((t) => [t, true]), ...ROADMAP.next.map((t) => [t, false])];
  const bw = 130, step = 22, gy = 72;
  return (
    <g>
      <path d={`M10 8V${rows.length * gy - 20}`} stroke="#DFDFDF" strokeWidth="1.2" />
      {rows.map(([label, done], i) => {
        const x = 24 + i * step, y = 40 + i * gy;
        return (
          <g key={label}>
            <g className="pop" style={{ '--i': i }}><circle cx="10" cy={y} r="5" fill={done ? BLUE : '#DFDFDF'} /></g>
            <text x={x} y={y - 12} fontSize="16" fontWeight="500" fill={done ? INK : MUTED}>{label}</text>
            {done ? (
              <g>
                <rect x={x} y={y - 2} width={bw} height="5" fill={BLUE} className="grow-x" style={{ '--i': i }} />
                <g className="pop" style={{ '--i': i + 1 }}>
                  <rect x={x - 3} y={y - 5} width="9" height="11" rx="1" fill={YELLOW} />
                  <rect x={x + bw - 6} y={y - 5} width="9" height="11" rx="1" fill={YELLOW} />
                </g>
              </g>
            ) : (
              <path d={Array.from({ length: 22 }, (_, k) => `M${x + k * 6} ${y - 5}v10`).join('')} stroke="#C9C9C9" strokeWidth="1.2" />
            )}
          </g>
        );
      })}
      <g transform={`translate(${24 + 3 * step + bw + 14} ${40 + 3 * gy})`} className="fade-in" style={{ '--i': 6 }}>
        <rect x="0" y="-12" width="78" height="24" rx="4" fill={INK} />
        <text x="10" y="4" fontSize="12" fill="#FFFFFF">{ROADMAP.here}</text>
      </g>
    </g>
  );
}
