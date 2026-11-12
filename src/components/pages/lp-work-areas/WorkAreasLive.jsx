'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import { IsoSiteG } from '@/components/art/KeyArt';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import { Hl } from '@/components/ui/Card';
import CountUp from '@/components/site/CountUp';
import Reveal from '@/components/site/Reveal';
import { HEADINGS, HERO, NAV, SOLUTION } from '@/lib/brand';
import { PINS, VIEW, pinAt } from './data';
import AreaCards from './AreaCards';
import s from './lp-work-areas.module.css';

// Hero (the site with its pins) and the 3-up of area cards share the selected pin.
export default function WorkAreasLive({ nav }) {
  const [sel, setSel] = useState('komatsu');
  const cur = PINS.find((p) => p.id === sel);
  return (
    <>
      <section className={`field ${s.hero}`} aria-labelledby="lp-work-areas-h1">
        {nav}
        <div className={s.heroGrid}>
          <div className={s.textCard}>
            <Chip size="sm">{NAV[3]}</Chip>
            <h1 id="lp-work-areas-h1" tabIndex={-1} className="t-h1 t-balance">
              <Hl text={HEADINGS.problem.text} hl={HEADINGS.problem.hl} />
            </h1>
            <p className="t-lead">{SOLUTION}</p>
            <div className="row" style={{ gap: 12 }}>
              <Button href="/dashboard/">{HERO.cta[0]}</Button>
              <Button href="/lp-home/" variant="sky">{HERO.cta[1]}</Button>
            </div>
          </div>

          <div className={s.siteWrap}>
            <div className={s.site} style={{ aspectRatio: `${VIEW.w} / ${VIEW.h}` }}>
              <Art viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`} title="Isometric site with the work areas" exportName="lp-work-areas-site">
                <IsoSiteG tone="blue" seed={7} className="fade-in" />
              </Art>
              <div role="group" aria-label="Work areas on the site" className={s.pins}>
                {PINS.map((p, i) => {
                  const pos = pinAt(p.site);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      className={`${s.pin} ${sel === p.id ? s.pinOn : ''}`}
                      style={{ left: `${pos.left}%`, top: `${pos.top}%`, '--i': i }}
                      aria-pressed={sel === p.id}
                      aria-label={p.name}
                      onClick={() => setSel(p.id)}
                    >
                      <span className={s.pinDot} aria-hidden="true" />
                      <span className={s.pinTip} aria-hidden="true">{p.name}</span>
                    </button>
                  );
                })}
              </div>
              <div className={`glass ${s.workCard}`} aria-live="polite" key={cur.id}>
                <p className={s.workName}>{cur.name}{cur.id === 'komatsu' || cur.id === 'cutfill' ? ' →' : ''}</p>
                {cur.sub && <p className={s.workSub}>{cur.sub}</p>}
                <p className={s.workFigure}><CountUp value={cur.value} /></p>
                {cur.trend && <p className={s.workTrend}><span className={`trend trend-${cur.dir}`}>{cur.trend}</span>{cur.legend && <span className={s.workSub}> {cur.legend}</span>}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`wrap ${s.band}`} aria-labelledby="lp-work-areas-areas-h">
        <Reveal className={s.headRow}>
          <div className={s.chipRow} role="group" aria-label="Work areas">
            {PINS.map((p) => (
              <Chip key={p.id} pressed={sel === p.id} onClick={() => setSel(p.id)}>{p.name}</Chip>
            ))}
          </div>
          <h2 id="lp-work-areas-areas-h" className="t-display"><span className="hl" key={sel}>{cur.name}</span></h2>
        </Reveal>
        <AreaCards sel={sel} />
      </section>
    </>
  );
}
