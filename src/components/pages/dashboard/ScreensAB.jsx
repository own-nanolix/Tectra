'use client';

// Option A: icon rail with a bento of widgets (the case study's own desktop app, Progress tab).
// Option B: top tab bar, one hero site view, a strip of KPI tiles under it.
import { Site } from './charts';
import { box, TopBar, Rail, HeroTitle, Avatars, KomatsuCard, OverallSel, OverallPanel, GaugeCard, CrossCard, ProgressCard, CutFillCard } from './parts';
import s from './dashboard.module.css';

export function ScreenA() {
  const p = 'dashboard-a';
  return (
    <div className={s.board} data-screen="dashboard-a">
      <TopBar />
      <Rail />
      <section className={`field ${s.abs} ${s.hero}`} style={box(110, 110, 1466, 520)} aria-label="Smart Construction">
        <Site idp={`${p}-site`} className={s.abs} style={{ left: 390, top: -40, width: 896, height: 640 }} />
        <HeroTitle x={30} y={34} />
        <Avatars x={30} y={438} />
        <KomatsuCard x={530} y={220} />
        <OverallPanel x={1110} y={140} idp={p} />
        <OverallSel x={1242} y={116} />
      </section>
      <CrossCard x={110} y={646} idp={p} />
      <ProgressCard x={110} y={888} idp={p} />
      <GaugeCard k="details" x={742} y={646} idp={p} />
      <GaugeCard k="notes" x={1024} y={646} idp={p} />
      <GaugeCard k="material" x={1306} y={646} idp={p} />
      <CutFillCard x={742} y={848} />
    </div>
  );
}

const TILES = ['overall', 'cross', 'progress', 'details', 'notes', 'material'];

export function ScreenB() {
  const p = 'dashboard-b';
  return (
    <div className={s.board} data-screen="dashboard-b">
      <TopBar />
      <section className={`field ${s.abs} ${s.hero}`} style={box(24, 110, 1552, 610)} aria-label="Smart Construction">
        <Site idp={`${p}-site`} className={s.abs} style={{ left: 520, top: 0, width: 850, height: 607 }} />
        <HeroTitle x={44} y={44} />
        <Avatars x={44} y={520} />
        <KomatsuCard x={610} y={190} />
        <OverallPanel x={1190} y={150} idp={p} />
        <OverallSel x={1322} y={126} />
      </section>
      {TILES.map((k, i) => (
        <GaugeCard key={k} k={k} x={24 + i * 261.4} y={740} w={245} h={236} idp={p} />
      ))}
    </div>
  );
}
