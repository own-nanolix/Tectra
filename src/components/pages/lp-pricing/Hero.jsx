'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import LandingNav from '@/components/ui/LandingNav';
import Button from '@/components/ui/Button';
import { Segmented } from '@/components/ui/Toggle';
import { Hl } from '@/components/ui/Card';
import { PLANS } from '@/lib/brand';
import { ease } from '@/lib/motion';
import { useBilling } from './Billing';
import s from './lp-pricing.module.css';

const TILES = ['#90C0F3', '#4093EC', '#006BEE'];

function PlanMark({ i, name }) {
  return (
    <Art viewBox="0 0 48 48" title={`${name} mark`} exportName={`lp-pricing-plan-${['basic', 'standard', 'premium'][i]}`} className={s.planMark}>
      <rect width="48" height="48" rx="4" fill="#F0F0F0" />
      <MarkG x={9} y={9} size={30} fill={TILES[i]} />
    </Art>
  );
}

function Column({ p, i, billing, picked, reduce }) {
  const priced = Boolean(p.price);
  const shown = { hidden: { opacity: 0, y: reduce ? 0 : 36 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: ease.out, delay: reduce ? 0 : 0.35 + i * 0.14 } } };
  return (
    <motion.article className={s.col} data-picked={picked} variants={shown} initial="hidden" animate="show" aria-labelledby={`lp-pricing-plan-${i}`}>
      <span className={s.pickBar} aria-hidden="true" />
      <header className={s.colHead}>
        <PlanMark i={i} name={p.name} />
        <h2 id={`lp-pricing-plan-${i}`} className="t-h3">{p.name}</h2>
      </header>
      <p className={`t-body muted ${s.colText}`}>{p.text}</p>
      <div className={s.priceRow}>
        {priced && (
          <p className={s.price}>
            {billing === 'Annually' ? <span className={s.priceBar} aria-hidden="true" /> : <span className={`t-figure ${s.priceFig}`}>{p.price}</span>}
            <span className={`t-body muted ${s.per}`}>{p.per}</span>
          </p>
        )}
      </div>
      <ul className={s.bullets}>
        {p.bullets.map((b, bi) => (
          <li key={b} className={s.bullet} style={{ '--i': bi + i * 2 }}>
            <span className={s.bulletDot} aria-hidden="true" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <Button variant={priced ? 'dark' : 'blue'} href="/dashboard/" block={priced} className={s.colBtn}>{p.cta}</Button>
    </motion.article>
  );
}

// Hero: the plan comparison itself, under a short headline with the live Monthly / Annually switch.
export default function Hero() {
  const { billing, setBilling, plan } = useBilling();
  const reduce = useReducedMotion();
  const [basic, standard, premium] = PLANS.list;
  return (
    <header className={s.hero}>
      <LandingNav current="lp-pricing" tone="light" />
      <div className={`wrap ${s.heroInner}`}>
        <div className={s.heroHead}>
          <h1 tabIndex={-1} className="t-h1 t-balance">
            <Hl text={PLANS.heading} hl={PLANS.hl} />
          </h1>
          <div className={s.heroSide}>
            <p className="t-lead muted">{PLANS.sub}</p>
            <Segmented id="lp-pricing-billing" label="Billing period" options={PLANS.toggle} value={billing} onChange={setBilling} />
          </div>
        </div>
        <div className={s.cols}>
          <Column p={basic} i={0} billing={billing} picked={plan === 0} reduce={reduce} />
          <div className={s.panel}>
            <Column p={standard} i={1} billing={billing} picked={plan === 1} reduce={reduce} />
            <Column p={premium} i={2} billing={billing} picked={plan === 2} reduce={reduce} />
          </div>
        </div>
      </div>
    </header>
  );
}
