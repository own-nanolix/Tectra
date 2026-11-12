'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import { MonitorG, ScreenAppG } from '@/components/art/Devices';
import Button from '@/components/ui/Button';
import { Hl } from '@/components/ui/Card';
import Icon from '@/components/site/Icon';
import Reveal from '@/components/site/Reveal';
import { FEATURES } from '@/lib/brand';
import s from './lp-work-areas.module.css';

// "Key Features for Efficient Project Management": the monitor on a blue tile and three numbered rows that open one at a time.
export default function Features() {
  const [open, setOpen] = useState(0);
  return (
    <section className={`wrap ${s.band}`} aria-labelledby="lp-work-areas-feat-h">
      <Reveal className={s.headRow}>
        <h2 id="lp-work-areas-feat-h" className="t-display t-balance">
          <Hl text={FEATURES.heading} hl={FEATURES.hl} />
        </h2>
        <p className="t-lead">{FEATURES.sub}</p>
      </Reveal>
      <div className={s.feat}>
        <Reveal className={`field ${s.featTile}`}>
          <Art viewBox="0 0 800 560" title="Monitor showing the desktop app" exportName="lp-work-areas-monitor" className={s.featArt}>
            <MonitorG idp="lp-work-areas-fm" x={60} y={30} w={680}>
              <ScreenAppG idp="lp-work-areas-fa" />
            </MonitorG>
          </Art>
          <Button href="/lp-dashboard/" variant="white" iconRight="arrow-right">{FEATURES.demo}</Button>
        </Reveal>
        <div className={s.featList}>
          {FEATURES.rows.map(([title, text], i) => {
            const on = open === i;
            return (
              <Reveal key={title} delay={i * 70} className={`${s.featRow} ${on ? s.featOn : ''}`}>
                <h3 className="t-h3">
                  <button type="button" className={s.featBtn} aria-expanded={on} aria-controls={`lp-work-areas-feat-p${i}`} onClick={() => setOpen(i)}>
                    <span className={s.featNum}>{i + 1}</span>
                    <span className={s.featTitle}>{title}</span>
                    <Icon name="chevron-down" size={22} />
                  </button>
                </h3>
                <div className={s.featPanel} id={`lp-work-areas-feat-p${i}`} role="region" aria-label={title} hidden={!on}>
                  <p className="t-lead">{text}</p>
                </div>
              </Reveal>
            );
          })}
          <Reveal delay={240}>
            <p className="t-body muted">{FEATURES.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
