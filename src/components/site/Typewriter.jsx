'use client';

import { useEffect, useRef } from 'react';
import { still } from '@/lib/site';

// <Typewriter text="Smart Construction" /> types the text when it scrolls into view. speed is ms per character.
// The full text is in the server HTML and is always the final state.
export default function Typewriter({ text, speed = 28, className, as: Tag = 'span', onDone }) {
  const ref = useRef(null);
  const doneRef = useRef(onDone);
  useEffect(() => {
    doneRef.current = onDone;
  });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const done = () => doneRef.current && doneRef.current();
    if (still()) {
      done();
      return;
    }
    let i = 0;
    let timer = 0;
    let finished = false;
    const finish = () => {
      finished = true;
      el.textContent = text;
      el.classList.remove('tick-cursor');
      done();
    };
    const step = () => {
      i += 1;
      el.textContent = text.slice(0, i);
      if (i < text.length) timer = setTimeout(step, speed);
      else finish();
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          el.textContent = '';
          el.classList.add('tick-cursor');
          timer = setTimeout(step, speed);
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
      if (!finished) {
        el.textContent = text;
        el.classList.remove('tick-cursor');
      }
    };
  }, [text, speed]);
  return <Tag ref={ref} className={className}>{text}</Tag>;
}
