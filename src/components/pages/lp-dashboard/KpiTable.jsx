'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Art from '@/components/art/Art';
import Chip, { Trend } from '@/components/ui/Chip';
import Icon from '@/components/site/Icon';
import Reveal from '@/components/site/Reveal';
import { ruler } from '@/lib/charts';
import { HEX, KPI, MOBILE_SCREENS } from '@/lib/brand';
import { tMove } from '@/lib/motion';
import s from './styles';

const ROWS = Object.values(KPI).map((k) => ({ ...k, v: parseInt(k.value, 10), t: parseFloat(k.trend) }));
const COLS = [['label', 'Label'], ['v', 'Value'], ['t', 'Trend']];
const SHOW = ['All', 'Up', 'Down'];

// The six KPI rows as a dot plot on one 0 to 100 ruler; the hovered row lights its dot.
function Ruler({ active }) {
  const x0 = 230;
  const w = 740;
  return (
    <Art viewBox="0 0 1000 190" title="The six KPI values on one ruler from 0 to 100" exportName="lp-dashboard-kpi-ruler">
      {ruler(10, w).map((x, i) => (
        <g key={i}>
          <path d={`M${x0 + x} 4V152`} stroke="#DFDFDF" strokeWidth="1" />
          <text x={x0 + x} y="176" fontSize="12" fill={HEX.muted} textAnchor="middle">{i * 10}</text>
        </g>
      ))}
      {ROWS.map((r, i) => {
        const y = 14 + i * 24;
        const on = active === r.label;
        const col = r.dir === 'up' ? HEX.blue : HEX.yellow;
        return (
          <g key={r.label} opacity={active && !on ? 0.4 : 1}>
            <text x="0" y={y + 5} fontSize="14" fill={HEX.ink} fontWeight={on ? 500 : 400}>{r.label}</text>
            <path d={`M${x0} ${y}H${x0 + (r.v / 100) * w}`} stroke={col} strokeWidth="1.5" className="grow-x" style={{ '--i': i }} />
            <circle cx={x0 + (r.v / 100) * w} cy={y} r={on ? 8 : 6} fill="#FFFFFF" stroke={r.dir === 'up' ? HEX.blue : HEX.red} strokeWidth="2.5" className="pop" style={{ '--i': i }} />
          </g>
        );
      })}
    </Art>
  );
}

// Section 5: a sortable table of the six KPI rows.
export default function KpiTable() {
  const [sort, setSort] = useState({ key: 'v', dir: -1 });
  const [show, setShow] = useState('All');
  const [hot, setHot] = useState(null);
  const t = MOBILE_SCREENS[1];
  const rows = ROWS.filter((r) => show === 'All' || r.dir === show.toLowerCase())
    .slice()
    .sort((a, b) => (sort.key === 'label' ? a.label.localeCompare(b.label) : a[sort.key] - b[sort.key]) * sort.dir);
  const pickSort = (key) => setSort((p) => (p.key === key ? { key, dir: -p.dir } : { key, dir: key === 'label' ? 1 : -1 }));
  return (
    <section className={`${s.band} ${s.tileBand}`} aria-labelledby="lp-dashboard-table-h">
      <div className="wrap">
        <Reveal>
          <div className={s.tableHead}>
            <h2 id="lp-dashboard-table-h" className="t-display t-balance">{t.title}</h2>
            <p className="t-lead muted">{t.text}</p>
          </div>
        </Reveal>
        <Reveal delay={60}>
          <Ruler active={hot} />
        </Reveal>
        <Reveal delay={100}>
          <div className={s.tableTools} role="group" aria-label="Show">
            <span className="t-label">Show</span>
            {SHOW.map((o) => (
              <Chip key={o} size="sm" pressed={show === o} onClick={() => setShow(o)}>{o}</Chip>
            ))}
          </div>
          <div className={s.tableScroll}>
            <table className={s.table} aria-label="Six KPI rows, sortable by label, value or trend">
              <thead>
                <tr>
                  {COLS.map(([key, name]) => (
                    <th key={key} scope="col" aria-sort={sort.key === key ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'}>
                      <button type="button" className={s.sortBtn} onClick={() => pickSort(key)} aria-label={`Sort by ${name}`}>
                        {name}
                        <span data-on={sort.key === key} data-dir={sort.dir}>
                          <Icon name="arrow-up" size={16} />
                        </span>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <motion.tr
                    key={r.label}
                    layout="position"
                    transition={tMove}
                    tabIndex={0}
                    data-hot={hot === r.label}
                    onPointerEnter={() => setHot(r.label)}
                    onPointerLeave={() => setHot(null)}
                    onFocus={() => setHot(r.label)}
                    onBlur={() => setHot(null)}
                  >
                    <th scope="row" className="t-title">{r.label}</th>
                    <td className="t-figure">{r.value}</td>
                    <td><Trend dir={r.dir}>{r.trend}</Trend></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
