'use client';

import { useState } from 'react';
import Icon from '@/components/site/Icon';
import Chip from '@/components/ui/Chip';
import Button from '@/components/ui/Button';
import { Hl } from '@/components/ui/Card';
import { FEATURES, PLANS } from '@/lib/brand';
import s from './lp-mobile.module.css';

const FILTERS = ['All', ...PLANS.list.map((p) => p.name)];

const ROWS = [
  ...FEATURES.rows.map(([title, text], i) => ({ id: `f${i}`, group: 'feature', title, text, n: `0${i + 1}` })),
  ...PLANS.list.flatMap((p, pi) => p.bullets.map((b, bi) => ({ id: `p${pi}-${bi}`, group: p.name, title: b, text: p.name, n: null }))),
];

// The feature checklist ledger: tick the rows you care about; filter the plan lines by plan.
export default function Ledger() {
  const [filter, setFilter] = useState('All');
  const [done, setDone] = useState(() => new Set(['f0']));
  const shown = ROWS.filter((r) => r.group === 'feature' || filter === 'All' || r.group === filter);
  const ticked = shown.filter((r) => done.has(r.id)).length;
  const toggle = (id) =>
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section className={`wrap ${s.ledger}`} aria-labelledby="lp-mobile-ledger-h">
      <div className={s.ledgerHead}>
        <h2 id="lp-mobile-ledger-h" className="t-h1 t-balance">
          <Hl text={FEATURES.heading} hl={FEATURES.hl} />
        </h2>
        <p className="t-lead muted">{FEATURES.sub}</p>
        <div className={s.filters} role="group" aria-label="Plan lines">
          {FILTERS.map((f) => (
            <Chip key={f} pressed={filter === f} onClick={() => setFilter(f)} size="sm" className={s.filterChip}>
              {f}
            </Chip>
          ))}
        </div>
        <div className={s.meter} aria-live="polite">
          <span className={`t-figure ${s.meterFig}`}>
            {ticked}
            <span className="muted"> / {shown.length}</span>
          </span>
          <span className={s.meterBar} aria-hidden="true">
            <span className={s.meterFill} style={{ transform: `scaleX(${shown.length ? ticked / shown.length : 0})` }} />
          </span>
        </div>
      </div>
      <ul className={s.ledgerList}>
        {shown.map((r, i) => {
          const on = done.has(r.id);
          return (
            <li key={r.id} className={s.ledgerItem} style={{ '--i': i }}>
              <button type="button" className={s.ledgerRow} aria-pressed={on} onClick={() => toggle(r.id)}>
                <span className={`${s.ledgerNum} t-label`}>{r.n || ''}</span>
                <span className={s.ledgerText}>
                  <span className="t-title">{r.title}</span>
                  {r.group === 'feature' && <span className="t-label">{r.text}</span>}
                  {r.group !== 'feature' && <span className="t-label">{r.text}</span>}
                </span>
                <span className={s.box} aria-hidden="true">
                  <Icon name="check" size={18} />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className={s.ledgerFoot}>
        <p className="t-body muted">{FEATURES.note}</p>
        <Button variant="dark" href="/dashboard/" iconRight="arrow-right">{FEATURES.demo}</Button>
      </div>
    </section>
  );
}
