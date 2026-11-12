'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import { CutFillG } from '@/components/art/Devices';
import Reveal from '@/components/site/Reveal';
import CountUp from '@/components/site/CountUp';
import Chip from '@/components/ui/Chip';
import { CUT_FILL } from '@/lib/brand';
import s from './lp-work-areas.module.css';

const W = 900, H = 120, Y = 18;
const STEP = W / 6;
const BAR = STEP * 0.98;
const [CUT, FILL, NET] = CUT_FILL.indicators;

// Six markers: yellow cut, blue fill, yellow cut ... (index 0 to 5). Buttons sit over the artwork so they work by keyboard.
const MARKERS = Array.from({ length: 6 }, (_, j) => {
  const cut = j % 2 === 0;
  const lvl = cut ? CUT_FILL.bottom[j / 2] : CUT_FILL.top[(j - 1) / 2];
  return { j, cut, lvl, ind: cut ? CUT : FILL };
});

export default function CutFillSection() {
  const [sel, setSel] = useState(0);
  const m = MARKERS[sel];
  return (
    <section className={`wrap ${s.band}`} aria-labelledby="lp-work-areas-cf-h">
      <Reveal className={s.headRow}>
        <Chip>{CUT_FILL.date}</Chip>
        <h2 id="lp-work-areas-cf-h" className="t-display">{CUT_FILL.title}</h2>
      </Reveal>
      <Reveal delay={80}>
        <div className={`card-app ${s.cf}`}>
          <div className={s.cfStage}>
            <Art viewBox={`0 0 ${W} ${H + Y + 6}`} title={`${CUT_FILL.title}: three cut markers and three fill markers with their levels`} exportName="lp-work-areas-cut-fill">
              <rect x={sel * STEP} y="0" width={BAR} height={H + Y + 6} fill="#90C0F3" fillOpacity="0.35" className={s.cfSel} />
              <CutFillG x={0} y={Y} w={W} h={H} />
            </Art>
            <div className={s.cfButtons} role="group" aria-label="Cut and fill markers">
              {MARKERS.map((k) => (
                <button
                  key={k.j}
                  type="button"
                  className={s.cfBtn}
                  style={{ left: `${((k.j * STEP + BAR / 2) / W) * 100}%` }}
                  aria-pressed={sel === k.j}
                  aria-label={`${k.cut ? 'Cut' : 'Fill'} marker, ${k.lvl}`}
                  onClick={() => setSel(k.j)}
                />
              ))}
            </div>
          </div>
          <dl className={s.cfRead} aria-live="polite">
            <div key={`a${sel}`}>
              <dt className="t-label">{m.ind[0].replace(':', '')}</dt>
              <dd className="t-figure"><CountUp value={m.ind[1]} /></dd>
            </div>
            <div>
              <dt className="t-label">{NET[0].replace(':', '')}</dt>
              <dd className="t-figure">{NET[1]}</dd>
            </div>
            <div key={`l${sel}`}>
              <dt className="t-label">Level</dt>
              <dd className="t-figure">{m.lvl}</dd>
            </div>
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
