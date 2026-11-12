import { ICONS } from './icons';
import { MARK_BODY, MARK_DOT } from '@/components/art/Mark';

// Hidden SVG sprite: the logo symbol (#site-mark) and every icon (#site-icon-<name>).
export default function Sprite() {
  return (
    <svg id="site-sprite" width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
      <defs>
        <symbol id="site-mark" viewBox="0 0 100 100">
          <path d={MARK_BODY} fill="currentColor" />
          <circle cx={MARK_DOT.cx} cy={MARK_DOT.cy} r={MARK_DOT.r} fill="currentColor" />
        </symbol>
        {Object.entries(ICONS).map(([name, d]) => (
          <symbol key={name} id={`site-icon-${name}`} viewBox="0 0 24 24">
            <path d={d} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </symbol>
        ))}
      </defs>
    </svg>
  );
}
