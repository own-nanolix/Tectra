'use client';

import { useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import Toggle from '@/components/ui/Toggle';
import Field from '@/components/ui/Field';
import { toast } from '@/components/site/Toast';
import { clamp } from '@/lib/site';
import s from './motion.module.css';

const VARIANTS = ['yellow', 'sky', 'blue', 'dark', 'white', 'ghost'];

function Buttons() {
  return (
    <div className={s.plate}>
      <h3 className="t-title">Buttons</h3>
      <div className={s.row}>
        {VARIANTS.map((v) => (
          <Button key={v} variant={v}>{v[0].toUpperCase() + v.slice(1)}</Button>
        ))}
      </div>
      <p className={s.kicker}>Hover: lift 1 px, brighter. Press: down 1 px and 98.5% scale. dur-1 · ease.out.</p>
    </div>
  );
}

function Controls() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(true);
  return (
    <div className={s.plate}>
      <h3 className="t-title">Toggles and inputs</h3>
      <div className={s.row}>
        <Toggle label="Off to on" checked={a} onChange={setA} />
        <Toggle label="On to off" checked={b} onChange={setB} />
      </div>
      <Field id="motion-field-demo" label="Focus line" placeholder="Click to focus" />
      <p className={s.kicker}>Toggle thumb: 280 ms, ease.inOut. Input: the line under the field thickens and turns blue in 280 ms.</p>
    </div>
  );
}

function Toasts() {
  return (
    <div className={s.plate}>
      <h3 className="t-title">Toast</h3>
      <div className={s.row}>
        <Button variant="dark" onClick={() => toast('Toast: enters from the right, leaves after 2.2 s')}>Show toast</Button>
      </div>
      <p className={s.kicker}>Enters 24 px from the right over 520 ms (ease.out), leaves over 280 ms (ease.inOut).</p>
    </div>
  );
}

// A range handle sliding along a ruler. Drag it, click the ruler, use the buttons, or the keyboard.
function RangeHandle() {
  const [v, setV] = useState(70);
  const [drag, setDrag] = useState(false);
  const track = useRef(null);
  const at = (e) => {
    const r = track.current.getBoundingClientRect();
    setV(Math.round(clamp((e.clientX - r.left) / r.width, 0, 1) * 100));
  };
  const key = (e) => {
    const step = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1, PageUp: 10, PageDown: -10 }[e.key];
    if (step) setV((x) => clamp(x + step, 0, 100));
    else if (e.key === 'Home') setV(0);
    else if (e.key === 'End') setV(100);
    else return;
    e.preventDefault();
  };
  return (
    <div className={`${s.plate} ${s.rangeWrap}`}>
      <div className={s.bar}>
        <h3 className="t-title">Range handle</h3>
        <p className="t-title" aria-live="polite">{v}</p>
      </div>
      <div
        ref={track}
        className={s.rangeTrack}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          setDrag(true);
          at(e);
        }}
        onPointerMove={(e) => drag && at(e)}
        onPointerUp={() => setDrag(false)}
        onPointerCancel={() => setDrag(false)}
      >
        <span className={s.rangeLine} />
        <span className={s.rangeTicks} />
        <span className={s.rangeFill} data-drag={drag} style={{ width: `${v}%` }} />
        <button
          type="button"
          role="slider"
          className={s.rangeHandle}
          data-drag={drag}
          style={{ left: `${v}%` }}
          aria-label="Range value"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={v}
          aria-valuetext={`${v} percent`}
          onKeyDown={key}
        />
      </div>
      <div className={s.row}>
        <Button size="sm" variant="ghost" onClick={() => setV((x) => clamp(x - 10, 0, 100))}>-10</Button>
        <Button size="sm" variant="ghost" onClick={() => setV((x) => clamp(x + 10, 0, 100))}>+10</Button>
        <Button size="sm" variant="sky" onClick={() => setV(70)}>Reset to 70</Button>
      </div>
      <p className={s.kicker}>Steps slide in 280 ms with ease.inOut; dragging follows the pointer. Arrow keys step 1, Page keys step 10.</p>
    </div>
  );
}

export default function Micro() {
  return (
    <div className={s.g2}>
      <Buttons />
      <Controls />
      <Toasts />
      <RangeHandle />
    </div>
  );
}
