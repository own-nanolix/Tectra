import Art from '@/components/art/Art';
import { GaugeG } from '@/components/art/KeyArt';
import Chip from '@/components/ui/Chip';
import { Hl } from '@/components/ui/Card';
import Icon from '@/components/site/Icon';
import Reveal from '@/components/site/Reveal';
import CountUp from '@/components/site/CountUp';
import { BILLBOARD, HEADINGS, RESULTS, EFFICIENCY, SCOPE_CHIPS } from '@/lib/brand';
import s from './lp-timeline.module.css';

const CARDS = [
  { key: 'a', label: RESULTS[0].label, value: RESULTS[0].value, tone: 'blue' },
  { key: 'b', label: RESULTS[2].label, value: RESULTS[2].value, tone: 'yellow' },
  { key: 'c', label: EFFICIENCY.label, value: EFFICIENCY.value, tone: 'blue', hero: true },
];

export default function Results() {
  return (
    <section className={`wrap ${s.band}`} aria-labelledby="lp-timeline-results-h">
      <Reveal className={s.headRow}>
        <Chip>{HEADINGS.result.chip}</Chip>
        <h2 id="lp-timeline-results-h" className="t-display t-balance">
          <Hl text={BILLBOARD.title} hl="Real-Time Data" />
        </h2>
        <div className="row">
          {SCOPE_CHIPS.map((c) => (
            <Chip key={c} size="sm">{c}</Chip>
          ))}
        </div>
      </Reveal>
      <div className={`grid cols-3 ${s.results}`}>
        {CARDS.map((c, i) => (
          <Reveal key={c.key} delay={i * 80}>
            <article className={`card ${s.resultCard} ${c.hero ? s.resultHero : ''}`}>
              <div className="card-head">
                <h3 className="t-title" style={{ maxWidth: '16ch' }}>{c.label}</h3>
                <Icon name="arrow-up-right" size={18} />
              </div>
              <p className={`t-figure-xl ${s.resultFigure}`}><CountUp value={c.value} /></p>
              <Art viewBox="0 0 340 236" decorative exportName={`lp-timeline-gauge-${c.key}`} className={s.gauge} preserveAspectRatio="xMaxYMax slice">
                <GaugeG w={340} h={236} r={150} value={parseInt(c.value, 10) / 100} tone={c.tone} draw track={c.hero ? '#E5A12E' : '#DFDFDF'} />
              </Art>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
