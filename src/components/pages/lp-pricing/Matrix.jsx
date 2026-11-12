'use client';

import Reveal from '@/components/site/Reveal';
import { Hl } from '@/components/ui/Card';
import { PLANS, FEATURES } from '@/lib/brand';
import { useBilling, SAMPLE_TASKS } from './Billing';
import s from './lp-pricing.module.css';

// Distinct bullet topics, straight from the plan bullets. "—" where a plan lists nothing.
const ROWS = [
  { topic: 'Tasks per month', cells: ['20', '200', 'Unlimited'] },
  { topic: 'AI project assistant', cells: ['Basic', 'Advanced', 'Premium'] },
  { topic: 'Template library', cells: ['—', 'Full', 'Exclusive'] },
  { topic: 'Cloud storage', cells: ['5GB', '10GB', '100GB'] },
  { topic: 'Support', cells: ['Community', '—', '—'] },
];

// The feature matrix. The column heads are buttons: pick a plan and its column is lit (and the usage slider moves).
export default function Matrix() {
  const { plan, setTasks } = useBilling();
  return (
    <section className={`wrap ${s.matrix}`} aria-labelledby="lp-pricing-matrix-h">
      <Reveal className={s.sectionHead}>
        <h2 id="lp-pricing-matrix-h" className="t-display t-balance">
          <Hl text={FEATURES.heading} hl={FEATURES.hl} />
        </h2>
        <p className="t-lead muted">{FEATURES.sub}</p>
      </Reveal>
      <Reveal delay={100} className={s.tableWrap}>
        <table className={s.table}>
          <caption className="sr-only">Plan features side by side</caption>
          <thead>
            <tr>
              <th scope="col" className={s.topicHead}>
                <span className="t-caps muted">Feature</span>
              </th>
              {PLANS.list.map((p, i) => (
                <th key={p.name} scope="col" data-on={plan === i} className={s.planHead}>
                  <button type="button" className={s.headBtn} aria-pressed={plan === i} onClick={() => setTasks(SAMPLE_TASKS[i])}>
                    {p.name}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.topic}>
                <th scope="row" className={s.topic}>{r.topic}</th>
                {r.cells.map((c, i) => (
                  <td key={i} data-on={plan === i} data-empty={c === '—'} className={s.cell}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </section>
  );
}
