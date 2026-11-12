'use client';

import { useRef, useState } from 'react';
import Art from '@/components/art/Art';
import { CraneG, TreesG } from '@/components/art/KeyArt';
import Icon from '@/components/site/Icon';
import Reveal from '@/components/site/Reveal';
import { FAQ } from '@/lib/brand';
import s from './lp-pricing.module.css';

// FAQ accordion: all five rows, the first open. Up and down arrows move between rows.
export default function Faq() {
  const [open, setOpen] = useState(0);
  const list = useRef(null);
  const onKey = (e) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    const btns = [...list.current.querySelectorAll('button')];
    const at = btns.indexOf(document.activeElement);
    if (at < 0) return;
    e.preventDefault();
    btns[(at + (e.key === 'ArrowDown' ? 1 : -1) + btns.length) % btns.length].focus();
  };
  return (
    <section className={`wrap ${s.faq}`} aria-labelledby="lp-pricing-faq-h">
      <Reveal className={s.faqSide}>
        <h2 id="lp-pricing-faq-h" className="t-h1 t-balance">{FAQ.heading}</h2>
        <Art viewBox="0 0 420 340" title="Tower crane and trees on blue" exportName="lp-pricing-faq-tile" decorative className={s.faqArt}>
          <rect width="420" height="340" rx="6" fill="#53A2F7" />
          <TreesG x={0} y={20} w={420} h={320} count={8} tone="blue" seed={44} clear={[130, 20, 160, 280]} minSize={60} maxSize={120} />
          <CraneG x={110} y={10} scale={0.98} color="#FFB83D" dark="#B97A08" />
        </Art>
      </Reveal>
      <ul className={s.faqList} ref={list} onKeyDown={onKey}>
        {FAQ.rows.map((q, i) => {
          const on = open === i;
          return (
            <li key={q} className={s.faqItem} data-open={on}>
              <h3>
                <button type="button" className={s.faqBtn} id={`lp-pricing-faq-q${i}`} aria-expanded={on} aria-controls={`lp-pricing-faq-a${i}`} onClick={() => setOpen(on ? -1 : i)}>
                  <span className={`t-label ${s.faqNum}`}>{`0${i + 1}`}</span>
                  <span className="t-h3">{q}</span>
                  <span className={s.faqArrow} aria-hidden="true">
                    <Icon name="arrow-up-right" size={22} />
                  </span>
                </button>
              </h3>
              <div id={`lp-pricing-faq-a${i}`} role="region" aria-labelledby={`lp-pricing-faq-q${i}`} className={s.faqPanel} data-open={on}>
                <div>
                  <p className="t-body muted">{FAQ.answers[i]}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
