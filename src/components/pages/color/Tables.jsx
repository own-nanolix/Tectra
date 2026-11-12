import CopyValue from '@/components/site/CopyValue';
import { contrast, hexToRgb } from '@/lib/site';
import { MODES, ROLES, ROLE_LABEL, DARK, LIGHT, fmtRatio, rating, rgbOf } from './colorData';
import { s } from './colorStyles';

function Ratio({ fg, bg }) {
  const r = contrast(fg, bg);
  return (
    <span className={r >= 4.5 ? s.pass : s.low}>
      {fmtRatio(r)} <small>{rating(r)}</small>
    </span>
  );
}

// Spec table: the swatch is the first cell of each row. Every value is a click-to-copy button.
export function ScaleTable({ rows, caption }) {
  return (
    <div className={s.scroll} role="region" aria-label={caption} tabIndex={0}>
      <table className={s.ledger}>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Swatch</th>
            <th scope="col">Token</th>
            <th scope="col">Name</th>
            <th scope="col">Hex</th>
            <th scope="col">RGB</th>
            <th scope="col">On light {LIGHT}</th>
            <th scope="col">On dark {DARK}</th>
            <th scope="col">Source</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.token}>
              <td><span className={s.chipSw} style={{ background: r.hex }} aria-hidden="true" /></td>
              <td><CopyValue value={r.token} label={`${r.name} token`} /></td>
              <td>{r.name}{r.css ? <small className={s.css}>{r.css}</small> : null}</td>
              <td><CopyValue value={r.hex} label={`${r.name} hex`} /></td>
              <td><CopyValue value={rgbOf(r.hex)} label={`${r.name} RGB`}>{hexToRgb(r.hex)}</CopyValue></td>
              <td><Ratio fg={r.hex} bg={LIGHT} /></td>
              <td><Ratio fg={r.hex} bg={DARK} /></td>
              <td><span className={r.source === 'Extension' ? s.ext : ''}>{r.source}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Semantic roles for the three modes; contrast is the role colour against that mode's background.
export function SemanticTable() {
  return (
    <div className={s.scroll} role="region" aria-label="Semantic tokens" tabIndex={0}>
      <table className={s.ledger}>
        <caption className="sr-only">Semantic tokens for light mode, dark mode on ink, and dark mode on the blue field</caption>
        <thead>
          <tr>
            <th scope="col">Role</th>
            {MODES.map((m) => <th scope="col" key={m.id}>{m.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {ROLES.map((role) => (
            <tr key={role}>
              <th scope="row">{ROLE_LABEL[role]}</th>
              {MODES.map((m) => (
                <td key={m.id}>
                  <span className={s.cell}>
                    <span className={s.chipSw} style={{ background: m[role] }} aria-hidden="true" />
                    <CopyValue value={m[role]} label={`${ROLE_LABEL[role]}, ${m.label}`} />
                    {role !== 'bg' && role !== 'surface' ? <Ratio fg={m[role]} bg={m.bg} /> : null}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
