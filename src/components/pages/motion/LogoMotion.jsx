'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import Button from '@/components/ui/Button';
import { MARK, MARK_BODY } from '@/components/art/Mark';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import s from './motion.module.css';

// One frame of the mark assembling. p = how far the large circles are still apart (1 to 0).
function FrameMark({ x, y, size, p, op = 1, body = false, dot = false }) {
  const d = r2(12.5 * p);
  return (
    <g transform={`translate(${x} ${y}) scale(${size / 100})`} fill={HEX.blue} opacity={op}>
      <circle cx={r2(MARK.A.cx - d)} cy={r2(MARK.A.cy - d)} r={MARK.A.r} />
      <circle cx={r2(MARK.B.cx + d)} cy={r2(MARK.B.cy + d)} r={MARK.B.r} />
      {body && <path d={MARK_BODY} />}
      {dot && <circle cx={MARK.C.cx} cy={MARK.C.cy} r={MARK.C.r} />}
    </g>
  );
}

const FRAMES = [
  { t: '0 ms', name: 'Apart', p: 1, op: 0.3 },
  { t: '560 ms', name: 'Sliding', p: 0.55, op: 1 },
  { t: '1600 ms', name: 'Fused', p: 0, op: 1, body: true },
  { t: '2020 ms', name: 'Landed', p: 0, op: 1, body: true, dot: true },
];

export function Storyboard() {
  return (
    <Art viewBox="0 0 440 470" title="Mark assembling, four key frames" exportName="motion-logo-storyboard">
      <rect width="440" height="470" fill={HEX.tile} />
      {FRAMES.map((f, i) => {
        const x = 15 + (i % 2) * 215;
        const y = 15 + Math.floor(i / 2) * 228;
        return (
          <g key={f.t}>
            <rect x={x} y={y} width="195" height="160" rx="4" fill={HEX.paper} />
            <FrameMark x={x + 40} y={y + 20} size={115} p={f.p} op={f.op} body={f.body} dot={f.dot} />
            <text x={x} y={y + 184} fontSize="15" fontWeight="500" fill={HEX.ink}>{f.name}</text>
            <text x={x} y={y + 204} fontSize="13" fill={HEX.muted}>{f.t}</text>
          </g>
        );
      })}
    </Art>
  );
}

export function LogoFuse() {
  const [n, setN] = useState(0);
  const A = MARK.A;
  const B = MARK.B;
  const C = MARK.C;
  return (
    <div className={s.plate}>
      <Art key={n} viewBox="0 0 400 260" title="The Tectra mark assembling: two large circles slide together and fuse, then the small circle lands" exportName="motion-logo-fuse">
        <rect width="400" height="260" fill={HEX.tile} />
        <g transform="translate(120 50) scale(1.6)" fill={HEX.blue}>
          <circle cx={A.cx} cy={A.cy} r={A.r} className="fuse-a" />
          <circle cx={B.cx} cy={B.cy} r={B.r} className="fuse-b" />
          <path d={MARK_BODY} className={s.bodyIn} />
          <circle cx={C.cx} cy={C.cy} r={C.r} className="fuse-c" />
        </g>
        <text x="24" y="240" fontSize="12" fill={HEX.muted}>fuse-a, fuse-b · 1600 ms · ease.inOut · small circle lands with ease.snap</text>
      </Art>
      <div className={s.bar}>
        <p className="t-title">Mark assembling</p>
        <Button size="sm" variant="sky" icon="play" onClick={() => setN((v) => v + 1)}>Replay</Button>
      </div>
    </div>
  );
}
