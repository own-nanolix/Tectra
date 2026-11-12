import { LayerG, AxisG, ShadowG, SheenG } from '@/components/art/Mockup';
import { Plate, Artwork, Lift, Stitch, K, url, rrect } from './parts';

const W = 340;
const H = 214;
const CARD = rrect(W, H, 16);
// Three-quarter view: the card plane is turned about the vertical axis and tipped a little.
const TURN = 'matrix(0.9 -0.16 0.13 0.97 0 0)';

// Quiet placeholder bars stand in for value, number and code: the case study prints none.
function Bar({ x, y, w, h = 9, fill, opacity = 1 }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} opacity={opacity} />;
}

function FrontFace({ idp, cid }) {
  return (
    <g>
      <defs>
        <clipPath id={cid}>
          <path d={CARD} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${cid})`}>
        <rect x={-W / 2} y={-H / 2} width={W} height={H} fill={K.field} />
        <rect x={-W / 2} y={-H / 2} width={W} height={H} fill={url(idp, 'pw-pat-fuse')} opacity="0.5" />
        <Artwork kind="iso" tone="blue" idp={idp} w={250} h={190} x={62} y={22} />
        <Artwork kind="lockup" idp={idp} w={128} h={32} x={-76} y={-72} fg={K.white} />
        <Artwork kind="ticks" idp={idp} uid="gf" w={104} h={28} x={-106} y={-12} fg={K.white} />
        <Bar x={-148} y={64} w={104} fill={K.white} opacity={0.38} />
        <Bar x={-148} y={80} w={62} h={7} fill={K.white} opacity={0.26} />
      </g>
    </g>
  );
}

function BackFace({ idp, cid }) {
  return (
    <g>
      <defs>
        <clipPath id={cid}>
          <path d={CARD} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${cid})`}>
        <rect x={-W / 2} y={-H / 2} width={W} height={H} fill={K.g1} />
        <rect x={-W / 2} y={-80} width={W} height="38" fill={K.ink} />
        <rect x={-W / 2} y={-80} width={W} height="38" fill={url(idp, 'shade-v')} />
        <Bar x={-148} y={-22} w={116} h={12} fill={K.g3} />
        {[0, 1, 2, 3].map((i) => (
          <Bar key={i} x={-148 + i * 54} y={4} w={46} h={12} fill={K.g3} />
        ))}
        <Bar x={-148} y={28} w={78} h={10} fill={K.g2} />
        <Artwork kind="ticks" idp={idp} uid="gb" w={120} h={32} x={-86} y={76} fg={K.blue} />
        <Artwork kind="mark" idp={idp} w={34} h={34} x={134} y={72} fg={K.blue} />
        <Bar x={20} y={-22} w={50} h={8} fill={K.g2} />
      </g>
    </g>
  );
}

// One card as three layers: PVC core, printed face and glossy laminate, fanned along x.
function Card({ idp, back }) {
  const Face = back ? BackFace : FrontFace;
  return (
    <g transform={`translate(400 250) ${TURN}`}>
      <ShadowG idp={`${idp}-s`} cx={0} cy={150} rx={300} ry={14} tone={back ? 'sky' : 'blue'} />
      <LayerG i={0} dx={-135}>
        <Lift idp={idp} dx={8} dy={16} tone={K.blue}>
          <path d={CARD} />
        </Lift>
        <path d={CARD} transform="translate(0 5)" fill={K.g3} />
        <path d={CARD} fill={url(idp, 'card')} filter={url(idp, 'paper')} />
        <path d={CARD} fill={url(idp, 'lit')} />
      </LayerG>
      <LayerG i={1}>
        <Lift idp={idp} dx={8} dy={16} tone={K.blue}>
          <path d={CARD} />
        </Lift>
        <path d={CARD} transform="translate(0 4)" fill={back ? K.g3 : K.deep} />
        <Face idp={idp} cid={`${idp}-face`} />
        <path d={CARD} fill={url(idp, 'lit')} />
      </LayerG>
      <LayerG i={2} dx={135}>
        <path d={CARD} fill={url(idp, 'glass')} />
        <path d={CARD} fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />
        <path d={CARD} fill="none" stroke={K.sky} strokeWidth="0.8" />
        <SheenG idp={idp} d="M-150 -100L40 -100L-60 100L-150 100Z" opacity={0.4} />
      </LayerG>
      <AxisG points={[[-135, 140], [0, 140], [135, 140]]} />
    </g>
  );
}

// Carrier: card stock folder with a pocket and a thumb notch; the card slides out along x.
function Carrier({ idp }) {
  const CW = 330;
  const CH = 240;
  const pocket = 'M-165 -26H-32A32 32 0 0 0 32 -26H165V104A16 16 0 0 1 149 120H-149A16 16 0 0 1 -165 104Z';
  return (
    <g transform={`translate(430 250) ${TURN}`}>
      <ShadowG idp={`${idp}-s`} cx={90} cy={158} rx={380} ry={15} tone="yellow" />
      <LayerG i={0}>
        <Lift idp={idp} dx={9} dy={17} tone={K.blue}>
          <path d={rrect(CW, CH, 12)} />
        </Lift>
        <path d={rrect(CW, CH, 12)} transform="translate(0 5)" fill={K.deep} />
        <path d={rrect(CW, CH, 12)} fill={K.blue} filter={url(idp, 'paper')} />
        <path d={rrect(CW, CH, 12)} fill={url(idp, 'pw-pat-marks')} opacity="0.4" />
        <path d={rrect(CW, CH, 12)} fill={url(idp, 'lit')} />
      </LayerG>
      <LayerG i={1} dx={235}>
        <g transform="translate(0 -14) scale(0.9)">
          <Lift idp={idp} dx={7} dy={13} tone={K.blue}>
            <path d={CARD} />
          </Lift>
          <path d={CARD} transform="translate(0 4)" fill={K.deep} />
          <FrontFace idp={idp} cid={`${idp}-face`} />
          <path d={CARD} fill={url(idp, 'lit')} />
          <SheenG idp={idp} d="M-150 -100L40 -100L-60 100L-150 100Z" opacity={0.35} />
        </g>
      </LayerG>
      <LayerG i={2}>
        <Lift idp={idp} dx={8} dy={14} tone={K.blue}>
          <path d={pocket} />
        </Lift>
        <path d={pocket} transform="translate(0 4)" fill="#000000" opacity="0.2" />
        <path d={pocket} fill={K.yellow} filter={url(idp, 'paper')} />
        <path d={pocket} fill={url(idp, 'card')} opacity="0.2" />
        <Artwork kind="lockup" idp={idp} w={150} h={38} x={-70} y={52} fg={K.g1} />
        <Artwork kind="ticks" idp={idp} uid="cr" w={110} h={30} x={85} y={80} fg={K.g1} />
        <Stitch d="M-153 -16H-38M38 -16H153M-153 108H153" stroke="#FFFFFF" w={1} dash="4 3" opacity={0.7} />
        <path d={pocket} fill={url(idp, 'lit')} />
      </LayerG>
      <AxisG points={[[0, 150], [118, 150], [235, 150]]} />
    </g>
  );
}

export const giftPlates = [
  { id: 'gift-front', caption: 'Gift card, front', node: <Plate name="gift-front" title="Gift card front, core, printed face and laminate fanned along x" w={800}>{(idp) => <Card idp={idp} />}</Plate> },
  { id: 'gift-back', caption: 'Gift card, back', node: <Plate name="gift-back" title="Gift card back with placeholder bars, core, printed face and laminate fanned along x" w={800}>{(idp) => <Card idp={idp} back />}</Plate> },
  { id: 'gift-carrier', caption: 'Carrier', node: <Plate name="gift-carrier" title="Gift card carrier with the card slid out along x" w={1067}>{(idp) => <Carrier idp={idp} />}</Plate> },
];
