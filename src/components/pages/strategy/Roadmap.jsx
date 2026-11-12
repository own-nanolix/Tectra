import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { ROADMAP } from '@/lib/brand';
import ScrollRun from './ScrollRun';
import s from '@/components/pages/strategy/styles';

// The stepped roadmap of the next step (m17): four finished stages as steps over a solid blue bar, each with
// a yellow range handle and a thumbnail tile; "You're here" at the edge; grey ticks for the stages to come.
// Photos are replaced by small code-drawn tiles.
const X = [20, 262, 497, 739, 990];
const Y = [573, 444, 313, 513]; // handle heights, from the case study
const BAR_Y = 723;
const TILES = [[91, 390], [328, 260], [555, 126], [802, 324]];
const LABEL_Y = [522, 393, 257, 457];

function Thumb({ kind, x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="100" height="100" rx="4" fill="#F0F0F0" />
      {kind === 0 && <MarkG x={27} y={27} size={46} fill="#4093EC" />}
      {kind === 1 && (
        <g>
          <rect x="20" y="24" width="60" height="38" rx="2" fill="#1B1B1F" />
          <rect x="23" y="27" width="54" height="32" fill="#4093EC" />
          <rect x="45" y="62" width="10" height="10" fill="#3A3A3A" />
          <rect x="36" y="72" width="28" height="3" fill="#2B2B2B" />
        </g>
      )}
      {kind === 2 && (
        <g>
          <rect x="36" y="14" width="30" height="72" rx="6" fill="#1B1B1F" />
          <rect x="39" y="19" width="24" height="62" rx="3" fill="#DDDDDD" />
          <rect x="39" y="19" width="24" height="26" rx="3" fill="#4093EC" />
          <rect x="42" y="74" width="18" height="4" rx="2" fill="#FFB83D" />
        </g>
      )}
      {kind === 3 && (
        <g>
          <rect x="18" y="22" width="64" height="42" rx="2" fill="#E9E9E9" />
          <rect x="21" y="25" width="58" height="36" fill="#53A2F7" />
          <rect x="26" y="34" width="22" height="4" fill="#FFFFFF" opacity="0.9" />
          <rect x="26" y="42" width="14" height="3" fill="#FFB83D" />
          <rect x="44" y="64" width="12" height="8" fill="#CFCFCF" />
          <rect x="36" y="72" width="28" height="3" fill="#BDBDBD" />
        </g>
      )}
    </g>
  );
}

export default function Roadmap() {
  const nextX = [990, 1295, 1580];
  const ticks = [];
  for (let x = 996; x < 1578; x += 6.4) if (Math.abs(x - 1295) > 3) ticks.push(Math.round(x * 10) / 10);
  return (
    <ScrollRun className={s.scroller}>
      <Art
        viewBox="0 60 1600 790"
        title="Roadmap: Branding, Desktop app, Mobile app and Landing page as rising steps over a blue bar, with Responsive and Localiztion still to come"
        exportName="strategy-roadmap"
      >
        {/* solid base */}
        <rect x="20" y={BAR_Y} width="970" height="37" fill="#4093EC" className="grow-x" />

        {/* the step walls */}
        {X.slice(0, 4).map((x, i) => (
          <rect key={x} x={x - 1} y={Y[i]} width="2" height={BAR_Y - Y[i]} fill="#C9C9C9" className="rise" style={{ '--i': i * 18 }} />
        ))}

        {/* yellow range handles */}
        {ROADMAP.done.map((name, i) => {
          const x0 = X[i], x1 = X[i + 1], y = Y[i];
          return (
            <g key={name} className="grow-x" style={{ '--i': 5 + i * 3 }}>
              <rect x={x0 + 26} y={y - 1} width={x1 - x0 - 52} height="2" fill="#FFB83D" />
              <rect x={x0} y={y - 7} width="26" height="14" rx="1" fill="#FFB83D" />
              <rect x={x1 - 26} y={y - 7} width="26" height="14" rx="1" fill="#FFB83D" />
              <circle cx={x0 + 28} cy={y} r="5" fill="#FAFAFA" stroke="#FFB83D" strokeWidth="1.5" />
              <circle cx={x1 - 24} cy={y} r="5" fill="#FAFAFA" stroke="#FFB83D" strokeWidth="1.5" />
            </g>
          );
        })}

        {/* thumbnail tiles and labels */}
        {ROADMAP.done.map((name, i) => (
          <g key={name} className="slide-up" style={{ '--i': 6 + i * 3 }}>
            <Thumb kind={i} x={TILES[i][0]} y={TILES[i][1]} />
            <text x={TILES[i][0] + 50} y={LABEL_Y[i]} fontSize="22" fill="#2F2F2F" textAnchor="middle">{name}</text>
          </g>
        ))}

        {/* the stages to come */}
        <path d={ticks.map((x) => `M${x} 685v38`).join('')} stroke="#C4C4C4" strokeWidth="1" className="rise" style={{ '--i': 20 }} />
        {nextX.map((x, i) => (
          <rect key={x} x={x - 1} y={i === 0 ? 140 : 685} width="2" height={i === 0 ? 690 : 145} fill="#C9C9C9" />
        ))}
        {ROADMAP.next.map((name, i) => (
          <text key={name} x={[1143, 1440][i]} y="820" fontSize="22" fill="#2F2F2F" textAnchor="middle" className="fade-in" style={{ '--i': 22 + i }}>{name}</text>
        ))}

        {/* where we are */}
        <g className="pop" style={{ '--i': 22 }}>
          <circle cx="915" cy="95" r="12" fill="#90C0F3" className="ring" />
          <circle cx="915" cy="95" r="12" fill="#90C0F3" />
          <circle cx="915" cy="95" r="4.5" fill="#FAFAFA" />
        </g>
        <text x="945" y="102" fontSize="22" fill="#2F2F2F">{ROADMAP.here}</text>
      </Art>
    </ScrollRun>
  );
}
