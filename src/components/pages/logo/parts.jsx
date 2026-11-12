import s from './logo.module.css';

// A block of the page: heading, the specimen column, and a margin note on the right.
// wide: the drawing takes the full width and the note sits under the heading.
export function Block({ title, note, wide = false, id, children }) {
  return (
    <section className={s.block} aria-labelledby={id}>
      <div className="wrap">
        <div className={s.grid}>
          <div className={wide ? s.mainWide : s.main}>
            <h2 id={id} className={`t-h3 ${s.heading}`}>{title}</h2>
            {wide && note && <div className={s.noteWide}>{note}</div>}
          </div>
          <div className={wide ? s.mainWide : s.main}>{children}</div>
          {!wide && note && <aside className={s.note}>{note}</aside>}
        </div>
      </div>
    </section>
  );
}

export function Plate({ caption, className = '', children }) {
  return (
    <figure className={`${s.plate} ${className}`}>
      {children}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

// A dimension line between two points, with a tick at each end and a label. Coordinates are in the drawing's space.
export function Dim({ a, b, label, tick = 6, color = '#2F2F2F', lx, ly, anchor = 'middle', rotate = 0, size = 14, weight = 400 }) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  const nx = (-dy / len) * tick;
  const ny = (dx / len) * tick;
  const mx = lx ?? (a[0] + b[0]) / 2;
  const my = ly ?? (a[1] + b[1]) / 2;
  return (
    <g stroke={color} strokeWidth="1.25" fill="none" strokeLinecap="round">
      <path d={`M${a[0]} ${a[1]}L${b[0]} ${b[1]}`} />
      <path d={`M${a[0] - nx} ${a[1] - ny}L${a[0] + nx} ${a[1] + ny}M${b[0] - nx} ${b[1] - ny}L${b[0] + nx} ${b[1] + ny}`} />
      {label && (
        <text
          x={mx} y={my} fontSize={size} fontWeight={weight} fill={color} stroke="none" textAnchor={anchor}
          transform={rotate ? `rotate(${rotate} ${mx} ${my})` : undefined}
        >
          {label}
        </text>
      )}
    </g>
  );
}

// A small centre cross.
export function Cross({ at, size = 6, color = '#145CB8' }) {
  return (
    <path d={`M${at[0] - size} ${at[1]}H${at[0] + size}M${at[0]} ${at[1] - size}V${at[1] + size}`} stroke={color} strokeWidth="1.25" fill="none" />
  );
}
