'use client';

import { useEffect, useRef, useState } from 'react';
import Art from '@/components/art/Art';
import { MARK, MARK_BODY } from '@/components/art/Mark';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { still } from '@/lib/site';
import s from './logo.module.css';

// Draw-on: the three construction circles are drawn by stroke, the joined body fills in as the outlines
// fade, then the small circle lands. The finished mark is the base state: the outlines rest at opacity 0
// and every keyframe plays towards the base style, so the SVG is complete with animation off.
// Replay re-mounts the SVG through a React key.
const K = 2.4;

export default function DrawOn() {
  const [run, setRun] = useState(0);
  const ref = useRef(null);
  const { A, B, C } = MARK;
  // Play once more when the stage first scrolls into view, so the draw-on is seen, not missed below the fold.
  useEffect(() => {
    const el = ref.current;
    if (!el || still()) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        setRun((n) => n + 1);
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref}>
      <div className={s.stage}>
        <Art key={run} viewBox="0 0 960 420" title="Mark draw-on animation" exportName="logo-draw-on">
          <rect width="960" height="420" rx="6" fill={HEX.tile} />
          <g transform={`translate(${480 - 50 * K} ${210 - 50 * K}) scale(${K})`}>
            {[A, B, C].map((c, i) => {
              const len = r2(2 * Math.PI * c.r);
              return (
                <circle
                  key={i} cx={c.cx} cy={c.cy} r={c.r} className={s.trace}
                  fill="none" stroke={HEX.blue} strokeWidth="0.6" strokeDasharray={len} opacity="0"
                  style={{ '--len': len, animationDelay: `${i * 160}ms` }}
                />
              );
            })}
            <path d={MARK_BODY} className={s.fill} fill={HEX.blue} />
            <circle className="fuse-c" cx={C.cx} cy={C.cy} r={C.r} fill={HEX.blue} />
          </g>
        </Art>
      </div>
      <div className={s.replay}>
        <button type="button" className="btn btn-sky btn-sm" onClick={() => setRun((n) => n + 1)}>Replay</button>
        <span className="t-small">The circles are drawn, the body fills in, then the small circle lands.</span>
      </div>
    </div>
  );
}
