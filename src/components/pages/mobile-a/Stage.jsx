'use client';
// The live phone that steps through nine screens, the numbered list, the caption card and the row of all nine.
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '@/components/site/Icon';
import { Phone } from '@/components/ui/Devices';
import { IsoSiteG } from '@/components/art/KeyArt';
import { MOBILE_SCREENS } from '@/lib/brand';
import { tMove, tEnter, listV, itemV } from '@/lib/motion';
import { Screen1, Screen2, Screen3, ScreenCtx } from './ScreensA';
import { Screen4, Screen5, Screen6, Screen7, Screen8, Screen9 } from './ScreensB';
import s from './mobile-a.module.css';

const TITLES = [
  ...MOBILE_SCREENS.map((m) => m.title),
  '2D Cross Section Z (ft)', 'Timeline', 'Work areas', 'Details', 'Notes', 'Material',
];
const SCREENS = [Screen1, Screen2, Screen3, Screen4, Screen5, Screen6, Screen7, Screen8, Screen9];
const N = SCREENS.length;
const pad = (n) => String(n + 1).padStart(2, '0');

// Sets --k (screen width / 390) on its box, so the 390 x 844 artboard inside scales to the phone.
function Scaled({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const ro = new ResizeObserver(([e]) => el.style.setProperty('--k', String(e.contentRect.width / 390)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return <div ref={ref} className={s.fit}>{children}</div>;
}

const slideV = {
  in: (d) => ({ x: d * 36, opacity: 0 }),
  mid: { x: 0, opacity: 1 },
  out: (d) => ({ x: d * -36, opacity: 0 }),
};

export default function Stage() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const go = (n) => {
    const to = (n + N) % N;
    setDir(to >= i ? 1 : -1);
    setI(to);
  };
  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
  };
  const Live = SCREENS[i];
  const cap = MOBILE_SCREENS[i];

  return (
    <>
      <div className="wrap"><div className={s.stage} onKeyDown={onKeyDown}>
        <div className={s.listCol}>
          <h2 className="t-caps muted" id="mobile-a-list-h">Screens</h2>
          <ol className={s.list} aria-labelledby="mobile-a-list-h">
            {TITLES.map((t, n) => (
              <li key={t}>
                <button type="button" className={s.listBtn} aria-current={n === i} onClick={() => go(n)}>
                  <b>{pad(n)}</b><span>{t}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className={s.phoneCol}>
          <div className={s.phone} tabIndex={0} role="group" aria-roledescription="carousel" aria-label="Live phone: use Left and Right arrow keys to change screen">
            <Phone exportName="mobile-a-phone-frame">
              <Scaled>
                <AnimatePresence initial={false} custom={dir} mode="popLayout">
                  <motion.div key={i} className={s.slide} custom={dir} variants={slideV} initial="in" animate="mid" exit="out" transition={tMove}>
                    <ScreenCtx.Provider value={{ name: `mobile-a-${pad(i)}`, live: true }}>
                      <Live p={`mobile-a-live-${i}`} live />
                    </ScreenCtx.Provider>
                  </motion.div>
                </AnimatePresence>
              </Scaled>
            </Phone>
          </div>
          <div className={s.stepper}>
            <button type="button" className="btn btn-dark btn-icon btn-sm" aria-label="Previous screen" onClick={() => go(i - 1)}><Icon name="chevron-left" size={20} /></button>
            <button type="button" className="btn btn-dark btn-icon btn-sm" aria-label="Next screen" onClick={() => go(i + 1)}><Icon name="chevron-right" size={20} /></button>
            <span className={s.count} aria-live="polite">{pad(i)} / {pad(N - 1)}</span>
          </div>
          <p className={s.hint}>Left and Right arrow keys step through the screens</p>
        </div>

        <div className={s.capCol}>
          <motion.div key={i} className={s.cap} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={tEnter}>
            <div className={s.capDraw}>
              <svg viewBox="0 30 560 330" aria-hidden="true"><IsoSiteG tone="ghost" seed={3} /></svg>
            </div>
            {cap && (
              <div className={s.steps} aria-label={`Step ${i + 1} of 3`} role="img">
                {[0, 1, 2].map((n) => <i key={n} data-on={n <= i} style={{ '--i': n }} />)}
              </div>
            )}
            <div className={s.capBody}>
              <h2>{TITLES[i]}</h2>
              {cap && <p>{cap.text}</p>}
            </div>
          </motion.div>
        </div>
      </div></div>

      <div className={s.rowWrap}>
        <motion.ul className={s.row9} variants={listV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} aria-label="All nine screens">
          {SCREENS.map((Sc, n) => (
            <motion.li key={n} variants={itemV}>
              <button type="button" className={s.thumb} aria-current={n === i} aria-label={`Show screen ${n + 1}, ${TITLES[n]}`} onClick={() => go(n)}>
                <span className={s.thumbFrame}>
                  <span className={s.thumbScreen} style={{ '--k': 160 / 390 }} aria-hidden="true">
                    <ScreenCtx.Provider value={{ name: `mobile-a-${pad(n)}`, live: false }}>
                      <Sc p={`mobile-a-row-${n}`} live={false} />
                    </ScreenCtx.Provider>
                  </span>
                </span>
                <span className={s.thumbLabel}><b>{pad(n)}</b>{TITLES[n]}</span>
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </>
  );
}
