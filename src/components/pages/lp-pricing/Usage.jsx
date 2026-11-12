'use client';

import Art from '@/components/art/Art';
import { TickBarsG } from '@/components/art/KeyArt';
import Reveal from '@/components/site/Reveal';
import { PLANS } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { useBilling, MAX_TASKS } from './Billing';
import s from './lp-pricing.module.css';

const W = 900;
const X0 = 50;
const at = (v) => r2((v / MAX_TASKS) * W);
const MIDS = [at(20) / 2, (at(20) + at(200)) / 2, (at(200) + W) / 2];

// The usage slider: drag "tasks per month"; up to 20 is Basic, up to 200 Standard, above that Premium.
export default function Usage() {
  const { tasks, setTasks, plan } = useBilling();
  return (
    <section className={`field ${s.usage}`} aria-labelledby="lp-pricing-usage-h">
      <div className={`wrap ${s.usageInner}`}>
        <Reveal className={s.usageHead}>
          <h2 id="lp-pricing-usage-h" className="t-caps" style={{ color: 'var(--navy)' }}>Tasks per month</h2>
          <p className={s.usageFig} aria-live="polite">
            <span className="t-figure-xl">{tasks}</span>
          </p>
          <p className={`t-lead ${s.usageLine}`}>{PLANS.list[plan].bullets[0]}</p>
        </Reveal>
        <Reveal delay={100} className={s.usageChart}>
          <Art viewBox="0 0 1000 200" title="Tasks per month against the three plans" exportName="lp-pricing-usage" className={s.usageArt}>
            <TickBarsG idp="lp-pricing-usage" x={X0} y={36} w={W} h={86} count={72} from={0} to={tasks / MAX_TASKS} tone="white" base="#0A2E63" />
            <g stroke="#0A2E63" strokeWidth="1" strokeDasharray="3 4" opacity="0.6">
              <path d={`M${X0 + at(20)} 20V130`} />
              <path d={`M${X0 + at(200)} 20V130`} />
            </g>
            <text x={X0 + at(20)} y="14" fontSize="13" fill="#0A2E63" textAnchor="middle">20</text>
            <text x={X0 + at(200)} y="14" fontSize="13" fill="#0A2E63" textAnchor="middle">200</text>
            {PLANS.list.map((p, i) => (
              <text key={p.name} x={X0 + (i === 0 ? 0 : MIDS[i])} y="186" fontSize="15" fontWeight={plan === i ? 500 : 400} fill="#0A2E63" fillOpacity={plan === i ? 1 : 0.7} textAnchor={i === 0 ? 'start' : 'middle'}>
                {p.name}
              </text>
            ))}
          </Art>
          <input
            id="lp-pricing-usage-range"
            className={s.range}
            type="range"
            min="0"
            max={MAX_TASKS}
            step="1"
            value={tasks}
            onChange={(e) => setTasks(Number(e.target.value))}
            aria-label="Tasks per month"
            aria-valuetext={`${tasks} tasks per month, ${PLANS.list[plan].name}`}
          />
        </Reveal>
        <ul className={s.usagePlans}>
          {PLANS.list.map((p, i) => (
            <li key={p.name} className={s.usagePlan} data-on={plan === i}>
              <span className="t-title">{p.name}</span>
              <span className={`t-label ${s.usageBullet}`}>{p.bullets[0]}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
