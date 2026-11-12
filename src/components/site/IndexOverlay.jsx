'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { groups, pageIndex, href } from '@/lib/pages';
import { tEnter, listV, itemV, dur, ease } from '@/lib/motion';
import Icon from './Icon';

// Full-screen index of every page, by group. Opened from the dock; Escape closes it.
export default function IndexOverlay({ current, onClose }) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  });
  useEffect(() => {
    const el = ref.current;
    const active = el.querySelector('[aria-current="page"]') || el.querySelector('a');
    if (active) active.focus({ preventScroll: true });
    const onKey = (e) => {
      if (e.key === 'Escape') closeRef.current();
      if (e.key !== 'Tab') return;
      const items = [...el.querySelectorAll('a,button')];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      className="site-index"
      id="site-index"
      role="dialog"
      aria-modal="true"
      aria-label="Index of pages"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: tEnter }}
      exit={{ opacity: 0, transition: { duration: dur.d2, ease: ease.inOut } }}
    >
      <div className="site-index-head">
        <p className="row" style={{ gap: 14 }}>
          <span className="lp-logo" aria-hidden="true">
            <svg viewBox="0 0 100 100" width="26" height="26"><use href="#site-mark" /></svg>
          </span>
          <span className="t-h3">Tectra brand system</span>
        </p>
        <button type="button" className="btn btn-dark btn-icon" onClick={onClose} aria-label="Close the index">
          <Icon name="close" />
        </button>
      </div>
      <motion.div className="site-index-grid" variants={listV} initial="hidden" animate="show">
        {groups.map((g) => (
          <motion.nav key={g.name} className="site-index-group" aria-label={g.name} variants={itemV}>
            <h2>{g.name}</h2>
            {g.pages.map((p) => (
              <Link key={p.id} href={href(p.id)} onClick={onClose} aria-current={p.id === current ? 'page' : undefined}>
                <span>{String(pageIndex(p.id) + 1).padStart(2, '0')}</span>
                <span>{p.title}</span>
              </Link>
            ))}
          </motion.nav>
        ))}
      </motion.div>
    </motion.div>
  );
}
