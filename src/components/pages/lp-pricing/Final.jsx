'use client';

import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import Reveal from '@/components/site/Reveal';
import { Segmented } from '@/components/ui/Toggle';
import { Hl } from '@/components/ui/Card';
import { PLANS } from '@/lib/brand';
import { useBilling } from './Billing';
import s from './lp-pricing.module.css';

// The final plan call, as on the case study's second artboard: blue logo tile, the heading again, sub line, switch.
export default function Final() {
  const { billing, setBilling } = useBilling();
  return (
    <section className={`wrap ${s.final}`} aria-labelledby="lp-pricing-final-h">
      <Reveal className={s.finalInner}>
        <Art viewBox="0 0 96 96" title="Tectra logo tile" exportName="lp-pricing-logo-tile" className={s.finalTile}>
          <rect width="96" height="96" rx="6" fill="#4093EC" />
          <MarkG x={22} y={22} size={52} fill="#FFFFFF" bodyClass="fuse-a" dotClass="fuse-c" />
        </Art>
        <h2 id="lp-pricing-final-h" className="t-display t-center t-balance">
          <Hl text={PLANS.heading} hl={PLANS.hl} />
        </h2>
        <p className="t-lead muted t-center">{PLANS.sub}</p>
        <Segmented id="lp-pricing-billing-final" label="Billing period" options={PLANS.toggle} value={billing} onChange={setBilling} />
      </Reveal>
    </section>
  );
}
