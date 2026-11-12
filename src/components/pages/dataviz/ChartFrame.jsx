'use client';

import { useRef, useState } from 'react';
import s from './dataviz.module.css';

// Wraps a chart (an <svg> or several). Any element inside with data-tip="..." shows a tooltip on hover and on
// keyboard focus. The tooltip is HTML laid over the wrapper, never inside the exportable SVG.
export default function ChartFrame({ children, flow = false }) {
  const ref = useRef(null);
  const [tip, setTip] = useState(null);
  const show = (e) => {
    const el = ref.current;
    const t = e.target && e.target.closest ? e.target.closest('[data-tip]') : null;
    if (!el || !t) return;
    const r = el.getBoundingClientRect();
    const b = t.getBoundingClientRect();
    const x = Math.min(Math.max(b.left - r.left + b.width / 2, 70), Math.max(r.width - 70, 70));
    setTip({ x, y: Math.max(b.top - r.top, 0), text: t.getAttribute('data-tip') });
  };
  const hide = () => setTip(null);
  return (
    <div
      ref={ref}
      className={flow ? s.flow : s.frame}
      onPointerOver={show}
      onFocus={show}
      onPointerLeave={hide}
      onBlur={hide}
      onKeyDown={(e) => { if (e.key === 'Escape') hide(); }}
    >
      {children}
      {tip && (
        <span key={tip.text} className={s.tip} aria-hidden="true" style={{ left: tip.x, top: tip.y }}>
          {tip.text}
        </span>
      )}
    </div>
  );
}
