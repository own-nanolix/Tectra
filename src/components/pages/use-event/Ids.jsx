import { LayerG, AxisG, ShadowG } from '@/components/art/Mockup';
import { BADGES } from '@/lib/brand';
import { Scene, CardFace } from './parts';
import { HolderBack, HolderFront } from './Lanyard';

// Three-quarter view: surfaces are turned on the vertical axis (scaled in x, sheared in y); a card slid
// along the surface x axis therefore travels up the shear line.
const K = 0.87;
const SLOPE = -0.195;
const turn = (x, y) => `matrix(${K} -0.17 0 1 ${x} ${y})`;
const HX = 190;
const HY = 140;

// Card with its visible left edge (thickness), in card space.
function Card({ idp, id, tone, name, role, seed }) {
  return (
    <g transform="translate(-95 44)">
      <rect x="-5" y="3" width="5" height="290" fill="#E4E4E4" />
      <path d="M-5 3V293" stroke="#FFFFFF" strokeWidth="1.2" />
      <CardFace idp={idp} id={id} tone={tone} name={name} role={role} seed={seed} />
    </g>
  );
}

// Two staff ID cards slid out of a hard holder along the x axis.
export default function Ids() {
  const slide = [300, 560];
  return (
    <Scene name="ids" title="Staff ID cards slid out of a holder" w={940} h={560}>
      {(idp) => (
        <>
          <ShadowG idp={idp} cx={460} cy={528} rx={400} ry={16} tone="sky" opacity={0.4} />
          <AxisG points={[[HX, 330], ...slide.map((d) => [HX + d, 330 + SLOPE * d])]} />
          <LayerG i={0}>
            <g transform={turn(HX, HY)}><HolderBack idp={idp} edge /></g>
          </LayerG>
          {BADGES.map((b, i) => (
            <LayerG key={b.name} i={i + 1} dx={slide[i]} dy={Math.round(SLOPE * slide[i])}>
              <g transform={turn(HX, HY)}>
                <Card idp={idp} id={`${idp}-card-${b.tone}`} tone={b.tone} name={b.name} role={b.role} seed={i + 5} />
              </g>
            </LayerG>
          ))}
          <LayerG i={0}>
            <g transform={turn(HX, HY)}><HolderFront idp={idp} ring /></g>
          </LayerG>
        </>
      )}
    </Scene>
  );
}
