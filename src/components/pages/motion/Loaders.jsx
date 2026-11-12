'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import Button from '@/components/ui/Button';
import { PinG } from '@/components/art/KeyArt';
import { MARK, MARK_BODY } from '@/components/art/Mark';
import { HEX } from '@/lib/brand';
import { range } from '@/lib/site';
import { r2 } from '@/lib/charts';
import s from './motion.module.css';

function Wave() {
  return (
    <Art viewBox="0 0 200 160" title="Loader: tick-bar wave" exportName="motion-loader-ticks">
      <rect width="200" height="160" fill={HEX.tile} />
      {range(9).map((i) => (
        <rect key={i} x={30 + i * 17} y="40" width="7" height="70" rx="1" fill={i === 4 ? HEX.yellow : HEX.blue} className={s.wave} style={{ '--i': i }} />
      ))}
      <path d={range(9, (i) => `M${33.5 + i * 17} 122v8`).join('')} stroke={HEX.track} strokeWidth="1" />
    </Art>
  );
}

function Orbit() {
  const k = 0.62;
  const C = MARK.C;
  // Turn about the middle of the fused body (between the centres of the two large circles).
  const cx = (MARK.A.cx + MARK.B.cx) / 2;
  const cy = (MARK.A.cy + MARK.B.cy) / 2;
  return (
    <Art viewBox="0 0 200 160" title="Loader: two circles fused, orbited by the third" exportName="motion-loader-orbit">
      <rect width="200" height="160" fill={HEX.tile} />
      {/* At rest the two groups make the mark: the fused body and, upper right, the small circle. */}
      <g className={s.orbit}>
        <g transform={`translate(100 80) scale(${k}) translate(${-cx} ${-cy})`} fill={HEX.blue}>
          <path d={MARK_BODY} />
        </g>
      </g>
      <g className={s.orbitRev}>
        <circle cx={r2(100 + (C.cx - cx) * k)} cy={r2(80 + (C.cy - cy) * k)} r={r2(C.r * k)} fill={HEX.yellow} />
      </g>
    </Art>
  );
}

function Gauge() {
  const R = 100;
  const f = 0.72;
  const th = (f * Math.PI) / 2;
  const ex = r2(180 - R * Math.cos(th));
  const ey = r2(150 - R * Math.sin(th));
  return (
    <Art viewBox="0 0 200 160" title="Loader: quarter-arc gauge sweeping" exportName="motion-loader-gauge">
      <rect width="200" height="160" fill={HEX.tile} />
      <clipPath id="motion-loader-gauge-clip">
        <rect x="10" y="10" width="180" height="140" rx="4" />
      </clipPath>
      <rect x="10" y="10" width="180" height="140" rx="4" fill={HEX.card} />
      <g clipPath="url(#motion-loader-gauge-clip)">
        <path d={`M${180 - R} 150A${R} ${R} 0 0 1 180 ${150 - R}`} fill="none" stroke={HEX.track} strokeWidth="14" />
        <path d={`M${180 - R} 150A${R} ${R} 0 0 1 ${ex} ${ey}`} fill="none" stroke={HEX.blue} strokeWidth="14" pathLength="1" strokeDasharray="1" strokeDashoffset="0" className={s.sweep} />
        <circle cx={ex} cy={ey} r="9" fill={HEX.yellow} className={s.sweepDot} />
      </g>
    </Art>
  );
}

export function Loaders() {
  const items = [
    [<Wave key="w" />, 'Tick-bar wave', 'Bars rise in turn, 60 ms apart, 1.2 s loop.'],
    [<Orbit key="o" />, 'Circles orbiting', 'The fused pair turns, the third circle circles against it. 2.4 s loop.'],
    [<Gauge key="g" />, 'Gauge sweep', 'The quarter arc draws from the corner with ease.draw, then the dot lands. 2.4 s loop.'],
  ];
  return (
    <div className={s.g3}>
      {items.map(([art, name, note]) => (
        <div key={name} className={s.plate}>
          {art}
          <p className="t-title">{name}</p>
          <p className={s.kicker}>{note}</p>
        </div>
      ))}
    </div>
  );
}

// A pin landing with a ring: the one thing that overshoots.
export function PinLanding() {
  const [n, setN] = useState(0);
  return (
    <div className={s.plate}>
      <Art key={n} viewBox="0 0 720 220" title="Pin landing with a ring" exportName="motion-pin-landing">
        <rect width="720" height="220" fill={HEX.tile} />
        <path d="M40 160H680" stroke={HEX.track} strokeWidth="1.5" />
        <path d={range(33, (i) => `M${40 + i * 20} 160v${i % 4 === 0 ? 12 : 7}`).join('')} stroke={HEX.track} strokeWidth="1" />
        <ellipse cx="360" cy="160" rx="18" ry="4" fill={HEX.ink} fillOpacity="0.15" className={s.shade} />
        <circle cx="360" cy="130" r="14" fill="none" stroke={HEX.yellow} strokeWidth="2" opacity="0" className={s.ringOnce} />
        <g className={s.drop}>
          <PinG x={360} y={130} r={14} tone="yellow" />
        </g>
        <text x="40" y="204" fontSize="13" fill={HEX.muted}>ease.snap · 520 ms · one ring</text>
      </Art>
      <div className={s.bar}>
        <p className="t-title">Pin landing</p>
        <Button size="sm" variant="sky" icon="play" onClick={() => setN((v) => v + 1)}>Replay</Button>
      </div>
    </div>
  );
}
