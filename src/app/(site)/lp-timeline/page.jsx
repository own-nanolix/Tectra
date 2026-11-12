import { pageMeta } from '@/lib/pages';
import LandingNav from '@/components/ui/LandingNav';
import LandingFooter from '@/components/ui/LandingFooter';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import { Hl, Who } from '@/components/ui/Card';
import Reveal from '@/components/site/Reveal';
import { QUOTES, HEADINGS, HERO, PALM, FEATURES } from '@/lib/brand';
import TimelineLive from '@/components/pages/lp-timeline/TimelineLive';
import DevicePath from '@/components/pages/lp-timeline/DevicePath';
import CalendarStrip from '@/components/pages/lp-timeline/CalendarStrip';
import Results from '@/components/pages/lp-timeline/Results';
import s from '@/components/pages/lp-timeline/lp-timeline.module.css';

export const metadata = pageMeta('lp-timeline');

export default function Page() {
  const q = QUOTES.next;
  return (
    <section className={`page ${s.root}`} id="p-lp-timeline" aria-label="Landing: Timeline">
      <LandingNav current="lp-timeline" tone="light" />
      <TimelineLive />
      <DevicePath />
      <CalendarStrip />
      <Results />

      <section className={`wrap ${s.band}`} aria-labelledby="lp-timeline-quote-h">
        <Reveal className={s.quote}>
          <Chip>{HEADINGS.next.chip}</Chip>
          <h2 id="lp-timeline-quote-h" className="t-display t-balance" style={{ margin: '28px 0 36px' }}>
            <Hl text={q.text} hl={q.hl} />
          </h2>
          <Who name={q.name} role={q.role} initials={q.initials} />
        </Reveal>
      </section>

      <section className={`wrap ${s.band}`} aria-labelledby="lp-timeline-cta-h">
        <div className={s.split}>
          <Reveal className={`field ${s.splitA}`}>
            <h2 id="lp-timeline-cta-h" className="t-display">{HERO.title.join(' ')}</h2>
            <p className="t-lead on-blue" style={{ color: 'var(--navy)' }}>{HERO.sub}</p>
            <div className="row" style={{ gap: 12 }}>
              <Button href="/dashboard/">{HERO.cta[0]}</Button>
              <Button href="/lp-home/" variant="sky">{HERO.cta[1]}</Button>
            </div>
          </Reveal>
          <Reveal delay={90} className={`card ${s.splitB}`}>
            <h3 className="t-h2 t-balance">{PALM.heading}</h3>
            <p className="t-lead">{PALM.sub}</p>
            <div className="row">
              <Button href="/lp-dashboard/" variant="dark" iconRight="arrow-right">{FEATURES.demo}</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <LandingFooter className={s.footer} />
    </section>
  );
}
