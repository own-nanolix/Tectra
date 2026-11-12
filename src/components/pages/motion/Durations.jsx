'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { ease, dur, stagger } from '@/lib/motion';
import { range } from '@/lib/site';
import { usePlay, go, tx } from './parts';
import s from './motion.module.css';

const DURS = [
  ['dur-1', 140, 'Hover, press', dur.d1],
  ['dur-2', 280, 'Toggles, chips', dur.d2],
  ['dur-3', 520, 'Cards, reveals', dur.d3],
  ['dur-4', 900, 'Charts, gauges', dur.d4],
  ['dur-5', 1600, 'Logo, drawing', dur.d5],
];

export function Durations() {
  const [pref, p] = usePlay();
  return (
    <div ref={pref} className={s.plate}>
      <div className={s.bar}>
        <h3 className="t-title">Five durations, side by side</h3>
        <Button size="sm" variant="sky" icon="play" onClick={p.play}>Play all</Button>
      </div>
      {DURS.map(([token, ms, use, sec]) => (
        <div key={token} className={s.durRow}>
          <span>{token} · {ms} ms</span>
          <div className={s.durTrack} role="img" aria-label={`${use}, ${ms} milliseconds`}>
            <motion.span
              key={p.k}
              className={s.durBar}
              initial={go(p.started, { scaleX: 0 })}
              animate={{ scaleX: 1 }}
              transition={tx({ duration: sec, ease: ease.out })}
            />
          </div>
        </div>
      ))}
      <p className={s.kicker}>Every bar uses ease.out. Uses: hover and press, toggles and chips, cards and reveals, charts and gauges, logo and drawing.</p>
    </div>
  );
}

export function Stagger() {
  const [pref, p] = usePlay();
  const n = 12;
  return (
    <div ref={pref} className={s.plate}>
      <div className={s.bar}>
        <h3 className="t-title">Stagger · 60 ms</h3>
        <Button size="sm" variant="sky" icon="play" onClick={p.play}>Play</Button>
      </div>
      <div className={s.stag} role="img" aria-label="Twelve tick bars rising one by one, 60 milliseconds apart">
        {range(n).map((i) => (
          <motion.span
            key={`${p.k}-${i}`}
            className={s.stagBar}
            initial={go(p.started, { scaleY: 0, opacity: 0 })}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={tx({ duration: dur.d4, ease: ease.out, delay: i * stagger })}
          />
        ))}
      </div>
      <div className={s.stagLab} aria-hidden="true">
        {range(n).map((i) => (
          <span key={i}>{i * 60}</span>
        ))}
      </div>
      <p className={s.kicker}>Each bar starts 60 ms after the one before it, left to right. Labels are start times in ms.</p>
    </div>
  );
}
