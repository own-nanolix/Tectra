import Reveal from '@/components/site/Reveal';
import s from './use-product.module.css';

// A white plate with a plain caption. The artwork (one exportable SVG) is the child.
export function Plate({ children, caption, note, className = '', delay = 0 }) {
  return (
    <Reveal delay={delay} className={className}>
      <figure className={s.fig}>
        <div className="mock">{children}</div>
        <figcaption className="mock-cap">
          <span>{caption}</span>
          {note ? <span>{note}</span> : null}
        </figcaption>
      </figure>
    </Reveal>
  );
}

// Offset of a point along a rib: a perpendicular step used by the hard hat ridge and ribs.
export const perp = (o) => ({ x: -0.5 * o, y: 0.85 * o });

// A soft glossy gradient set for the white hard hat. Used together with MaterialDefs (same idp).
export function HatDefs({ idp }) {
  return (
    <defs>
      <radialGradient id={`${idp}-dome`} cx="0.3" cy="0.22" r="0.86">
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="0.34" stopColor="#F2F2F2" />
        <stop offset="0.66" stopColor="#DCDCDC" />
        <stop offset="1" stopColor="#BDBDBD" />
      </radialGradient>
      <linearGradient id={`${idp}-core`} x1="0.1" y1="0" x2="0.95" y2="1">
        <stop offset="0" stopColor="#000000" stopOpacity="0" />
        <stop offset="0.45" stopColor="#000000" stopOpacity="0.02" />
        <stop offset="1" stopColor="#1B2A44" stopOpacity="0.3" />
      </linearGradient>
      <linearGradient id={`${idp}-rimlight`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="0.72" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.95" />
      </linearGradient>
      <linearGradient id={`${idp}-band`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#E0E0E0" />
        <stop offset="0.3" stopColor="#F4F4F4" />
        <stop offset="0.62" stopColor="#DCDCDC" />
        <stop offset="1" stopColor="#C0C0C0" />
      </linearGradient>
      <linearGradient id={`${idp}-brim`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#F6F6F6" />
        <stop offset="0.5" stopColor="#E3E3E3" />
        <stop offset="1" stopColor="#BBBBBB" />
      </linearGradient>
      <filter id={`${idp}-b8`} x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="8" />
      </filter>
      <filter id={`${idp}-b2`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1.6" />
      </filter>
    </defs>
  );
}
