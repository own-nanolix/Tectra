'use client';

// Options overview: the five structures as thumbnails in a row with a plain description each. Click to open.
import { STRUCTS } from './data';
import { Struct } from './charts';
import s from './dashboard.module.css';

export default function Overview({ open }) {
  return (
    <div className={s.board} data-screen="dashboard-overview">
      <h3 className={s.ovH}>Dashboard options</h3>
      <ul className={s.ovRow}>
        {STRUCTS.map((t) => (
          <li key={t.id} className={s.ovCard}>
            <span className={s.ovLetter} aria-hidden="true">{t.id.toUpperCase()}</span>
            <Struct k={t.id} name={`dashboard-structure-${t.id}`} />
            <h4 className={s.ovName}>
              <button type="button" className={s.stretch} onClick={() => open(t.id)}>
                <span className="sr-only">Open option {t.id.toUpperCase()}: </span>{t.name}
              </button>
            </h4>
            <dl className={s.ovDl}>
              <div><dt>Navigation</dt><dd>{t.nav}</dd></div>
              <div><dt>Main view</dt><dd>{t.main}</dd></div>
            </dl>
          </li>
        ))}
      </ul>
      <div className={s.ovInner}>
        <button type="button" className="btn btn-sky" onClick={() => open('cutfill')}>Cut and Fill</button>
        <button type="button" className="btn btn-sky" onClick={() => open('work')}>Work areas</button>
      </div>
    </div>
  );
}
