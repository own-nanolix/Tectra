import Art from '@/components/art/Art';
import { IconUse } from '@/components/site/Icon';
import { MarkG, AppIconG } from '@/components/art/Mark';
import { IsoSiteG, GaugeG } from '@/components/art/KeyArt';
import { r2 } from '@/lib/charts';
import { HERO, NAV, PROBLEM, SOLUTION, STRATEGY_CHIPS, SCOPE_CHIPS } from '@/lib/brand';

// Exportable artwork of the web-system page. Every id starts with web-system-.
const BLUE_INK = '#145CB8';
const NAVY = '#0A2E63';
const MUTED = '#5E5E5E';
const INK = '#2F2F2F';

function wrap(text, n) {
  const out = [];
  let line = '';
  text.split(' ').forEach((w) => {
    if ((line + ' ' + w).trim().length > n) { out.push(line); line = w; } else { line = (line + ' ' + w).trim(); }
  });
  if (line) out.push(line);
  return out;
}

// A measured bracket between two points on a horizontal line, with a centred label.
function HDim({ x0, x1, y, label, color = BLUE_INK, i = 0, below = 24 }) {
  const len = x1 - x0;
  return (
    <g>
      <path d={`M${x0} ${y}H${x1}M${x0} ${y - 8}V${y + 8}M${x1} ${y - 8}V${y + 8}`} stroke={color} strokeWidth="1.5" fill="none" className="draw" style={{ '--len': len + 16, '--i': i }} />
      <text x={r2((x0 + x1) / 2)} y={y + below} textAnchor="middle" fontSize="14" fontWeight="500" fill={color}>{label}</text>
    </g>
  );
}

// 1. The button with its measurements, drawn at three times its size.
export function ButtonAnatomy() {
  return (
    <Art viewBox="0 0 720 340" title="Button anatomy: 50 px high, 4 px radius, 26 px side padding" exportName="web-system-button-anatomy">
      <rect width="720" height="340" fill="#FAFAFA" />
      <rect x="190" y="90" width="348" height="150" rx="12" fill="#FFB83D" />
      <text x="364" y="178" textAnchor="middle" fontSize="45" fontWeight="500" fill={INK}>{HERO.cta[0]}</text>
      <path d="M130 90V240M120 90H140M120 240H140" stroke={BLUE_INK} strokeWidth="1.5" fill="none" className="draw" style={{ '--len': 190 }} />
      <text x="112" y="172" textAnchor="end" fontSize="14" fontWeight="500" fill={BLUE_INK}>50 px</text>
      <HDim x0={190} x1={268} y={272} label="26 px" i={1} />
      <HDim x0={460} x1={538} y={272} label="26 px" i={2} />
      <path d="M190 102A12 12 0 0 1 202 90" stroke={BLUE_INK} strokeWidth="3" fill="none" />
      <path d="M195 95L160 56H112" stroke={BLUE_INK} strokeWidth="1.5" fill="none" className="draw" style={{ '--len': 100, '--i': 3 }} />
      <text x="106" y="61" textAnchor="end" fontSize="14" fontWeight="500" fill={BLUE_INK}>4 px radius</text>
      <text x="700" y="36" textAnchor="end" fontSize="13" fill={MUTED}>Button, shown at 3 times its size</text>
    </Art>
  );
}

// 2. The app icon tile at web and dock radius, then small sizes.
export function AppIconSheet() {
  return (
    <Art viewBox="0 0 480 300" title="App icon: web tile and dock icon, with small sizes" exportName="web-system-app-icon-tile">
      <rect width="480" height="300" fill="#FAFAFA" />
      <AppIconG x={40} y={30} size={160} radius={6} />
      <AppIconG x={280} y={30} size={160} radius={22} />
      <text x="120" y="228" textAnchor="middle" fontSize="14" fill={MUTED}>Web tile, radius 6</text>
      <text x="360" y="228" textAnchor="middle" fontSize="14" fill={MUTED}>Dock icon, radius 22</text>
      {[64, 48, 32].map((sz, i) => (
        <AppIconG key={sz} x={[40, 120, 190][i]} y={[236, 244, 252][i]} size={sz} radius={6} className="pop" style={{ '--i': i }} />
      ))}
      <text x="300" y="276" fontSize="14" fill={MUTED}>64, 48 and 32 px</text>
    </Art>
  );
}

// 3. The Problem and Solution cards with their corner arcs, as one sheet.
export function CornerArcCards() {
  const cards = [
    { id: 'a', x: 0, title: 'Problem', text: PROBLEM, tone: 'yellow', value: 0.45 },
    { id: 'b', x: 400, title: 'Solution', text: SOLUTION, tone: 'blue', value: 0.6 },
  ];
  return (
    <Art viewBox="0 0 760 260" title="Problem and Solution cards with corner arcs" exportName="web-system-corner-arc-cards">
      <defs>
        {cards.map((c) => (
          <clipPath key={c.id} id={`web-system-arc-clip-${c.id}`}>
            <rect width="360" height="260" rx="4" />
          </clipPath>
        ))}
      </defs>
      {cards.map((c) => (
        <g key={c.id} transform={`translate(${c.x} 0)`}>
          <rect width="360" height="260" rx="4" fill="#F5F5F5" />
          <g clipPath={`url(#web-system-arc-clip-${c.id})`}>
            <GaugeG x={0} y={0} w={360} h={260} r={120} value={c.value} tone={c.tone} draw />
          </g>
          <text x="28" y="48" fontSize="22" fontWeight="500" fill={INK}>{c.title}</text>
          <IconUse name="arrow-up-right" x={312} y={28} size={22} color={INK} />
          {wrap(c.text, 27).map((l, i) => (
            <text key={i} x="28" y={88 + i * 22} fontSize="15" fill={MUTED}>{l}</text>
          ))}
        </g>
      ))}
    </Art>
  );
}

// 4. The illustration tile of the mega menu: the isometric site on Field Blue.
export function MegaTileArt() {
  return (
    <Art viewBox="0 0 560 400" title="Isometric building site with location pins on Field Blue" exportName="web-system-mega-menu-tile">
      <defs>
        <linearGradient id="web-system-tile-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5BA8F8" />
          <stop offset="1" stopColor="#4C9BF3" />
        </linearGradient>
      </defs>
      <rect width="560" height="400" rx="6" fill="url(#web-system-tile-sky)" />
      <IsoSiteG x={0} y={0} scale={1} tone="blue" pins={['ridge', 'wing']} yellowPin="komatsu" />
    </Art>
  );
}

// 5. The landing navigation with its measurements.
export function NavAnatomy() {
  const items = [[138, 108], [248, 101], [351, 101], [454, 116]];
  return (
    <Art viewBox="0 0 760 190" title="Landing navigation: logo tile, pill with four links, icon button and Log in" exportName="web-system-nav-anatomy">
      <rect width="760" height="190" rx="6" fill="#53A2F7" />
      <rect x="24" y="40" width="50" height="50" rx="4" fill="#FFB83D" />
      <MarkG x={36} y={52} size={26} fill="#F5F5F5" />
      <rect x="130" y="40" width="448" height="50" rx="4" fill="#90C0F3" opacity="0.85" />
      <rect x="248" y="48" width="101" height="34" rx="3" fill="#FFFFFF" opacity="0.45" />
      {NAV.map((n, i) => (
        <text key={n} x={items[i][0] + items[i][1] / 2} y="70" textAnchor="middle" fontSize="14" fontWeight="500" fill={NAVY}>{n}</text>
      ))}
      <rect x="600" y="40" width="50" height="50" rx="4" fill="#90C0F3" />
      <IconUse name="briefcase" x={614} y={54} size={22} color={NAVY} />
      <rect x="656" y="40" width="80" height="50" rx="4" fill="#FFB83D" />
      <text x="696" y="70" textAnchor="middle" fontSize="15" fontWeight="500" fill={INK}>{HERO.login}</text>
      <HDim x0={24} x1={74} y={124} label="50 px" color={NAVY} i={0} />
      <HDim x0={130} x1={578} y={124} label="Pill: min-height 50 px, link padding 8 / 20, gap 2" color={NAVY} i={1} />
      <HDim x0={600} x1={736} y={124} label="Actions, gap 6" color={NAVY} i={2} />
    </Art>
  );
}

// 6. The chip family on paper.
export function ChipSheet() {
  const place = (labels, y, h, size, padX, w) => {
    let x = 24;
    return labels.map((t) => {
      const cw = r2(t.length * w + padX * 2);
      const o = { t, x, y, cw, h, size, padX };
      x += cw + 14;
      return o;
    });
  };
  const row1 = place(STRATEGY_CHIPS.concat(['Strategic plan']), 24, 47, 16, 24, 8.2);
  const row2 = place(SCOPE_CHIPS, 90, 47, 16, 24, 8.2);
  const fills = ['#90C0F3', '#FFB83D', '#2F2F2F', '#F0F0F0'];
  const inks = [NAVY, INK, '#FFFFFF', INK];
  const status = [['Normal', '#4093EC'], ['Cut', '#FFB83D'], ['Notes', '#E2383B']];
  const row3 = place(status.map((x) => x[0]), 158, 34, 13, 12, 7.2);
  return (
    <Art viewBox="0 0 760 250" title="Chip family: section chip, scope chips and status chips" exportName="web-system-chip-sheet">
      <rect width="760" height="250" fill="#FAFAFA" />
      {row1.map((c, i) => (
        <g key={c.t} className="fade-in" style={{ '--i': i }}>
          <rect x={c.x} y={c.y} width={c.cw} height={c.h} rx="4" fill="#F0F0F0" />
          <text x={c.x + c.padX} y={c.y + 30} fontSize="16" fill={INK}>{c.t}</text>
        </g>
      ))}
      {row2.map((c, i) => (
        <g key={c.t} className="fade-in" style={{ '--i': i + 4 }}>
          <rect x={c.x} y={c.y} width={c.cw} height={c.h} rx="4" fill={fills[i]} />
          <text x={c.x + c.padX} y={c.y + 30} fontSize="16" fill={inks[i]}>{c.t}</text>
        </g>
      ))}
      {row3.map((c, i) => (
        <g key={c.t} className="fade-in" style={{ '--i': i + 8 }}>
          <rect x={c.x + 16} y={c.y} width={c.cw + 16} height={c.h} rx="4" fill="#F0F0F0" />
          <circle cx={c.x + 16 + 12 + 4} cy={c.y + 17} r="4" fill={status[i][1]} />
          <text x={c.x + 16 + 12 + 16} y={c.y + 22} fontSize="13" fill={INK}>{c.t}</text>
        </g>
      ))}
      <text x="24" y="226" fontSize="13" fill={MUTED}>Chip: padding 14 / 24, 16 px type, radius 4. Small chip: padding 8 / 12, 13 px. Dot: 8 px.</text>
    </Art>
  );
}

// 7. The motion tokens: five durations and four easings.
const DURS = [['--dur-1', 140], ['--dur-2', 280], ['--dur-3', 520], ['--dur-4', 900], ['--dur-5', 1600]];
const EASES = [['--ease-out', [0.22, 1, 0.36, 1]], ['--ease-in-out', [0.65, 0, 0.35, 1]], ['--ease-draw', [0.4, 0, 0.2, 1]], ['--ease-snap', [0.3, 1.3, 0.5, 1]]];
export function MotionRamp() {
  const S = 140;
  return (
    <Art viewBox="0 0 760 380" title="Motion tokens: five durations and four easing curves" exportName="web-system-motion-tokens">
      <rect width="760" height="380" fill="#FAFAFA" />
      {DURS.map(([n, ms], i) => (
        <g key={n}>
          <text x="24" y={52 + i * 32} fontSize="13" fill={MUTED}>{n}</text>
          <rect x="110" y={40 + i * 32} width={r2((ms / 1600) * 520)} height="16" rx="2" fill="#4093EC" className="grow-x" style={{ '--i': i }} />
          <text x={r2(110 + (ms / 1600) * 520 + 10)} y={52 + i * 32} fontSize="13" fill={MUTED}>{ms} ms</text>
        </g>
      ))}
      {EASES.map(([n, [a, b, c, d]], i) => {
        const x0 = 24 + i * 180;
        const y0 = 340;
        const pt = (px, py) => `${r2(x0 + px * S)} ${r2(y0 - py * S * 0.7)}`;
        return (
          <g key={n}>
            <rect x={x0} y={y0 - 132} width={S} height={146} fill="none" stroke="#DFDFDF" />
            <path d={`M${pt(0, 0)}L${pt(a, b)}M${pt(1, 1)}L${pt(c, d)}`} stroke="#90C0F3" strokeWidth="1" fill="none" />
            <path d={`M${pt(0, 0)}C${pt(a, b)} ${pt(c, d)} ${pt(1, 1)}`} stroke="#4093EC" strokeWidth="2" fill="none" pathLength="1" className="draw" style={{ '--len': 1, '--i': i }} />
            <text x={x0} y="370" fontSize="12" fill={MUTED}>{n}</text>
          </g>
        );
      })}
    </Art>
  );
}
