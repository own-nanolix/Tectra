'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import { TickBarsG } from '@/components/art/KeyArt';
import Chip from '@/components/ui/Chip';
import { Hl } from '@/components/ui/Card';
import Reveal from '@/components/site/Reveal';
import CountUp from '@/components/site/CountUp';
import { EFFICIENCY, HEX, HEADINGS, QUOTES, RESULTS } from '@/lib/brand';
import Seen from './Seen';
import s from './styles';

const W = 1000;
const LANE = 118;

// Section 5: RESULTS as three measured lanes on one scale, then the EFFICIENCY card.
export default function Results() {
  const [pick, setPick] = useState(2);
  const q = QUOTES.result;
  return (
    <section className={`${s.band} ${s.tileBand}`} aria-labelledby="lp-progress-results-h">
      <div className="wrap-narrow">
        <Reveal className={s.head}>
          <Chip>{HEADINGS.result.chip}</Chip>
          <h2 id="lp-progress-results-h" className="t-h1 t-balance t-center"><Hl text={q.text} hl={q.hl} /></h2>
        </Reveal>
        <Reveal delay={60}>
          <Seen>
            <Art viewBox={`0 0 ${W} 360`} title="Results: task completion rates 32 percent twice, teams meet deadlines 25 percent faster" exportName="lp-progress-results">
              {RESULTS.map((r, i) => {
                const v = parseInt(r.value, 10) / 100;
                return (
                  <g key={i} transform={`translate(0 ${i * LANE})`} opacity={pick === i ? 1 : 0.4} onPointerEnter={() => setPick(i)}>
                    <text x="0" y="22" fontSize="20" fill={HEX.ink}>{r.label}</text>
                    <text x={W} y="26" fontSize="34" fill={HEX.ink} textAnchor="end" fontWeight="300">{r.value}</text>
                    <g transform="translate(0 40)">
                      <TickBarsG idp={`lp-progress-res${i}`} w={W} h={50} count={50} from={0} to={v} tone={r.tone} handle={false} rise />
                    </g>
                    <rect x="0" y="0" width={W} height="100" fill="transparent" />
                  </g>
                );
              })}
            </Art>
          </Seen>
          <div className={`row ${s.pickRow}`} role="group" aria-label="Result">
            {RESULTS.map((r, i) => (
              <Chip key={i} size="sm" pressed={pick === i} onClick={() => setPick(i)}>{r.label} {r.value}</Chip>
            ))}
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className={`field-yellow ${s.eff}`}>
            <CountUp value={EFFICIENCY.value} className={s.effFig} />
            <p className="t-lead">{EFFICIENCY.label}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
