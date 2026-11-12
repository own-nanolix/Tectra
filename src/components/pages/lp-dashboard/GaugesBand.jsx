'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import { GaugeG } from '@/components/art/KeyArt';
import Icon from '@/components/site/Icon';
import Reveal from '@/components/site/Reveal';
import CountUp from '@/components/site/CountUp';
import Chip from '@/components/ui/Chip';
import { BILLBOARD, HEADINGS, RESULTS } from '@/lib/brand';
import Seen from './Seen';
import s from './styles';

function ResultCard({ r, i }) {
  const [n, setN] = useState(0);
  const bump = () => setN((v) => v + 1);
  return (
    <div className={`card ${s.result}`} role="group" aria-label={`${r.label} ${r.value}`} tabIndex={0} onMouseEnter={bump} onFocus={bump}>
      <div className="card-head">
        <h3 className="t-h3">{r.label}</h3>
        <Icon name="arrow-up" size={20} />
      </div>
      <p className={s.resultFig}>
        <CountUp value={r.value} className="t-figure" />
      </p>
      <Art key={n} viewBox="0 0 340 236" title={`${r.label}: gauge at ${r.value}`} exportName={`lp-dashboard-result-${i + 1}`} className={s.resultArt}>
        <GaugeG w={340} h={236} r={118} value={parseInt(r.value, 10) / 100} tone={r.tone} draw />
      </Art>
    </div>
  );
}

// Section 4: RESULTS as three large corner gauges that sweep when the band arrives and again on hover.
export default function GaugesBand() {
  return (
    <section className={s.band} aria-labelledby="lp-dashboard-results-h">
      <div className="wrap">
        <Reveal className={s.center}>
          <Chip>{HEADINGS.result.chip}</Chip>
          <h2 id="lp-dashboard-results-h" className="t-display t-balance t-center" style={{ marginTop: 24 }}>
            {BILLBOARD.title}
          </h2>
        </Reveal>
        <Seen className={`grid cols-3 ${s.results}`}>
          {RESULTS.map((r, i) => (
            <Reveal key={i} delay={i * 80}>
              <ResultCard r={r} i={i} />
            </Reveal>
          ))}
        </Seen>
      </div>
    </section>
  );
}
