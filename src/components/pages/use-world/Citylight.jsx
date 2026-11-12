import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { CraneG } from '@/components/art/KeyArt';
import { BackdropG, ShadowG, MaterialDefs, LayerG, AxisG, CalloutG, SheenG } from '@/components/art/Mockup';
import { HERO } from '@/lib/brand';
import { Ground, BlueDefs, Bolt, Lines } from './parts';

const P = 'use-world-cl';
const G = 800; // ground line of this plate
const FR = { x: 260, x1: 520, top: 100, bot: 800, t: 18 }; // front frame
const OFF = [-80, -30]; // depth vector (back of the box is up and to the left)
const PANEL = { x: 278, y: 238, w: 224, h: 482 };

const tube = (x, y, w, h) => (
  <g>
    <rect x={x} y={y} width={w} height={h} fill={`url(#${P}-steel)`} />
    <rect x={x} y={y} width={w} height={h} fill={`url(#${P}-metal)`} opacity="0.3" />
  </g>
);
const para = (x0, y0, x1, y1, t) => `M${x0} ${y0}L${x1} ${y1}V${y1 + t}L${x0} ${y0 + t}Z`;

function Frame() {
  const { x, x1, top, bot, t } = FR;
  const [ox, oy] = OFF;
  const bx = x + ox, bx1 = x1 + ox, by = top + oy, bb = bot + oy;
  return (
    <g>
      {/* back posts and rails seen through the openings */}
      {tube(bx1 - t, by, t, bb - by)}
      {tube(bx, by, bx1 - bx + t, t)}
      {tube(bx, by + 120, bx1 - bx + t, t)}
      {tube(bx, bb - t, bx1 - bx + t, t)}
      <rect x={bx1 - t} y={by} width={t} height={bb - by} fill="#000000" opacity="0.18" />
      {tube(bx, by, t, bb - by)}
      {/* left side: a white glass panel between the two left posts */}
      <path d="M258 242L196 219V693L258 716Z" fill="#FFFFFF" />
      <path d="M258 242L196 219V693L258 716Z" fill={`url(#${P}-glass)`} opacity="0.6" />
      <g transform="matrix(0.62 0.2325 0 1 196 219)">
        <rect x="18" y="190" width="64" height="64" rx="6" fill="#F0F0F0" />
        <MarkG x={30} y={202} size={40} fill="#4093EC" />
      </g>
      {/* depth rails on the left */}
      <path d={para(x, top, bx, by, t)} fill={`url(#${P}-steel)`} />
      <path d={para(x, bot - t, bx, bb - t, t)} fill={`url(#${P}-steel)`} />
      <path d={para(x, top + 120, bx, by + 120, t)} fill={`url(#${P}-steel)`} />
      <path d={para(x1, top, bx1, by, t)} fill={`url(#${P}-steel)`} />
      <path d={para(x1, bot - t, bx1, bb - t, t)} fill={`url(#${P}-steel)`} />
      {/* the box interior: a white diffuser with LED tubes, visible once the poster is out */}
      <rect x={PANEL.x} y={PANEL.y} width={PANEL.w} height={PANEL.h} fill={`url(#${P}-diff)`} />
      {[52, 112, 172].map((dx) => (
        <rect key={dx} x={PANEL.x + dx - 2} y={PANEL.y + 6} width="4" height={PANEL.h - 12} fill="#FFFFFF" />
      ))}
      <rect x={PANEL.x} y={PANEL.y} width="26" height={PANEL.h} fill="#000000" opacity="0.07" />
      {/* front frame: posts and rails */}
      {tube(x, top, x1 - x, t)}
      {tube(x, top + 120, x1 - x, t)}
      {tube(x, top + 620, x1 - x, t)}
      {tube(x, bot - t, x1 - x, t)}
      {tube(x, top, t, bot - top)}
      {tube(x1 - t, top, t, bot - top)}
      <rect x={x} y={top} width={x1 - x} height={bot - top} fill="none" />
      <path d={`M${x + 4} ${top}V${bot}M${x1 - t + 4} ${top}V${bot}`} stroke="#FFFFFF" strokeWidth="2" opacity="0.65" />
      <path d={`M${x1} ${top}V${bot}M${x + t} ${top}V${bot}`} stroke="#6A6A6A" strokeWidth="1" opacity="0.7" />
      {[top + 9, top + 129, top + 629, bot - 9].map((yy) =>
        [x + 9, x1 - 9].map((xx) => <Bolt key={`${xx}-${yy}`} x={xx} y={yy} r={3} />)
      )}
      <rect x={x} y={top} width={x1 - x} height={bot - top} fill={`url(#${P}-shade)`} opacity="0.5" />
    </g>
  );
}

function Poster() {
  const { x, y, w, h } = PANEL;
  return (
    <g>
      <clipPath id={`${P}-poster`}>
        <rect x={x} y={y} width={w} height={h} />
      </clipPath>
      <rect x={x + w} y={y + 3} width="7" height={h} fill="#1F5FB0" />
      <g clipPath={`url(#${P}-poster)`}>
        <rect x={x} y={y} width={w} height={h} fill={`url(#${P}-field)`} filter={`url(#${P}-paper)`} />
        <rect x={x} y={y} width={w} height={h} fill={`url(#${P}-glow)`} />
        <MarkG x={x + 92} y={y + 34} size={40} fill="#FFFFFF" />
        <Lines lines={HERO.title} x={x + w / 2} y={y + 128} size={34} lh={36} fill="#FFFFFF" anchor="middle" />
        <Lines
          lines={['Smart construction uses technology like', 'AI and IoT to improve efficiency, safety,', 'and sustainability.']}
          x={x + w / 2}
          y={y + 176}
          size={8}
          lh={11}
          fill="#FFFFFF"
          anchor="middle"
        />
        <CraneG x={x + 12} y={y + 200} scale={0.95} color="#FFB83D" dark="#B97A08" />
        <rect x={x} y={y + h - 20} width={w} height="20" fill="#1F5FB0" opacity="0.35" />
      </g>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.5" />
      <SheenG idp={P} d={`M${x} ${y}h${w}v${h}h${-w}z`} opacity={0.5} />
    </g>
  );
}

export default function Citylight() {
  return (
    <Art viewBox="0 0 900 900" title="Citylight, exploded: poster pulled out of the light box" exportName="use-world-citylight">
      <MaterialDefs idp={P} />
      <BlueDefs idp={P} />
      <defs>
        <linearGradient id={`${P}-steel`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#B9B9B9" />
          <stop offset="0.5" stopColor="#8C8C8C" />
          <stop offset="1" stopColor="#6E6E6E" />
        </linearGradient>
        <linearGradient id={`${P}-diff`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E6E6E6" />
        </linearGradient>
      </defs>
      <BackdropG w={900} h={900} />
      <Ground y={G} />
      <ShadowG idp={`${P}-s1`} cx={330} cy={G} rx={250} ry={16} tone="blue" opacity={0.3} />
      <ShadowG idp={`${P}-s2`} cx={730} cy={G + 2} rx={150} ry={12} tone="yellow" opacity={0.3} />
      <path d={`M300 ${G - 28}C285 ${G + 2} 240 ${G + 8} 200 ${G - 1}S90 ${G - 24} 0 ${G - 2}`} stroke="#E2383B" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d={`M300 ${G - 30}C285 ${G} 240 ${G + 6} 200 ${G - 3}S90 ${G - 26} 0 ${G - 4}`} stroke="#F58A8C" strokeWidth="1.2" fill="none" />
      <AxisG points={[[390, 60], [730, 60]]} />
      <CalloutG x={390} y={100} tx={390} ty={60} anchor="end" label="Light box" />
      <CalloutG x={730} y={238} tx={730} ty={60} label="Poster" />
      <LayerG i={0}>
        <Frame />
      </LayerG>
      <LayerG i={1} dx={340}>
        <Poster />
      </LayerG>
    </Art>
  );
}
