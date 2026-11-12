import Art from '@/components/art/Art';
import { linePath, r2 } from '@/lib/charts';
import ScrollRun from './ScrollRun';
import s from '@/components/pages/strategy/styles';

// The blue "mountain" polyline of the strategic plan (m04): one line, three ring markers, thin arrows to the
// three quotes. Points are read off the case study image (y moved up by 230 to crop the empty space).
const dy = (pts) => pts.map(([x, y]) => [x, y - 230]);
const MAIN = dy([[0, 705], [93, 705], [183, 565], [243, 565], [343, 474], [427, 565], [497, 565], [538, 597], [587, 597], [733, 403], [791, 455], [866, 318], [956, 403], [956, 485], [1143, 636], [1208, 578], [1285, 632], [1328, 565], [1372, 597], [1422, 565], [1445, 607], [1512, 707], [1600, 707]]);
const SIDE_A = dy([[343, 711], [435, 625], [495, 681], [538, 597]]);
const SIDE_B = dy([[1285, 632], [1352, 672]]);
const MARKERS = [[93, 705 - 230], [866, 318 - 230], [1445, 607 - 230]];

const len = (pts) => r2(pts.slice(1).reduce((a, p, i) => a + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0));
// thin arrow: a stem and a small head
const arrow = (x, y0, y1) => {
  const dir = y1 > y0 ? 1 : -1;
  return `M${x} ${y0}V${y1}M${x - 4} ${y1 - 7 * dir}L${x} ${y1}L${x + 4} ${y1 - 7 * dir}`;
};

export default function Mountain() {
  const stems = [arrow(866, 4, 62), arrow(93, 498, 610), arrow(1446, 400, 516)];
  return (
    <ScrollRun>
      <Art
        viewBox="0 0 1600 640"
        title="Strategic plan chart: a blue line like a mountain with three ring markers, one for each quote"
        exportName="strategy-mountain"
        className={s.chart}
      >
        <path d={linePath(SIDE_A)} className="draw" style={{ '--len': len(SIDE_A), '--i': 14 }} fill="none" stroke="#4093EC" strokeWidth="3" strokeLinejoin="round" />
        <path d={linePath(SIDE_B)} className="draw" style={{ '--len': len(SIDE_B), '--i': 16 }} fill="none" stroke="#4093EC" strokeWidth="3" strokeLinejoin="round" />
        <path d={linePath(MAIN)} className="draw" style={{ '--len': len(MAIN), '--i': 0 }} fill="none" stroke="#4093EC" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        {stems.map((d, i) => (
          <path key={i} d={d} className="fade-in" style={{ '--i': 22 + i }} fill="none" stroke="#B8B8B8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        ))}
        {MARKERS.map(([x, y], i) => (
          <g key={i} className="pop" style={{ '--i': [1, 9, 20][i] }}>
            <circle cx={x} cy={y} r="12" fill="#4093EC" />
            <circle cx={x} cy={y} r="4.5" fill="#FAFAFA" />
          </g>
        ))}
      </Art>
    </ScrollRun>
  );
}
