'use client';

import { motion } from 'framer-motion';
import Art from '@/components/art/Art';
import Button from '@/components/ui/Button';
import { HEX } from '@/lib/brand';
import { ease, dur } from '@/lib/motion';
import { r2 } from '@/lib/charts';
import { usePlay, go, tx } from './parts';
import s from './motion.module.css';

const CURVES = [
  { key: 'out', token: 'ease.out', css: '--ease-out', use: 'Entrances and fills', b: ease.out },
  { key: 'in-out', token: 'ease.inOut', css: '--ease-in-out', use: 'Moves between states', b: ease.inOut },
  { key: 'draw', token: 'ease.draw', css: '--ease-draw', use: 'Line drawing and arcs', b: ease.draw },
  { key: 'snap', token: 'ease.snap', css: '--ease-snap', use: 'Pins and dots landing', b: ease.snap, tone: 'yellow' },
];

// Unit grid: x 0..1 and y 0..1 inside a 190 unit square, with headroom above for the overshoot of ease.snap.
const X0 = 60;
const Y0 = 270;
const S = 190;
const px = (x) => r2(X0 + S * x);
const py = (y) => r2(Y0 - S * y);
const GRID = [0, 0.25, 0.5, 0.75, 1];

function Plate({ c }) {
  const [x1, y1, x2, y2] = c.b;
  const bez = `cubic-bezier(${c.b.join(', ')})`;
  return (
    <Art viewBox="0 0 320 344" title={`Easing curve ${c.token}, ${bez}`} exportName={`motion-ease-${c.key}`}>
      <rect width="320" height="344" fill={HEX.tile} />
      {GRID.map((g) => (
        <g key={g}>
          <path d={`M${px(g)} ${py(0)}V${py(1)}`} stroke={HEX.track} strokeWidth="1" />
          <path d={`M${px(0)} ${py(g)}H${px(1)}`} stroke={HEX.track} strokeWidth="1" />
        </g>
      ))}
      <rect x={px(0)} y={py(1)} width={S} height={S} fill="none" stroke={HEX.app} strokeWidth="1.2" />
      <path d={`M${px(0)} ${py(0)}L${px(1)} ${py(1)}`} stroke={HEX.app} strokeWidth="1" strokeDasharray="4 4" />
      <text x={px(0) - 8} y={py(0) + 4} fontSize="11" textAnchor="end" fill={HEX.muted}>0</text>
      <text x={px(0) - 8} y={py(1) + 4} fontSize="11" textAnchor="end" fill={HEX.muted}>1</text>
      <text x={px(0)} y={py(0) + 16} fontSize="11" textAnchor="middle" fill={HEX.muted}>0</text>
      <text x={px(1)} y={py(0) + 16} fontSize="11" textAnchor="middle" fill={HEX.muted}>1</text>
      <path d={`M${px(0)} ${py(0)}L${px(x1)} ${py(y1)}M${px(1)} ${py(1)}L${px(x2)} ${py(y2)}`} stroke={HEX.ink} strokeWidth="1" />
      <path
        d={`M${px(0)} ${py(0)}C${px(x1)} ${py(y1)} ${px(x2)} ${py(y2)} ${px(1)} ${py(1)}`}
        fill="none"
        stroke={HEX.blue}
        strokeWidth="3"
        strokeLinecap="round"
        pathLength="1"
        className="draw"
        style={{ '--len': 1 }}
      />
      <circle cx={px(0)} cy={py(0)} r="4.5" fill={HEX.blue} />
      <circle cx={px(1)} cy={py(1)} r="4.5" fill={HEX.blue} />
      <circle cx={px(x1)} cy={py(y1)} r="6" fill={HEX.yellow} />
      <circle cx={px(x2)} cy={py(y2)} r="6" fill={HEX.yellow} />
      <text x="24" y="314" fontSize="20" fontWeight="500" fill={HEX.ink}>{c.token}</text>
      <text x="24" y="333" fontSize="12" fill={HEX.muted}>{bez}</text>
    </Art>
  );
}

function EaseCard({ c }) {
  const [pref, p] = usePlay();
  return (
    <div ref={pref} className={s.plate}>
      <Plate c={c} />
      <div className={s.bar}>
        <p className="t-title">{c.use}</p>
        <Button size="sm" variant="sky" icon="play" onClick={p.play}>Play</Button>
      </div>
      <div className={s.ruler} aria-hidden="true">
        <motion.span
          key={p.k}
          className={s.marker}
          data-tone={c.tone}
          initial={go(p.started, { left: '0%' })}
          animate={{ left: '88%' }}
          transition={tx({ duration: dur.d4, ease: c.b })}
        />
      </div>
      <p className={s.kicker}>{c.css}. Demo at 900 ms (dur-4).</p>
    </div>
  );
}

export default function Easing() {
  return (
    <div className={s.g2}>
      {CURVES.map((c) => (
        <EaseCard key={c.key} c={c} />
      ))}
    </div>
  );
}
