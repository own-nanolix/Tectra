'use client';

import Art from '@/components/art/Art';
import { r2 } from '@/lib/charts';
import { MARKERS } from './data';
import s from './feature.module.css';

// The Cut and Fill instrument, interactive: three yellow cut markers (bar on top, stem down) alternate with three
// blue fill markers (bar at the bottom, stem up). Selecting a marker highlights its level label.
const W = 380, H = 126, PX = 20, PY = 26, BW = 340, BH = 74;
const STEP = BW / 6;
const BAR = STEP * 0.98;

export default function CutFill({ value, onChange }) {
  const pick = (id) => onChange(value === id ? null : id);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Cut and Fill instrument with six level markers" exportName="feature-cut-fill" className={s.instSvg}>
      <rect width={W} height={H} rx="4" fill="#E9E9E9" />
      <g transform={`translate(${PX} ${PY})`}>
        {MARKERS.map((m, n) => {
          const cx = r2(STEP * m.slot + BAR / 2);
          const cut = m.kind === 'cut';
          const col = cut ? '#FFB83D' : '#4093EC';
          const on = value === m.id;
          const dim = value && !on;
          return (
            <g
              key={m.id}
              className={`${s.marker} ${dim ? s.dim : ''} slide-up`}
              style={{ '--i': n }}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={`${cut ? 'Cut' : 'Fill'} level ${m.level}`}
              onClick={() => pick(m.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  pick(m.id);
                }
              }}
            >
              <rect className={s.focusRing} x={cx - STEP / 2 + 2} y="-14" width={STEP - 4} height={BH + 24} rx="3" fill="none" />
              <rect x={cx - STEP / 2} y="-14" width={STEP} height={BH + 24} fill={on ? col : 'transparent'} fillOpacity="0.14" />
              {cut ? (
                <g>
                  <rect x={cx - BAR / 2} y="0" width={BAR} height="5" rx="1" fill={col} fillOpacity={on ? 1 : m.strength} />
                  <path d={`M${cx} 5V${r2(BH * 0.62)}`} stroke={col} strokeOpacity={Math.max(m.strength, 0.6)} strokeWidth={on ? 2 : 1.2} />
                  <circle cx={cx} cy="8" r={on ? 4 : 2.6} fill={col} />
                  <text x={cx} y={BH - 2} fontSize="13" fontWeight={on ? 500 : 400} fill="#2F2F2F" textAnchor="middle">{m.level}</text>
                </g>
              ) : (
                <g>
                  <rect x={cx - BAR / 2} y={BH - 5} width={BAR} height="5" rx="1" fill={col} fillOpacity={on ? 1 : m.strength} />
                  <path d={`M${cx} ${BH - 5}V${r2(BH * 0.32)}`} stroke={col} strokeOpacity={Math.max(m.strength, 0.6)} strokeWidth={on ? 2 : 1.2} />
                  <circle cx={cx} cy={BH - 8} r={on ? 4 : 2.6} fill={col} />
                  <text x={cx} y="12" fontSize="13" fontWeight={on ? 500 : 400} fill="#2F2F2F" textAnchor="middle">{m.level}</text>
                </g>
              )}
              {on && <path d={`M${cx - 14} ${cut ? BH + 3 : -2}h28`} stroke={col} strokeWidth="2" />}
            </g>
          );
        })}
      </g>
    </Art>
  );
}
