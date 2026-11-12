import Art from '@/components/art/Art';
import CopyValue from '@/components/site/CopyValue';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { SCALE, wrapHl } from './typoData';
import s from './typography.module.css';

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

// The three weights and where the case study uses each (SOURCE.md, "Type"). Values copy on click.
const WEIGHT_USE = [
  ['Light', 300, 'Everything large: display quotes, section headings, the app hero, card figures, quote body'],
  ['Regular', 400, 'Chips and labels, axis and captions, names in the quote chip'],
  ['Medium', 500, 'Card titles, the label voice, footer column heads'],
];

export function WeightTable() {
  return (
    <div className={s.scroll} role="region" aria-label="Weights and their use" tabIndex={0}>
      <table className={s.ledger}>
        <caption className="sr-only">Urbanist weights and where the case study uses each</caption>
        <thead>
          <tr>
            <th scope="col">Weight</th>
            <th scope="col">Value</th>
            <th scope="col">Used for</th>
          </tr>
        </thead>
        <tbody>
          {WEIGHT_USE.map(([name, w, use]) => (
            <tr key={name}>
              <td style={{ fontWeight: w, fontSize: 18 }}>{name}</td>
              <td><CopyValue value={`font-weight: ${w};`} label={`${name} weight`}>{w}</CopyValue></td>
              <td className={s.wrapCell}>{use}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// The same scale as live type with the spec beside it. Class names copy on click.
export function ScaleTable() {
  return (
    <div className={s.scroll} role="region" aria-label="Type scale" tabIndex={0}>
      <table className={s.ledger}>
        <caption className="sr-only">Type scale: class, size at 1600 px, weight, line-height and letter-spacing</caption>
        <thead>
          <tr>
            <th scope="col">Step</th>
            <th scope="col">Size</th>
            <th scope="col">Weight</th>
            <th scope="col">Line-height</th>
            <th scope="col">Tracking</th>
          </tr>
        </thead>
        <tbody>
          {SCALE.map((r) => (
            <tr key={r.id}>
              <td>{r.cls ? <CopyValue value={r.cls} label={`${r.id} class`} /> : r.id}<span className={s.use}>{r.use}</span></td>
              <td><CopyValue value={`${r.size}px`} label={`${r.id} size`}>{`${r.size} px`}</CopyValue></td>
              <td>{r.w}</td>
              <td>{r.lh}</td>
              <td>{r.ls}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
