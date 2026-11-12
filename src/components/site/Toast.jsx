'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { tEnter, tMove } from '@/lib/motion';

// toast('Copied #4093EC') from anywhere in the browser.
export function toast(message) {
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('site-toast', { detail: String(message) }));
}

let seq = 0;

export default function Toast() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const timers = new Set();
    const on = (e) => {
      const id = ++seq;
      setItems((list) => [...list.slice(-2), { id, text: e.detail }]);
      const t = setTimeout(() => {
        setItems((list) => list.filter((i) => i.id !== id));
        timers.delete(t);
      }, 2200);
      timers.add(t);
    };
    window.addEventListener('site-toast', on);
    return () => {
      window.removeEventListener('site-toast', on);
      timers.forEach(clearTimeout);
    };
  }, []);
  return (
    <div className="site-toasts" id="site-toasts" role="status" aria-live="polite">
      <AnimatePresence>
        {items.map((i) => (
          <motion.div
            key={i.id}
            className="site-toast"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0, transition: tEnter }}
            exit={{ opacity: 0, x: 24, transition: tMove }}
          >
            {i.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
