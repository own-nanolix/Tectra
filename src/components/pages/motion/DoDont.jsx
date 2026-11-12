'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { ease, dur, tSnap, tChart, tDraw, stagger } from '@/lib/motion';
import { range } from '@/lib/site';
import { usePlay, go, tx } from './parts';
import s from './motion.module.css';

// Each demo gets `k` (restart key) and `started`.
function Land({ k, started, bounce }) {
  return (
    <div className={s.demo}>
      {bounce ? (
        <motion.div
          key={k}
          className={s.slab}
          initial={go(started, { y: -90 })}
          animate={{ y: 0 }}
          transition={tx({ type: 'spring', stiffness: 260, damping: 6, mass: 1 })}
        >
          <span className={s.line} />
          <span className={s.line} style={{ width: '60%' }} />
        </motion.div>
      ) : (
        <motion.span key={k} className={s.ball} initial={go(started, { y: -70, opacity: 0 })} animate={{ y: 0, opacity: 1 }} transition={tx(tSnap)} />
      )}
    </div>
  );
}

function Bars({ k, started, together }) {
  return (
    <div className={s.demo}>
      <div className={s.miniBars}>
        {range(8).map((i) => (
          <motion.span
            key={`${k}-${i}`}
            className={s.miniBar}
            initial={go(started, { scaleY: 0, opacity: 0 })}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={tx({ ...tChart, delay: together ? 0 : i * stagger })}
          />
        ))}
      </div>
    </div>
  );
}

function Line({ k, started, spin }) {
  const d = 'M20 100L70 70L110 85L160 35L200 55L250 20';
  return (
    <div className={s.demo}>
      {spin ? (
        <svg viewBox="0 0 270 120" aria-hidden="true">
          <motion.g
            key={k}
            style={{ originX: '135px', originY: '60px' }}
            initial={go(started, { rotate: -360 })}
            animate={{ rotate: 0 }}
            transition={tx({ duration: dur.d5, ease: ease.inOut })}
          >
            <path d={d} fill="none" stroke="#4093EC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </motion.g>
        </svg>
      ) : (
        <svg viewBox="0 0 270 120" aria-hidden="true">
          <motion.path
            key={k}
            d={d}
            fill="none"
            stroke="#4093EC"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={go(started, { pathLength: 0 })}
            animate={{ pathLength: 1 }}
            transition={tx(tDraw)}
          />
        </svg>
      )}
    </div>
  );
}

function Move({ k, started, slow }) {
  return (
    <div className={s.demo}>
      <span className={s.slideLine} />
      <motion.span
        key={k}
        className={s.track}
        initial={go(started, { x: '0%' })}
        animate={{ x: '70%' }}
        transition={tx(slow ? { duration: dur.d5, ease: [0, 0, 1, 1] } : { duration: dur.d2, ease: ease.inOut })}
      >
        <span className={s.slide} />
      </motion.span>
    </div>
  );
}

const PAIRS = [
  { id: 'land', Cmp: Land, do: ['Do', 'Land a pin or dot with a small overshoot: ease.snap, dur-3.'], dont: ['Don’t', 'Bounce cards or panels. They settle with ease.out and stay put.'], prop: 'bounce' },
  { id: 'bars', Cmp: Bars, do: ['Do', 'Fill bars left to right, 60 ms apart.'], dont: ['Don’t', 'Start every bar at once. The eye has nothing to follow.'], prop: 'together' },
  { id: 'line', Cmp: Line, do: ['Do', 'Draw lines on with ease.draw, dur-5.'], dont: ['Don’t', 'Spin shapes to get attention.'], prop: 'spin' },
  { id: 'move', Cmp: Move, do: ['Do', 'Move between states in dur-2 with ease.inOut.'], dont: ['Don’t', 'Use linear easing or a crawl of 1600 ms.'], prop: 'slow' },
];

export default function DoDont() {
  const [pref, p] = usePlay();
  return (
    <div ref={pref} className={s.track}>
      <div className={s.bar}>
        <p className="t-title">Four pairs, played together</p>
        <Button size="sm" variant="sky" icon="play" onClick={p.play}>Play all pairs</Button>
      </div>
      {PAIRS.map(({ id, Cmp, do: yes, dont: no, prop }) => (
        <div key={id} className={s.pair}>
          <div className={s.side}>
            <span className={`${s.badge} ${s.badgeDo}`}>{yes[0]}</span>
            <Cmp k={`${p.k}-do`} started={p.started} />
            <p className="t-body">{yes[1]}</p>
          </div>
          <div className={s.side}>
            <span className={`${s.badge} ${s.badgeDont}`}>{no[0]}</span>
            <Cmp k={`${p.k}-dont`} started={p.started} {...{ [prop]: true }} />
            <p className="t-body">{no[1]}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
