// Two notebooks (cover, elastic band or rings, pages offset along the x axis) and the pen (cap pulled along its own axis).
import Art from '@/components/art/Art';
import { MarkG, LockupG, WordmarkG } from '@/components/art/Mark';
import { PatternDefs } from '@/components/art/KeyArt';
import { BackdropG, ShadowG, MaterialDefs, LayerG, AxisG } from '@/components/art/Mockup';
import { C, Deboss } from './parts';

const NX = 300, NY = 90, NW = 460, NH = 640;

// The block of pages: a stack of page edges lower-right, a ruled top sheet, the gutter in shade, optional punched holes.
function Pages({ idp, x, y, w, h, holes }) {
  return (
    <g>
      <rect x={x + 9} y={y + 14} width={w} height={h} rx="3" fill={C.ink} opacity="0.16" filter={`url(#${idp}-soft)`} />
      {[7, 6, 5, 4, 3, 2, 1].map((k) => (
        <rect key={k} x={x + k * 1.7} y={y + k * 2} width={w} height={h} rx="3" fill={k % 2 ? '#FFFFFF' : '#F1F1F1'} stroke="#D2D2D2" strokeWidth="0.7" />
      ))}
      <rect x={x} y={y} width={w} height={h} rx="3" fill={`url(#${idp}-card)`} filter={`url(#${idp}-paper)`} />
      <path d={Array.from({ length: Math.floor((h - 70) / 30) + 1 }, (_, i) => `M${x + 20} ${y + 60 + i * 30}H${x + w - 20}`).join('')} stroke="#E0E6EE" strokeWidth="1" />
      <path d={`M${x + (holes ? 62 : 52)} ${y}V${y + h}`} stroke={C.sky} strokeWidth="1" opacity="0.7" />
      {holes && Array.from({ length: 16 }, (_, i) => <circle key={i} cx={x + 24} cy={y + 30 + i * 40} r="6" fill="#D6D6D6" stroke="#B9B9B9" strokeWidth="0.8" />)}
      <rect x={x} y={y} width={w} height={h} rx="3" fill={`url(#${idp}-gutter)`} />
      <rect x={x} y={y} width={w} height={h} rx="3" fill={`url(#${idp}-shade)`} opacity="0.5" />
      <path d={`M${x} ${y + h}V${y}H${x + w}`} stroke="#fff" strokeOpacity="0.9" fill="none" />
    </g>
  );
}

function Defs({ idp }) {
  return (
    <defs>
      <linearGradient id={`${idp}-gutter`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#000" stopOpacity="0.22" />
        <stop offset="0.07" stopColor="#000" stopOpacity="0.04" />
        <stop offset="0.1" stopColor="#000" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${idp}-hinge`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#000" stopOpacity="0.2" />
        <stop offset="0.4" stopColor="#fff" stopOpacity="0.32" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${idp}-cover`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#5BA8F8" />
        <stop offset="1" stopColor="#3F8DE6" />
      </linearGradient>
      <pattern id={`${idp}-rib`} width="3" height="6" patternUnits="userSpaceOnUse">
        <path d="M1.5 0V6" stroke="#7A5000" strokeWidth="1" opacity="0.28" />
      </pattern>
    </defs>
  );
}

export function NotebookBlue() {
  const idp = 'use-stationery-notebook-a';
  const bx = NX + NW - 88;
  return (
    <Art viewBox="0 0 1180 820" title="Blue notebook: cover, elastic band and pages offset along the x axis" exportName="use-stationery-notebook-blue">
      <BackdropG w={1180} h={820} />
      <MaterialDefs idp={idp} />
      <Defs idp={idp} />
      <ShadowG idp={`${idp}-s`} cx={600} cy={768} rx={500} tone="blue" />
      <AxisG points={[[270, 410], [530, 410], [572, 410], [890, 410]]} />
      <LayerG i={2} dx={360}>
        <Pages idp={idp} x={NX + 8} y={NY + 12} w={444} h={616} />
      </LayerG>
      <LayerG i={1} dx={-260}>
        <rect x={NX + 12} y={NY + 18} width={NW} height={NH} rx="12" fill={C.ink} opacity="0.18" filter={`url(#${idp}-soft)`} />
        <rect x={NX + 4} y={NY + 7} width={NW} height={NH} rx="12" fill="#2F7CD6" />
        <rect x={NX} y={NY} width={NW} height={NH} rx="12" fill={`url(#${idp}-cover)`} filter={`url(#${idp}-paper)`} />
        <rect x={NX + 24} y={NY} width="30" height={NH} fill={`url(#${idp}-hinge)`} />
        <path d={`M${NX + 24} ${NY}V${NY + NH}`} stroke="#1F6FD0" strokeOpacity="0.5" />
        <Deboss x={NX + 160} y={NY + 240} size={130} />
        <rect x={NX} y={NY} width={NW} height={NH} rx="12" fill={`url(#${idp}-shade)`} />
        <path d={`M${NX + 12} ${NY}H${NX + NW - 12}`} stroke="#fff" strokeOpacity="0.7" strokeWidth="1.4" />
      </LayerG>
      <LayerG i={0} dx={-112}>
        <rect x={bx + 7} y={NY - 4} width="24" height={NH + 24} rx="6" fill={C.ink} opacity="0.2" filter={`url(#${idp}-soft)`} />
        <rect x={bx} y={NY - 14} width="24" height={NH + 24} rx="6" fill={C.yellow} />
        <rect x={bx} y={NY - 14} width="24" height={NH + 24} rx="6" fill={`url(#${idp}-rib)`} />
        <rect x={bx} y={NY - 14} width="24" height={NH + 24} rx="6" fill={`url(#${idp}-shade)`} />
        <path d={`M${bx + 4} ${NY - 10}V${NY + NH + 6}`} stroke="#fff" strokeOpacity="0.6" strokeWidth="1.6" />
      </LayerG>
    </Art>
  );
}

// A spiral coil: one metal loop per hole, centred on y.
function Coil({ idp, x, y }) {
  return (
    <g>
      {Array.from({ length: 16 }, (_, i) => {
        const cy = y + 30 + i * 40;
        return (
          <g key={i}>
            <rect x={x + 3} y={cy - 5} width="58" height="17" rx="8.5" fill="none" stroke={C.ink} strokeOpacity="0.18" strokeWidth="5" filter={`url(#${idp}-soft)`} />
            <rect x={x} y={cy - 8} width="58" height="17" rx="8.5" fill="none" stroke={`url(#${idp}-metal)`} strokeWidth="5" />
            <rect x={x} y={cy - 8} width="58" height="17" rx="8.5" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="1" strokeDasharray="30 200" />
          </g>
        );
      })}
    </g>
  );
}

export function NotebookYellow() {
  const idp = 'use-stationery-notebook-b';
  return (
    <Art viewBox="0 0 1180 820" title="Spiral notebook: cover, metal coil and pages offset along the x axis" exportName="use-stationery-notebook-yellow">
      <BackdropG w={1180} h={820} />
      <MaterialDefs idp={idp} />
      <Defs idp={idp} />
      <PatternDefs idp={`${idp}-p`} color="#FFFFFF" opacity={0.8} />
      <ShadowG idp={`${idp}-s`} cx={600} cy={768} rx={500} tone="yellow" />
      <AxisG points={[[270, 410], [560, 410], [890, 410]]} />
      <LayerG i={2} dx={360}>
        <Pages idp={idp} x={NX + 8} y={NY + 12} w={444} h={616} holes />
      </LayerG>
      <LayerG i={1} dx={-260}>
        <rect x={NX + 12} y={NY + 18} width={NW} height={NH} rx="12" fill={C.ink} opacity="0.18" filter={`url(#${idp}-soft)`} />
        <rect x={NX + 4} y={NY + 7} width={NW} height={NH} rx="12" fill="#D99A22" />
        <rect x={NX} y={NY} width={NW} height={NH} rx="12" fill={C.yellow} filter={`url(#${idp}-paper)`} />
        <rect x={NX} y={NY} width={NW} height={NH} rx="12" fill={`url(#${idp}-p-pat-fuse)`} />
        {Array.from({ length: 16 }, (_, i) => <circle key={i} cx={NX + 24} cy={NY + 42 + i * 40} r="6" fill="#B87F12" opacity="0.7" />)}
        <rect x={NX + 90} y={NY + 250} width="290" height="150" rx="6" fill={C.ink} opacity="0.18" transform="translate(5 8)" filter={`url(#${idp}-soft)`} />
        <rect x={NX + 90} y={NY + 250} width="290" height="150" rx="6" fill="#fff" />
        <LockupG x={NX + 90 + 33} y={NY + 250 + 47} size={56} fill={C.blue} />
        <rect x={NX} y={NY} width={NW} height={NH} rx="12" fill={`url(#${idp}-shade)`} />
        <path d={`M${NX + 12} ${NY}H${NX + NW - 12}`} stroke="#fff" strokeOpacity="0.7" strokeWidth="1.4" />
      </LayerG>
      <LayerG i={0} dx={250}>
        <Coil idp={idp} x={NX - 18} y={NY + 12} />
      </LayerG>
    </Art>
  );
}

export function Pen() {
  const idp = 'use-stationery-pen';
  const body = 'M-25 26A25 25 0 0 1 25 26V600H-25Z';
  return (
    <Art viewBox="0 0 420 1260" title="Pen: barrel, clip and cap pulled apart along the pen's own axis" exportName="use-stationery-pen">
      <BackdropG w={420} h={1260} />
      <MaterialDefs idp={idp} />
      <defs>
        <linearGradient id={`${idp}-cyl`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.3" />
          <stop offset="0.22" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.78" stopColor="#000" stopOpacity="0.14" />
          <stop offset="1" stopColor="#000" stopOpacity="0.42" />
        </linearGradient>
        <linearGradient id={`${idp}-barrel`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3F8DE6" />
          <stop offset="1" stopColor="#2F7CD6" />
        </linearGradient>
      </defs>
      <ShadowG idp={`${idp}-s`} cx={276} cy={660} rx={560} ry={26} tone="blue" transform="rotate(79 276 660)" />
      <g transform="translate(150 120) rotate(-11)">
        <AxisG points={[[0, -60], [0, 330], [0, 860]]} />
        <LayerG i={0}>
          <rect x="-9" y="-30" width="18" height="38" rx="7" fill={`url(#${idp}-metal)`} stroke="#8F8F8F" strokeWidth="0.8" />
          <path d={body} fill={`url(#${idp}-barrel)`} />
          <rect x="-25" y="470" width="50" height="132" fill={`url(#${idp}-rubber)`} />
          <path d={Array.from({ length: 8 }, (_, i) => `M-25 ${492 + i * 14}H25`).join('')} stroke="#fff" strokeOpacity="0.12" strokeWidth="2" />
          <path d="M-25 600H25L8 688H-8Z" fill={`url(#${idp}-metal)`} />
          <path d="M-8 688H8L5 704H-5Z" fill={`url(#${idp}-metal-dark)`} />
          <path d={body} fill={`url(#${idp}-cyl)`} />
          <rect x="-25" y="470" width="50" height="132" fill={`url(#${idp}-cyl)`} />
          <g transform="translate(-11 120) rotate(90)">
            <WordmarkG x={0} y={0} size={32} fill="#fff" />
          </g>
          <MarkG x={-15} y={300} size={30} fill="#fff" />
        </LayerG>
        <LayerG i={1} dy={290}>
          <rect x="-24" y="480" width="56" height="268" rx="28" fill={C.ink} opacity="0.2" filter={`url(#${idp}-soft)`} transform="translate(6 8)" />
          <rect x="-28" y="470" width="56" height="270" rx="28" fill={`url(#${idp}-plastic)`} />
          <rect x="-28" y="470" width="56" height="14" fill={C.blue} />
          <rect x="-28" y="470" width="56" height="270" rx="28" fill={`url(#${idp}-cyl)`} />
          <rect x="-3" y="526" width="16" height="190" rx="6" fill={C.ink} opacity="0.22" filter={`url(#${idp}-soft)`} />
          <rect x="-7" y="520" width="14" height="190" rx="6" fill={`url(#${idp}-metal)`} stroke="#8F8F8F" strokeWidth="0.8" />
          <ellipse cx="0" cy="712" rx="12" ry="9" fill={`url(#${idp}-metal)`} stroke="#8F8F8F" strokeWidth="0.8" />
        </LayerG>
      </g>
    </Art>
  );
}
