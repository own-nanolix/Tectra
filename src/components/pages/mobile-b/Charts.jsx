import { HEX, CUT_FILL } from '@/lib/brand';
import { AXIS, axisLabels, tickBars, ruler, r2 } from '@/lib/charts';

// Cut and Fill markers: yellow "cut" markers (bar on top, stem down) alternate with blue "fill" markers
// (bar at the bottom, stem up), strongest first, then fading. Box 300 x 130.
export function MarkersG({ x = 0, y = 0 }) {
  const fades = [1, 1, 0.6, 0.6, 0.32, 0.32];
  return (
    <g transform={`translate(${x} ${y})`} fontSize="11" fill={HEX.muted}>
      {fades.map((o, i) => {
        const cx = 24 + i * 50, cut = i % 2 === 0;
        const label = cut ? CUT_FILL.bottom[i / 2] : CUT_FILL.top[(i - 1) / 2];
        const col = cut ? HEX.yellow : HEX.blue;
        return (
          <g key={i} opacity={o}>
            <path d={cut ? `M${cx} 16V96` : `M${cx} 112V36`} stroke={col} strokeWidth="1.4" />
            <rect x={cx - 20} y={cut ? 13 : 111} width="40" height="4" rx="1" fill={col} />
            <circle cx={cx} cy={cut ? 36 : 94} r="3.4" fill={col} />
            <text x={cx} y={cut ? 112 : 28} textAnchor="middle" fill={HEX.muted}>{label}</text>
          </g>
        );
      })}
    </g>
  );
}

// Tick bars with a range band and the designer's axis. `lo` / `hi` are bar indexes. Box w x (h + 40).
export function RangeChartG({ idp, x = 0, y = 0, w = 340, h = 70, count = 50, lo = 35, hi = 45, tone = 'blue', labels = true }) {
  const col = tone === 'yellow' ? HEX.yellow : HEX.blue;
  const bars = tickBars(count, w, 0, 0, 0.5);
  const on = (i) => i >= lo && i < hi;
  const b0 = bars[lo], b1 = bars[Math.min(hi, count) - 1];
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <linearGradient id={`${idp}-off`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#BDBDBD" /><stop offset="1" stopColor="#BDBDBD" stopOpacity="0" /></linearGradient>
        <linearGradient id={`${idp}-on`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={col} /><stop offset="1" stopColor={col} stopOpacity="0" /></linearGradient>
      </defs>
      {bars.map((b, i) => <rect key={i} x={b.x} y="0" width={b.w} height={h} fill={`url(#${idp}-${on(i) ? 'on' : 'off'})`} />)}
      <path d={ruler(count, w).map((tx) => `M${tx} ${h + 12}v10`).join('')} stroke="#BDBDBD" strokeWidth="1" />
      {b0 && b1 && (
        <g fill={col}>
          <path d={`M${b0.x} ${h + 17}H${r2(b1.x + b1.w)}`} stroke={col} strokeWidth="1.4" />
          <rect x={b0.x - 3} y={h + 12} width="9" height="10" rx="1.5" />
          <rect x={r2(b1.x + b1.w - 6)} y={h + 12} width="9" height="10" rx="1.5" />
        </g>
      )}
      {labels && axisLabels(w - 8, AXIS).map((a) => <text key={a.label} x={a.x + 4} y={h + 38} fontSize="10" textAnchor="middle" fill={HEX.muted}>{a.label}</text>)}
    </g>
  );
}
