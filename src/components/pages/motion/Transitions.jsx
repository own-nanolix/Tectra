'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Reveal from '@/components/site/Reveal';
import CountUp from '@/components/site/CountUp';
import { ease, dur, tEnter, tMove, listV, itemV } from '@/lib/motion';
import { usePlay, go, tx } from './parts';
import s from './motion.module.css';

const W = [70, 90, 55];

function Lines({ n = 3 }) {
  return W.slice(0, n).map((w, i) => <span key={i} className={s.line} style={{ width: `${w}%` }} />);
}

function Head({ title, onPlay, label = 'Replay' }) {
  return (
    <div className={s.bar}>
      <h3 className="t-title">{title}</h3>
      {onPlay && (
        <Button size="sm" variant="sky" icon="play" onClick={onPlay}>
          {label}
        </Button>
      )}
    </div>
  );
}

// (a) Page enter: fade and rise 16 px, dur-3, ease.out.
function PageEnter() {
  const [pref, p] = usePlay();
  return (
    <div ref={pref} className={s.plate}>
      <Head title="Page enter" onPlay={p.play} />
      <div className={s.stage}>
        <motion.div
          key={p.k}
          className={s.page}
          initial={go(p.started, { opacity: 0, y: 16 })}
          animate={{ opacity: 1, y: 0 }}
          transition={tx(tEnter)}
        >
          <p className="t-title">Dashboard</p>
          <Lines />
        </motion.div>
      </div>
      <p className={s.kicker}>Opacity 0 to 1, rise 16 px. dur-3 · ease.out.</p>
    </div>
  );
}

// (b) Card reveal on scroll: the shared Reveal wraps the block; the cards inside replay with the same values.
function CardReveal() {
  const [pref, p] = usePlay();
  return (
    <div ref={pref} className={s.plate}>
      <Head title="Card reveal on scroll" onPlay={p.play} />
      <Reveal>
        <motion.ul
          key={p.k}
          className={s.cards}
          variants={listV}
          initial={go(p.started, 'hidden') ? 'hidden' : false}
          animate="show"
        >
          {[0, 1, 2].map((i) => (
            <motion.li key={i} variants={itemV}>
              <span className={s.line} style={{ width: '60%' }} />
              <span className={s.line} />
            </motion.li>
          ))}
        </motion.ul>
      </Reveal>
      <p className={s.kicker}>Reveal: opacity and an 18 px rise, dur-3 · ease.out. Cards follow 60 ms apart.</p>
    </div>
  );
}

// (c) Tab change: the content cross-fades, tMove.
const TABS = ['Dashboard', 'Progress', 'Timeline'];
function TabChange() {
  const [tab, setTab] = useState(0);
  const key = (e) => {
    const last = TABS.length - 1;
    const map = { ArrowRight: (tab + 1) % TABS.length, ArrowLeft: (tab + last) % TABS.length, Home: 0, End: last };
    if (!(e.key in map)) return;
    e.preventDefault();
    const next = map[e.key];
    setTab(next);
    document.getElementById(`motion-tab-${next}`)?.focus();
  };
  return (
    <div className={s.plate}>
      <Head title="Tab change" />
      <div className={s.stage}>
        <div className="tabs tabs-blue" role="tablist" aria-label="Tab change demo" onKeyDown={key} style={{ justifySelf: 'start' }}>
          {TABS.map((t, i) => (
            <button
              key={t}
              id={`motion-tab-${i}`}
              type="button"
              role="tab"
              className="tab"
              aria-selected={tab === i}
              aria-controls="motion-tab-panel"
              tabIndex={tab === i ? 0 : -1}
              onClick={() => setTab(i)}
            >
              {t}
            </button>
          ))}
        </div>
        <div id="motion-tab-panel" role="tabpanel" aria-labelledby={`motion-tab-${tab}`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              className={s.tabPanel}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: tMove }}
              exit={{ opacity: 0, transition: { duration: dur.d1, ease: ease.inOut } }}
            >
              <span className={s.line} style={{ width: `${40 + tab * 20}%` }} />
              <Lines />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <p className={s.kicker}>Old content fades out in 140 ms, new content in over 280 ms. tMove · ease.inOut.</p>
    </div>
  );
}

// (d) Modal / sheet rising.
function Sheet() {
  const [open, setOpen] = useState(false);
  const close = () => {
    setOpen(false);
    document.getElementById('motion-sheet-open')?.focus();
  };
  return (
    <div className={s.plate}>
      <Head title="Sheet rising" />
      <div
        className={s.stage}
        onKeyDown={(e) => {
          if (e.key === 'Escape' && open) close();
        }}
      >
        <div>
          <Button id="motion-sheet-open" size="sm" onClick={() => setOpen(true)}>Open sheet</Button>
        </div>
        <Lines />
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                key="scrim"
                className={s.scrim}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.35, transition: tx(tEnter) }}
                exit={{ opacity: 0, transition: tx(tMove) }}
                onClick={close}
              />
              <motion.div
                key="sheet"
                className={s.sheet}
                role="dialog"
                aria-label="Sheet demo"
                initial={{ y: '100%' }}
                animate={{ y: 0, transition: tx(tEnter) }}
                exit={{ y: '100%', transition: tx(tMove) }}
              >
                <p className="t-title">Sheet</p>
                <Lines n={2} />
                <div>
                  <Button size="sm" variant="dark" autoFocus onClick={close}>Close</Button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
      <p className={s.kicker}>Rises in 520 ms with ease.out, leaves in 280 ms with ease.inOut. Escape closes it.</p>
    </div>
  );
}

// (e) Number counting up.
function Counter() {
  const [n, setN] = useState(0);
  return (
    <div className={s.plate}>
      <Head title="Number counting up" onPlay={() => setN((v) => v + 1)} />
      <div className={s.stage}>
        <p key={n} className={s.figure}>
          <CountUp value="250,395 cu yd" />
        </p>
      </div>
      <p className={s.kicker}>CountUp: 1,260 ms, eases out, lands on the exact text.</p>
    </div>
  );
}

export default function Transitions() {
  return (
    <div className={s.g2}>
      <PageEnter />
      <CardReveal />
      <TabChange />
      <Sheet />
      <Counter />
    </div>
  );
}
