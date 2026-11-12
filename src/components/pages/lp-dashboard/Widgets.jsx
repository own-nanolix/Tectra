'use client';

import { useRef, useState } from 'react';
import Art from '@/components/art/Art';
import { TickBarsG, GaugeG } from '@/components/art/KeyArt';
import { Trend } from '@/components/ui/Chip';
import Icon from '@/components/site/Icon';
import CountUp from '@/components/site/CountUp';
import { AXIS, axisLabels, r2 } from '@/lib/charts';
import { HEX, KPI, VOLUME, CUT_FILL } from '@/lib/brand';
import { clamp } from '@/lib/site';
import { AreaChart, AREA } from './Charts';
import s from './styles';

/* ---------- 2D Cross Section: the tick-bar card with a draggable range ---------- */
const COUNT = 48;
const SPAN = 10;
const TW = 560;
const TH = 70;

export function TickCard() {
  const [lo, setLo] = useState(19);
  const [hover, setHover] = useState(null);
  const drag = useRef(false);
  const max = COUNT - SPAN;
  const label = (i) => AXIS[clamp(Math.round((i / COUNT) * (AXIS.length - 1)), 0, AXIS.length - 1)];
  const at = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    return (e.clientX - r.left) / r.width;
  };
  const move = (e) => {
    const t = at(e);
    if (drag.current) setLo(clamp(Math.round(t * COUNT - SPAN / 2), 0, max));
    else setHover(clamp(Math.floor(t * COUNT), 0, COUNT - 1));
  };
  const key = (e) => {
    const step = { ArrowLeft: -1, ArrowDown: -1, ArrowRight: 1, ArrowUp: 1, Home: -99, End: 99 }[e.key];
    if (!step) return;
    e.preventDefault();
    setLo((v) => clamp(v + step, 0, max));
  };
  const barW = TW / COUNT;
  return (
    <div className={`card-app ${s.tick}`}>
      <div className="card-head">
        <h3 className="t-title">{KPI.cross.label}</h3>
        <Icon name="arrow-up-right" size={18} />
      </div>
      <p className={s.figRow}>
        <CountUp value={KPI.cross.value} className="t-figure" />
        <Trend dir="up">{KPI.cross.trend}</Trend>
      </p>
      <div className={s.tickWrap}>
        <Art viewBox={`0 0 ${TW} 124`} title="2D Cross Section tick-bar chart with a range handle" exportName="lp-dashboard-tickbar">
          <TickBarsG idp="lp-dashboard-tick" w={TW} h={TH} count={COUNT} from={lo / COUNT} to={(lo + SPAN) / COUNT} tone="yellow" rise />
          {hover !== null && <rect x={r2(hover * barW)} y="0" width={r2(barW)} height={TH + 30} fill={HEX.ink} opacity="0.12" />}
          {axisLabels(TW).map((a, i, all) => (
            <text key={i} x={a.x} y="118" fontSize="11" fill={HEX.muted} textAnchor={i === 0 ? 'start' : i === all.length - 1 ? 'end' : 'middle'}>
              {a.label}
            </text>
          ))}
        </Art>
        <div
          className={s.tickSlider}
          role="slider"
          tabIndex={0}
          aria-label="Range"
          aria-orientation="horizontal"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={lo}
          aria-valuetext={`${label(lo)} to ${label(lo + SPAN)}`}
          onKeyDown={key}
          onPointerDown={(e) => {
            drag.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            setLo(clamp(Math.round(at(e) * COUNT - SPAN / 2), 0, max));
          }}
          onPointerMove={move}
          onPointerUp={() => { drag.current = false; }}
          onPointerCancel={() => { drag.current = false; }}
          onPointerLeave={() => setHover(null)}
        />
      </div>
      <p className={s.read} aria-live="polite">
        <span className={s.legend}>
          <svg viewBox="0 0 24 8" width="24" height="8" aria-hidden="true"><path d="M0 4H24" stroke={HEX.yellow} strokeWidth="1.2" /><rect x="0" y="1" width="7" height="6" fill={HEX.yellow} /><rect x="17" y="1" width="7" height="6" fill={HEX.yellow} /></svg>
          {KPI.cross.legend}
        </span>
        <span>Range {label(lo)} - {label(lo + SPAN)}</span>
        {hover !== null && <span>Cursor {label(hover)}</span>}
      </p>
    </div>
  );
}

/* ---------- Details / Notes / Material: quarter-arc gauge cards ---------- */
export function GaugeCard({ item, exportName, className = '' }) {
  const [n, setN] = useState(0);
  const val = parseInt(item.value, 10) / 100;
  const up = item.dir === 'up';
  const bump = () => setN((v) => v + 1);
  return (
    <div className={`card-app ${s.gauge} ${className}`} role="group" aria-label={`${item.label} ${item.value} ${item.trend}`} tabIndex={0} onMouseEnter={bump} onFocus={bump}>
      <div className="card-head">
        <h3 className="t-title">{item.label}</h3>
        <Icon name="arrow-up-right" size={18} />
      </div>
      <div className={s.gaugeBody}>
        <Trend dir={item.dir}>{item.trend}</Trend>
        <CountUp value={item.value} className="t-figure" as="p" />
        {item.legend && (
          <span className={s.legend}>
            <i className="dot" /> {item.legend}
          </span>
        )}
      </div>
      <Art key={n} viewBox="0 0 200 170" title={`${item.label} gauge at ${item.value}, ${up ? 'up' : 'down'} ${item.trend.replace(/^[+-]/, '')}`} exportName={exportName} className={s.gaugeArt}>
        <GaugeG w={200} h={170} r={100} value={val} tone={item.tone} draw />
      </Art>
    </div>
  );
}

/* ---------- Cut and Fill: alternating cut and fill markers with the Indicators ---------- */
const MARKERS = [
  { kind: 'cut', label: CUT_FILL.bottom[0] },
  { kind: 'fill', label: CUT_FILL.top[0] },
  { kind: 'cut', label: CUT_FILL.bottom[1] },
  { kind: 'fill', label: CUT_FILL.top[1] },
  { kind: 'cut', label: CUT_FILL.bottom[2] },
  { kind: 'fill', label: CUT_FILL.top[2] },
];

export function CutFillCard() {
  const [pick, setPick] = useState(null);
  const [hover, setHover] = useState(null);
  const names = ['cut', 'fill', 'net'];
  const lit = (m) => (pick === null || pick === 'net' || pick === m.kind ? 1 : 0.2);
  return (
    <div className={`card-app ${s.cutfill}`}>
      <div className="card-head">
        <div>
          <h3 className="t-title">{CUT_FILL.title}</h3>
          <p className="t-small">{CUT_FILL.date}</p>
        </div>
        <Icon name="arrow-up-right" size={18} />
      </div>
      <Art viewBox="0 0 480 124" title="Cut and Fill markers: yellow cut markers alternate with blue fill markers" exportName="lp-dashboard-cutfill" className={s.cutArt}>
        {MARKERS.map((m, i) => {
          const cx = 40 + i * 80;
          const strength = 1 - Math.floor(i / 2) * 0.28;
          const cut = m.kind === 'cut';
          const col = cut ? HEX.yellow : HEX.blue;
          return (
            <g key={i} opacity={lit(m) * (hover === i ? 1 : 0.92)} onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)}>
              <g opacity={strength}>
                <rect x={cx - 28} y={cut ? 26 : 92} width="56" height="5" fill={col} className="grow-x" style={{ '--i': i }} />
                <path d={cut ? `M${cx} 31V86` : `M${cx} 92V38`} stroke={col} strokeWidth="1.5" />
              </g>
              <text x={cx} y={cut ? 106 : 28} fontSize="13" fill={HEX.ink} textAnchor="middle" fontWeight={hover === i ? 500 : 400}>
                {m.label}
              </text>
              <rect x={cx - 38} y="0" width="76" height="124" fill="transparent" />
            </g>
          );
        })}
      </Art>
      <div className={s.chips} role="group" aria-label="Indicators">
        {CUT_FILL.indicators.map(([k, v], i) => (
          <button key={k} type="button" className={`chip chip-sm ${s.ind}`} aria-pressed={pick === names[i]} onClick={() => setPick(pick === names[i] ? null : names[i])}>
            {k} {v}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Overall Completion: the glass card with the area chart ---------- */
export function CompletionCard() {
  const [idx, setIdx] = useState(null);
  const marker = idx === null ? 10 : idx;
  const filled = idx === null ? VOLUME.filled : Math.max(1, Math.round((idx / (AREA.length - 1)) * VOLUME.segments));
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setIdx(clamp(Math.round(((e.clientX - r.left) / r.width) * (AREA.length - 1)), 0, AREA.length - 1));
  };
  return (
    <div className={`glass ${s.glass}`}>
      <p className={s.overall}>
        Overall <Icon name="chevron-down" size={16} />
      </p>
      <p className={s.glassLabel}>{KPI.overall.label}</p>
      <div className={s.figRow}>
        <CountUp value={KPI.overall.value} className={s.glassFig} />
        <Trend dir="up" className={s.glassTrend}>{KPI.overall.trend}</Trend>
      </div>
      <div className={s.glassChart} onPointerMove={onMove} onPointerLeave={() => setIdx(null)}>
        <AreaChart idp="lp-dashboard-area" exportName="lp-dashboard-completion" title="Overall Completion area chart" marker={marker} />
      </div>
      <div className={s.segs} role="img" aria-label={`${filled} of ${VOLUME.segments} segments filled`}>
        {Array.from({ length: VOLUME.segments }, (_, i) => (
          <span key={i} data-on={i < filled} />
        ))}
      </div>
      <p className={s.vol}>
        <span>{VOLUME.from}</span>
        <span>{VOLUME.to}</span>
      </p>
    </div>
  );
}
