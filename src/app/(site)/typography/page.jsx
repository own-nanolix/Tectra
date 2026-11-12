import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import Chip from '@/components/ui/Chip';
import { FONT_NAME } from '@/lib/brand';
import { SpecimenSvg, GlyphSvg, WeightsSvg, VoiceSvg, CharsetSvg } from '@/components/pages/typography/Specimens';
import { ScaleSvg, ScaleTable, WeightTable } from '@/components/pages/typography/Scale';
import { HierarchySvg, MetricsSvg, METRIC_LINES } from '@/components/pages/typography/Drawings';
import Tester from '@/components/pages/typography/Tester';
import Habits from '@/components/pages/typography/Habits';
import s from '@/components/pages/typography/typography.module.css';

export const metadata = pageMeta('typography');

export default function Page() {
  return (
    <section className="page" id="p-typography" aria-label="Typography">
      <div className="wrap">
        <header className={`stack ${s.head}`}>
          <Chip>Typography</Chip>
          <h1 className="t-h1" tabIndex={-1}>{FONT_NAME}, <span className="hl">Light</span> for everything large</h1>
        </header>

        {/* m11: the specimen of the case study, at full width */}
        <Reveal as="section" className={s.specimen} aria-labelledby="typography-h-primary">
          <h2 className="sr-only" id="typography-h-primary">Primary typeface</h2>
          <SpecimenSvg />
        </Reveal>

        <div className={s.book}>
          <div className={s.stick}>
            <GlyphSvg />
            <p className={s.stickNote}>Urbanist, an open-licence Google Font, in three weights: Light 300, Regular 400, Medium 500.</p>
          </div>

          <div className={s.flow}>
            <section className={s.block} aria-labelledby="typography-h-weights">
              <h2 className="t-h2" id="typography-h-weights">Three <span className="hl">weights</span></h2>
              <Reveal className={s.sheet}><WeightsSvg /></Reveal>
              <WeightTable />
              <Tester />
            </section>

            <section className={s.block} aria-labelledby="typography-h-voice">
              <h2 className="t-h2" id="typography-h-voice">The label <span className="hl">voice</span></h2>
              <p className="t-lead muted">The case study shows one family. Medium is its second voice, used for labels and card titles.</p>
              <Reveal className={s.sheet}><VoiceSvg /></Reveal>
            </section>

            <section className={s.block} aria-labelledby="typography-h-scale">
              <h2 className="t-h2" id="typography-h-scale">Type <span className="hl">scale</span></h2>
              <p className="t-lead muted">Sizes are read at 1600 px wide and shrink with the screen.</p>
              <Reveal className={s.sheet}><ScaleSvg /></Reveal>
              <ScaleTable />
            </section>

            <section className={s.block} aria-labelledby="typography-h-charset">
              <h2 className="t-h2" id="typography-h-charset">Character <span className="hl">set</span></h2>
              <p className="t-lead muted">Printed as in the case study, including the designer&apos;s G in place of J.</p>
              <Reveal className={s.sheet}><CharsetSvg /></Reveal>
            </section>

            <section className={s.block} aria-labelledby="typography-h-habits">
              <h2 className="t-h2" id="typography-h-habits">Type <span className="hl">habits</span></h2>
              <p className="t-lead muted">How the case study sets its words, each shown on a line it prints.</p>
              <Reveal><Habits /></Reveal>
            </section>
          </div>
        </div>

        <section className={s.wide} aria-labelledby="typography-h-hierarchy">
          <h2 className="t-h2" id="typography-h-hierarchy">Hierarchy <span className="hl">in use</span></h2>
          <Reveal className={s.sheet}><HierarchySvg /></Reveal>
        </section>

        <section className={s.wide} aria-labelledby="typography-h-metrics">
          <h2 className="t-h2" id="typography-h-metrics">Letter <span className="hl">metrics</span></h2>
          <div className={s.metrics}>
            <Reveal className={s.metricsSvg}><MetricsSvg /></Reveal>
            <div className={s.notes}>
              <p><b>Measured</b>Read from the Urbanist font file in the browser, in units of the em (1000 units).</p>
              {METRIC_LINES.map((m) => (
                <p key={m.id}><b>{m.label} <code>{m.k.toFixed(3)} em</code></b>{m.note}</p>
              ))}
              <p><b>Bowls <code>1.05 : 1</code></b>The o is 560 units wide and 532 high: close to a circle, like the circles of the mark.</p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
