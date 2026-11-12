import Card from '@/components/ui/Card';
import Chip from '@/components/ui/Chip';
import Icon from '@/components/site/Icon';
import CountUp from '@/components/site/CountUp';
import Reveal from '@/components/site/Reveal';
import { RESULTS, SCOPE_CHIPS } from '@/lib/brand';
import { CornerArc } from './ProblemSolution';
import ScrollRun from './ScrollRun';
import s from '@/components/pages/strategy/styles';

// Scope chips and the three result cards of the case study (m15). The first card is printed twice in the source
// and is kept twice. Each card has a corner gauge that sweeps to its figure.
export function ScopeChips() {
  return (
    <Reveal className={s.chips} style={{ marginTop: 'clamp(24px, 3vw, 40px)' }}>
      {SCOPE_CHIPS.map((c) => (
        <Chip key={c}>{c}</Chip>
      ))}
    </Reveal>
  );
}

export function ResultCards() {
  return (
    <div className={s.results}>
      {RESULTS.map((r, i) => {
        const v = parseInt(r.value, 10) / 100;
        return (
          <Reveal key={i} delay={i * 100}>
            <ScrollRun>
              <Card variant="page" className={s.resCard}>
                <div className={s.resLabel}>
                  <h3>{r.label}</h3>
                  <Icon name="arrow-up" size={20} />
                </div>
                <CountUp value={r.value} className={s.figure} as="p" />
                <CornerArc
                  name={`strategy-result-gauge-${i + 1}`}
                  tone={r.tone}
                  value={v}
                  title={`Corner gauge for ${r.label}, ${r.value}`}
                />
              </Card>
            </ScrollRun>
          </Reveal>
        );
      })}
    </div>
  );
}
