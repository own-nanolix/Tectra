'use client';

import { useRef } from 'react';
import Art from '@/components/art/Art';
import { axisLabels, r2, ruler } from '@/lib/charts';
import { clamp } from '@/lib/site';
import { CROSS, axisAt } from './data';
import s from './feature.module.css';

// The 2D Cross Section tick-bar chart with a range handle the visitor drags or steps with the arrow keys.
// Drawn as one exportable SVG on its own app-grey card. a and b are bar indices (0 to 47).
const W = 380, H = 142, PX = 20, BW = 340, BY = 14, BH = 64;
const N = CROSS.count;
const STEP = BW / N;
const bx = (v) => r2(PX + (v + 0.5) * STEP);
const HY = BY + BH + 21;

export default function CrossSection({ range, onChange }) {
  const [a, b] = range;
  const drag = useRef(null);
  const labels = axisLabels(BW);
  const slot = (v) => Math.round((v / (N - 1)) * (labels.length - 1));
  const set = (which, v) => (which === 'a' ? onChange([clamp(v, 0, b - 1), b]) : onChange([a, clamp(v, a + 1, N - 1)]));
  const barAt = (e) => {
    const svg = e.currentTarget.ownerSVGElement || e.currentTarget;
    const r = svg.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * W;
    return clamp(Math.round((x - PX) / STEP - 0.5), 0, N - 1);
  };
  const grab = (which) => (e) => {
    drag.current = which;
    const svg = e.currentTarget.ownerSVGElement || e.currentTarget;
    svg.setPointerCapture(e.pointerId);
    e.currentTarget.focus();
  };
  const grabTrack = (e) => {
    const v = barAt(e);
    const which = Math.abs(v - a) <= Math.abs(v - b) ? 'a' : 'b';
    drag.current = which;
    e.currentTarget.ownerSVGElement.setPointerCapture(e.pointerId);
    set(which, v);
  };
  const move = (e) => {
    if (drag.current) set(drag.current, barAt(e));
  };
  const drop = () => {
    drag.current = null;
  };
  const keys = (which, v) => (e) => {
    const d = { ArrowLeft: -1, ArrowDown: -1, ArrowRight: 1, ArrowUp: 1, PageDown: -5, PageUp: 5 }[e.key];
    if (d) {
      e.preventDefault();
      set(which, v + d);
    } else if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
      set(which, e.key === 'Home' ? 0 : N - 1);
    }
  };

  const handle = (which, v, name) => (
    <g
      key={which}
      className={s.handle}
      role="slider"
      tabIndex={0}
      aria-label={name}
      aria-orientation="horizontal"
      aria-valuemin={0}
      aria-valuemax={N - 1}
      aria-valuenow={v}
      aria-valuetext={`${axisAt(v)}`}
      onPointerDown={grab(which)}
      onKeyDown={keys(which, v)}
    >
      <rect x={bx(v) - 15} y={HY - 15} width="30" height="30" fill="transparent" />
      <rect x={bx(v) - 5} y={HY - 3.5} width="10" height="7" rx="1" fill="#FFB83D" />
      <rect className={s.focusRing} x={bx(v) - 9} y={HY - 8} width="18" height="16" rx="2" fill="none" />
    </g>
  );

  return (
    <Art
      viewBox={`0 0 ${W} ${H}`}
      title="2D Cross Section tick-bar chart with a range handle"
      exportName="feature-cross-section"
      className={s.instSvg}
      onPointerMove={move}
      onPointerUp={drop}
      onPointerCancel={drop}
    >
      <defs>
        <linearGradient id="feature-cross-off" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CFCFCF" />
          <stop offset="1" stopColor="#CFCFCF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="feature-cross-on" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFB83D" />
          <stop offset="1" stopColor="#FFB83D" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} rx="4" fill="#E9E9E9" />
      <rect className={s.hit} x={PX} y={BY - 4} width={BW} height={BH + 40} fill="transparent" onPointerDown={grabTrack} />
      {Array.from({ length: N }, (_, i) => (
        <rect
          key={i}
          x={r2(PX + i * STEP + STEP * 0.24)}
          y={BY}
          width={r2(STEP * 0.52)}
          height={BH}
          fill={`url(#feature-cross-${i >= a && i <= b ? 'on' : 'off'})`}
          className="rise"
          style={{ '--i': i }}
          pointerEvents="none"
        />
      ))}
      <path d={ruler(N * 2, BW).map((t) => `M${r2(PX + t)} ${BY + BH + 13}v16`).join('')} stroke="#CFCFCF" strokeWidth="1" pointerEvents="none" />
      <path d={`M${bx(a)} ${HY}H${bx(b)}`} stroke="#FFB83D" strokeWidth="1.2" pointerEvents="none" />
      {labels.map((l, i) => {
        const on = i === slot(a) || i === slot(b);
        return (
          <text key={i} x={r2(PX + l.x)} y={BY + BH + 52} fontSize="12" fontWeight={on ? 500 : 400} fill={on ? '#2F2F2F' : '#5E5E5E'} textAnchor="middle" pointerEvents="none">
            {l.label}
          </text>
        );
      })}
      {handle('a', a, 'Range start')}
      {handle('b', b, 'Range end')}
    </Art>
  );
}
