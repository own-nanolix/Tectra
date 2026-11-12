'use client';

import Art from '@/components/art/Art';
import { TreesG } from '@/components/art/KeyArt';
import Button from '@/components/ui/Button';
import Icon from '@/components/site/Icon';
import { HERO, KPI } from '@/lib/brand';
import { TickCard, GaugeCard, CutFillCard, CompletionCard } from './Widgets';
import s from './styles';

// The hero: the headline beside a live bento of four app widgets, built from the app in the case study.
export default function Hero() {
  const learn = () => {
    const el = document.getElementById('lp-dashboard-features');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <div className={s.hero}>
      <Art decorative viewBox="0 0 1600 900" className={s.heroTrees}>
        <TreesG x={0} y={0} w={1600} h={900} count={14} tone="blue" seed={11} minSize={90} maxSize={180} opacity={0.5} />
      </Art>
      <div className={`wrap ${s.heroGrid}`}>
        <div className={s.heroText}>
          <h1 className={`t-h1 slide-up ${s.heroTitle}`} tabIndex={-1} style={{ '--i': 0 }}>
            {HERO.title[0]}
            <br />
            {HERO.title[1]}
          </h1>
          <p className="t-body on-blue slide-up" style={{ '--i': 1 }}>{HERO.sub}</p>
          <div className="row slide-up" style={{ '--i': 2 }}>
            <Button href="/dashboard/">{HERO.cta[0]}</Button>
            <Button variant="sky" onClick={learn}>{HERO.cta[1]}</Button>
          </div>
          <div className="avatars slide-up" style={{ '--i': 3 }} aria-hidden="true">
            {['yellow', 'red', 'red', 'yellow'].map((st, i) => (
              <span key={i} className="avatar" data-status={st === 'red' ? 'red' : undefined}>
                <Icon name="hardhat" size={24} />
              </span>
            ))}
          </div>
        </div>
        <div className={s.bento}>
          <div className={`${s.bTick} slide-up`} style={{ '--i': 2 }}>
            <TickCard />
          </div>
          <div className={`${s.bGauge} slide-up`} style={{ '--i': 3 }}>
            <GaugeCard item={KPI.details} exportName="lp-dashboard-gauge-details" />
          </div>
          <div className={`${s.bGauge} slide-up`} style={{ '--i': 4 }}>
            <GaugeCard item={KPI.notes} exportName="lp-dashboard-gauge-notes" />
          </div>
          <div className={`${s.bGauge} slide-up`} style={{ '--i': 5 }}>
            <GaugeCard item={KPI.material} exportName="lp-dashboard-gauge-material" />
          </div>
          <div className={`${s.bHalf} slide-up`} style={{ '--i': 6 }}>
            <CompletionCard />
          </div>
          <div className={`${s.bHalf} slide-up`} style={{ '--i': 7 }}>
            <CutFillCard />
          </div>
        </div>
      </div>
    </div>
  );
}
