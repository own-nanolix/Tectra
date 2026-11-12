'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import Reveal from '@/components/site/Reveal';
import Chip, { Trend } from '@/components/ui/Chip';
import { segments } from '@/lib/charts';
import { CUT_FILL, KPI, VOLUME } from '@/lib/brand';
import { CARDS } from './data';
import s from './lp-work-areas.module.css';

const ROWS = [
  { id: 'cut', name: 'Cut', value: CUT_FILL.indicators[0][1], bar: CARDS.cut.bar, col: '#FFB83D' },
  { id: 'fill', name: 'Fill', value: CUT_FILL.indicators[1][1], bar: CARDS.fill.bar, col: '#4093EC' },
  { id: 'net', name: 'Net', value: CUT_FILL.indicators[2][1], bar: CARDS.net.bar, col: '#4093EC' },
  { id: 'volume', name: 'Volume', value: `${VOLUME.from} → ${VOLUME.to}` },
  { id: 'material', name: KPI.material.label, value: KPI.material.value },
];
const BARS = ROWS.slice(0, 3);

export default function Ledger() {
  const [sel, setSel] = useState('net');
  const segs = segments(VOLUME.segments, 160, VOLUME.filled, 4);
  return (
    <section className={`wrap ${s.band}`} aria-labelledby="lp-work-areas-ledger-h">
      <Reveal className={s.headRow}>
        <Chip>{CUT_FILL.title}</Chip>
        <h2 id="lp-work-areas-ledger-h" className="t-h2">Indicators</h2>
      </Reveal>
      <div className={s.ledger}>
        <Reveal className={s.tableWrap}>
          <table className={s.table}>
            <caption className="sr-only">Cut, fill, net, volume and material</caption>
            <thead>
              <tr>
                <th scope="col" className="t-caps">Indicators</th>
                <th scope="col" className="t-caps">Value</th>
                <th scope="col" className="t-caps"><span className="sr-only">Detail</span></th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.id} className={sel === r.id ? s.rowOn : ''}>
                  <th scope="row">
                    <button type="button" className={s.rowBtn} aria-pressed={sel === r.id} onClick={() => setSel(r.id)}>{r.name}</button>
                  </th>
                  <td className={s.num}>{r.value}</td>
                  <td className={s.detail}>
                    {r.id === 'volume' && (
                      <svg viewBox="0 0 160 8" className={s.miniSegs} aria-hidden="true">
                        {segs.map((g, i) => (
                          <rect key={i} x={g.x} width={g.w} height="8" rx="1" fill={g.on ? '#4093EC' : '#DFDFDF'} />
                        ))}
                      </svg>
                    )}
                    {r.id === 'material' && (
                      <span className={s.matCell}>
                        <Trend dir={KPI.material.dir}>{KPI.material.trend}</Trend>
                        <Chip tone="blue" size="sm">{KPI.material.legend}</Chip>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <Reveal delay={90} className={s.ledgerArt}>
          <Art viewBox="0 0 600 220" title="Cut, fill and net volumes compared" exportName="lp-work-areas-ledger-bars">
            {BARS.map((r, i) => {
              const on = sel === r.id;
              return (
                <g key={r.id} transform={`translate(0 ${i * 70})`}>
                  <text x="0" y="22" fontSize="18" fontWeight="500" fill="#2F2F2F">{r.name}</text>
                  <text x="600" y="22" fontSize="18" fontWeight="400" fill="#5E5E5E" textAnchor="end">{r.value}</text>
                  {/* only the bar dims when another row is selected, so the labels keep their contrast */}
                  <g opacity={on || !BARS.some((b) => b.id === sel) ? 1 : 0.4} className={s.barRow}>
                    <rect y="32" width="600" height="14" rx="2" fill="#DFDFDF" />
                    <rect y="32" width={Math.max(6, 600 * r.bar)} height="14" rx="2" fill={r.col} className="grow-x" style={{ '--i': i }} />
                  </g>
                </g>
              );
            })}
          </Art>
        </Reveal>
      </div>
    </section>
  );
}
