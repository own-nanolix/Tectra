'use client';

import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '@/components/site/Icon';
import Button from '@/components/ui/Button';
import Toggle from '@/components/ui/Toggle';
import { GaugeG } from '@/components/art/KeyArt';
import { Trend } from '@/components/ui/Chip';
import { KPI, WORKCARD, NAV } from '@/lib/brand';
import { tickBars } from '@/lib/charts';
import { tMove, tEnter } from '@/lib/motion';
import { Artboard } from './Screens';
import { Scaled, TabBar, TAB_ICONS } from './Parts';
import s from './mobile-b.module.css';

function Strip({ no, title, text, children }) {
  return (
    <article className={s.strip} aria-labelledby={`mobile-b-pattern-${no}`}>
      <div className={s.stripTxt}>
        <div className={s.stripNo} aria-hidden="true">{String(no).padStart(2, '0')}</div>
        <h3 id={`mobile-b-pattern-${no}`}>{title}</h3>
        <p>{text}</p>
      </div>
      <div className={s.demo}>{children}</div>
    </article>
  );
}

function Pull() {
  const [tick, setTick] = useState(0);
  const [busy, setBusy] = useState(false);
  const timer = useRef(null);
  const refresh = () => {
    if (busy) return;
    setBusy(true);
    timer.current = setTimeout(() => { setTick((t) => t + 1); setBusy(false); }, 700);
  };
  useEffect(() => () => clearTimeout(timer.current), []);
  const bars = tickBars(50, 340, 0.33, 0.6, 0.5);
  return (
    <>
      <div className={s.pane}>
        <motion.div className={s.pull} drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={0.6} onDragEnd={(e, i) => { if (i.offset.y > 36) refresh(); }}>
          <Icon name={busy ? 'clock' : 'arrow-down'} size={16} />{busy ? 'Refreshing' : 'Pull down'}
        </motion.div>
        <div className={s.chartBox}>
          <svg viewBox="0 0 340 90" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="mobile-b-pull-on" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4093EC" /><stop offset="1" stopColor="#4093EC" stopOpacity="0" /></linearGradient>
              <linearGradient id="mobile-b-pull-off" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#BDBDBD" /><stop offset="1" stopColor="#BDBDBD" stopOpacity="0" /></linearGradient>
            </defs>
            <g key={tick} opacity={busy ? 0.35 : 1}>
              {bars.map((b, i) => <rect key={i} className="rise" style={{ '--i': i }} x={b.x} y="0" width={b.w} height="90" fill={`url(#mobile-b-pull-${b.on ? 'on' : 'off'})`} />)}
            </g>
          </svg>
        </div>
      </div>
      <Button size="sm" variant="dark" icon="arrow-down" onClick={refresh} disabled={busy}>Refresh</Button>
    </>
  );
}

const SWIPE = [12, 14, 16];
function Swipe() {
  const [i, setI] = useState(0);
  const [d, setD] = useState(1);
  const go = (m) => { const t = Math.min(2, Math.max(0, m)); if (t === i) return; setD(t > i ? 1 : -1); setI(t); };
  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
  };
  return (
    <>
      <div className={s.swipeStage} tabIndex={0} role="group" aria-label={`Swipe demo, screen ${i + 1} of 3. Left and Right arrow keys change screen.`} onKeyDown={onKey}>
        <AnimatePresence initial={false} custom={d} mode="popLayout">
          <motion.div key={i} className={s.layer} custom={d}
            initial={{ opacity: 0, x: d * 60 }} animate={{ opacity: 1, x: 0, transition: tEnter }} exit={{ opacity: 0, x: d * -60, transition: tMove }}
            drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.5} onDragEnd={(e, inf) => { if (inf.offset.x < -40) go(i + 1); else if (inf.offset.x > 40) go(i - 1); }}>
            <Scaled><div inert aria-hidden="true"><Artboard n={SWIPE[i]} idp={`mobile-b-swipe-${i}`} /></div></Scaled>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className={s.dots} aria-hidden="true">{SWIPE.map((n, j) => <i key={n} data-on={j === i} />)}</div>
      <div className={s.demoRow}>
        <Button size="sm" variant="dark" icon="chevron-left" label="Previous" onClick={() => go(i - 1)} disabled={i === 0} />
        <Button size="sm" variant="dark" icon="chevron-right" label="Next" onClick={() => go(i + 1)} disabled={i === 2} />
      </div>
    </>
  );
}

function Expand() {
  const [open, setOpen] = useState(false);
  const k = KPI.material;
  return (
    <div className={s.expand}>
      <button type="button" className={s.expandHead} aria-expanded={open} aria-controls="mobile-b-expand-body" onClick={() => setOpen(!open)}>
        {k.label}<Icon name="arrow-up-right" size={18} className={s.arrowRot} style={{ transform: open ? 'rotate(90deg)' : undefined }} />
      </button>
      <motion.div id="mobile-b-expand-body" initial={false} animate={{ height: open ? 130 : 0 }} transition={tMove} style={{ overflow: 'hidden' }} aria-hidden={!open}>
        <div className={s.expandBody}>
          <svg viewBox="0 0 340 130" width="100%" height="130" style={{ position: 'absolute', inset: 0 }} aria-hidden="true"><GaugeG w={340} h={130} r={96} value={0.32} /></svg>
          <div style={{ position: 'absolute', left: 18, bottom: 14, display: 'grid', gap: 4 }}>
            <Trend dir={k.dir}>{k.trend}</Trend>
            <span className={s.fig}>{k.value}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function SheetDemo() {
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState('Overall');
  const pick = (n) => { setSel(n); setOpen(false); };
  return (
    <div className={s.miniSheetStage} onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false); }}>
      <Button size="sm" variant="dark" aria-expanded={open} iconRight="chevron-down" onClick={() => setOpen(true)}>{sel}</Button>
      <AnimatePresence>
        {open && (
          <>
            <motion.button type="button" aria-label="Close sheet" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={tMove}
              style={{ position: 'absolute', inset: 0, border: 0, background: 'rgba(47,47,47,0.3)' }} onClick={() => setOpen(false)} />
            <motion.div className={s.miniSheet} role="dialog" aria-label="Project switcher" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={tMove}
              drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.7 }} onDragEnd={(e, i) => { if (i.offset.y > 50) setOpen(false); }}>
              <div className={s.handle} />
              {['Overall', ...NAV].map((n, j) => (
                <button key={n} type="button" className="chip chip-sm" autoFocus={j === 0} style={{ width: '100%', justifyContent: 'space-between', padding: '11px 14px' }} onClick={() => pick(n)}>
                  {n}{sel === n && <span className={s.sel} />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function Tabs() {
  const [i, setI] = useState(1);
  return (
    <>
      <TabBar flow active={1} label="Tab bar demo" onChange={setI} />
      <output className="t-small" style={{ color: 'var(--ink)' }} aria-live="polite">Active: {TAB_ICONS[i][1]}</output>
    </>
  );
}

function Range() {
  const [lo, setLo] = useState(35);
  const [hi, setHi] = useState(45);
  const bars = tickBars(50, 340, 0, 0, 0.5);
  const pos = (v) => `calc(5px + (100% - 10px) * ${v / 50})`;
  return (
    <div className={s.rangeBox}>
      <svg className={s.rangeBars} viewBox="0 0 340 70" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="mobile-b-range-on" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4093EC" /><stop offset="1" stopColor="#4093EC" stopOpacity="0" /></linearGradient>
          <linearGradient id="mobile-b-range-off" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#BDBDBD" /><stop offset="1" stopColor="#BDBDBD" stopOpacity="0" /></linearGradient>
        </defs>
        {bars.map((b, i) => <rect key={i} x={b.x} y="0" width={b.w} height="70" fill={`url(#mobile-b-range-${i >= lo && i < hi ? 'on' : 'off'})`} />)}
      </svg>
      <div className={s.rangeTrack}>
        <div className={s.rangeLine} style={{ left: pos(lo), width: `calc((100% - 10px) * ${(hi - lo) / 50})` }} />
        <input className={s.rangeIn} type="range" min={0} max={50} value={lo} aria-label="Range start" aria-valuetext={`${lo * 2}`} onChange={(e) => setLo(Math.min(+e.target.value, hi - 1))} />
        <input className={s.rangeIn} type="range" min={0} max={50} value={hi} aria-label="Range end" aria-valuetext={`${hi * 2}`} onChange={(e) => setHi(Math.max(+e.target.value, lo + 1))} />
      </div>
      <div className={s.rangeRead} aria-live="polite"><span>{lo * 2}</span><span>{KPI.cross.legend}</span><span>{hi * 2}</span></div>
    </div>
  );
}

function Hold() {
  const [on, setOn] = useState(false);
  const [holding, setHolding] = useState(false);
  const t = useRef(null);
  const start = () => {
    clearTimeout(t.current);
    setHolding(true);
    t.current = setTimeout(() => { setOn((v) => !v); setHolding(false); }, 650);
  };
  const stop = () => { clearTimeout(t.current); setHolding(false); };
  useEffect(() => () => clearTimeout(t.current), []);
  const isKey = (e) => e.key === 'Enter' || e.key === ' ';
  return (
    <>
      <button type="button" className={s.hold} data-on={on} data-holding={holding} aria-pressed={on}
        onPointerDown={start} onPointerUp={stop} onPointerLeave={stop} onPointerCancel={stop} onContextMenu={(e) => e.preventDefault()}
        onKeyDown={(e) => { if (isKey(e)) { e.preventDefault(); if (!e.repeat) start(); } }} onKeyUp={(e) => { if (isKey(e)) stop(); }} onBlur={stop}>
        <span className={s.holdPin}><Icon name="pin" size={22} /></span>
        <span style={{ display: 'grid', gap: 2, fontWeight: 500 }}>{WORKCARD.name}<small style={{ fontWeight: 400, color: 'var(--muted)' }}>{WORKCARD.dates}</small></span>
        <span className={s.fig} style={{ marginLeft: 'auto', fontSize: 28 }}>{WORKCARD.value}</span>
        <span className={s.holdFill} />
      </button>
      <Toggle label={on ? 'Pinned' : 'Hold the card, or switch here'} checked={on} onChange={setOn} />
    </>
  );
}

export default function Patterns() {
  return (
    <div className={s.strips}>
      <Strip no={1} title="Pull to refresh" text="Drag the handle down or press Refresh. The tick bars rise again, left to right."><Pull /></Strip>
      <Strip no={2} title="Swipe between screens" text="Drag the screen sideways, press the arrows, or use Left and Right on the frame."><Swipe /></Strip>
      <Strip no={3} title="Tap a card to expand" text="The arrow turns and the card grows to show its figure and arc."><Expand /></Strip>
      <Strip no={4} title="Bottom sheet" text="Rises from the bottom edge. Drag the handle down, press Escape or tap outside to close."><SheetDemo /></Strip>
      <Strip no={5} title="Tab bar change" text="The yellow tile slides to the chosen icon. Left and Right move it."><Tabs /></Strip>
      <Strip no={6} title="Range handle" text="Drag either handle, or focus it and use the arrow keys. The band follows."><Range /></Strip>
      <Strip no={7} title="Long press and toggle" text="Hold the card to pin it; the line fills, then the tile turns yellow. The switch does the same."><Hold /></Strip>
    </div>
  );
}
