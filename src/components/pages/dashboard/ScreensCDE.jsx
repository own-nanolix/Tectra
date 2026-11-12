'use client';

// Option C: split view, table left and detail panel right.
// Option D: three stacked full-width timeline lanes.
// Option E: map first, the site view full-bleed with floating glass cards.
import { useState } from 'react';
import { Trend } from '@/components/ui/Chip';
import { Site, TickChart, ProgressBar, Gauge, Tip, CutFillChart } from './charts';
import DataTable from './DataTable';
import { ROWS, TREND_CHIPS } from './data';
import { KPI, KOMATSU, CUT_FILL } from '@/lib/brand';
import { box, TopBar, HeroTitle, Avatars, KomatsuCard, OverallSel, OverallPanel, GaugeCard, CrossCard, CutFillCard, Indicators } from './parts';
import s from './dashboard.module.css';

const cols = [
  { key: 'name', label: 'Name', val: (r) => r.name, cell: (r) => r.name },
  { key: 'value', label: 'Value', val: (r) => r.value, num: true, cell: (r) => r.vText },
  { key: 'trend', label: 'Trend', val: (r) => r.trend, num: true, cell: (r) => <Trend dir={r.dir}>{r.tText}</Trend> },
];

function Detail({ row, idp }) {
  const k = row.id;
  return (
    <div className={s.detail}>
      <h3 className={s.dh}>{row.name}</h3>
      <p className={s.dv}>{row.vText}<Trend dir={row.dir}>{row.tText}</Trend></p>
      <div className={s.dvis}>
        {k === 'cross' && <TickChart idp={`${idp}-dt`} w={520} H={120} />}
        {k === 'progress' && <ProgressBar idp={`${idp}-dp`} w={520} />}
        {k !== 'cross' && k !== 'progress' && (
          <Tip className={s.gbig} zones={[{ x: 0, w: 1, text: `${row.name} ${row.vText}, ${row.tText} ${row.dir}` }]}>
            <Gauge idp={`${idp}-dg`} k={k} w={520} h={260} />
          </Tip>
        )}
      </div>
      <div className={s.dcf}>
        <h4 className={s.ct}>{CUT_FILL.title}</h4>
        <p className={s.date}>{CUT_FILL.date}</p>
        <CutFillChart w={520} />
        <Indicators />
      </div>
    </div>
  );
}

export function ScreenC() {
  const p = 'dashboard-c';
  const [pick, setPick] = useState(ROWS[1]);
  const c = [{ ...cols[0], cell: (r) => <><b className={s.nm}>{r.name}</b></> }, cols[1], cols[2]];
  return (
    <div className={s.board} data-screen="dashboard-c">
      <TopBar active="Dashboard" />
      <section className={`${s.c} ${s.abs} ${s.pad}`} style={box(24, 110, 940, 866)} aria-label="Cards table">
        <DataTable label="cards" rows={ROWS} cols={c} chips={TREND_CHIPS} onPick={setPick} picked={pick.id} />
      </section>
      <section className={`${s.c} ${s.abs} ${s.pad}`} style={box(988, 110, 588, 866)} aria-label="Detail">
        <Detail key={pick.id} row={pick} idp={p} />
      </section>
    </div>
  );
}

function Lane({ y, title, children, left }) {
  return (
    <section className={`${s.c} ${s.abs} ${s.lane}`} style={box(24, y, 1552, 278)} aria-label={title}>
      <div className={s.laneL}>{left}</div>
      <div className={s.laneR}>{children}</div>
    </section>
  );
}

export function ScreenD() {
  const p = 'dashboard-d';
  const x = KPI.cross, g = KPI.progress;
  return (
    <div className={s.board} data-screen="dashboard-d">
      <TopBar active="Timeline" />
      <Lane y={110} title={x.label} left={<><h4 className={s.ct}>{x.label}</h4><p className={s.cv}>{x.value}<Trend dir={x.dir}>{x.trend}</Trend></p></>}>
        <TickChart idp={`${p}-l1`} w={1150} H={110} />
      </Lane>
      <Lane y={404} title="Work card and progress" left={<><h4 className={s.ct}>{KOMATSU.name}</h4><p className={s.cv}>{KOMATSU.value}</p><p className={s.date}>{KOMATSU.dates}</p></>}>
        <ProgressBar idp={`${p}-l2`} w={1150} value={0.32} legend={false} date={KOMATSU.dates} tip={`${KOMATSU.name} ${KOMATSU.value}, ${KOMATSU.dates}`} />
        <ProgressBar idp={`${p}-l3`} w={1150} value={0.24} />
        <p className={s.laneNote}>{g.label} {g.value}<Trend dir={g.dir}>{g.trend}</Trend></p>
      </Lane>
      <Lane y={698} title={CUT_FILL.title} left={<><h4 className={s.ct}>{CUT_FILL.title}</h4><p className={s.date}>{CUT_FILL.date}</p><Indicators /></>}>
        <CutFillChart w={1150} />
      </Lane>
    </div>
  );
}

export function ScreenE() {
  const p = 'dashboard-e';
  return (
    <div className={s.board} data-screen="dashboard-e">
      <section className={`field ${s.abs} ${s.hero}`} style={box(0, 0, 1600, 1000)} aria-label="Smart Construction">
        <Site idp={`${p}-site`} className={s.abs} style={{ left: 330, top: 30, width: 1270, height: 907 }} />
        <HeroTitle x={60} y={150} />
        <Avatars x={60} y={420} />
        <KomatsuCard x={760} y={330} />
        <OverallSel x={1362} y={110} />
        <OverallPanel x={1244} y={170} idp={p} />
      </section>
      <TopBar glassy />
      <CrossCard glass x={24} y={716} w={560} h={260} idp={p} />
      <GaugeCard glass k="details" x={596} y={716} w={190} h={260} idp={p} />
      <GaugeCard glass k="notes" x={798} y={716} w={190} h={260} idp={p} />
      <GaugeCard glass k="material" x={1000} y={716} w={190} h={260} idp={p} />
      <CutFillCard glass stack x={1202} y={716} w={374} h={260} chartW={326} />
    </div>
  );
}
