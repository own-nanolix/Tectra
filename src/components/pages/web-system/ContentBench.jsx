import Chip from '@/components/ui/Chip';
import { Hl, Who } from '@/components/ui/Card';
import Shelf, { Line, Fig } from './Shelf';
import TokenBlock from './TokenBlock';
import { AppIconSheet, MotionRamp } from './Arts';
import { QUOTES, HEADINGS } from '@/lib/brand';
import s from './web-system.module.css';

export default function ContentBench() {
  const q = QUOTES.brief;
  const h = HEADINGS.web;
  return (
    <>
      <Shelf id="content" title="Content block" note="A section chip, a Light heading with one blue phrase, then the quote. Quotes open with a straight double quote and are never closed. The quote chip carries a yellow dot.">
        <Line label="Section opener">
          <div className="stack">
            <Chip>{h.chip}</Chip>
            <h3 className="t-h2 t-balance" style={{ maxWidth: 780 }}><Hl text={h.text} hl={h.hl} /></h3>
          </div>
        </Line>
        <Line label="Quote with Who">
          <div className={s.quoteBlock}>
            <p className="t-quote"><Hl text={q.text} hl={q.hl} className={s.quoteHl} /></p>
            <Who name={q.name} role={q.role} initials={q.initials} />
          </div>
        </Line>
      </Shelf>
      <Shelf id="code" title="Token block" note="The tokens of globals.css in a monospaced system stack. Click a value to copy it, or copy the whole block.">
        <TokenBlock />
        <Fig caption="The motion tokens: durations in milliseconds and the four easing curves.">
          <MotionRamp />
        </Fig>
      </Shelf>
      <Shelf id="app-icon" title="App icon tile" note="Signal Yellow tile with the mark in light grey. Radius 6 on the web, 22 on the dock.">
        <Fig caption="Web tile, dock icon and small sizes.">
          <AppIconSheet />
        </Fig>
      </Shelf>
    </>
  );
}
