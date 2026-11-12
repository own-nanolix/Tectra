import Art from '@/components/art/Art';
import { AppIconG } from '@/components/art/Mark';
import { BackdropG, ShadowG } from '@/components/art/Mockup';

export const SIZES = [16, 32, 64, 128, 256];

// A soft light from the upper left over the tile (same artwork at every size).
function Gloss({ idp, size }) {
  return (
    <g>
      <rect width={size} height={size} rx={(size * 22) / 100} fill={`url(#${idp}-gloss)`} />
    </g>
  );
}

function GlossDef({ idp }) {
  return (
    <defs>
      <linearGradient id={`${idp}-gloss`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.3" />
        <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="1" stopColor="#7A5000" stopOpacity="0.14" />
      </linearGradient>
    </defs>
  );
}

// One size on its own: true pixels (1 unit = 1 px).
export function IconArt({ size }) {
  const idp = `use-product-icon-${size}`;
  return (
    <Art viewBox={`0 0 ${size} ${size}`} width={size} height={size} title={`App icon, ${size} px`} exportName={`use-product-icon-${size}`}>
      <GlossDef idp={idp} />
      <AppIconG size={size} radius={22} />
      <Gloss idp={idp} size={size} />
    </Art>
  );
}

// The ladder on a ruler: 16, 32, 64, 128 and 256 px at true size, bottoms on the ruler.
export function IconLadderArt() {
  const idp = 'use-product-ladder';
  const x0 = 40;
  const gap = 48;
  const pos = [];
  SIZES.reduce((x, sz) => {
    pos.push(x);
    return x + sz + gap;
  }, x0);
  const top = 330;
  const endX = x0 + 704;
  const ticks = Array.from({ length: 45 }, (_, i) => i * 16);
  return (
    <Art viewBox="0 0 800 400" title="App icon at 16, 32, 64, 128 and 256 px on a ruler" exportName="use-product-icon-ladder">
      <GlossDef idp={idp} />
      <BackdropG w={800} h={400} />
      {SIZES.map((sz, i) => (
        <ShadowG key={sz} idp={`${idp}-${sz}`} cx={pos[i] + sz / 2} cy={top + 2} rx={sz * 0.55} ry={Math.max(2, sz * 0.05)} tone="yellow" opacity={0.5} blur={Math.max(1, sz * 0.04)} />
      ))}
      {SIZES.map((sz, i) => (
        <g key={sz} transform={`translate(${pos[i]} ${top - sz})`}>
          <AppIconG size={sz} radius={22} />
          <Gloss idp={idp} size={sz} />
        </g>
      ))}
      <rect x={x0 - 24} y={top} width={704 + 48} height="52" fill="#F0F0F0" />
      <rect x={x0 - 24} y={top} width={704 + 48} height="2" fill="#2F2F2F" opacity="0.3" />
      {ticks.map((t) => (
        <path key={t} d={`M${x0 + t} ${top + 2}v${t % 64 === 0 ? 20 : t % 32 === 0 ? 13 : 7}`} stroke="#5E5E5E" strokeWidth="1" />
      ))}
      {[0, 64, 128, 192, 256, 320, 384, 448, 512, 576, 640, 704].map((t) => (
        <text key={t} x={x0 + t} y={top + 40} fontSize="11" fill="#5E5E5E" textAnchor="middle">{t}</text>
      ))}
      {SIZES.map((sz, i) => (
        <g key={sz}>
          <path d={`M${pos[i]} ${top - sz - 14}h${sz}`} stroke="#4093EC" strokeWidth="1" />
          <path d={`M${pos[i]} ${top - sz - 18}v8M${pos[i] + sz} ${top - sz - 18}v8`} stroke="#4093EC" strokeWidth="1" />
          <text x={pos[i] + sz / 2} y={top - sz - 24} fontSize="12" fill="#145CB8" textAnchor="middle">{sz} px</text>
        </g>
      ))}
      <path d={`M${endX} ${top + 2}v22`} stroke="#5E5E5E" strokeWidth="1" />
    </Art>
  );
}
