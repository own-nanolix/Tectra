// Shared helpers for the gradients page: the six gradient specs, a CSS-angle gradient builder, the grain filter,
// and the plate wrapper (figure + caption + scroll reveal).
import Reveal from '@/components/site/Reveal';
import { r2 } from '@/lib/charts';
import s from './gradients.module.css';

// The six gradients of the case study. Names are ours; values are from SOURCE.md (Gradients, textures).
export const GRADS = [
  { id: 'field', name: 'Field', spec: '#5BA8F8 to #4C9BF3, 160 degrees', stops: [['#5BA8F8', 1, 0], ['#4C9BF3', 1, 100]] },
  { id: 'blue-fade', name: 'Blue fade', spec: '#4093EC to transparent, vertical', stops: [['#4093EC', 1, 0], ['#4093EC', 0, 100]] },
  { id: 'signal-fade', name: 'Signal fade', spec: '#FFB83D to transparent, vertical', stops: [['#FFB83D', 1, 0], ['#FFB83D', 0, 100]] },
  { id: 'idle-fade', name: 'Idle fade', spec: '#DFDFDF to transparent, vertical', stops: [['#DFDFDF', 1, 0], ['#DFDFDF', 0, 100]] },
  { id: 'glass', name: 'Glass', spec: 'white 22% to 12%, vertical', stops: [['#FFFFFF', 0.22, 0], ['#FFFFFF', 0.12, 100]] },
  { id: 'area', name: 'Area', spec: 'white 75% to 0, vertical', stops: [['#FFFFFF', 0.75, 0], ['#FFFFFF', 0, 100]] },
];

// CSS-style linear gradient for a w x h box at x, y with the CSS angle (0 = up, 90 = right, 180 = down).
export function Linear({ id, x = 0, y = 0, w, h, deg = 180, stops }) {
  const a = (deg * Math.PI) / 180;
  const dx = Math.sin(a), dy = -Math.cos(a);
  const len = Math.abs(w * dx) + Math.abs(h * dy);
  const cx = x + w / 2, cy = y + h / 2;
  return (
    <linearGradient id={id} gradientUnits="userSpaceOnUse" x1={r2(cx - (dx * len) / 2)} y1={r2(cy - (dy * len) / 2)} x2={r2(cx + (dx * len) / 2)} y2={r2(cy + (dy * len) / 2)}>
      {stops.map(([c, o, p], i) => <stop key={i} offset={`${p}%`} stopColor={c} stopOpacity={o} />)}
    </linearGradient>
  );
}

export const gradById = (id) => GRADS.find((g) => g.id === id);

// Paper grain: fractal noise turned into a faint navy speckle. amount 0..1.2 sets how strong it is.
export function GrainDefs({ id, amount = 0.6 }) {
  return (
    <filter id={id} x="0" y="0" width="100%" height="100%" filterUnits="objectBoundingBox" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" stitchTiles="stitch" />
      <feColorMatrix type="matrix" values={`0 0 0 0 0.04  0 0 0 0 0.18  0 0 0 0 0.39  ${r2(amount * 1.6)} 0 0 0 ${r2(-amount * 0.5)}`} />
    </filter>
  );
}

// A plate: figure with a scroll reveal and a plain caption. span is 1..12 columns.
export function Plate({ span = 6, name, spec, children, dark = false, className = '' }) {
  return (
    <Reveal as="figure" className={`${s.plate} ${dark ? s.dark : ''} ${className}`} style={{ '--span': span }}>
      <div className={s.frame}>{children}</div>
      <figcaption className={s.cap}>
        <b>{name}</b>
        {spec && <span>{spec}</span>}
      </figcaption>
    </Reveal>
  );
}
