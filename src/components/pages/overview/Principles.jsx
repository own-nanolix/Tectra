import Reveal from '@/components/site/Reveal';
import CountUp from '@/components/site/CountUp';
import { Hl } from '@/components/ui/Card';
import { QUOTES, INSIGHTS, SOLUTION } from '@/lib/brand';
import s from '@/components/pages/overview/styles';

// Four principles, each titled with the case study's own words and backed by the quote shown with it.
// Three titles are the three phrases of the Solution card (m08); the fourth is the blue phrase of the palette
// statement (m11). Each pulled-out figure is one the case study prints, beside the line it measures.
const q = (text) => text.replace(/^"/, '');
const phrase = (i) => {
  const p = SOLUTION.replace(/\.$/, '').split(/, (?:and )?/)[i];
  return p.charAt(0).toUpperCase() + p.slice(1);
};

const PRINCIPLES = [
  {
    title: phrase(0),
    from: 'From the Solution card',
    quote: QUOTES.live,
    hl: QUOTES.live.hl,
    figure: INSIGHTS[1].value,
    cap: INSIGHTS[1].label,
  },
  {
    title: phrase(1),
    from: 'From the Solution card',
    quote: QUOTES.modular,
    hl: 'modular approach for better task prioritization',
    figure: INSIGHTS[2].value,
    cap: INSIGHTS[2].label,
  },
  {
    title: phrase(2),
    from: 'From the Solution card',
    quote: QUOTES.fragmented,
    hl: 'struggled with fragmented data',
    figure: INSIGHTS[0].value,
    cap: INSIGHTS[0].label,
  },
  {
    title: 'A modern, minimalistic color palette',
    from: 'From the palette statement',
    quote: QUOTES.palette,
    hl: 'calming blues, energetic yellows, and sleek neutrals',
    figure: '5',
    cap: 'colours printed as rings with their hex values',
  },
];

export default function Principles() {
  return (
    <div className={s.principles}>
      {PRINCIPLES.map((p, i) => (
        <Reveal key={p.title} as="article" className={s.principle} delay={(i % 2) * 90}>
          <div className={s.figBlock}>
            <CountUp value={p.figure} className={`pull ${s.figure}`} as="p" />
            <p className={`t-small ${s.figCap}`}>{p.cap}</p>
          </div>
          <p className={`t-caps ${s.from}`}>{p.from}</p>
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
