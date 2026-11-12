'use client';

import { useRef, useState } from 'react';
import Art from '@/components/art/Art';
import { IsoSiteG } from '@/components/art/KeyArt';
import Icon from '@/components/site/Icon';
import Reveal from '@/components/site/Reveal';
import { FAQ } from '@/lib/brand';
import s from './s';

export default function Faq() {
  const [open, setOpen] = useState(0);
  const refs = useRef([]);
  const key = (e, i) => {
    const n = FAQ.rows.length;
    const go = e.key === 'ArrowDown' ? (i + 1) % n : e.key === 'ArrowUp' ? (i + n - 1) % n : null;
    if (go === null) return;
    e.preventDefault();
    refs.current[go]?.focus();
  };
  return (
    <section className={`wrap ${s.section}`} aria-labelledby="lp-home-faq-h">
      <Reveal>
        <h2 id="lp-home-faq-h" className={`${s.h2} ${s.h2Sm}`}>{FAQ.heading}</h2>
      </Reveal>
      <div className={s.faq}>
        <Reveal as="ul" className={s.faqList}>
          {FAQ.rows.map((q, i) => (
            <li key={q}>
              <button
                type="button"
                ref={(el) => { refs.current[i] = el; }}
                className={s.faqRow}
                aria-pressed={open === i}
                aria-controls="lp-home-faq-answer"
                onClick={() => setOpen(i)}
                onKeyDown={(e) => key(e, i)}
              >
                <span className={s.faqNum}>{String(i + 1).padStart(2, '0')}</span>
                <span className={s.faqQ}>{q}</span>
                <Icon name="arrow-right" size={20} className={s.faqArrow} />
              </button>
            </li>
          ))}
        </Reveal>
        <Reveal delay={120} className={s.faqSide}>
          <Art viewBox="0 0 560 236" title="Isometric site building with line-drawn trees" exportName="lp-home-faq-illustration" className={s.faqArt} preserveAspectRatio="xMidYMid slice">
            <defs>
              <clipPath id="lp-home-faq-clip">
                <rect width="560" height="236" rx="6" />
              </clipPath>
              <linearGradient id="lp-home-faq-bg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#4C9BF3" />
                <stop offset="1" stopColor="#3C86E6" />
              </linearGradient>
            </defs>
            <g clipPath="url(#lp-home-faq-clip)">
              <rect width="560" height="236" fill="url(#lp-home-faq-bg)" />
              <IsoSiteG x={-6} y={-70} scale={1.08} tone="blue" seed={5} />
            </g>
          </Art>
          <div id="lp-home-faq-answer" className={s.answer} aria-live="polite" key={open}>
            <h3 className={s.answerQ}>{FAQ.rows[open]}</h3>
            <p className={s.answerText}>{FAQ.answers[open]}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
