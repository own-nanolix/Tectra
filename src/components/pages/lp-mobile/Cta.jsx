import Art from '@/components/art/Art';
import { AppIconG, MarkG } from '@/components/art/Mark';
import { IsoSiteG } from '@/components/art/KeyArt';
import Button from '@/components/ui/Button';
import Reveal from '@/components/site/Reveal';
import { HERO } from '@/lib/brand';
import s from './lp-mobile.module.css';

// Download-style call to action: app tile, the product line, the two hero buttons. No store badges.
export default function Cta() {
  return (
    <section className={`field ${s.cta}`} aria-labelledby="lp-mobile-cta-h">
      <div className={`wrap ${s.ctaGrid}`}>
        <Reveal className={s.ctaCopy}>
          <Art viewBox="0 0 120 120" title="Tectra app icon" exportName="lp-mobile-app-icon" className={s.ctaIcon}>
            <AppIconG x={0} y={0} size={120} radius={22} />
          </Art>
          <h2 id="lp-mobile-cta-h" className="t-display">{HERO.title.join(' ')}</h2>
          <p className={`t-lead ${s.ctaLead}`}>{HERO.sub}</p>
          <div className="row">
            <Button href="/lp-pricing/">{HERO.cta[0]}</Button>
            <Button variant="sky" href="/lp-progress/">{HERO.cta[1]}</Button>
          </div>
        </Reveal>
        <Reveal delay={120} from="scale" className={s.ctaArt}>
          <Art viewBox="0 0 560 400" title="Isometric site with location pins" exportName="lp-mobile-cta-site" decorative>
            <IsoSiteG scale={1} tone="blue" seed={17} pins={['wing']} yellowPin="ridge" />
            <MarkG x={500} y={20} size={36} fill="#FFFFFF" />
          </Art>
        </Reveal>
      </div>
    </section>
  );
}
