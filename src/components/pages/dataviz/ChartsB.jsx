import Art from '@/components/art/Art';
import { TickBarsG, IsoSiteG, SITE_PINS, iso } from '@/components/art/KeyArt';
import { scale, shares, ruler, r2 } from '@/lib/charts';
import { KPI, CUT_FILL, INSIGHTS, RESULTS, WORKCARD } from '@/lib/brand';
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
    <Art viewBox="0 0 520 560" title="Ranking of the six KPI values" exportName="dataviz-ranking">
      <defs>
        <FadeDef id={`${idp}-blue`} color={C.blue} dir="h" end={0.12} />
        <FadeDef id={`${idp}-yellow`} color={C.yellow} dir="h" end={0.12} />
      </defs>
      {rows.map(([label, v, col], i) => {
        const y = 16 + i * 80;
        return (
          <g key={label + i}>
            <text x="10" y={y + 16} fontSize="17" fontWeight="400" fill={C.muted}>{label}</text>
            <path d={`M10 ${y + 46}H410`} stroke={C.track} strokeWidth="1" />
            <rect x="10" y={y + 28} width={r2(sx(v))} height="16" fill={`url(#${idp}-${col === C.yellow ? 'yellow' : 'blue'})`} className="grow-x" style={{ '--i': i }} {...tp(`${label} ${v}%`)} />
            <text x="510" y={y + 44} fontSize="30" fontWeight="300" fill={C.ink} textAnchor="end">{v}%</text>
          </g>
        );
      })}
      <path d={ruler(10, 400).map((x) => `M${10 + x} 506v8`).join('')} stroke={C.track} strokeWidth="1" />
      {[0, 50, 100].map((v) => (
        <text key={v} x={10 + sx(v)} y="540" fontSize="16" fontWeight="400" fill={C.muted} textAnchor="middle">{v}</text>
      ))}
    </Art>
  );
}

// Share: Cut against Fill as a ring of two arcs, Net in the centre.
export function Share() {
  const [cut, fill] = shares([250395, 23995], 120, 92, 70, 5);
  return (
    <Art viewBox="0 0 240 216" title="Share of cut and fill" exportName="dataviz-share">
      <circle cx="120" cy="92" r="70" fill="none" stroke={C.track} strokeWidth="1" />
      <path d={cut.d} fill="none" stroke={C.yellow} strokeWidth="7" strokeLinecap="butt" pathLength="1000" className="draw" {...tp(`Cut ${CUT_FILL.indicators[0][1]}`)} />
      <path d={fill.d} fill="none" stroke={C.blue} strokeWidth="7" strokeLinecap="butt" pathLength="1000" className="draw" style={{ '--i': 6 }} {...tp(`Fill ${CUT_FILL.indicators[1][1]}`)} />
      <text x="120" y="78" fontSize="15" fontWeight="400" fill={C.muted} textAnchor="middle">{CUT_FILL.indicators[2][0]}</text>
      <text x="120" y="104" fontSize="26" fontWeight="300" fill={C.ink} textAnchor="middle">{CUT_FILL.indicators[2][1].replace(' cu yd', '')}</text>
      <text x="120" y="124" fontSize="15" fontWeight="400" fill={C.muted} textAnchor="middle">cu yd</text>
      <circle cx="22" cy="180" r="5" fill={C.yellow} />
      <text x="34" y="185" fontSize="15" fontWeight="400" fill={C.ink}>{CUT_FILL.indicators[0].join(' ')}</text>
      <circle cx="22" cy="202" r="5" fill={C.blue} />
      <text x="34" y="207" fontSize="15" fontWeight="400" fill={C.ink}>{CUT_FILL.indicators[1].join(' ')}</text>
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
            <text x={x} y={ly} fontSize="16" fontWeight="400" fill={C.ink} textAnchor="middle">{v}%</text>
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
  const band = (a0, a1, b0, b1) => `M140 ${a0}L380 ${b0}L380 ${b1}L140 ${a1}Z`;
  return (
    <Art viewBox="0 0 560 230" title="Flow from cut to fill and net" exportName="dataviz-flow">
      <defs>
        <linearGradient id={`${idp}-fill`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={C.blue} stopOpacity="0.9" /><stop offset="1" stopColor={C.blue} stopOpacity="0.3" /></linearGradient>
        <linearGradient id={`${idp}-net`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={C.sky} stopOpacity="0.9" /><stop offset="1" stopColor={C.sky} stopOpacity="0.3" /></linearGradient>
      </defs>
      <path d={band(y0, y0 + fillH, y0, y0 + fillH)} fill={`url(#${idp}-fill)`} className="fade-in" {...tp(`Fill ${CUT_FILL.indicators[1][1]}`)} />
      <path d={band(y0 + fillH, y0 + cutH, netY, netY + netH)} fill={`url(#${idp}-net)`} className="fade-in" style={{ '--i': 3 }} {...tp(`Net ${CUT_FILL.indicators[2][1]}`)} />
      <rect x="130" y={y0} width="10" height={cutH} fill={C.yellow} className="rise" {...tp(`Cut ${CUT_FILL.indicators[0][1]}`)} />
      <rect x="380" y={y0} width="10" height={fillH} fill={C.blue} className="rise" />
      <rect x="380" y={netY} width="10" height={netH} fill={C.sky} className="rise" />
      <text x="118" y="84" fontSize="16" fontWeight="400" fill={C.muted} textAnchor="end">{CUT_FILL.indicators[0][0]}</text>
      <text x="118" y="110" fontSize="24" fontWeight="300" fill={C.ink} textAnchor="end">250,395</text>
      <text x="118" y="130" fontSize="16" fontWeight="400" fill={C.muted} textAnchor="end">cu yd</text>
      <text x="404" y={y0 + 12} fontSize="16" fontWeight="400" fill={C.muted}>{CUT_FILL.indicators[1][0]}</text>
      <text x="404" y={y0 + 36} fontSize="20" fontWeight="300" fill={C.ink}>{CUT_FILL.indicators[1][1]}</text>
      <text x="404" y={netY + 62} fontSize="16" fontWeight="400" fill={C.muted}>{CUT_FILL.indicators[2][0]}</text>
      <text x="404" y={netY + 86} fontSize="20" fontWeight="300" fill={C.ink}>{CUT_FILL.indicators[2][1]}</text>
    </Art>
  );
}

// Place: the isometric site with its location pins. The case study gives a value to one place only, the
// The work card (10 - 14 Jan, 2025, 32%), so only that pin is labelled; the others are plain location pins.
export function Place() {
  const plain = ['ridge', 'wing', 'yard', 'gate'];
  const [kx, ky] = iso(...SITE_PINS.workcard, 20);
  const tip = `${WORKCARD.name}, ${WORKCARD.dates}, ${WORKCARD.value}`;
  return (
    <Art viewBox="0 0 560 400" title={`Site with location pins: ${tip}`} exportName="dataviz-place">
      <IsoSiteG tone="paper" />
      <g transform="translate(262 118)">
        {plain.map((name, i) => {
          const [x, y] = iso(...SITE_PINS[name], 20);
          return (
            <g key={name} className="pop" style={{ '--i': i }}>
              <circle cx={x} cy={y} r="8" fill={C.blue} />
              <circle cx={x} cy={y} r="3" fill="#FFFFFF" />
            </g>
          );
        })}
        <g className="pop" style={{ '--i': 5 }}>
          <circle cx={kx} cy={ky} r="11" fill={C.yellow} />
          <circle cx={kx} cy={ky} r="4" fill="#FFFFFF" />
        </g>
        <circle cx={kx} cy={ky} r="16" fill={C.yellow} fillOpacity="0" {...tp(tip)} />
        <g className="fade-in" style={{ '--i': 7 }}>
          <path d={`M${kx + 12} ${ky - 6}L${kx + 34} ${ky - 40}H${kx + 46}`} fill="none" stroke={C.ink} strokeWidth="1" />
          <text x={kx + 50} y={ky - 46} fontSize="17" fontWeight="500" fill={C.ink} stroke="#FFFFFF" strokeWidth="4" paintOrder="stroke">{WORKCARD.name}</text>
          <text x={kx + 50} y={ky - 18} fontSize="26" fontWeight="300" fill={C.ink} stroke="#FFFFFF" strokeWidth="4" paintOrder="stroke">{WORKCARD.value}</text>
        </g>
      </g>
    </Art>
  );
}

// Time: the work dates and the Cut and Fill date as a calendar strip.
export function Calendar() {
  const days = [10, 11, 12, 13, 14];
  const w = 56, gap = 6, x0 = 20;
  const end = x0 + days.length * w + (days.length - 1) * gap;
  return (
    <Art viewBox="0 0 520 150" title="Calendar strip: 10 to 14 Jan, 2025 and 17 Dec" exportName="dataviz-calendar">
      <text x={x0} y="22" fontSize="16" fontWeight="500" fill={C.ink}>{WORKCARD.name}</text>
      {days.map((d, i) => (
        <g key={d} className="fade-in" style={{ '--i': i }}>
          <rect x={x0 + i * (w + gap)} y="34" width={w} height="52" rx="2" fill={C.sky} {...tp(`${d} Jan, 2025`)} />
          <text x={x0 + i * (w + gap) + w / 2} y="68" fontSize="22" fontWeight="300" fill={C.ink} textAnchor="middle">{d}</text>
        </g>
      ))}
      <path d={`M${x0} 102H${end}`} stroke={C.blue} strokeWidth="1.2" />
      <rect x={x0 - 2} y="98.5" width="10" height="7" rx="1" fill={C.blue} />
      <rect x={end - 8} y="98.5" width="10" height="7" rx="1" fill={C.blue} />
      <text x={x0} y="130" fontSize="16" fontWeight="400" fill={C.muted}>{WORKCARD.dates}</text>
      <text x="352" y="74" fontSize="22" fontWeight="300" fill={C.muted} textAnchor="middle">{'//'}</text>
      <g className="fade-in" style={{ '--i': 6 }}>
        <rect x="388" y="34" width={w} height="52" rx="2" fill={C.yellow} {...tp('17 Dec')} />
        <text x={388 + w / 2} y="68" fontSize="22" fontWeight="300" fill={C.ink} textAnchor="middle">17</text>
      </g>
      <text x={388 + w / 2} y="130" fontSize="16" fontWeight="400" fill={C.muted} textAnchor="middle">{KPI.progress.date}</text>
    </Art>
  );
}

// Comparison: two insights as paired tick bars.
export function Paired() {
  const [a, b] = [INSIGHTS[0], INSIGHTS[2]];
  const cols = [[a, 10, 'dataviz-pair-a'], [b, 290, 'dataviz-pair-b']];
  return (
    <Art viewBox="0 0 540 210" title="Paired tick bars: 72% and 64%" exportName="dataviz-paired">
      {cols.map(([ins, x, idp]) => {
        const band = (ins.to - ins.from) * 240;
        return (
          <g key={idp}>
            <text x={x} y="34" fontSize="32" fontWeight="300" fill={C.ink}>{ins.value}</text>
            <TickBarsG idp={idp} x={x} y={48} w={240} h={60} count={24} from={ins.from} to={ins.to} tone={ins.tone} rise />
            <rect x={x + ins.from * 240} y="48" width={band} height="88" fill={C.blue} fillOpacity="0" {...tp(`${ins.value} ${ins.label}`)} />
            {wrap(ins.label, 28).map((line, i) => (
              <text key={i} x={x} y={162 + i * 20} fontSize="16" fontWeight="400" fill={C.muted}>{line}</text>
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
    ['teams increased task efficiency', 40, C.blue],
  ];
  const sx = scale(0, 100, 10, 510);
  return (
    <Art viewBox="0 0 520 200" title="Bullet bars on a ruler" exportName="dataviz-bullet">
      {rows.map(([label, v, col], i) => {
        const y = 16 + i * 48;
        return (
          <g key={label}>
            <text x="10" y={y + 10} fontSize="16" fontWeight="400" fill={C.muted}>{label}</text>
            <text x="510" y={y + 12} fontSize="24" fontWeight="300" fill={C.ink} textAnchor="end">{v}%</text>
            {[[0, 33, '#EFEFEF'], [33, 66, '#E6E6E6'], [66, 100, '#DDDDDD']].map(([a, b, f]) => (
              <rect key={a} x={sx(a)} y={y + 20} width={r2(sx(b) - sx(a))} height="14" fill={f} />
            ))}
            <rect x="10" y={y + 25} width={r2(sx(v) - 10)} height="4" fill={col} className="grow-x" style={{ '--i': i }} />
            <g className="pop" style={{ '--i': i + 2 }}><circle cx={sx(v)} cy={y + 27} r="6" fill={C.paper} stroke={col} strokeWidth="2.5" /></g>
            <circle cx={sx(v)} cy={y + 27} r="11" fill={col} fillOpacity="0" {...tp(`${label} ${v}%`)} />
          </g>
        );
      })}
      <path d={ruler(10, 500).map((x) => `M${10 + x} 166v7`).join('')} stroke={C.track} strokeWidth="1" />
      {[0, 50, 100].map((v) => (
        <text key={v} x={sx(v)} y="194" fontSize="15" fontWeight="400" fill={C.muted} textAnchor="middle">{v}</text>
      ))}
    </Art>
  );
}
