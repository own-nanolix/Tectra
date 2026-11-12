import { LayerG, AxisG, ShadowG } from '@/components/art/Mockup';
import { Plate, MarkG, LockupG, LabelArt, K, mix } from './parts';
import { seeded, r2 } from '@/lib/charts';

// Top-view paper goods: tissue sheets fanned along the diagonal with a seal lifted above, a sheet of seal
// stickers, and the shipping labels. All pieces are lit from the upper left; shadows fall lower right.

// ---- a round seal sticker, centred on 0,0 ----
function Seal({ r = 44, fill, ink, ring }) {
  return (
    <g>
      <circle r={r} fill={fill} />
      <circle r={r - 5} fill="none" stroke={ring} strokeWidth="0.9" strokeDasharray="2 3" opacity="0.75" />
      <MarkG x={-r * 0.46} y={-r * 0.5} size={r * 0.94} fill={ink} />
    </g>
  );
}
const SEAL = {
  blue: { fill: K.blue, ink: '#FFFFFF', ring: '#FFFFFF' },
  yellow: { fill: K.yellow, ink: K.ink, ring: K.ink },
  white: { fill: '#FFFFFF', ink: K.blue, ring: K.sky },
};
function SealG({ idp, kind, r = 44, lifted = 0 }) {
  const c = SEAL[kind];
  return (
    <g>
      <circle r={r} cx={2 + lifted * 0.35} cy={3 + lifted * 0.5} fill={K.ink} opacity={0.1 + lifted * 0.002} filter={`url(#${idp}-soft)`} />
      <Seal r={r} {...c} />
      <circle r={r} fill="none" stroke="#000000" strokeOpacity="0.14" strokeWidth="0.8" />
      <circle r={r} fill={`url(#${idp}-glass)`} opacity="0.55" />
      <path d={`M${-r * 0.72} ${-r * 0.42}A${r * 0.84} ${r * 0.84} 0 0 1 ${-r * 0.18} ${-r * 0.82}`} fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </g>
  );
}

// ---- tissue ----
const SHEETS = [
  { base: K.white, pat: 'fuse' },
  { base: mix(K.sky, '#FFFFFF', 0.72), pat: 'marks' },
  { base: K.white, pat: 'marks' },
  { base: K.kraft, pat: 'fuse' },
  { base: K.white, pat: 'fuse' },
];
function Sheet({ idp, i, base, pat }) {
  const w = 206, h = 206;
  const rnd = seeded(40 + i * 7);
  let creases = '';
  for (let k = 0; k < 6; k++) {
    const x0 = (rnd() - 0.5) * w, y0 = (rnd() - 0.5) * h;
    creases += `M${r2(x0)} ${r2(y0)}l${r2((rnd() - 0.5) * 90)} ${r2((rnd() - 0.5) * 90)}`;
  }
  return (
    <g>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx="3" transform="translate(12 16)" fill={K.blue} opacity="0.22" filter={`url(#${idp}-soft)`} />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx="3" fill={base} filter={`url(#${idp}-paper)`} stroke="#000000" strokeOpacity="0.1" strokeWidth="0.8" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx="3" fill={`url(#${idp}-pat-${pat})`} opacity={pat === 'fuse' ? 0.75 : 0.6} />
      <path d={creases} fill="none" stroke="#FFFFFF" strokeWidth="1.4" opacity="0.7" />
      <path d={creases} fill="none" stroke="#000000" strokeWidth="0.7" opacity="0.07" transform="translate(1.2 1.4)" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx="3" fill={`url(#${idp}-shade)`} opacity="0.9" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx="3" fill={`url(#${idp}-shade-v)`} opacity="0.6" />
      {/* a turned-up corner, lower right: lighter on its back, a soft shadow below */}
      <path d={`M${w / 2 - 54} ${h / 2}L${w / 2} ${h / 2 - 54}L${w / 2 - 46} ${h / 2 - 46}Z`} fill="#000000" opacity="0.1" transform="translate(2 3)" filter={`url(#${idp}-soft)`} />
      <path d={`M${w / 2 - 54} ${h / 2}L${w / 2} ${h / 2 - 54}L${w / 2} ${h / 2}Z`} fill={mix(base, '#FFFFFF', 0.5)} stroke="#000000" strokeOpacity="0.12" strokeWidth="0.7" />
    </g>
  );
}
export function Tissue() {
  const idp = 'use-packaging-tissue';
  const B = [310, 320];
  return (
    <Plate idp={idp} w={780} h={580} title="Tissue paper printed with the three-circle pattern, five sheets fanned along the diagonal with the seal sticker lifted above" exportName="use-packaging-tissue" pattern={K.blue} patternOpacity={0.85}>
      <ShadowG idp={`${idp}-sh`} cx={B[0] + 70} cy={B[1] + 120} rx={250} ry={44} tone="blue" opacity={0.16} blur={16} transform={`rotate(-30 ${B[0] + 70} ${B[1] + 120})`} />
      <AxisG points={[[B[0] - 100, B[1] + 64], [B[0], B[1] + 4], [B[0] + 100, B[1] - 56], [B[0] + 200, B[1] - 116], [B[0] + 260, B[1] - 152]]} />
      <g className="mock-lit">
        {SHEETS.map((sh, i) => (
          <LayerG key={i} i={i} dx={(i - 2) * 56} dy={-(i - 2) * 36}>
            <g transform={`translate(${B[0]} ${B[1]}) rotate(${(i - 2) * 8 + (i % 2 ? 2 : -1)})`}><Sheet idp={idp} i={i} {...sh} /></g>
          </LayerG>
        ))}
        <LayerG i={5} dx={168} dy={-142}>
          <g transform={`translate(${B[0]} ${B[1]}) rotate(-14)`}><SealG idp={idp} kind="blue" r={50} lifted={40} /></g>
        </LayerG>
      </g>
    </Plate>
  );
}

// ---- seal stickers on their liner ----
const GRID = [
  { kind: 'blue' }, { kind: 'yellow' }, { kind: 'white' },
  { kind: 'blue' }, null, { kind: 'yellow' },
];
export function Seals() {
  const idp = 'use-packaging-seal';
  const cell = (i) => [190 + (i % 3) * 150, 190 + Math.floor(i / 3) * 150];
  const pe = cell(4);
  return (
    <Plate idp={idp} w={760} h={520} title="Seal stickers on a liner sheet, one removed and lifted with a curled edge" exportName="use-packaging-seal" pattern={K.blue}>
      <ShadowG idp={`${idp}-sh`} cx={400} cy={440} rx={300} ry={44} tone="sky" opacity={0.45} blur={14} />
      <LayerG i={0}>
        <g>
          <rect x="110" y="106" width="500" height="326" rx="6" fill="#000000" opacity="0.06" transform="translate(8 12)" filter={`url(#${idp}-soft)`} />
          <rect x="110" y="106" width="500" height="326" rx="6" fill={K.kraft} filter={`url(#${idp}-paper)`} stroke="#000000" strokeOpacity="0.1" strokeWidth="0.8" />
          <rect x="110" y="106" width="500" height="326" rx="6" fill={`url(#${idp}-shade)`} />
          {GRID.map((g, i) => (g ? null : (
            <circle key={i} cx={cell(i)[0]} cy={cell(i)[1]} r="47" fill="#000000" opacity="0.06" stroke={K.grey} strokeOpacity="0.5" strokeWidth="0.8" />
          )))}
        </g>
      </LayerG>
      <LayerG i={1} dx={14} dy={-20}>
        <g>
          {GRID.map((g, i) => (g ? (
            <g key={i} transform={`translate(${cell(i)[0]} ${cell(i)[1]})`}><SealG idp={idp} kind={g.kind} r={44} lifted={8} /></g>
          ) : null))}
        </g>
      </LayerG>
      <LayerG i={2} dx={64} dy={-120}>
        <g transform={`translate(${pe[0]} ${pe[1]}) rotate(-12)`}>
          <SealG idp={idp} kind="blue" r={44} lifted={50} />
          <path d="M18 -37A44 44 0 0 1 42 12L-6 -4Z" fill="#FFFFFF" />
          <path d="M18 -37A44 44 0 0 1 42 12L-6 -4Z" fill={`url(#${idp}-shade)`} opacity="0.9" />
          <path d="M18 -37L-6 -4L42 12" fill="none" stroke="#000000" strokeOpacity="0.22" strokeWidth="0.9" strokeLinejoin="round" />
        </g>
      </LayerG>
      <AxisG points={[[cell(4)[0], cell(4)[1]], [cell(4)[0] + 32, cell(4)[1] - 64], [cell(4)[0] + 64, cell(4)[1] - 124]]} />
    </Plate>
  );
}

// ---- the shipping label ----
export const LABEL_CFG = [
  { key: 'white', accent: K.blue, seed: 3, shadow: 'blue', title: 'Shipping label with the lockup, quiet placeholder bars and a generic bar code, lifted off its liner' },
  { key: 'yellow', accent: K.yellow, seed: 11, shadow: 'yellow', title: 'Shipping label with a yellow edge, the lockup, quiet placeholder bars and a generic bar code, lifted off its liner' },
];
export function Label({ cfg }) {
  const idp = `use-packaging-label-${cfg.key}`;
  const k = 2.7;
  return (
    <Plate idp={idp} w={760} h={520} title={cfg.title} exportName={`use-packaging-label-${cfg.key}`} pattern={K.blue}>
      <ShadowG idp={`${idp}-sh`} cx={390} cy={448} rx={300} ry={40} tone={cfg.shadow} opacity={0.38} blur={14} />
      <AxisG points={[[110, 468], [250, 468], [390, 468], [530, 468]]} />
      <LayerG i={0}>
        <g>
          <rect x="90" y="70" width="480" height="340" rx="5" fill="#000000" opacity="0.06" transform="translate(8 12)" filter={`url(#${idp}-soft)`} />
          <rect x="90" y="70" width="480" height="340" rx="5" fill={K.kraft} filter={`url(#${idp}-paper)`} stroke="#000000" strokeOpacity="0.1" strokeWidth="0.8" />
          <rect x="90" y="70" width="480" height="340" rx="5" fill={`url(#${idp}-shade)`} />
        </g>
      </LayerG>
      <g className={cfg.key === 'white' ? 'mock-lit' : undefined}>
        <LayerG i={1} dx={50} dy={-22}>
          <g>
            <rect x="124" y="112" width={150 * k} height={96 * k} rx="3" fill={cfg.accent} opacity="0.3" transform="translate(10 14)" filter={`url(#${idp}-soft)`} />
            <g transform={`translate(124 112) scale(${k})`} filter={`url(#${idp}-paper)`}><LabelArt seed={cfg.seed} accent={cfg.accent} /></g>
            <rect x="124" y="112" width={150 * k} height={96 * k} rx="3" fill={`url(#${idp}-shade)`} opacity="0.8" />
            <rect x="124" y="112" width={150 * k} height={96 * k} rx="3" fill="none" stroke="#000000" strokeOpacity="0.12" strokeWidth="0.8" />
          </g>
        </LayerG>
        <LayerG i={2} dx={150} dy={-62}>
          <g transform="translate(220 106)">
            <rect x="110" y="294" width="150" height="60" rx="3" fill={K.ink} opacity="0.12" transform="translate(7 10)" filter={`url(#${idp}-soft)`} />
            <rect x="110" y="294" width="150" height="60" rx="3" fill={K.white} stroke="#000000" strokeOpacity="0.12" strokeWidth="0.8" />
            <rect x="110" y="294" width="150" height="5" rx="2" fill={cfg.accent} />
            <LockupG x={122} y={310} size={20} fill={K.ink} markFill={cfg.accent} />
            <path d={Array.from({ length: 24 }, (_, i) => `M${122 + i * 5.4} 346v${i % 5 === 0 ? -9 : -5}`).join('')} stroke={K.grey} strokeWidth="0.9" />
          </g>
        </LayerG>
      </g>
    </Plate>
  );
}
