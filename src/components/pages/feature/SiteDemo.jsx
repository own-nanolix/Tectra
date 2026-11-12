'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/site/Icon';
import Typewriter from '@/components/site/Typewriter';
import { Trend } from '@/components/ui/Chip';
import { HERO } from '@/lib/brand';
import { still } from '@/lib/site';
import CrossSection from './CrossSection';
import CutFill from './CutFill';
import { CROSS, CUT_FILL, MARKERS, PINS, STEPS, axisAt, pinPercent } from './data';
import Ledger from './Ledger';
import StageArt from './StageArt';
import s from './feature.module.css';

// The Progress site view as a working demo: pins you can click or reach with the keyboard, a work card for the
// selected pin, the Cut and Fill instrument, the 2D Cross Section with its range handle, and a scripted
// walkthrough that types one case-study caption per pin. Play, pause, interrupt and replay all end finished.
const HOLD = 1400; // ms to rest on a typed caption before moving to the next pin
const TYPE_MS = 22; // ms per character

// Move on to the next pin, or finish on the last one.
const nextStep = (p) => {
  if (!p.playing) return p;
  if (p.idx >= STEPS.length - 1) return { ...p, playing: false, done: true };
  const n = p.idx + 1;
  return { ...p, idx: n, sel: STEPS[n].pin };
};

export default function SiteDemo() {
  const [st, setSt] = useState({ sel: STEPS[0].pin, idx: 0, playing: false, done: false, run: 0 });
  const [range, setRange] = useState([CROSS.start, CROSS.end]);
  const [marker, setMarker] = useState(null);
  const timer = useRef(0);

  const walkRef = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Watchdog: if the typewriter never reports (for example the card is scrolled out of view), still move on.
  const { playing, idx, run } = st;
  useEffect(() => {
    if (!playing) return undefined;
    const w = setTimeout(() => setSt((p) => (p.idx === idx && p.run === run ? nextStep(p) : p)), STEPS[idx].caption.length * TYPE_MS + HOLD + 3000);
    return () => clearTimeout(w);
  }, [playing, idx, run]);

  const pin = PINS.find((p) => p.id === st.sel);
  const step = STEPS[st.idx];
  const mk = MARKERS.find((m) => m.id === marker);
  const [cut, fill, net] = CUT_FILL.indicators;

  // Choosing a pin interrupts the walkthrough: the caption of that pin is shown whole.
  const pick = (id) => {
    clearTimeout(timer.current);
    setSt((p) => ({ ...p, sel: id, idx: STEPS.findIndex((x) => x.pin === id), playing: false, done: false }));
  };
  const play = () => {
    clearTimeout(timer.current);
    if (walkRef.current) walkRef.current.scrollIntoView({ block: "nearest", behavior: still() ? "auto" : "smooth" });
    setSt((p) => {
      const from = p.done ? 0 : p.idx;
      return { sel: STEPS[from].pin, idx: from, playing: true, done: false, run: p.run + 1 };
    });
  };
  const pause = () => {
    clearTimeout(timer.current);
    setSt((p) => ({ ...p, playing: false }));
  };
  // Called when a caption has been typed: rest, then move on (or finish on the last pin).
  const typed = () => {
    clearTimeout(timer.current);
    const at = st.idx;
    const r = st.run;
    timer.current = setTimeout(() => setSt((p) => (p.idx === at && p.run === r ? nextStep(p) : p)), HOLD);
  };

  const label = st.playing ? 'Pause' : st.done ? 'Replay' : 'Play';

  return (
    <>
      <section className={`field ${s.stage}`} aria-label="Progress site view">
        <header className={s.head}>
          <h1 tabIndex={-1} className={`t-h1 ${s.title} slide-up`}>
            <span className="sr-only">Site view: </span>
            {HERO.title[0]}
            <br />
            {HERO.title[1]}
          </h1>
          <p className={`t-label ${s.sub} slide-up`} style={{ '--i': 2 }}>{HERO.sub}</p>
        </header>

        <div className={s.art}>
          <StageArt sel={st.sel} />
          {PINS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={s.pin}
              style={pinPercent(p.id)}
              aria-label={p.name}
              aria-pressed={st.sel === p.id}
              onClick={() => pick(p.id)}
            />
          ))}
        </div>

        <div ref={walkRef} className={`glass ${s.walk}`}>
          <div className={s.walkBar}>
            <button type="button" className={`btn btn-sm ${s.play}`} onClick={st.playing ? pause : play}>
              <Icon name={st.playing ? 'pause' : 'play'} size={16} />
              {label}
            </button>
            <ol className={s.dots} aria-label="Walkthrough steps">
              {STEPS.map((x, i) => (
                <li key={x.pin} className={s.dotItem}>
                  <button type="button" className={s.stepBtn} aria-label={PINS[i].name} aria-current={st.idx === i ? 'step' : undefined} data-on={st.idx >= i ? 'true' : undefined} onClick={() => pick(x.pin)} />
                </li>
              ))}
            </ol>
          </div>
          <p className={s.caption}>
            {st.playing ? <Typewriter key={`${st.idx}-${st.run}`} text={step.caption} speed={TYPE_MS} onDone={typed} /> : <span>{step.caption}</span>}
          </p>
          <p className="sr-only" aria-live="polite">{step.caption}</p>
        </div>

        <aside className={s.dock} aria-label="Site view controls">
          <div className={`glass ${s.work}`}>
            <div key={pin.id} className={s.swap}>
              <div className="card-head">
                <h2 className="t-title" style={{ color: 'var(--navy)' }}>{pin.name}</h2>
                <Icon name="arrow-up-right" size={20} />
              </div>
              {pin.meta ? <p className="t-small" style={{ color: 'var(--navy)' }}>{pin.meta}</p> : <Trend dir={pin.dir} className={s.trendNavy}>{pin.trend}</Trend>}
              <p className={s.figure}>{pin.value}</p>
            </div>
            <div className={s.track} aria-hidden="true">
              <span className={s.fill} style={{ transform: `scaleX(${pin.fill})` }} />
            </div>
          </div>

          <div className={`card-app ${s.inst}`}>
            <div className={s.instHead}>
              <div>
                <h2 className="t-title">{CUT_FILL.title}</h2>
                <p className="t-small">{CUT_FILL.date}</p>
              </div>
              {mk && <span className={`chip chip-sm ${mk.kind === 'cut' ? 'chip-yellow' : 'chip-blue'}`} aria-live="polite">{mk.level}</span>}
            </div>
            <CutFill value={marker} onChange={setMarker} />
            <dl className={s.indic} aria-label="Indicators">
              <div data-on={mk && mk.kind === 'cut' ? 'true' : undefined}><dt>{cut[0]}</dt><dd>{cut[1]}</dd></div>
              <div data-on={mk && mk.kind === 'fill' ? 'true' : undefined}><dt>{fill[0]}</dt><dd>{fill[1]}</dd></div>
              <div><dt>{net[0]}</dt><dd>{net[1]}</dd></div>
            </dl>
          </div>

          <div className={`card-app ${s.inst}`}>
            <div className={s.instHead}>
              <div>
                <h2 className="t-title">{CROSS.title}</h2>
                <p className={s.crossFig}>
                  <span className={s.crossVal}>{CROSS.value}</span>
                  <Trend dir="up">{CROSS.trend}</Trend>
                </p>
              </div>
              <p className={`t-small ${s.readout}`} aria-live="polite">
                <span className={s.legend} aria-hidden="true" />
                {CROSS.legend} {axisAt(range[0])} - {axisAt(range[1])}
              </p>
            </div>
            <CrossSection range={range} onChange={setRange} />
          </div>
        </aside>
      </section>
      <Ledger sel={st.sel} range={range} marker={marker} />
    </>
  );
}
