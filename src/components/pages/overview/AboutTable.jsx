import Art from '@/components/art/Art';
import { ABOUT } from '@/lib/brand';
import s from '@/components/pages/overview/styles';

// The About table of the case study (m02): rows with thin arrows, and a vertical two-segment bar whose
// lower half is blue. One SVG so it exports.
const ROW = 58;

export default function AboutTable() {
  const h = ABOUT.length * ROW + 8;
  return (
    <Art viewBox={`0 0 260 ${h}`} title="About: Project Tectra, Category B2B SaaS, Location USA, Year 2024" exportName="overview-about" className={s.aboutArt}>
      <rect x="0" y="4" width="4" height={(h - 12) / 2} fill="#DFDFDF" />
      <rect x="0" y={4 + (h - 12) / 2 + 4} width="4" height={(h - 12) / 2} fill="#4093EC" className="rise" style={{ '--i': 6 }} />
      {ABOUT.map(([k, v], i) => {
        const y = 20 + i * ROW;
        return (
          <g key={k} className="slide-up" style={{ '--i': i + 1 }}>
            <text x="24" y={y + 8} fontSize="13" fill="#5E5E5E">{k}</text>
            <path d={`M92 ${y + 4}H128M122 ${y}L128 ${y + 4}L122 ${y + 8}`} fill="none" stroke="#8F8F8F" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            <text x="142" y={y + 9} fontSize="17" fill="#2F2F2F" fontWeight="400">{v}</text>
            {i < ABOUT.length - 1 && <path d={`M24 ${y + 30}H256`} stroke="#E2E2E2" strokeWidth="1" />}
          </g>
        );
      })}
    </Art>
  );
}
