import { LayerG, AxisG, ShadowG } from '@/components/art/Mockup';
import { IsoSiteG } from '@/components/art/KeyArt';
import { Plate, Solid, Interior, Rim, Flap, FaceG, LabelArt, LockupStackG, MarkG, K, proj, faceM, alongY } from './parts';
import { r2 } from '@/lib/charts';
import s from './use-packaging.module.css';

const W = 190, D = 120, H = 110, S = 1.5, T = 3.5;
const OX = 330, OY = 400;

// a strip of tape stuck down a face, with a cut zig-zag end
function tapeDown(x, w, len, color, key) {
  let d = `M${x} 0H${x + w}V${len}`;
  const n = 5, step = w / n;
  for (let i = 1; i <= n; i++) d += `L${r2(x + w - i * step + step / 2)} ${len + (i % 2 ? 4 : 0)}`;
  d += 'Z';
  return (
    <g key={key}>
      <path d={d} fill={color} />
      <rect x={x} y="0" width={w} height="1.6" fill="#FFFFFF" opacity="0.5" />
      <rect x={x + w - 2} y="0" width="2" height={len} fill="#000000" opacity="0.1" />
    </g>
  );
}

// The two shipping boxes: one plain board with a blue mark and tape, one printed with the line drawing.
const CFG = [
  { key: 'plain', name: 'Shipping box, plain board', base: K.kraft, tape: K.blue, shadow: 'blue', title: 'Shipping box in plain board with a blue mark and blue tape, flaps lifted, label in front' },
  { key: 'printed', name: 'Shipping box, printed', base: K.white, tape: K.kraftD, shadow: 'yellow', title: 'Shipping box printed with the line drawing, mark and Tectra, flaps lifted, label in front' },
];

function leftArt(kind) {
  if (kind === 'plain') {
    return (
      <g>
        <MarkG x={W / 2 - 28} y={46} size={56} fill={K.blue} />
        {tapeDown(W / 2 - 9, 18, 30, K.blue, 't')}
        <rect x="0" y={H - 6} width={W} height="6" fill="#000000" opacity="0.05" />
      </g>
    );
  }
  return (
    <g>
      <g className={s.lineArt} transform="translate(2 -2) scale(0.265)"><IsoSiteG tone="paper" seed={7} /></g>
      <LockupStackG x={W - 66} y={H - 58} scale={0.2} fill={K.grey} />
      {tapeDown(W / 2 - 9, 18, 30, K.kraftD, 't')}
      <path d={Array.from({ length: 19 }, (_, i) => `M${(i + 1) * 10} 0V${H}`).join('')} stroke="#000000" strokeWidth="0.5" opacity="0.05" />
    </g>
  );
}

export function ShipBox({ idp, cfg, lit }) {
  const P = proj(S, OX, OY);
  const id = idp;
  const F = (p0, p1, out, a, tape) => <Flap P={P} p0={p0} p1={p1} out={out} L={D / 2} a={a} base={cfg.base} tape={tape} />;
  const tp = { color: cfg.tape, u0: 0.46, u1: 0.54, v0: 0.06, v1: 1 };
  const lab = alongY(S, 52);
  const m = faceM(P, S, 'left', W, D, H);
  const body = (
    <g>
      <Interior P={P} s={S} idp={idp} id={`${id}-in`} W={W} D={D} H={H} t={T} base={cfg.base} />
      <Solid P={P} s={S} idp={idp} id={`${id}-bx`} W={W} D={D} H={H} base={cfg.base} top={false} art={{ left: leftArt(cfg.key), right: <rect x="0" y="0" width={D} height="6" fill="#000000" opacity="0.04" /> }} />
      <Rim P={P} W={W} D={D} H={H} t={T} base={cfg.base} />
    </g>
  );
  const flaps = (
    <g>
      {F([0, 0, H], [W, 0, H], [0, -1, 0], 62, tp)}
      {F([0, 0, H], [0, D, H], [-1, 0, 0], 62)}
      {F([0, D, H], [W, D, H], [0, 1, 0], 22, tp)}
      {F([W, 0, H], [W, D, H], [1, 0, 0], 22)}
    </g>
  );
  const label = (
    <g>
      <g transform={`matrix(${m.join(' ')})`}>
        <rect x="26" y="44" width="92" height="58" fill="#4093EC" opacity="0.22" transform="translate(7 8)" filter={`url(#${idp}-soft)`} />
      </g>
      <FaceG id={`${id}-lb`} m={m} w={W} h={H} fill="none" clip={[0, 0, W, H]}>
        <g transform="translate(26 44) scale(0.613)"><LabelArt seed={cfg.key === 'plain' ? 3 : 8} /></g>
        <rect x="26" y="44" width="92" height="58" fill="none" stroke="#000000" strokeOpacity="0.14" strokeWidth="0.5" />
      </FaceG>
    </g>
  );
  const c = P(W / 2, D / 2, 0);
  const obj = (
    <g>
      <LayerG i={0}>{body}</LayerG>
      <LayerG i={1} dy={-128}>{flaps}</LayerG>
      <LayerG i={2} dx={lab[0]} dy={lab[1]}>{label}</LayerG>
    </g>
  );
  const top = P(W / 2, D / 2, H);
  return (
    <Plate idp={idp} w={760} h={700} title={cfg.title} exportName={`use-packaging-box-${cfg.key}`} pattern={K.blue}>
      <ShadowG idp={`${idp}-sh`} cx={c[0] + 8} cy={c[1] + 20} rx={236} ry={64} tone={cfg.shadow} opacity={0.3} blur={16} />
      <AxisG points={[[top[0] + 150, c[1] - 10], [top[0] + 150, OY - 300], [top[0] + 150, OY - 420]]} />
      {lit ? <g className="mock-lit">{obj}</g> : obj}
    </Plate>
  );
}

export { CFG as BOX_CFG };
