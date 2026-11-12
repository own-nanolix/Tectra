// The Tectra mark, traced from the case study, and its lockups. All parts are SVG groups (<g>) so they can be
// placed inside any artwork; wrap them in <Art> to make a standalone, exportable graphic.
//
// Geometry on a 100-unit square: two equal circles A and B (r 28.4) fused along a 45 degree diagonal with two
// concave fillets (r 7.7), and a separate circle C (r 19) upper right.

export const MARK = {
  A: { cx: 28.4, cy: 34.2, r: 28.4 },
  B: { cx: 66.3, cy: 71.3, r: 28.4 },
  C: { cx: 81.2, cy: 19.2, r: 19 },
  fillet: 7.7,
  // Fillet circle centres (where the two notches are rounded)
  F1: { cx: 64.48, cy: 35.25 },
  F2: { cx: 30.22, cy: 70.25 },
};
export const MARK_BODY = 'M56.79 35.02A7.7 7.7 0 0 0 64.87 42.94A28.4 28.4 0 1 1 37.91 70.48A7.7 7.7 0 0 0 29.83 62.56A28.4 28.4 0 1 1 56.79 35.02Z';
export const MARK_DOT = MARK.C;

// <MarkG x y size fill /> : the mark in a square of `size`. bodyClass / dotClass let a page animate the parts.
export function MarkG({ x = 0, y = 0, size = 100, fill = 'currentColor', bodyClass, dotClass, ...rest }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size / 100})`} fill={fill} {...rest}>
      <path d={MARK_BODY} className={bodyClass} />
      <circle cx={MARK.C.cx} cy={MARK.C.cy} r={MARK.C.r} className={dotClass} />
    </g>
  );
}

// The word. Urbanist Light, as on the container and the billboard. Baseline at y.
export function WordmarkG({ x = 0, y = 0, size = 84, fill = 'currentColor', anchor = 'start', registered = false, ...rest }) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight="300" textAnchor={anchor} fill={fill} letterSpacing={-size * 0.01} {...rest}>
      Tectra
      {registered && <tspan fontSize={size * 0.32} dy={-size * 0.42} fontWeight="400">®</tspan>}
    </text>
  );
}

// Horizontal lockup (billboard): mark left, word right. Box: 400 x 100 at size 100.
export const LOCKUP_H = { w: 400, h: 100 };
export function LockupG({ x = 0, y = 0, size = 100, fill = 'currentColor', markFill, ...rest }) {
  const k = size / 100;
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`} {...rest}>
      <MarkG fill={markFill || fill} />
      <WordmarkG x={124} y={79} size={84} fill={fill} />
    </g>
  );
}

// Stacked lockup (container): mark above, word centred below. Box: 300 x 232 at scale 1.
export const LOCKUP_V = { w: 300, h: 232 };
export function LockupStackG({ x = 0, y = 0, scale = 1, fill = 'currentColor', markFill, ...rest }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} {...rest}>
      <MarkG x={102} y={0} size={96} fill={markFill || fill} />
      <WordmarkG x={150} y={218} size={104} fill={fill} anchor="middle" />
    </g>
  );
}

// App icon: the yellow tile with the mark in light grey. radius 6 is the web tile, 22 the dock icon.
export function AppIconG({ x = 0, y = 0, size = 100, radius = 6, tile = '#FFB83D', fill = '#F5F5F5', ...rest }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size / 100})`} {...rest}>
      <rect width="100" height="100" rx={radius} fill={tile} />
      <MarkG x={22} y={22} size={56} fill={fill} />
    </g>
  );
}

// The mark as a window: children are clipped to the mark's shape (the billboard device).
// Give each use its own idp. Children are drawn in the mark's 100-unit space before scaling.
export function MarkWindowG({ idp, x = 0, y = 0, size = 100, children, ...rest }) {
  const id = `${idp}-markclip`;
  return (
    <g transform={`translate(${x} ${y}) scale(${size / 100})`} {...rest}>
      <clipPath id={id}>
        <path d={MARK_BODY} />
        <circle cx={MARK.C.cx} cy={MARK.C.cy} r={MARK.C.r} />
      </clipPath>
      <g clipPath={`url(#${id})`}>{children}</g>
    </g>
  );
}
