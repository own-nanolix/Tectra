import { MarkG, LockupG } from '@/components/art/Mark';
import { TreesG, IsoSiteG } from '@/components/art/KeyArt';
import { MonitorG, ScreenAppG } from '@/components/art/Devices';
import { LayerG, AxisG, ShadowG } from '@/components/art/Mockup';
import { Scene, PAL, u } from './parts';

// Front elevation. Floor, counter, back wall and header are pulled apart along the depth diagonal:
// each step is 56 right and 70 up. The light comes from the upper left, so right faces are in shade.
const STEP = [56, -70];
const D = 12;

// A panel with thickness: right face (shade), top face (light), front face with its content clipped.
function Box({ idp, id, x, y, w, h, fill, children, frame = false }) {
  return (
    <g>
      <path d={`M${x + w} ${y}L${x + w + D} ${y - D}V${y + h - D}L${x + w} ${y + h}Z`} fill={fill} />
      <path d={`M${x + w} ${y}L${x + w + D} ${y - D}V${y + h - D}L${x + w} ${y + h}Z`} fill="#000000" opacity="0.28" />
      <path d={`M${x} ${y}L${x + D} ${y - D}H${x + w + D}L${x + w} ${y}Z`} fill={fill} />
      <path d={`M${x} ${y}L${x + D} ${y - D}H${x + w + D}L${x + w} ${y}Z`} fill="#FFFFFF" opacity="0.4" />
      <clipPath id={`${id}-clip`}><rect x={x} y={y} width={w} height={h} /></clipPath>
      <rect x={x} y={y} width={w} height={h} fill={fill} filter={u(idp, 'paper')} />
      <g clipPath={`url(#${id}-clip)`}>{children}</g>
      <rect x={x} y={y} width={w} height={h} fill={u(idp, 'shade')} />
      <path d={`M${x + 1} ${y + h}V${y + 1}H${x + w}`} fill="none" stroke="#FFFFFF" strokeOpacity={frame ? 0.9 : 0.55} strokeWidth="1.4" />
      <path d={`M${x} ${y + h - 0.5}H${x + w - 0.5}V${y}`} fill="none" stroke="#000000" strokeOpacity="0.16" />
    </g>
  );
}

// Floor: a receding platform, a pale tile grid that converges, a sky carpet inset, a visible front edge.
function Floor({ idp }) {
  const grid = Array.from({ length: 9 }, (_, i) => `M${60 + i * 102.5} 700L${140 + i * 82.5} 640`).join('');
  const rows = [0.18, 0.38, 0.62].map((t) => { const y = 700 - 60 * t; const k = 80 * t; return `M${60 + k} ${y}H${880 - k}`; }).join('');
  return (
    <g>
      <path d="M60 700H880L800 640H140Z" fill="#EFEFEF" />
      <path d="M200 690H740L720 656H220Z" fill={PAL.sky} opacity="0.55" />
      <path d={grid + rows} stroke="#CFCFCF" strokeWidth="1" fill="none" />
      <path d="M60 700H880L800 640H140Z" fill={u(idp, 'shade-v')} />
      <rect x="60" y="700" width="820" height="16" fill={u(idp, 'card')} />
      <rect x="60" y="700" width="820" height="16" fill="#000000" opacity="0.12" />
      <path d="M60 701H880" stroke="#FFFFFF" strokeWidth="1.6" />
      <path d="M880 700L800 640V650L880 716Z" fill="#000000" opacity="0.14" />
    </g>
  );
}

function Counter({ idp }) {
  return (
    <Box idp={idp} id={`${idp}-counter`} x={330} y={520} w={300} h={130} fill={PAL.yellow}>
      <MarkG x={450} y={546} size={60} fill="#FFFFFF" />
      <rect x="330" y="630" width="300" height="20" fill="#000000" opacity="0.22" />
      <path d="M330 560H630" stroke="#000000" strokeOpacity="0.1" />
      <rect x="330" y="520" width="300" height="8" fill="#FFFFFF" opacity="0.35" />
    </Box>
  );
}

function Wall({ idp }) {
  return (
    <g>
      <Box idp={idp} id={`${idp}-wall`} x={180} y={300} w={580} h={340} fill={u(idp, 'metal')} frame>
        <rect x="190" y="310" width="560" height="320" fill={PAL.field} />
        <TreesG x={190} y={310} w={560} h={320} count={7} tone="blue" seed={14} minSize={60} maxSize={120} clear={[100, 60, 280, 230]} />
        <IsoSiteG x={286} y={392} scale={0.5} tone="blue" trees={false} />
        <text x="214" y="372" fontSize="36" fontWeight="300" fill="#FFFFFF">Smart Construction</text>
        <rect x="190" y="310" width="560" height="320" fill="none" stroke="#000000" strokeOpacity="0.2" strokeWidth="2" />
      </Box>
      <g transform="translate(0 0)">
        <rect x="590" y="352" width="156" height="102" rx="4" fill="#0C0C0C" opacity="0.2" transform="translate(4 5)" />
        <MonitorG idp={`${idp}-scr`} x={590} y={350} w={150} stand={false}>
          <ScreenAppG idp={`${idp}-scr`} />
        </MonitorG>
      </g>
    </g>
  );
}

function Header({ idp }) {
  return (
    <Box idp={idp} id={`${idp}-header`} x={160} y={215} w={620} h={85} fill={PAL.deep}>
      <LockupG x={384} y={236} size={43} fill="#FFFFFF" />
      <rect x="160" y="290" width="620" height="10" fill="#000000" opacity="0.18" />
    </Box>
  );
}

export default function Booth() {
  const at = (k) => [STEP[0] * k, STEP[1] * k];
  return (
    <Scene name="booth" title="Exhibition booth pulled apart along the depth diagonal" w={1000} h={780}>
      {(idp) => (
        <>
          <ShadowG idp={idp} cx={470} cy={738} rx={420} ry={18} tone="blue" opacity={0.3} />
          <AxisG points={[[470, 676], [470 + at(1)[0], 585 + at(1)[1] + 70], [470 + at(2)[0], 470 + at(2)[1] + 70], [470 + at(3)[0], 258 + at(3)[1] + 70]]} />
          <LayerG i={3} dx={at(3)[0]} dy={at(3)[1]}><Header idp={idp} /></LayerG>
          <LayerG i={2} dx={at(2)[0]} dy={at(2)[1]}><Wall idp={idp} /></LayerG>
          <LayerG i={1} dx={at(1)[0]} dy={at(1)[1]}><Counter idp={idp} /></LayerG>
          <LayerG i={0}><Floor idp={idp} /></LayerG>
        </>
      )}
    </Scene>
  );
}
