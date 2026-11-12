import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Chip, { Trend } from '@/components/ui/Chip';
import Icon from '@/components/site/Icon';
import Art from '@/components/art/Art';
import { GaugeG } from '@/components/art/KeyArt';
import { FEATURES, EFFICIENCY, PROBLEM, SOLUTION, KPI, PLANS } from '@/lib/brand';
import Shelf, { Line } from './Shelf';
import s from './web-system.module.css';

// A decorative corner gauge: the arc rises out of the card's bottom edge and leaves by its right edge.
function Corner({ tone, value, r = 120 }) {
  return (
    <Art decorative viewBox="0 0 340 236" className={s.gaugeBox}>
      <GaugeG w={340} h={236} r={r} value={value} tone={tone} />
    </Art>
  );
}

export default function CardBench() {
  const plan = PLANS.list[1];
  return (
    <Shelf id="card" title="Feature card" note="Flat, no border, no shadow: #F5F5F5 on the page, #E9E9E9 inside the app. Title top left in Medium, a ↗ top right, a large Light figure and a quarter-arc gauge cut off by the card corner.">
      <Line label="Numbered feature rows">
        <div>
          {FEATURES.rows.map(([t, d], i) => (
            <div key={t} className={s.numRow}>
              <span className={s.num}>{i + 1}</span>
              <div>
                <p className="t-title">{t}</p>
                <p className="t-body muted">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </Line>
      <Line label="Yellow efficiency card">
        <div className="card field-yellow" style={{ maxWidth: 460 }}>
          <p className={s.bigFigure}>{EFFICIENCY.value}</p>
          <p className="t-body" style={{ marginTop: 14, maxWidth: '28ch' }}>{EFFICIENCY.label}</p>
        </div>
      </Line>
      <Line label="Problem and Solution cards with corner arcs">
        <div className={s.cardsGrid}>
          <Card title="Problem" arrow className={s.arcCard}>
            <p className="t-body">{PROBLEM}</p>
            <Corner tone="yellow" value={0.45} />
          </Card>
          <Card title="Solution" arrow className={s.arcCard}>
            <p className="t-body">{SOLUTION}</p>
            <Corner tone="blue" value={0.6} />
          </Card>
        </div>
      </Line>
      <Line label="KPI card (app)">
        <div className={s.cardsGrid}>
          {[KPI.details, KPI.notes].map((k) => (
            <Card key={k.label} variant="app" title={k.label} arrow className={s.kpiCard}>
              <div style={{ marginTop: 10 }}><Trend dir={k.dir}>{k.trend}</Trend></div>
              <p className={s.kpiFig}>{k.value}</p>
              {k === KPI.details && <div style={{ marginTop: 14 }}><Chip size="sm"><span className="dot" aria-hidden="true" />{KPI.material.legend}</Chip></div>}
              <Corner tone={k.tone} value={parseInt(k.value, 10) / 100} r={110} />
            </Card>
          ))}
        </div>
      </Line>
      <Line label="Plan card">
        <Card className="stack" style={{ maxWidth: 460 }}>
          <h3 className="t-h3">{plan.name}</h3>
          <p className="t-body muted">{plan.text}</p>
          <p><span className={s.price}>{plan.price}</span> <span className="t-label">{plan.per}</span></p>
          <ul className={s.planBullets}>
            {plan.bullets.map((b) => (
              <li key={b}><Icon name="check" size={18} />{b}</li>
            ))}
          </ul>
          <Button variant="dark" block>{plan.cta}</Button>
        </Card>
      </Line>
    </Shelf>
  );
}
