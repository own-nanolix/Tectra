'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import { IsoSiteG } from '@/components/art/KeyArt';
import Icon from '@/components/site/Icon';
import Reveal from '@/components/site/Reveal';
import { FAQ } from '@/lib/brand';
import s from './lp-mobile.module.css';

// FAQ as on the case study's second artboard: numbered rows with arrows on the left; the blue illustration tile
// and the open answer (question repeated, then the answer) on the right. Row 3 (mobile access) is open first.
export default function Faq() {
  const [open, setOpen] = useState(2);
  return (
    <section className={`wrap ${s.faq}`} aria-labelledby="lp-mobile-faq-h">
      <h2 id="lp-mobile-faq-h" className="t-display t-center">{FAQ.heading}</h2>
      <div className={s.faqGrid}>
        <ul className={s.faqList}>
          {FAQ.rows.map((q, i) => {
            const on = open === i;
            return (
              <li key={q} className={s.faqItem}>
                <button type="button" className={s.faqBtn} aria-pressed={on} aria-controls="lp-mobile-faq-answer" onClick={() => setOpen(i)}>
                  <span className="t-label">{`0${i + 1}`}</span>
                  <span className={s.faqQ}>{q}</span>
                  <span className={s.faqArrow} aria-hidden="true">
                    <Icon name="arrow-right" size={20} />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className={s.faqSide}>
          <Reveal delay={100} className={s.faqTile}>
            <Art viewBox="0 0 400 170" title="Isometric site drawing on blue" exportName="lp-mobile-faq-tile" decorative>
              <rect width="400" height="170" rx="6" fill="#53A2F7" />
              <IsoSiteG x={70} y={-30} scale={0.52} tone="blue" seed={31} />
            </Art>
          </Reveal>
          <div id="lp-mobile-faq-answer" className={s.faqAnswer} role="region" aria-live="polite" aria-label="Answer">
            <div key={open} className={s.faqAnswerIn}>
              <h3 className="t-h3">{FAQ.rows[open]}</h3>
              <p className="t-body muted">{FAQ.answers[open]}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
