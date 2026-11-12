'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { Trend } from '@/components/ui/Chip';
import CountUp from '@/components/site/CountUp';
import { HERO, KPI, VOLUME } from '@/lib/brand';
import { clamp } from '@/lib/site';
import { AreaChart, AREA } from '@/components/pages/lp-dashboard/Charts';
import { SegBar } from './Parts';
import s from './styles';

// The hero: one giant live figure on the blue field, the area chart drawing behind it.
export default function Hero() {
  const [idx, setIdx] = useState(null);
  const marker = idx === null ? 12 : idx;
  const filled = idx === null ? VOLUME.filled : Math.max(1, Math.round((idx / (AREA.length - 1)) * VOLUME.segments));
  const learn = () => {
    const el = document.getElementById('lp-progress-explorer');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <div className={s.hero}>
      <div
        className={s.chart}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setIdx(clamp(Math.round(((e.clientX - r.left) / r.width) * (AREA.length - 1)), 0, AREA.length - 1));
        }}
        onPointerLeave={() => setIdx(null)}
      >
        <AreaChart idp="lp-progress-hero" exportName="lp-progress-area" title="Overall Completion area chart, 66%" w={1600} h={560} marker={marker} />
      </div>
      <div className={`wrap ${s.heroBody}`}>
        <h1 tabIndex={-1} className={s.h1}>
          <span className={`${s.label} slide-up`}>{KPI.overall.label}</span>
          <span className={s.figRow}>
            <CountUp value={KPI.overall.value} className={s.fig} />
            <Trend dir="up" className={`${s.trend} slide-up`}>{KPI.overall.trend}</Trend>
          </span>
        </h1>
        <p className="t-body on-blue slide-up" style={{ '--i': 2, maxWidth: 520 }}>{HERO.sub}</p>
        <div className={`row ${s.actions} slide-up`} style={{ '--i': 3 }}>
          <Button href="/dashboard/">{HERO.cta[0]}</Button>
          <Button variant="sky" onClick={learn}>{HERO.cta[1]}</Button>
        </div>
      </div>
      <div className={`wrap ${s.heroFoot}`}>
        <SegBar filled={filled} tone="white" />
        <p className={s.vol}>
          <span>{VOLUME.from}</span>
          <span>{VOLUME.to}</span>
        </p>
      </div>
    </div>
  );
}
