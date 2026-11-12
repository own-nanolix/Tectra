'use client';

import { useEffect, useRef, useState } from 'react';
import { still } from '@/lib/site';

// Eases a number towards `target` (ease-out quart). It always lands exactly on the newest target,
// also when interrupted; with reduced motion it jumps.
export function useTween(target, ms = 760) {
  const [value, setValue] = useState(target);
  const cur = useRef(target);
  useEffect(() => {
    const from = cur.current;
    if (from === target) return undefined;
    let raf = 0;
    if (still()) {
      raf = requestAnimationFrame(() => {
        cur.current = target;
        setValue(target);
      });
      return () => cancelAnimationFrame(raf);
    }
    const t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / ms);
      const e = 1 - Math.pow(1 - k, 4);
      const v = k >= 1 ? target : from + (target - from) * e;
      cur.current = v;
      setValue(v);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return value;
}
