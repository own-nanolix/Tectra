import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import Chip from '@/components/ui/Chip';
import { Hl, Who } from '@/components/ui/Card';
import { QUOTES } from '@/lib/brand';
import { Ring } from '@/components/pages/color/Rings';
import { NeutralSheet, PairingSheet, PrimarySheet, ProportionBar, SemanticPanel } from '@/components/pages/color/Sheets';
import { ScaleTable, SemanticTable } from '@/components/pages/color/Tables';
import InUse from '@/components/pages/color/InUse';
import { BLUES, NEUTRALS, SIGNALS, CSS_ALL, STEP_COUNT } from '@/components/pages/color/colorData';
import CopyAll from '@/components/pages/color/CopyAll';
import s from '@/components/pages/color/color.module.css';

export const metadata = pageMeta('color');

export default function Page() {
  const q = QUOTES.palette;
  return (
    <section className="page" id="p-color" aria-label="Colour">
      <div className="wrap stack-lg">
        <header className={s.head}>
          <Chip>Colour</Chip>
          <h1 className="t-h1" tabIndex={-1}>Calming blues, energetic yellows, sleek neutrals</h1>
        </header>

        {/* m11: the palette statement */}
        <div className={s.opening}>
          <Reveal>
            <p className={`t-quote ${s.quoteText}`}><Hl text={q.text} hl={q.hl} /></p>
            <div className={s.who}><Who name={q.name} role={q.role} initials={q.initials} /></div>
          </Reveal>
          <div>
            <p className={s.note}>The five rings carry the hex values printed in the case study. The black arc is labelled #FFB83D there, a repeat of the yellow label; it is shown here as #000000, sampled.</p>
            <p className={s.note}>Every hex, RGB and token value on this page copies on click.</p>
            <p className={`${s.note} ${s.copyAll}`}>
              <span>All {STEP_COUNT} steps as CSS custom properties</span>
              <CopyAll css={CSS_ALL} count={STEP_COUNT} />
            </p>
          </div>
        </div>

        {/* Primary scale: Tectra Blue and Sky rings in the margin */}
        <section className={s.section} aria-labelledby="color-h-primary">
          <div className={s.row}>
            <div className={s.margin}>
              <Reveal><Ring id="blue" order={0} /></Reveal>
            </div>
            <div className={s.main}>
              <h2 className="t-h2" id="color-h-primary">Primary <span className="hl">scale</span></h2>
              <p className="t-lead muted" style={{ maxWidth: '36em' }}>
                Published colours are printed in the case study; sampled colours are read from its images. The steps between them are mixed in code from those colours, and the Source column gives the mix.
              </p>
              <Reveal className={s.sheet}><PrimarySheet /></Reveal>
            </div>
          </div>
          <ScaleTable rows={BLUES} caption="Blue scale around Tectra Blue" />
        </section>

        <section className={s.section} aria-labelledby="color-h-signal">
          <div className={s.row}>
            <div className={`${s.margin} ${s.marginPair}`}>
              <Reveal><Ring id="yellow" order={0} /></Reveal>
              <Reveal delay={90}><Ring id="sky" order={1} /></Reveal>
            </div>
            <div className={s.main}>
              <h3 className="t-h3" id="color-h-signal">Signal Yellow, Sky and Alert Red</h3>
              <p className="t-lead muted" style={{ maxWidth: '36em' }}>Yellow marks what needs attention: the app icon, the primary button, pins, the active tab. Sky is the secondary button and the pale fills. Red is kept to the down-trend triangle and status dots.</p>
            </div>
          </div>
          <ScaleTable rows={SIGNALS} caption="Signal Yellow and Alert Red with their tints and inks" />
        </section>
      </div>

      <div className={s.bleed}>
        <ProportionBar />
      </div>

      <div className="wrap stack-lg">
        <section className={s.section} aria-labelledby="color-h-neutral">
          <div className={s.row}>
            <div className={`${s.margin} ${s.marginPair}`}>
              <Reveal><Ring id="black" order={0} /></Reveal>
              <Reveal delay={90}><Ring id="white" order={1} /></Reveal>
            </div>
            <div className={s.main}>
              <h2 className="t-h2" id="color-h-neutral">Neutral <span className="hl">scale</span></h2>
              <p className="t-lead muted" style={{ maxWidth: '36em' }}>Paper, tiles, chips and cards carry the page and the app; ink carries the text. Muted ink is the darker grey for small text.</p>
              <Reveal className={s.sheet}><NeutralSheet /></Reveal>
            </div>
          </div>
          <ScaleTable rows={NEUTRALS} caption="Neutral scale from White to Black" />
        </section>

        <section className={s.section} aria-labelledby="color-h-inuse">
          <h2 className="t-h2" id="color-h-inuse">Colour <span className="hl">in use</span></h2>
          <p className="t-lead muted" style={{ maxWidth: '40em' }}>
            One calm blue field, white type, yellow on what needs attention; in the app, grey cards on a grey ground with a blue or yellow arc.
          </p>
          <Reveal className={s.sheet}><InUse /></Reveal>
        </section>

        <section className={s.section} aria-labelledby="color-h-pairings">
          <h2 className="t-h2" id="color-h-pairings">Accessible <span className="hl">pairings</span></h2>
          <p className="t-lead muted" style={{ maxWidth: '40em' }}>
            Ratios are computed from the hex values. Small text uses the deeper inks on light surfaces and on the blue field.
          </p>
          <Reveal className={s.sheet}><PairingSheet /></Reveal>
        </section>

        <section className={s.section} aria-labelledby="color-h-semantic">
          <h2 className="t-h2" id="color-h-semantic">Semantic <span className="hl">tokens</span></h2>
          <p className="t-lead muted" style={{ maxWidth: '40em' }}>
            Roles for light and dark mode. Positive and negative follow the trend triangles of the app: yellow up, red down.
          </p>
          <div className={s.pair}>
            <Reveal className={s.panel}><SemanticPanel mode="light" /></Reveal>
            <Reveal className={s.panel} delay={80}><SemanticPanel mode="dark" /></Reveal>
          </div>
          <SemanticTable />
        </section>
      </div>
    </section>
  );
}
