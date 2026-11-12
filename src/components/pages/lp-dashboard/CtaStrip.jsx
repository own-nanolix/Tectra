import Art from '@/components/art/Art';
import { IsoSiteG } from '@/components/art/KeyArt';
import Button from '@/components/ui/Button';
import { Hl } from '@/components/ui/Card';
import Reveal from '@/components/site/Reveal';
import { FEATURES, HERO, POSTER } from '@/lib/brand';
import s from './styles';

// Section 7: the call to action strip on the blue field, with the site drawing.
export default function CtaStrip() {
  return (
    <section className={`field ${s.cta}`} aria-labelledby="lp-dashboard-cta-h">
      <div className={`wrap ${s.ctaGrid}`}>
        <Reveal>
          <h2 id="lp-dashboard-cta-h" className="t-display t-balance"><Hl text={POSTER.title} hl="Build Faster" className={s.ctaHl} /></h2>
          <p className="t-body on-blue" style={{ marginTop: 16, maxWidth: 560 }}>{POSTER.sub}</p>
          <div className="row" style={{ marginTop: 32 }}>
            <Button variant="white" href="/dashboard/" iconRight="arrow-right">{FEATURES.demo}</Button>
            <Button href="/lp-pricing/">{HERO.cta[0]}</Button>
          </div>
        </Reveal>
        <Reveal delay={100} from="scale">
          <Art viewBox="0 0 560 400" title="The site: isometric cut-away building with location pins" exportName="lp-dashboard-site" className={s.ctaArt}>
            <IsoSiteG tone="blue" pins={['ridge', 'wing', 'gate']} yellowPin="komatsu" />
          </Art>
        </Reveal>
      </div>
    </section>
  );
}
