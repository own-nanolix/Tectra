'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Phone } from '@/components/ui/Devices';
import Tabs from '@/components/ui/Tabs';
import Button from '@/components/ui/Button';
import Reveal from '@/components/site/Reveal';
import { tEnter, tMove } from '@/lib/motion';
import { SCREENS, Artboard } from './Screens';
import { Scaled } from './Parts';
import { SpecStatus, SpecNav, SpecTabBar, SpecListRow, SpecMenuRow, SpecCard, SpecStat, SpecInput, SpecAccordion, SpecSheet, SpecTicks, SpecMarkers } from './Spec';
import s from './mobile-b.module.css';

const spec = (title, note, node, wide) => (
  <div className={`${s.spec} ${wide ? s.specWide : ''}`} key={title}>
    <h3>{title}</h3>{node}<p>{note}</p>
  </div>
);

const BODIES = {
  bars: (
    <div className={`${s.setPanel} ${s.specGrid}`}>
      {spec('Status bar', 'Ink on grey, navy on blue.', <SpecStatus />)}
      {spec('Nav', 'Logo tile left, square icon buttons right; back arrow on detail screens.', <SpecNav />)}
      {spec('Tab bar', 'Five icons; the active tile slides in yellow.', <SpecTabBar />, true)}
    </div>
  ),
  rows: (
    <div className={`${s.setPanel} ${s.specGrid}`}>
      {spec('List row', 'Default, pressed and selected.', <SpecListRow />)}
      {spec('Menu row', 'With a chevron, or with a switch.', <SpecMenuRow />)}
      {spec('Card', 'Title Medium, arrow top right; open turns the arrow and shows the figure and arc.', <SpecCard />)}
      {spec('Stat card', 'Trend with yellow up or red down triangle, Light figure, corner arc.', <SpecStat />)}
      {spec('Tick-bar chart', 'Range band and handle with the designer’s axis order.', <SpecTicks />, true)}
    </div>
  ),
  fields: (
    <div className={`${s.setPanel} ${s.specGrid}`}>
      {spec('Input', 'Rest, focus and filled.', <SpecInput />)}
      {spec('Accordion', 'Closed and open, answer from the FAQ.', <SpecAccordion />)}
      {spec('Sheet', 'Rises from the bottom with a drag handle.', <SpecSheet />)}
      {spec('Cut and Fill markers', 'Yellow cut, blue fill, strongest first.', <SpecMarkers />)}
    </div>
  ),
};

// Every set stays in the page (hidden when not selected), so all specimens remain exportable.
const Sets = ({ show }) => Object.entries(BODIES).map(([id, body]) => <div key={id} hidden={id !== show}>{body}</div>);
const SETS = [['bars', 'Bars'], ['rows', 'Rows and cards'], ['fields', 'Fields and sheets']].map(([id, label]) => ({ id, label, content: <Sets show={id} /> }));

const slide = {
  enter: (d) => ({ opacity: 0, x: d * 48 }),
  show: { opacity: 1, x: 0, transition: tEnter },
  exit: (d) => ({ opacity: 0, x: d * -48, transition: tMove }),
};

export default function Workbench() {
  const [n, setN] = useState(10);
  const [dir, setDir] = useState(1);
  const go = (m) => {
    const t = Math.min(18, Math.max(10, m));
    if (t === n) return;
    setDir(t > n ? 1 : -1);
    setN(t);
  };
  const onKey = (e) => {
    if (e.target.closest && e.target.closest('input, textarea, [role="switch"], [role="group"][aria-label="Tab bar"]')) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); go(n + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(n - 1); }
  };
  const cur = SCREENS[n - 10];
  return (
    <>
      <div className={s.bench} id="mobile-b-stage">
        <div className={s.phoneCol} onKeyDown={onKey}>
          <div className={s.phoneWrap} tabIndex={0} role="group" aria-label={`Live phone, screen ${n} of 18: ${cur.name}. Left and Right arrow keys change screen.`}>
            <Phone screen="mobile-b-live" exportName="mobile-b-phone-frame">
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <motion.div key={n} className={s.layer} custom={dir} variants={slide} initial="enter" animate="show" exit="exit">
                  <Scaled><Artboard n={n} idp={`mobile-b-live-${n}`} go={go} /></Scaled>
                </motion.div>
              </AnimatePresence>
            </Phone>
          </div>
          <div className={s.ctrl}>
            <Button variant="dark" size="sm" icon="chevron-left" label="Previous screen" onClick={() => go(n - 1)} disabled={n === 10} />
            <output aria-live="polite">{n} / 18</output>
            <Button variant="dark" size="sm" icon="chevron-right" label="Next screen" onClick={() => go(n + 1)} disabled={n === 18} />
          </div>
          <ol className={s.numList} aria-label="Screens 10 to 18">
            {SCREENS.map((x) => (
              <li key={x.n}>
                <button type="button" className={s.numBtn} aria-current={x.n === n} onClick={() => go(x.n)}><b>{x.n}</b>{x.name}</button>
              </li>
            ))}
          </ol>
        </div>
        <Tabs id="mobile-b-sets" label="Mobile component sets" tabs={SETS} tone="blue" />
      </div>

      <Reveal>
        <h2 className="t-h2" style={{ margin: 'clamp(56px, 8vw, 112px) 0 24px' }}>All nine together</h2>
        <div className={s.sheetGrid}>
          {SCREENS.map((x) => (
            <div key={x.n} className={s.cell}>
              <div className={s.shot} inert aria-hidden="true">
                <Scaled><Artboard n={x.n} idp={`mobile-b-sheet-${x.n}`} dataScreen /></Scaled>
              </div>
              <button type="button" className={s.cellBtn} aria-pressed={x.n === n} aria-label={`Show screen ${x.n}, ${x.name}, in the phone`}
                onClick={() => { go(x.n); document.getElementById('mobile-b-stage')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }} />
              <div className={s.cap}><b>{x.n}</b>{x.name}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </>
  );
}
