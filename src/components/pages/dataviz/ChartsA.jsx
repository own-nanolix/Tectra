import Art from '@/components/art/Art';
import { TickBarsG, GaugeG, PinG } from '@/components/art/KeyArt';
import { CutFillG } from '@/components/art/Devices';
import { axisLabels, scale, curvePath, areaPath, arcPath, segments, r2 } from '@/lib/charts';
import { KPI, VOLUME, CUT_FILL, INSIGHTS, EFFICIENCY, ROADMAP } from '@/lib/brand';
import { C, tp, Tri, FadeDef } from './parts';

// The nine charts rebuilt from the case study. Every figure printed here is a published one.

// (1) Tick-bar chart: bars fade downward, a band is on, a range handle, and the designer's axis order.
export function Ticks({ insight = INSIGHTS[0], idp = 'dataviz-ticks', name = 'dataviz-ticks' }) {
  const W = 600, H = 70, X = 20, Y = 12;
  const col = insight.tone === 'yellow' ? C.yellow : C.blue;
  const tip = `${insight.value} ${insight.label}`;
  return (
    <Art viewBox="0 0 640 140" title={`Tick-bar chart: ${tip}`} exportName={name}>
      <TickBarsG idp={idp} x={X} y={Y} w={W} h={H} count={48} from={insight.from} to={insight.to} tone={insight.tone} rise />
      <rect x={X + insight.from * W} y={Y} width={(insight.to - insight.from) * W} height={H + 30} fill={col} fillOpacity="0" {...tp(tip)} />
      {axisLabels(W).map((a, i) => (
        <text key={i} x={X + a.x} y={Y + H + 46} fontSize="13" fontWeight="400" fill={C.muted} textAnchor="middle">{a.label}</text>
      ))}
    </Art>
  );
}

// (2) and the KPI tiles: a card with the quarter-arc gauge cut by its corner.
export function KpiGauge({ k, idp, name, tone = 'blue' }) {
  const pct = parseInt(k.value, 10) / 100;
  const tip = `${k.label} ${k.value}, ${k.trend} ${k.dir === 'up' ? 'up' : 'down'}`;
  return (
    <Art viewBox="0 0 340 236" title={tip} exportName={name}>
      <defs>
        <clipPath id={`${idp}-clip`}><rect width="340" height="236" rx="4" /></clipPath>
      </defs>
      <rect width="340" height="236" rx="4" fill={C.card} />
      <g clipPath={`url(#${idp}-clip)`}>
        <GaugeG w={340} h={236} r={120} value={pct} tone={tone} draw />
      </g>
      <text x="24" y="42" fontSize="20" fontWeight="500" fill={C.ink}>{k.label}</text>
      <text x="24" y="124" fontSize="56" fontWeight="300" fill={C.ink}>{k.value}</text>
      <Tri x={30} y={158} dir={k.dir} />
      <text x="44" y="162" fontSize="14" fontWeight="400" fill={C.ink}>{k.trend}</text>
      <rect x="150" y="100" width="190" height="136" fill={C.blue} fillOpacity="0" {...tp(tip)} />
    </Art>
  );
}

// (3) Cut and Fill markers.
export function CutFill() {
  const step = 280 / 6, bar = step * 0.98;
  const marks = [];
  [0, 1, 2].forEach((i) => {
    marks.push({ x: 10 + step * (i * 2), tip: `Cut marker ${CUT_FILL.bottom[i]}` });
    marks.push({ x: 10 + step * (i * 2 + 1), tip: `Fill marker ${CUT_FILL.top[i]}` });
  });
  return (
    <Art viewBox="0 0 300 150" title="Cut and Fill markers" exportName="dataviz-cutfill">
      <CutFillG x={10} y={26} w={280} h={92} />
      {marks.map((m) => (
        <rect key={m.x} x={m.x} y={26} width={bar} height={92} fill={C.blue} fillOpacity="0" {...tp(m.tip)} />
      ))}
      <text x="10" y="144" fontSize="12" fontWeight="400" fill={C.muted}>{CUT_FILL.date}</text>
    </Art>
  );
}

// (4) Glass area chart with one ring marker. The curve is drawn in the shape of the source chart; the points
// carry no labelled values, only the card figures and the date marker are published.
const AREA = [22, 30, 26, 38, 44, 40, 52, 50, 58, 56, 64, 60];
export function AreaGlass() {
  const idp = 'dataviz-area';
  const xs = scale(0, AREA.length - 1, 48, 472), ys = scale(0, 100, 340, 175);
  const pts = AREA.map((v, i) => [xs(i), ys(v)]);
  const [mx, my] = pts[7];
  const tip = `${KPI.progress.label} ${KPI.progress.value}, ${KPI.progress.date}`;
  return (
    <Art viewBox="0 0 520 400" title={`Glass area chart: ${tip}`} exportName="dataviz-area">
      <defs>
        <linearGradient id={`${idp}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5BA8F8" />
          <stop offset="1" stopColor="#4C9BF3" />
        </linearGradient>
        <FadeDef id={`${idp}-fill`} color="#FFFFFF" />
      </defs>
      <rect width="520" height="400" rx="4" fill={`url(#${idp}-bg)`} />
      <rect x="24" y="24" width="472" height="352" rx="4" fill="#FFFFFF" fillOpacity="0.18" />
      <text x="48" y="66" fontSize="20" fontWeight="500" fill={C.navy}>{KPI.progress.label}</text>
      <text x="48" y="124" fontSize="52" fontWeight="300" fill="#FFFFFF">{KPI.progress.value}</text>
      <Tri x={186} y={116} dir="down" />
      <text x="200" y="120" fontSize="14" fontWeight="400" fill={C.navy}>{KPI.progress.trend}</text>
      <circle cx="398" cy="60" r="4" fill={C.yellow} />
      <text x="408" y="65" fontSize="14" fontWeight="400" fill={C.navy}>{KPI.progress.legend}</text>
      <path d={areaPath(pts, 340, true)} fill={`url(#${idp}-fill)`} fillOpacity="0.55" className="fade-in" />
      <path d={curvePath(pts)} fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" pathLength="1000" className="draw" />
      <path d="M48 340H472" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="1" />
      <path d={`M${mx} ${my}V340`} stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 4" />
      <g className="pop" style={{ '--i': 6 }}>
        <circle cx={mx} cy={my} r="15" fill="#FFFFFF" fillOpacity="0.35" />
        <circle cx={mx} cy={my} r="8" fill="#FFFFFF" />
        <circle cx={mx} cy={my} r="3" fill={C.ink} />
      </g>
      <circle cx={mx} cy={my} r="18" fill={C.blue} fillOpacity="0" {...tp(tip)} />
      <text x={mx} y="364" fontSize="14" fontWeight="400" fill={C.navy} textAnchor="middle">{KPI.progress.date}</text>
    </Art>
  );
}

// (5) Segmented progress bars: 8 segments between the two volumes, and the 3-segment form.
export function Seg8() {
  const segs = segments(8, 280, VOLUME.filled, 6);
  const tip = `Volume from ${VOLUME.from} to ${VOLUME.to}, ${VOLUME.filled} of ${VOLUME.segments} segments`;
  return (
    <Art viewBox="0 0 300 76" title={tip} exportName="dataviz-seg8">
      {segs.map((g, i) => (
        <rect key={i} x={10 + g.x} y="18" width={g.w} height="12" rx="1" fill={g.on ? C.blue : C.track} className="grow-x" style={{ '--i': i }} />
      ))}
      <rect x="10" y="14" width="280" height="20" fill={C.blue} fillOpacity="0" {...tp(tip)} />
      <text x="10" y="60" fontSize="13" fontWeight="400" fill={C.muted}>{VOLUME.from}</text>
      <text x="290" y="60" fontSize="13" fontWeight="400" fill={C.muted} textAnchor="end">{VOLUME.to}</text>
    </Art>
  );
}
export function Seg3() {
  const segs = segments(3, 280, 2, 8);
  return (
    <Art viewBox="0 0 300 40" title="Segmented progress bar, 2 of 3 segments" exportName="dataviz-seg3">
      {segs.map((g, i) => (
        <rect key={i} x={10 + g.x} y="14" width={g.w} height="12" rx="1" fill={g.on ? C.blue : C.track} className="grow-x" style={{ '--i': i }} />
      ))}
      <rect x="10" y="10" width="280" height="20" fill={C.blue} fillOpacity="0" {...tp('Segmented progress, 2 of 3 segments')} />
    </Art>
  );
}

// (6) Vertical two-segment bar.
export function VBar() {
  const idp = 'dataviz-vbar';
  const top = 20, h = 330, fillH = r2(h * 0.4);
  const tip = `Task efficiency ${EFFICIENCY.value}`;
  return (
    <Art viewBox="0 0 160 420" title={`Vertical two-segment bar: ${tip}`} exportName="dataviz-vbar">
      <defs>
        <FadeDef id={`${idp}-track`} color={C.track} end={0.25} />
        <FadeDef id={`${idp}-blue`} color={C.blue} end={0.7} />
      </defs>
      <rect x="52" y={top} width="56" height={h - fillH - 4} fill={`url(#${idp}-track)`} className="rise" />
      <rect x="52" y={top + h - fillH} width="56" height={fillH} fill={`url(#${idp}-blue)`} className="rise" style={{ '--i': 6 }} {...tp(tip)} />
      <path d={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => `M30 ${r2(top + (h / 10) * i)}h14`).join('')} stroke={C.track} strokeWidth="1" />
      <text x="80" y="402" fontSize="40" fontWeight="300" fill={C.ink} textAnchor="middle">{EFFICIENCY.value}</text>
    </Art>
  );
}

// (7) Angular polyline "mountain" with ring markers and thin arrows to the figures. The line is drawn in the
// shape of the source chart; only the three insight percentages are published values.
const MOUNTAIN = [[20, 196], [80, 150], [130, 172], [190, 84], [240, 132], [290, 104], [340, 164], [400, 60], [450, 126], [500, 156]];
export function Mountain() {
  const idp = 'dataviz-mountain';
  const marks = [
    { i: 3, v: INSIGHTS[2], tone: C.yellow },
    { i: 5, v: INSIGHTS[1], tone: C.blue },
    { i: 7, v: INSIGHTS[0], tone: C.blue },
  ];
  const line = MOUNTAIN.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join('');
  return (
    <Art viewBox="0 0 520 230" title="Angular mountain chart with three ring markers" exportName="dataviz-mountain">
      <defs><FadeDef id={`${idp}-fill`} color={C.blue} end={0} /></defs>
      <path d={`${line}L500 210L20 210Z`} fill={`url(#${idp}-fill)`} fillOpacity="0.22" className="fade-in" />
      <path d={line} fill="none" stroke={C.blue} strokeWidth="2" strokeLinejoin="miter" pathLength="1000" className="draw" />
      <path d="M20 210H500" stroke={C.track} strokeWidth="1" />
      {marks.map((m, n) => {
        const [x, y] = MOUNTAIN[m.i];
        const tip = `${m.v.value} ${m.v.label}`;
        return (
          <g key={m.i}>
            <path d={`M${x} ${y - 11}V44`} stroke={C.ink} strokeWidth="1" />
            <path d={`M${x - 3.5} 50L${x} 43L${x + 3.5} 50`} fill="none" stroke={C.ink} strokeWidth="1" />
            <text x={x} y="30" fontSize="24" fontWeight="300" fill={C.ink} textAnchor="middle">{m.v.value}</text>
            <g className="pop" style={{ '--i': n + 4 }}>
              <circle cx={x} cy={y} r="8" fill={C.paper} stroke={m.tone} strokeWidth="2.5" />
            </g>
            <circle cx={x} cy={y} r="14" fill={m.tone} fillOpacity="0" {...tp(tip)} />
          </g>
        );
      })}
    </Art>
  );
}

// (8) Stepped roadmap: yellow range handles on a solid blue base for what is done, grey ticks for what is next.
export function Roadmap() {
  const items = [...ROADMAP.done, ...ROADMAP.next];
  const base = 176, w = 78, gap = 6;
  return (
    <Art viewBox="0 0 520 230" title="Stepped roadmap" exportName="dataviz-roadmap">
      {items.map((label, i) => {
        const x = 10 + i * (w + gap), h = 36 + i * 20, top = base - h, done = i < ROADMAP.done.length;
        const tip = `${label}, ${done ? 'done' : 'next'}`;
        return (
          <g key={label}>
            {done ? (
              <>
                <rect x={x} y={top} width={w} height={h} fill={C.blue} className="rise" style={{ '--i': i * 2 }} />
                <g className="fade-in" style={{ '--i': i + 3 }}>
                  <path d={`M${x} ${top - 10}H${x + w}`} stroke={C.yellow} strokeWidth="1.4" />
                  <rect x={x - 2} y={top - 13.5} width="10" height="7" rx="1" fill={C.yellow} />
                  <rect x={x + w - 8} y={top - 13.5} width="10" height="7" rx="1" fill={C.yellow} />
                </g>
              </>
            ) : (
              <path d={Array.from({ length: 13 }, (_, k) => `M${r2(x + 2 + (k * (w - 4)) / 12)} ${top}V${base}`).join('')} stroke={C.track} strokeWidth="1" />
            )}
            <rect x={x} y={top - 14} width={w} height={h + 14} fill={C.blue} fillOpacity="0" {...tp(tip)} />
            <text x={x + w / 2} y={base + 24} fontSize="13" fontWeight="400" fill={C.ink} textAnchor="middle">{label}</text>
          </g>
        );
      })}
      <path d={`M10 ${base}H510`} stroke={C.ink} strokeWidth="1" />
      {(() => {
        const i = ROADMAP.done.length - 1, x = 10 + i * (w + gap) + w / 2, top = base - (36 + i * 20);
        return (
          <g className="pop" style={{ '--i': 8 }}>
            <PinG x={x} y={top - 34} r={7} tone="yellow" pulse />
            <text x={x} y={top - 52} fontSize="13" fontWeight="500" fill={C.ink} textAnchor="middle">{ROADMAP.here}</text>
          </g>
        );
      })()}
    </Art>
  );
}

// (9) Colour rings: concentric arcs in Tectra Blue, Signal Yellow and Sky.
export function Rings() {
  const rings = [
    { r: 80, col: C.blue, k: KPI.details },
    { r: 62, col: C.yellow, k: KPI.notes },
    { r: 44, col: C.sky, k: KPI.material },
  ];
  return (
    <Art viewBox="0 0 200 330" title="Colour rings" exportName="dataviz-rings">
      {rings.map((g) => (
        <circle key={g.r} cx="100" cy="100" r={g.r} fill="none" stroke={C.track} strokeWidth="6" />
      ))}
      {rings.map((g, i) => {
        const pct = parseInt(g.k.value, 10) / 100;
        return (
          <path key={g.r} d={arcPath(100, 100, g.r, 0, pct * 359.9)} fill="none" stroke={g.col} strokeWidth="6" strokeLinecap="round" pathLength="1000" className="draw" style={{ '--i': i * 3 }} {...tp(`${g.k.label} ${g.k.value}`)} />
        );
      })}
      <text x="100" y="110" fontSize="28" fontWeight="300" fill={C.ink} textAnchor="middle">{KPI.overall.value}</text>
      {rings.map((g, i) => (
        <g key={g.k.label} transform={`translate(10 ${224 + i * 32})`}>
          <circle cx="5" cy="-4" r="5" fill={g.col} />
          <text x="20" y="0" fontSize="14" fontWeight="400" fill={C.ink}>{g.k.label}</text>
          <text x="180" y="0" fontSize="14" fontWeight="500" fill={C.ink} textAnchor="end">{g.k.value}</text>
        </g>
      ))}
    </Art>
  );
}
