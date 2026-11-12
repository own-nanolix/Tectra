import Art from '@/components/art/Art';
import CopyValue from '@/components/site/CopyValue';
import { HEX } from '@/lib/brand';
import { arcLength, arcPath, polar, r2 } from '@/lib/charts';
import { RINGS } from './colorData';
import s from './color.module.css';

// One colour ring of the case study (m11): a grey ring, the coloured arc, a dot in a pale halo at each end,
// and the hex label in the middle. Geometry measured at 1600 px wide. Each ring is its own exportable SVG.
export function Ring({ id, order = 0 }) {
  const g = RINGS.find((x) => x.id === id);
  const pad = 26;
  const size = 2 * (g.r + pad);
  const c = size / 2;
  const [x0, y0] = polar(c, c, g.r, g.a0);
  const [x1, y1] = polar(c, c, g.r, g.a1);
  const halo = g.big ? 19 : 17;
  const dot = g.big ? 7 : 6;
  return (
    <figure className={s.ring}>
      <Art viewBox={`0 0 ${r2(size)} ${r2(size)}`} title={`Colour ring: ${g.name}, hex ${g.label}`} exportName={`color-ring-${g.id}`}>
        <circle cx={c} cy={c} r={g.r} fill="none" stroke={HEX.track} strokeWidth="10" />
        <path
          className="draw"
          style={{ '--len': arcLength(g.r, g.a0, g.a1), '--i': order * 3 }}
          d={arcPath(c, c, g.r, g.a0, g.a1)}
          fill="none"
          stroke={g.hex}
          strokeWidth="10"
        />
        {[[x0, y0], [x1, y1]].map(([x, y], k) => (
          <g key={k} className="pop" style={{ '--i': order * 3 + k * 4 }}>
            <circle cx={r2(x)} cy={r2(y)} r={halo} fill={HEX.card} />
            <circle cx={r2(x)} cy={r2(y)} r={dot} fill={g.hex} />
          </g>
        ))}
        <text x={c} y={c + 6} textAnchor="middle" fontSize="17" fontWeight="300" fill={HEX.muted}>
          {'HEX: '}
          <tspan fontWeight="400" fill={HEX.ink}>{g.label}</tspan>
        </text>
      </Art>
      <figcaption className={s.ringCap}>
        <span>{g.name}</span>
        <CopyValue value={g.label} label={`${g.name} hex`} />
      </figcaption>
    </figure>
  );
}
