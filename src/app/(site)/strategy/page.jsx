import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import Icon from '@/components/site/Icon';
import Chip from '@/components/ui/Chip';
import { HEADINGS, QUOTES, STRATEGY_CHIPS, OVERVIEW, ABOUT, KPI, EFFICIENCY } from '@/lib/brand';
import { SectionHead, QuoteBlock, MarginFig, Steps } from '@/components/pages/strategy/parts';
import { Hl, Who } from '@/components/ui/Card';
import Mountain from '@/components/pages/strategy/Mountain';
import Insights from '@/components/pages/strategy/Insights';
import { Ruler, ProblemSolution } from '@/components/pages/strategy/ProblemSolution';
import { ScopeChips, ResultCards } from '@/components/pages/strategy/Results';
import Roadmap from '@/components/pages/strategy/Roadmap';
import s from '@/components/pages/strategy/styles';

export const metadata = pageMeta('strategy');

function QuoteStep({ quote, label, className }) {
  return (
    <Reveal className={className}>
      <Steps filled={quote.steps} label={label} />
      <p className={s.quoteSm}><Hl text={quote.text} hl={quote.hl} className="hl-ink" /></p>
      <Who name={quote.name} role={quote.role} initials={quote.initials} className={s.who} />
    </Reveal>
  );
}

export default function Page() {
  return (
    <section className="page" id="p-strategy" aria-label="Strategy">
      <div className="wrap">
        <header className={`${s.story} ${s.top}`}>
          <div className={s.measure}>
            <h1 tabIndex={-1} className="t-h1">Strategy</h1>
            <p className="t-lead muted" style={{ marginTop: 12 }}>The case study in its own order: brief, plan, research, problem and solution, result, next step.</p>
          </div>
        </header>

        {/* m02: the brief, Overview and About */}
        <section className={`${s.chapter} ${s.story}`} aria-label="Brief">
          <MarginFig value={KPI.overall.value} caption={KPI.overall.label} side="left" />
          <div className={s.measure}>
            <QuoteBlock chip="Overview" quote={QUOTES.brief} />
          </div>
          <MarginFig value={EFFICIENCY.value} caption={EFFICIENCY.label} side="right" />
          <div className={`${s.full}`} style={{ marginTop: 'clamp(40px, 6vw, 96px)' }}>
            <div className={s.twoCol}>
              <Reveal className={s.colWithBar}>
                <div className={s.vbar} aria-hidden="true"><i data-on="1" /><i /></div>
                <div>
                  <h3 className="t-h2">Overview</h3>
                  <p className="t-lead" style={{ marginTop: 18, maxWidth: '36ch' }}>{OVERVIEW}</p>
                </div>
              </Reveal>
              <Reveal className={s.colWithBar} delay={120}>
                <div className={`${s.vbar} ${s.vbarLow}`} aria-hidden="true"><i /><i data-on="1" /></div>
                <div>
                  <h3 className="t-h2">About</h3>
                  <ul className={s.aboutRows}>
                    {ABOUT.map(([k, v]) => (
                      <li key={k}>
                        <span>{k}</span>
                        <Icon name="arrow-right" size={40} />
                        <span>{v}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* m04: strategic plan */}
        <section className={s.chapter} aria-label="Strategic plan">
          <SectionHead {...HEADINGS.strategic} />
          <div className={`${s.story} ${s.mountainTop}`}>
            <Reveal className={`${s.mL} ${s.chips}`} style={{ alignSelf: 'start' }}>
              {STRATEGY_CHIPS.map((c) => (
                <Chip key={c}>{c}</Chip>
              ))}
            </Reveal>
            <div className={s.measure} style={{ gridRow: 1 }}>
              <QuoteStep quote={QUOTES.fragmented} label="Progress: 2 of 3 segments filled" />
            </div>
          </div>
          <div className={s.mountainTop}>
            <Mountain />
          </div>
          <div className={s.pair}>
            <QuoteStep quote={QUOTES.modular} label="Progress: 1 of 3 segments filled" className={s.pairL} />
            <QuoteStep quote={QUOTES.live} label="Progress: 3 of 3 segments filled" className={s.pairR} />
          </div>
        </section>

        {/* m06: user insights */}
        <section className={s.chapter} aria-label="User insights">
          <SectionHead {...HEADINGS.insights} />
          <div style={{ marginTop: 'clamp(28px, 4vw, 56px)' }}>
            <Insights />
          </div>
          <div className={s.story} style={{ marginTop: 'clamp(40px, 6vw, 96px)' }}>
            <MarginFig value={KPI.cross.value} caption={KPI.cross.label} side="left" />
            <div className={s.measure}>
              <Reveal>
                <p className={s.quote}><Hl text={QUOTES.research.text} hl={QUOTES.research.hl} /></p>
                <Who name={QUOTES.research.name} role={QUOTES.research.role} initials={QUOTES.research.initials} className={s.who} />
              </Reveal>
            </div>
            <MarginFig value={KPI.material.value} caption={KPI.material.label} side="right" />
          </div>
        </section>

        {/* m08: problem and solution */}
        <section className={s.chapter} aria-label="Problem and solution">
          <SectionHead {...HEADINGS.problem} />
          <div style={{ marginTop: 'clamp(28px, 4vw, 56px)' }}>
            <Ruler />
          </div>
          <ProblemSolution />
        </section>

        {/* m15: result */}
        <section className={s.chapter} aria-label="Result">
          <div className={s.story}>
            <div className={s.measure}>
              <QuoteBlock chip={HEADINGS.result.chip} quote={QUOTES.result} />
              <ScopeChips />
            </div>
          </div>
          <ResultCards />
        </section>

        {/* m17: next step */}
        <section className={s.chapter} aria-label="Next step">
          <div className={s.story}>
            <div className={s.measure}>
              <QuoteBlock chip={HEADINGS.next.chip} quote={QUOTES.next} />
            </div>
          </div>
          <div className={s.roadmap}>
            <Roadmap />
          </div>
        </section>
      </div>
    </section>
  );
}
