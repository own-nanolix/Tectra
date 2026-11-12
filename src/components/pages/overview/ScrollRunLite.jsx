'use client';

import { useEffect, useRef } from 'react';
import { still } from '@/lib/site';
import s from '@/components/pages/overview/styles';

// Holds the CSS animations inside at their start state until the block scrolls into view.
// The server HTML is "running", so without scripting everything is simply complete.
export default function ScrollRunLite({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || still()) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.8) return;
    el.setAttribute('data-run', '0');
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.setAttribute('data-run', '1');
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      el.setAttribute('data-run', '1');
    };
  }, []);
  return (
    <div ref={ref} data-run="1" className={s.run}>
      {children}
    </div>
  );
}
