import Art from '@/components/art/Art';
import { TickBarsG, IsoSiteG, SITE_PINS, iso } from '@/components/art/KeyArt';
import { scale, shares, ruler, r2 } from '@/lib/charts';
import { KPI, CUT_FILL, INSIGHTS, RESULTS, KOMATSU } from '@/lib/brand';
import { C, tp, FadeDef, wrap } from './parts';

// The seven charts added in the same language: thin, angular, measured, fading bars, ring markers, handles.

// Ranking: horizontal bars that fade to the right, ordered by published value.
export function Ranking() {
  const idp = 'dataviz-rank';
  const rows = [
    [KPI.details.label, 76, C.blue], [KPI.cross.label, 76, C.blue], [KPI.overall.label, 66, C.blue],
    [KPI.notes.label, 64, C.yellow], [KPI.material.label, 32, C.blue], [KPI.progress.label, 24, C.blue],
  ];
  const sx = scale(0, 100, 0, 400);
  return (
    <Art viewBox="0 0 520 410" title="Ranking of the six KPI values" exportName="dataviz-ranking">
      <defs>
        <FadeDef id={`${idp}-blue`} color={C.blue} dir="h" end={0.12} />
        <FadeDef id={`${idp}-yellow`} color={C.yellow} dir="h" end={0.12} />
      </defs>
      {rows.map(([label, v, col], i) => {
        const y = 14 + i * 56;
        return (
          <g key={label + i}>
            <text x="10" y={y + 12} fontSize="14" fontWeight="400" fill={C.muted}>{label}</text>
            <path d={`M10 ${y + 36}H410`} stroke={C.track} strokeWidth="1" />
            <rect x="10" y={y + 20} width={r2(sx(v))} height="14" fill={`url(#${idp}-${col === C.yellow ? 'yellow' : 'blue'})`} className="grow-x" style={{ '--i': i }} {...tp(`${label} ${v}%`)} />
            <text x="510" y={y + 34} fontSize="26" fontWeight="300" fill={C.ink} textAnchor="end">{v}%</text>
          </g>
        );
      })}
      <path d={ruler(10, 400).map((x) => `M${10 + x} 356v8`).join('')} stroke={C.track} strokeWidth="1" />
      {[0, 50, 100].map((v) => (
        <text key={v} x={10 + sx(v)} y="388" fontSize="13" fontWeight="400" fill={C.muted} textAnchor="middle">{v}</text>
      ))}
    </Art>
  );
}

// Share: Cut against Fill as a ring of two arcs, Net in the centre.
export function Share() {
  const [cut, fill] = shares([250395, 23995], 120, 92, 70, 5);
  return (
    <Art viewBox="0 0 240 210" title="Share of cut and fill" exportName="dataviz-share">
      <circle cx="120" cy="92" r="70" fill="none" stroke={C.track} strokeWidth="1" />
      <path d={cut.d} fill="none" stroke={C.yellow} strokeWidth="7" strokeLinecap="butt" pathLength="1000" className="draw" {...tp(`Cut ${CUT_FILL.indicators[0][1]}`)} />
      <path d={fill.d} fill="none" stroke={C.blue} strokeWidth="7" strokeLinecap="butt" pathLength="1000" className="draw" style={{ '--i': 6 }} {...tp(`Fill ${CUT_FILL.indicators[1][1]}`)} />
      <text x="120" y="94" fontSize="24" fontWeight="300" fill={C.ink} textAnchor="middle">226,400</text>
      <text x="120" y="114" fontSize="13" fontWeight="400" fill={C.muted} textAnchor="middle">Net cu yd</text>
      <circle cx="30" cy="182" r="4" fill={C.yellow} />
      <text x="42" y="187" fontSize="13" fontWeight="400" fill={C.ink}>{CUT_FILL.indicators[0].join(' ')}</text>
      <circle cx="30" cy="200" r="4" fill={C.blue} />
      <text x="42" y="205" fontSize="13" fontWeight="400" fill={C.ink}>{CUT_FILL.indicators[1].join(' ')}</text>
    </Art>
  );
}

// Distribution: every published percentage as a ring dot on one ruler.
export function DotStrip() {
  const vals = [24, 25, 32, 40, 59, 64, 66, 72, 76];
  const warm = [25, 64];
  const sx = scale(0, 100, 20, 500);
  return (
    <Art viewBox="0 0 520 150" title="Published percentages on a ruler" exportName="dataviz-dots">
      <path d="M20 84H500" stroke={C.ink} strokeWidth="1" />
      <path d={ruler(20, 480).map((x, i) => `M${20 + x} 84v${i % 2 ? 6 : 10}`).join('')} stroke={C.track} strokeWidth="1" />
      {[0, 50, 100].map((v) => (
        <text key={v} x={sx(v)} y="118" fontSize="13" fontWeight="400" fill={C.muted} textAnchor="middle">{v}</text>
      ))}
      {vals.map((v, i) => {
        const x = r2(sx(v)), ly = i % 2 ? 54 : 30, col = warm.includes(v) ? C.yellow : C.blue;
        return (
          <g key={v}>
            <path d={`M${x} ${ly + 6}V78`} stroke={C.track} strokeWidth="1" />
            <text x={x} y={ly} fontSize="14" fontWeight="400" fill={C.ink} textAnchor="middle">{v}%</text>
            <g className="pop" style={{ '--i': i }}><circle cx={x} cy="84" r="5.5" fill={C.paper} stroke={col} strokeWidth="2.5" /></g>
            <circle cx={x} cy="84" r="10" fill={col} fillOpacity="0" {...tp(`${v}%`)} />
          </g>
        );
      })}
    </Art>
  );
}

// Flow: Cut splits into Fill and Net as straight-edged bands.
export function Flow() {
  const idp = 'dataviz-flow';
  const H = 150, cutH = H, fillH = r2((H * 23995) / 250395), netH = r2((H * 226400) / 250395);
  const y0 = 26, netY = 70;
  const band = (a0, a1, b0, b1) => `M140 ${a0}L420 ${b0}L420 ${b1}L140 ${a1}Z`;
  return (
    <Art viewBox="0 0 560 230" title="Flow from cut to fill and net" exportName="dataviz-flow">
      <defs>
        <linearGradient id={`${idp}-fill`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={C.blue} stopOpacity="0.9" /><stop offset="1" stopColor={C.blue} stopOpacity="0.3" /></linearGradient>
        <linearGradient id={`${idp}-net`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={C.sky} stopOpacity="0.9" /><stop offset="1" stopColor={C.sky} stopOpacity="0.3" /></linearGradient>
      </defs>
      <path d={band(y0, y0 + fillH, y0, y0 + fillH)} fill={`url(#${idp}-fill)`} className="fade-in" {...tp(`Fill ${CUT_FILL.indicators[1][1]}`)} />
      <path d={band(y0 + fillH, y0 + cutH, netY, netY + netH)} fill={`url(#${idp}-net)`} className="fade-in" style={{ '--i': 3 }} {...tp(`Net ${CUT_FILL.indicators[2][1]}`)} />
      <rect x="130" y={y0} width="10" height={cutH} fill={C.yellow} className="rise" {...tp(`Cut ${CUT_FILL.indicators[0][1]}`)} />
      <rect x="420" y={y0} width="10" height={fillH} fill={C.blue} className="rise" />
      <rect x="420" y={netY} width="10" height={netH} fill={C.sky} className="rise" />
      <text x="118" y="88" fontSize="13" fontWeight="400" fill={C.muted} textAnchor="end">Cut:</text>
      <text x="118" y="110" fontSize="20" fontWeight="300" fill={C.ink} textAnchor="end">250,395</text>
      <text x="118" y="128" fontSize="13" fontWeight="400" fill={C.muted} textAnchor="end">cu yd</text>
      <text x="442" y={y0 + 10} fontSize="13" fontWeight="400" fill={C.muted}>Fill:</text>
      <text x="442" y={y0 + 32} fontSize="20" fontWeight="300" fill={C.ink}>23,995 cu yd</text>
      <text x="442" y={netY + 62} fontSize="13" fontWeight="400" fill={C.muted}>Net:</text>
      <text x="442" y={netY + 84} fontSize="20" fontWeight="300" fill={C.ink}>226,400 cu yd</text>
    </Art>
  );
}

// Place: the isometric site with ring pins sized by value. Komatsu carries its published 32%.
export function Place() {
  const pins = [['ridge', 72], ['wing', 59], ['yard', 64], ['gate', 25], ['komatsu', 32]];
  return (
    <Art viewBox="0 0 560 400" title="Site with pins sized by value" exportName="dataviz-place">
      <IsoSiteG tone="paper" />
      <g transform="translate(262 118)">
        {pins.map(([name, v], i) => {
          const [x, y] = iso(...SITE_PINS[name], 20), r = r2(6 + v * 0.13), col = name === 'komatsu' ? C.yellow : C.blue;
          const tip = name === 'komatsu' ? `${KOMATSU.name} ${v}%` : `Pin ${v}%`;
          return (
            <g key={name}>
              <g className="pop" style={{ '--i': i }}>
                <circle cx={x} cy={y} r={r} fill={col} />
                <circle cx={x} cy={y} r={r2(r * 0.36)} fill="#FFFFFF" />
              </g>
              <circle cx={x} cy={y} r={r + 4} fill={col} fillOpacity="0" {...tp(tip)} />
              <text x={x + r + 6} y={y + 5} fontSize="15" fontWeight="500" fill={C.ink} stroke="#FFFFFF" strokeWidth="3" paintOrder="stroke">{v}%</text>
            </g>
          );
        })}
      </g>
    </Art>
  );
}

// Time: the Komatsu work dates and the Cut and Fill date as a calendar strip.
export function Calendar() {
  const days = [10, 11, 12, 13, 14];
  const w = 56, gap = 6, x0 = 20;
  const end = x0 + days.length * w + (days.length - 1) * gap;
  return (
    <Art viewBox="0 0 520 150" title="Calendar strip: 10 to 14 Jan, 2025 and 17 Dec" exportName="dataviz-calendar">
      <text x={x0} y="22" fontSize="14" fontWeight="500" fill={C.ink}>{KOMATSU.name}</text>
      {days.map((d, i) => (
        <g key={d} className="fade-in" style={{ '--i': i }}>
          <rect x={x0 + i * (w + gap)} y="34" width={w} height="52" rx="2" fill={C.sky} {...tp(`${d} Jan, 2025`)} />
          <text x={x0 + i * (w + gap) + w / 2} y="68" fontSize="22" fontWeight="300" fill={C.ink} textAnchor="middle">{d}</text>
        </g>
      ))}
      <path d={`M${x0} 102H${end}`} stroke={C.blue} strokeWidth="1.2" />
      <rect x={x0 - 2} y="98.5" width="10" height="7" rx="1" fill={C.blue} />
      <rect x={end - 8} y="98.5" width="10" height="7" rx="1" fill={C.blue} />
      <text x={x0} y="128" fontSize="13" fontWeight="400" fill={C.muted}>{KOMATSU.dates}</text>
      <text x="352" y="74" fontSize="22" fontWeight="300" fill={C.muted} textAnchor="middle">{'//'}</text>
      <g className="fade-in" style={{ '--i': 6 }}>
        <rect x="388" y="34" width={w} height="52" rx="2" fill={C.yellow} {...tp('17 Dec')} />
        <text x={388 + w / 2} y="68" fontSize="22" fontWeight="300" fill={C.ink} textAnchor="middle">17</text>
      </g>
      <text x={388 + w / 2} y="128" fontSize="13" fontWeight="400" fill={C.muted} textAnchor="middle">17 Dec</text>
    </Art>
  );
}

// Comparison: two insights as paired tick bars.
export function Paired() {
  const [a, b] = [INSIGHTS[0], INSIGHTS[2]];
  const cols = [[a, 10, 'dataviz-pair-a'], [b, 290, 'dataviz-pair-b']];
  return (
    <Art viewBox="0 0 540 200" title="Paired tick bars: 72% and 64%" exportName="dataviz-paired">
      {cols.map(([ins, x, idp]) => {
        const band = (ins.to - ins.from) * 240;
        return (
          <g key={idp}>
            <text x={x} y="36" fontSize="30" fontWeight="300" fill={C.ink}>{ins.value}</text>
            <TickBarsG idp={idp} x={x} y={50} w={240} h={64} count={24} from={ins.from} to={ins.to} tone={ins.tone} rise />
            <rect x={x + ins.from * 240} y="50" width={band} height="92" fill={C.blue} fillOpacity="0" {...tp(`${ins.value} ${ins.label}`)} />
            {wrap(ins.label, 34).map((line, i) => (
              <text key={i} x={x} y={168 + i * 17} fontSize="13" fontWeight="400" fill={C.muted}>{line}</text>
            ))}
          </g>
        );
      })}
    </Art>
  );
}

// Target: measures on a ruler with banded ranges and ring markers at the end of each bar.
export function Bullet() {
  const rows = [
    [RESULTS[0].label, 32, C.blue],
    [RESULTS[2].label, 25, C.yellow],
    ['Task efficiency', 40, C.blue],
  ];
  const sx = scale(0, 100, 10, 510);
  return (
    <Art viewBox="0 0 520 190" title="Bullet bars on a ruler" exportName="dataviz-bullet">
      {rows.map(([label, v, col], i) => {
        const y = 14 + i * 46;
        return (
          <g key={label}>
            <text x="10" y={y + 10} fontSize="13" fontWeight="400" fill={C.muted}>{label}</text>
            <text x="510" y={y + 12} fontSize="22" fontWeight="300" fill={C.ink} textAnchor="end">{v}%</text>
            {[[0, 33, '#EFEFEF'], [33, 66, '#E6E6E6'], [66, 100, '#DDDDDD']].map(([a, b, f]) => (
              <rect key={a} x={sx(a)} y={y + 20} width={r2(sx(b) - sx(a))} height="14" fill={f} />
            ))}
            <rect x="10" y={y + 25} width={r2(sx(v) - 10)} height="4" fill={col} className="grow-x" style={{ '--i': i }} />
            <g className="pop" style={{ '--i': i + 2 }}><circle cx={sx(v)} cy={y + 27} r="6" fill={C.paper} stroke={col} strokeWidth="2.5" /></g>
            <circle cx={sx(v)} cy={y + 27} r="11" fill={col} fillOpacity="0" {...tp(`${label} ${v}%`)} />
          </g>
        );
      })}
      <path d={ruler(10, 500).map((x) => `M${10 + x} 156v7`).join('')} stroke={C.track} strokeWidth="1" />
      {[0, 50, 100].map((v) => (
        <text key={v} x={sx(v)} y="182" fontSize="13" fontWeight="400" fill={C.muted} textAnchor="middle">{v}</text>
      ))}
    </Art>
  );
}
