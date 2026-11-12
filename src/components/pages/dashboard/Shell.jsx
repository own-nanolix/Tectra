'use client';

// The working shell: a tab switcher over eight 1600 x 1000 artboards, scaled to fit with a CSS transform.
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { tMove } from '@/lib/motion';
import { SCREENS } from './data';
import Overview from './Overview';
import { ScreenA, ScreenB } from './ScreensAB';
import { ScreenC, ScreenD, ScreenE } from './ScreensCDE';
import { CutFillScreen, WorkAreasScreen } from './ScreensInner';
import s from './dashboard.module.css';

const VIEWS = { overview: Overview, a: ScreenA, b: ScreenB, c: ScreenC, d: ScreenD, e: ScreenE, cutfill: CutFillScreen, work: WorkAreasScreen };

function Fit({ children }) {
  const ref = useRef(null);
  const [k, setK] = useState(0.3);
  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setK(e.contentRect.width / 1600));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className={s.view} style={{ height: 1000 * k }}>
      <div className={s.scaler} style={{ transform: `scale(${k})` }}>{children}</div>
    </div>
  );
}

export default function Shell() {
  const [cur, setCur] = useState('overview');
  const refs = useRef({});
  const View = VIEWS[cur];
  const onKey = (e) => {
    const i = SCREENS.findIndex((t) => t.id === cur);
    let n = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % SCREENS.length;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i - 1 + SCREENS.length) % SCREENS.length;
    if (e.key === 'Home') n = 0;
    if (e.key === 'End') n = SCREENS.length - 1;
    if (n < 0) return;
    e.preventDefault();
    setCur(SCREENS[n].id);
    refs.current[SCREENS[n].id]?.focus();
  };
  return (
    <div className={s.shell}>
      <div className="tabs tabs-blue" role="tablist" aria-label="Dashboard screens" onKeyDown={onKey}>
        {SCREENS.map((t) => (
          <button key={t.id} ref={(el) => { refs.current[t.id] = el; }} type="button" role="tab" id={`dashboard-shell-tab-${t.id}`} className="tab"
            aria-selected={t.id === cur} aria-controls="dashboard-shell-panel" tabIndex={t.id === cur ? 0 : -1} onClick={() => setCur(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id="dashboard-shell-panel" aria-labelledby={`dashboard-shell-tab-${cur}`} tabIndex={0} className={s.mon}>
        <Fit>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={cur} className={s.swap} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={tMove}>
              <View open={setCur} />
            </motion.div>
          </AnimatePresence>
        </Fit>
      </div>
      <div className={s.stand} aria-hidden="true" />
    </div>
  );
}
