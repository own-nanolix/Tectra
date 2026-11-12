'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import { TickBarsG } from '@/components/art/KeyArt';
import Chip from '@/components/ui/Chip';
import { Hl } from '@/components/ui/Card';
import Reveal from '@/components/site/Reveal';
import CountUp from '@/components/site/CountUp';
import { axisLabels } from '@/lib/charts';
import { HEADINGS, INSIGHTS, HEX } from '@/lib/brand';
import Seen from './Seen';
import s from './styles';

const W = 1000;
const LANE = 118;

// Section 3: the three research figures as one comparison instrument. Pick a lane or hover it.
export default function TickBand() {
  const [pick, setPick] = useState(0);
  const h = HEADINGS.insights;
  const cur = INSIGHTS[pick];
  return (
    <section className={`${s.band} ${s.tileBand}`} aria-labelledby="lp-dashboard-insights-h">
      <div className="wrap">
        <Reveal>
          <Chip>{h.chip}</Chip>
          <h2 id="lp-dashboard-insights-h" className="t-display t-balance" style={{ marginTop: 24 }}><Hl text={h.text} hl={h.hl} /></h2>
        </Reveal>
        <div className={s.insGrid}>
          <Reveal delay={60}>
            <ul className={s.insList}>
              {INSIGHTS.map((it, i) => (
                <li key={i}>
                  <button type="button" className={s.insBtn} aria-pressed={pick === i} onClick={() => setPick(i)} onPointerEnter={() => setPick(i)}>
                    <span className={`t-figure ${s.insFig}`} data-tone={it.tone}>{it.value}</span>
                    <span className="t-body">{it.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <Seen className={s.insChart}>
              <Art viewBox={`0 0 ${W} 380`} title="Three research figures on one tick-bar scale: 72%, 59% and 64%" exportName="lp-dashboard-insights">
                {INSIGHTS.map((it, i) => (
                  <g key={i} transform={`translate(0 ${i * LANE})`} opacity={pick === i ? 1 : 0.32}>
                    <TickBarsG idp={`lp-dashboard-ins${i}`} w={W} h={70} count={60} from={it.from} to={it.to} tone={it.tone} rise />
                    <rect x="0" y="0" width={W} height="100" fill="transparent" onPointerEnter={() => setPick(i)} />
                  </g>
                ))}
                {axisLabels(W).map((a, i, all) => (
                  <text key={i} x={a.x} y="372" fontSize="13" fill={HEX.muted} textAnchor={i === 0 ? 'start' : i === all.length - 1 ? 'end' : 'middle'}>
                    {a.label}
                  </text>
                ))}
              </Art>
            </Seen>
            <p className={`${s.insRead} t-lead`} aria-live="polite">
              <CountUp key={pick} value={cur.value} className="t-figure" /> <span>{cur.label}</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
