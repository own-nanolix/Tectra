// Shared pieces of the stationery mockups: paper stock with thickness, placeholder bars, text wrapping, plates.
import { HEX } from '@/lib/brand';
import { MarkG } from '@/components/art/Mark';
import s from './use-stationery.module.css';

export const C = { ...HEX, grey: '#E1E1E1', greyD: '#CFCFCF', edge: '#CDCDCD', hair: '#E6E6E6' };

// An HTML plate: the white mock plate with a plain caption below.
export function Plate({ name, note, children, className = '' }) {
  return (
    <figure className={`${s.fig} ${className}`}>
      <div className="mock">{children}</div>
      <figcaption className="mock-cap">
        <span>{name}</span>
        {note && <span>{note}</span>}
      </figcaption>
    </figure>
  );
}

// A screen-space vector (sx, sy) expressed inside a frame rotated by `deg`: keeps shadows lower-right on rotated objects.
export function unrot(sx, sy, deg = 0) {
  const a = (-deg * Math.PI) / 180;
  return [Math.round((sx * Math.cos(a) - sy * Math.sin(a)) * 100) / 100, Math.round((sx * Math.sin(a) + sy * Math.cos(a)) * 100) / 100];
}

// Paper stock: soft shadow lower-right, a thickness edge, the face (card gradient + grain), lit edges upper-left.
// fill: a colour for coloured stock (a shade overlay is added); omit for white stock.
export function Sheet({ idp, x = 0, y = 0, w, h, r = 2, fill, depth = 3, lift = 1, rot = 0, shadow = true, edge = C.edge, children }) {
  const [sx, sy] = unrot(5 * lift, 8 * lift, rot);
  const [ex, ey] = unrot(depth * 0.6, depth, rot);
  return (
    <g>
      {shadow && <rect x={x + sx} y={y + sy} width={w} height={h} rx={r} fill={C.ink} opacity="0.15" filter={`url(#${idp}-soft)`} />}
      <rect x={x + ex} y={y + ey} width={w} height={h} rx={r} fill={edge} />
      <rect x={x} y={y} width={w} height={h} rx={r} fill={fill || `url(#${idp}-card)`} filter={`url(#${idp}-paper)`} />
      {fill && <rect x={x} y={y} width={w} height={h} rx={r} fill={`url(#${idp}-shade)`} opacity="0.55" />}
      <path d={`M${x} ${y + h}V${y}H${x + w}`} stroke="#fff" strokeOpacity="0.85" strokeWidth="1" fill="none" />
      <path d={`M${x + w} ${y}V${y + h}H${x}`} stroke="#000" strokeOpacity="0.12" strokeWidth="1" fill="none" />
      {children}
    </g>
  );
}

// A quiet placeholder line (a thin grey bar) for names, addresses, phone numbers and e-mail.
export function Ph({ x, y, w, h = 7, fill = C.grey, ...rest }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} {...rest} />;
}

// Rows of placeholder text lines: a column of bars with seeded-looking widths (no random).
export function PhLines({ x, y, w, rows, gap = 15, h = 6, fill = C.grey, widths = [1, 0.96, 0.9, 0.98, 0.62, 1, 0.93, 0.85, 0.97, 0.5] }) {
  return (
    <g>
      {Array.from({ length: rows }, (_, i) => (
        <Ph key={i} x={x} y={y + i * gap} w={w * widths[i % widths.length]} h={h} fill={fill} />
      ))}
    </g>
  );
}

// A mark stamped into the surface: highlight upper-left, shade lower-right.
export function Deboss({ x, y, size, fill = '#fff', dark = '#0A2E63', lightOp = 0.55, darkOp = 0.28 }) {
  return (
    <g>
      <MarkG x={x + 1.4} y={y + 1.6} size={size} fill={dark} opacity={darkOp} />
      <MarkG x={x - 1.2} y={y - 1.2} size={size} fill="#fff" opacity={lightOp} />
      <MarkG x={x} y={y} size={size} fill={fill} />
    </g>
  );
}

// Greedy word wrap on runs [{ t, hl }]. Returns lines of runs. max = characters per line.
export function wrapRuns(segs, max) {
  const words = [];
  segs.forEach((sg) => sg.t.split(' ').filter(Boolean).forEach((t) => words.push({ t, hl: !!sg.hl })));
  const lines = [];
  let cur = [];
  let len = 0;
  words.forEach((wd) => {
    if (len + wd.t.length + (cur.length ? 1 : 0) > max && cur.length) {
      lines.push(cur);
      cur = [];
      len = 0;
    }
    len += wd.t.length + (cur.length ? 1 : 0);
    cur.push(wd);
  });
  if (cur.length) lines.push(cur);
  return lines.map((ln) => {
    const runs = [];
    ln.forEach((wd, i) => {
      const last = runs[runs.length - 1];
      const piece = (i ? ' ' : '') + wd.t;
      if (last && last.hl === wd.hl) last.t += piece;
      else runs.push({ t: piece, hl: wd.hl });
    });
    return runs;
  });
}

// Splits a quote into [before, highlighted, after] runs.
export function quoteRuns(text, hl) {
  const i = text.indexOf(hl);
  if (i < 0) return [{ t: text }];
  return [{ t: text.slice(0, i) }, { t: hl, hl: true }, { t: text.slice(i + hl.length) }];
}

// Multi-line SVG text from wrapRuns output. hlFill colours the blue phrase.
export function RunLines({ lines, x, y, lh, size, fill, hlFill = C.blue, weight = 300, anchor = 'start' }) {
  return (
    <g fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor}>
      {lines.map((runs, i) => (
        <text key={i} x={x} y={y + i * lh} xmlSpace="preserve">
          {runs.map((r, j) => (
            <tspan key={j} fill={r.hl ? hlFill : undefined}>
              {r.t}
            </tspan>
          ))}
        </text>
      ))}
    </g>
  );
}

export function wrap(text, max) {
  return wrapRuns([{ t: text }], max).map((l) => l.map((r) => r.t).join(''));
}
