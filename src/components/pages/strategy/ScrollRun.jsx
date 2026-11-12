'use client';

import { useEffect, useRef } from 'react';
import { still } from '@/lib/site';
import s from '@/components/pages/strategy/styles';

// Holds the CSS animations of a chart at their start state until it scrolls into view, then lets them play.
// The server HTML is "running", so with scripting off or reduced motion everything is simply complete.
// The animations themselves are CSS keyframes that end on the base style, so the artwork is always whole.
export default function ScrollRun({ children, className = '', as: Tag = 'div', ...rest }) {
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
    <Tag ref={ref} data-run="1" className={`${s.run} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
