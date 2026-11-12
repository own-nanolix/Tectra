import Art from '@/components/art/Art';
import { ROADMAP } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { B, TOP, BAR, STAGES } from './data';
import { ThumbG } from './StageArt';
import s from './lp-timeline.module.css';

const LINE = '#C9C9C9';
const tickPath = (() => {
  let d = '';
  for (let x = 998; x < 1580; x += 6) d += `M${x} 575v37`;
  return d;
})();

// Boundary line heights: the taller of the two stages that meet there.
const boundaryTop = (k) => (k === 0 ? TOP[0] : k >= 4 ? TOP[3] : Math.min(TOP[k - 1], TOP[k]));

// The stepped roadmap of the case study. `i` is the stage the marker is on; `x` is the (tweened) marker position.
// The artwork is complete at the default state (marker after "Landing page").
export default function RoadmapArt({ i = 3, x = B[4] }) {
  const mx = r2(x);
  const chipX = Math.min(Math.max(mx, 70), 1544);
  return (
    <Art viewBox="0 0 1600 740" title="Roadmap: Branding, Desktop app, Mobile app and Landing page are done; Responsive and Localiztion are next" exportName="lp-timeline-roadmap" className={s.roadmapSvg}>
      {/* boundary lines */}
      {[0, 1, 2, 3, 4].map((k) => (
        <path key={k} d={`M${B[k]} ${boundaryTop(k)}V${BAR.y}`} stroke={LINE} strokeWidth="1.5" className="rise" style={{ '--i': k * 5 }} />
      ))}
      {/* future: ticks and dividers */}
      <path d={tickPath} stroke={LINE} strokeWidth="1.5" />
      <path d={`M${B[4]} 575V720M${B[5]} 575V720M${B[6]} 575V720`} stroke={LINE} strokeWidth="1.5" />
      <text x={(B[4] + B[5]) / 2} y="716" fontSize="20" fontWeight="300" fill="#5E5E5E" textAnchor="middle">{ROADMAP.next[0]}</text>
      <text x={(B[5] + B[6]) / 2} y="716" fontSize="20" fontWeight="300" fill="#5E5E5E" textAnchor="middle">{ROADMAP.next[1]}</text>
      {/* solid blue bar: grows to the marker */}
      <rect x={B[0]} y={BAR.y} width={r2(Math.max(0, mx - B[0]))} height={BAR.h} fill="#4093EC" className="grow-x" style={{ '--i': 6 }} />
      {/* the four finished stages */}
      {STAGES.slice(0, 4).map((st, k) => {
        const cx = (B[k] + B[k + 1]) / 2;
        const on = k <= i;
        const hy = TOP[k];
        const col = on ? '#FFB83D' : LINE;
        const w = B[k + 1] - B[k];
        return (
          <g key={st.id} className="fade-in" style={{ '--i': k * 3 + 2 }}>
            <g transform={`translate(${r2(cx - 50)} ${hy - 183})`}>
              <ThumbG kind={st.kind} idp={`lp-timeline-rm-${st.id}`} />
            </g>
            <text x={cx} y={hy - 46} fontSize="22" fontWeight="300" fill="#2F2F2F" textAnchor="middle">{st.name}</text>
            <path d={`M${B[k] + 28} ${hy}H${B[k + 1] - 28}`} stroke={col} strokeWidth="2" className={`grow-x ${s.handleLine}`} style={{ '--i': k * 4 + 4 }} />
            <g className={s.handleEnd} style={{ '--from': 0 }}>
              <rect x={B[k]} y={hy - 7} width="28" height="14" fill={col} />
              <circle cx={B[k] + 28} cy={hy} r="4.5" fill="#FAFAFA" stroke={col} strokeWidth="2" />
            </g>
            <g className={s.handleEnd} style={{ '--from': -(w - 56) }}>
              <rect x={B[k + 1] - 28} y={hy - 7} width="28" height="14" fill={col} />
              <circle cx={B[k + 1] - 28} cy={hy} r="4.5" fill="#FAFAFA" stroke={col} strokeWidth="2" />
            </g>
          </g>
        );
      })}
      {/* marker */}
      <g>
        <path d={`M${mx} 300V720`} stroke="#2F2F2F" strokeWidth="1.5" />
        <circle cx={mx} cy={BAR.y + BAR.h / 2} r="9" fill="#FFB83D" />
        <circle cx={mx} cy={BAR.y + BAR.h / 2} r="3.2" fill="#FFFFFF" />
        <g transform={`translate(${r2(chipX - 56)} 262)`}>
          <rect width="112" height="32" rx="4" fill="#FFB83D" />
          <text x="56" y="21" fontSize="15" fontWeight="500" fill="#2F2F2F" textAnchor="middle">{ROADMAP.here}</text>
        </g>
      </g>
    </Art>
  );
}
