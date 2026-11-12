import Reveal from '@/components/site/Reveal';
import Chip from '@/components/ui/Chip';
import { Hl, Who } from '@/components/ui/Card';
import { QUOTES, DESIGNER, SCOPE_CHIPS } from '@/lib/brand';
import s from '@/components/pages/overview/styles';

// The brief as it opens the case study (m02): the client's line in 88 px Light with its blue phrase, and the
// quote chip set against the end of the last line.
export function Brief() {
  const b = QUOTES.brief;
  return (
    <Reveal className={s.brief}>
      <p className={`t-display ${s.briefText}`}><Hl text={b.text} hl={b.hl} /></p>
      <Who name={b.name} role={b.role} initials={b.initials} className={s.briefWho} />
    </Reveal>
  );
}

// The case study's own credits, as a right-hand margin note. Facts from the Behance page (SOURCE.md).
export function Credits() {
  return (
    <div className={s.credits}>
      <h2 className="t-caps" style={{ color: 'var(--ink)' }}>Case study</h2>
      <dl>
        <div><dt>By</dt><dd>{DESIGNER}</dd></div>
        <div><dt>Published</dt><dd>May 19th 2025, on Behance</dd></div>
        <div><dt>Made in</dt><dd>Figma, XD, Illustrator, Photoshop, InDesign</dd></div>
      </dl>
      <ul className={s.scope} aria-label="Scope of the case study">
        {SCOPE_CHIPS.map((c) => <li key={c}><Chip size="sm">{c}</Chip></li>)}
      </ul>
    </div>
  );
}
