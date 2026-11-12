'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import Tabs from '@/components/ui/Tabs';
import { Hl, Who } from '@/components/ui/Card';
import Reveal from '@/components/site/Reveal';
import { linePath } from '@/lib/charts';
import { HEX, QUOTES } from '@/lib/brand';
import s from './styles';

const KEYS = ['fragmented', 'modular', 'live'];
// The polyline "mountain" with a ring marker for each of the three voices.
const MOUNTAIN = [[0, 150], [110, 112], [230, 128], [370, 40], [500, 118], [640, 76], [800, 150]];
const MARKS = [1, 3, 5];

function Quote({ q }) {
  return (
    <figure className={s.quote}>
      <blockquote className="t-h1 t-balance"><Hl text={q.text} hl={q.hl} /></blockquote>
      <figcaption className={s.quoteCap}>
        <Who name={q.name} role={q.role} initials={q.initials} />
        <span className={s.steps} role="img" aria-label={`${q.steps} of 3 steps`}>
          {[0, 1, 2].map((k) => <span key={k} data-on={k < q.steps} />)}
        </span>
      </figcaption>
    </figure>
  );
}

// Section 6: the three voices of the case study. The marker on the mountain follows the chosen voice.
export default function QuoteBand() {
  const [tab, setTab] = useState(KEYS[2]);
  const at = KEYS.indexOf(tab);
  const tabs = KEYS.map((k) => ({ id: k, label: QUOTES[k].name, content: <Quote q={QUOTES[k]} /> }));
  return (
    <section className={s.band} aria-label="Quotes">
      <div className="wrap">
        <Reveal>
          <Tabs id="lp-dashboard-quotes" label="Voices" tabs={tabs} value={tab} onChange={setTab} tone="blue" className={s.quoteTabs} />
        </Reveal>
        <Reveal delay={80}>
          <Art viewBox="0 0 800 180" title="Mountain line with three ring markers, one for each voice" exportName="lp-dashboard-mountain" className={s.mountain}>
            <path d={linePath(MOUNTAIN)} fill="none" stroke={HEX.blue} strokeWidth="2" strokeLinejoin="round" pathLength="1" className="draw" style={{ '--len': 1 }} />
            {MARKS.map((m, i) => {
              const [x, y] = MOUNTAIN[m];
              const on = i === at;
              return (
                <g key={m}>
                  <path d={`M${x} ${y + 14}V172`} stroke="#DFDFDF" strokeWidth="1" />
                  <circle cx={x} cy={y} r={on ? 12 : 9} fill="#FFFFFF" stroke={on ? HEX.yellow : HEX.blue} strokeWidth="3" className="pop" style={{ '--i': i }} />
                </g>
              );
            })}
          </Art>
        </Reveal>
      </div>
    </section>
  );
}
