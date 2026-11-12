import Reveal from '@/components/site/Reveal';
import CountUp from '@/components/site/CountUp';
import { Hl } from '@/components/ui/Card';
import { QUOTES, INSIGHTS, KPI } from '@/lib/brand';
import s from '@/components/pages/overview/styles';

// Four principles drawn from the brand idea and the designers' own lines. Titles are plain words of our own;
// each body reuses a line from the case study and each pulled-out figure is a figure the case study prints.
const q = (text) => text.replace(/^"/, '');
const PRINCIPLES = [
  {
    title: 'One body, not pieces',
    quote: QUOTES.fragmented,
    figure: INSIGHTS[0].value,
    cap: INSIGHTS[0].label,
    hl: 'fragmented data',
  },
  {
    title: 'Modular by design',
    quote: QUOTES.modular,
    figure: INSIGHTS[2].value,
    cap: INSIGHTS[2].label,
    hl: 'modular approach',
  },
  {
    title: 'Live, never stale',
    quote: QUOTES.live,
    figure: INSIGHTS[1].value,
    cap: INSIGHTS[1].label,
    hl: 'live data',
  },
  {
    title: 'Calm blue, yellow for attention',
    quote: QUOTES.palette,
    figure: KPI.overall.value,
    cap: KPI.overall.label,
    hl: 'blues, energetic yellows',
  },
];

export default function Principles() {
  return (
    <div className={s.principles}>
      {PRINCIPLES.map((p, i) => (
        <Reveal key={p.title} as="article" className={s.principle} delay={(i % 2) * 90}>
          <div className={s.figBlock}>
            <CountUp value={p.figure} className={`pull ${s.figure}`} as="p" />
            <p className="t-small" style={{ marginTop: 8, maxWidth: '30ch' }}>{p.cap}</p>
          </div>
          <h3 className="t-h3">{p.title}</h3>
          <p className="t-body">
            <Hl text={q(p.quote.text)} hl={p.hl} className="hl-ink" />
          </p>
          <p className="t-small" style={{ marginTop: 14 }}>{p.quote.name}, {p.quote.role}</p>
        </Reveal>
      ))}
    </div>
  );
}
