'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import { Segmented } from '@/components/ui/Toggle';
import Chip from '@/components/ui/Chip';
import { Hl } from '@/components/ui/Card';
import Icon from '@/components/site/Icon';
import Reveal from '@/components/site/Reveal';
import { ruler } from '@/lib/charts';
import { HEADINGS, HEX, PROBLEM, SOLUTION } from '@/lib/brand';
import s from './styles';

const LABELS = [10, 20, 60, 70, 80, 90, 100, 30, 40];
const W = 1000;
const RANGES = { Problem: { x0: 120, x1: 470, col: HEX.yellow }, Solution: { x0: 540, x1: 900, col: HEX.blue } };

function Range({ name, on }) {
  const { x0, x1, col } = RANGES[name];
  return (
    <g style={{ opacity: on ? 1 : 0.22, transition: 'opacity var(--dur-3) var(--ease-out)' }}>
      <path d={`M${x0} 52H${x1}`} stroke={col} strokeWidth="2" />
      <rect x={x0 - 2} y="46" width="12" height="12" rx="1" fill={col} />
      <rect x={x1 - 10} y="46" width="12" height="12" rx="1" fill={col} />
    </g>
  );
}

// Section 4: Problem and Solution on the full-width ruler; the switch moves the light between them.
export default function Obstacles() {
  const [side, setSide] = useState('Problem');
  const h = HEADINGS.problem;
  return (
    <section className={s.band} aria-labelledby="lp-progress-obst-h">
      <div className="wrap-narrow">
        <Reveal className={s.head}>
          <Chip>{h.chip}</Chip>
          <h2 id="lp-progress-obst-h" className="t-display t-balance t-center"><Hl text={h.text} hl={h.hl} /></h2>
        </Reveal>
        <Reveal delay={60}>
          <Art viewBox={`0 0 ${W} 100`} title="Ruler with a yellow Problem range and a blue Solution range" exportName="lp-progress-ruler" className={s.ruler}>
            {ruler(60, W).map((x, i) => (
              <path key={i} d={`M${x} ${i % 5 === 0 ? 10 : 16}V${i % 5 === 0 ? 34 : 28}`} stroke="#BDBDBD" strokeWidth="1" />
            ))}
            {LABELS.map((l, i) => (
              <text key={l} x={(i / (LABELS.length - 1)) * W} y="92" fontSize="13" fill={HEX.muted} textAnchor={i === 0 ? 'start' : i === LABELS.length - 1 ? 'end' : 'middle'}>{l}</text>
            ))}
            {Object.keys(RANGES).map((n) => <Range key={n} name={n} on={side === n} />)}
          </Art>
        </Reveal>
        <Reveal delay={100} className={s.center}>
          <Segmented id="lp-progress-obst" label="Problem or solution" options={['Problem', 'Solution']} value={side} onChange={setSide} />
          <div className={`card fade-in ${s.obstCard}`} data-side={side} key={side}>
            <div className="card-head">
              <h3 className="t-h3">{side}</h3>
              <Icon name="arrow-up-right" size={20} />
            </div>
            <p className="t-lead">{side === 'Problem' ? PROBLEM : SOLUTION}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
