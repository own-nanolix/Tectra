'use client';

import { useEffect, useRef } from 'react';
import { still } from '@/lib/site';

// Scroll reveal: opacity and transform only. <Reveal delay={120} from="left">...</Reveal>
// Content is visible in the server HTML; it is hidden only if it starts below the fold, then shown on scroll.
export default function Reveal({ children, delay = 0, from, as: Tag = 'div', className, style, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || still()) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return; // already in view: leave it shown
    el.setAttribute('data-reveal', 'pending');
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.setAttribute('data-reveal', 'shown');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      el.setAttribute('data-reveal', 'shown');
    };
  }, []);
  return (
    <Tag ref={ref} data-reveal="shown" data-from={from} className={className} style={{ ...style, '--reveal-delay': `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}
