'use client';
// Screens 1 to 3: the case study's own phone screens (m09, m05), rebuilt.
import { createContext, useContext } from 'react';
import Icon from '@/components/site/Icon';
import { IsoSiteG, PinG } from '@/components/art/KeyArt';
import { CutFillG } from '@/components/art/Devices';
import { HERO, WORKCARD, KPI, VOLUME, CUT_FILL } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { StatusBar, LogoTile, InnerHead, TabBar, GaugeCard, SitePins, TickChart, AxisRow, HALF, FULL } from './shared';
import s from './mobile-a.module.css';

// The fixed 390 x 844 artboard root. The stage tells it its name (mobile-a-01 ...) through this context.
export const ScreenCtx = createContext(null);
export function Board({ tone = 'grey', children, ...rest }) {
  const ds = useContext(ScreenCtx);
  const mark = ds ? { [ds.live ? 'data-live-screen' : 'data-screen']: ds.name } : {};
  return <div className={`${s.board} ${s[tone]}`} {...mark} {...rest}>{children}</div>;
}

function Tri({ cls }) {
  return <i className={`${s.tri} ${cls}`} />;
}

// 1. Blue home
export function Screen1() {
  return (
    <Board tone="blue">
      <svg className={s.siteSvg} viewBox="0 0 390 844" aria-hidden="true">
        <IsoSiteG x={-150} y={300} scale={1.25} tone="blue" seed={11} />
        <SitePins x={-150} y={300} scale={1.25} names={['ridge', 'wing']} />
      </svg>
      <StatusBar tone="blue" />
      <LogoTile />
      <div className={s.pill}><span>Overall <Icon name="chevron-down" size={16} /></span><span><Icon name="more" size={18} /></span></div>
      <h3 className={s.hero}>{HERO.title[0]}<br />{HERO.title[1]}</h3>
      <p className={s.heroSub}>{HERO.sub}</p>
      <div className={`${s.gl} ${s.workcard}`}>
        <div className={s.glRow}><span>{WORKCARD.name}</span><Icon name="arrow-right" size={18} /></div>
        <div className={s.glSmall}>{WORKCARD.dates}</div>
        <div className={s.glBig}>{WORKCARD.value}</div>
        <svg className={s.glPin} width="26" height="26" viewBox="-13 -13 26 26" aria-hidden="true"><g className="pop" style={{ '--i': 4 }}><PinG r={10} tone="yellow" /></g></svg>
      </div>
      <div className={`${s.gl} ${s.vol}`}>
        <div className={s.volRow}><span>{VOLUME.from}</span><i className={s.volLine} /><span>{VOLUME.to}</span></div>
        <div className={s.segTrack}>
          {Array.from({ length: VOLUME.segments }, (_, i) => <i key={i} data-on={i < VOLUME.filled} style={{ '--i': i }} />)}
        </div>
      </div>
      <div className={`${s.gl} ${s.overall}`}>
        <div>{KPI.overall.label}</div>
        <div className={s.glBig}>{KPI.overall.value}</div>
        <div className={s.overallTrend}>{KPI.overall.trend}<Tri cls={s.triUpBlue} /></div>
      </div>
    </Board>
  );
}

// 2. Grey cards
export function Screen2({ p }) {
  const k = KPI;
  return (
    <Board>
      <StatusBar />
      <LogoTile />
      <div className={s.topRight} aria-hidden="true">
        <span className={s.sq}><Icon name="bell" size={22} /><b /></span>
        <span className={s.sq}><Icon name="hardhat" size={24} /></span>
      </div>
      <GaugeCard title={k.details.label} value={k.details.value} trend={k.details.trend} dir="up" tone="blue" {...HALF} pos={{ left: 11, top: 149 }} />
      <GaugeCard title={k.notes.label} value={k.notes.value} trend={k.notes.trend} dir="down" tone="yellow" {...HALF} pos={{ left: 197, top: 149 }} />
      <GaugeCard title={k.material.label} value={k.material.value} trend={k.material.trend} dir="up" tone="blue" {...FULL} legend={k.material.legend} pos={{ left: 11, top: 342 }} />
      <div className={s.card2} style={{ top: 534, height: 330 }}>
        <div className={s.crossHead}><span>{k.cross.label}</span><Icon name="arrow-up-right" size={16} /></div>
        <div className={s.crossMeta}>
          <strong>{k.cross.value}</strong>{k.cross.trend}<Tri cls={s.triUp} />
          <span className={s.legend}><Handle />{k.cross.legend}</span>
        </div>
        <div className={s.chartAt} style={{ top: 145 }}>
          <TickChart idp={`${p}-s2`} w={325} h={82} from={0.33} to={0.6} tone="yellow" axis={44} />
        </div>
      </div>
      <TabBar active={1} />
    </Board>
  );
}

// The legend glyph: two small blocks joined by a line (the range handle in miniature).
function Handle({ col = '#FFB83D' }) {
  return (
    <svg width="34" height="8" viewBox="0 0 34 8" aria-hidden="true"><path d="M5 4h24" stroke={col} strokeWidth="1.2" /><rect x="0" y="0.5" width="9" height="7" rx="1" fill={col} /><rect x="25" y="0.5" width="9" height="7" rx="1" fill={col} /></svg>
  );
}

// 3. Cut and Fill. The Progres bar and its tall grey ticks follow m09 / m05 (bar ends near 70 on the axis).
const PW = 325;
const PBAR = r2(PW * 0.41);
const PTICKS = Array.from({ length: 60 }, (_, i) => r2(PBAR + 6 + i * 3.1)).filter((x) => x <= PW);
export function Screen3() {
  const pr = KPI.progress;
  return (
    <Board>
      <StatusBar />
      <InnerHead />
      <div className={s.card2} style={{ top: 147, height: 358 }}>
        <div className={s.cfTitle}><span>{CUT_FILL.title}</span><Icon name="arrow-up-right" size={16} /></div>
        <div className={s.cfDate}><b>Date:</b>{CUT_FILL.date.replace('Date:', '')}</div>
        <svg className={s.cfSvg} width={PW} height="82" viewBox={`0 0 ${PW} 82`} aria-hidden="true">
          <CutFillG w={PW} h={82} top={CUT_FILL.top} bottom={CUT_FILL.bottom} className="fade-in" />
        </svg>
        <div className={s.ind}>
          <h3>Indicators</h3>
          <div className={s.indGrid}>
            {CUT_FILL.indicators.map(([a, b]) => <div key={a}><span>{a}</span><em>{b}</em></div>)}
          </div>
        </div>
      </div>
      <div className={s.card2} style={{ top: 510, height: 255 }}>
        <div className={s.cfTitle}><span>{pr.label}</span><Icon name="arrow-up-right" size={16} /></div>
        <div className={s.crossMeta} style={{ top: 72 }}>
          <strong>{pr.value}</strong>{pr.trend}<Tri cls={s.triDown} />
          <span className={s.legend}><Handle col="#4093EC" />{pr.legend}</span>
        </div>
        <svg className={s.chartAt} style={{ top: 140 }} width={PW} height="100" viewBox={`0 0 ${PW} 100`} aria-hidden="true">
          <path d={PTICKS.map((x) => `M${x} 7V70`).join('')} stroke="#C9C9C9" strokeWidth="1" className="fade-in" />
          <rect x="0" y="63" width={PBAR} height="6" fill="#4093EC" className="grow-x" />
          <AxisRow w={PW} y={92} />
        </svg>
      </div>
      <div className={s.cut} style={{ left: 11 }}><span>Cross</span><Icon name="arrow-up-right" size={16} /></div>
      <div className={s.cut} style={{ left: 197 }}><span>Timeline</span><Icon name="arrow-up-right" size={16} /></div>
    </Board>
  );
}
