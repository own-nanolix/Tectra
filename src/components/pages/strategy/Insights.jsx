import Art from '@/components/art/Art';
import { TickBarsG } from '@/components/art/KeyArt';
import { axisLabels, AXIS } from '@/lib/charts';
import { INSIGHTS } from '@/lib/brand';
import CountUp from '@/components/site/CountUp';
import Reveal from '@/components/site/Reveal';
import ScrollRun from './ScrollRun';
import s from '@/components/pages/strategy/styles';

// The three research cards of User Insights (m06): a figure, its line, and the tick-bar chart with the
// designer's axis order 0 10 20 60 70 80 90 100 30 40 50.
const W = 560;

function InsightChart({ i, from, to, tone, label }) {
  const labels = axisLabels(W, AXIS);
  return (
    <Art
      viewBox={`0 0 ${W} 124`}
      title={`Tick-bar chart: ${label}`}
      exportName={`strategy-insight-${i + 1}`}
      className={s.chart}
    >
      <TickBarsG idp={`strategy-ins${i + 1}`} w={W} h={66} count={48} from={from} to={to} tone={tone} rise />
      {labels.map(({ label: l, x }, k) => (
        <text
          key={k}
          x={x}
          y="110"
          fontSize="12"
          fill="#5E5E5E"
          textAnchor={k === 0 ? 'start' : k === labels.length - 1 ? 'end' : 'middle'}
          className="fade-in"
          style={{ '--i': 8 + k }}
        >
          {l}
        </text>
      ))}
    </Art>
  );
}

export default function Insights() {
  return (
    <div className={s.insights}>
      {INSIGHTS.map((d, i) => (
        <Reveal key={d.value} delay={i * 90}>
          <ScrollRun className={`card ${s.insight}`}>
            <CountUp value={d.value} className={s.insightFig} as="p" />
            <p className={s.insightLabel}>{d.label}</p>
            <InsightChart i={i} from={d.from} to={d.to} tone={d.tone} label={`${d.value} ${d.label}`} />
          </ScrollRun>
        </Reveal>
      ))}
    </div>
  );
}
