import Reveal from '@/components/site/Reveal';
import { HEX } from '@/lib/brand';
import ChartFrame from './ChartFrame';
import s from './dataviz.module.css';

export const C = HEX;

// Makes a data mark focusable and gives it a tooltip (hover and keyboard focus) and a screen-reader name.
export const tp = (text) => ({ tabIndex: 0, role: 'img', 'aria-label': text, 'data-tip': text });

// Trend triangle inside an SVG: yellow up, red down (the only red in the charts).
export function Tri({ x, y, dir = 'up' }) {
  return dir === 'up'
    ? <path d={`M${x - 5} ${y + 3}L${x + 5} ${y + 3}L${x} ${y - 4}Z`} fill={C.yellow} />
    : <path d={`M${x - 5} ${y - 3}L${x + 5} ${y - 3}L${x} ${y + 4}Z`} fill={C.red} />;
}

// Greedy word wrap for SVG text.
export function wrap(text, n) {
  const out = [];
  let cur = '';
  text.split(' ').forEach((w) => {
    if ((cur + ' ' + w).trim().length > n) { out.push(cur); cur = w; } else cur = (cur + ' ' + w).trim();
  });
  if (cur) out.push(cur);
  return out;
}

// A vertical fade gradient (bars fade downward) or a horizontal one (bars fade to the right).
export function FadeDef({ id, color, dir = 'v', end = 0 }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2={dir === 'v' ? '0' : '1'} y2={dir === 'v' ? '1' : '0'}>
      <stop offset="0" stopColor={color} />
      <stop offset="1" stopColor={color} stopOpacity={end} />
    </linearGradient>
  );
}

// One bento cell: title, the chart in its own frame, and the note set under it as a caption.
// span: classes from the module (w2, h2, w2 h2). tall: narrow chart that must not stretch on small screens.
export function Cell({ title, note, span = '', tall = false, split = false, delay = 0, children }) {
  const cls = [s.cell, ...span.split(' ').filter(Boolean).map((k) => s[k]), tall && s.tall].filter(Boolean).join(' ');
  return (
    <Reveal as="figure" delay={delay} className={cls}>
      <h3 className={s.cellTitle}>{title}</h3>
      <div className={s.plot}>
        <ChartFrame>{split ? <div className={s.split}>{children}</div> : children}</ChartFrame>
      </div>
      <figcaption className={s.caption}>{note}</figcaption>
    </Reveal>
  );
}
