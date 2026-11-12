import Link from 'next/link';
import Icon from '@/components/site/Icon';
import { FAQ } from '@/lib/brand';
import Shelf, { Line } from './Shelf';
import s from './web-system.module.css';

const LINK_STATES = [
  ['Default', ''],
  ['Hover', s.fLinkHover],
  ['Focus-visible', s.fFocus],
  ['Active', s.fLinkHover],
];
const ARROW_STATES = [
  ['Default', ''],
  ['Hover', `${s.fArrowHover} ${s.fLinkHover}`],
  ['Focus-visible', s.fFocus],
  ['Active', `${s.fArrowHover} ${s.fLinkHover}`],
];
const GLYPH_STATES = [
  ['Default', ''],
  ['Hover', s.arrowBtnHover],
  ['Focus-visible', s.fFocus],
  ['Active', s.arrowBtnActive],
];

export default function LinkBench() {
  return (
    <Shelf id="link" title="Link" note="Blue ink text with a hairline that draws in on hover (.link). The arrow link adds a → that moves 4 px. Card and FAQ arrows are 38 px square buttons.">
      <Line label="Text link">
        <div className={s.cells}>
          <Link href="/overview/" className="link">Overview</Link>
          <Link href="/web-system/" className="link">Web system</Link>
        </div>
        <div className={s.cells}>
          {LINK_STATES.map(([n, f]) => (
            <div key={n} className={s.cell}>
              <Link href="/lp-home/" tabIndex={-1} className={`link ${f}`}>Learn more</Link>
              <span className="t-small">{n}</span>
            </div>
          ))}
        </div>
      </Line>
      <Line label="Arrow link">
        <div className={s.cells}>
          <Link href="/lp-pricing/" className="link link-arrow">Choose a plan</Link>
        </div>
        <div className={s.cells}>
          {ARROW_STATES.map(([n, f]) => (
            <div key={n} className={s.cell}>
              <Link href="/lp-pricing/" tabIndex={-1} className={`link link-arrow ${f}`}>Choose a plan</Link>
              <span className="t-small">{n}</span>
            </div>
          ))}
        </div>
      </Line>
      <Line label="Card arrow (the ↗ at the top right of a card)">
        <div className={s.cells}>
          <button type="button" className={s.arrowBtn} aria-label="Open card"><Icon name="arrow-up-right" size={22} /></button>
          {GLYPH_STATES.map(([n, f]) => (
            <div key={n} className={s.cell}>
              <button type="button" tabIndex={-1} className={`${s.arrowBtn} ${f}`} aria-label={`Card arrow, ${n}`}><Icon name="arrow-up-right" size={22} /></button>
              <span className="t-small">{n}</span>
            </div>
          ))}
        </div>
      </Line>
      <Line label="FAQ row arrow">
        <div className={s.cells}>
          {GLYPH_STATES.map(([n, f]) => (
            <div key={n} className={s.cell}>
              <button type="button" tabIndex={-1} className={`${s.arrowBtn} ${f}`} aria-label={`${FAQ.rows[0]} arrow, ${n}`}><Icon name="arrow-right" size={22} /></button>
              <span className="t-small">{n}</span>
            </div>
          ))}
        </div>
      </Line>
    </Shelf>
  );
}
