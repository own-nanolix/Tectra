import Art from '@/components/art/Art';
import { HEX } from '@/lib/brand';
import { arcLength, arcPath, polar } from '@/lib/charts';
import { RINGS } from './colorData';

// The five colour rings of the case study (m11): a grey ring, a coloured arc, two dots, and the hex label.
// The black ring is labelled #000000 here (the source prints #FFB83D by mistake).
export default function Rings() {
  return (
    <Art viewBox="0 0 1250 840" title="Five colour rings: Tectra Blue, Signal Yellow, Sky, Black and White, each with its hex value" exportName="color-rings">
      {RINGS.map((g, n) => {
        const [x0, y0] = polar(g.cx, g.cy, g.r, g.a0);
        const [x1, y1] = polar(g.cx, g.cy, g.r, g.a1);
        const dot = g.hex === HEX.white ? HEX.white : g.hex;
        return (
          <g key={g.id}>
            <circle cx={g.cx} cy={g.cy} r={g.r} fill="none" stroke={HEX.track} strokeWidth={g.w} />
            <path
              className="draw"
              style={{ '--len': arcLength(g.r, g.a0, g.a1), '--i': n }}
              d={arcPath(g.cx, g.cy, g.r, g.a0, g.a1)}
              fill="none"
              stroke={g.hex}
              strokeWidth={g.w}
            />
            {[[x0, y0], [x1, y1]].map(([x, y], k) => (
              <g key={k} className="pop" style={{ '--i': n + k }}>
                <circle cx={x} cy={y} r={g.big ? 19 : 17} fill={HEX.card} />
                <circle cx={x} cy={y} r={g.big ? 7 : 6} fill={dot} />
              </g>
            ))}
            <text x={g.cx} y={g.cy + g.size * 0.35} textAnchor="middle" fontSize={g.size} fontWeight="300" fill={HEX.muted}>
              {'HEX: '}
              <tspan fontWeight="400" fill={HEX.ink}>{g.id === 'black' ? '#000000' : g.hex}</tspan>
            </text>
          </g>
        );
      })}
    </Art>
  );
}
