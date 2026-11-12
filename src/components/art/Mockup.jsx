// The mockup kit. This project's direction (do not change it per page):
//   Staging:  exploded view: each object pulled apart into its layers along one axis.
//   Backdrop: pure white with coloured contact shadows.
//   Light:    one direction, from the upper left (LIGHT). Highlights sit upper-left, shade lower-right.
// Each mockup is ONE <Art> SVG: backdrop, shadow, object, materials, shading and the brand artwork on it.
// Every page arranges its objects and its explode axis differently (see LAYOUTS.md).

export const LIGHT = { x: -0.6, y: -0.8, angle: 127 }; // unit vector the light travels along is (0.6, 0.8)
export const SHADOW_TONES = { blue: '#4093EC', yellow: '#FFB83D', sky: '#90C0F3', ink: '#2F2F2F', deep: '#006BEE' };

// Pure white backdrop. Put it first in the SVG.
export function BackdropG({ w, h, fill = '#FFFFFF', ...rest }) {
  return <rect width={w} height={h} fill={fill} {...rest} />;
}

// Coloured contact shadow: a soft ellipse under (and slightly lower-right of) the object.
// idp must be unique per shadow. tone: 'blue' | 'yellow' | 'sky' | 'ink' | 'deep'.
export function ShadowG({ idp, cx, cy, rx, ry = rx * 0.16, tone = 'blue', opacity = 0.28, blur = 10, ...rest }) {
  const id = `${idp}-shadow`;
  return (
    <g {...rest}>
      <filter id={id} x="-30%" y="-120%" width="160%" height="340%">
        <feGaussianBlur stdDeviation={blur} />
      </filter>
      <ellipse cx={cx + rx * 0.06} cy={cy} rx={rx} ry={ry} fill={SHADOW_TONES[tone] || tone} opacity={opacity} filter={`url(#${id})`} />
      <ellipse cx={cx + rx * 0.03} cy={cy - ry * 0.2} rx={rx * 0.72} ry={ry * 0.42} fill={SHADOW_TONES[tone] || tone} opacity={opacity * 0.7} filter={`url(#${id})`} />
    </g>
  );
}

// Material definitions as <defs>. Put <MaterialDefs idp="..." /> once inside each mockup SVG, then use:
//   fill="url(#<idp>-metal)"      brushed steel, light from upper left
//   fill="url(#<idp>-metal-dark)" dark anodised metal
//   fill="url(#<idp>-plastic)"    white glossy plastic (hard hat, buckles)
//   fill="url(#<idp>-glass)"      glass sheen (overlay, low opacity)
//   fill="url(#<idp>-ceramic)"    glazed ceramic (mugs)
//   fill="url(#<idp>-rubber)"     matte rubber / silicone
//   fill="url(#<idp>-card)"       coated card / paper stock
//   fill="url(#<idp>-shade)"      generic left-to-right shade overlay (black, low opacity) for round bodies
//   fill="url(#<idp>-shade-v)"    top-to-bottom shade overlay
//   filter="url(#<idp>-fabric)"   woven fabric texture (apply to the coloured shape)
//   filter="url(#<idp>-paper)"    fine paper grain
//   filter="url(#<idp>-soft)"     small blur for soft edges and inner shading
export function MaterialDefs({ idp }) {
  return (
    <defs>
      <linearGradient id={`${idp}-metal`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#F4F4F4" />
        <stop offset="0.28" stopColor="#C9C9C9" />
        <stop offset="0.5" stopColor="#EDEDED" />
        <stop offset="0.74" stopColor="#A9A9A9" />
        <stop offset="1" stopColor="#D5D5D5" />
      </linearGradient>
      <linearGradient id={`${idp}-metal-dark`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#5A5A5A" />
        <stop offset="0.4" stopColor="#2F2F2F" />
        <stop offset="0.62" stopColor="#474747" />
        <stop offset="1" stopColor="#1C1C1C" />
      </linearGradient>
      <radialGradient id={`${idp}-plastic`} cx="0.32" cy="0.24" r="0.95">
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="0.55" stopColor="#ECECEC" />
        <stop offset="1" stopColor="#C8C8C8" />
      </radialGradient>
      <linearGradient id={`${idp}-glass`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" />
        <stop offset="0.38" stopColor="#FFFFFF" stopOpacity="0.08" />
        <stop offset="0.62" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.22" />
      </linearGradient>
      <linearGradient id={`${idp}-ceramic`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.5" />
        <stop offset="0.22" stopColor="#FFFFFF" stopOpacity="0.9" />
        <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="1" stopColor="#000000" stopOpacity="0.22" />
      </linearGradient>
      <linearGradient id={`${idp}-rubber`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#4A4A4A" />
        <stop offset="1" stopColor="#262626" />
      </linearGradient>
      <linearGradient id={`${idp}-card`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#EFEFEF" />
      </linearGradient>
      <linearGradient id={`${idp}-shade`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.28" />
        <stop offset="0.3" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="0.6" stopColor="#000000" stopOpacity="0" />
        <stop offset="1" stopColor="#000000" stopOpacity="0.24" />
      </linearGradient>
      <linearGradient id={`${idp}-shade-v`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.22" />
        <stop offset="0.4" stopColor="#000000" stopOpacity="0" />
        <stop offset="1" stopColor="#000000" stopOpacity="0.2" />
      </linearGradient>
      <filter id={`${idp}-fabric`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9 0.35" numOctaves="2" seed="4" result="n" />
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.22 0" result="g" />
        <feComposite in="g" in2="SourceAlpha" operator="in" result="gi" />
        <feMerge>
          <feMergeNode in="SourceGraphic" />
          <feMergeNode in="gi" />
        </feMerge>
      </filter>
      <filter id={`${idp}-paper`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="1" seed="9" result="n" />
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.09 0" result="g" />
        <feComposite in="g" in2="SourceAlpha" operator="in" result="gi" />
        <feMerge>
          <feMergeNode in="SourceGraphic" />
          <feMergeNode in="gi" />
        </feMerge>
      </filter>
      <filter id={`${idp}-soft`} x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="3" />
      </filter>
    </defs>
  );
}

// One layer of an exploded object. The layer's final (pulled-apart) position is set by dx, dy in the transform
// attribute; on load it slides out from the assembled position. i sets the order of the animation.
//   <LayerG i={0}>base</LayerG> <LayerG i={1} dy={-60}>middle</LayerG> <LayerG i={2} dy={-120}>top</LayerG>
export function LayerG({ i = 0, dx = 0, dy = 0, children, ...rest }) {
  return (
    <g transform={`translate(${dx} ${dy})`} {...rest}>
      <g className="mock-layer" style={{ '--i': i, '--dx': dx, '--dy': dy }}>
        {children}
      </g>
    </g>
  );
}

// The explode axis: a dashed guide with a tick at each stop. points = [[x, y], ...] along the axis.
export function AxisG({ points, ...rest }) {
  const d = points.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join('');
  return (
    <g {...rest}>
      <path d={d} className="mock-guide" stroke="#90C0F3" strokeWidth="1" strokeDasharray="3 5" fill="none" />
      {points.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="#FFFFFF" stroke="#4093EC" strokeWidth="1" />
      ))}
    </g>
  );
}

// A small layer label with a leader line. Text must be a plain deliverable name or brand text.
export function CalloutG({ x, y, tx, ty, label, anchor = 'start', ...rest }) {
  return (
    <g {...rest}>
      <path d={`M${x} ${y}L${tx} ${ty}`} stroke="#90C0F3" strokeWidth="1" fill="none" />
      <circle cx={x} cy={y} r="2.5" fill="#4093EC" />
      <text x={tx + (anchor === 'end' ? -6 : 6)} y={ty + 4} fontSize="12" fontWeight="400" fill="#5E5E5E" textAnchor={anchor}>
        {label}
      </text>
    </g>
  );
}

// Glass / gloss sheen that slowly turns to the light. Place over a shape of the same geometry.
export function SheenG({ idp, d, opacity = 0.45, ...rest }) {
  return <path d={d} fill={`url(#${idp}-glass)`} opacity={opacity} className="mock-sheen" {...rest} />;
}
