'use client';

// Inner screens: Cut and Fill detail, and the Work areas table.
import Icon from '@/components/site/Icon';
import { Trend } from '@/components/ui/Chip';
import { KOMATSU, CUT_FILL } from '@/lib/brand';
import { Site } from './charts';
import DataTable from './DataTable';
import { LEVELS, WORK, ROW_CHIPS, TREND_CHIPS } from './data';
import { box, TopBar, IconBtn, KomatsuCard, GaugeCard, CrossCard, ProgressCard, CutFillCard } from './parts';
import s from './dashboard.module.css';

const levelCols = [
  { key: 'name', label: 'Level', val: (r) => r.value, cell: (r) => r.name },
  { key: 'row', label: 'Row', val: (r) => r.row, cell: (r) => r.row },
];

const workCols = [
  { key: 'name', label: 'Name', val: (r) => r.name, cell: (r) => <><b className={s.nm}>{r.name}</b>{r.sub && <small className={s.sub}>{r.sub}</small>}</> },
  { key: 'kind', label: 'Kind', val: (r) => r.kind, cell: (r) => r.kind },
  { key: 'value', label: 'Value', val: (r) => r.value, num: true, cell: (r) => r.vText },
  { key: 'trend', label: 'Trend', val: (r) => (r.trend === null ? -99 : r.trend), num: true, cell: (r) => (r.dir ? <Trend dir={r.dir}>{r.tText}</Trend> : '') },
];

export function CutFillScreen() {
  const p = 'dashboard-cf';
  return (
    <div className={s.board} data-screen="dashboard-cutfill">
      <TopBar />
      <div className={`${s.abs} ${s.crumb}`} style={box(24, 110, 1008, 52)}>
        <IconBtn name="arrow-left" label="Back" className={s.rel} />
        <h3 className={s.dh}>{CUT_FILL.title}</h3>
        <IconBtn name="share" label="Share" className={s.rel} />
      </div>
      <CutFillCard x={24} y={176} w={1008} h={250} chartW={560} />
      <ProgressCard x={24} y={442} w={1008} h={88} idp={p} />
      <CrossCard x={24} y={546} w={1008} h={240} idp={p} />
      <div className={`${s.abs} ${s.links}`} style={box(24, 802, 1008, 74)}>
        <button type="button" className={s.big}>Cross<Icon name="arrow-up-right" size={20} /></button>
        <button type="button" className={s.big}>Timeline<Icon name="arrow-up-right" size={20} /></button>
      </div>
      <section className={`${s.c} ${s.abs} ${s.pad}`} style={box(1056, 110, 520, 866)} aria-label="Levels">
        <DataTable label="levels" rows={LEVELS} cols={levelCols} chips={ROW_CHIPS} />
      </section>
    </div>
  );
}

export function WorkAreasScreen() {
  const p = 'dashboard-wa';
  return (
    <div className={s.board} data-screen="dashboard-work">
      <TopBar active="Work areas" />
      <section className={`${s.c} ${s.abs} ${s.pad}`} style={box(24, 110, 1008, 866)} aria-label="Work areas">
        <DataTable label="work areas" rows={WORK} cols={workCols} chips={TREND_CHIPS} ph={4} />
      </section>
      <section className={`field ${s.abs} ${s.hero}`} style={box(1056, 110, 520, 420)} aria-label={KOMATSU.name}>
        <Site idp={`${p}-site`} yellow={false} className={s.abs} style={{ left: -10, top: 10, width: 540, height: 386 }} />
        <KomatsuCard x={40} y={60} />
      </section>
      <GaugeCard k="details" x={1056} y={546} w={164} h={190} idp={p} />
      <GaugeCard k="notes" x={1232} y={546} w={164} h={190} idp={p} />
      <GaugeCard k="material" x={1408} y={546} w={168} h={190} idp={p} />
      <CutFillCard stack x={1056} y={752} w={520} h={224} chartW={472} />
    </div>
  );
}
