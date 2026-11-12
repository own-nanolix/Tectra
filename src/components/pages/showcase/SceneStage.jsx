import Art from '@/components/art/Art';
import { CraneG, PatternDefs, TreesG } from '@/components/art/KeyArt';
import { MarkG } from '@/components/art/Mark';
import { AxisG, BackdropG, CalloutG, LayerG, MaterialDefs, SheenG, ShadowG } from '@/components/art/Mockup';
import { HERO } from '@/lib/brand';

// Scene 4: an event stage in wide front elevation, the brand on the screen. Floor, stage deck, screen frame and
// brand screen are stepped back along the depth axis, drawn as a diagonal offset up and to the right (AxisG).
// The nearest layer is the floor; the screen is the farthest. Blue contact shadow.
const ID = 'showcase-s4';
const GROUND = 700; // floor top in the assembled stack
const STEP = 36; // diagonal step per layer
const DECK = { x: 330, y: GROUND - 86, w: 940, h: 86 };
const FRAME = { x: 430, y: DECK.y - 440, w: 740, h: 440, t: 28 };
const SCREEN = { x: FRAME.x + 2, y: FRAME.y + 2, w: FRAME.w - 4, h: FRAME.h - 4 }; // assembled, behind the frame
const FLOOR = { x: 210, y: GROUND, w: 1180, h: 40 };

const FRAME_D = `M${FRAME.x} ${FRAME.y}H${FRAME.x + FRAME.w}V${FRAME.y + FRAME.h}H${FRAME.x}ZM${FRAME.x + FRAME.t} ${FRAME.y + FRAME.t}V${FRAME.y + FRAME.h - FRAME.t}H${FRAME.x + FRAME.w - FRAME.t}V${FRAME.y + FRAME.t}Z`;

function BrandScreen() {
  const { x, y, w, h } = SCREEN;
  return (
    <g>
      <clipPath id={`${ID}-scr`}>
        <rect x={x} y={y} width={w} height={h} rx="3" />
      </clipPath>
      <linearGradient id={`${ID}-field`} x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0" stopColor="#5BA8F8" />
        <stop offset="1" stopColor="#3E93EE" />
      </linearGradient>
      <PatternDefs idp={ID} color="#FFFFFF" opacity={0.1} />
      <rect x={x} y={y} width={w} height={h} rx="3" fill={`url(#${ID}-field)`} />
      <g clipPath={`url(#${ID}-scr)`}>
        <TreesG x={x} y={y + 120} w={w} h={h - 120} count={16} tone="blue" seed={33} minSize={60} maxSize={120} clear={[w * 0.28, 40, w * 0.44, 150]} opacity={0.85} />
        <CraneG x={x + w - 270} y={y + h - 318} scale={0.98} />
        <rect x={x} y={y} width={w} height={h} fill={`url(#${ID}-pat-dots)`} />
        <MarkG x={x + w / 2 - 24} y={y + 54} size={48} fill="#FFFFFF" />
        <text x={x + w / 2} y={y + 152} fontSize="46" fontWeight="300" fill="#FFFFFF" textAnchor="middle">{HERO.title[0]}</text>
        <text x={x + w / 2} y={y + 200} fontSize="46" fontWeight="300" fill="#FFFFFF" textAnchor="middle">{HERO.title[1]}</text>
        <text x={x + w / 2} y={y + 228} fontSize="11.5" fill="#0A2E63" textAnchor="middle">{HERO.sub}</text>
      </g>
      <rect x={x} y={y} width={w} height={h} rx="3" fill={`url(#${ID}-shade)`} />
      <SheenG idp={ID} d={`M${x} ${y}h${w}v${h}h${-w}Z`} opacity={0.55} />
    </g>
  );
}

export default function SceneStage() {
  const f = FRAME;
  const labels = [
    ['Floor', 0],
    ['Stage deck', 1],
    ['Screen frame', 2],
    ['Brand screen', 3],
  ];
  const ax = (i) => [1330 + i * 40, GROUND + 30 - i * 40];
  return (
    <Art viewBox="0 0 1600 800" title="Event stage with the brand on screen, stepped back along the depth axis" exportName="showcase-event-stage">
      <BackdropG w={1600} h={800} />
      <MaterialDefs idp={ID} />
      <defs>
        <linearGradient id={`${ID}-floor`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F4F8FD" />
          <stop offset="1" stopColor="#C9D8EA" />
        </linearGradient>
        <linearGradient id={`${ID}-deck`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5A5A5A" />
          <stop offset="0.45" stopColor="#2F2F2F" />
          <stop offset="1" stopColor="#1A1A1A" />
        </linearGradient>
        <pattern id={`${ID}-truss`} width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M0 0L28 28M28 0L0 28" stroke="#6B6B6B" strokeWidth="1.2" />
        </pattern>
      </defs>

      <ShadowG idp={`${ID}-ground`} cx={800 + 40} cy={GROUND + 34} rx={640} ry={28} tone="blue" opacity={0.38} blur={14} />

      {/* Farthest: the brand screen */}
      <LayerG i={3} dx={STEP * 2 + 22} dy={-(STEP * 2 + 22)}>
        <g className="mock-lit">
          <BrandScreen />
        </g>
      </LayerG>

      {/* Screen frame: a black truss with an open window */}
      <LayerG i={2} dx={STEP * 2} dy={-STEP * 2}>
        <ShadowG idp={`${ID}-frame`} cx={f.x + f.w / 2 + 16} cy={DECK.y + 2} rx={f.w * 0.46} ry={10} tone="blue" opacity={0.22} blur={7} />
        <path d={FRAME_D} fillRule="evenodd" fill={`url(#${ID}-metal-dark)`} />
        <path d={FRAME_D} fillRule="evenodd" fill={`url(#${ID}-truss)`} opacity="0.55" />
        <path d={`M${f.x} ${f.y + 1}H${f.x + f.w}M${f.x + 1} ${f.y}V${f.y + f.h}`} stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="2" />
        <path d={`M${f.x + f.t} ${f.y + f.t}H${f.x + f.w - f.t}M${f.x + f.t} ${f.y + f.t}V${f.y + f.h - f.t}`} stroke="#000000" strokeOpacity="0.5" strokeWidth="2" />
        <path d={FRAME_D} fillRule="evenodd" fill={`url(#${ID}-shade)`} />
      </LayerG>

      {/* Stage deck */}
      <LayerG i={1} dx={STEP} dy={-STEP}>
        <ShadowG idp={`${ID}-deck`} cx={DECK.x + DECK.w / 2 + 18} cy={GROUND + 4} rx={DECK.w * 0.5} ry={16} tone="blue" opacity={0.26} blur={8} />
        <rect x={DECK.x} y={DECK.y} width={DECK.w} height={DECK.h} fill={`url(#${ID}-deck)`} />
        <rect x={DECK.x} y={DECK.y} width={DECK.w} height="8" fill={`url(#${ID}-metal)`} />
        <rect x={DECK.x} y={DECK.y + 8} width={DECK.w} height="3" fill="#FFB83D" />
        <rect x={DECK.x} y={DECK.y} width={DECK.w} height={DECK.h} fill={`url(#${ID}-shade)`} />
        <text x={DECK.x + DECK.w / 2} y={DECK.y + 58} fontSize="30" fontWeight="300" fill="#FFFFFF" fillOpacity="0.85" textAnchor="middle">Tectra</text>
        <path d={`M${DECK.x + 40} ${DECK.y + 20}V${DECK.y + DECK.h}M${DECK.x + DECK.w - 40} ${DECK.y + 20}V${DECK.y + DECK.h}`} stroke="#FFFFFF" strokeOpacity="0.12" strokeWidth="2" />
      </LayerG>

      {/* Nearest: the floor */}
      <LayerG i={0}>
        <rect x={FLOOR.x} y={FLOOR.y} width={FLOOR.w} height={FLOOR.h} fill={`url(#${ID}-floor)`} />
        <rect x={FLOOR.x} y={FLOOR.y} width={FLOOR.w} height="4" fill="#FFFFFF" />
        <rect x={FLOOR.x} y={FLOOR.y + FLOOR.h - 5} width={FLOOR.w} height="5" fill="#90C0F3" opacity="0.5" />
      </LayerG>

      {/* The depth axis, diagonal up and to the right */}
      <AxisG points={[0, 1, 2, 3].map(ax)} />
      {labels.map(([label, i]) => {
        const [px, py] = ax(i);
        return <CalloutG key={label} x={px} y={py} tx={px + 26} ty={py} label={label} className="slide-up" style={{ '--i': i + 4 }} />;
      })}
    </Art>
  );
}
