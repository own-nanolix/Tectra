import Art from '@/components/art/Art';
import { GaugeG } from '@/components/art/KeyArt';
import Card from '@/components/ui/Card';
import Reveal from '@/components/site/Reveal';
import { PROBLEM, SOLUTION } from '@/lib/brand';
import { ruler } from '@/lib/charts';
import ScrollRun from './ScrollRun';
import s from '@/components/pages/strategy/styles';

// The corner arc of a card: a quarter circle leaving by the card's bottom-right corner. The value is
// decorative here (the case study prints no figure on these two cards).
export function CornerArc({ name, tone, value, title }) {
  return (
    <Art viewBox="0 0 340 236" title={title} exportName={name} className={s.corner}>
      <GaugeG w={340} h={236} r={120} value={value} tone={tone} draw />
    </Art>
  );
}

// The full-width ruler of Problem and solution (m08): labels in the designer's order, grey ticks, one yellow
// line with a handle at each end.
const LABELS = [10, 20, 60, 70, 80, 90, 100, 30, 40];

export function Ruler() {
  const W = 1440;
  const ticks = ruler(80, W - 28).map((x) => x + 14);
  const step = (W - 56) / (LABELS.length - 1);
  return (
    <ScrollRun className={s.scroller}>
      <Art
        viewBox={`0 0 ${W} 130`}
        title="Ruler with labels 10 20 60 70 80 90 100 30 40, a yellow line and a yellow handle at each end"
        exportName="strategy-ruler"
      >
        {LABELS.map((l, i) => (
          <text key={l} x={28 + i * step} y="26" fontSize="22" fill="#5E5E5E" textAnchor="middle" className="fade-in" style={{ '--i': i }}>
            {l}
          </text>
        ))}
        <path d={ticks.map((x) => `M${x} 54v60`).join('')} stroke="#E0E0E0" strokeWidth="2" className="fade-in" />
        <rect x="14" y="83" width={W - 28} height="2" fill="#FFB83D" className="grow-x" style={{ '--i': 4 }} />
        {[0, 1].map((k) => {
          const left = k === 0;
          const bx = left ? 14 : W - 40;
          const cx = left ? 44 : W - 44;
          return (
            <g key={k} className="pop" style={{ '--i': k === 0 ? 2 : 15 }}>
              <rect x={bx} y="77" width="26" height="14" rx="1" fill="#FFB83D" />
              <circle cx={cx} cy="84" r="5" fill="#FAFAFA" stroke="#FFB83D" strokeWidth="1.5" />
            </g>
          );
        })}
      </Art>
    </ScrollRun>
  );
}

export function ProblemSolution() {
  return (
    <div className={s.ps}>
      <Reveal>
        <ScrollRun>
          <Card title="Problem" arrow className={s.psCard}>
            <p>{PROBLEM}</p>
            <CornerArc name="strategy-problem-arc" tone="yellow" value={0.55} title="Corner arc of the Problem card, in yellow" />
          </Card>
        </ScrollRun>
      </Reveal>
      <Reveal delay={120}>
        <ScrollRun>
          <Card title="Solution" arrow className={s.psCard}>
            <p>{SOLUTION}</p>
            <CornerArc name="strategy-solution-arc" tone="blue" value={0.7} title="Corner arc of the Solution card, in blue" />
          </Card>
        </ScrollRun>
      </Reveal>
    </div>
  );
}
