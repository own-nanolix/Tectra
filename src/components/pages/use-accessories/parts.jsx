import Art from '@/components/art/Art';
import { BackdropG, MaterialDefs } from '@/components/art/Mockup';
import { PatternDefs, IsoSiteG, CraneG, TickBarsG } from '@/components/art/KeyArt';
import { MarkG, LockupG, LockupStackG, WordmarkG, AppIconG } from '@/components/art/Mark';
import { HERO, POSTER } from '@/lib/brand';
import { r2 } from '@/lib/charts';

// Palette only: white, Tectra Blue, Signal Yellow, Sky, Field Blue, Structure Blue, ink and light greys.
export const K = {
  white: '#FFFFFF',
  blue: '#4093EC',
  yellow: '#FFB83D',
  sky: '#90C0F3',
  field: '#53A2F7',
  deep: '#006BEE',
  ink: '#2F2F2F',
  g1: '#F5F5F5',
  g2: '#E9E9E9',
  g3: '#DDDDDD',
};

export const url = (idp, k) => `url(#${idp}-${k})`;

// One mockup: pure white plate, material kit, brand patterns and the shared light/satin gradients.
// children is a function that receives the unique id prefix of this SVG.
export function Plate({ name, title, w, h = 500, children }) {
  const idp = `use-accessories-${name}`;
  return (
    <Art viewBox={`0 0 ${w} ${h}`} title={title} exportName={idp}>
      <BackdropG w={w} h={h} />
      <MaterialDefs idp={idp} />
      <PatternDefs idp={`${idp}-pw`} color="#FFFFFF" opacity={0.55} />
      <PatternDefs idp={`${idp}-pb`} color="#4093EC" opacity={0.45} />
      <defs>
        <linearGradient id={`${idp}-lit`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.34" />
          <stop offset="0.45" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="0.6" stopColor="#000000" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.26" />
        </linearGradient>
        <radialGradient id={`${idp}-spot`} cx="0.28" cy="0.22" r="0.7">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <pattern id={`${idp}-sat`} width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
          <path d="M0 1.5H3" stroke="#FFFFFF" strokeWidth="0.9" opacity="0.2" />
          <path d="M0 0H3" stroke="#000000" strokeWidth="0.6" opacity="0.1" />
        </pattern>
      </defs>
      {children(idp)}
    </Art>
  );
}

// Soft coloured shadow of a flat shape, offset to the lower right (light from the upper left).
export function Lift({ idp, children, dx = 8, dy = 13, tone = K.sky, opacity = 0.42, as: Tag = 'g' }) {
  return (
    <Tag transform={`translate(${dx} ${dy})`} fill={tone} stroke="none" opacity={opacity} filter={url(idp, 'soft')}>
      {children}
    </Tag>
  );
}

const BOX = { mark: [100, 100], lockup: [400, 100], stack: [300, 232], icon: [100, 100], iso: [560, 400], crane: [200, 320], ticks: [300, 80], hero: [300, 120], poster: [300, 120], reg: [300, 100] };

// Brand artwork fitted into a w x h box centred on (x, y).
export function Artwork({ kind, idp, w, h, x = 0, y = 0, fg = K.white, alt = K.yellow, tone = 'paper', uid = 'a', ...rest }) {
  const [bw, bh] = BOX[kind];
  const sc = Math.min(w / bw, h / bh);
  let inner = null;
  if (kind === 'mark') inner = <MarkG fill={fg} />;
  if (kind === 'lockup') inner = <LockupG fill={fg} />;
  if (kind === 'stack') inner = <LockupStackG fill={fg} />;
  if (kind === 'icon') inner = <AppIconG tile={alt} fill={fg} />;
  if (kind === 'iso') inner = <IsoSiteG tone={tone} yellowPin="ridge" pins={['wing', 'gate']} />;
  if (kind === 'crane') inner = <CraneG />;
  if (kind === 'reg') inner = <WordmarkG x={150} y={78} size={92} fill={fg} anchor="middle" registered />;
  if (kind === 'ticks') inner = <TickBarsG idp={`${idp}-tb-${uid}`} w={300} h={50} count={30} tone={fg === K.white ? 'white' : fg === K.yellow ? 'yellow' : 'blue'} base={fg} />;
  if (kind === 'hero') {
    inner = (
      <g fill={fg} fontWeight="300" fontSize="50" letterSpacing="-0.5">
        <text x="0" y="50">{HERO.title[0]}</text>
        <text x="0" y="108">{HERO.title[1]}</text>
      </g>
    );
  }
  if (kind === 'poster') {
    inner = (
      <g fill={fg} fontWeight="300" fontSize="40" letterSpacing="-0.4">
        <text x="0" y="36">Build Smarter,</text>
        <text x="0" y="78">Build Faster</text>
        <text x="0" y="120">with Tectra</text>
      </g>
    );
  }
  return (
    <g transform={`translate(${r2(x - (bw * sc) / 2)} ${r2(y - (bh * sc) / 2)}) scale(${r2(sc * 1000) / 1000})`} {...rest}>
      {inner}
    </g>
  );
}

// The mark repeated around a cylinder: spacing and width follow cos / sin of the angle, so it compresses towards the edges.
export function CylRow({ cx, y, R, size, fill, step = 26 }) {
  const out = [];
  for (let i = -3; i <= 3; i += 1) {
    const th = (i * step * Math.PI) / 180;
    const c = Math.cos(th);
    if (c < 0.2) continue;
    out.push(
      <g key={i} transform={`translate(${r2(cx + R * Math.sin(th))} ${y}) scale(${r2(c)} 1)`} opacity={r2(0.35 + 0.65 * c)}>
        <MarkG x={-size / 2} y={-size / 2} size={size} fill={fill} />
      </g>,
    );
  }
  return <g>{out}</g>;
}

// Dashed stitching along any path.
export function Stitch({ d, stroke = K.white, w = 1.2, dash = '4 3', opacity = 0.85, ...rest }) {
  return <path d={d} fill="none" stroke={stroke} strokeWidth={w} strokeDasharray={dash} strokeLinecap="round" opacity={opacity} {...rest} />;
}

// Rounded rectangle path centred on 0,0.
export const rrect = (w, h, r) => `M${-w / 2 + r} ${-h / 2}H${w / 2 - r}A${r} ${r} 0 0 1 ${w / 2} ${-h / 2 + r}V${h / 2 - r}A${r} ${r} 0 0 1 ${w / 2 - r} ${h / 2}H${-w / 2 + r}A${r} ${r} 0 0 1 ${-w / 2} ${h / 2 - r}V${-h / 2 + r}A${r} ${r} 0 0 1 ${-w / 2 + r} ${-h / 2}Z`;

// Outline of a patch shape of half-extent h, centred on 0,0.
export function shapePath(shape, h) {
  if (shape === 'circle') return `M${-h} 0A${h} ${h} 0 1 0 ${h} 0A${h} ${h} 0 1 0 ${-h} 0Z`;
  if (shape === 'square') return rrect(h * 2, h * 2, h * 0.28);
  if (shape === 'hex') {
    const p = [0, 1, 2, 3, 4, 5].map((i) => {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      return `${r2(Math.cos(a) * h * 1.08)} ${r2(Math.sin(a) * h * 1.08)}`;
    });
    return `M${p.join('L')}Z`;
  }
  return `M${-h} ${-h * 0.92}H${h}V${h * 0.1}C${h} ${h * 0.7} ${h * 0.34} ${h * 0.96} 0 ${h * 1.1}C${-h * 0.34} ${h * 0.96} ${-h} ${h * 0.7} ${-h} ${h * 0.1}Z`;
}
