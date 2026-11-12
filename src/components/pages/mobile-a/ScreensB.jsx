'use client';
// Screens 4 to 9: extensions in the same language, built only from the case study's labels and figures.
import { useState } from 'react';
import Icon from '@/components/site/Icon';
import { tickBars, ruler, r2 } from '@/lib/charts';
import { clamp } from '@/lib/site';
import { KPI, KOMATSU, VOLUME, FEATURES } from '@/lib/brand';
import { StatusBar, InnerHead, GaugeCard, AxisRow, SiteG, TimelineG } from './shared';
import { Board } from './ScreensA';
import s from './mobile-a.module.css';

const COUNT = 48;
const STEP = 1 / COUNT;

function Tri({ cls }) {
  return <i className={`${s.tri} ${cls}`} />;
}

// A tick-bar chart with a range handle that can be dragged (pointer) or moved with the arrow keys.
function DragChart({ idp, w, h, live }) {
  const [rng, setRng] = useState([0.33, 0.6]);
  const [a, b] = rng;
  const bars = tickBars(COUNT, w, a, b, 0.52);
  const on = bars.filter((x) => x.on);
  const x0 = on.length ? on[0].x : 0;
  const x1 = on.length ? on[on.length - 1].x + on[on.length - 1].w : 0;
  const hy = h + 21;

  const move = (which, f) => {
    const v = Math.round(clamp(f, 0, 1) / STEP) * STEP;
    setRng(([lo, hi]) => (which === 0 ? [Math.min(v, hi - 3 * STEP), hi] : [lo, Math.max(v, lo + 3 * STEP)]));
  };
  const onPointer = (which) => (e) => {
    if (e.type === 'pointerdown') e.currentTarget.setPointerCapture(e.pointerId);
    else if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    const box = e.currentTarget.ownerSVGElement.getBoundingClientRect();
    move(which, (e.clientX - box.left) / box.width);
  };
  const onKey = (which) => (e) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    e.stopPropagation();
    move(which, (which === 0 ? a : b) + d * STEP);
  };
  const hand = (which, x, label) => {
    const props = live ? { role: 'slider', tabIndex: 0, 'aria-label': label, 'aria-valuemin': 0, 'aria-valuemax': COUNT, 'aria-valuenow': Math.round((which === 0 ? a : b) / STEP), onKeyDown: onKey(which) } : {};
    return (
      <g key={which} className={live ? s.hand : undefined} {...props} onPointerDown={live ? onPointer(which) : undefined} onPointerMove={live ? onPointer(which) : undefined}>
        <rect x={x - 16} y={hy - 16} width="32" height="32" fill="transparent" />
        <rect x={x - 5} y={hy - 4} width="10" height="8" rx="1" fill="#FFB83D" />
      </g>
    );
  };
  return (
    <svg className={s.chartSvg} width={w} height={h + 60} viewBox={`0 0 ${w} ${h + 60}`}>
      <defs>
        <linearGradient id={`${idp}-off`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#CFCFCF" /><stop offset="1" stopColor="#CFCFCF" stopOpacity="0" /></linearGradient>
        <linearGradient id={`${idp}-on`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFB83D" /><stop offset="1" stopColor="#FFB83D" stopOpacity="0" /></linearGradient>
      </defs>
      {bars.map((x, i) => (
        <rect key={i} x={x.x} y="0" width={x.w} height={h} fill={`url(#${idp}-${x.on ? 'on' : 'off'})`} className="rise" style={{ '--i': i }} />
      ))}
      <path d={ruler(COUNT * 2, w).map((t) => `M${t} ${h + 14}v14`).join('')} stroke="#C4C4C4" strokeWidth="1" />
      <path d={`M${x0} ${hy}H${x1}`} stroke="#FFB83D" strokeWidth="1.4" />
      {hand(0, x0 + 3, 'Range start')}
      {hand(1, x1 - 3, 'Range end')}
      <AxisRow w={w} y={h + 54} />
    </svg>
  );
}

// 4. 2D Cross Section Z (ft), detail
export function Screen4({ p, live }) {
  const k = KPI.cross;
  return (
    <Board>
      <StatusBar />
      <InnerHead />
      <div className={s.card2} style={{ top: 150, height: 470 }}>
        <div className={s.crossHead}><span>{k.label}</span><Icon name="arrow-up-right" size={16} /></div>
        <div className={s.crossMeta}>
          <strong>{k.value}</strong>{k.trend}<Tri cls={s.triUp} />
          <span className={s.legend}>
            <svg width="34" height="8" viewBox="0 0 34 8" aria-hidden="true"><path d="M5 4h24" stroke="#FFB83D" strokeWidth="1.2" /><rect x="0" y="0.5" width="9" height="7" rx="1" fill="#FFB83D" /><rect x="25" y="0.5" width="9" height="7" rx="1" fill="#FFB83D" /></svg>
            {k.legend}
          </span>
        </div>
        <div className={s.chartAt} style={{ top: 120 }}><DragChart idp={`${p}-s4`} w={310} h={240} live={live} /></div>
      </div>
    </Board>
  );
}

// 5. Timeline
export function Screen5() {
  return (
    <Board>
      <StatusBar />
      <InnerHead />
      <div className={s.card2} style={{ top: 150, height: 560 }}>
        <div className={s.crossHead}><span>Timeline</span><Icon name="arrow-up-right" size={16} /></div>
        <svg className={s.chartAt} style={{ top: 70 }} width="310" height="450" viewBox="0 0 310 450" aria-hidden="true"><TimelineG /></svg>
      </div>
    </Board>
  );
}

// 6. Work areas: the site drawing with pins, the Komatsu card as a bottom sheet
export function Screen6() {
  return (
    <Board>
      <StatusBar />
      <InnerHead />
      <svg className={s.abs} style={{ left: 0, top: 140, maxWidth: 'none' }} width="390" height="460" viewBox="0 0 390 460" aria-hidden="true">
        <SiteG x={-110} y={30} scale={1.08} />
      </svg>
      <div className={s.sheet}>
        <div className={s.gcHead} style={{ top: 28 }}><span>{KOMATSU.name}</span><Icon name="arrow-right" size={18} /></div>
        <div className={s.cfDate} style={{ top: 58 }}>{KOMATSU.dates}</div>
        <div className={s.sheetVal}>{KOMATSU.value}</div>
        <div className={s.sheetBar}><i style={{ width: KOMATSU.value }} /></div>
      </div>
    </Board>
  );
}

// 7. Details
export function Screen7() {
  const k = KPI.details;
  return (
    <Board>
      <StatusBar />
      <InnerHead />
      <GaugeCard title={k.label} value={k.value} trend={k.trend} dir="up" tone="blue" w={350} h={200} r={150} pos={{ left: 20, top: 150 }} />
      <ul className={`${s.rows} ${s.listCard}`} style={{ top: 370 }}>
        {FEATURES.rows.map(([t, d], i) => (
          <li key={t} style={{ '--i': i }}>
            <b>{i + 1}</b>
            <span><strong>{t}</strong><small>{d}</small></span>
            <Icon name="arrow-right" size={16} />
          </li>
        ))}
      </ul>
    </Board>
  );
}

// 8. Notes: the case study prints no note text, so the rows are quiet placeholder bars
export function Screen8() {
  const k = KPI.notes;
  const wid = [78, 56, 70, 48, 64];
  return (
    <Board>
      <StatusBar />
      <InnerHead />
      <GaugeCard title={k.label} value={k.value} trend={k.trend} dir="down" tone="yellow" w={350} h={200} r={150} pos={{ left: 20, top: 150 }} />
      <ul className={`${s.rows} ${s.listCard}`} style={{ top: 370 }}>
        {wid.map((w, i) => (
          <li key={i} className={s.ph} style={{ '--i': i }}>
            <span className={s.tile36}><Icon name="note" size={18} /></span>
            <span className={s.bars}><i style={{ width: `${w}%` }} /><i style={{ width: `${w - 30}%` }} /></span>
            <span />
          </li>
        ))}
      </ul>
    </Board>
  );
}

// 9. Material
export function Screen9() {
  const k = KPI.material;
  return (
    <Board>
      <StatusBar />
      <InnerHead />
      <GaugeCard title={k.label} value={k.value} trend={k.trend} dir="up" tone="blue" w={350} h={200} r={150} legend={k.legend} pos={{ left: 20, top: 150 }} />
      <div className={s.card2} style={{ top: 370, height: 110 }}>
        <div className={s.crossMeta} style={{ top: 22, justifyContent: 'space-between', fontSize: 14 }}>
          <span>{VOLUME.from}</span><Icon name="arrow-right" size={16} /><span>{VOLUME.to}</span>
        </div>
        <svg className={s.chartAt} style={{ top: 58 }} width="310" height="20" viewBox="0 0 310 20" aria-hidden="true">
          <rect width="310" height="18" rx="2" fill="#DFDFDF" />
          {Array.from({ length: VOLUME.segments }, (_, i) => {
            const sw = (310 - 8 - 3 * 7) / 8;
            return <rect key={i} x={r2(4 + i * (sw + 3))} y="4" width={r2(sw)} height="10" rx="1" fill={i < VOLUME.filled ? '#4093EC' : '#FFFFFF'} fillOpacity={i < VOLUME.filled ? 1 : 0.8} className={i < VOLUME.filled ? 'grow-x' : undefined} style={{ '--i': i }} />;
          })}
        </svg>
      </div>
    </Board>
  );
}
