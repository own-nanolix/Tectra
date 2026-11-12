import { LayerG, AxisG, ShadowG } from '@/components/art/Mockup';
import { IconUse } from '@/components/site/Icon';
import { Plate, Solid, Interior, Rim, LockupG, MarkG, K, proj, pd, tone, mix, alongX, TOP, LEFT } from './parts';

// Product boxes: tray + sleeve, the sleeve slid off along x. Content is the brand's own product object.
const W = 150, D = 120, H = 46, T = 4;          // tray
const SL = 105, SD = D + 10, SH = H + 8, SX = 22; // sleeve, assembled at x = SX
const S = 1.45;

function Tablet({ x, y, size, color }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size / 24})`} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2.2" />
      <path d="M5 8.2v7.6M5.2 12h.01" />
      <path d="M9 9h8M9 12h6M9 15h4" />
    </g>
  );
}
const Icon = ({ name, x, y, size, color }) =>
  name === 'tablet' ? <Tablet x={x} y={y} size={size} color={color} /> : <IconUse name={name} x={x} y={y} size={size} color={color} />;

export const PRODUCT_CFG = [
  { key: 'hardhat', icon: 'hardhat', sleeve: K.blue, ink: '#FFFFFF', mark: '#FFFFFF', tray: K.kraft, trayInk: K.grey, shadow: 'blue', title: 'Product box for the hard hat: blue sleeve slid off the tray, line icon of a hard hat and the lockup' },
  { key: 'tablet', icon: 'tablet', sleeve: K.white, ink: K.ink, mark: K.blue, tray: K.blue, trayInk: '#FFFFFF', shadow: 'yellow', title: 'Product box for the site tablet: white sleeve slid off the blue tray, line icon of a tablet and the lockup' },
];

export function ProductBox({ idp, cfg }) {
  const P = proj(S, 190, 128);
  const Ps = (x, y, z = 0) => P(x + SX, y - 5, z - 4);
  const sl = alongX(S, 150);
  const t = 3.5;

  const trayFloor = (
    <g>
      <rect x="26" y="20" width="98" height="80" rx="7" fill="#000000" opacity="0.07" />
      <rect x="26" y="20" width="98" height="80" rx="7" fill="none" stroke={cfg.trayInk} strokeOpacity="0.6" strokeWidth="1" />
      <Icon name={cfg.icon} x={45} y={30} size={60} color={cfg.trayInk} />
    </g>
  );
  const tray = (
    <g>
      <Interior P={P} s={S} idp={idp} id={`${idp}-tr-in`} W={W} D={D} H={H} t={T} floorZ={H - 22} base={cfg.tray} floorArt={trayFloor} />
      <Solid P={P} s={S} idp={idp} id={`${idp}-tr`} W={W} D={D} H={H} base={cfg.tray} top={false}
        art={{ left: <MarkG x={W / 2 - 9} y={H / 2 - 9} size={18} fill={cfg.tray === K.blue ? '#FFFFFF' : K.sky} />, right: null }} />
      <Rim P={P} W={W} D={D} H={H} t={T} base={cfg.tray} />
    </g>
  );

  // the open end of the sleeve is clipped so the inside can be seen through it
  const hole = pd([Ps(SL, SD - t, SH - t), Ps(SL, t, SH - t), Ps(SL, t, t), Ps(SL, SD - t, t)]);
  const wallY = pd([Ps(0, t, SH - t), Ps(SL, t, SH - t), Ps(SL, t, t), Ps(0, t, t)]);
  const floor = pd([Ps(0, t, t), Ps(SL, t, t), Ps(SL, SD - t, t), Ps(0, SD - t, t)]);
  const sleeveLeft = (
    <g>
      <LockupG x={(SL - 24 * 4) / 2} y={(SH - 24) / 2} size={24} fill={cfg.ink} markFill={cfg.mark} />
      <rect x="0" y={SH - 5} width={SL} height="5" fill="#000000" opacity="0.06" />
    </g>
  );
  const sleeveTop = (
    <g>
      <Icon name={cfg.icon} x={SL / 2 - 34} y={SD / 2 - 34} size={68} color={cfg.ink} />
      <path d={Array.from({ length: 22 }, (_, i) => `M${8 + i * 4.4} 10v${i % 5 === 0 ? 7 : 4}`).join('')} stroke={cfg.ink} strokeWidth="0.9" opacity="0.6" />
    </g>
  );
  const sleeve = (
    <g>
      <clipPath id={`${idp}-sl-hole`}><path d={hole} /></clipPath>
      <g clipPath={`url(#${idp}-sl-hole)`}>
        <path d={floor} fill={mix(tone(cfg.sleeve, TOP), '#000000', 0.12)} />
        <path d={wallY} fill={mix(tone(cfg.sleeve, LEFT), '#000000', 0.1)} />
        <path d={wallY} fill={`url(#${idp}-shade-v)`} />
        <path d={hole} fill={`url(#${idp}-shade)`} opacity="0.7" />
      </g>
      <Solid P={Ps} s={S} idp={idp} id={`${idp}-sl`} W={SL} D={SD} H={SH} base={cfg.sleeve} holeT={t} art={{ left: sleeveLeft, top: sleeveTop }} />
      <path d={pd([Ps(SL, SD, SH), Ps(SL, 0, SH), Ps(SL, 0, 0), Ps(SL, SD, 0)])} fill="none" stroke={mix(cfg.sleeve, '#000000', 0.3)} strokeWidth="0.8" />
    </g>
  );

  const a = P(10, D / 2, -8), b = P(W + 150, D / 2, -8);
  const c1 = P(W / 2, D / 2, 0), c2 = Ps(SL / 2 + 150, SD / 2, 0);
  return (
    <Plate idp={idp} w={780} h={500} title={cfg.title} exportName={`use-packaging-product-box-${cfg.key}`} pattern={K.blue}>
      <ShadowG idp={`${idp}-sh1`} cx={c1[0] + 26} cy={c1[1] + 38} rx={190} ry={48} tone={cfg.shadow} opacity={0.3} blur={12} transform={`rotate(30 ${c1[0]} ${c1[1]})`} />
      <ShadowG idp={`${idp}-sh2`} cx={c2[0] + 22} cy={c2[1] + 34} rx={150} ry={42} tone={cfg.shadow} opacity={0.3} blur={12} transform={`rotate(30 ${c2[0]} ${c2[1]})`} />
      <AxisG points={[a, P(W / 2, D / 2, -8), [r(b[0] - 70), r(b[1] - 40)], b]} />
      <g className={cfg.key === 'hardhat' ? 'mock-lit' : undefined}>
        <LayerG i={0}>{tray}</LayerG>
        <LayerG i={1} dx={sl[0]} dy={sl[1]}>{sleeve}</LayerG>
      </g>
    </Plate>
  );
}
const r = (n) => Math.round(n * 100) / 100;
