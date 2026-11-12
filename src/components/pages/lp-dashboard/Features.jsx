'use client';

import Tabs from '@/components/ui/Tabs';
import Button from '@/components/ui/Button';
import Icon from '@/components/site/Icon';
import { Hl } from '@/components/ui/Card';
import Reveal from '@/components/site/Reveal';
import { FEATURES, KPI, VOLUME } from '@/lib/brand';
import { AreaChart } from './Charts';
import s from './styles';

const bars = [KPI.details, KPI.notes, KPI.material];

function Panel({ i, text }) {
  return (
    <div className={s.featPanel}>
      <div>
        <p className="t-lead">{text}</p>
        <p className={`t-body ${s.featNote}`}>{FEATURES.note}</p>
        <div className="row" style={{ marginTop: 24 }}>
          <Button variant="dark" href="/dashboard/" iconRight="arrow-right">{FEATURES.demo}</Button>
        </div>
      </div>
      <div className={s.featVisual}>
        {i === 0 && (
          <>
            <AreaChart idp="lp-dashboard-feat" exportName="lp-dashboard-feature-progress" title="Real-time progress tracking: Overall Completion area chart" tone="blue" w={420} h={190} marker={11} />
            <p className={s.vol} style={{ color: 'var(--muted)' }}>
              <span>{VOLUME.from}</span>
              <span>{VOLUME.to}</span>
            </p>
          </>
        )}
        {i === 1 && (
          <ul className={s.miniBars}>
            {bars.map((b, k) => (
              <li key={b.label} style={{ '--v': b.value, '--i': k }}>
                <span className="t-title">{b.label}</span>
                <span className={s.miniTrack}><span data-tone={b.tone} className="grow-x" /></span>
                <span className="t-figure" style={{ fontSize: 28 }}>{b.value}</span>
              </li>
            ))}
          </ul>
        )}
        {i === 2 && (
          <div className={s.crew}>
            <div className="avatars" aria-hidden="true">
              {['yellow', 'red', 'red', 'yellow'].map((st, k) => (
                <span key={k} className={`avatar ${s.crewAvatar}`} data-status={st === 'red' ? 'red' : undefined}>
                  <Icon name="hardhat" size={24} />
                </span>
              ))}
            </div>
            <div className={s.steps} role="img" aria-label="Task completion: 2 of 3 steps">
              {[0, 1, 2].map((k) => <span key={k} data-on={k < 2} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Section 2: the three feature rows as tabs, each with its own live visual.
export default function Features() {
  const tabs = FEATURES.rows.map(([title, text], i) => ({ id: `f${i}`, label: title, content: <Panel i={i} text={text} /> }));
  return (
    <section className={s.band} id="lp-dashboard-features" aria-labelledby="lp-dashboard-features-h">
      <div className="wrap">
        <Reveal>
          <h2 id="lp-dashboard-features-h" className="t-display t-balance"><Hl text={FEATURES.heading} hl={FEATURES.hl} /></h2>
          <p className="t-lead muted" style={{ marginTop: 16 }}>{FEATURES.sub}</p>
        </Reveal>
        <Reveal delay={80}>
          <Tabs id="lp-dashboard-feat" label="Key features" tabs={tabs} tone="blue" className={s.featTabs} />
        </Reveal>
      </div>
    </section>
  );
}
