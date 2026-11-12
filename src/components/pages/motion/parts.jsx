'use client';

import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { still } from '@/lib/site';

// Replay helper. `k` changes on every replay and when the demo first scrolls into view, so a keyed
// motion element restarts from its start state. Before that it is drawn at its final value.
export function usePlay() {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' });
  return [ref, { n, started: n > 0 || inView, k: `${n}-${inView ? 1 : 0}`, play: () => setN((v) => v + 1) }];
}

// initial state for a keyed motion element: the start state once running, otherwise (or when motion is
// reduced) the final state straight away.
export function go(started, start) {
  return started && !still() ? start : false;
}

// Reduced motion: jump to the end state.
export function tx(transition) {
  return still() ? { duration: 0 } : transition;
}
