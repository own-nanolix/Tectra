'use client';

import Art from '@/components/art/Art';
import Tabs from '@/components/ui/Tabs';
import { Hl } from '@/components/ui/Card';
import Chip from '@/components/ui/Chip';
import Reveal from '@/components/site/Reveal';
import { PhoneG, TabletG, MonitorG, ScreenHomeG, ScreenAppG } from '@/components/art/Devices';
import { IsoSiteG } from '@/components/art/KeyArt';
import { HEADINGS, MOBILE_SCREENS, QUOTES, HERO, ROADMAP } from '@/lib/brand';
import s from './lp-timeline.module.css';

const VIEW = '0 0 640 520';

function Scene({ kind }) {
  return (
    <g>
      <rect width="640" height="520" rx="6" fill="#F5F5F5" />
      <IsoSiteG x={40} y={110} scale={0.9} tone="ghost" trees={false} />
      {kind === 'mobile' && (
        <PhoneG idp="lp-timeline-dp-ph" x={200} y={14} w={240}>
          <ScreenHomeG idp="lp-timeline-dp-h" />
        </PhoneG>
      )}
      {kind === 'tablet' && (
        <TabletG idp="lp-timeline-dp-ta" x={50} y={80} w={540} screenFill="#DDDDDD">
          <g transform="scale(0.7375)">
            <ScreenAppG idp="lp-timeline-dp-ta-a" />
          </g>
        </TabletG>
      )}
      {kind === 'desktop' && (
        <MonitorG idp="lp-timeline-dp-mo" x={60} y={20} w={520}>
          <ScreenAppG idp="lp-timeline-dp-mo-a" />
        </MonitorG>
      )}
    </g>
  );
}

const PANELS = [
  { id: 'mobile', label: ROADMAP.done[2], title: MOBILE_SCREENS[0].title, text: MOBILE_SCREENS[0].text, art: 'Phone showing the blue home screen' },
  { id: 'tablet', label: 'Tablet', title: HEADINGS.next.chip, text: QUOTES.next.text.replace('"', ''), art: 'Tablet showing the desktop app' },
  { id: 'desktop', label: ROADMAP.done[1], title: HERO.title.join(' '), text: HERO.sub, art: 'Monitor showing the desktop app' },
];

export default function DevicePath() {
  const tabs = PANELS.map((p) => ({
    id: p.id,
    label: p.label,
    content: (
      <div className={s.deviceGrid}>
        <div className={s.deviceArt}>
          <Art viewBox={VIEW} title={p.art} exportName={`lp-timeline-device-${p.id}`}>
            <Scene kind={p.id} />
          </Art>
        </div>
        <div className={`stack ${s.deviceText}`}>
          <Chip tone="blue" size="sm">{p.label}</Chip>
          <h3 className="t-h2">{p.title}</h3>
          <p className="t-lead">{p.text}</p>
        </div>
      </div>
    ),
  }));
  return (
    <section className={`wrap ${s.band}`} aria-labelledby="lp-timeline-device-h">
      <Reveal className={s.headRow}>
        <Chip>{HEADINGS.mobile.chip}</Chip>
        <h2 id="lp-timeline-device-h" className="t-display t-balance">
          <Hl text={HEADINGS.mobile.text} hl={HEADINGS.mobile.hl} />
        </h2>
      </Reveal>
      <Reveal delay={80}>
        <Tabs id="lp-timeline-device" label="Device" tabs={tabs} tone="blue" />
      </Reveal>
    </section>
  );
}
