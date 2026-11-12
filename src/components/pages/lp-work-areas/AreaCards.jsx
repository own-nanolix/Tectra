import { GaugeG } from '@/components/art/KeyArt';
import Icon from '@/components/site/Icon';
import CountUp from '@/components/site/CountUp';
import Chip, { Trend } from '@/components/ui/Chip';
import { segments } from '@/lib/charts';
import { CARDS, TRIOS } from './data';
import s from './lp-work-areas.module.css';

function Seg({ n, filled }) {
  return (
    <svg viewBox="0 0 320 10" className={s.segs} aria-hidden="true">
      {segments(n, 320, filled, 6).map((g, i) => (
        <rect key={i} x={g.x} y="0" width={g.w} height="10" rx="1" fill={g.on ? '#4093EC' : '#DFDFDF'} className="grow-x" style={{ '--i': i }} />
      ))}
    </svg>
  );
}

// The 3-up for the selected pin. The cards are keyed by pin so the gauges draw again on every change.
export default function AreaCards({ sel }) {
  return (
    <div className={`grid cols-3 ${s.areas}`} key={sel}>
      {TRIOS[sel].map((id, i) => {
        const c = CARDS[id];
        return (
          <article key={id} className={`card-app ${s.area} ${i === 0 ? s.areaMain : ''}`} style={{ '--i': i }}>
            <div className="card-head">
              <h3 className="t-title">{c.label}</h3>
              <Icon name="arrow-up-right" size={18} />
            </div>
            {c.trend && <Trend dir={c.dir}>{c.trend}</Trend>}
            {c.sub && <p className="t-small">{c.sub}</p>}
            <p className={`t-figure ${s.areaFigure}`}><CountUp value={c.value} /></p>
            {c.chip && <Chip tone="blue" size="sm">{c.chip}</Chip>}
            {c.segs && <Seg n={c.segs[0]} filled={c.segs[1]} />}
            {c.bar !== undefined && (
              <svg viewBox="0 0 320 10" className={s.segs} aria-hidden="true">
                <rect width="320" height="10" rx="1" fill="#DFDFDF" />
                <rect width={Math.max(4, 320 * c.bar)} height="10" rx="1" fill={c.tone === 'yellow' ? '#FFB83D' : '#4093EC'} className="grow-x" />
              </svg>
            )}
            {c.gauge !== undefined && (
              <svg viewBox="0 0 340 236" className={s.cardGauge} preserveAspectRatio="xMaxYMax slice" aria-hidden="true">
                <GaugeG w={340} h={236} r={150} value={c.gauge} tone={c.tone} track="#CFCFCF" draw />
              </svg>
            )}
          </article>
        );
      })}
    </div>
  );
}
