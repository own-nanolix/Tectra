'use client';

import { useRef } from 'react';
import Art from '@/components/art/Art';
import { TickBarsG } from '@/components/art/KeyArt';
import Reveal from '@/components/site/Reveal';
import { PLANS } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { useBilling } from './Billing';
import s from './lp-pricing.module.css';

const W = 900;
const X0 = 50;
// Three equal zones with no scale: the only printed numbers are the plan thresholds, 20 and 200.
const STOPS = [1 / 3, 2 / 3, 1];
const xAt = (f) => r2(X0 + f * W);
const FIG = ['20', '200', null]; // the Premium bullet says "Unlimited task tracking"
const LAST = STOPS.length - 1;

// The usage slider: three stops, one per plan. Drag, click a zone, or use the arrow keys.
export default function Usage() {
  const { plan, setPlan } = useBilling();
  const box = useRef(null);
  const drag = useRef(false);

  const pick = (clientX) => {
    const el = box.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const f = ((clientX - r.left) / r.width) * 1000;
    const k = f < xAt(STOPS[0]) ? 0 : f < xAt(STOPS[1]) ? 1 : 2;
    setPlan(k);
  };
  const onDown = (e) => {
    drag.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    pick(e.clientX);
  };
  const onMove = (e) => {
    if (drag.current) pick(e.clientX);
  };
  const onUp = () => {
    drag.current = false;
  };
  const onKey = (e) => {
    const map = { ArrowRight: plan + 1, ArrowUp: plan + 1, ArrowLeft: plan - 1, ArrowDown: plan - 1, Home: 0, End: LAST, PageUp: LAST, PageDown: 0 };
    if (!(e.key in map)) return;
    e.preventDefault();
    setPlan(Math.max(0, Math.min(LAST, map[e.key])));
  };

  const bullet = PLANS.list[plan].bullets[0];
  return (
    <section className={`field ${s.usage}`} aria-labelledby="lp-pricing-usage-h">
      <div className={`wrap ${s.usageInner}`}>
        <Reveal className={s.usageHead}>
          <h2 id="lp-pricing-usage-h" className="t-caps" style={{ color: 'var(--navy)' }}>Tasks per month</h2>
          <p className={s.usageFig} aria-hidden="true">
            {FIG[plan] ? <span className="t-figure-xl" key={plan}>{FIG[plan]}</span> : <span className={`t-figure-xl ${s.usageWord}`} key={plan}>{bullet.split(' ')[0]}</span>}
          </p>
          <p className={`t-lead ${s.usageLine}`}>{bullet}</p>
        </Reveal>
        <Reveal delay={100} className={s.usageScroll}>
          <div
            ref={box}
            className={s.usageChart}
            role="slider"
            tabIndex={0}
            aria-labelledby="lp-pricing-usage-h"
            aria-valuemin={0}
            aria-valuemax={LAST}
            aria-valuenow={plan}
            aria-valuetext={`${PLANS.list[plan].name}: ${bullet}`}
            onKeyDown={onKey}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
          >
            <Art viewBox="0 0 1000 200" title="Tasks per month against the three plans" exportName="lp-pricing-usage" className={s.usageArt}>
              <TickBarsG idp="lp-pricing-usage" x={X0} y={36} w={W} h={86} count={72} from={0} to={STOPS[plan]} tone="white" base="#0A2E63" />
              <g stroke="#0A2E63" strokeWidth="1" strokeDasharray="3 4" opacity="0.6">
                <path d={`M${xAt(STOPS[0])} 20V130`} />
                <path d={`M${xAt(STOPS[1])} 20V130`} />
              </g>
              <text x={xAt(STOPS[0])} y="14" fontSize="13" fill="#0A2E63" textAnchor="middle">{FIG[0]}</text>
              <text x={xAt(STOPS[1])} y="14" fontSize="13" fill="#0A2E63" textAnchor="middle">{FIG[1]}</text>
              <rect x={X0} y="142" width={W} height="4" rx="1" fill="#0A2E63" />
              {PLANS.list.map((p, i) => (
                <text key={p.name} x={xAt((STOPS[i] + (i ? STOPS[i - 1] : 0)) / 2)} y="186" fontSize="15" fontWeight={plan === i ? 500 : 400} fill="#0A2E63" textAnchor="middle">
                  {p.name}
                </text>
              ))}
            </Art>
            <span className={s.usageHandle} style={{ left: `${xAt(STOPS[plan]) / 10}%` }} aria-hidden="true" />
          </div>
        </Reveal>
        <ul className={s.usagePlans}>
          {PLANS.list.map((p, i) => (
            <li key={p.name}>
              <button type="button" className={s.usagePlan} aria-pressed={plan === i} onClick={() => setPlan(i)}>
                <span className="t-title">{p.name}</span>
                <span className={`t-label ${s.usageBullet}`}>{p.bullets[0]}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
