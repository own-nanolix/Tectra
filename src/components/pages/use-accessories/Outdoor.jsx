import { LayerG, AxisG, ShadowG } from '@/components/art/Mockup';
import { Plate, Artwork, Stitch, K, url } from './parts';

const r2 = (n) => Math.round(n * 100) / 100;

/* ---------- Umbrella from below: eight canopy panels pulled outward along their own radius ---------- */

const CX = 266;
const CY = 244;
const R = 168;
const R0 = 22;
const pol = (r, deg) => [r2(CX + r * Math.cos((deg * Math.PI) / 180)), r2(CY + r * Math.sin((deg * Math.PI) / 180))];

function Panel({ idp, i, fill, mark }) {
  const th = i * 45;
  const [a0x, a0y] = pol(R0, th - 22.5);
  const [a1x, a1y] = pol(R, th - 22.5);
  const [cx, cy] = pol(R * 0.86, th);
  const [b1x, b1y] = pol(R, th + 22.5);
  const [b0x, b0y] = pol(R0, th + 22.5);
  const d = `M${a0x} ${a0y}L${a1x} ${a1y}Q${cx} ${cy} ${b1x} ${b1y}L${b0x} ${b0y}Z`;
  const lit = Math.cos(((th - 225) * Math.PI) / 180);
  const [mx, my] = pol(R * 0.62, th);
  const [s0x, s0y] = pol(36, th - 17);
  const [s1x, s1y] = pol(R * 0.55, th - 20);
  const [t0x, t0y] = pol(36, th + 17);
  const [t1x, t1y] = pol(R * 0.55, th + 20);
  const dx = r2(Math.cos((th * Math.PI) / 180) * 24);
  const dy = r2(Math.sin((th * Math.PI) / 180) * 24);
  return (
    <LayerG i={i} dx={dx} dy={dy}>
      <path d={d} transform="translate(5 8)" fill={K.sky} opacity="0.4" filter={url(idp, 'soft')} />
      <g filter={url(idp, 'fabric')}>
        <path d={d} fill={fill} />
      </g>
      <path d={d} fill={lit > 0 ? '#FFFFFF' : '#000000'} opacity={r2(Math.abs(lit) * (lit > 0 ? 0.3 : 0.34))} />
      <path d={d} fill={url(idp, 'cav')} />
      <path d={d} fill="none" stroke="#000000" strokeWidth="1" opacity="0.2" />
      <Stitch d={`M${s0x} ${s0y}L${s1x} ${s1y}M${t0x} ${t0y}L${t1x} ${t1y}`} stroke="#FFFFFF" w={1} dash="3 3" opacity={0.55} />
      <path d={`M${a0x} ${a0y}L${a1x} ${a1y}`} stroke={url(idp, 'metal-dark')} strokeWidth="2.6" strokeLinecap="round" />
      <path d={`M${a0x} ${a0y}L${a1x} ${a1y}`} stroke="#FFFFFF" strokeWidth="0.8" opacity="0.4" transform="translate(-0.8 -0.8)" />
      <circle cx={a1x} cy={a1y} r="3.6" fill={url(idp, 'metal')} />
      <g transform={`translate(${mx} ${my}) rotate(${th + 90})`} opacity="0.62">
        <Artwork kind="mark" idp={idp} w={28} h={28} fg={fill === K.yellow ? K.g1 : K.white} />
      </g>
    </LayerG>
  );
}

function Umbrella({ idp }) {
  const fills = [K.blue, K.yellow];
  return (
    <g>
      <defs>
        <radialGradient id={`${idp}-cav`} cx={CX} cy={CY} r={R} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#000000" stopOpacity="0.34" />
          <stop offset="0.5" stopColor="#000000" stopOpacity="0.06" />
          <stop offset="1" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ShadowG idp={`${idp}-s`} cx={CX + 6} cy={474} rx={170} ry={11} tone="yellow" />
      {fills.concat(fills, fills, fills).map((f, i) => (
        <Panel key={i} idp={idp} i={i} fill={f} />
      ))}
      <circle cx={CX} cy={CY} r="26" fill="#000000" opacity="0.2" filter={url(idp, 'soft')} />
      <circle cx={CX} cy={CY} r="23" fill={url(idp, 'metal')} />
      <circle cx={CX} cy={CY} r="23" fill={url(idp, 'shade')} />
      <circle cx={CX} cy={CY} r="11" fill={url(idp, 'metal-dark')} />
      <circle cx={CX - 3} cy={CY - 3} r="4" fill="#FFFFFF" opacity="0.55" />
      <AxisG points={[pol(0, 0), pol(90, -45), pol(190, -45)]} />
    </g>
  );
}

/* ---------- Socks: side view, cuff band offset along x ---------- */

function Sock({ idp, c, accent, cuff, ink, tone }) {
  const body = 'M190 70L190 248C190 262 172 268 172 300C172 336 190 350 220 350L318 350C346 350 350 322 330 304C316 292 292 282 290 240L290 70Z';
  const clip = `${idp}-sock-clip`;
  const rim = 'M186 70V118A54 8 0 0 0 294 118V70A54 8 0 0 1 186 70Z';
  return (
    <g transform="translate(-40 15) scale(1.2)">
      <defs>
        <clipPath id={clip}>
          <path d={body} />
        </clipPath>
      </defs>
      <ShadowG idp={`${idp}-s`} cx={262} cy={366} rx={110} ry={9} tone={tone} />
      <LayerG i={0}>
        <ellipse cx="240" cy="70" rx="50" ry="7" fill="#000000" opacity="0.55" />
        <g filter={url(idp, 'fabric')}>
          <path d={body} fill={c} />
        </g>
        <g clipPath={`url(#${clip})`}>
          <circle cx="188" cy="308" r="42" fill={accent} />
          <circle cx="332" cy="328" r="38" fill={accent} />
          <rect x="180" y="188" width="120" height="9" fill={accent} />
          <rect x="180" y="203" width="120" height="3.5" fill={accent} />
          <rect x="170" y="60" width="190" height="300" fill={url(idp, 'pb-pat-ticks')} opacity="0.5" />
          <g transform="translate(240 152)">
            <Artwork kind="mark" idp={idp} w={34} h={34} fg={ink} />
          </g>
          <path d="M186 252C214 268 262 262 292 238" fill="none" stroke="#000000" strokeWidth="9" opacity="0.1" filter={url(idp, 'soft')} />
          <path d="M162 312C170 340 195 352 222 350" fill="none" stroke="#000000" strokeWidth="2" opacity="0.2" />
          <rect x="165" y="60" width="195" height="300" fill={url(idp, 'lit')} />
          <rect x="165" y="60" width="195" height="300" fill={url(idp, 'shade')} opacity="0.7" />
          <path d="M200 120L200 242" stroke="#FFFFFF" strokeWidth="10" opacity="0.22" filter={url(idp, 'soft')} />
        </g>
        <Stitch d="M334 292C348 312 346 336 330 349" stroke="#000000" w={1} dash="3 3" opacity={0.3} />
        <Stitch d="M176 286C170 300 174 318 182 330" stroke="#000000" w={1} dash="3 3" opacity={0.3} />
      </LayerG>
      <LayerG i={1} dx={-122}>
        <path d={rim} transform="translate(5 9)" fill={K.sky} opacity="0.45" filter={url(idp, 'soft')} />
        <g filter={url(idp, 'fabric')}>
          <path d={rim} fill={cuff} />
        </g>
        {[198, 206, 214, 222, 230, 238, 246, 254, 262, 270, 278, 286].map((x) => (
          <path key={x} d={`M${x} 76V124`} stroke="#000000" strokeWidth="1.4" opacity="0.13" />
        ))}
        <Artwork kind="reg" idp={idp} w={78} h={26} x={240} y={98} fg={cuff === K.white ? K.blue : K.white} />
        <path d={rim} fill={url(idp, 'shade')} />
        <path d={rim} fill={url(idp, 'shade-v')} />
        <ellipse cx="240" cy="70" rx="54" ry="8" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />
        <path d="M189 76V112" stroke="#FFFFFF" strokeWidth="6" opacity="0.35" filter={url(idp, 'soft')} />
      </LayerG>
      <AxisG points={[[240, 52], [180, 52], [118, 52]]} />
    </g>
  );
}

export const outdoorPlates = [
  { id: 'umbrella', caption: 'Umbrella', node: <Plate name="umbrella" title="Umbrella seen from below, canopy panels pulled outward" w={533}>{(idp) => <Umbrella idp={idp} />}</Plate> },
  { id: 'socks', caption: 'Socks', node: <Plate name="socks" title="Sock, side view, cuff band offset along x" w={400}>{(idp) => <Sock idp={idp} c={K.white} accent={K.blue} cuff={K.yellow} ink={K.blue} tone="blue" />}</Plate> },
];
