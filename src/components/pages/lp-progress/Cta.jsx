import Art from '@/components/art/Art';
import { CraneG } from '@/components/art/KeyArt';
import Button from '@/components/ui/Button';
import Reveal from '@/components/site/Reveal';
import { EMPOWER, HERO, PLANS } from '@/lib/brand';
import s from './styles';

// Section 7: the closing call to action on Structure Blue, with the yellow crane.
export default function Cta() {
  return (
    <section className={`field-deep ${s.cta}`} aria-labelledby="lp-progress-cta-h">
      <div className={`wrap-narrow ${s.ctaGrid}`}>
        <Reveal>
          <h2 id="lp-progress-cta-h" className="t-display t-balance">
            {EMPOWER.join(' ')}
          </h2>
          <div className="row" style={{ marginTop: 32 }}>
            <Button href="/lp-pricing/">{PLANS.list[1].cta}</Button>
            <Button variant="sky" href="/lp-home/">{HERO.cta[1]}</Button>
          </div>
        </Reveal>
        <Reveal delay={100} from="scale">
          <Art viewBox="0 0 200 320" title="Yellow tower crane" exportName="lp-progress-crane" className={s.crane}>
            <CraneG />
          </Art>
        </Reveal>
      </div>
    </section>
  );
}
