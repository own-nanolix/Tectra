import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import Chip from '@/components/ui/Chip';
import { FONT_NAME } from '@/lib/brand';
import { SpecimenSvg, GlyphSvg, WeightsSvg, VoiceSvg, CharsetSvg } from '@/components/pages/typography/Specimens';
import { ScaleSvg, ScaleTable } from '@/components/pages/typography/Scale';
import { HierarchySvg, MetricsSvg } from '@/components/pages/typography/Drawings';
import Tester from '@/components/pages/typography/Tester';
import { s, css } from '@/components/pages/typography/typoStyles';

export const metadata = pageMeta('typography');

export default function Page() {
  return (
    <section className="page" id="p-typography" aria-label="Typography">
      <style>{css}</style>
      <div className="wrap">
        <header className="stack" style={{ marginBottom: 'clamp(40px, 6vw, 88px)' }}>
          <Chip>Typography</Chip>
          <h1 className="t-h1" tabIndex={-1}>{FONT_NAME}, <span className="hl">Light</span> for everything large</h1>
        </header>

        <div className={s.book}>
          <div className={s.stick}>
            <GlyphSvg />
          </div>

          <div className={s.flow}>
            <section className={s.block} aria-labelledby="typography-h-primary">
              <h2 className="t-h2" id="typography-h-primary">Primary <span className="hl">typeface</span></h2>
              <Reveal className={s.sheet}><SpecimenSvg /></Reveal>
            </section>

            <section className={s.block} aria-labelledby="typography-h-weights">
              <h2 className="t-h2" id="typography-h-weights">Three <span className="hl">weights</span></h2>
              <Reveal className={s.sheet}><WeightsSvg /></Reveal>
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
              <p><b>Baseline</b>The line the letters stand on.</p>
              <p><b>x-height</b>The height of the lower-case body, set by the a and the o.</p>
              <p><b>Cap height</b>The height of H.</p>
              <p><b>Ascender and descender</b>The strokes of b and d above, and p and g below.</p>
              <p><b>Bowls</b>The round letters are close to circles, the same shape as the circles of the mark.</p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
