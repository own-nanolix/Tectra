'use client';

import { useEffect, useRef } from 'react';
import { still } from '@/lib/site';
import s from './showcase.module.css';

// One white `mock` plate with its one-line caption in the margin (alternating left and right).
// The scene inside plays its load animation (layers sliding apart, the turn to the light) when the plate comes into
// view: until then its animations wait at their first frame. If anything fails they simply play.
export default function Plate({ n, name, side = 'left', width = 'full', children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || still() || el.getBoundingClientRect().top < window.innerHeight * 0.7) return undefined;
    el.setAttribute('data-state', 'idle');
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.setAttribute('data-state', 'play');
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      el.setAttribute('data-state', 'play');
    };
  }, []);
  return (
    <figure className={`${s.fig} ${s[`w-${width}`]} ${s[`side-${side}`]}`}>
      <div ref={ref} className={`mock ${s.plate}`}>{children}</div>
      <figcaption className={s.cap}>
        <span className={s.capN}>{String(n).padStart(2, '0')}</span>
        {name}
      </figcaption>
    </figure>
  );
}
