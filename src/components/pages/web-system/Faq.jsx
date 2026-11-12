'use client';

import { useState } from 'react';
import Icon from '@/components/site/Icon';
import { FAQ } from '@/lib/brand';
import s from './web-system.module.css';

// The FAQ rows as a working accordion: one button per row (aria-expanded), one panel per answer.
export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <ul className={s.faq}>
      {FAQ.rows.map((q, i) => {
        const isOpen = open === i;
        return (
          <li key={q} className={s.faqItem}>
            <h3>
              <button
                type="button"
                id={`web-system-faq-btn-${i}`}
                className={s.faqBtn}
                aria-expanded={isOpen}
                aria-controls={`web-system-faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className={s.faqNum}>{String(i + 1).padStart(2, '0')}</span>
                <span className={s.faqText}>{q}</span>
                <Icon name="arrow-right" size={22} className={s.faqArrow} />
              </button>
            </h3>
            <div
              id={`web-system-faq-panel-${i}`}
              role="region"
              aria-labelledby={`web-system-faq-btn-${i}`}
              className={s.faqPanel}
              data-open={isOpen}
              inert={!isOpen}
            >
              <div className={s.faqPanelIn}>
                <p className="t-body muted">{FAQ.answers[i]}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
