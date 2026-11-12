import Art from '@/components/art/Art';
import CopyValue from '@/components/site/CopyValue';
import { Hl } from '@/components/ui/Card';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { SCALE, wrapHl } from './typoData';
import { s } from './typoStyles';

const CAP = 56;

// The full scale as one exportable sheet. Samples larger than 56 px are drawn at 56; the spec column keeps the true size.
export function ScaleSvg() {
  const W = 1200;
  const rows = [];
  let y = 24;
  SCALE.forEach((r) => {
    const size = Math.min(r.size, CAP);
    const maxChars = Math.max(18, Math.floor(820 / (size * 0.5)));
    const lines = wrapHl(r.caps ? r.sample.toUpperCase() : r.sample, r.hl && r.hl.toUpperCase && r.caps ? r.hl.toUpperCase() : r.hl, maxChars);
    const lh = Math.max(size * r.lh, size + 4);
    rows.push({ r, size, lines, lh, y });
    y += lines.length * lh + 34;
  });
  const H = r2(y + 8);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Type scale: every step with its size, weight and line-height, set in a line from the case study" exportName="typography-scale">
      <rect width={W} height={H} rx="6" fill={HEX.paper} stroke={HEX.app} />
      {rows.map(({ r, size, lines, lh, y: top }, i) => (
        <g key={r.id} className="fade-in" style={{ '--i': i }}>
          <line x1="24" x2={W - 24} y1={top - 8} y2={top - 8} stroke={HEX.app} />
          <text x="24" y={top + 14} fontSize="13" fontWeight="500" fill={HEX.ink}>{r.id}</text>
          <text x="24" y={top + 34} fontSize="12" fontWeight="400" fill={HEX.muted}>{`${r.size} px / ${r.w} / ${r.lh}`}</text>
          <text x="300" y={top + size * 0.95} fontSize={size} fontWeight={r.w} letterSpacing={r.ls === '0' ? 0 : r2(parseFloat(r.ls) * size)} fill={r.id === 'label' ? HEX.muted : HEX.ink} style={{ whiteSpace: 'pre' }}>
            {lines.map((ln, k) => (
              <tspan key={k} x="300" dy={k ? lh : 0}>
                {ln.map((p, j) => (p.hl ? <tspan key={j} fill={HEX.blue}>{p.t}</tspan> : <tspan key={j}>{p.t}</tspan>))}
              </tspan>
            ))}
          </text>
        </g>
      ))}
    </Art>
  );
}

// The same scale as live type with the spec beside it. Class names copy on click.
export function ScaleTable() {
  return (
    <div className={s.scroll} role="region" aria-label="Type scale" tabIndex={0}>
      <table className={s.ledger}>
        <caption className="sr-only">Type scale: class, size at 1600 px, weight, line-height, letter-spacing and a live sample</caption>
        <thead>
          <tr>
            <th scope="col">Step</th>
            <th scope="col">Size</th>
            <th scope="col">Weight</th>
            <th scope="col">Line-height</th>
            <th scope="col">Tracking</th>
            <th scope="col">Sample</th>
          </tr>
        </thead>
        <tbody>
          {SCALE.map((r) => (
            <tr key={r.id}>
              <td>{r.cls ? <CopyValue value={r.cls} label={`${r.id} class`} /> : r.id}<br /><span className="t-small">{r.use}</span></td>
              <td>{r.size} px</td>
              <td>{r.w}</td>
              <td>{r.lh}</td>
              <td>{r.ls}</td>
              <td>
                <p className={`${s.sample} ${r.cls}`} style={r.cls ? { fontSize: r.size > 60 ? 'clamp(28px, 4vw, ' + Math.min(r.size, 64) + 'px)' : undefined } : { fontWeight: r.w, fontSize: r.size, lineHeight: r.lh, letterSpacing: r.ls }}>
                  {r.hl ? <Hl text={r.sample} hl={r.hl} /> : r.sample}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
