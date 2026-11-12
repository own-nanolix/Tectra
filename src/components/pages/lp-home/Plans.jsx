import Art from '@/components/art/Art';
import { IsoSiteG, TreesG } from '@/components/art/KeyArt';
import Reveal from '@/components/site/Reveal';
import { Hl } from '@/components/ui/Card';
import { Segmented } from '@/components/ui/Toggle';
import Button from '@/components/ui/Button';
import { PLANS } from '@/lib/brand';
import s from './s';

const SLUGS = ['basic', 'standard', 'premium'];

// A small round icon: the line drawing inside a circle (grey line, blue roofs).
function PlanIcon({ slug, i }) {
  return (
    <Art viewBox="0 0 40 40" title={`${PLANS.list[i].name} icon`} exportName={`lp-home-plan-icon-${slug}`} decorative className={s.planIcon}>
      <defs>
        <clipPath id={`lp-home-pi-${slug}`}>
          <circle cx="20" cy="20" r="20" />
        </clipPath>
      </defs>
      <g clipPath={`url(#lp-home-pi-${slug})`}>
        <circle cx="20" cy="20" r="20" fill="#E9F1FB" />
        <TreesG x={-4} y={2} w={48} h={34} count={3} tone="paper" seed={4 + i} minSize={14} maxSize={22} />
        <IsoSiteG x={-12 + i * 2} y={4} scale={0.1} tone="paper" trees={false} />
      </g>
    </Art>
  );
}

function Bullets({ items, tone }) {
  return (
    <ul className={`${s.bullets} ${tone === 'page' ? s.bulletsPage : ''}`}>
      {items.map((b) => (
        <li key={b}>{b}</li>
      ))}
    </ul>
  );
}

export function PlanHead({ id }) {
  return (
    <div className={s.center}>
      <h2 id={id} className={`${s.h2} ${s.h2Plan}`}>
        <Hl text={PLANS.heading} hl={PLANS.hl} />
      </h2>
      <p className={s.subline}>{PLANS.sub}</p>
      <Segmented id="lp-home-billing" label="Billing period" options={PLANS.toggle} className={`${s.seg} ${s.segRow}`} />
    </div>
  );
}

export default function Plans() {
  const [basic, ...paid] = PLANS.list;
  return (
    <section className={`wrap ${s.section}`} aria-labelledby="lp-home-plans-h">
      <Reveal>
        <PlanHead id="lp-home-plans-h" />
      </Reveal>
      <div className={s.planGrid}>
        <Reveal as="article" className={s.basic}>
          <div>
            <h3 className={s.planName}><PlanIcon slug="basic" i={0} />{basic.name}</h3>
            <p className={s.planText}>{basic.text}</p>
          </div>
          <Bullets items={basic.bullets} tone="page" />
          <Button variant="blue" className={s.planBtn} href="/lp-pricing/">{basic.cta}</Button>
        </Reveal>
        <Reveal delay={120} className={s.panel}>
          {paid.map((p, k) => (
            <article key={p.name} className={s.plan}>
              <h3 className={s.planName}><PlanIcon slug={SLUGS[k + 1]} i={k + 1} />{p.name}</h3>
              <p className={s.planText}>{p.text}</p>
              <p className={s.price}>
                <span>{p.price}</span>
                <small>{p.per}</small>
              </p>
              <hr className="rule" />
              <Bullets items={p.bullets} />
              <Button variant="dark" block className={s.planBtn} href="/lp-pricing/">{p.cta}</Button>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
