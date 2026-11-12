'use client';

import { useState } from 'react';
import Icon from '@/components/site/Icon';
import Field from '@/components/ui/Field';
import Toggle, { Segmented } from '@/components/ui/Toggle';
import Button from '@/components/ui/Button';
import { Hl } from '@/components/ui/Card';
import { Trend } from '@/components/ui/Chip';
import { IsoSiteG, TreesG } from '@/components/art/KeyArt';
import { KPI, NAV, PLANS, FAQ, CUT_FILL, HERO } from '@/lib/brand';
import { StatusBar, NavBar, TabBar, MCard, StatCard, Row, LogoTile } from './Parts';
import { MarkersG } from './Charts';
import s from './mobile-b.module.css';

export const SCREENS = [
  { n: 10, name: 'Sign in' }, { n: 11, name: 'Project switcher' }, { n: 12, name: 'Notifications' },
  { n: 13, name: 'Plans' }, { n: 14, name: 'Help' }, { n: 15, name: 'Settings' },
  { n: 16, name: 'Files' }, { n: 17, name: 'Support' }, { n: 18, name: 'Share' },
];

const FILES = ['Cut and Fill', '2D Cross Section Z (ft)', 'Notes', 'Material', 'Details'];
const NAV_ICONS = ['layers', 'chart', 'calendar', 'hardhat'];

function SignIn({ idp }) {
  return (
    <div className={`${s.art} ${s.artBlue}`}>
      <div className={s.heroField}>
        <svg viewBox="0 0 390 380" width="390" height="380" aria-hidden="true">
          <IsoSiteG x={-30} y={150} scale={0.82} tone="blue" seed={11} />
        </svg>
      </div>
      <StatusBar tone="navy" />
      <div className={s.heroText}>{HERO.title[0]}<br />{HERO.title[1]}</div>
      <div className={s.loginPanel}>
        <span className={s.loginLogo}><LogoTile /></span>
        <Field id={`${idp}-email`} label="Email" type="email" autoComplete="off" />
        <Field id={`${idp}-password`} label="Password" type="password" autoComplete="off" />
        <Button block>{HERO.login}</Button>
        <Button block variant="sky">{HERO.cta[0]}</Button>
      </div>
    </div>
  );
}

function Switcher() {
  const [sel, setSel] = useState('Overall');
  return (
    <div className={s.art}>
      <StatusBar />
      <NavBar right={[{ icon: 'bell', label: 'Notifications', dot: true }, { icon: 'user', label: 'Profile' }]} />
      <div className={s.col}>
        <div className={s.grid2}><StatCard k={KPI.details} /><StatCard k={KPI.notes} /></div>
        <MCard title={KPI.material.label}><div style={{ height: 80 }} /></MCard>
      </div>
      <div className={s.sheetDim} />
      <div className={s.sheet} role="dialog" aria-label="Project switcher">
        <div className={s.handle} />
        <div className={s.sheetHead}>Overall <Icon name="chevron-down" size={20} /></div>
        {['Overall', ...NAV].map((name, i) => (
          <Row key={name} icon={i ? NAV_ICONS[i - 1] : 'briefcase'} title={name} trailing={null} on={sel === name} onClick={() => setSel(name)} />
        ))}
      </div>
    </div>
  );
}

function Alerts() {
  const list = [KPI.details, KPI.notes, KPI.material, KPI.overall];
  return (
    <div className={s.art}>
      <StatusBar />
      <NavBar right={[{ icon: 'bell', label: 'Notifications', on: true }, { icon: 'user', label: 'Profile' }]} />
      <div className={s.col}>
        <div className={s.h}>Notifications</div>
        {list.map((k) => (
          <div key={k.label} className={s.card} style={{ height: 96 }}>
            <div className={s.cardHead}><span className={s.cardTitle}>{k.label}</span><Icon name="arrow-up-right" size={16} /></div>
            <div style={{ position: 'absolute', left: 18, bottom: 14, display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span className={s.fig} style={{ fontSize: 30 }}>{k.value}</span>
              <Trend dir={k.dir}>{k.trend}</Trend>
            </div>
          </div>
        ))}
      </div>
      <TabBar active={1} />
    </div>
  );
}

function Plans({ idp }) {
  const [i, setI] = useState(1);
  const [per, setPer] = useState('Monthly');
  const p = PLANS.list[i];
  return (
    <div className={s.art}>
      <StatusBar />
      <NavBar back right={[{ icon: 'briefcase', label: 'Projects' }]} />
      <div className={s.col}>
        <div className={`${s.h} ${s.hSm}`}><Hl text={PLANS.heading} hl={PLANS.hl} /></div>
        <Segmented id={`${idp}-billing`} label="Billing period" options={PLANS.toggle} value={per} onChange={setPer} />
        <div className={s.btnRow} role="group" aria-label="Plans">
          {PLANS.list.map((q, j) => (
            <button key={q.name} type="button" className={`chip chip-sm`} aria-pressed={i === j} onClick={() => setI(j)}>{q.name}</button>
          ))}
        </div>
        <div className={`${s.card} ${s.plan}`}>
          <div className={s.planName}>{p.name}</div>
          <div className={s.small}>{p.text}</div>
          {p.price && <div className={s.price}>{p.price}<small>{p.per}</small></div>}
          <ul className={s.bullets}>
            {p.bullets.map((b) => <li key={b}><Icon name="check" size={16} />{b}</li>)}
          </ul>
          <Button block variant={i === 0 ? 'blue' : 'dark'}>{p.cta}</Button>
        </div>
      </div>
    </div>
  );
}

function Help() {
  const [open, setOpen] = useState(0);
  return (
    <div className={s.art}>
      <StatusBar />
      <NavBar back right={[{ icon: 'headset', label: 'Support', on: true }]} />
      <div className={s.col}>
        <div className={`${s.h} ${s.hSm}`}>{FAQ.heading}</div>
        <div className={s.faq}>
          {FAQ.rows.map((q, i) => (
            <div key={q} className={s.card} style={{ padding: '14px 16px' }}>
              <button type="button" className={s.faqBtn} aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                <span className={s.faqNo}>{String(i + 1).padStart(2, '0')}</span>
                <span>{q}</span>
                <Icon name="chevron-down" size={18} className={s.arrowRot} style={open === i ? { transform: 'rotate(180deg)' } : undefined} />
              </button>
              {open === i && <p className={s.faqAns} style={{ margin: 0 }}>{FAQ.answers[i]}</p>}
            </div>
          ))}
        </div>
      </div>
      <TabBar active={2} />
    </div>
  );
}

function Settings({ idp, go }) {
  const [n, setN] = useState(true);
  const [ft, setFt] = useState(true);
  const [per, setPer] = useState('Monthly');
  return (
    <div className={s.art}>
      <StatusBar />
      <NavBar right={[{ icon: 'gear', label: 'Settings', on: true }, { icon: 'user', label: 'Profile' }]} />
      <div className={s.col}>
        <div className={s.h}>Settings</div>
        <div className={s.card} style={{ paddingTop: 8, paddingBottom: 8 }}>
          <div className={s.setRow}>Notifications<Toggle hideLabel label="Notifications" checked={n} onChange={setN} /></div>
          <div className={s.setRow}>Units: ft<Toggle hideLabel label="Units: ft" checked={ft} onChange={setFt} /></div>
          <div className={s.setRow}><span>Billing</span><Segmented id={`${idp}-billing`} label="Billing period" options={PLANS.toggle} value={per} onChange={setPer} /></div>
        </div>
        <Row icon="briefcase" title="Plans" trailing="chevron-right" onClick={() => go && go(13)} />
        <Row icon="headset" title="Help" trailing="chevron-right" onClick={() => go && go(14)} />
        <Row icon="folder" title="Files" trailing="chevron-right" onClick={() => go && go(16)} />
        <Row icon="logout" title="Log out" trailing={null} />
      </div>
      <TabBar active={3} />
    </div>
  );
}

function Files() {
  const [sel, setSel] = useState(0);
  return (
    <div className={s.art}>
      <StatusBar />
      <NavBar back right={[{ icon: 'search', label: 'Search' }, { icon: 'filter', label: 'Filter' }]} />
      <div className={s.col}>
        <div className={s.h}>Files</div>
        {FILES.map((f, i) => <Row key={f} icon="folder" title={f} on={sel === i} onClick={() => setSel(i)} />)}
      </div>
      <TabBar active={4} />
    </div>
  );
}

function Support() {
  return (
    <div className={s.art}>
      <StatusBar />
      <NavBar back right={[{ icon: 'headset', label: 'Support', on: true }]} />
      <div className={s.col}>
        <div className={s.blueTile}>
          <svg viewBox="0 0 342 170" width="342" height="170" aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
            <TreesG x={0} y={0} w={342} h={170} count={6} tone="blue" seed={5} clear={[110, 30, 230, 140]} />
          </svg>
          <Icon name="headset" size={72} />
        </div>
        <MCard title={FAQ.rows[4]} arrow={false}>
          <p className={s.faqAns} style={{ padding: '10px 0 0', margin: 0 }}>{FAQ.answers[4]}</p>
        </MCard>
        <Button block>{HERO.cta[0]}</Button>
        <Button block variant="sky">{HERO.cta[1]}</Button>
      </div>
      <TabBar active={2} />
    </div>
  );
}

function Share() {
  return (
    <div className={s.art}>
      <StatusBar />
      <NavBar back right={[{ icon: 'briefcase', label: 'Projects' }, { icon: 'share', label: 'Share', on: true }]} />
      <div className={s.col}>
        <MCard title={CUT_FILL.title} sub={CUT_FILL.date}>
          <svg viewBox="0 0 300 130" width="100%" style={{ display: 'block', marginTop: 8 }} aria-hidden="true"><MarkersG /></svg>
          <div className={s.cardTitle} style={{ fontSize: 15, margin: '6px 0 8px' }}>Indicators</div>
          <div style={{ display: 'grid', gap: 6, fontSize: 14 }}>
            {CUT_FILL.indicators.map(([a, b]) => <div key={a}><span className={s.small}>{a}</span> {b}</div>)}
          </div>
        </MCard>
        <div className={s.btnRow}>
          <Button icon="share" label="Share" variant="white" />
          <Button icon="copy" label="Copy" variant="white" />
          <Button icon="download" label="Download" variant="white" />
        </div>
        <Button block variant="dark">Demo our dashboard</Button>
      </div>
    </div>
  );
}

const MAP = { 10: SignIn, 11: Switcher, 12: Alerts, 13: Plans, 14: Help, 15: Settings, 16: Files, 17: Support, 18: Share };

// The artboard root. `dataScreen` marks it for export (set on the contact sheet, where all nine are present).
export function Artboard({ n, idp, dataScreen, go }) {
  const S = MAP[n];
  return (
    <div data-screen={dataScreen ? `mobile-b-${n}` : undefined} style={{ width: 390, height: 844 }}>
      <S idp={idp} go={go} />
    </div>
  );
}
