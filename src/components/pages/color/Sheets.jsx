import Art from '@/components/art/Art';
import { HEX } from '@/lib/brand';
import { contrast } from '@/lib/site';
import { r2 } from '@/lib/charts';
import { BLUES, MODES, NEUTRALS, PAIRS, PROPORTION, ROLES, ROLE_LABEL, SIGNALS, fmtRatio, rating, rgbOf, textOn } from './colorData';

const PAD = 20;

// One row of swatches: returns the cells as SVG groups at y.
function SwatchRow({ rows, y, cw, gap, h, start = 0 }) {
  return rows.map((row, i) => {
    const x = PAD + i * (cw + gap);
    const ink = textOn(row.hex);
    return (
      <g key={row.token} className="fade-in" style={{ '--i': start + i }}>
        <rect x={x} y={y} width={cw} height={h} rx="4" fill={row.hex} stroke={contrast(row.hex, HEX.paper) < 1.15 ? HEX.app : 'none'} />
        <text x={x + 10} y={y + 20} fontSize="11" fontWeight="500" fill={ink}>{row.token}</text>
        <text x={x + 10} y={y + h - 38} fontSize="12" fontWeight="500" fill={ink}>{row.name}</text>
        <text x={x + 10} y={y + h - 22} fontSize="12" fontWeight="400" fill={ink}>{row.hex}</text>
        <text x={x + 10} y={y + h - 8} fontSize="10" fontWeight="400" fill={ink}>{rgbOf(row.hex).replace('rgb(', '').replace(')', '')}</text>
      </g>
    );
  });
}

export function PrimarySheet() {
  const cw = 112, gap = 6, h = 190;
  const W = PAD * 2 + 9 * cw + 8 * gap;
  const H = PAD * 2 + h * 2 + 14;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Primary colour scale: nine blues from a pale tint to Navy, then Signal Yellow and Alert Red with their tints and inks" exportName="color-primary-sheet">
      <rect width={W} height={H} rx="6" fill={HEX.tile} />
      <SwatchRow rows={BLUES} y={PAD} cw={cw} gap={gap} h={h} />
      <SwatchRow rows={SIGNALS} y={PAD + h + 14} cw={cw} gap={gap} h={h} start={9} />
    </Art>
  );
}

export function NeutralSheet() {
  const cw = 92, gap = 6, h = 190;
  const W = PAD * 2 + NEUTRALS.length * cw + (NEUTRALS.length - 1) * gap;
  const H = PAD * 2 + h;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Neutral scale from White to Black" exportName="color-neutral-sheet">
      <rect width={W} height={H} rx="6" fill={HEX.white} />
      <SwatchRow rows={NEUTRALS} y={PAD} cw={cw} gap={gap} h={h} />
    </Art>
  );
}

// The proportion bar: a full-bleed strip. Shares are estimates read from the case study images.
// The bar sits on the page's 90 px side margins (at 1600) so the labels stay inside the frame.
export function ProportionBar() {
  const W = 1600, H = 200, X0 = 90, BW = W - 2 * X0, barY = 56, barH = 64;
  const parts = PROPORTION.map((p, i) => {
    const before = PROPORTION.slice(0, i).reduce((a, b) => a + b.pct, 0);
    return { ...p, x: X0 + (BW * before) / 100, w: (BW * p.pct) / 100 };
  });
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Proportion of colour in the case study: neutrals about 60 percent, blues about 30, yellow about 8, red under 2" exportName="color-proportion-bar">
      <rect width={W} height={H} fill={HEX.paper} />
      <text x={X0} y="32" fontSize="15" fontWeight="500" fill={HEX.ink}>Proportion</text>
      <text x={W - X0} y="32" textAnchor="end" fontSize="14" fontWeight="400" fill={HEX.muted}>Estimates read from the case study images</text>
      {parts.map((p, i) => {
        const bw = p.w / p.colors.length;
        const last = i === parts.length - 1;
        return (
          <g key={p.id}>
            <g className="grow-x" style={{ '--i': i * 2 }}>
              {p.colors.map((c, k) => (
                <rect key={c} x={r2(p.x + k * bw)} y={barY} width={r2(bw + 0.5)} height={barH} fill={c} />
              ))}
            </g>
            <path d={`M${r2(p.x)} ${barY + barH + 8}v${last ? 42 : 14}`} stroke={HEX.app} strokeWidth="1.5" />
            <text
              x={last ? W - X0 : r2(p.x)} y={barY + barH + (last ? 64 : 36)} textAnchor={last ? 'end' : 'start'}
              fontSize="16" fontWeight="500" fill={HEX.ink}
            >
              {p.label}
            </text>
          </g>
        );
      })}
      <rect x={X0} y={barY} width={BW} height={barH} fill="none" stroke={HEX.app} strokeWidth="1" />
    </Art>
  );
}

export function PairingSheet() {
  const cw = 360, ch = 190, gap = 16;
  const W = PAD * 2 + 3 * cw + 2 * gap;
  const H = PAD * 2 + 2 * ch + gap;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Six accessible colour pairings with their contrast ratios" exportName="color-pairings">
      <rect width={W} height={H} rx="6" fill={HEX.tile} />
      {PAIRS.map((p, i) => {
        const x = PAD + (i % 3) * (cw + gap);
        const y = PAD + Math.floor(i / 3) * (ch + gap);
        const ratio = contrast(p.fg, p.bg);
        return (
          <g key={p.id} className="slide-up" style={{ '--i': i }}>
            <rect x={x} y={y} width={cw} height={ch} rx="4" fill={p.bg} stroke={contrast(p.bg, HEX.tile) < 1.2 ? HEX.app : 'none'} />
            <text x={x + 22} y={y + 78} fontSize="46" fontWeight="300" fill={p.fg}>Aa</text>
            <text x={x + 22} y={y + 112} fontSize="15" fontWeight="400" fill={p.fg}>Smart Construction</text>
            <text x={x + 22} y={y + 150} fontSize="14" fontWeight="500" fill={p.fg}>{p.label}</text>
            <text x={x + 22} y={y + 170} fontSize="13" fontWeight="400" fill={p.fg}>{`${fmtRatio(ratio)}  ${rating(ratio)}  ${p.bg} / ${p.fg}`}</text>
          </g>
        );
      })}
    </Art>
  );
}

// One semantic panel: the app card pattern (title, figure, trend) in the given mode, then the role list.
export function SemanticPanel({ mode }) {
  const m = MODES.find((o) => o.id === mode);
  const W = 520, H = 440;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title={`Semantic tokens, ${m.label.toLowerCase()} mode`} exportName={`color-semantic-${m.id}`}>
      <rect width={W} height={H} rx="6" fill={m.bg} stroke={m.id === 'light' ? HEX.app : 'none'} />
      <text x="28" y="44" fontSize="16" fontWeight="500" fill={m.text}>{m.label}</text>
      {[['Details', '76%', '+2.4%', 'up', 28], ['Notes', '64%', '-1.9%', 'down', 274]].map(([t, v, tr, dir, x]) => (
        <g key={t}>
          <rect x={x} y="68" width="218" height="150" rx="4" fill={m.surface} />
          <text x={x + 16} y="96" fontSize="18" fontWeight="500" fill={m.text}>{t}</text>
          <text x={x + 16} y="150" fontSize="44" fontWeight="300" fill={m.text}>{v}</text>
          <text x={x + 16} y="182" fontSize="13" fontWeight="400" fill={m.muted}>{tr}</text>
          <path d={dir === 'up' ? `M${x + 66} 177l5 -8l5 8z` : `M${x + 66} 170l5 8l5 -8z`} fill={dir === 'up' ? m.positive : m.negative} />
          <rect x={x + 16} y="198" width="186" height="4" rx="2" fill={m.bg} />
          <rect x={x + 16} y="198" width={dir === 'up' ? 142 : 119} height="4" rx="2" fill={dir === 'up' ? m.accent : m.signal} />
        </g>
      ))}
      {ROLES.map((role, i) => {
        const y = 256 + i * 22;
        return (
          <g key={role}>
            <rect x="28" y={y - 11} width="14" height="14" rx="2" fill={m[role]} stroke={m.text} strokeOpacity="0.25" />
            <text x="52" y={y} fontSize="13" fontWeight="400" fill={m.text}>{ROLE_LABEL[role]}</text>
            <text x="170" y={y} fontSize="13" fontWeight="400" fill={m.text}>{m[role]}</text>
            <text x="252" y={y} fontSize="13" fontWeight="400" fill={m.text}>{role === 'bg' || role === 'surface' ? '' : `${fmtRatio(contrast(m[role], m.bg))} on background`}</text>
          </g>
        );
      })}
    </Art>
  );
}
