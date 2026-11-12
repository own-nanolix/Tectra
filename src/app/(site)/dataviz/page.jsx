import { pageMeta } from '@/lib/pages';
import Chip from '@/components/ui/Chip';
import { Hl } from '@/components/ui/Card';
import Reveal from '@/components/site/Reveal';
import { Cell } from '@/components/pages/dataviz/parts';
import { Ticks, KpiGauge, CutFill, AreaGlass, Seg8, Seg3, VBar, Mountain, Roadmap, Rings } from '@/components/pages/dataviz/ChartsA';
import { Ranking, Share, DotStrip, Flow, Place, Calendar, Paired, Bullet } from '@/components/pages/dataviz/ChartsB';
import { StatCards, KpiTiles, DataTable, Counters, Legend, TooltipSample, InsightTabs, States, Rules } from '@/components/pages/dataviz/Panels';
import { KPI } from '@/lib/brand';
import s from '@/components/pages/dataviz/dataviz.module.css';

export const metadata = pageMeta('dataviz');

export default function Page() {
  return (
    <section className="page" id="p-dataviz" aria-label="Data visualisation">
      <div className="wrap">
        <header className={s.head}>
          <Chip>Charts</Chip>
          <h1 tabIndex={-1} className="t-display"><Hl text="Data visualisation" hl="visualisation" /></h1>
          <p className="t-lead muted">Sixteen chart types, all drawn from the figures the case study prints. Hover or tab to a mark to read it.</p>
        </header>

        <div className={s.layout}>
          <div className={s.bento}>
            <Cell title="Trend: area" span="w2 h2" note="The glass panel of the site view: one ring marker on the peak, the volume bar under it. The curve follows the source; only the panel figures are published.">
              <AreaGlass />
            </Cell>
            <Cell title="Time: tick bars" span="w2" delay={60} note="Bars fade downward; the band that is on carries a range handle. The axis keeps the designer's order.">
              <Ticks />
            </Cell>
            <Cell title="Corner gauge" delay={100} note="A quarter arc cut by the card corner, a dot where the value ends.">
              <KpiGauge k={KPI.overall} idp="dataviz-gauge" name="dataviz-gauge" />
            </Cell>
            <Cell title="Cut and Fill" delay={140} note="Yellow cut markers alternate with blue fill markers, strongest first.">
              <CutFill />
            </Cell>
            <Cell title="Share: colour rings" span="h2" tall note="Three arcs in the three brand colours; the centre keeps the overall figure.">
              <Rings />
            </Cell>
            <Cell title="Progress: vertical bar" span="h2" tall delay={60} note="Two segments, the filled one fading downward from full blue.">
              <VBar />
            </Cell>
            <Cell title="Trend: mountain" span="w2" delay={100} note="An angular line with ring markers and thin arrows to the figures.">
              <Mountain />
            </Cell>
            <Cell title="Time: roadmap" span="w2" delay={140} note="Yellow range handles on a blue base for what is done, grey ticks for what is next.">
              <Roadmap />
            </Cell>
            <Cell title="Ranking" span="w2 h2" note="Horizontal bars fade to the right and are ordered by value; yellow marks the Notes row.">
              <Ranking />
            </Cell>
            <Cell title="Share: cut and fill" delay={60} note="Two arcs, Cut against Fill, with the net volume in the centre.">
              <Share />
            </Cell>
            <Cell title="Progress: segments" split delay={100} note="Eight segments between the two volumes, and the three-segment form.">
              <Seg8 />
              <Seg3 />
            </Cell>
            <Cell title="Distribution" span="w2" delay={140} note="Every published percentage as a ring on one ruler.">
              <DotStrip />
            </Cell>
            <Cell title="Flow" span="w2" note="Cut divides into Fill and Net as straight-edged bands.">
              <Flow />
            </Cell>
            <Cell title="Place" span="w2 h2" delay={60} note="The cut-away site with its location pins. Only the Komatsu work card has a published value, so only its yellow pin carries one.">
              <Place />
            </Cell>
            <Cell title="Time: calendar" span="w2" delay={100} note="The Komatsu work dates as a range, and the Cut and Fill date apart.">
              <Calendar />
            </Cell>
            <Cell title="Comparison" span="w2" note="Two insights side by side on the same tick-bar scale.">
              <Paired />
            </Cell>
            <Cell title="Target: bullet" span="w2" delay={60} note="Measures on a banded ruler, a ring at the end of each bar.">
              <Bullet />
            </Cell>
          </div>
          <Rules />
        </div>

        <div className={s.section}>
          <h2 className="t-h2"><Hl text="Figures at a glance" hl="at a glance" /></h2>
          <StatCards />
          <KpiTiles />
          <Counters />
        </div>

        <div className={s.section}>
          <h2 className="t-h2"><Hl text="The six KPI rows" hl="KPI rows" /></h2>
          <Reveal><DataTable /></Reveal>
        </div>

        <div className={s.section}>
          <h2 className="t-h2"><Hl text="Legend, tooltip and tabs" hl="tabs" /></h2>
          <div className={s.tools}>
            <div className={s.toolcard}>
              <InsightTabs />
            </div>
            <div className={s.toolcard}>
              <h3 className="t-title">Legend</h3>
              <Legend />
              <h3 className="t-title">Tooltip</h3>
              <TooltipSample />
            </div>
          </div>
        </div>

        <div className={s.section}>
          <h2 className="t-h2"><Hl text="Loading, empty and error" hl="empty" /></h2>
          <States />
        </div>
      </div>
    </section>
  );
}
