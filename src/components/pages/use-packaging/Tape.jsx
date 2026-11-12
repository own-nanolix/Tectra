import { LayerG, AxisG, ShadowG, SheenG } from '@/components/art/Mockup';
import { WordmarkG } from '@/components/art/Mark';
import { Plate, MarkG, LockupG, K, mix, pd } from './parts';
import { r2 } from '@/lib/charts';

// Tape: roll in side elevation (core, roll thickness as circles, printed strip curving off), and strips.
// Oblique projection: depth runs up and to the right by DV.
const DV = [54, -42];
const TW = 40; // strip width in strip units (maps onto DV)

const ticks = (L, y, up = true) => {
  let d = '';
  for (let i = 0; i * 6 < L; i++) d += `M${i * 6 + 2} ${y}v${up ? '-' : ''}${i % 5 === 0 ? 8 : 4.5}`;
  return d;
};

// printed artwork of a strip, in strip space: u along the length (0..L), v across the width (0..TW), upright
const PRINT = {
  blue: (L) => (
    <g>
      <rect width={L} height={TW} fill={K.blue} />
      {Array.from({ length: Math.floor((L - 14) / 46) + 1 }, (_, i) => (
        <MarkG key={i} x={14 + i * 46} y={TW / 2 - 11} size={22} fill="#FFFFFF" />
      ))}
    </g>
  ),
  kraft: (L) => (
    <g>
      <rect width={L} height={TW} fill={K.kraft} />
      {Array.from({ length: Math.floor((L - 20) / 128) + 1 }, (_, i) => (
        <WordmarkG key={i} x={16 + i * 128} y={TW / 2 + 5} size={17} fill={K.ink} />
      ))}
      <path d={ticks(L, TW - 3)} stroke={K.grey} strokeWidth="0.9" />
      <path d={ticks(L, 3, false)} stroke={K.grey} strokeWidth="0.9" opacity="0.7" />
    </g>
  ),
  yellow: (L) => (
    <g>
      <rect width={L} height={TW} fill={K.yellow} />
      {Array.from({ length: Math.floor((L - 20) / 92) + 1 }, (_, i) => (
        <LockupG key={i} x={14 + i * 92} y={TW / 2 - 8} size={16} fill={K.ink} />
      ))}
    </g>
  ),
};
const BASE = { blue: K.blue, kraft: K.kraft, yellow: K.yellow };

// One printed strip lying along x, with a curled tail. (x0, yb) is the front-left corner.
export function StripG({ idp, id, x0, yb, L, kind, tailLift = 44 }) {
  const base = BASE[kind];
  const k = DV[0] / TW, h = -DV[1] / TW;
  const m = [1, 0, -k, h, r2(x0 + DV[0]), r2(yb + DV[1])];
  const Fl = [x0, yb], Fr = [x0 + L, yb], Br = [x0 + L + DV[0], yb + DV[1]], Bl = [x0 + DV[0], yb + DV[1]];
  const body = pd([Fl, Fr, Br, Bl]);
  const x1 = x0 + L;
  const F = [[x1, yb], [x1 + 38, yb + 4], [x1 + 66, yb - tailLift]];
  const tail = `M${F[0].join(' ')}Q${F[1].join(' ')} ${F[2].join(' ')}L${F[2][0] + DV[0]} ${F[2][1] + DV[1]}Q${F[1][0] + DV[0]} ${F[1][1] + DV[1]} ${F[0][0] + DV[0]} ${F[0][1] + DV[1]}Z`;
  return (
    <g strokeLinejoin="round">
      <path d={body} transform="translate(9 13)" fill={mix(base, '#4093EC', 0.4)} opacity="0.3" filter={`url(#${idp}-soft)`} />
      <path d={pd([Fl, Fr, [Fr[0], Fr[1] + 2.6], [Fl[0], Fl[1] + 2.6]])} fill={mix(base, '#000000', 0.25)} />
      <g transform={`matrix(${m.join(' ')})`}>
        <clipPath id={`${id}-sc`}><rect width={L} height={TW} /></clipPath>
        <g clipPath={`url(#${id}-sc)`} filter={`url(#${idp}-paper)`}>{PRINT[kind](L)}</g>
      </g>
      <path d={body} fill={`url(#${idp}-shade-v)`} opacity="0.7" />
      <path d={`M${Bl.join(' ')}L${Br.join(' ')}`} stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" />
      <path d={tail} fill={mix(base, '#FFFFFF', 0.45)} stroke={mix(base, '#000000', 0.15)} strokeWidth="0.6" />
      <path d={tail} fill={`url(#${idp}-shade)`} opacity="0.8" />
      <SheenG idp={idp} d={body} opacity={0.4} />
    </g>
  );
}

// ---- the roll ----
const R = 100, CX = 300, CY = 222, CR = 40; // roll radius, centre of the front face, core radius
const ROLL = {
  blue: { key: 'blue', name: 'Tape roll, blue', base: K.blue, ring: '#2A78D4', bore: '#2468B8', rim: '#2F7FDB', shadow: 'blue', title: 'Blue packing tape roll with the white mark repeated, the core slid out and a printed strip pulled off' },
  kraft: { key: 'kraft', name: 'Tape roll, white and kraft', base: K.kraft, ring: '#C4C4C4', bore: '#B4B4B4', rim: '#BDBDBD', shadow: 'yellow', title: 'White and kraft packing tape roll printed with Tectra and the tick-bar ruler, the core slid out and a strip pulled off' },
};
export const ROLL_CFG = [ROLL.blue, ROLL.kraft];

function Cyl({ idp, id, cx, cy, r, dv, base, edge, bore, rings = 0, hole = 0, front }) {
  const ang = Math.atan2(dv[1], dv[0]);
  const nx = -Math.sin(ang), ny = Math.cos(ang); // normal to the depth direction
  const a = [cx + nx * r, cy + ny * r], b = [cx - nx * r, cy - ny * r];
  const gid = `${id}-bandg`;
  return (
    <g>
      <linearGradient id={gid} gradientUnits="userSpaceOnUse" x1={r2(b[0])} y1={r2(b[1])} x2={r2(a[0])} y2={r2(a[1])}>
        <stop offset="0" stopColor={mix(base, '#FFFFFF', 0.4)} />
        <stop offset="0.45" stopColor={base} />
        <stop offset="1" stopColor={mix(base, '#000000', 0.28)} />
      </linearGradient>
      <circle cx={cx + dv[0]} cy={cy + dv[1]} r={r} fill={mix(base, '#000000', 0.16)} stroke={edge} strokeWidth="0.8" />
      <path d={pd([[r2(a[0]), r2(a[1])], [r2(a[0] + dv[0]), r2(a[1] + dv[1])], [r2(b[0] + dv[0]), r2(b[1] + dv[1])], [r2(b[0]), r2(b[1])]])} fill={`url(#${gid})`} stroke={edge} strokeWidth="0.8" />
      <circle cx={cx} cy={cy} r={r} fill={front} stroke={edge} strokeWidth="0.9" />
      {Array.from({ length: rings }, (_, i) => (
        <circle key={i} cx={cx} cy={cy} r={r2(hole + ((r - hole) * (i + 1)) / (rings + 1))} fill="none" stroke={edge} strokeWidth="0.7" opacity="0.55" />
      ))}
      {hole > 0 && (
        <g>
          <clipPath id={`${id}-hc`}><circle cx={cx} cy={cy} r={hole} /></clipPath>
          <circle cx={cx} cy={cy} r={hole} fill={bore} />
          <g clipPath={`url(#${id}-hc)`}><circle cx={cx + dv[0] * 0.92} cy={cy + dv[1] * 0.92} r={hole} fill="#FFFFFF" /></g>
          <circle cx={cx} cy={cy} r={hole} fill="none" stroke={edge} strokeWidth="1" />
        </g>
      )}
      <path d={`M${r2(cx - r * 0.78)} ${r2(cy - r * 0.42)}A${r * 0.88} ${r * 0.88} 0 0 1 ${r2(cx - r * 0.2)} ${r2(cy - r * 0.86)}`} fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" opacity="0.5" />
    </g>
  );
}

export function TapeRoll({ idp, cfg }) {
  const id = idp;
  const core = (
    <Cyl idp={idp} id={`${id}-co`} cx={CX} cy={CY} r={CR} dv={[DV[0] * 1.35, DV[1] * 1.35]} base={K.kraftD} edge="#A9A9A9" bore="#B0B0B0" hole={CR - 5} front={K.kraft} />
  );
  const roll = (
    <Cyl idp={idp} id={`${id}-ro`} cx={CX} cy={CY} r={R} dv={DV} base={cfg.base} edge={cfg.rim} bore={cfg.bore} rings={7} hole={CR - 5} front={cfg.key === "blue" ? mix(cfg.base, "#FFFFFF", 0.12) : cfg.base} />
  );
  const stripX = CX + 92, stripY = CY + R + 14;
  return (
    <Plate idp={idp} w={860} h={470} title={cfg.title} exportName={`use-packaging-tape-roll-${cfg.key}`} pattern={cfg.key === 'blue' ? '#FFFFFF' : K.grey}>
      <ShadowG idp={`${idp}-sh`} cx={CX + 110} cy={CY + R + 34} rx={330} ry={26} tone={cfg.shadow} opacity={0.3} blur={12} />
      <AxisG points={[[CX - 220, CY + R + 56], [CX, CY + R + 56], [CX + 220, CY + R + 56], [CX + 420, CY + R + 56]]} />
      <g className={cfg.key === 'blue' ? 'mock-lit' : undefined}>
        <LayerG i={0} dx={-220}>{core}</LayerG>
        <LayerG i={1}>{roll}</LayerG>
        <LayerG i={2} dx={46}><StripG idp={idp} id={`${id}-st`} x0={stripX} yb={stripY} L={270} kind={cfg.key} /></LayerG>
      </g>
    </Plate>
  );
}

// ---- strips: three printed pieces of tape, each slid out along x by a different amount ----
const STRIPS = [
  { kind: 'blue', yb: 130, dx: 0 },
  { kind: 'kraft', yb: 262, dx: 70 },
  { kind: 'yellow', yb: 394, dx: 34 },
];
export function TapeStrips() {
  const idp = 'use-packaging-tape-strips';
  return (
    <Plate idp={idp} w={860} h={500} title="Three printed tape strips: blue with the white mark, white and kraft with Tectra and the tick-bar ruler, yellow with the lockup" exportName="use-packaging-tape-strips" pattern={K.blue}>
      <ShadowG idp={`${idp}-sh`} cx={440} cy={444} rx={340} ry={24} tone="sky" opacity={0.4} blur={12} />
      <AxisG points={[[50, 474], [210, 474], [370, 474], [530, 474]]} />
      {STRIPS.map((t, i) => (
        <LayerG key={t.kind} i={i} dx={t.dx}>
          <StripG idp={idp} id={`${idp}-${t.kind}`} x0={50} yb={t.yb} L={520} kind={t.kind} tailLift={36 + i * 6} />
        </LayerG>
      ))}
    </Plate>
  );
}
