'use client';

import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import s from './motion.module.css';

// The vertical ruler down the left edge: it fills with blue as the page is read.
export function Timeline({ children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 70%'] });
  return (
    <div ref={ref} className={s.timeline}>
      <div className={s.spine} aria-hidden="true">
        <span className={s.spineTicks} />
        <span className={s.spineLine} />
        <motion.span className={s.spineFill} style={{ scaleY: scrollYProgress }} />
      </div>
      {children}
    </div>
  );
}

// One stop on the ruler: a tick, a heading on the left and the demos in the track on the right.
export function Node({ id, n, title, note, children }) {
  return (
    <section className={s.node} aria-labelledby={id}>
      <div className={s.head}>
        <p className="t-caps muted">{n}</p>
        <h2 id={id} className="t-h2">{title}</h2>
        <p className="t-small">{note}</p>
      </div>
      <div className={s.track}>{children}</div>
    </section>
  );
}
