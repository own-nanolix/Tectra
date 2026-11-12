'use client';

// Building blocks shared by the dashboard screens. Screens are 1600 x 1000 artboards, so blocks are placed
// absolutely with box(x, y, w, h).
import { useState } from 'react';
import Icon from '@/components/site/Icon';
import { Trend } from '@/components/ui/Chip';
import { MarkG } from '@/components/art/Mark';
import { PinG } from '@/components/art/KeyArt';
import { NAV, KPI, HERO, KOMATSU, CUT_FILL } from '@/lib/brand';
import { Tip, TickChart, ProgressBar, AreaChart, VolumeBar, Gauge, CutFillChart } from './charts';
import s from './dashboard.module.css';

export const box = (x, y, w, h) => ({ left: x, top: y, width: w, height: h });

export function IconBtn({ name, label, on, onClick, dot, style, className = '' }) {
  return (
    <button type="button" className={`${s.ibtn} ${className}`} aria-label={label} aria-current={on ? 'true' : undefined} onClick={onClick} style={style}>
      <Icon name={name} size={24} />
      {dot && <i className={s.ndot} />}
    </button>
  );
}

export function Logo({ size = 58, style }) {
  return (
    <span className={s.logo} style={{ width: size, height: size, ...style }}>
      <svg viewBox="0 0 100 100" role="img" aria-label="Tectra"><MarkG x={0} y={0} size={100} fill="#F5F5F5" /></svg>
    </span>
  );
}

// Left rail: five square icon buttons, log out, user tile.
export function Rail({ y = 330 }) {
  const [on, setOn] = useState('link');
  return (
    <div role="group" aria-label="Tools">
      {['layers', 'link', 'headset', 'gear', 'folder'].map((n, i) => (
        <IconBtn key={n} name={n} label={n[0].toUpperCase() + n.slice(1)} on={on === n} onClick={() => setOn(n)} style={{ position: 'absolute', left: 27, top: y + i * 58 }} />
      ))}
      <IconBtn name="logout" label="Log out" style={{ position: 'absolute', left: 27, top: 862 }} />
      <span className={s.user} style={{ left: 27, top: 924 }} role="img" aria-label="User"><Icon name="user" size={24} /></span>
    </div>
  );
}

// Logo tile, the four-tab strip, briefcase and bell.
export function TopBar({ x = 24, y = 24, w = 1552, active = 'Progress', glassy = false }) {
  const [on, setOn] = useState(active);
  return (
    <div className={`${s.abs} ${s.top}`} style={box(x, y, w, 58)}>
      <Logo />
      <nav className={`${s.strip} ${glassy ? s.stripGlass : ''}`} aria-label="Sections">
        {NAV.map((n) => (
          <button key={n} type="button" aria-current={on === n ? 'page' : undefined} onClick={() => setOn(n)}>{n}</button>
        ))}
      </nav>
      <div className={s.tools}>
        <IconBtn name="briefcase" label="Briefcase" className={s.rel} />
        <IconBtn name="bell" label="Notifications" dot className={s.rel} />
      </div>
    </div>
  );
}

export function HeroTitle({ x, y, w = 520 }) {
  return (
    <div className={s.abs} style={{ left: x, top: y, width: w }}>
      <h3 className={s.heroT}>{HERO.title[0]}<br />{HERO.title[1]}</h3>
      <p className={s.heroSub}>{HERO.sub}</p>
    </div>
  );
}

// Four hard-hat tiles with status dots (yellow, red, red, yellow).
export function Avatars({ x, y }) {
  const st = ['yellow', 'red', 'red', 'yellow'];
  return (
    <div className={`avatars ${s.abs}`} style={{ left: x, top: y }}>
      {st.map((c, i) => (
        <span key={i} className="avatar" data-status={c === 'red' ? 'red' : undefined} role="img" aria-label={`Hard hat tile, ${c} status`}>
          <Icon name="hardhat" size={24} />
        </span>
      ))}
    </div>
  );
}

// Glass work card with the yellow pin.
export function KomatsuCard({ x, y, w = 200, h = 130 }) {
  return (
    <article className={`glass ${s.abs} ${s.kom}`} style={box(x, y, w, h)}>
      <header><h4>{KOMATSU.name}</h4><Icon name="arrow-right" size={16} /></header>
      <p>{KOMATSU.dates}</p>
      <b>{KOMATSU.value}</b>
      <svg className={s.kpin} viewBox="-14 -14 28 28" aria-hidden="true"><PinG tone="yellow" r={10} pulse /></svg>
    </article>
  );
}

export function OverallSel({ x, y }) {
  return (
    <div className={`glass ${s.abs} ${s.sel}`} style={{ left: x, top: y }}>
      <button type="button" aria-label="Overall, choose view">Overall<Icon name="chevron-down" size={16} /></button>
      <button type="button" aria-label="More options"><Icon name="more" size={20} /></button>
    </div>
  );
}

// Glass panel: Overall Completion, area chart, volume bar.
export function OverallPanel({ x, y, w = 332, h = 356, idp }) {
  const o = KPI.overall;
  return (
    <section className={`glass ${s.abs} ${s.panel}`} style={box(x, y, w, h)} aria-label={o.label}>
      <p className={s.pl}>{o.label}</p>
      <p className={s.pv}>{o.value}<Trend dir={o.dir} className={s.trn}>{o.trend}</Trend></p>
      <AreaChart idp={`${idp}-ov`} />
      <VolumeBar />
    </section>
  );
}

function CardHead({ title }) {
  return (
    <header className={s.ch}>
      <h4 className={s.ct}>{title}</h4>
      <Icon name="arrow-up-right" size={16} />
    </header>
  );
}

// Details / Notes / Material / any KPI card with a corner gauge.
export function GaugeCard({ k, x, y, w = 270, h = 190, idp, glass }) {
  const d = KPI[k];
  return (
    <article className={`${s.c} ${s.abs} ${glass ? s.gl : ''}`} style={box(x, y, w, h)}>
      <CardHead title={d.label} />
      <p className={s.tr}><Trend dir={d.dir}>{d.trend}</Trend></p>
      <p className={`${s.cv} ${s.cvb}`}>{d.value}</p>
      {d.legend && <p className={s.leg}><i className="dot" />{d.legend}</p>}
      <Tip className={s.fill} zones={[{ x: 0, w: 1, text: `${d.label} ${d.value}, ${d.trend} ${d.dir}` }]}>
        <Gauge idp={idp} k={k} w={w} h={h} />
      </Tip>
    </article>
  );
}

export function CrossCard({ x, y, w = 620, h = 230, H = 60, idp, glass }) {
  const d = KPI.cross;
  return (
    <article className={`${s.c} ${s.abs} ${glass ? s.gl : ''}`} style={box(x, y, w, h)}>
      <CardHead title={d.label} />
      <p className={s.cv}>{d.value}<Trend dir={d.dir}>{d.trend}</Trend></p>
      <div className={s.chartBox}><TickChart idp={`${idp}-cr`} w={w - 56} H={H} /></div>
    </article>
  );
}

// A compact KPI tile for the strip of option B. Cross Section and Progres keep their own chart shapes
// (tick bars, progress run); the other cards keep the corner gauge.
export function KpiTile({ k, x, y, w, h, idp }) {
  if (k !== 'cross' && k !== 'progress') return <GaugeCard k={k} x={x} y={y} w={w} h={h} idp={idp} />;
  const d = KPI[k];
  return (
    <article className={`${s.c} ${s.abs}`} style={box(x, y, w, h)}>
      <CardHead title={d.label} />
      <div className={s.miniChart}>
        {k === 'cross'
          ? <TickChart idp={`${idp}-mt`} w={w - 48} H={16} axis={false} />
          : <ProgressBar idp={`${idp}-mp`} w={w - 48} />}
      </div>
      <p className={`${s.cv} ${s.cvb}`}>{d.value}<Trend dir={d.dir}>{d.trend}</Trend></p>
    </article>
  );
}

export function ProgressCard({ x, y, w = 620, h = 88, idp }) {
  const d = KPI.progress;
  return (
    <article className={`${s.c} ${s.abs} ${s.prog}`} style={box(x, y, w, h)}>
      <p className={s.cv}>{d.value}<Trend dir={d.dir}>{d.trend}</Trend></p>
      <div className={s.progBox}><ProgressBar idp={`${idp}-pg`} w={w - 220} /></div>
    </article>
  );
}

export function Indicators() {
  return (
    <div className={s.ind}>
      <p>Indicators</p>
      <dl>{CUT_FILL.indicators.map(([a, b]) => (<div key={a}><dt>{a}</dt><dd>{b}</dd></div>))}</dl>
    </div>
  );
}

// layout: 'row' (title, chart, indicators side by side), 'stack' (one column) or 'grid' (the case study's
// desktop card: title and date on top, the markers under them, indicators bottom right).
export function CutFillCard({ x, y, w = 834, h = 128, stack = false, layout, chartW = 370, glass }) {
  const mode = layout || (stack ? 'stack' : 'row');
  const cls = mode === 'grid' ? s.cfg : mode === 'stack' ? s.stack : s.cf;
  return (
    <article className={`${s.c} ${s.abs} ${cls} ${glass ? s.gl : ''}`} style={box(x, y, w, h)}>
      <div>
        <h4 className={s.ct}>{CUT_FILL.title}</h4>
        <p className={s.date}>{CUT_FILL.date}</p>
      </div>
      <div className={s.cfChart} style={{ width: chartW }}><CutFillChart w={chartW} /></div>
      <Indicators />
    </article>
  );
}

// Re-exports used by several screens.
export { TickChart, ProgressBar };
