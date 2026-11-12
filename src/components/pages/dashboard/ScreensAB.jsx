'use client';

// Option A: icon rail with a bento of widgets (the case study's own desktop app, Progress tab).
// Proportions re-measured on m01 / m07 / m14: hero 110 to 546, cards from 558; Cross Section 296 high over a
// 106 high Progres card; Details / Notes / Material 190 high over the Cut and Fill card.
// Option B: top tab bar, one hero site view, a strip of KPI tiles under it.
import { Site } from './charts';
import { box, TopBar, Rail, HeroTitle, Avatars, KomatsuCard, OverallSel, OverallPanel, GaugeCard, CrossCard, ProgressCard, CutFillCard, KpiTile } from './parts';
import s from './dashboard.module.css';

export function ScreenA() {
  const p = 'dashboard-a';
  return (
    <div className={s.board} data-screen="dashboard-a">
      <TopBar />
      <Rail />
      <section className={`field ${s.abs} ${s.hero}`} style={box(110, 110, 1466, 436)} aria-label="Smart Construction">
        <Site idp={`${p}-site`} className={s.abs} style={{ left: 400, top: -86, width: 896, height: 640 }} />
        <HeroTitle x={30} y={30} />
        <Avatars x={30} y={376} />
        <KomatsuCard x={640} y={80} />
        <OverallPanel x={1110} y={60} h={360} idp={p} />
        <OverallSel x={1242} y={36} />
      </section>
      <CrossCard x={110} y={558} h={296} H={84} idp={p} />
      <ProgressCard x={110} y={866} h={106} idp={p} />
      <GaugeCard k="details" x={742} y={558} idp={p} />
      <GaugeCard k="notes" x={1024} y={558} idp={p} />
      <GaugeCard k="material" x={1306} y={558} idp={p} />
      <CutFillCard layout="grid" x={742} y={760} h={212} chartW={500} />
    </div>
  );
}

const TILES = ['overall', 'cross', 'progress', 'details', 'notes', 'material'];

export function ScreenB() {
  const p = 'dashboard-b';
  return (
    <div className={s.board} data-screen="dashboard-b">
      <TopBar />
      <section className={`field ${s.abs} ${s.hero}`} style={box(24, 110, 1552, 640)} aria-label="Smart Construction">
        <Site idp={`${p}-site`} className={s.abs} style={{ left: 500, top: 10, width: 880, height: 629 }} />
        <HeroTitle x={44} y={44} />
        <Avatars x={44} y={566} />
        <KomatsuCard x={610} y={200} />
        <OverallPanel x={1190} y={190} idp={p} />
        <OverallSel x={1322} y={166} />
      </section>
      {TILES.map((k, i) => (
        <KpiTile key={k} k={k} x={24 + i * 261.4} y={766} w={245} h={210} idp={p} />
      ))}
    </div>
  );
}
