import Reveal from '@/components/site/Reveal';
import s from './web-system.module.css';

// One shelf of the bench: a plain component name and a note in the label column, the specimens beside it.
// wide: the label sits above and the specimen takes the full width (the open mega menu).
export default function Shelf({ id, title, note, wide = false, children }) {
  const hid = `web-system-${id}-title`;
  const head = (
    <div className={s.shelfHead}>
      <h2 className="t-title" id={hid}>{title}</h2>
      {note && <p className={s.shelfNote}>{note}</p>}
    </div>
  );
  if (wide) {
    return (
      <Reveal as="section" className={s.shelfWide} aria-labelledby={hid} id={`web-system-${id}`}>
        <div className={s.shelfHeadWide}>{head}</div>
        {children}
      </Reveal>
    );
  }
  return (
    <Reveal as="section" className={s.shelf} aria-labelledby={hid} id={`web-system-${id}`}>
      {head}
      <div className={s.spec}>{children}</div>
    </Reveal>
  );
}

// A captioned row inside a specimen column.
export function Line({ label, children }) {
  return (
    <div className={s.line}>
      {label && <p className={s.cap}>{label}</p>}
      {children}
    </div>
  );
}

// A figure that holds an exportable SVG.
export function Fig({ caption, children }) {
  return (
    <figure className={s.fig}>
      {children}
      {caption && <figcaption className="t-small">{caption}</figcaption>}
    </figure>
  );
}
