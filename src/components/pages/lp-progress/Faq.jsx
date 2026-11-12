'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import { IsoSiteG } from '@/components/art/KeyArt';
import Icon from '@/components/site/Icon';
import Reveal from '@/components/site/Reveal';
import { Hl } from '@/components/ui/Card';
import { FAQ } from '@/lib/brand';
import s from './styles';

const ROWS = [1, 2]; // rows 2 and 3 of the case study

// Section 6: the two FAQ rows about progress and mobile access, as a live accordion.
export default function Faq() {
  const [open, setOpen] = useState(1);
  return (
    <section className={s.band} aria-labelledby="lp-progress-faq-h">
      <div className="wrap-narrow">
        <Reveal className={s.head}>
          <h2 id="lp-progress-faq-h" className="t-display t-balance t-center"><Hl text={FAQ.heading} hl="Questions" /></h2>
        </Reveal>
        <div className={s.faq}>
          <Reveal>
            <ul className={s.faqList}>
              {ROWS.map((r) => (
                <li key={r} className={s.faqItem} data-open={open === r}>
                  <h3>
                    <button type="button" className={s.faqBtn} aria-expanded={open === r} aria-controls={`lp-progress-faq-a${r}`} id={`lp-progress-faq-q${r}`} onClick={() => setOpen(open === r ? null : r)}>
                      <span className={s.faqNum}>{String(r + 1).padStart(2, '0')}</span>
                      <span className="t-h3">{FAQ.rows[r]}</span>
                      <Icon name="chevron-down" size={22} />
                    </button>
                  </h3>
                  <div className={s.faqPanel} id={`lp-progress-faq-a${r}`} role="region" aria-labelledby={`lp-progress-faq-q${r}`}>
                    <p className="t-lead muted">{FAQ.answers[r]}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80} from="scale">
            <div className={`tile ${s.faqTile}`}>
              <Art viewBox="0 0 560 400" title="The site drawn in grey with blue roofs" exportName="lp-progress-faq-site">
                <IsoSiteG tone="paper" pins={['ridge']} trees={false} />
              </Art>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
