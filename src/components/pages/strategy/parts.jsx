import Chip from '@/components/ui/Chip';
import { Hl, Who } from '@/components/ui/Card';
import CountUp from '@/components/site/CountUp';
import Reveal from '@/components/site/Reveal';
import s from '@/components/pages/strategy/styles';

// Chip, then a centred heading with one blue phrase (the case study's section opener).
export function SectionHead({ chip, text, hl, id }) {
  return (
    <Reveal className={s.head}>
      <Chip>{chip}</Chip>
      <h2 className={s.headTitle} id={id}><Hl text={text} hl={hl} /></h2>
    </Reveal>
  );
}

// A big quote with its blue phrase and the quote chip. The chip text is the section's h2.
export function QuoteBlock({ chip, quote, small = false, id }) {
  return (
    <Reveal>
      {chip && <h2 style={{ marginBottom: 'clamp(20px, 3vw, 36px)' }} id={id}><Chip>{chip}</Chip></h2>}
      <p className={small ? s.quoteSm : s.quote}><Hl text={quote.text} hl={quote.hl} /></p>
      <Who name={quote.name} role={quote.role} initials={quote.initials} className={s.who} />
    </Reveal>
  );
}

// A figure pulled out into a margin. Real case-study figures only.
export function MarginFig({ value, caption, side = 'left' }) {
  return (
    <aside className={side === 'left' ? s.mL : s.mR}>
      <CountUp value={value} className={s.marginFig} as="p" />
      <span className={s.marginCap}>{caption}</span>
    </aside>
  );
}

// Three-segment progress bar under the quotes of the strategic plan.
export function Steps({ filled, label }) {
  return (
    <div className={s.steps} role="img" aria-label={label}>
      {[0, 1, 2].map((i) => (
        <i key={i} data-on={i < filled ? '1' : '0'} style={{ '--i': i }} />
      ))}
    </div>
  );
}
