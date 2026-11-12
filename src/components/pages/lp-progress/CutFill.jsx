'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import Tabs from '@/components/ui/Tabs';
import { Hl } from '@/components/ui/Card';
import { Trend } from '@/components/ui/Chip';
import Reveal from '@/components/site/Reveal';
import CountUp from '@/components/site/CountUp';
import { AXIS, axisLabels, r2, ruler } from '@/lib/charts';
import { CUT_FILL, HEX, KPI, MOBILE_SCREENS } from '@/lib/brand';
import Seen from './Seen';
import s from './styles';

const MARKERS = [
  { kind: 'cut', label: CUT_FILL.bottom[0] },
  { kind: 'fill', label: CUT_FILL.top[0] },
  { kind: 'cut', label: CUT_FILL.bottom[1] },
  { kind: 'fill', label: CUT_FILL.top[1] },
  { kind: 'cut', label: CUT_FILL.bottom[2] },
  { kind: 'fill', label: CUT_FILL.top[2] },
];
const KEYS = ['cut', 'fill', 'net'];

function Instrument({ pick }) {
  return (
    <Art viewBox="0 0 900 200" title="Cut and Fill instrument: yellow cut markers alternate with blue fill markers" exportName="lp-progress-cutfill" className={s.instArt}>
      {MARKERS.map((m, i) => {
        const cx = 75 + i * 150;
        const cut = m.kind === 'cut';
        const col = cut ? HEX.yellow : HEX.blue;
        const lit = pick === 'net' || pick === m.kind ? 1 : 0.18;
        return (
          <g key={i} opacity={lit}>
            <g opacity={1 - Math.floor(i / 2) * 0.28}>
              <rect x={cx - 50} y={cut ? 40 : 150} width="100" height="7" fill={col} className="grow-x" style={{ '--i': i }} />
              <path d={cut ? `M${cx} 47V140` : `M${cx} 150V60`} stroke={col} strokeWidth="2" className="draw" pathLength="1" style={{ '--len': 1, '--i': i }} />
            </g>
            <text x={cx} y={cut ? 170 : 30} fontSize="18" fill={HEX.ink} textAnchor="middle">{m.label}</text>
          </g>
        );
      })}
    </Art>
  );
}

// The "Progres" instrument: a blue run then grey ticks, with the axis in the designer's order.
function Distance() {
  const [hot, setHot] = useState(null);
  const W = 900;
  const N = 100;
  const on = 24;
  return (
    <div>
      <div className={s.distHead}>
        <CountUp value={KPI.progress.value} className="t-figure" />
        <Trend dir="down">{KPI.progress.trend}</Trend>
        <span className="t-small">{KPI.progress.date}</span>
      </div>
      <div className={s.distWrap} onPointerLeave={() => setHot(null)} onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setHot(Math.max(0, Math.min(N - 1, Math.floor(((e.clientX - r.left) / r.width) * N))));
      }}>
        <Art viewBox={`0 0 ${W} 74`} title="Progres: 24 percent of the distance" exportName="lp-progress-distance">
          {ruler(N - 1, W - W / N).map((x, i) => (
            <rect key={i} x={r2(x)} y={i < on ? 8 : 6} width="3" height={i < on ? 8 : 12} fill={i < on ? HEX.blue : '#BDBDBD'} opacity={hot === i ? 1 : i < on ? 1 : 0.7} />
          ))}
          <path d={`M0 11H${W * 0.24}`} stroke={HEX.blue} strokeWidth="3" className="grow-x" />
          {axisLabels(W).map((a, i, all) => (
            <text key={i} x={a.x} y="50" fontSize="13" fill={HEX.muted} textAnchor={i === 0 ? 'start' : i === all.length - 1 ? 'end' : 'middle'}>{a.label}</text>
          ))}
          <path d={`M0 66H34`} stroke={HEX.blue} strokeWidth="1.5" />
        </Art>
      </div>
      <p className="t-small" aria-live="polite">{KPI.progress.legend}{hot !== null ? `: ${AXIS[Math.round((hot / (N - 1)) * (AXIS.length - 1))]}` : ''}</p>
    </div>
  );
}

// Section 3: the Cut and Fill instrument with its Indicators as tabs.
export default function CutFill() {
  const [tab, setTab] = useState('net');
  const m = MOBILE_SCREENS[2];
  const tabs = CUT_FILL.indicators.map(([k, v], i) => ({
    id: KEYS[i],
    label: k.replace(':', ''),
    content: (
      <p className={s.indFig}>
        <CountUp value={v} className={s.big} />
      </p>
    ),
  }));
  return (
    <section className={`${s.band} ${s.tileBand}`} aria-labelledby="lp-progress-cutfill-h">
      <div className="wrap-narrow">
        <Reveal className={s.head}>
          <h2 id="lp-progress-cutfill-h" className="t-display t-balance t-center"><Hl text={m.title} hl="Cut and Fill" /></h2>
          <p className="t-lead muted t-center">{m.text}</p>
        </Reveal>
        <Reveal delay={60}>
          <div className={`card ${s.inst}`}>
            <h3 className="t-title">{CUT_FILL.title}</h3>
            <p className="t-small">{CUT_FILL.date}</p>
            <Instrument pick={tab} />
            <Tabs id="lp-progress-ind" label="Indicators" tabs={tabs} value={tab} onChange={setTab} tone="blue" className={s.indTabs} />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <Seen className={`card ${s.inst} ${s.second}`}>
            <h3 className="t-title">{KPI.progress.label}</h3>
            <Distance />
          </Seen>
        </Reveal>
      </div>
    </section>
  );
}
