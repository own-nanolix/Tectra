import Reveal from '@/components/site/Reveal';
import { Segmented } from '@/components/ui/Toggle';
import { PLANS } from '@/lib/brand';
import s from './s';

// The closing plan call: blue logo tile, the heading (no blue phrase here, as in the case study), sub line, switch.
export default function PlanCall() {
  return (
    <section className={`wrap ${s.call}`} aria-labelledby="lp-home-call-h">
      <Reveal className={s.center}>
        <span className={s.logoTile} aria-hidden="true">
          <svg viewBox="0 0 100 100" width="30" height="30">
            <use href="#site-mark" />
          </svg>
        </span>
        <h2 id="lp-home-call-h" className={`${s.h2} ${s.h2Lg}`}>{PLANS.heading}</h2>
        <p className={s.subline}>{PLANS.sub}</p>
        <Segmented id="lp-home-billing-3" label="Billing period" options={PLANS.toggle} className={`${s.seg} ${s.segRow}`} />
      </Reveal>
    </section>
  );
}
