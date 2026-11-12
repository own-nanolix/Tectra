'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import { IsoSiteG } from '@/components/art/KeyArt';
import Icon from '@/components/site/Icon';
import Reveal from '@/components/site/Reveal';
import { FAQ } from '@/lib/brand';
import s from './lp-mobile.module.css';

// FAQ accordion. Row 3 (mobile access) opens first; one row open at a time; real buttons.
export default function Faq() {
  const [open, setOpen] = useState(2);
  return (
    <section className={`wrap ${s.faq}`} aria-labelledby="lp-mobile-faq-h">
      <h2 id="lp-mobile-faq-h" className="t-display">{FAQ.heading}</h2>
      <div className={s.faqGrid}>
        <ul className={s.faqList}>
          {FAQ.rows.map((q, i) => {
            const on = open === i;
            return (
              <li key={q} className={s.faqItem}>
                <h3>
                  <button type="button" className={s.faqBtn} aria-expanded={on} aria-controls={`lp-mobile-faq-a${i}`} id={`lp-mobile-faq-q${i}`} onClick={() => setOpen(on ? -1 : i)}>
                    <span className="t-label">{`0${i + 1}`}</span>
                    <span className="t-h3">{q}</span>
                    <span className={s.faqArrow} aria-hidden="true">
                      <Icon name="chevron-down" size={22} />
                    </span>
                  </button>
                </h3>
                <div id={`lp-mobile-faq-a${i}`} role="region" aria-labelledby={`lp-mobile-faq-q${i}`} className={s.faqPanel} data-open={on}>
                  <div>
                    <p className="t-body muted">{FAQ.answers[i]}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <Reveal delay={100} className={s.faqTile}>
          <Art viewBox="0 0 400 300" title="Isometric site drawing on blue" exportName="lp-mobile-faq-tile" decorative>
            <rect width="400" height="300" rx="6" fill="#53A2F7" />
            <IsoSiteG x={20} y={30} scale={0.66} tone="blue" seed={31} pins={['wing']} />
          </Art>
        </Reveal>
      </div>
    </section>
  );
}
