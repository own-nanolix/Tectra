import { pageMeta } from '@/lib/pages';
import LandingNav from '@/components/ui/LandingNav';
import LandingFooter from '@/components/ui/LandingFooter';
import Button from '@/components/ui/Button';
import Art from '@/components/art/Art';
import { IsoSiteG } from '@/components/art/KeyArt';
import { Hl } from '@/components/ui/Card';
import Reveal from '@/components/site/Reveal';
import { BILLBOARD, PLANS } from '@/lib/brand';
import WorkAreasLive from '@/components/pages/lp-work-areas/WorkAreasLive';
import Crew from '@/components/pages/lp-work-areas/Crew';
import CrossSection from '@/components/pages/lp-work-areas/CrossSection';
import CutFillSection from '@/components/pages/lp-work-areas/CutFillSection';
import Ledger from '@/components/pages/lp-work-areas/Ledger';
import Features from '@/components/pages/lp-work-areas/Features';
import s from '@/components/pages/lp-work-areas/lp-work-areas.module.css';

export const metadata = pageMeta('lp-work-areas');

export default function Page() {
  return (
    <section className={`page ${s.root}`} id="p-lp-work-areas" aria-label="Landing: Work areas">
      <WorkAreasLive nav={<LandingNav current="lp-work-areas" tone="blue" />} />
      <Crew />
      <CrossSection />
      <CutFillSection />
      <Ledger />
      <Features />

      <section className="wrap" aria-labelledby="lp-work-areas-cta-h">
        <Reveal className={`field-ink ${s.cta}`}>
          <div className={s.ctaSite} aria-hidden="true">
            <Art viewBox="0 0 560 400" decorative exportName="lp-work-areas-cta-site">
              <IsoSiteG tone="blue" seed={4} />
            </Art>
          </div>
          <div className={s.ctaText}>
            <h2 id="lp-work-areas-cta-h" className="t-display t-balance">
              <Hl text={BILLBOARD.title} hl="Real-Time Data" />
            </h2>
            <p className="t-lead">{BILLBOARD.sub}</p>
            <div className="row" style={{ gap: 12 }}>
              <Button href="/lp-pricing/">{PLANS.list[1].cta}</Button>
              <Button href="/lp-pricing/" variant="white">{PLANS.list[0].cta}</Button>
            </div>
          </div>
        </Reveal>
      </section>

      <LandingFooter />
    </section>
  );
}
