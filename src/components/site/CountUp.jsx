'use client';

import { useEffect, useRef } from 'react';
import { still } from '@/lib/site';
import { dur } from '@/lib/motion';

// <CountUp value="250,395 cu yd" /> counts the first number in the text up from zero when it scrolls into view.
// The server HTML already holds the final text, and the count always lands on it.
export default function CountUp({ value, duration = dur.d4 * 1.4, className, as: Tag = 'span' }) {
  const ref = useRef(null);
  const text = String(value);
  useEffect(() => {
    const el = ref.current;
    const m = text.match(/\d[\d,]*(\.\d+)?/);
    if (!el || !m || still()) return;
    const raw = m[0];
    const target = parseFloat(raw.replace(/,/g, ''));
    const decimals = (raw.split('.')[1] || '').length;
    const grouped = raw.includes(',');
    const pad = /^0\d/.test(raw) ? raw.split('.')[0].length : 0;
    const show = (v) => {
      let s = v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: grouped });
      if (pad) s = s.padStart(pad, '0');
      el.textContent = text.replace(raw, s);
    };
    let frame = 0;
    let start = 0;
    let done = false;
    const run = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / (duration * 1000));
      show(target * (1 - Math.pow(1 - p, 4)));
      if (p < 1) frame = requestAnimationFrame(run);
      else {
        el.textContent = text;
        done = true;
      }
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          show(0);
          frame = requestAnimationFrame(run);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      if (!done) el.textContent = text;
    };
  }, [text, duration]);
  return <Tag ref={ref} className={className}>{text}</Tag>;
}
