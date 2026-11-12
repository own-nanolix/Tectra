import Art from '@/components/art/Art';
import Card from '@/components/ui/Card';
import { Trend } from '@/components/ui/Chip';
import Tabs from '@/components/ui/Tabs';
import Icon from '@/components/site/Icon';
import CountUp from '@/components/site/CountUp';
import Reveal from '@/components/site/Reveal';
import { KPI, CUT_FILL, RESULTS, INSIGHTS } from '@/lib/brand';
import { linePath, seeded, r2, AXIS } from '@/lib/charts';
import ChartFrame from './ChartFrame';
import { Ticks, KpiGauge } from './ChartsA';
import { C } from './parts';
import s from './dataviz.module.css';

// Four stat cards: the figure is large and Light, the trend carries the brand triangle.
export function StatCards() {
  const cards = [
    { title: KPI.overall.label, value: KPI.overall.value, trend: KPI.overall.trend, dir: 'up' },
    { title: KPI.cross.label, value: KPI.cross.value, trend: KPI.cross.trend, dir: 'up' },
    { title: KPI.progress.label, value: KPI.progress.value, trend: KPI.progress.trend, dir: 'down' },
    { title: RESULTS[2].label, value: RESULTS[2].value },
  ];
  return (
    <div className={s.quad}>
      {cards.map((c, i) => (
        <Reveal key={c.title} delay={i * 60}>
          <Card variant="app" title={c.title} arrow level="h3" className={s.stat}>
            <p className="t-figure" style={{ marginTop: 28 }}>{c.value}</p>
            {c.trend && <p style={{ marginTop: 10 }}><Trend dir={c.dir}>{c.trend}</Trend></p>}
          </Card>
        </Reveal>
      ))}
    </div>
  );
}

// Three KPI tiles, each one exportable SVG with the quarter-arc gauge.
export function KpiTiles() {
  const tiles = [
    { k: KPI.details, tone: 'blue', name: 'details' },
    { k: KPI.notes, tone: 'yellow', name: 'notes' },
    { k: KPI.material, tone: 'blue', name: 'material' },
  ];
  return (
    <div className={s.trio}>
      {tiles.map((t, i) => (
        <Reveal key={t.name} delay={i * 80}>
          <ChartFrame flow><KpiGauge k={t.k} tone={t.tone} idp={`dataviz-kpi-${t.name}`} name={`dataviz-kpi-${t.name}`} /></ChartFrame>
        </Reveal>
      ))}
    </div>
  );
}

// Sparkline in the shape of the trend direction; the points carry no labelled values.
function Spark({ k, dir, seed }) {
  const rnd = seeded(seed);
  const n = 9;
  const pts = Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1), base = dir === 'up' ? 1 - t : t;
    return [r2(6 + t * 108), r2(8 + base * 20 + (i === 0 || i === n - 1 ? 0 : (rnd() - 0.5) * 7))];
  });
  const [lx, ly] = pts[n - 1];
  const col = dir === 'up' ? C.blue : C.ink;
  return (
    <Art viewBox="0 0 126 36" title={`Sparkline, trend ${dir}`} exportName={`dataviz-spark-${k}`} decorative className={s.spark}>
      <path d={linePath(pts)} fill="none" stroke={col} strokeWidth="1.5" strokeLinejoin="miter" pathLength="1000" className="draw" />
      <circle cx={lx} cy={ly} r="4" fill={C.paper} stroke={dir === 'up' ? C.yellow : C.red} strokeWidth="2" className="pop" />
    </Art>
  );
}

// Data table: the six KPI rows with label, value, trend and a sparkline.
export function DataTable() {
  const rows = Object.entries(KPI);
  return (
    <div className={s.tablewrap}>
      <table className={s.table}>
        <caption className="sr-only">The six KPI rows of the case study</caption>
        <thead>
          <tr><th scope="col">Measure</th><th scope="col">Value</th><th scope="col">Trend</th><th scope="col">Shape</th></tr>
        </thead>
        <tbody>
          {rows.map(([key, k], i) => (
            <tr key={key}>
              <th scope="row">{k.label}</th>
              <td className={s.num}>{k.value}</td>
              <td><Trend dir={k.dir}>{k.trend}</Trend></td>
              <td><Spark k={key} dir={k.dir} seed={i + 3} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Two live counters.
export function Counters() {
  const items = [CUT_FILL.indicators[0], CUT_FILL.indicators[2]];
  return (
    <div className={s.pair}>
      {items.map(([label, value]) => (
        <div key={label} className={s.counter}>
          <p className="t-label">{label}</p>
          <p className="t-figure" aria-live="off"><CountUp value={value} /></p>
        </div>
      ))}
    </div>
  );
}

// Legend: swatch and word, using the legends the case study prints.
export function Legend() {
  const items = [[KPI.cross.legend, C.blue], [KPI.progress.legend, C.yellow], [KPI.material.legend, C.sky]];
  return (
    <ul className={s.legend} aria-label="Legend">
      {items.map(([label, col]) => (
        <li key={label}><span className={s.swatch} style={{ background: col }} aria-hidden="true" />{label}</li>
      ))}
    </ul>
  );
}

// A static tooltip, shown at full size so its anatomy can be read.
export function TooltipSample() {
  return (
    <div className={s.tipDemo}>
      <span className={s.tipStatic}>{KPI.details.label} {KPI.details.value}</span>
      <span className={s.tipDot} aria-hidden="true" />
    </div>
  );
}

// Chart tabs: the shared Tabs switch the tick-bar chart between the three insights.
export function InsightTabs() {
  const tabs = INSIGHTS.map((ins) => ({
    id: `i${ins.value.replace('%', '')}`,
    label: ins.value,
    content: (
      <div className={s.tabplot}>
        <ChartFrame flow><Ticks insight={ins} idp={`dataviz-insight-${ins.value.replace('%', '')}`} name={`dataviz-insight-${ins.value.replace('%', '')}`} /></ChartFrame>
        <p className="t-small" style={{ marginTop: 8 }}>{ins.value} {ins.label}</p>
      </div>
    ),
  }));
  return <Tabs id="dataviz-insights" label="User insights" tone="blue" tabs={tabs} />;
}

// Loading, empty and error: quiet tiles.
export function States() {
  return (
    <div className={s.trio}>
      <div className={s.state} aria-busy="true">
        <div className={s.skelBars} aria-hidden="true">
          {[34, 52, 40, 64, 48, 72].map((h, i) => <span key={i} className="skeleton" style={{ height: `${h}%` }} />)}
        </div>
        <p className="t-label">Loading</p>
      </div>
      <div className={s.state}>
        <Icon name="chart" size={28} />
        <p className="t-label">No data</p>
      </div>
      <div className={s.state} role="alert">
        <Icon name="alert" size={28} />
        <p className="t-label">Could not load</p>
      </div>
    </div>
  );
}

const RULES = [
  'Bars fade downward, from full colour to nothing.',
  'One accent colour to a chart: blue marks progress, yellow marks attention.',
  'Red appears only as the triangle of a falling trend.',
  'Figures are Light and large; labels are small and quiet.',
  'Lines are straight and angular, markers are rings, ranges have handles.',
  `The axis keeps the designer's order: ${AXIS.join(' ')}.`,
];

// Rules as a numbered column down the right edge.
export function Rules() {
  return (
    <aside className={s.rules} aria-labelledby="dataviz-rules-title">
      <h2 id="dataviz-rules-title" className="t-caps">Chart rules</h2>
      <ol>
        {RULES.map((r, i) => (
          <Reveal as="li" key={i} delay={i * 50}>
            <span className={s.ruleNo} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <span className={s.ruleText}>{r}</span>
          </Reveal>
        ))}
      </ol>
    </aside>
  );
}
