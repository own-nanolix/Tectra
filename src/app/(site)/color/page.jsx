import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import Chip from '@/components/ui/Chip';
import { Hl, Who } from '@/components/ui/Card';
import { QUOTES } from '@/lib/brand';
import Rings from '@/components/pages/color/Rings';
import { NeutralSheet, PairingSheet, PrimarySheet, ProportionBar, SemanticPanel } from '@/components/pages/color/Sheets';
import { ScaleTable, SemanticTable } from '@/components/pages/color/Tables';
import { BLUES, NEUTRALS, YELLOWS } from '@/components/pages/color/colorData';
import { s, css } from '@/components/pages/color/colorStyles';

export const metadata = pageMeta('color');

export default function Page() {
  const q = QUOTES.palette;
  return (
    <section className="page" id="p-color" aria-label="Colour">
      <style>{css}</style>
      <div className="wrap stack-lg">
        <header className={s.head}>
          <div className="stack">
            <Chip>Colour</Chip>
            <h1 className="t-h1" tabIndex={-1}>Calming blues, energetic yellows, sleek neutrals</h1>
          </div>
        </header>

        <Reveal>
          <div className={s.quote}>
            <p className={`t-quote ${s.quoteText}`}><Hl text={q.text} hl={q.hl} /></p>
            <div style={{ marginTop: 28 }}><Who name={q.name} role={q.role} initials={q.initials} /></div>
          </div>
        </Reveal>

        <div className={s.ringsRow}>
          <Reveal className={s.ringsPull}>
            <Rings />
          </Reveal>
          <div>
            <p className={s.note}>Hex values as printed in the case study. The black arc is labelled #FFB83D there, a repeat of the yellow; it is shown here as #000000 (sampled).</p>
            <p className={s.note}>Every hex, RGB and token value on this page copies on click.</p>
          </div>
        </div>

        <section className={s.section} aria-labelledby="color-h-primary">
          <h2 className="t-h2" id="color-h-primary">Primary <span className="hl">scale</span></h2>
          <p className="t-lead muted" style={{ maxWidth: '40em' }}>
            Published and sampled colours are named as in the case study. The steps marked Extension are mixed in code between those colours.
          </p>
          <Reveal className={s.sheet}><PrimarySheet /></Reveal>
          <ScaleTable rows={BLUES} caption="Blue scale around Tectra Blue" />
          <ScaleTable rows={YELLOWS} caption="Yellow scale around Signal Yellow" />
        </section>
      </div>

      <div className={s.bleed} style={{ margin: 'clamp(48px, 8vw, 120px) 0' }}>
        <ProportionBar />
      </div>

      <div className="wrap stack-lg">
        <section className={s.section} aria-labelledby="color-h-neutral">
          <h2 className="t-h2" id="color-h-neutral">Neutral <span className="hl">scale</span></h2>
          <Reveal className={s.sheet}><NeutralSheet /></Reveal>
          <ScaleTable rows={NEUTRALS} caption="Neutral scale from White to Black" />
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
            Dark for Tectra is the app on ink or on the blue field. Positive is the yellow up triangle and negative the red down triangle of the app.
          </p>
          <div className={s.pair}>
            <Reveal className={s.sheet}><SemanticPanel mode="light" /></Reveal>
            <Reveal className={s.sheet} delay={80}><SemanticPanel mode="dark" /></Reveal>
          </div>
          <SemanticTable />
        </section>
      </div>
    </section>
  );
}
