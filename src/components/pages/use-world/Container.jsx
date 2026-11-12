import Art from '@/components/art/Art';
import { LockupStackG } from '@/components/art/Mark';
import { IsoSiteG, TreesG } from '@/components/art/KeyArt';
import { BackdropG, ShadowG, MaterialDefs, LayerG, AxisG, CalloutG } from '@/components/art/Mockup';
import { Ground, Bolt } from './parts';

const P = 'use-world-ct';
const G = 868; // ground line of this plate: the container hangs well above it
const C = { x: 332, y: 400, w: 936, h: 400 };
const FACE = { x: 362, y: 418, w: 876, h: 364 };
const CORNERS = [[338, 398], [1262, 398]];

function Rigging() {
  const eye = [800, 266];
  const ends = CORNERS.flatMap(([cx, cy]) => [[cx - 8, cy], [cx + 16, cy]]);
  return (
    <g>
      <path d="M788 0V120M812 0V120" stroke="#2F2F2F" strokeWidth="5" />
      <path d="M786 0V120" stroke="#8A8A8A" strokeWidth="1.2" />
      {ends.map(([ex, ey], i) => (
        <g key={i}>
          <path d={`M${eye[0]} ${eye[1]}L${ex} ${ey}`} stroke="#1C1C1C" strokeWidth="4.4" strokeLinecap="round" />
          <path d={`M${eye[0] - 1} ${eye[1] - 1}L${ex - 1} ${ey - 1}`} stroke="#8A8A8A" strokeWidth="1" opacity="0.7" />
          <circle cx={ex} cy={ey} r="7" fill="none" stroke="#FFB83D" strokeWidth="4" />
          <rect x={ex - 3} y={ey + 3} width="6" height="9" rx="2" fill="#5A5A5A" />
        </g>
      ))}
      {/* hook block: yellow and black stripes */}
      <path d="M772 120H828L840 200Q840 216 826 216H774Q760 216 760 200Z" fill={`url(#${P}-hazard)`} />
      <path d="M772 120H828L840 200Q840 216 826 216H774Q760 216 760 200Z" fill={`url(#${P}-shade)`} />
      <path d="M772 120H828L840 200Q840 216 826 216H774Q760 216 760 200Z" fill="none" stroke="#2F2F2F" strokeWidth="1.4" />
      <circle cx="800" cy="152" r="14" fill={`url(#${P}-metal-dark)`} />
      <circle cx="800" cy="152" r="5" fill="#C9C9C9" />
      <path d="M800 216V246C800 266 776 272 770 254" stroke="#3A3A3A" strokeWidth="13" strokeLinecap="round" fill="none" />
      <path d="M798 218V244C798 262 778 267 772 253" stroke="#9A9A9A" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx={eye[0]} cy={eye[1]} r="9" fill="none" stroke="#2F2F2F" strokeWidth="5" />
    </g>
  );
}

function Container() {
  const { x, y, w, h } = C;
  return (
    <g>
      <rect x={FACE.x} y={FACE.y} width={FACE.w} height={FACE.h} fill={`url(#${P}-rib)`} />
      <rect x={FACE.x} y={FACE.y} width={FACE.w} height={FACE.h} fill={`url(#${P}-shade)`} />
      <rect x={FACE.x} y={FACE.y} width={FACE.w} height={FACE.h} fill={`url(#${P}-shade-v)`} />
      {/* top and bottom rails with fork pockets */}
      <rect x={x} y={y} width={w} height="18" fill={`url(#${P}-metal)`} />
      <rect x={x} y={y} width={w} height="18" fill={`url(#${P}-shade-v)`} />
      <rect x={x} y={y + h - 18} width={w} height="18" fill={`url(#${P}-metal)`} />
      <rect x={x} y={y + h - 18} width={w} height="18" fill={`url(#${P}-shade-v)`} />
      {[[560, 70], [1000, 70]].map(([px, pw]) => (
        <rect key={px} x={px} y={y + h - 14} width={pw} height="12" fill="#FFFFFF" stroke="#8A8A8A" strokeWidth="1.2" />
      ))}
      <path d={`M${x} ${y + 18}H${x + w}`} stroke="#6A6A6A" strokeWidth="1" opacity="0.5" />
      <path d={`M${x + 2} ${y + 1.5}H${x + w - 2}`} stroke="#FFFFFF" strokeWidth="2" />
      {/* corner posts */}
      <rect x={x} y={y} width="30" height={h} fill={`url(#${P}-metal)`} />
      <rect x={x + w - 30} y={y} width="30" height={h} fill={`url(#${P}-metal)`} />
      <rect x={x} y={y} width={w} height={h} fill="none" />
      <path d={`M${x + 8} ${y}V${y + h}`} stroke="#FFFFFF" strokeWidth="3" opacity="0.7" />
      <path d={`M${x + w - 22} ${y}V${y + h}`} stroke="#FFFFFF" strokeWidth="2" opacity="0.5" />
      <rect x={x + w - 30} y={y} width="30" height={h} fill={`url(#${P}-shade)`} />
      {/* locking rods on the right post */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={x + w - 24} y={y + 60 + i * 84} width="6" height="64" rx="2" fill="#8A8A8A" />
      ))}
      {/* corner castings */}
      {[[x, y], [x + w - 34, y], [x, y + h - 20], [x + w - 34, y + h - 20]].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <rect x={cx} y={cy} width="34" height="20" rx="3" fill={`url(#${P}-metal-dark)`} />
          <ellipse cx={cx + 17} cy={cy + 10} rx="9" ry="4.4" fill="#111111" />
          <Bolt x={cx + 5} y={cy + 5} r={2.2} />
        </g>
      ))}
    </g>
  );
}

function Print() {
  const { x, y, w, h } = FACE;
  return (
    <g>
      <clipPath id={`${P}-print`}>
        <rect x={x} y={y} width={w} height={h} />
      </clipPath>
      <g clipPath={`url(#${P}-print)`}>
        <rect x={x} y={y} width={w} height={h} fill="#FFFFFF" opacity="0.55" />
        <IsoSiteG x={x + 6} y={y + 10} scale={0.8} tone="paper" pins={['ridge']} trees={false} />
        <TreesG x={x + 560} y={y + 30} w={300} h={320} count={6} tone="paper" seed={51} minSize={56} maxSize={96} />
        <LockupStackG x={x + 410} y={y + 160} scale={0.62} fill="#2F2F2F" markFill="#8F8F8F" />
        <rect x={x} y={y} width={w} height={h} fill={`url(#${P}-ribshade)`} />
        <rect x={x} y={y} width={w} height={h} fill={`url(#${P}-shade)`} opacity="0.6" />
      </g>
      <rect x={x + w} y={y + 3} width="4" height={h} fill="#8A8A8A" opacity="0.5" />
      <rect x={x} y={y} width={w} height={h} fill="none" stroke="#FFFFFF" strokeWidth="1.4" opacity="0.8" />
      <rect x={x} y={y} width={w} height={h} fill="none" stroke="#2F2F2F" strokeWidth="0.6" opacity="0.25" />
    </g>
  );
}

export default function ContainerScene() {
  return (
    <Art viewBox="0 0 1600 900" title="Shipping container on crane cables, exploded: rigging, container and print" exportName="use-world-container">
      <MaterialDefs idp={P} />
      <defs>
        <linearGradient id={`${P}-ribg`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.35" stopColor="#F0F0F0" />
          <stop offset="0.5" stopColor="#C9C9C9" />
          <stop offset="0.72" stopColor="#E2E2E2" />
          <stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
        <pattern id={`${P}-rib`} width="24" height="10" patternUnits="userSpaceOnUse">
          <rect width="24" height="10" fill={`url(#${P}-ribg)`} />
        </pattern>
        <pattern id={`${P}-ribshade`} width="24" height="10" patternUnits="userSpaceOnUse">
          <rect x="11" width="8" height="10" fill="#000000" opacity="0.13" />
          <rect x="2" width="5" height="10" fill="#FFFFFF" opacity="0.3" />
        </pattern>
        <pattern id={`${P}-hazard`} width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="22" height="22" fill="#FFB83D" />
          <rect width="11" height="22" fill="#2F2F2F" />
        </pattern>
      </defs>
      <BackdropG w={1600} h={900} />
      <Ground y={G} />
      <ShadowG idp={`${P}-s1`} cx={800} cy={G} rx={520} ry={16} tone="blue" opacity={0.3} blur={12} />
      <ShadowG idp={`${P}-s2`} cx={820} cy={G - 4} rx={300} ry={10} tone="yellow" opacity={0.22} />
      <AxisG points={[[1350, 150], [1350, 530], [1350, 640]]} />
      <CalloutG x={840} y={150} tx={1350} ty={150} label="Rigging" />
      <CalloutG x={1240} y={530} tx={1350} ty={530} label="Print" />
      <CalloutG x={1268} y={650} tx={1350} ty={650} label="Container" />
      <LayerG i={0} dy={-100}>
        <Rigging />
      </LayerG>
      <LayerG i={1}>
        <Container />
      </LayerG>
      <LayerG i={2} dy={-70}>
        <Print />
      </LayerG>
    </Art>
  );
}
