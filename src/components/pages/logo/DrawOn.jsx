'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import { MARK, MARK_BODY } from '@/components/art/Mark';
import { HEX } from '@/lib/brand';
import s from './logo.module.css';

// Draw-on: the two large circles slide together and fuse, then the small circle lands.
// The finished mark is the base state; the keyframes (fuse-a, fuse-b, fuse-c) play towards it.
// Replay re-mounts the SVG through a React key.
const K = 2.4;

export default function DrawOn() {
  const [run, setRun] = useState(0);
  const { A, B, C } = MARK;
  return (
    <div>
      <div className={s.stage}>
        <Art
          key={run} viewBox="0 0 960 420" title="Mark draw-on animation" exportName="logo-draw-on"
        >
          <rect width="960" height="420" rx="6" fill={HEX.tile} />
          <g transform={`translate(${480 - 50 * K} ${210 - 50 * K}) scale(${K})`} fill={HEX.blue}>
            <circle className="fuse-a" cx={A.cx} cy={A.cy} r={A.r} />
            <circle className="fuse-b" cx={B.cx} cy={B.cy} r={B.r} />
            <path d={MARK_BODY} className="fade-in" style={{ animationDelay: '1100ms' }} />
            <circle className="fuse-c" cx={C.cx} cy={C.cy} r={C.r} />
          </g>
        </Art>
      </div>
      <div className={s.replay}>
        <button type="button" className="btn btn-sky btn-sm" onClick={() => setRun((n) => n + 1)}>Replay</button>
        <span className="t-small">Two large circles slide together and fuse, then the small circle lands.</span>
      </div>
    </div>
  );
}
