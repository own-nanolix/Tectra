import { LayerG, AxisG, ShadowG } from '@/components/art/Mockup';
import { Plate, Artwork, Lift, Stitch, K, url, rrect } from './parts';

// Desk mat and mouse pad, top view at a slight angle. The printed surface lifts above the rubber base up-left.
function Mat({ idp, w, h, r, m, field, tone, dx, dy, children, shadow }) {
  const cx = w / 2;
  const cy = h / 2;
  return (
    <g transform={m}>
      <ShadowG idp={`${idp}-s`} cx={cx} cy={h + shadow} rx={w * 0.54} ry={16} tone={tone} />
      <LayerG i={0}>
        <g transform={`translate(${cx} ${cy})`}>
          <path d={rrect(w, h, r)} transform="translate(0 10)" fill={K.ink} />
          <path d={rrect(w, h, r)} transform="translate(0 5)" fill="#000000" opacity="0.35" />
          <path d={rrect(w, h, r)} fill={url(idp, 'rubber')} />
          <path d={rrect(w, h, r)} fill={url(idp, 'pw-pat-dots')} opacity="0.22" />
          <path d={rrect(w - 6, h - 6, r)} fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.18" />
          <path d={rrect(w, h, r)} fill={url(idp, 'lit')} opacity="0.7" />
        </g>
      </LayerG>
      <LayerG i={1} dx={dx} dy={dy}>
        <g transform={`translate(${cx} ${cy})`}>
          <Lift idp={idp} dx={12} dy={20} tone={K.blue} opacity={0.4}>
            <path d={rrect(w, h, r)} />
          </Lift>
          <path d={rrect(w, h, r)} transform="translate(0 6)" fill="#000000" opacity="0.28" />
          <g filter={url(idp, 'fabric')}>
            <path d={rrect(w, h, r)} fill={field} />
          </g>
          <path d={rrect(w, h, r)} fill={url(idp, 'pw-pat-fuse')} opacity="0.5" />
          {children}
          <Stitch d={rrect(w - 20, h - 20, Math.max(4, r - 6))} stroke={K.white} w={1.4} dash="5 4" opacity={0.85} />
          <path d={rrect(w, h, r)} fill={url(idp, 'lit')} />
          <path d={rrect(w, h, r)} fill={url(idp, 'spot')} opacity="0.6" />
          <path d={rrect(w, h, r)} fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.5" strokeDasharray={`${w * 0.7} ${w * 4}`} />
        </g>
      </LayerG>
      <AxisG points={[[w + 34, cy + 50], [w + 34 + dx, cy + 50 + dy]]} />
    </g>
  );
}

function DeskMat({ idp }) {
  return (
    <Mat idp={idp} w={760} h={270} r={18} m="matrix(1 -0.07 -0.2 0.9 190 190)" field={K.field} tone="blue" dx={-72} dy={-64} shadow={8}>
      <Artwork kind="iso" tone="blue" idp={idp} w={400} h={250} x={170} y={4} />
      <Artwork kind="lockup" idp={idp} w={170} h={42} x={-250} y={-82} fg={K.white} />
      <Artwork kind="hero" idp={idp} w={210} h={84} x={-250} y={78} fg={K.white} />
      <Artwork kind="ticks" idp={idp} uid="mat" w={200} h={54} x={-250} y={-6} fg={K.white} />
    </Mat>
  );
}

function MousePad({ idp }) {
  return (
    <Mat idp={idp} w={250} h={220} r={34} m="matrix(1.25 -0.09 -0.25 1.12 205 205)" field={K.yellow} tone="yellow" dx={-52} dy={-58} shadow={6}>
      <Artwork kind="mark" idp={idp} w={118} h={118} x={0} y={-16} fg={K.g1} />
      <Artwork kind="ticks" idp={idp} uid="pad" w={150} h={40} x={0} y={70} fg={K.white} />
    </Mat>
  );
}

export const deskPlates = [
  { id: 'desk-mat', caption: 'Desk mat', node: <Plate name="desk-mat" title="Desk mat, printed surface lifted above the rubber base" w={1067}>{(idp) => <DeskMat idp={idp} />}</Plate> },
  { id: 'mouse-pad', caption: 'Mouse pad', node: <Plate name="mouse-pad" title="Mouse pad, printed surface lifted above the rubber base" w={533}>{(idp) => <MousePad idp={idp} />}</Plate> },
];
