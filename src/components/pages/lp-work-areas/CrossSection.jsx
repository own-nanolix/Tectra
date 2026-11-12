'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import { TickBarsG } from '@/components/art/KeyArt';
import Reveal from '@/components/site/Reveal';
import Chip, { Trend } from '@/components/ui/Chip';
import { AXIS, axisLabels } from '@/lib/charts';
import { KPI } from '@/lib/brand';
import s from './lp-work-areas.module.css';

const W = 1000;
const SPAN = 2; // the handle covers two label slots, as in the case study (70 to 90)
const MAX = AXIS.length - 1 - SPAN;

// The 2D Cross Section instrument: tick bars, a range handle and the designer's axis. Move the handle with the slider.
export default function CrossSection() {
  const [start, setStart] = useState(4); // slot 4 holds 70, slot 6 holds 90
  const labels = axisLabels(W);
  const a = AXIS[start], b = AXIS[start + SPAN];
  const k = KPI.cross;
  return (
    <section className={`wrap ${s.band}`} aria-labelledby="lp-work-areas-cross-h">
      <Reveal className={s.headRow}>
        <Chip>{k.legend}</Chip>
        <h2 id="lp-work-areas-cross-h" className="t-h2">{k.label}</h2>
      </Reveal>
      <Reveal delay={80}>
        <div className={`card-app ${s.cross}`}>
          <div className={s.crossHead}>
            <p className="t-figure">{k.value}</p>
            <Trend dir={k.dir}>{k.trend}</Trend>
            <p className={s.crossRead} aria-live="polite">{k.legend}: <b>{a}</b> to <b>{b}</b></p>
          </div>
          <div className={s.crossArt}>
            <Art viewBox="0 0 1000 176" title={`${k.label}: tick bars with the range handle from ${a} to ${b}`} exportName="lp-work-areas-cross-section">
              <TickBarsG idp="lp-work-areas-cs" x={0} y={0} w={W} h={100} count={56} from={start / 10} to={(start + SPAN) / 10} tone="yellow" base="#C9C9C9" rise />
              {labels.map((l, i) => (
                <text key={l.label} x={Math.min(Math.max(l.x, 8), W - 8)} y="168" fontSize="14" fontWeight={i >= start && i <= start + SPAN ? 500 : 400} fill={i >= start && i <= start + SPAN ? '#2F2F2F' : '#5E5E5E'} textAnchor="middle">{l.label}</text>
              ))}
            </Art>
          </div>
          <label className={s.rangeLabel} htmlFor="lp-work-areas-cross-range">
            <span className="t-label">{k.legend}</span>
            <input
              id="lp-work-areas-cross-range"
              className={s.range}
              type="range"
              min={0}
              max={MAX}
              step={1}
              value={start}
              onChange={(e) => setStart(Number(e.target.value))}
              aria-valuetext={`${a} to ${b}`}
            />
          </label>
        </div>
      </Reveal>
    </section>
  );
}
