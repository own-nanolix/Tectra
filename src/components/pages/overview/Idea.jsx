import Art from '@/components/art/Art';
import { MarkG, MARK } from '@/components/art/Mark';
import { HEX } from '@/lib/brand';
import ScrollRunLite from './ScrollRunLite';

// The brand idea in one drawing: three separate circles on the left, the mark they become on the right
// (two circles fused into one body, the third on its way). Built from the mark's own geometry.
const K = 2.6;
const OFF = [[-6, -6], [8, 8], [12, -8]];

export default function Idea() {
  const parts = [MARK.A, MARK.B, MARK.C];
  return (
    <ScrollRunLite>
      <Art
        viewBox="0 0 600 280"
        title="Three separate circles, then the Tectra mark: two circles fused into one body with the third beside it"
        exportName="overview-idea"
        style={{ width: '100%', height: 'auto' }}
      >
        <g transform="translate(10 10)" fill="none" stroke={HEX.blue} strokeWidth="1.2">
          {parts.map((c, i) => (
            <circle
              key={i}
              cx={c.cx * K * 0.9 + OFF[i][0]}
              cy={c.cy * K * 0.9 + OFF[i][1]}
              r={c.r * K * 0.9}
              className="draw"
              style={{ '--len': Math.round(2 * Math.PI * c.r * K * 0.9), '--i': i * 3 }}
              strokeDasharray={Math.round(2 * Math.PI * c.r * K * 0.9)}
            />
          ))}
        </g>
        <path d="M262 142H318M310 136L318 142L310 148" fill="none" stroke="#8F8F8F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="fade-in" style={{ '--i': 12 }} />
        <MarkG x={338} y={20} size={240} fill={HEX.blue} bodyClass="fuse-a" dotClass="fuse-c" />
      </Art>
    </ScrollRunLite>
  );
}
