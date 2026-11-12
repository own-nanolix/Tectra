'use client';

import { useEffect, useRef } from 'react';

let lastPath = null;

// Page-enter transition (CSS, shared tokens; no exit animation across routes).
// After each navigation, focus moves to the page's <h1>.
export default function Template({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    const here = window.location.pathname;
    if (lastPath === null || lastPath === here) { lastPath = here; return; } // first load (and dev double-run): leave focus alone
    lastPath = here;
    const h1 = ref.current && ref.current.querySelector('h1');
    if (h1) {
      if (!h1.hasAttribute('tabindex')) h1.setAttribute('tabindex', '-1');
      h1.focus({ preventScroll: true });
    }
    window.scrollTo(0, 0);
  }, []);
  return <div ref={ref} className="slide-up">{children}</div>;
}
