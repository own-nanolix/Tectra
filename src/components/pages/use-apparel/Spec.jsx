// Print specification: a technical front and back drawing of the t-shirt with print areas and dimension lines.
// No explode. The values are print-production values chosen for this page (millimetres), drawn at 2.5 mm per unit.
import Art from '@/components/art/Art';
import { BackdropG, MaterialDefs } from '@/components/art/Mockup';
import { Print, INK, BLUE } from './parts';
import { SHIRT_FRONT, SHIRT_BACK } from './Shirts';

const MM = 2.5; // millimetres per drawing unit
const SC = 1.5; // drawing units to px

// The ledger shown beside the drawing (same numbers as the dimension lines).
export const SPEC_ROWS = [
  { place: 'Chest, front', size: [280, 180], from: 'Collar to print: 90 mm', art: 'Lockup, stacked' },
  { place: 'Upper back', size: [300, 360], from: 'Collar to print: 60 mm', art: 'Line drawing' },
  { place: 'Sleeve, left', size: [80, 80], from: 'Centred on the sleeve', art: 'Mark' },
];

const u = (mm) => mm / MM;

function DimH({ x1, x2, y, label, ox, oy }) {
  const a = ox + x1 * SC, b = ox + x2 * SC, yy = oy + y * SC;
  return (
    <g stroke={BLUE} strokeWidth="1" fill="none">
      <path d={`M${a} ${yy}H${b}M${a} ${yy - 5}V${yy + 5}M${b} ${yy - 5}V${yy + 5}`} />
      <path d={`M${a + 7} ${yy - 3}L${a} ${yy}L${a + 7} ${yy + 3}M${b - 7} ${yy - 3}L${b} ${yy}L${b - 7} ${yy + 3}`} />
      <text x={(a + b) / 2} y={yy - 8} fontSize="13" fontWeight="500" fill="#145CB8" stroke="none" textAnchor="middle">{label}</text>
    </g>
  );
}
function DimV({ y1, y2, x, label, ox, oy, side = 1 }) {
  const a = oy + y1 * SC, b = oy + y2 * SC, xx = ox + x * SC;
  return (
    <g stroke={BLUE} strokeWidth="1" fill="none">
      <path d={`M${xx} ${a}V${b}M${xx - 5} ${a}H${xx + 5}M${xx - 5} ${b}H${xx + 5}`} />
      <path d={`M${xx - 3} ${a + 7}L${xx} ${a}L${xx + 3} ${a + 7}M${xx - 3} ${b - 7}L${xx} ${b}L${xx + 3} ${b - 7}`} />
      <text x={xx + 9 * side} y={(a + b) / 2 + 4} fontSize="13" fontWeight="500" fill="#145CB8" stroke="none" textAnchor={side > 0 ? 'start' : 'end'}>{label}</text>
    </g>
  );
}

function Drawing({ view, ox, oy }) {
  const back = view === 'back';
  const d = back ? SHIRT_BACK : SHIRT_FRONT;
  const neckMid = back ? 20 : 30;
  const pw = back ? u(300) : u(280);
  const ph = back ? u(360) : u(180);
  const top = neckMid + (back ? u(60) : u(90));
  const px = 150 - pw / 2;
  const pid = `use-apparel-spec-${view}`;
  const stroke = { stroke: INK, fill: 'none' };
  return (
    <g>
      <g transform={`translate(${ox} ${oy}) scale(${SC})`}>
        <path d={d} fill="#F5F5F5" stroke={INK} strokeWidth={1.4 / SC} strokeLinejoin="round" />
        <path d="M48 36 Q76 64 68 104M252 36 Q224 64 232 104" {...stroke} strokeWidth={0.9 / SC} />
        <path d={back ? 'M108 14 Q150 26 192 14' : 'M108 14 Q150 46 192 14'} transform="translate(0 6)" {...stroke} strokeWidth={0.9 / SC} />
        <path d="M11 86 L59 116M289 86 L241 116M68 312 Q150 322 232 312" {...stroke} strokeWidth={0.9 / SC} strokeDasharray={`${3 / SC} ${3 / SC}`} />
        {back && <path d="M52 56 Q150 84 248 56" {...stroke} strokeWidth={0.9 / SC} />}
        <path d="M150 -6V336" stroke={BLUE} strokeWidth={0.8 / SC} strokeDasharray={`${8 / SC} ${3 / SC} ${2 / SC} ${3 / SC}`} />
        <rect x={px} y={top} width={pw} height={ph} fill={BLUE} fillOpacity="0.1" stroke={BLUE} strokeWidth={1.2 / SC} strokeDasharray={`${5 / SC} ${4 / SC}`} />
        <Print kind={back ? 'iso' : 'stack'} w={back ? pw * 0.9 : ph * 1.1} fg={INK} mk={BLUE} tone="paper" id={pid} transform={`translate(150 ${top + ph / 2})`} />
        {!back && (
          <g transform="translate(27 84) rotate(36)">
            <rect x={-u(40)} y={-u(40)} width={u(80)} height={u(80)} fill={BLUE} fillOpacity="0.1" stroke={BLUE} strokeWidth={1.2 / SC} strokeDasharray={`${4 / SC} ${3 / SC}`} />
            <Print kind="mark" w={u(52)} fg={INK} id={`${pid}-sl`} />
          </g>
        )}
      </g>
      <DimH x1={px} x2={px + pw} y={top + ph + 22} label={`${back ? 300 : 280} mm`} ox={ox} oy={oy} />
      <DimV y1={top} y2={top + ph} x={px + pw + 14} label={`${back ? 360 : 180} mm`} ox={ox} oy={oy} />
      <DimV y1={neckMid} y2={top} x={px - 14} label={`${back ? 60 : 90} mm`} ox={ox} oy={oy} side={-1} />
      {!back && (
        <g>
          <path d={`M${ox + 20 * SC} ${oy + 126 * SC}L${ox + 8 * SC} ${oy + 150 * SC}`} stroke={BLUE} strokeWidth="1" />
          <text x={ox - 4} y={oy + 168 * SC} fontSize="13" fontWeight="500" fill="#145CB8">80 x 80 mm</text>
        </g>
      )}
      <text x={ox + 150 * SC} y={oy + 354 * SC} fontSize="15" fontWeight="500" fill={INK} textAnchor="middle">{back ? 'Back' : 'Front'}</text>
    </g>
  );
}

export default function Spec() {
  return (
    <Art viewBox="0 0 1180 640" title="Print specification, t-shirt front and back" exportName="use-apparel-print-spec">
      <MaterialDefs idp="use-apparel-spec" />
      <BackdropG w="1180" h="640" />
      <Drawing view="front" ox={90} oy={56} />
      <Drawing view="back" ox={640} oy={56} />
    </Art>
  );
}
