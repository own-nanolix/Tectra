'use client';
// Screens 4 to 9: extensions in the same language, built only from the case study's labels and figures.
import { useState } from 'react';
import Icon from '@/components/site/Icon';
import { tickBars, ruler, r2 } from '@/lib/charts';
import { clamp } from '@/lib/site';
import { KPI, KOMATSU, VOLUME } from '@/lib/brand';
import { StatusBar, InnerHead, TabBar, GaugeCard, GaugeBody, AxisRow, SiteG, TimelineG, HALF } from './shared';
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

// 7. Details: one dial screen. The figure is set large, the arc spans the whole card, and the two other
// project figures sit as a pair of glass-free tiles under it.
export function Screen7() {
  const k = KPI.details;
  const o = KPI.overall;
  return (
    <Board>
      <StatusBar />
      <InnerHead />
      <div className={s.card2} style={{ top: 147, height: 430 }}>
        <svg className={s.gcSvg} viewBox="0 0 367 430" aria-hidden="true"><GaugeBody w={367} h={430} r={300} c={[372, 420]} value={0.76} tone="blue" /></svg>
        <div className={s.crossHead}><span>{k.label}</span><Icon name="arrow-up-right" size={16} /></div>
        <div className={s.dialFig}>{k.value}</div>
        <div className={s.dialTrend}>{k.trend}<Tri cls={s.triUp} /></div>
      </div>
      <div className={s.pair}>
        <div className={s.pairTile}>
          <span>{o.label}</span>
          <strong>{o.value}</strong>
          <em>{o.trend}<Tri cls={s.triUp} /></em>
        </div>
        <div className={s.pairTile}>
          <span>{KOMATSU.name}</span>
          <strong>{KOMATSU.value}</strong>
          <em>{KOMATSU.dates}</em>
        </div>
      </div>
    </Board>
  );
}

// 8. Notes: a list screen. The case study prints no note text, so each note is a quiet placeholder bar; a
// compact header carries the figure and a yellow track; a yellow add button floats over the tab bar.
export function Screen8() {
  const k = KPI.notes;
  const wid = [78, 56, 70, 48, 64, 58];
  return (
    <Board>
      <StatusBar />
      <InnerHead />
      <div className={s.notesHead}>
        <span className={s.notesTitle}>{k.label}</span>
        <span className={s.notesFig}><em>{k.trend}<Tri cls={s.triDown} /></em><strong>{k.value}</strong></span>
        <span className={s.notesTrack}><i style={{ width: k.value }} /></span>
      </div>
      <ul className={s.noteList}>
        {wid.map((w, i) => (
          <li key={i} style={{ '--i': i }}>
            <span className={s.noteMark} data-on={i === 0} />
            <span className={s.bars}><i style={{ width: `${w}%` }} /><i style={{ width: `${w - 30}%` }} /></span>
          </li>
        ))}
      </ul>
      <span className={s.fab} aria-hidden="true"><Icon name="plus" size={24} /></span>
      <TabBar active={4} />
    </Board>
  );
}

// 9. Material: a split screen. A tall 8-segment volume meter fills from the bottom in the left column; the
// Material half card and its status tile stack in the right column.
const SEG = VOLUME.segments;
const SEG_H = 52, SEG_GAP = 6, METER_H = SEG * (SEG_H + SEG_GAP) + 6;
export function Screen9() {
  const k = KPI.material;
  return (
    <Board>
      <StatusBar />
      <InnerHead />
      <div className={s.meter}>
        <span>{VOLUME.to}</span>
        <svg width="110" height={METER_H} viewBox={`0 0 110 ${METER_H}`} aria-hidden="true">
          <rect width="110" height={METER_H} rx="4" fill="#DFDFDF" />
          {Array.from({ length: SEG }, (_, i) => {
            const on = i < VOLUME.filled;
            const y = r2(6 + (SEG - 1 - i) * (SEG_H + SEG_GAP));
            return <rect key={i} x="6" y={y} width="98" height={SEG_H} rx="2" fill={on ? '#4093EC' : '#FFFFFF'} fillOpacity={on ? 1 : 0.7} className={on ? 'fade-in' : undefined} style={{ '--i': SEG - i }} />;
          })}
        </svg>
        <span>{VOLUME.from}</span>
      </div>
      <GaugeCard title={k.label} value={k.value} trend={k.trend} dir="up" tone="blue" {...HALF} pos={{ left: 197, top: 149 }} />
      <div className={s.status2}>
        <i />{k.legend}
      </div>
    </Board>
  );
}
