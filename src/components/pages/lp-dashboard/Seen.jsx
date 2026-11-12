'use client';

import { useEffect, useRef } from 'react';
import { still } from '@/lib/site';
import s from './styles';

// Holds the CSS draw / rise / pop animations of everything inside it until it scrolls into view,
// so a gauge below the fold sweeps when the visitor arrives. With reduced motion or export mode it is shown at once.
export default function Seen({ children, className = '', as: Tag = 'div', ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (still()) {
      el.dataset.seen = 'true';
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.dataset.seen = 'true';
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      el.dataset.seen = 'true';
    };
  }, []);
  return (
    <Tag ref={ref} data-seen="false" className={`${s.seen} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
