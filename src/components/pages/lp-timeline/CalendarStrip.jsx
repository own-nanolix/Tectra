'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import Chip from '@/components/ui/Chip';
import { Hl } from '@/components/ui/Card';
import Reveal from '@/components/site/Reveal';
import CountUp from '@/components/site/CountUp';
import { KOMATSU, CUT_FILL, HEADINGS } from '@/lib/brand';
import { r2, ruler } from '@/lib/charts';
import s from './lp-timeline.module.css';

const W = 1200;
const MONTHS = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
const dayX = (d) => r2((d / 365) * W);
const WEEKS = ruler(52, W);

const ITEMS = {
  komatsu: { name: KOMATSU.name, when: KOMATSU.dates, days: [10, 11, 12, 13, 14] },
  cutfill: { name: CUT_FILL.title, when: CUT_FILL.date.replace('Date: ', ''), days: [17] },
};

export default function CalendarStrip() {
  const [sel, setSel] = useState('komatsu');
  const it = ITEMS[sel];
  const k0 = dayX(9), k1 = dayX(14);
  const c0 = dayX(351);
  const monthLabel = sel === 'komatsu' ? 'Jan' : 'Dec';
  return (
    <section className={`wrap ${s.band}`} aria-labelledby="lp-timeline-cal-h">
      <Reveal className={s.headRow}>
        <Chip>{HEADINGS.problem.chip}</Chip>
        <h2 id="lp-timeline-cal-h" className="t-display t-balance">
          <Hl text={HEADINGS.problem.text} hl={HEADINGS.problem.hl} />
        </h2>
      </Reveal>

      <Reveal delay={60} className={s.calTop}>
        <div className={s.chips} role="group" aria-label="Dates">
          <Chip pressed={sel === 'komatsu'} onClick={() => setSel('komatsu')}>{KOMATSU.name}</Chip>
          <Chip pressed={sel === 'cutfill'} onClick={() => setSel('cutfill')}>{CUT_FILL.title}</Chip>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div className={s.yearScroll}>
          <Art viewBox="0 0 1200 190" title={`Calendar strip: ${KOMATSU.dates} and ${CUT_FILL.date.replace('Date: ', '')}`} exportName="lp-timeline-calendar" className={s.yearSvg}>
            <rect x="0" y="118" width={W} height="8" fill="#DFDFDF" />
            <path d={WEEKS.map((x) => `M${x} 104v36`).join('')} stroke="#C9C9C9" strokeWidth="1" />
            <path d={MONTHS.map((d) => `M${dayX(d)} 96v52`).join('')} stroke="#8F8F8F" strokeWidth="1.5" />
            <text x="6" y="172" fontSize="16" fontWeight="400" fill="#5E5E5E">Jan</text>
            <text x={dayX(334) + 6} y="172" fontSize="16" fontWeight="400" fill="#5E5E5E">Dec</text>
            <g opacity={sel === 'komatsu' ? 1 : 0.4} className={s.calMark}>
              <rect x={k0} y="108" width={r2(k1 - k0)} height="28" fill="#FFB83D" />
              <path d={`M${k0} 108V52`} stroke="#FFB83D" strokeWidth="2" />
              <text x={k0} y="40" fontSize="18" fontWeight="500" fill="#2F2F2F">{KOMATSU.name}</text>
              <text x={k0} y="62" fontSize="16" fontWeight="400" fill="#5E5E5E" dx="8">{KOMATSU.dates}</text>
            </g>
            <g opacity={sel === 'cutfill' ? 1 : 0.4} className={s.calMark}>
              <path d={`M${c0} 122V52`} stroke="#4093EC" strokeWidth="2" />
              <circle cx={c0} cy="122" r="9" fill="#4093EC" />
              <circle cx={c0} cy="122" r="3.4" fill="#FFFFFF" />
              <text x="1194" y="40" fontSize="18" fontWeight="500" fill="#2F2F2F" textAnchor="end">{CUT_FILL.title}</text>
              <text x={c0 - 10} y="62" fontSize="16" fontWeight="400" fill="#5E5E5E" textAnchor="end">{ITEMS.cutfill.when}</text>
            </g>
          </Art>
        </div>
      </Reveal>

      <Reveal delay={140} className={s.calBottom}>
        <div className={s.monthBox}>
          <p className="t-caps muted">{monthLabel}</p>
          <div className={s.days} key={sel} role="img" aria-label={`${it.name}: ${it.when}`}>
            {Array.from({ length: 31 }, (_, d) => {
              const on = it.days.includes(d + 1);
              return (
                <span key={d} className={`${s.day} ${on ? (sel === 'komatsu' ? s.dayY : s.dayB) : ''}`} style={{ '--i': d }}>
                  {on ? d + 1 : ''}
                </span>
              );
            })}
          </div>
        </div>
        <div className={`card ${s.calCard}`} aria-live="polite">
          <h3 className="t-h3">{it.name}</h3>
          <p className="t-label">{it.when}</p>
          {sel === 'komatsu' ? (
            <p className="t-figure"><CountUp value={KOMATSU.value} /></p>
          ) : (
            <dl className={s.kv}>
              {CUT_FILL.indicators.map(([k, v]) => (
                <div key={k}>
                  <dt className="t-label">{k.replace(':', '')}</dt>
                  <dd className="t-body" style={{ fontWeight: 400 }}>{v}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </Reveal>
    </section>
  );
}
